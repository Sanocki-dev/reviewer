import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import uniqueValidator from "mongoose-unique-validator";
import Review from './Review.js';

const Schema = mongoose.Schema;

// Define the schema for each "favorite" object
const MovieSchema = new mongoose.Schema({
  id: {
    type: String,
  },
  title: {
    type: String,
  },
  poster_path: {
    type: String,
  },
});

// Define the schema for user object
const UserSchema = Schema(
  {
    userName: {
      type: String,
      required: [true, "Username is required"],
      uniqueCaseInsensitive: true,
      unique: true,
      trim: true,
      minlength: [4, "Username must be at least 4 characters long"],
      maxlength: [15, "Username cannot exceed 15 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      uniqueCaseInsensitive: true,
      trim: true,
      select: false,
      lowercase: true,
      unique: true,
      validate: {
        validator: (value) => validator.isEmail(value),
        message: "Please enter a valid email",
      },
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      select: false,
      minlength: [6, "Must be at least 6 characters"],
    },
    picturePath: {
      type: String,
      default: "",
    },
    backdropPath: {
      type: String,
      default: "",
    },
    favorites: {
      type: [MovieSchema],
      default: [],
    },
    seen: {
      type: [MovieSchema],
      default: [],
    },
    following: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    followers: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    medals: {
      type: [Schema.Types.ObjectId],
      default: [],
    },
    resetPasswordOTP: {
      type: String,
      default: "",
    },
    resetPasswordExpire: {
      type: Date,
      default: undefined,
    },
  },
  { timestamps: true }
);

UserSchema.plugin(uniqueValidator, { message: "Already in use" });

UserSchema.pre("save", async function (next) {
  // Hashes the password whenever user is created/updated
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    console.log(this.password);
  }

  next();
});

// Pre middleware on User schema to delete related reviews
UserSchema.pre('remove', async function (next) {
  try {
    // Delete reviews that belong to this user
    await Review.deleteMany({ userId: this._id });
    
    console.log(this.following)

    next();
  } catch (error) {
    next(error);
  }
});

const User = mongoose.model("User", UserSchema);

export default User;

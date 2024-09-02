import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import uniqueValidator from "mongoose-unique-validator";
const Schema = mongoose.Schema;

const UserSchema = Schema(
  {
    userName: {
      type: String,
      required: true,
      uniqueCaseInsensitive: true,
      trim: true,
      minlength: 4,
      maxlength: 15,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      uniqueCaseInsensitive: true,
      trim: true,
      select: false,
      lowercase: true,
      unique: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email is invalid!");
        }
      },
    },
    password: {
      type: String,
      required: true,
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
      type: Array,
      default: [],
    },
    seen: {
      type: Array,
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
      type: Array,
      default: [],
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
  }

  next();
});

const User = mongoose.model("User", UserSchema);

export default User;

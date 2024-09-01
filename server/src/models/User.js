import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import uniqueValidator from 'mongoose-unique-validator'

const UserSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      uniqueCaseInsensitive: true,
      trim: true,
      minlength: 4,
      maxlength: 15,
      unique: true
    },
    email: {
      type: String,
      required: true,
      uniqueCaseInsensitive: true,
      trim: true,
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
      minlength: [6, "Must be at least 6 characters"],
    },
    picturePath: {
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
    friends: {
      type: Array,
      default: [],
    },
    medals: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

UserSchema.plugin(uniqueValidator, {message: "Already in use"})

UserSchema.pre("save", async function (next) {
  const user = this;

  // Hashes the password whenever user is created/updated
  if (user.isModified("password")) {
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(user.password, salt);
    user.password = passwordHash;
  }

  next();
});


const User = mongoose.model("User", UserSchema);

export default User;

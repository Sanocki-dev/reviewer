import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import User from "../models/User.js";
import WatchList from "../models/WatchList.js";
import { sendOTP } from "../helper/index.js";

const createToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET);

export const login = async (req, res) => {
  try {
    const { userName, password } = req.body;

    let user = await User.findOne({ userName }).select("+password");

    if (!user)
      return res
        .status(400)
        .json({ userName: "Invalid username or password." });

    let isValid = await bcrypt.compare(password, user.password);

    // Checks to see if the user is using a OTP
    if (password === user.resetPasswordOTP) {
      const isWithinTime = new Date() < user.resetPasswordExpire;
      if (!isWithinTime) {
        return res
          .status(400)
          .json({ password: "One-Time-Passcode expired. Please try again." });
      }

      isValid = true;
    }

    if (!isValid) {
      return res
        .status(400)
        .json({ userName: "Invalid username or password." });
    }

    user.resetPasswordOTP = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    // Get all users data and return it with the initial login
    const lists = await WatchList.find({ userId: user.id });

    const userResponse = {
      ...user._doc,
      watchlists: lists,
    };

    res.status(200).json({ user: userResponse, token: createToken(user._id) });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const register = async (req, res) => {
  try {
    if (req.body.userName.includes(" ")) {
      return res.status(400).json({
        userName: "Username cannot contain any spaces.",
      });
    }

    const newUser = new User(req.body);
    await newUser.save();

    const userResponse = {
      id: newUser._id,
      seen: [],
      favorites: [],
      following: [],
      followers: [],
      picturePath: "",
      backdropPath: "",
      medals: "",
      userName: newUser.userName,
    };

    res.status(200).json({
      user: userResponse,
      token: createToken(newUser._id),
    });
  } catch (error) {
    if (error.name !== "ValidationError")
      res.status(500).send("Something went wrong");

    let errors = {};
    Object.keys(error.errors).forEach((key) => {
      errors[key] = error.errors[key].message;
    });
    return res.status(400).send(errors);
  }
};

export const verifyOTP = async (req, res) => {
  const { email, otp } = req.body;

  const user = await User.findOne({
    email,
    resetPasswordOTP: otp,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return res
      .status(400)
      .json({ otp: "Invalid or expired OTP. Please try again." });
  }

  user.resetPasswordOTP = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();

  res.status(200).json({ user, token: createToken(user._id) });
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    let user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "User does not exist." });

    // Checks if the user already has a OTP within the time limit to not resend
    if (user.resetPasswordExpire > new Date()) {
      return res.status(400).json({ code: 2, error: "Code has been sent" });
    }

    const resetPasswordExpire = Date.now() + 30 * 60 * 1000; // 30 Min to reset
    const otp = await sendOTP(email);

    user.resetPasswordOTP = otp;
    user.resetPasswordExpire = resetPasswordExpire;
    await user.save();

    res.status(200).json();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updatePassword = async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await User.findOne({ email }).select("+password");

    if (!user) return res.status(400).json({ error: "User does not exist." });

    user.resetPasswordOTP = undefined;
    user.resetPasswordExpire = undefined;
    user.password = password;

    await user.save();

    res.status(200).json();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

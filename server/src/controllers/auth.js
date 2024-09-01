import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import User from "../models/User.js";
import WatchList from "../models/WatchList.js";

// REGISTER USER //
export const register = async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();

    const userResponse = {
      seen: [],
      favorites: [],
      friends: [],
      id: newUser._id,
      picturePath: newUser.picturePath,
      medals: newUser.medals,
      userName: newUser.userName,
    };

    res.status(201).json({
      success: "User Created",
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

// LOGGING IN //
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });
    if (!user) return res.status(400).json({ email: "Email does not exist" });

    // Checks to see if the passwords match
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ password: "Incorrect password" });
    createToken();

    // Get all users data and return it with the initial login
    const lists = await WatchList.find(
      { userId: user.id },
      { name: 1, genre: 1 }
    );

    const userResponse = {
      friends: user.friends,
      seen: user.seen,
      favorites: user.favorites,
      id: user._id,
      picturePath: user.picturePath,
      medals: user.medals,
      userName: user.userName,
      watchlists: lists,
    };

    res.status(200).json({ user: userResponse, token: createToken(user._id) });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET);

//// NEED TO FINISH FORGOT PASSWORD!
export const resetPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "User does not exist." });

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

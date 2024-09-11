import User from "../models/User.js";
import Notification from "../models/Notifications.js";
import { createNotification } from "../helper/index.js";
import Review from "../models/Review.js";

// READ //
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getUserByName = async (req, res) => {
  try {
    const { userName } = req.params;
    const user = await User.findOne({
      userName,
    });

    const reviews = await Review.find({ userId: user._id });

    res.status(200).json({ user, reviews });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const postUser = async (req, res) => {
  try {
    const newUser = new User(req.body);
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const patchUser = async (req, res) => {
  const updates = Object.keys(req.body);

  // Allowed updates
  const allowedUpdates = [
    "userName",
    "email",
    "picturePath",
    "backdropPath",
    "password",
  ];
  const isValidUpdate = updates.every((key) => allowedUpdates.includes(key));

  if (!isValidUpdate)
    return res.status(400).send({ error: "Invalid Updates!" });

  try {
    const user = await User.findById(req.params.id);
    updates.forEach((update) => (user[update] = req.body[update]));
    await user.save();

    // No User found
    if (!user) return res.status(404).send();

    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getFollowers = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    const followers = await Promise.all(
      user.followers.map((id) => User.findById(id))
    );

    const formattedFollowers = followers.map(
      ({ _id, userName, picturePath }) => {
        return { _id, userName, picturePath };
      }
    );

    res.status(200).json(formattedFollowers);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Add movies to favourites/seen lists
export const addRemoveLists = async (req, res) => {
  try {
    const { id } = req.params;
    const { id: movieId, title, poster_path, type } = req.body;

    if (!movieId || !type || !["favorites", "seen"].includes(type)) {
      return res.status(400).json({ message: "Invalid request data" });
    }

    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Get the current list based on the type
    const currentList = user[type] || [];

    // Filter out the movieId if it exists in the list
    const updatedList = currentList.filter(
      (listing) => listing.id !== movieId.toString()
    );

    // Add the item if it was not removed
    if (updatedList.length === currentList.length) {
      updatedList.push({ id: movieId, title, poster_path });
    }

    // Update the user's list and save
    user[type] = updatedList;
    await user.save();
    res.status(200).json(user[type]);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const addRemoveFollowing = async (req, res) => {
  try {
    const { userId, followerId } = req.body;

    if (userId === followerId)
      return res.status(404).json({ message: "Cannot follow yourself." });

    const user = await User.findById(userId);
    const follower = await User.findById(followerId);

    if (!user || !follower) {
      return res.status(404).json({ message: "User not found." });
    }

    // Is the user already being followed by the person
    if (user.followers.some((id) => id.toString() === followerId.toString())) {
      // This is unfollowing
      user.followers = user.followers.filter(
        (id) => id.toString() !== followerId
      );
      follower.following = follower.following.filter(
        (id) => id.toString() !== userId
      );
    } else {
      // This is following
      user.followers.push(followerId);
      follower.following.push(userId);

      createNotification({
        user: user._id,
        ref: followerId,
        type: "follow",
        message: `${follower.userName} started following you.`,
      });
    }

    await user.save();
    await follower.save();

    // const following = await Promise.all(
    //   user.following.map((id) => User.findById(id))
    // );

    // const formattedFollowing = following.map(
    //   ({ _id, userName, picturePath }) => {
    //     return { _id, userName, picturePath };
    //   }
    // );

    res.status(200).json(follower.following);
  } catch (error) {
    res.status(404).json({ message: error.message });
    console.log(error);
  }
};

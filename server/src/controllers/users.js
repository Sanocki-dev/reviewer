import User from "../models/User.js";
import Notification from "../models/Notifications.js";

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
      userName: { $regex: userName },
    }).collation({
      locale: "en",
      strength: 2,
    });

    res.status(200).json(user);
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

    const user = await User.findById(id);
    let hasDeleted = false;

    // No or user
    if (!movieId || !user) res.status(404).send();

    user[type].find((o, i) => {
      if (o?.id === movieId) {
        user[type].splice(i, 1);
        hasDeleted = true;
        return true;
      }
    });

    if (!hasDeleted) {
      user[type].push({ id: movieId, title, poster_path });
    }

    await user.save();
    res.status(200).json(user[type]);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const addRemoveFollowing = async (req, res) => {
  try {
    const { userId, followerId } = req.body;
    const user = await User.findById(userId);
    const follower = await User.findById(followerId);

    if (!user || !follower) {
      return res.status(404).json({ message: "User not found." });
    }

    // Is the user already following the person
    if (user.following.includes(followerId)) {
      // This is unfollowing
      user.following = user.following.filter((id) => id === followerId);
      follower.followers = follower.followers.filter((id) => id === userId);
    } else {
      // This is following
      user.following.push(followerId);
      follower.followers.push(userId);

      // Create a notification
      const notification = new Notification({
        user: followerId,
        ref: user._id,
        type: "follow",
        message: `${user.userName} started following you.`,
      });

      await notification.save();
    }

    await user.save();
    await follower.save();

    const following = await Promise.all(
      user.following.map((id) => User.findById(id))
    );

    const formattedFollowing = following.map(
      ({ _id, userName, picturePath }) => {
        return { _id, userName, picturePath };
      }
    );

    res.status(200).json(formattedFollowing);
  } catch (error) {
    res.status(404).json({ message: error.message });
    console.log(error);
  }
};

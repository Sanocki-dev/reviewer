import User from "../models/User.js";

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
    const { userName } = req.body;
    const user = await User.find(
      { userName: { $regex: userName } },
      { _id: 1, userName: 1, picturePath: 1 }
    ).collation({ locale: "en", strength: 2 });

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
  const allowedUpdates = ["userName", "email", "picturePath", "password"];
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

export const getUserFriends = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );

    const formattedFriends = friends.map(({ _id, userName, picturePath }) => {
      return { _id, userName, picturePath };
    });

    res.status(200).json(formattedFriends);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Add movies to favourites/seen lists
export const addRemoveLists = async (req, res) => {
  try {
    const { id } = req.params;
    const { movieId, title, poster_path, type } = req.body;

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

// UPDATE //
export const addRemoveFriend = async (req, res) => {
  try {
    const { id, friendId } = req.params;
    const user = await User.findById(id);

    // If they are friends remove them from each of them
    if (user.friends.includes(friendId)) {
      user.friends = user.friends.filter((id) => id !== friendId);
    } else {
      user.friends.push(friendId);
    }

    await user.save();

    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );

    const formattedFriends = friends.map(({ _id, userName, picturePath }) => {
      return { _id, userName, picturePath };
    });

    res.status(200).json(formattedFriends);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

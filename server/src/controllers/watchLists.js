import WatchList from "../models/WatchList.js";
import User from "../models/User.js";

// GET //
export const readWatchlists = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) return;

    // Returns all user watchlists
    const list = await WatchList.find({ userId: id }, { name: 1 }).sort({
      createdAt: -1,
    });

    res.status(200).json(list);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

// CREATE //
export const createWatchlist = async (req, res) => {
  try {
    const { userId, name, genre, movieId } = req.body;
    const user = await User.findById(userId);

    if (!user) return;

    const watchlist = await WatchList.find({
      userId,
      name,
    });

    if (watchlist) {
      res
        .status(400)
        .json({ message: "Watchlist already exists with this name." });
      return;
    }

    const newList = new WatchList({
      name,
      genre,
      userId,
      movies: [movieId],
    });

    await newList.save();

    // Returns all the watchlists
    const list = await WatchList.find().sort({ createdAt: -1 });
    res.status(201).json(list);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

// UPDATE //
export const updateWatchlist = async (req, res) => {
  const { listId: _id } = req.params;
  const { movie } = req.body;
  const allowedUpdates = ["name", "genre", "movie", "partners"];
  const updates = Object.keys(req.body);
  const isValidUpdate = updates.every((key) => allowedUpdates.includes(key));

  if (!isValidUpdate)
    return res.status(400).send({ error: "Invalid Updates!" });

  try {
    const watchlist = await WatchList.findById(_id);
    updates.forEach((update) => (watchlist[update] = req.body[update]));

    if (watchlist.movies.includes(movie)) {
      watchlist.movies = watchlist.movies.filter((id) => id !== movie);
    } else {
      watchlist.movies.push(movie);
    }
    
    await watchlist.save();
    
    res.status(200).json(watchlist);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const addRemoveMovies = async (req, res) => {
  const { movie } = req.body;

  try {
    const { listId: _id, id: userId } = req.params;

    const watchlist = await WatchList.find({ _id, userId });

    console.log(watchlist);
    res.status(200).json(watchlist);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

// READ //
export const readWatchlist = async (req, res) => {
  try {
    const { id } = req.params;
    const list = await WatchList.findById(id);

    res.status(200).json(list);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

// DELETE //
export const deleteWatchlist = async (req, res) => {
  try {
    const { listId } = req.body;
    await WatchList.findByIdAndDelete(listId);

    res.status(200);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

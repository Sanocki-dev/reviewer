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
    const { userId, movie } = req.body;
    const user = await User.findById(userId);
    const watchLists = await WatchList.find({ userId }).count();

    if (!user) return;

    if (watchLists >= 4) {
      return res
        .status(406)
        .send({ server: "You have reached the limit of 4 watchlists" });
    }

    const newList = new WatchList({
      ...req.body,
      movies: [movie],
    });

    await newList.save();

    // Returns all the watchlists
    const list = await WatchList.find({ userId: user.id }).sort({
      createdAt: -1,
    });
    res.status(201).json(list);
  } catch (error) {
    if (error.code === 11000) {
      return res
        .status(406)
        .send({ name: "Watchlist with this name already exists" });
    }

    res.status(400).json({ message: error.message });
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

    // Remove movies from watchlists
    if (watchlist.movies.findIndex(({ id }) => id === movie.id) >= 0) {
      watchlist.movies = watchlist.movies.filter(({ id }) => id !== movie.id);
    } else {
      watchlist.movies.push(movie);
    }

    await watchlist.save();

    res.status(200).json(watchlist);
  } catch (error) {
    res.status(201).json({ message: error.message });
  }
};

export const addRemoveMovies = async (req, res) => {
  const { lists, movie: _id } = req.body;

  try {
    const { id: userId } = req.params;
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

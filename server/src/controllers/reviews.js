import Notification from "../models/Notifications.js";
import Review from "../models/Review.js";
import User from "../models/User.js";

// READ ALL //
export const readReviews = async (req, res) => {
  try {
    const reviews = await Review.find().sort({ medals: 1 });
    console.log("reviews");

    if (!reviews) res.status(404).json({ error: "No reviews yet" });
    res.status(200).json(reviews);
  } catch (error) {
    res.status(400).json({ error });
  }
};

// CREATE //
export const createReview = async (req, res) => {
  const { userId, movieId, title, userName } = req.body;

  const user = await User.findById(userId);

  if (!user) return res.status(401).json({ error: "Unable to review." });

  const isNewReview = await Review.findOne({ userId, movieId });

  try {
    if (isNewReview)
      return res
        .status(401)
        .json({ error: "You already have a review for this movie." });

    const newReview = new Review(req.body);

    await newReview.save();

    // Create a notification
    if (user.followers.length !== 0) {
      const notifications = user.followers.map(({ _id }) => ({
        user: _id,
        type: "review",
        ref: movieId,
        message: `${userName} has a new review for ${title}.`,
      }));

      await Notification.insertMany(notifications);
    }

    const response = await newReview.populate("userId", "userName", "User");

    res.status(201).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// APPRAISE REVIEW //
export const likeReview = async (req, res) => {
  const { id, userId, userName, title } = req.body;

  const review = await Review.findById(id);

  if (!review) return;

  const searchMedals = review.medals.findIndex((id) => id === userId);

  // Check if the person has already liked the review
  if (searchMedals !== -1) {
    review.medals.splice(searchMedals, 1);
  } else {
    review.medals.push(userId);

    // Create a notification
    const notification = new Notification({
      user: review.userId,
      ref: review.movieId,
      type: "like",
      message: `${userName} liked your review of ${title}.`,
    });

    await notification.save();
  }

  review.save();

  res.status(200).json(review);
};

// UPDATE //~
export const updateReview = async (req, res) => {
  const updates = Object.keys(req.body);
  const _id = req.params.id;

  // Allowed updates
  const allowedUpdates = ["rating", "review", "isPrivate"];
  const isValIdUpdate = updates.every((key) => allowedUpdates.includes(key));

  if (!isValIdUpdate)
    return res.status(400).send({ error: "InvalId Updates!" });

  try {
    const review = await Review.findByIdAndUpdate(_id, req.body, {
      new: true,
      runValidators: true,
    }).populate("userId", "userName", "User");

    // No Review found
    if (!review) return res.status(404).send();

    res.status(200).json(review);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// DELETE //
export const deleteReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);

    // No Review found
    if (!review) return res.status(404).send();

    res.status(200).json(review);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

import { userNotifications } from "../helper/index.js";
import Review from "../models/Review.js";

// CREATE //
export const createReview = async (req, res) => {
  const { userId, movieId } = req.body;
  const isNewReview = await Review.findOne({ userId, movieId });

  try {
    if (isNewReview)
      return res
        .status(401)
        .json({ error: "You already have a review for this movie." });

    const newReview = new Review(req.body);
    const savedReview = await newReview.save();

    const response = await Review.findOne(savedReview._id).populate(
      "userId",
      "userName",
      "User"
    );

    res.status(201).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// READ ALL //
export const readReviews = async (req, res) => {
  const reviews = await Review.find().sort({ medals: -1 });

  res.status(200).json(reviews);
};

// APPRAISE REVIEW //
export const appraiseReview = async (req, res) => {
  const _id = req.params.id;
  const userId = req.params.userId;

  const review = await Review.findById(_id).populate(
    "userId",
    "userName",
    "User"
  );

  if (!review) return;

  const searchMedals = review.medals.findIndex((id) => id === userId);

  if (searchMedals !== -1) {
    review.medals.splice(searchMedals, 1);
  } else {
    review.medals.push(userId);
  }

  review.save();

  res.status(200).json(review);
};

// UPDATE //
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
    userNotifications("review", review.userId._id);
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

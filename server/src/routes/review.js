import { Router } from "express";
import verifyToken from "../middleware/auth.js";

import {
  readReviews,
  likeReview,
  createReview,
  deleteReview,
  updateReview,
} from "../controllers/reviews.js";

const reviewRouter = Router();

reviewRouter.get("/review", readReviews);
reviewRouter.post("/review", verifyToken, createReview);
reviewRouter.post("/like", verifyToken, likeReview);
reviewRouter.patch("/review/:id", verifyToken, updateReview);
reviewRouter.delete("/review/:id", verifyToken, deleteReview);

export default reviewRouter;

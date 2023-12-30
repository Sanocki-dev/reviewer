import { Router } from "express";
import verifyToken from "../middleware/auth.js";
import {
  appraiseReview,
  createReview,
  deleteReview,
  readReviews,
  updateReview,
} from "../controllers/reviews.js";

const reviewRouter = Router();

reviewRouter.post("/review", verifyToken, createReview);
reviewRouter.get("/review", readReviews);
reviewRouter.patch("/review/:id", verifyToken, updateReview);
reviewRouter.patch("/review/:id/:userId", verifyToken, appraiseReview);
reviewRouter.delete("/review/:id", verifyToken, deleteReview);

export default reviewRouter;

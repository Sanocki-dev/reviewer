import { Router } from "express";
// import verifyToken from "../middleware/auth.js";

import { readReviews } from "../controllers/reviews";
// appraiseReview,
// createReview,
// deleteReview,
// updateReview,

const reviewRouter = Router();

reviewRouter.get("/review", readReviews);
// reviewRouter.post("/review", verifyToken, createReview);
// reviewRouter.patch("/review/:id", verifyToken, updateReview);
// reviewRouter.patch("/review/:id/:userId", verifyToken, appraiseReview);
// reviewRouter.delete("/review/:id", verifyToken, deleteReview);

export default reviewRouter;

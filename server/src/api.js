// Third Party imports
import express, { Router, json } from "express";
import cors from "cors";
import "dotenv/config";
import serverless from "serverless-http";

// Database
import "./db/mongoose.js";

// Routes
import reviewRouter from "./routes/review.js";
import Review from "./models/Review.js";
// import userRouter from "../src/routes/user.js";
// import authRouter from "../src/routes/auth.js";
// import movieRouter from "../src/routes/movies.js";
// import watchListRouter from "../src/routes/watchLists.js";

const app = express();

app.use(json());
app.use(cors());

const router = Router()

router.get("/review", async (req, res) => {
  const reviews = await Review.find().sort({ medals: -1 });
  res.status(204).json(reviews);
  // if (!reviews) res.status(404).json({ error: "No reviews yet" });
  // res.status(200).json(reviews);
});

app.use("/", router);
// app.use("/", authRouter);
// app.use("/", userRouter);
// app.use("/", movieRouter);
// app.use("/", watchListRouter);

export const handler = serverless(app);

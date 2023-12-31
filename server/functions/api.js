// Third Party imports
import express, { Router, json } from "express";
import cors from "cors";
import "dotenv/config";
import serverless from "serverless-http";

// Database
import "../src/db/mongoose.js";

// Routes
// import reviewRouter from "../src/routes/review.js";
// import userRouter from "../src/routes/user.js";
// import authRouter from "../src/routes/auth.js";
// import movieRouter from "../src/routes/movies.js";
// import watchListRouter from "../src/routes/watchLists.js";

const app = express();

app.use(json());
app.use(cors());

const reviewRouter = Router();

const readReviews = async (req, res) => {
  res.status(200).json({ FUCK: "YOU" });
};

reviewRouter.get("/review", readReviews);

app.use("/", reviewRouter);

// app.use("/", authRouter);
// app.use("/", userRouter);
// app.use("/", movieRouter);
// app.use("/", watchListRouter);

export const handler = serverless(app);

// Third Party imports
import express, { json } from "express";
import cors from "cors";
import "dotenv/config";

// Database
import "./src/db/mongoose.js";

// Routes
import userRouter from "./src/routes/user.js";
import reviewRouter from "./src/routes/review.js";
import authRouter from "./src/routes/auth.js";
import movieRouter from "./src/routes/movies.js";
import watchListRouter from "./src/routes/watchLists.js";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(json());
app.use(cors());

app.use(authRouter);
app.use(userRouter);
app.use(reviewRouter);
app.use(movieRouter);
app.use(watchListRouter);

app.get("/", (req, res) => {
  res.json({ success: true, message: "Deployment" });
});

app.listen(PORT, () => {
  console.log("Server running on PORT: " + PORT);
});

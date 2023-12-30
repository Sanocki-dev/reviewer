// Third Party imports
import express, { json } from "express";
import cors from "cors";
import "dotenv/config";
import serverless from "serverless-http";

// Database
// import "../src/db/mongoose.js";

// Routes
import userRouter from "./routes/user.js";
import reviewRouter from "./routes/review.js";
import authRouter from "./routes/auth.js";
import movieRouter from "./routes/movies.js";
import watchListRouter from "./routes/watchLists.js";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(json());
app.use(cors());

// app.use("/.netlify/functions/api", authRouter);
// app.use("/.netlify/functions/api", userRouter);
// app.use("/.netlify/functions/api", reviewRouter);
// app.use("/.netlify/functions/api", movieRouter);
// app.use("/.netlify/functions/api", watchListRouter);

// app.get("/", (req, res) => {
//   res.json({ success: true, message: "Deployment" });
// });

// app.listen(PORT, () => {
//   console.log("Server running on PORT: " + PORT);
// });

const router = express.Router();

router.get("/de", (req, res) => {
  res.json({
    hello: "hi!",
  });
});

exports.handler = async (event) => serverless(app);

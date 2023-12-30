import { Router } from "express";
import verifyToken from "../middleware/auth.js";
import {
  createWatchlist,
  deleteWatchlist,
  readWatchlist,
  readWatchlists,
  updateWatchlist,
} from "../controllers/watchLists.js";

const watchListRouter = Router();

/// ADD VERIFY TOKEN BACK IN
watchListRouter.get("/watchLists/:id", readWatchlists);
watchListRouter.post("/watchList", createWatchlist);
watchListRouter.get("/watchList/:id", readWatchlist);
watchListRouter.patch("/watchList/:id/:listId", updateWatchlist);
watchListRouter.delete("/watchList/:id", deleteWatchlist);

export default watchListRouter;

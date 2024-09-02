import { Router } from "express";
import {
  addRemoveLists,
  getUserById,
  getUserByName,
  patchUser,
  postUser,
  addRemoveFollowing,
} from "../controllers/users.js";

const userRouter = new Router();

userRouter.get("/userName/:userName", getUserByName);
userRouter.post("/user", postUser);
userRouter.get("/user/:id", getUserById);
userRouter.patch("/user/:id", patchUser);
userRouter.patch("/:id/lists", addRemoveLists);
userRouter.post("/follow", addRemoveFollowing);

export default userRouter;

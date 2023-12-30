import { Router } from "express";
import {
  addRemoveLists,
  addRemoveFriend,
  getUserById,
  getUserByName,
  patchUser,
  postUser,
} from "../controllers/users.js";

const userRouter = new Router();

userRouter.get("/user/:id", getUserById);
userRouter.get("/user", getUserByName);
userRouter.post("/user", postUser);
userRouter.patch("/user/:id", patchUser);
userRouter.patch("/:id/lists", addRemoveLists);
userRouter.patch("/:id/friends/:friendId", addRemoveFriend);

export default userRouter;

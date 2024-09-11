import { Router } from "express";
import { forgotPassword, login, register, updatePassword, verifyOTP } from "../controllers/auth.js";

const authRouter = Router();

authRouter.post("/login", login);
authRouter.post("/register", register);
authRouter.post("/forgot", forgotPassword);
authRouter.post("/verify", verifyOTP);
authRouter.post("/updatePassword", updatePassword);

export default authRouter;

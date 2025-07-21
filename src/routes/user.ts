import express from "express";
import { jwtStrategyAuth } from "../middleware/jwt";
import * as UserController from "../controllers/UserController";

const userRouter = express.Router();

userRouter.get("/me", jwtStrategyAuth, UserController.me);

export default userRouter;

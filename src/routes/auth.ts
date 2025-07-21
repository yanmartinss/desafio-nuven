import { Router } from "express";
import * as AuthController from "../controllers/AuthController";

const authRouter = Router();

authRouter.post("/register", AuthController.register);
authRouter.post("/login", AuthController.login);

export default authRouter;

import express from "express";
import { jwtStrategyAuth } from "../middleware/jwt";
import * as UserController from "../controllers/UserController";

const userRouter = express.Router();

/**
 * @swagger
 * /me:
 *   get:
 *     summary: Retorna o usuário logado
 *     tags: [me]
 *     responses:
 *       200:
 *         description: retorna usuário logado
 */
userRouter.get("/me", jwtStrategyAuth, UserController.me);

export default userRouter;

import { Router } from "express";
import * as AuthController from "../controllers/AuthController";

const authRouter = Router();

/**
 * @openapi
 * /register:
 *   post:
 *     tags: [Registro]
 *     summary: Registro
 *     responses:
 *       200:
 *         description: Registra um usuário no banco
 */
authRouter.post("/register", AuthController.register);
/**
 * @openapi
 * /login:
 *   get:
 *     tags: [Login]
 *     summary: Login
 *     responses:
 *       200:
 *         description: Loga o usuário e retorna o token
 */
authRouter.post("/login", AuthController.login);

export default authRouter;

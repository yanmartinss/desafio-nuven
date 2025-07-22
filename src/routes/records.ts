import express from "express";
import { jwtStrategyAuth } from "../middleware/jwt";
import * as RecordController from "../controllers/RecordController";

const recordsRouter = express.Router();

/**
 * @openapi
 * /records/search:
 *   get:
 *     tags: [Records]
 *     summary: Records
 *     responses:
 *       200:
 *         description: Busca uma palavra chave dos uploads que foram enviados no dataset
 */
recordsRouter.get("/search", jwtStrategyAuth, RecordController.search);

export default recordsRouter;

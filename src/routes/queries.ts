import express from "express";
import { jwtStrategyAuth } from "../middleware/jwt";
import * as QueryController from "../controllers/QueryController";

const queriesRouter = express.Router();

/**
 * @openapi
 * /queries:
 *   post:
 *     tags: [Queries]
 *     summary: Queries
 *     responses:
 *       200:
 *         description: Faz uma pergunta pra Mock IA responder
 */
queriesRouter.post("", jwtStrategyAuth, QueryController.question);
/**
 * @openapi
 * /queries:
 *   get:
 *     tags: [Queries]
 *     summary: Queries
 *     responses:
 *       200:
 *         description: Manda uma palavra chave e um datasetId para retornar a resposta do MockIa
 */
queriesRouter.get("", jwtStrategyAuth, QueryController.answer);

export default queriesRouter;

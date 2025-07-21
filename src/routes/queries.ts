import express from "express";
import { jwtStrategyAuth } from "../middleware/jwt";
import * as QueryController from "../controllers/QueryController";

const queriesRouter = express.Router();

queriesRouter.post("", jwtStrategyAuth, QueryController.question);
queriesRouter.get("", jwtStrategyAuth, QueryController.answer);

export default queriesRouter;

import express from "express";
import { jwtStrategyAuth } from "../middleware/jwt";
import * as RecordController from "../controllers/RecordController";

const recordsRouter = express.Router();

recordsRouter.get("/search", jwtStrategyAuth, RecordController.search);

export default recordsRouter;

import express from "express";
import authRouter from "./auth";
import userRouter from "./user";
import datasetRouter from "./dataset";
import recordsRouter from "./records";
import queriesRouter from "./queries";

const router = express.Router();

router.use("/health", (req, res) => {
  res.json({ status: "ok" });
});
router.use("/auth", authRouter);
router.use(userRouter);
router.use("/datasets", datasetRouter);
router.use("/records", recordsRouter);
router.use("/queries", queriesRouter);

export default router;

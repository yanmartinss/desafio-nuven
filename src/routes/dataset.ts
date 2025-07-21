import express from "express";
import { jwtStrategyAuth } from "../middleware/jwt";
import multer from "multer";
import * as DatasetController from "../controllers/DatasetController";

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "./uploads"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });
const datasetRouter = express.Router();

datasetRouter.post(
  "/upload",
  jwtStrategyAuth,
  upload.single("file"),
  DatasetController.upload
);
datasetRouter.get("", jwtStrategyAuth, DatasetController.getDatasets);
datasetRouter.get(
  "/:id/records",
  jwtStrategyAuth,
  DatasetController.listRecords
);

export default datasetRouter;

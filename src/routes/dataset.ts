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

/**
 * @openapi
 * /datasets/upload:
 *   post:
 *     tags: [Upload]
 *     summary: Upload
 *     responses:
 *       200:
 *         description: Faz o upload de algum arquivo csv ou pdf
 */
datasetRouter.post(
  "/upload",
  jwtStrategyAuth,
  upload.single("file"),
  DatasetController.upload
);
/**
 * @openapi
 * /datasets:
 *   get:
 *     tags: [Upload]
 *     summary: Datasets
 *     responses:
 *       200:
 *         description: Retorna os datasets criados
 */
datasetRouter.get("", jwtStrategyAuth, DatasetController.getDatasets);
/**
 * @openapi
 * /datasets/:id/records:
 *   post:
 *     tags: [Upload]
 *     summary: Datasets
 *     responses:
 *       200:
 *         description: Retorna os registros de um dataset específico
 */
datasetRouter.get(
  "/:id/records",
  jwtStrategyAuth,
  DatasetController.listRecords
);

export default datasetRouter;

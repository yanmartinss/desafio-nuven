import { RequestHandler } from "express";
import {
  getAllDatasets,
  getRecordById,
  processUpload,
} from "../services/DatasetService";

export const upload: RequestHandler = async (req, res) => {
  try {
    const datasetId = await processUpload(req.file, req.user);
    res
      .status(201)
      .json({ message: "Upload realizado com sucesso", datasetId });
  } catch (error: any) {
    console.error(error);
    const statusCode =
      error.message === "Arquivo obrigatório" ||
      error.message === "Usuário não autenticado" ||
      error.message === "Apenas CSV ou PDF são aceitos"
        ? 400
        : 500;
    res.status(statusCode).json({ error: error.message });
  }
};

export const getDatasets: RequestHandler = async (req, res) => {
  if (!req.user) return res.status(401).json({ error: "Não autorizado" });

  const result = await getAllDatasets(req.user);
  res.status(201).json({ result });
};

export const listRecords: RequestHandler = async (req, res) => {
  if (!req.user) return res.status(401).json({ error: "Não autorizado" });

  const idParam = req.params.id;

  if (!/^\d+$/.test(idParam)) {
    return res
      .status(400)
      .json({ error: "ID inválido: deve conter apenas números" });
  }

  const datasetId = parseInt(idParam, 10);
  const result = await getRecordById(req.user, datasetId);

  res.json({ result });
};

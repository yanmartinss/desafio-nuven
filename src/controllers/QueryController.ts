import { RequestHandler } from "express";
import { askQuestion, getQueryHistory } from "../services/QueryService";

export const question: RequestHandler = async (req, res) => {
  if (!req.user) return res.status(401).json({ error: "Não autorizado" });
  const { question, datasetId } = req.body;
  if (!question || !datasetId) {
    return res
      .status(400)
      .json({ error: "Pergunta e datasetId são obrigatórios" });
  }
  const result = await askQuestion(question, datasetId, req.user);
  if (result) {
    return res.status(201).json({ result });
  }
  return res.json({ error: "Ocorreu algum erro" });
};

export const answer: RequestHandler = async (req, res) => {
  if (!req.user) return res.status(401).json({ error: "Não autorizado" });
  const result = await getQueryHistory(req.user);
  if (result) {
    return res.status(201).json({ result });
  }
  return res.json({ error: "Ocorreu algum erro" });
};

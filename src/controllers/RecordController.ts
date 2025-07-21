import { RequestHandler } from "express";
import { searchRecords } from "../services/RecordService";

export const search: RequestHandler = async (req, res) => {
  if (!req.user) return res.status(401).json({ error: "Não autorizado" });

  const query = req.query.query as string;

  if (!query) {
    return res.status(400).json({ error: "Parâmetro 'query' é obrigatório." });
  }

  try {
    const results = await searchRecords(query);
    return res.status(200).json({ results });
  } catch (error) {
    console.error("Erro ao buscar registros:", error);
    return res.status(500).json({ error: "Erro interno no servidor." });
  }
};

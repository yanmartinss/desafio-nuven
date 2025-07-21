import { RequestHandler } from "express";
import { getUserData } from "../services/UserService";

export const me: RequestHandler = async (req, res) => {
  if (!req.user) return res.status(401).json({ error: "Não autorizado" });

  const userData = await getUserData(req.user);
  res.status(200).json(userData);
};

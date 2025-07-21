import { RequestHandler } from "express";
import { loginUser, registerUser } from "../services/AuthService";

export const register: RequestHandler = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await registerUser(name, email, password);
    res.status(201).json({ user, message: "Usuário criado com sucesso" });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const login: RequestHandler = async (req, res) => {
  const { email, password } = req.body;
  res.status(201).json(await loginUser(email, password));
};

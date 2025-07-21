import bcrypt from "bcrypt";
import { prisma } from "../libs/prisma";
import jwt from "jsonwebtoken";

export const registerUser = async (
  name: string,
  email: string,
  password: string
) => {
  const userExists = await prisma.user.findUnique({ where: { email } });
  if (userExists) {
    throw new Error("Usuário já existe.");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await prisma.user.create({
    data: { name, email, password: hashedPassword },
    select: {
      id: true,
      name: true,
      email: true,
    },
  });

  return newUser;
};

export const loginUser = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) throw new Error("Email ou senha inválidos");

  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) throw new Error("Email ou senha inválidos");

  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_KEY!,
    { expiresIn: "30d" }
  );

  return { user: { id: user.id, name: user.name, email: user.email }, token };
};

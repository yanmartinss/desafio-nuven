import { prisma } from "../libs/prisma";

export const getUserData = async (user: any) => {
  const { id } = user;
  const userData = await prisma.user.findUnique({
    where: { id },
    select: { id: true, name: true, email: true },
  });

  return userData;
};

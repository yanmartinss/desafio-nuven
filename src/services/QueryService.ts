import { prisma } from "../libs/prisma";
import { mockIAResponse } from "../mock/mockIAResponse";

export const askQuestion = async (
  question: string,
  datasetId: number,
  userId: any
) => {
  try {
    const { id } = userId;
    const answer = mockIAResponse(question);
    const query = await prisma.query.create({
      data: {
        question,
        answer,
        dataset_id: datasetId,
        user_id: id,
      },
    });

    return query;
  } catch (err) {
    return false;
  }
};

export const getQueryHistory = async (userId: any) => {
  try {
    const { id } = userId;
    const query = await prisma.query.findMany({
      where: { user_id: id },
    });

    return query;
  } catch (err) {
    return false;
  }
};

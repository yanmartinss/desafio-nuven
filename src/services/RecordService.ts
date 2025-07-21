import { prisma } from "../libs/prisma";

export const searchRecords = async (text: string) => {
  const results = await prisma.$queryRaw<
    {
      id: number;
      dataset_id: number;
      data_json: any;
      dataset_name: string;
      user_id: number;
      size: number;
    }[]
  >`
    SELECT 
      r.id, 
      r.dataset_id,
      r.data_json, 
      d.name AS filename, 
      d.user_id, 
      d.size
    FROM "Record" r
    JOIN "Dataset" d ON r.dataset_id = d.id
    WHERE r.data_json::text ILIKE ${`%${text}%`}
  `;
  return results;
};

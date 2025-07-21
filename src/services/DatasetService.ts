import { parse as csvParse } from "csv-parse/sync";
import pdfParse from "pdf-parse";
import { prisma } from "../libs/prisma";
import fs from "fs";
import { InputJsonValue } from "../generated/prisma/runtime/library";
import { Prisma } from "../generated/prisma";

export const processUpload = async (file: any, user: any) => {
  if (!file) throw new Error("Arquivo obrigatório");
  if (!user) throw new Error("Usuário não autenticado");

  const ext = file.originalname.split(".").pop().toLowerCase();
  if (!["csv", "pdf"].includes(ext)) {
    fs.unlinkSync(file.path);
    throw new Error("Apenas CSV ou PDF são aceitos");
  }

  const dataset = await prisma.dataset.create({
    data: {
      name: file.originalname,
      size: file.size,
      user_id: user.id,
      createdAt: new Date(),
    },
  });

  if (ext === "csv") {
    const csvContent = fs.readFileSync(file.path, "utf8");

    const recordsRaw = csvParse(csvContent, {
      columns: true,
      skip_empty_lines: true,
    });

    const records = recordsRaw.filter((record: any) => {
      return Object.values(record).some((value) => String(value).trim() !== "");
    });

    for (const record of records) {
      await prisma.record.create({
        data: {
          dataset_id: dataset.id,
          data_json: record as Prisma.InputJsonValue,
          createdAt: new Date(),
        },
      });
    }
  } else if (ext === "pdf") {
    const buffer = fs.readFileSync(file.path);
    const pdfData = await pdfParse(buffer);

    const pdfRecord = {
      text: pdfData.text,
    };

    await prisma.record.create({
      data: {
        dataset_id: dataset.id,
        data_json: pdfRecord,
        createdAt: new Date(),
      },
    });
  }

  return dataset.id;
};

export const getAllDatasets = async (user: any) => {
  const { id } = user;

  try {
    const datasets = await prisma.dataset.findMany({
      where: { user_id: id },
      select: {
        id: true,
        name: true,
        createdAt: true,
      },
    });
    return datasets;
  } catch (error) {
    return { error: "Nenhum dataset para listar" };
  }
};

export const getRecordById = async (userId: any, datasetId: number) => {
  const { id } = userId;

  try {
    const dataset = await prisma.dataset.findUnique({
      where: { id: datasetId },
    });

    if (!dataset || dataset.user_id !== id)
      return { error: "Dataset não encontrado" };

    const records = await prisma.record.findMany({
      where: { dataset_id: datasetId },
      select: {
        id: true,
        data_json: true,
        createdAt: true,
      },
    });

    return records;
  } catch (error) {
    return error;
  }
};

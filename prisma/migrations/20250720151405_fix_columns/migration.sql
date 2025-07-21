/*
  Warnings:

  - You are about to drop the column `base64` on the `Dataset` table. All the data in the column will be lost.
  - You are about to drop the column `path` on the `Dataset` table. All the data in the column will be lost.
  - You are about to drop the column `size` on the `Dataset` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Dataset` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Dataset" DROP COLUMN "base64",
DROP COLUMN "path",
DROP COLUMN "size",
DROP COLUMN "type";

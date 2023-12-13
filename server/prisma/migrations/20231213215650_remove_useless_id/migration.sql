/*
  Warnings:

  - The primary key for the `LovedQuiz` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `LovedQuiz` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "LovedQuiz_id_key";

-- AlterTable
ALTER TABLE "LovedQuiz" DROP CONSTRAINT "LovedQuiz_pkey",
DROP COLUMN "id";

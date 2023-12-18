/*
  Warnings:

  - You are about to drop the column `createdAt` on the `QuizFeedback` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "QuizFeedback" DROP COLUMN "createdAt",
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

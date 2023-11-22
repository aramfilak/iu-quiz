/*
  Warnings:

  - You are about to drop the column `studyFormats` on the `StudentProfile` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "StudentProfile" DROP COLUMN "studyFormats",
ADD COLUMN     "studyFormat" VARCHAR(20);

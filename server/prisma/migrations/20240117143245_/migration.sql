/*
  Warnings:

  - You are about to drop the column `numberOfCorrectAnswers` on the `QuizScore` table. All the data in the column will be lost.
  - You are about to drop the column `timeTaken` on the `QuizScore` table. All the data in the column will be lost.
  - Added the required column `correctAnswers` to the `QuizScore` table without a default value. This is not possible if the table is not empty.
  - Added the required column `takenTime` to the `QuizScore` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "QuizScore" DROP COLUMN "numberOfCorrectAnswers",
DROP COLUMN "timeTaken",
ADD COLUMN     "correctAnswers" INTEGER NOT NULL,
ADD COLUMN     "takenTime" INTEGER NOT NULL;

/*
  Warnings:

  - You are about to drop the column `studentId` on the `Quiz` table. All the data in the column will be lost.
  - Added the required column `authorId` to the `Quiz` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Quiz" DROP CONSTRAINT "Quiz_studentId_fkey";

-- AlterTable
ALTER TABLE "Quiz" DROP COLUMN "studentId",
ADD COLUMN     "authorId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "FollowedQuizzes" (
    "followerId" TEXT NOT NULL,
    "quizId" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "FollowedQuizzes_followerId_quizId_key" ON "FollowedQuizzes"("followerId", "quizId");

-- AddForeignKey
ALTER TABLE "Quiz" ADD CONSTRAINT "Quiz_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FollowedQuizzes" ADD CONSTRAINT "FollowedQuizzes_followerId_fkey" FOREIGN KEY ("followerId") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FollowedQuizzes" ADD CONSTRAINT "FollowedQuizzes_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES "Quiz"("id") ON DELETE CASCADE ON UPDATE CASCADE;

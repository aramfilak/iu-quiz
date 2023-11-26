/*
  Warnings:

  - You are about to drop the column `courseOfStudy` on the `Quiz` table. All the data in the column will be lost.
  - Added the required column `courseId` to the `Quiz` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Quiz" DROP COLUMN "courseOfStudy",
ADD COLUMN     "courseId" TEXT NOT NULL;

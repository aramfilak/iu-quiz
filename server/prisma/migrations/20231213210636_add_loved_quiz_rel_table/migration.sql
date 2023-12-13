-- CreateTable
CREATE TABLE "LovedQuiz" (
    "id" SERIAL NOT NULL,
    "studentId" TEXT NOT NULL,
    "quizId" INTEGER NOT NULL,

    CONSTRAINT "LovedQuiz_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "LovedQuiz_id_key" ON "LovedQuiz"("id");

-- CreateIndex
CREATE UNIQUE INDEX "LovedQuiz_studentId_quizId_key" ON "LovedQuiz"("studentId", "quizId");

-- AddForeignKey
ALTER TABLE "LovedQuiz" ADD CONSTRAINT "LovedQuiz_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LovedQuiz" ADD CONSTRAINT "LovedQuiz_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES "Quiz"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- CreateTable
CREATE TABLE "Student" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "verified" BOOLEAN NOT NULL,
    "image" TEXT NOT NULL,
    "nickName" TEXT NOT NULL,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Student_id_key" ON "Student"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Student_email_key" ON "Student"("email");

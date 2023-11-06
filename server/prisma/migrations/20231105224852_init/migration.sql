-- CreateTable
CREATE TABLE "Sutdent" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "usernames" TEXT NOT NULL,

    CONSTRAINT "Sutdent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Sutdent_id_key" ON "Sutdent"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Sutdent_email_key" ON "Sutdent"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Sutdent_usernames_key" ON "Sutdent"("usernames");

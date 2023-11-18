-- CreateTable
CREATE TABLE "StudentAuth" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "emailVerificationToken" TEXT NOT NULL,

    CONSTRAINT "StudentAuth_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StudentProfile" (
    "id" TEXT NOT NULL,
    "nickName" TEXT NOT NULL,
    "studentAuthId" TEXT NOT NULL,

    CONSTRAINT "StudentProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProfileImage" (
    "publicId" TEXT NOT NULL DEFAULT '',
    "url" TEXT NOT NULL DEFAULT '',
    "studentProfileId" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "StudentAuth_id_key" ON "StudentAuth"("id");

-- CreateIndex
CREATE UNIQUE INDEX "StudentAuth_email_key" ON "StudentAuth"("email");

-- CreateIndex
CREATE UNIQUE INDEX "StudentProfile_id_key" ON "StudentProfile"("id");

-- CreateIndex
CREATE UNIQUE INDEX "StudentProfile_studentAuthId_key" ON "StudentProfile"("studentAuthId");

-- CreateIndex
CREATE UNIQUE INDEX "ProfileImage_studentProfileId_key" ON "ProfileImage"("studentProfileId");

-- AddForeignKey
ALTER TABLE "StudentProfile" ADD CONSTRAINT "StudentProfile_studentAuthId_fkey" FOREIGN KEY ("studentAuthId") REFERENCES "StudentAuth"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProfileImage" ADD CONSTRAINT "ProfileImage_studentProfileId_fkey" FOREIGN KEY ("studentProfileId") REFERENCES "StudentProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

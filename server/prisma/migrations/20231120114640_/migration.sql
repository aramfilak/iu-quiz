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
    "studentId" TEXT NOT NULL,
    "registrationDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "StudentProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProfileImage" (
    "publicId" TEXT NOT NULL DEFAULT '',
    "url" TEXT NOT NULL DEFAULT '',
    "profileId" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "StudentAuth_id_key" ON "StudentAuth"("id");

-- CreateIndex
CREATE UNIQUE INDEX "StudentAuth_email_key" ON "StudentAuth"("email");

-- CreateIndex
CREATE UNIQUE INDEX "StudentProfile_id_key" ON "StudentProfile"("id");

-- CreateIndex
CREATE UNIQUE INDEX "StudentProfile_studentId_key" ON "StudentProfile"("studentId");

-- CreateIndex
CREATE UNIQUE INDEX "ProfileImage_profileId_key" ON "ProfileImage"("profileId");

-- AddForeignKey
ALTER TABLE "StudentProfile" ADD CONSTRAINT "StudentProfile_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "StudentAuth"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProfileImage" ADD CONSTRAINT "ProfileImage_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "StudentProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

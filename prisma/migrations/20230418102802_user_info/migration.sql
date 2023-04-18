/*
  Warnings:

  - You are about to drop the column `personalMail` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `telegramUserName` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "personalMail",
DROP COLUMN "telegramUserName",
ADD COLUMN     "country" TEXT,
ADD COLUMN     "emailPersonal" TEXT,
ADD COLUMN     "emailSecondary" TEXT,
ADD COLUMN     "status" TEXT,
ADD COLUMN     "telegram" TEXT;

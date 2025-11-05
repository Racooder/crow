/*
  Warnings:

  - Added the required column `type` to the `Feedback` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "FeedbackType" AS ENUM ('BUG', 'FEATURE', 'GENERAL');

-- AlterTable
ALTER TABLE "Feedback" ADD COLUMN     "type" "FeedbackType" NOT NULL;

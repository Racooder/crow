/*
  Warnings:

  - Added the required column `creatorName` to the `Quote` table without a default value. This is not possible if the table is not empty.
  - Added the required column `authorName` to the `QuoteStatement` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Quote" ADD COLUMN     "creatorName" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "QuoteStatement" ADD COLUMN     "authorName" TEXT NOT NULL;

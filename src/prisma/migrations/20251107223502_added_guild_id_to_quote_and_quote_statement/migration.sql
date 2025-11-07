/*
  Warnings:

  - You are about to drop the column `creatorName` on the `Quote` table. All the data in the column will be lost.
  - You are about to drop the column `authorName` on the `QuoteStatement` table. All the data in the column will be lost.
  - Added the required column `creatorUsername` to the `Quote` table without a default value. This is not possible if the table is not empty.
  - Added the required column `guildId` to the `Quote` table without a default value. This is not possible if the table is not empty.
  - Added the required column `authorUsername` to the `QuoteStatement` table without a default value. This is not possible if the table is not empty.
  - Added the required column `guildId` to the `QuoteStatement` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "public"."Quote_token_creatorId_createdAt_idx";

-- DropIndex
DROP INDEX "public"."QuoteStatement_quoteId_authorId_order_idx";

-- AlterTable
ALTER TABLE "Quote" DROP COLUMN "creatorName",
ADD COLUMN     "creatorUsername" TEXT NOT NULL,
ADD COLUMN     "guildId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "QuoteStatement" DROP COLUMN "authorName",
ADD COLUMN     "authorUsername" TEXT NOT NULL,
ADD COLUMN     "guildId" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "Quote_token_creatorId_creatorUsername_guildId_createdAt_idx" ON "Quote"("token", "creatorId", "creatorUsername", "guildId", "createdAt");

-- CreateIndex
CREATE INDEX "QuoteStatement_quoteId_authorId_authorUsername_order_guildI_idx" ON "QuoteStatement"("quoteId", "authorId", "authorUsername", "order", "guildId");

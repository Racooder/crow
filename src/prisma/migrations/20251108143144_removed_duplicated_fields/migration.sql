/*
  Warnings:

  - You are about to drop the column `guildId` on the `QuoteStatement` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[token]` on the table `Quote` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "public"."QuoteStatement_quoteId_authorId_authorUsername_order_guildI_idx";

-- AlterTable
ALTER TABLE "QuoteStatement" DROP COLUMN "guildId";

-- CreateIndex
CREATE UNIQUE INDEX "Quote_token_key" ON "Quote"("token");

-- CreateIndex
CREATE INDEX "QuoteStatement_quoteId_authorId_authorUsername_order_idx" ON "QuoteStatement"("quoteId", "authorId", "authorUsername", "order");

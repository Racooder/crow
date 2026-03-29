/*
  Warnings:

  - A unique constraint covering the columns `[quoteId,order]` on the table `QuoteStatement` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "QuoteStatement_quoteId_order_key" ON "QuoteStatement"("quoteId", "order");

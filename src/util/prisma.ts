import type { QuoteMeta, QuoteStatement } from "../generated/prisma/client.js";

export type PopulatedQuote = { statements: QuoteStatement[] } & QuoteMeta;

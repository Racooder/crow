import type { User } from "discord.js";
import type { QuoteMeta } from "../../generated/prisma/client.js";
import prisma from "../../prisma.js";
import type { PopulatedQuote } from "../../util/prisma.js";

export function getQuoteByToken(token: string): Promise<PopulatedQuote | null> {
    return prisma.quoteMeta.findUnique({
        where: {
            token: token,
        },
        include: {
            statements: true,
        }
    });
}

export function checkQuoteEditPermissions(quote: QuoteMeta, user: User): boolean {
    return quote.creatorId === user.id;
    // TODO: Allow server admins to edit any quote in their server
}

export type QuoteListFilter = {
    guildId: string;
    creatorId?: string;
    creatorUsername?: string;
    contextContains?: string;
    createdAfter?: Date;
    createdBefore?: Date;
    textContains?: string;
    authorId?: string;
    authorUsername?: string;
    isConversation?: boolean;
}

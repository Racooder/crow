import type { Guild, User } from "discord.js";
import type { QuoteMeta, QuoteStatement } from "../../generated/prisma/client.js";
import prisma from "../../prisma.js";
import type { PopulatedQuote } from "../../util/prisma.js";
import { isUserInGuild } from "../../util/guild.js";

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

export async function formatStatements(statements: QuoteStatement[], guild: Guild | null): Promise<string> {
    return Promise.all(statements.map(s => formatSingleStatement(s, guild))).then(lines => lines.join("\n"));
}

async function formatSingleStatement(statement: QuoteStatement, guild: Guild | null): Promise<string> {
    const author = await formatStatementAuthor(statement, guild);
    return `"${statement.text}" - ${author}`;
}

async function formatStatementAuthor(statement: QuoteStatement, guild: Guild | null): Promise<string> {
    if (guild !== null && await isUserInGuild(statement.authorId, guild)) {
        return `<@${statement.authorId}>`;
    }
    return statement.authorUsername;
}


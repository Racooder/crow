import type { Client, Guild, User } from "discord.js";
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

const QUOTE_LIST_PAGE_SIZE = 10;

export async function getListQuotes(page: number, filter: QuoteListFilter): Promise<PopulatedQuote[]> {
    const whereClause = Object.fromEntries(
        Object.entries(filter).filter(([_, value]) => value !== undefined)
    );

    return prisma.quoteMeta.findMany({
        where: whereClause,
        include: {
            statements: true,
        },
        orderBy: {
            createdAt: "desc",
        },
        skip: (page - 1) * QUOTE_LIST_PAGE_SIZE,
        take: QUOTE_LIST_PAGE_SIZE,
    });
}

export async function getUserDisplayName(client: Client, guild: Guild | null, userId: string, fallbackUsername: string): Promise<string> {
    if (guild) {
        return guild.members.fetch(userId)
            .then(member => member.displayName)
            .catch(() => fallbackUsername);
    } else {
        return client.users.fetch(userId)
            .then(user => user.username)
            .catch(() => fallbackUsername);
    }
}

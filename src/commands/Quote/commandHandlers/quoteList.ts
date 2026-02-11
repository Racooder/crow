import type { ChatInputCommandInteraction } from "discord.js";
import { Err, type Result } from "../../../result.js";
import { debug } from "../../../log.js";
import type { QuoteListFilter } from "../util.js";
import type { PopulatedQuote } from "../../../util/prisma.js";
import prisma from "../../../prisma.js";

const QUOTE_LIST_PAGE_SIZE = 10;

export default async function quoteListCommandHandler(interaction: ChatInputCommandInteraction): Promise<Result> {
    debug("Handling 'quote list' command");

    const quoteObjects = await getListQuotes(1, { guildId: interaction.guildId! });

    return Err("Not implemented yet"); // TODO: Implement
}

async function getListQuotes(page: number, filter: QuoteListFilter): Promise<PopulatedQuote[]> {
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

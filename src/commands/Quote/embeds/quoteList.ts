import { EmbedBuilder } from "discord.js";
import type { PopulatedQuote } from "../../../database/Quote.js";
import Colors from "../../../Colors.js";
import type { QuoteListFilter } from "../util.js";

export default async function createQuoteListEmbed(quotes: PopulatedQuote[], filter: QuoteListFilter, page: number, pages: number): Promise<EmbedBuilder> {
    const embed = new EmbedBuilder()
    .setTitle(`Quotes (Page ${page} of ${pages})`)
    .setColor(Colors.QUOTE_EMBED);

    const filterDesc = createFilterDescription(filter);
    if (filterDesc === undefined) {
        embed.setDescription(`Showing ${quotes.length} quotes:`);
    } else {
        embed.setDescription(`Showing ${quotes.length} quotes matching:\n${filterDesc}`);
    }

    return embed;
}

function createFilterDescription(filter: QuoteListFilter): string | undefined {
    const parts: string[] = [];

    if (filter.creatorId) {
        parts.push(`Creator ID: \`${filter.creatorId}\``);
    }
    if (filter.contextContains) {
        parts.push(`Context contains: "${filter.contextContains}"`);
    }
    if (filter.createdAfter) {
        parts.push(`Created after: ${filter.createdAfter.toDateString()}`);
    }
    if (filter.createdBefore) {
        parts.push(`Created before: ${filter.createdBefore.toDateString()}`);
    }
    if (filter.textContains) {
        parts.push(`Text contains: "${filter.textContains}"`);
    }
    if (filter.authorId) {
        parts.push(`Author ID: \`${filter.authorId}\``);
    }
    if (filter.isConversation !== undefined) {
        parts.push(`Is conversation: ${filter.isConversation ? "Yes" : "No"}`);
    }

    return parts.length > 0 ? parts.join("\n") : undefined;
}

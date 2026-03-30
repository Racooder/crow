import { Client, EmbedBuilder, Guild, type APIEmbedField } from "discord.js";
import type { PopulatedQuote } from "../../../database/Quote.js";
import Colors from "../../../Colors.js";
import { formatStatements, getUserDisplayName, type QuoteListFilter } from "../util.js";

export default async function createQuoteListEmbed(client: Client, guild: Guild | null, quotes: PopulatedQuote[], filter: QuoteListFilter, page: number, pages: number): Promise<EmbedBuilder> {
    const embed = new EmbedBuilder()
    .setTitle(`Quotes (Page ${page} of ${pages})`)
    .setColor(Colors.QUOTE_EMBED);

    const filterDesc = createFilterDescription(filter);
    if (filterDesc === undefined) {
        embed.setDescription(`**Currently still work in progress, page buttons coming soon.**\n\nShowing ${quotes.length} quotes:`); // TODO: Remove notice
    } else {
        embed.setDescription(`**Currently still work in progress, page buttons coming soon.**\n\nShowing ${quotes.length} quotes matching:\n${filterDesc}`); // TODO: Remove notice
    }

    const fields = await quoteListToFields(client, guild, quotes);
    if (fields.length === 0) {
        embed.addFields({ name: "No quotes found", value: "Try adjusting your filters?" });
    } else {
        embed.addFields(fields);
    }

    return embed;
}

async function quoteListToFields(client: Client, guild: Guild | null, quotes: PopulatedQuote[]): Promise<APIEmbedField[]> {
    let fields: APIEmbedField[] = [];
    for (const q of quotes) {
        const authorDisplayName = await getUserDisplayName(client, guild, q.creatorId, q.creatorUsername);
        const fieldName = `Created by ${authorDisplayName} (Token: \`${q.token}\`)`;
        const fieldValue = await formatStatements(q.statements, guild);

        fields.push({ name: fieldName, value: fieldValue });
    }
    return fields;
}

function createFilterDescription(filter: QuoteListFilter): string | undefined {
    const parts: string[] = [];

    if (filter.creatorId) {
        parts.push(`Creator: <@${filter.creatorId}>`);
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
        parts.push(`Author: <@${filter.authorId}>`);
    }
    if (filter.isConversation !== undefined) {
        parts.push(`Is conversation: ${filter.isConversation ? "Yes" : "No"}`);
    }

    return parts.length > 0 ? parts.join("\n") : undefined;
}

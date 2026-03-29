import { EmbedBuilder, Guild } from "discord.js";
import Colors from "../../../Colors.js";
import type { PopulatedQuote } from "../../../util/prisma.js";
import { formatStatements } from "../util.js";

export default async function createDeleteConfirmEmbed(quoteObj: PopulatedQuote, guild: Guild | null): Promise<EmbedBuilder> {
    return new EmbedBuilder()
        .setTitle("Are you sure you want to delete this quote?")
        .setDescription(await formatStatements(quoteObj.statements, guild))
        .setColor(Colors.CONFIRM_DANGEROUS_EMBED);
}
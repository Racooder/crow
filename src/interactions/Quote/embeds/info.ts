import { EmbedBuilder, Guild } from "discord.js";
import Colors from "../../../Colors.js";
import type { PopulatedQuote } from "../../../util/prisma.js";
import { formatStatements } from "../util.js";

export default async function createInfoEmbed(quoteObj: PopulatedQuote, guild: Guild | null): Promise<EmbedBuilder> {
    return new EmbedBuilder()
        .setTitle(`Quote Info (${quoteObj.token})`)
        .setDescription(await formatStatements(quoteObj.statements, guild))
        .addFields(
            { name: "Context", value: quoteObj.context || "No context provided." }
        )
        .setColor(Colors.CONFIRM_DANGEROUS_EMBED);
}

import { Client, EmbedBuilder, Guild } from "discord.js";
import Colors from "../../../Colors.js";
import type { PopulatedQuote } from "../../../util/prisma.js";
import { formatStatements } from "../util.js";

export default async function createInfoEmbed(client: Client, quoteObj: PopulatedQuote, guild: Guild | null): Promise<EmbedBuilder> {
    const embed = new EmbedBuilder()
        .setTitle(`Quote Info (${quoteObj.token})`)
        .setDescription(await formatStatements(quoteObj.statements, guild))
        .addFields(
            { name: "Context", value: quoteObj.context || "No context provided." }
        )
        .setColor(Colors.CONFIRM_DANGEROUS_EMBED)
        .setTimestamp(quoteObj.createdAt);

    if (guild) {
        const creatorUser = await guild.members.fetch(quoteObj.creatorId).then(member => member.user).catch(() => null);
        if (creatorUser) {
            embed.setAuthor({
                name: `Created by ${creatorUser.displayName}`,
                iconURL: creatorUser.displayAvatarURL(),
            })
            return embed;
        }
    }

    return embed.setAuthor({ name: `Created by ${quoteObj.creatorUsername}` });
}

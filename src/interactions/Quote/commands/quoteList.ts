import { type ChatInputCommandInteraction } from "discord.js";
import { Ok, type Result } from "../../../result.js";
import { debug } from "../../../log.js";
import { getListQuotes } from "../util.js";
import createQuoteListEmbed from "../embeds/quoteList.js";

export default async function quoteListCommandHandler(interaction: ChatInputCommandInteraction): Promise<Result> {
    debug("Handling 'quote list' command");

    const filter = {
        guildId: interaction.guildId || interaction.user.id,
    };

    const quoteObjects = await getListQuotes(1, filter);
    const embed = await createQuoteListEmbed(interaction.client, interaction.guild, quoteObjects, filter, 1, 1);

    await interaction.reply({ embeds: [embed] });

    return Ok();
}

import { type ChatInputCommandInteraction } from "discord.js";
import { Ok, type Result } from "../../../result.js";
import { debug } from "../../../log.js";
import { getListQuotes } from "../util.js";
import createQuoteListEmbed from "../embeds/quoteList.js";

export default async function quoteListCommandHandler(interaction: ChatInputCommandInteraction): Promise<Result> {
    debug("Handling 'quote list' command");

    const page = interaction.options.getInteger("page") || 1; // TODO: Remove after button implementation is done

    const filter = {
        guildId: interaction.guildId || interaction.user.id,
    };

    const quoteObjects = await getListQuotes(page, filter);
    const embed = await createQuoteListEmbed(interaction.client, interaction.guild, quoteObjects, filter, page);

    await interaction.reply({ embeds: [embed] });

    return Ok();
}

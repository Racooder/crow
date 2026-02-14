import { MessageFlags, type ChatInputCommandInteraction } from "discord.js";
import { Ok, type Result } from "../../../result.js";
import { debug } from "../../../log.js";
import createEditMetaModal from "../modals/editMeta.js";
import { checkQuoteEditPermissions, getQuoteByToken } from "../util.js";

export default async function quoteEditCommandHandler(interaction: ChatInputCommandInteraction): Promise<Result> {
    debug("Handling 'quote edit' command");

    const token = interaction.options.getString("token", true);

    const quoteObj = await getQuoteByToken(token);

    if (quoteObj === null) {
        interaction.reply({
            content: `No quote found with token \`${token}\`.`,
            flags: [MessageFlags.Ephemeral],
        });
        return Ok();
    }

    if (!checkQuoteEditPermissions(quoteObj, interaction.user)) {
        interaction.reply({
            content: "You can only edit quotes that you have created.",
            flags: [MessageFlags.Ephemeral],
        });
        return Ok();
    }

    const modal = createEditMetaModal(quoteObj);
    await interaction.showModal(modal);

    return Ok();
}

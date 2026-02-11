import { ActionRowBuilder, ButtonBuilder, ChatInputCommandInteraction, MessageFlags } from "discord.js";
import { Ok, type Result } from "../../../result.js";
import { debug } from "../../../log.js";
import createDeleteConfirmEmbed from "../embeds/deleteConfirm.js";
import createDeleteConfirmButton from "../components/deleteConfirm/builder.js";
import createDeleteCancelButton from "../components/deleteCancel/builder.js";
import { checkQuoteEditPermissions, getQuoteByToken } from "../util.js";

export default async function quoteRemoveCommandHandler(interaction: ChatInputCommandInteraction): Promise<Result> {
    debug("Handling 'quote remove' command");

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
            content: "You can only delete quotes that you have created.",
            flags: [MessageFlags.Ephemeral],
        });
        return Ok();
    }

    const confirmEmbed = await createDeleteConfirmEmbed([], interaction.guild!);
    const confirmButtons = createDeleteConfirmButtons(token);

    interaction.reply({
        embeds: [confirmEmbed],
        components: [confirmButtons],
    });
    return Ok();
}

function createDeleteConfirmButtons(quoteId: string): ActionRowBuilder<ButtonBuilder> {
    return new ActionRowBuilder<ButtonBuilder>()
        .addComponents(createDeleteConfirmButton(quoteId), createDeleteCancelButton(quoteId));
}

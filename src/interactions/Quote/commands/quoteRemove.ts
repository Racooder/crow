import removeSubcommandTokenOptionNameLocalizations from "../../../localization/quote/remove_subcommand_token_option_name.json" with { type: 'json' };
import noQuoteWithTokenLocalizations from "../../../localization/quote/no_quote_with_token.json" with { type: 'json' };
import deletePermissionMissingLocalizations from "../../../localization/quote/delete_permission_missing.json" with { type: 'json' };
import translate from "../../../translate.js";

import { ActionRowBuilder, ButtonBuilder, ChatInputCommandInteraction, MessageFlags } from "discord.js";
import { Ok, type Result } from "../../../result.js";
import { debug } from "../../../log.js";
import createDeleteConfirmEmbed from "../embeds/deleteConfirm.js";
import createDeleteConfirmButton from "../components/deleteConfirm/builder.js";
import createDeleteCancelButton from "../components/deleteCancel/builder.js";
import { checkQuoteEditPermissions, getQuoteByToken } from "../util.js";

export default async function quoteRemoveCommandHandler(interaction: ChatInputCommandInteraction): Promise<Result> {
    debug("Handling 'quote remove' command");

    const token = interaction.options.getString(removeSubcommandTokenOptionNameLocalizations["en-US"], true);

    const quoteObj = await getQuoteByToken(token);

    if (quoteObj === null) {
        interaction.reply({
            content: `${translate(noQuoteWithTokenLocalizations)} \`${token}\`.`,
            flags: [MessageFlags.Ephemeral],
        });
        return Ok();
    }

    if (!checkQuoteEditPermissions(quoteObj, interaction.user)) {
        interaction.reply({
            content: `${translate(deletePermissionMissingLocalizations)}`,
            flags: [MessageFlags.Ephemeral],
        });
        return Ok();
    }

    const confirmEmbed = await createDeleteConfirmEmbed(quoteObj, interaction.guild);
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

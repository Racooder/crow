import noQuoteWithTokenLocalizations from "../../../localization/quote/no_quote_with_token.json" with { type: 'json' };
import editPermissionMissingLocalizations from "../../../localization/quote/edit_permission_missing.json" with { type: 'json' };
import cantEditConversationsLocalizations from "../../../localization/quote/cant_edit_conversations.json" with { type: 'json' };
import translate from "../../../translate.js";

import { MessageFlags, type ChatInputCommandInteraction } from "discord.js";
import { Ok, type Result } from "../../../result.js";
import { debug } from "../../../log.js";
import createEditModal from "../modals/edit/builder.js";
import { checkQuoteEditPermissions, getQuoteByToken } from "../util.js";

export default async function quoteEditCommandHandler(interaction: ChatInputCommandInteraction): Promise<Result> {
    debug("Handling 'quote edit' command");

    const token = interaction.options.getString("token", true);

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
            content: `${translate(editPermissionMissingLocalizations)}`,
            flags: [MessageFlags.Ephemeral],
        });
        return Ok();
    }

    if (quoteObj.statements.length > 1) {
        interaction.reply({
            content: `${translate(cantEditConversationsLocalizations)}`,
            flags: [MessageFlags.Ephemeral],
        });
        return Ok();
    }

    const modal = createEditModal(quoteObj);
    await interaction.showModal(modal);

    return Ok();
}

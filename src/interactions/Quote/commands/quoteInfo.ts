import contextSubcommandTokenOptionNameLocalizations from "../../../localization/quote/info_subcommand_token_option_name.json" with { type: 'json' };
import noQuoteWithTokenLocalizations from "../../../localization/quote/no_quote_with_token.json" with { type: 'json' };
import translate from "../../../translate.js";

import { ChatInputCommandInteraction, MessageFlags } from "discord.js";
import { Ok, type Result } from "../../../result.js";
import { debug } from "../../../log.js";
import { getQuoteByToken } from "../util.js";
import createInfoEmbed from "../embeds/info.js";

export default async function quoteInfoCommandHandler(interaction: ChatInputCommandInteraction): Promise<Result> {
    debug("Handling 'quote info' command");

    const token = interaction.options.getString(contextSubcommandTokenOptionNameLocalizations["en-US"], true);

    const quoteObj = await getQuoteByToken(token);

    if (quoteObj === null) {
        interaction.reply({
            content: `${translate(noQuoteWithTokenLocalizations)} \`${token}\`.`,
            flags: [MessageFlags.Ephemeral],
        });
        return Ok();
    }

    const embed = await createInfoEmbed(interaction.client, quoteObj, interaction.guild);

    interaction.reply({
        embeds: [embed],
    });
    return Ok();
}

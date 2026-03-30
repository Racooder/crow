import searchSubcommandCreatorOptionNameLocalizations from "../../../localization/quote/search_subcommand_creator_option_name.json" with { type: 'json' };
import searchSubcommandCreatorNameOptionNameLocalizations from "../../../localization/quote/search_subcommand_creator_name_option_name.json" with { type: 'json' };
import searchSubcommandContextOptionNameLocalizations from "../../../localization/quote/search_subcommand_context_option_name.json" with { type: 'json' };
import searchSubcommandCreatedAfterOptionNameLocalizations from "../../../localization/quote/search_subcommand_created_after_option_name.json" with { type: 'json' };
import searchSubcommandCreatedBeforeOptionNameLocalizations from "../../../localization/quote/search_subcommand_created_before_option_name.json" with { type: 'json' };
import searchSubcommandContentOptionNameLocalizations from "../../../localization/quote/search_subcommand_content_option_name.json" with { type: 'json' };
import searchSubcommandAuthorOptionNameLocalizations from "../../../localization/quote/search_subcommand_author_option_name.json" with { type: 'json' };
import searchSubcommandAuthorNameOptionNameLocalizations from "../../../localization/quote/search_subcommand_author_name_option_name.json" with { type: 'json' };
import searchSubcommandIsConversationOptionNameLocalizations from "../../../localization/quote/search_subcommand_is_conversation_option_name.json" with { type: 'json' };

import type { ChatInputCommandInteraction } from "discord.js";
import { Ok, type Result } from "../../../result.js";
import { debug } from "../../../log.js";
import createQuoteListEmbed from "../embeds/quoteList.js";
import { getListQuotes, type QuoteListFilter } from "../util.js";

export default async function quoteSearchCommandHandler(interaction: ChatInputCommandInteraction): Promise<Result> {
    debug("Handling 'quote search' command");

    const creator = interaction.options.getUser(searchSubcommandCreatorOptionNameLocalizations["en-US"]);
    const creatorUsername = interaction.options.getString(searchSubcommandCreatorNameOptionNameLocalizations["en-US"]);
    const contextContains = interaction.options.getString(searchSubcommandContextOptionNameLocalizations["en-US"]);
    const createdAfterStr = interaction.options.getString(searchSubcommandCreatedAfterOptionNameLocalizations["en-US"]);
    const createdBeforeStr = interaction.options.getString(searchSubcommandCreatedBeforeOptionNameLocalizations["en-US"]);
    const textContains = interaction.options.getString(searchSubcommandContentOptionNameLocalizations["en-US"]);
    const author = interaction.options.getUser(searchSubcommandAuthorOptionNameLocalizations["en-US"]);
    const authorUsername = interaction.options.getString(searchSubcommandAuthorNameOptionNameLocalizations["en-US"]);
    const isConversation = interaction.options.getBoolean(searchSubcommandIsConversationOptionNameLocalizations["en-US"]);

    const createdAfter = createdAfterStr ? new Date(createdAfterStr) : undefined;
    const createdBefore = createdBeforeStr ? new Date(createdBeforeStr) : undefined;

    const filter: QuoteListFilter = {
        guildId: interaction.guildId || interaction.user.id,
    };
    if (creator) filter.creatorId = creator.id;
    if (creatorUsername) filter.creatorUsername = creatorUsername;
    if (contextContains) filter.contextContains = contextContains;
    if (createdAfter) filter.createdAfter = createdAfter;
    if (createdBefore) filter.createdBefore = createdBefore;
    if (textContains) filter.textContains = textContains;
    if (author) filter.authorId = author.id;
    if (authorUsername) filter.authorUsername = authorUsername;
    if (isConversation !== null) filter.isConversation = isConversation;

    const quoteObjects = await getListQuotes(1, filter);
    const embed = await createQuoteListEmbed(interaction.client, interaction.guild, quoteObjects, filter, 1, 1);

    await interaction.reply({ embeds: [embed] });

    return Ok();
}

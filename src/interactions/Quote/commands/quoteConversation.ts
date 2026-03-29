import conversationSubcommandContextOptionNameLocalizations from "../../../localization/quote/conversation_subcommand_first_statement_option_name.json" with { type: 'json' };
import conversationSubcommandFirstStatementOptionNameLocalizations from "../../../localization/quote/conversation_subcommand_first_statement_option_name.json" with { type: 'json' };
import conversationSubcommandFirstAuthorOptionNameLocalizations from "../../../localization/quote/conversation_subcommand_first_author_option_name.json" with { type: 'json' };
import conversationSubcommandSecondStatementOptionNameLocalizations from "../../../localization/quote/conversation_subcommand_second_statement_option_name.json" with { type: 'json' };
import conversationSubcommandSecondAuthorOptionNameLocalizations from "../../../localization/quote/conversation_subcommand_second_author_option_name.json" with { type: 'json' };
import conversationSubcommandThirdStatementOptionNameLocalizations from "../../../localization/quote/conversation_subcommand_third_statement_option_name.json" with { type: 'json' };
import conversationSubcommandThirdAuthorOptionNameLocalizations from "../../../localization/quote/conversation_subcommand_third_author_option_name.json" with { type: 'json' };
import conversationSubcommandFourthStatementOptionNameLocalizations from "../../../localization/quote/conversation_subcommand_fourth_statement_option_name.json" with { type: 'json' };
import conversationSubcommandFourthAuthorOptionNameLocalizations from "../../../localization/quote/conversation_subcommand_fourth_author_option_name.json" with { type: 'json' };
import conversationSubcommandFifthStatementOptionNameLocalizations from "../../../localization/quote/conversation_subcommand_fifth_statement_option_name.json" with { type: 'json' };
import conversationSubcommandFifthAuthorOptionNameLocalizations from "../../../localization/quote/conversation_subcommand_fifth_author_option_name.json" with { type: 'json' };
import conversationSubcommandOnlyThirdStatementOrAuthorLocalizations from "../../../localization/quote/conversation_subcommand_only_third_statement_or_author.json" with { type: 'json' };
import conversationSubcommandOnlyFourthStatementOrAuthorLocalizations from "../../../localization/quote/conversation_subcommand_only_fourth_statement_or_author.json" with { type: 'json' };
import conversationSubcommandOnlyFifthStatementOrAuthorLocalizations from "../../../localization/quote/conversation_subcommand_only_fifth_statement_or_author.json" with { type: 'json' };
import conversationSubcommandSkippedThirdStatementLocalizations from "../../../localization/quote/conversation_subcommand_skipped_third_statement.json" with { type: 'json' };
import conversationSubcommandSkippedFourthStatementLocalizations from "../../../localization/quote/conversation_subcommand_skipped_fourth_statement.json" with { type: 'json' };
import conversationSubcommandCompletedLocalizations from "../../../localization/quote/conversation_subcommand_completed.json" with { type: 'json' };
import translate from '../../../translate.js';

import type { ChatInputCommandInteraction, User } from "discord.js";
import { Ok, type Result } from "../../../result.js";
import { debug } from "../../../log.js";
import { generateToken } from "../../../token.js";
import prisma from "../../../prisma.js";

export default async function quoteConversationCommandHandler(interaction: ChatInputCommandInteraction): Promise<Result> {
    debug("Handling 'quote conversation' command");

    const context = interaction.options.getString(conversationSubcommandContextOptionNameLocalizations["en-US"], true);

    const statements: { text: string; author: User }[] = [];

    const firstStatement = interaction.options.getString(conversationSubcommandFirstStatementOptionNameLocalizations["en-US"], true);
    const firstAuthor = interaction.options.getUser(conversationSubcommandFirstAuthorOptionNameLocalizations["en-US"], true);
    statements.push({ text: firstStatement, author: firstAuthor });

    const secondStatement = interaction.options.getString(conversationSubcommandSecondStatementOptionNameLocalizations["en-US"], true);
    const secondAuthor = interaction.options.getUser(conversationSubcommandSecondAuthorOptionNameLocalizations["en-US"], true);
    statements.push({ text: secondStatement, author: secondAuthor });

    const thirdStatement = interaction.options.getString(conversationSubcommandThirdStatementOptionNameLocalizations["en-US"], false);
    const thirdAuthor = interaction.options.getUser(conversationSubcommandThirdAuthorOptionNameLocalizations["en-US"], false);
    if (thirdStatement && thirdAuthor) {
        statements.push({ text: thirdStatement, author: thirdAuthor });
    } else if (thirdStatement || thirdAuthor) {
        await interaction.reply({
            content: translate(conversationSubcommandOnlyThirdStatementOrAuthorLocalizations),
            ephemeral: true,
        });
        return Ok();
    }

    const fourthStatement = interaction.options.getString(conversationSubcommandFourthStatementOptionNameLocalizations["en-US"], false);
    const fourthAuthor = interaction.options.getUser(conversationSubcommandFourthAuthorOptionNameLocalizations["en-US"], false);
    if (fourthStatement && fourthAuthor) {
        if (statements.length < 3) {
            await interaction.reply({
                content: translate(conversationSubcommandSkippedThirdStatementLocalizations),
                ephemeral: true,
            });
            return Ok();
        }
        statements.push({ text: fourthStatement, author: fourthAuthor });
    } else if (fourthStatement || fourthAuthor) {
        await interaction.reply({
            content: translate(conversationSubcommandOnlyFourthStatementOrAuthorLocalizations),
            ephemeral: true,
        });
        return Ok();
    }

    const fifthStatement = interaction.options.getString(conversationSubcommandFifthStatementOptionNameLocalizations["en-US"], false);
    const fifthAuthor = interaction.options.getUser(conversationSubcommandFifthAuthorOptionNameLocalizations["en-US"], false);
    if (fifthStatement && fifthAuthor) {
        if (statements.length < 4) {
            await interaction.reply({
                content: translate(conversationSubcommandSkippedFourthStatementLocalizations),
                ephemeral: true,
            });
            return Ok();
        }
        statements.push({ text: fifthStatement, author: fifthAuthor });
    } else if (fifthStatement || fifthAuthor) {
        await interaction.reply({
            content: translate(conversationSubcommandOnlyFifthStatementOrAuthorLocalizations),
            ephemeral: true,
        });
        return Ok();
    }

    const quoteMeta = await prisma.quoteMeta.create({
        data: {
            token: generateToken(),
            creatorId: interaction.user.id,
            creatorUsername: interaction.user.tag,
            context: context,
            guildId: interaction.guildId || interaction.user.id,
        }
    });

    for (let i = 0; i < statements.length; i++) {
        const statement = statements[i]!;

        await prisma.quoteStatement.create({
            data: {
                quoteId: quoteMeta.id,
                text: statement.text,
                authorId: statement.author.id,
                authorUsername: statement.author.tag,
                order: i,
            }
        });
    }

    await interaction.reply({
        content: translate(conversationSubcommandCompletedLocalizations),
        ephemeral: true,
    });
    return Ok();
}

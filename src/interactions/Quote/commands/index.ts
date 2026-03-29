import nameLocalizations from "../../../localization/quote/commad_name.json" with { type: 'json' };
import descriptionLocalizations from "../../../localization/quote/command_description.json" with { type: 'json' };
import addSubcommandNameLocalizations from "../../../localization/quote/add_subcommand_name.json" with { type: 'json' };
import addSubcommandDescriptionLocalizations from "../../../localization/quote/add_subcommand_description.json" with { type: 'json' };
import conversationSubcommandNameLocalizations from "../../../localization/quote/conversation_subcommand_name.json" with { type: 'json' };
import conversationSubcommandDescriptionLocalizations from "../../../localization/quote/conversation_subcommand_description.json" with { type: 'json' };
import conversationSubcommandInfoOptionNameLocalizations from "../../../localization/quote/info_subcommand_name.json" with { type: 'json' };
import conversationSubcommandInfoOptionDescriptionLocalizations from "../../../localization/quote/info_subcommand_description.json" with { type: 'json' };
import conversationSubcommandFirstStatementOptionNameLocalizations from "../../../localization/quote/conversation_subcommand_first_statement_option_name.json" with { type: 'json' };
import conversationSubcommandFirstStatementOptionDescriptionLocalizations from "../../../localization/quote/conversation_subcommand_first_statement_option_description.json" with { type: 'json' };
import conversationSubcommandFirstAuthorOptionNameLocalizations from "../../../localization/quote/conversation_subcommand_first_author_option_name.json" with { type: 'json' };
import conversationSubcommandFirstAuthorOptionDescriptionLocalizations from "../../../localization/quote/conversation_subcommand_first_author_option_description.json" with { type: 'json' };
import conversationSubcommandSecondStatementOptionNameLocalizations from "../../../localization/quote/conversation_subcommand_second_statement_option_name.json" with { type: 'json' };
import conversationSubcommandSecondStatementOptionDescriptionLocalizations from "../../../localization/quote/conversation_subcommand_second_statement_option_description.json" with { type: 'json' };
import conversationSubcommandSecondAuthorOptionNameLocalizations from "../../../localization/quote/conversation_subcommand_second_author_option_name.json" with { type: 'json' };
import conversationSubcommandSecondAuthorOptionDescriptionLocalizations from "../../../localization/quote/conversation_subcommand_second_author_option_description.json" with { type: 'json' };
import conversationSubcommandThirdStatementOptionNameLocalizations from "../../../localization/quote/conversation_subcommand_third_statement_option_name.json" with { type: 'json' };
import conversationSubcommandThirdStatementOptionDescriptionLocalizations from "../../../localization/quote/conversation_subcommand_third_statement_option_description.json" with { type: 'json' };
import conversationSubcommandThirdAuthorOptionNameLocalizations from "../../../localization/quote/conversation_subcommand_third_author_option_name.json" with { type: 'json' };
import conversationSubcommandThirdAuthorOptionDescriptionLocalizations from "../../../localization/quote/conversation_subcommand_third_author_option_description.json" with { type: 'json' };
import conversationSubcommandFourthStatementOptionNameLocalizations from "../../../localization/quote/conversation_subcommand_fourth_statement_option_name.json" with { type: 'json' };
import conversationSubcommandFourthStatementOptionDescriptionLocalizations from "../../../localization/quote/conversation_subcommand_fourth_statement_option_description.json" with { type: 'json' };
import conversationSubcommandFourthAuthorOptionNameLocalizations from "../../../localization/quote/conversation_subcommand_fourth_author_option_name.json" with { type: 'json' };
import conversationSubcommandFourthAuthorOptionDescriptionLocalizations from "../../../localization/quote/conversation_subcommand_fourth_author_option_description.json" with { type: 'json' };
import conversationSubcommandFifthStatementOptionNameLocalizations from "../../../localization/quote/conversation_subcommand_fifth_statement_option_name.json" with { type: 'json' };
import conversationSubcommandFifthStatementOptionDescriptionLocalizations from "../../../localization/quote/conversation_subcommand_fifth_statement_option_description.json" with { type: 'json' };
import conversationSubcommandFifthAuthorOptionNameLocalizations from "../../../localization/quote/conversation_subcommand_fifth_author_option_name.json" with { type: 'json' };
import conversationSubcommandFifthAuthorOptionDescriptionLocalizations from "../../../localization/quote/conversation_subcommand_fifth_author_option_description.json" with { type: 'json' };
import removeSubcommandNameLocalizations from "../../../localization/quote/remove_subcommand_name.json" with { type: 'json' };
import removeSubcommandDescriptionLocalizations from "../../../localization/quote/remove_subcommand_description.json" with { type: 'json' };
import removeSubcommandTokenOptionNameLocalizations from "../../../localization/quote/remove_subcommand_token_option_name.json" with { type: 'json' };
import removeSubcommandTokenOptionDescriptionLocalizations from "../../../localization/quote/remove_subcommand_token_option_description.json" with { type: 'json' };
import editSubcommandNameLocalizations from "../../../localization/quote/edit_subcommand_name.json" with { type: 'json' };
import editSubcommandDescriptionLocalizations from "../../../localization/quote/edit_subcommand_description.json" with { type: 'json' };
import editSubcommandTokenOptionNameLocalizations from "../../../localization/quote/edit_subcommand_token_option_name.json" with { type: 'json' };
import editSubcommandTokenOptionDescriptionLocalizations from "../../../localization/quote/edit_subcommand_token_option_description.json" with { type: 'json' };
import listSubcommandNameLocalizations from "../../../localization/quote/list_subcommand_name.json" with { type: 'json' };
import listSubcommandDescriptionLocalizations from "../../../localization/quote/list_subcommand_description.json" with { type: 'json' };
import searchSubcommandNameLocalizations from "../../../localization/quote/search_subcommand_name.json" with { type: 'json' };
import searchSubcommandDescriptionLocalizations from "../../../localization/quote/search_subcommand_description.json" with { type: 'json' };
import infoSubcommandNameLocalizations from "../../../localization/quote/info_subcommand_name.json" with { type: 'json' };
import infoSubcommandDescriptionLocalizations from "../../../localization/quote/info_subcommand_description.json" with { type: 'json' };
import infoSubcommandTokenOptionNameLocalizations from "../../../localization/quote/info_subcommand_token_option_name.json" with { type: 'json' };
import infoSubcommandTokenOptionDescriptionLocalizations from "../../../localization/quote/info_subcommand_token_option_description.json" with { type: 'json' };

import quoteAddCommandHandler from "./quoteAdd.js";
import quoteConversationCommandHandler from "./quoteConversation.js";
import quoteRemoveCommandHandler from "./quoteRemove.js";
import quoteEditCommandHandler from "./quoteEdit.js";
import quoteListCommandHandler from "./quoteList.js";
import quoteSearchCommandHandler from "./quoteSearch.js";
import quoteInfoCommandHandler from "./quoteInfo.js";

import { ApplicationCommandOptionType, ApplicationCommandType } from "discord.js";
import type { Command } from "../../commands.js";

export default {
    data: {
        name: nameLocalizations["en-US"],
        nameLocalizations: nameLocalizations,
        description: descriptionLocalizations["en-US"],
        descriptionLocalizations: descriptionLocalizations,
        type: ApplicationCommandType.ChatInput,
        options: [
            {
                name: addSubcommandNameLocalizations["en-US"],
                nameLocalizations: addSubcommandNameLocalizations,
                description: addSubcommandDescriptionLocalizations["en-US"],
                descriptionLocalizations: addSubcommandDescriptionLocalizations,
                type: ApplicationCommandOptionType.Subcommand,
            },
            {
                name: conversationSubcommandNameLocalizations["en-US"],
                nameLocalizations: conversationSubcommandNameLocalizations,
                description: conversationSubcommandDescriptionLocalizations["en-US"],
                descriptionLocalizations: conversationSubcommandDescriptionLocalizations,
                type: ApplicationCommandOptionType.Subcommand,
                options: [
                    {
                        name: conversationSubcommandFirstStatementOptionNameLocalizations["en-US"],
                        nameLocalizations: conversationSubcommandFirstStatementOptionNameLocalizations,
                        description: conversationSubcommandFirstStatementOptionDescriptionLocalizations["en-US"],
                        descriptionLocalizations: conversationSubcommandFirstStatementOptionDescriptionLocalizations,
                        type: ApplicationCommandOptionType.String,
                        required: true,
                    },
                    {
                        name: conversationSubcommandFirstAuthorOptionNameLocalizations["en-US"],
                        nameLocalizations: conversationSubcommandFirstAuthorOptionNameLocalizations,
                        description: conversationSubcommandFirstAuthorOptionDescriptionLocalizations["en-US"],
                        descriptionLocalizations: conversationSubcommandFirstAuthorOptionDescriptionLocalizations,
                        type: ApplicationCommandOptionType.User,
                        required: true,
                    },
                    {
                        name: conversationSubcommandSecondStatementOptionNameLocalizations["en-US"],
                        nameLocalizations: conversationSubcommandSecondStatementOptionNameLocalizations,
                        description: conversationSubcommandSecondStatementOptionDescriptionLocalizations["en-US"],
                        descriptionLocalizations: conversationSubcommandSecondStatementOptionDescriptionLocalizations,
                        type: ApplicationCommandOptionType.String,
                        required: true,
                    },
                    {
                        name: conversationSubcommandSecondAuthorOptionNameLocalizations["en-US"],
                        nameLocalizations: conversationSubcommandSecondAuthorOptionNameLocalizations,
                        description: conversationSubcommandSecondAuthorOptionDescriptionLocalizations["en-US"],
                        descriptionLocalizations: conversationSubcommandSecondAuthorOptionDescriptionLocalizations,
                        type: ApplicationCommandOptionType.User,
                        required: true,
                    },
                    {
                        name: conversationSubcommandThirdStatementOptionNameLocalizations["en-US"],
                        nameLocalizations: conversationSubcommandThirdStatementOptionNameLocalizations,
                        description: conversationSubcommandThirdStatementOptionDescriptionLocalizations["en-US"],
                        descriptionLocalizations: conversationSubcommandThirdStatementOptionDescriptionLocalizations,
                        type: ApplicationCommandOptionType.String,
                        required: false,
                    },
                    {
                        name: conversationSubcommandThirdAuthorOptionNameLocalizations["en-US"],
                        nameLocalizations: conversationSubcommandThirdAuthorOptionNameLocalizations,
                        description: conversationSubcommandThirdAuthorOptionDescriptionLocalizations["en-US"],
                        descriptionLocalizations: conversationSubcommandThirdAuthorOptionDescriptionLocalizations,
                        type: ApplicationCommandOptionType.User,
                        required: false,
                    },
                    {
                        name: conversationSubcommandFourthStatementOptionNameLocalizations["en-US"],
                        nameLocalizations: conversationSubcommandFourthStatementOptionNameLocalizations,
                        description: conversationSubcommandFourthStatementOptionDescriptionLocalizations["en-US"],
                        descriptionLocalizations: conversationSubcommandFourthStatementOptionDescriptionLocalizations,
                        type: ApplicationCommandOptionType.String,
                        required: false,
                    },
                    {
                        name: conversationSubcommandFourthAuthorOptionNameLocalizations["en-US"],
                        nameLocalizations: conversationSubcommandFourthAuthorOptionNameLocalizations,
                        description: conversationSubcommandFourthAuthorOptionDescriptionLocalizations["en-US"],
                        descriptionLocalizations: conversationSubcommandFourthAuthorOptionDescriptionLocalizations,
                        type: ApplicationCommandOptionType.User,
                        required: false,
                    },
                    {
                        name: conversationSubcommandFifthStatementOptionNameLocalizations["en-US"],
                        nameLocalizations: conversationSubcommandFifthStatementOptionNameLocalizations,
                        description: conversationSubcommandFifthStatementOptionDescriptionLocalizations["en-US"],
                        descriptionLocalizations: conversationSubcommandFifthStatementOptionDescriptionLocalizations,
                        type: ApplicationCommandOptionType.String,
                        required: false,
                    },
                    {
                        name: conversationSubcommandFifthAuthorOptionNameLocalizations["en-US"],
                        nameLocalizations: conversationSubcommandFifthAuthorOptionNameLocalizations,
                        description: conversationSubcommandFifthAuthorOptionDescriptionLocalizations["en-US"],
                        descriptionLocalizations: conversationSubcommandFifthAuthorOptionDescriptionLocalizations,
                        type: ApplicationCommandOptionType.User,
                        required: false,
                    },
                    {
                        name: conversationSubcommandInfoOptionNameLocalizations["en-US"],
                        nameLocalizations: conversationSubcommandInfoOptionNameLocalizations,
                        description: conversationSubcommandInfoOptionDescriptionLocalizations["en-US"],
                        descriptionLocalizations: conversationSubcommandInfoOptionDescriptionLocalizations,
                        type: ApplicationCommandOptionType.String,
                        required: false,
                    },
                ],
            },
            {
                name: removeSubcommandNameLocalizations["en-US"],
                nameLocalizations: removeSubcommandNameLocalizations,
                description: removeSubcommandDescriptionLocalizations["en-US"],
                descriptionLocalizations: removeSubcommandDescriptionLocalizations,
                type: ApplicationCommandOptionType.Subcommand,
                options: [
                    {
                        name: removeSubcommandTokenOptionNameLocalizations["en-US"],
                        nameLocalizations: removeSubcommandTokenOptionNameLocalizations,
                        description: removeSubcommandTokenOptionDescriptionLocalizations["en-US"],
                        descriptionLocalizations: removeSubcommandTokenOptionDescriptionLocalizations,
                        type: ApplicationCommandOptionType.String,
                        required: true,
                    }
                ]
            },
            {
                name: editSubcommandNameLocalizations["en-US"],
                nameLocalizations: editSubcommandNameLocalizations,
                description: editSubcommandDescriptionLocalizations["en-US"],
                descriptionLocalizations: editSubcommandDescriptionLocalizations,
                type: ApplicationCommandOptionType.Subcommand,
                options: [
                    {
                        name: editSubcommandTokenOptionNameLocalizations["en-US"],
                        nameLocalizations: editSubcommandTokenOptionNameLocalizations,
                        description: editSubcommandTokenOptionDescriptionLocalizations["en-US"],
                        descriptionLocalizations: editSubcommandTokenOptionDescriptionLocalizations,
                        type: ApplicationCommandOptionType.String,
                        required: true,
                    }
                ]
            },
            {
                name: listSubcommandNameLocalizations["en-US"],
                nameLocalizations: listSubcommandNameLocalizations,
                description: listSubcommandDescriptionLocalizations["en-US"],
                descriptionLocalizations: listSubcommandDescriptionLocalizations,
                type: ApplicationCommandOptionType.Subcommand,
            },
            {
                name: searchSubcommandNameLocalizations["en-US"],
                nameLocalizations: searchSubcommandNameLocalizations,
                description: searchSubcommandDescriptionLocalizations["en-US"],
                descriptionLocalizations: searchSubcommandDescriptionLocalizations,
                type: ApplicationCommandOptionType.Subcommand,
            },
            {
                name: infoSubcommandNameLocalizations["en-US"],
                nameLocalizations: infoSubcommandNameLocalizations,
                description: infoSubcommandDescriptionLocalizations["en-US"],
                descriptionLocalizations: infoSubcommandDescriptionLocalizations,
                type: ApplicationCommandOptionType.Subcommand,
                options: [
                    {
                        name: infoSubcommandTokenOptionNameLocalizations["en-US"],
                        nameLocalizations: infoSubcommandTokenOptionNameLocalizations,
                        description: infoSubcommandTokenOptionDescriptionLocalizations["en-US"],
                        descriptionLocalizations: infoSubcommandTokenOptionDescriptionLocalizations,
                        type: ApplicationCommandOptionType.String,
                        required: true,
                    }
                ]
            }
        ],
    },
    subcommands: {
        [addSubcommandNameLocalizations["en-US"]]: {
            handler: quoteAddCommandHandler,
            subcommands: {},
        },
        [conversationSubcommandNameLocalizations["en-US"]]: {
            handler: quoteConversationCommandHandler,
            subcommands: {},
        },
        [removeSubcommandNameLocalizations["en-US"]]: {
            handler: quoteRemoveCommandHandler,
            subcommands: {},
        },
        [editSubcommandNameLocalizations["en-US"]]: {
            handler: quoteEditCommandHandler,
            subcommands: {},
        },
        [listSubcommandNameLocalizations["en-US"]]: {
            handler: quoteListCommandHandler,
            subcommands: {},
        },
        [searchSubcommandNameLocalizations["en-US"]]: {
            handler: quoteSearchCommandHandler,
            subcommands: {},
        },
        [infoSubcommandNameLocalizations["en-US"]]: {
            handler: quoteInfoCommandHandler,
            subcommands: {},
        }
    }
} as Command;

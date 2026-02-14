import quoteAddCommandHandler from "./quoteAdd.js";
import quoteRemoveCommandHandler from "./quoteRemove.js";
import quoteEditCommandHandler from "./quoteEdit.js";
import quoteListCommandHandler from "./quoteList.js";
import quoteSearchCommandHandler from "./quoteSearch.js";
import quoteContextCommandHandler from "./quoteContext.js";

import { ApplicationCommandOptionType, ApplicationCommandType } from "discord.js";
import type { Command } from "../../commands.js";

export default {
    data: {
        name: "quote",
        description: "Add, remove, edit, or view quotes",
        type: ApplicationCommandType.ChatInput,
        options: [
            {
                name: "add",
                description: "Add a new quote",
                type: ApplicationCommandOptionType.Subcommand,
                options: [
                    {
                        name: "conversation_length",
                        description: "Length of the conversation (number of statements)",
                        type: ApplicationCommandOptionType.Integer,
                        min_value: 2,
                        required: false,
                    }
                ],
            },
            {
                name: "remove",
                description: "Remove a quote",
                type: ApplicationCommandOptionType.Subcommand,
                options: [
                    {
                        name: "token",
                        description: "Token (7 character code) of the quote to remove",
                        type: ApplicationCommandOptionType.String,
                        required: true,
                    }
                ]
            },
            {
                name: "edit",
                description: "Edit an existing quote",
                type: ApplicationCommandOptionType.Subcommand,
                options: [
                    {
                        name: "token",
                        description: "Token (7 character code) of the quote to edit",
                        type: ApplicationCommandOptionType.String,
                        required: true,
                    }
                ]
            },
            {
                name: "list",
                description: "List all quotes",
                type: ApplicationCommandOptionType.Subcommand,
            },
            {
                name: "search",
                description: "Search quotes with various filters",
                type: ApplicationCommandOptionType.Subcommand,
            },
            {
                name: "context",
                description: "View the context of a quote",
                type: ApplicationCommandOptionType.Subcommand,
            }
        ],
    },
    subcommands: {
        add: {
            handler: quoteAddCommandHandler,
            subcommands: {},
        },
        remove: {
            handler: quoteRemoveCommandHandler,
            subcommands: {},
        },
        edit: {
            handler: quoteEditCommandHandler,
            subcommands: {},
        },
        list: {
            handler: quoteListCommandHandler,
            subcommands: {},
        },
        search: {
            handler: quoteSearchCommandHandler,
            subcommands: {},
        },
        context: {
            handler: quoteContextCommandHandler,
            subcommands: {},
        }
    }
} as Command;

import { ApplicationCommandOptionType, ApplicationCommandType, ChatInputCommandInteraction, EmbedBuilder, Guild, LabelBuilder, ModalBuilder, UserSelectMenuBuilder } from "discord.js";
import type { Command } from "./index.js";
import { debug } from "../log.js";
import { Ok, type Result } from "../result.js";
import { createBasicTextInput, createLabel } from "../util/modal.js";
import colors from "../colors.js";
import type { Quote, QuoteStatement } from "../generated/prisma/client.js";
import { isUserInGuild } from "../util/guild.js";

export const Quote: Command = {
    data: {
        name: "quote",
        description: "Add, remove, edit, or view quotes",
        type: ApplicationCommandType.ChatInput,
        options: [
            {
                name: "add",
                description: "Add a new quote",
                type: ApplicationCommandOptionType.Subcommand,
            },
            {
                name: "conversation",
                description: "Add a conversation quote",
                type: ApplicationCommandOptionType.Subcommand,
                options: [
                    {
                        name: "length",
                        description: "Number of lines in the conversation (max 10)",
                        type: ApplicationCommandOptionType.Integer,
                        required: true,
                        minValue: 2,
                        maxValue: 10,
                    }
                ],
            },
            {
                name: "remove",
                description: "Remove a quote",
                type: ApplicationCommandOptionType.Subcommand,
                options: [
                    {
                        name: "id",
                        description: "ID (7 character code) of the quote to remove",
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
                        name: "id",
                        description: "ID (7 character code) of the quote to edit",
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
        ],
    },
    subcommands: {
        add: {
            handler: async function execute(interaction: ChatInputCommandInteraction): Promise<Result> {
                debug("Handling 'quote add' command");

                const modal = createAddQuoteModal();
                await interaction.showModal(modal);

                return Ok();
            }
        },
        conversation: {
            handler: async function execute(interaction: ChatInputCommandInteraction): Promise<Result> {
                debug("Handling 'quote conversation' command");

                const conversationLength = interaction.options.getInteger("length", true);


            }
        },
        remove: {
            handler: async function execute(interaction: ChatInputCommandInteraction): Promise<Result> {
                debug("Handling 'quote remove' command");

                const quoteId = interaction.options.getString("id", true);

                const deleteConfirmEmbed = await createQuoteDeleteConfirmEmbed([], interaction.guild!);
            }
        },
        edit: {
            handler: async function execute(interaction: ChatInputCommandInteraction): Promise<Result> {

            }
        },
        list: {
            handler: async function execute(interaction: ChatInputCommandInteraction): Promise<Result> {

            }
        }
    }
}

function createAddQuoteModal(): ModalBuilder {
    const quoteText = createBasicTextInput(quoteModalFields.add.quoteText, "The text of the quote");
    const quoteAuthor = createQuoteAuthorInput();
    const quoteContext = createBasicTextInput(quoteModalFields.add.quoteContext, "The context of the quote", false);

    return new ModalBuilder()
        .setCustomId("quote;add")
        .setTitle("Add a Quote")
        .addLabelComponents(quoteText, quoteAuthor, quoteContext);
}

function createQuoteAuthorInput(): LabelBuilder {
    const input = new UserSelectMenuBuilder()
        .setCustomId(quoteModalFields.add.quoteAuthor)
        .setRequired(true);

    return new LabelBuilder()
        .setLabel("Author of the quote")
        .setUserSelectMenuComponent(input);
}

export const quoteModalFields = {
    add: {
        quoteText: "quote_text",
        quoteAuthor: "quote_author",
        quoteContext: "quote_context",
    }
} as const;

async function createQuoteDeleteConfirmEmbed(statements: QuoteStatement[], guild: Guild): Promise<EmbedBuilder> {
    return new EmbedBuilder()
        .setTitle("Are you sure you want to delete this quote?")
        .setDescription(await formatQuoteStatements(statements, guild))
        .setColor(colors.CONFIRM_DANGEROUS_EMBED);
}

async function formatQuoteStatements(statements: QuoteStatement[], guild: Guild): Promise<string> {
    return Promise.all(statements.map(s => formatQuoteSingleStatement(s, guild))).then(lines => lines.join("\n"));
}

async function formatQuoteSingleStatement(statement: QuoteStatement, guild: Guild): Promise<string> {
    const author = await formatStatementAuthor(statement, guild);
    return `"${statement.text}" - ${author}`;
}

async function formatStatementAuthor(statement: QuoteStatement, guild: Guild): Promise<string> {
    if (await isUserInGuild(statement.authorId, guild)) {
        return `<@${statement.authorId}>`;
    }
    return statement.authorUsername;
}

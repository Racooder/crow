import { ActionRowBuilder, ApplicationCommandOptionType, ApplicationCommandType, ButtonBuilder, ButtonStyle, ChatInputCommandInteraction, EmbedBuilder, Guild, LabelBuilder, MessageFlags, ModalBuilder, TextInputBuilder, TextInputStyle, User, UserSelectMenuBuilder } from "discord.js";
import type { Command } from "./index.js";
import { debug } from "../log.js";
import { Ok, type Result } from "../result.js";
import { createBasicTextInput } from "../util/modal.js";
import colors from "../colors.js";
import type { QuoteMeta, QuoteStatement } from "../generated/prisma/client.js";
import { isUserInGuild } from "../util/guild.js";
import prisma from "../prisma.js";

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
        ],
    },
    subcommands: {
        add: {
            handler: async function execute(interaction: ChatInputCommandInteraction): Promise<Result> {
                debug("Handling 'quote add' command");

                const modal = createAddModal();
                await interaction.showModal(modal);

                return Ok();
            }
        },
        conversation: {
            handler: async function execute(interaction: ChatInputCommandInteraction): Promise<Result> {
                debug("Handling 'quote conversation' command");

                const modal = createConversationMetaModal();
                await interaction.showModal(modal);

                return Ok();
            }
        },
        remove: {
            handler: async function execute(interaction: ChatInputCommandInteraction): Promise<Result> {
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
        },
        edit: {
            handler: async function execute(interaction: ChatInputCommandInteraction): Promise<Result> {
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
        },
        list: {
            handler: async function execute(interaction: ChatInputCommandInteraction): Promise<Result> {

            }
        }
    }
}

function createAddModal(): ModalBuilder {
    const quoteText = createBasicTextInput(quoteModalFields.add.quoteText, "The text of the quote", true);
    const quoteAuthor = createQuoteAuthorInput();
    const quoteContext = createBasicTextInput(quoteModalFields.add.quoteContext, "The context of the quote", false);

    return new ModalBuilder()
        .setCustomId("quote;add")
        .setTitle("Add a Quote")
        .addLabelComponents(quoteText, quoteAuthor, quoteContext);
}

export function createQuoteAuthorInput(defaultUserId?: string): LabelBuilder {
    const input = new UserSelectMenuBuilder()
        .setCustomId(quoteModalFields.add.quoteAuthor)
        .setRequired(true);

    if (defaultUserId !== undefined) {
        input.setDefaultUsers([defaultUserId]);
    }

    return new LabelBuilder()
        .setLabel("Author of the quote")
        .setUserSelectMenuComponent(input);
}

function createConversationMetaModal(): ModalBuilder {
    const quoteContext = createBasicTextInput(quoteModalFields.add.quoteContext, "The context of the quote", false);

    return new ModalBuilder()
        .setCustomId(`quote;conversation;meta`)
        .setTitle("Add Conversation Quote Metadata")
        .addLabelComponents(quoteContext);
}

async function createDeleteConfirmEmbed(statements: QuoteStatement[], guild: Guild): Promise<EmbedBuilder> {
    return new EmbedBuilder()
        .setTitle("Are you sure you want to delete this quote?")
        .setDescription(await formatStatements(statements, guild))
        .setColor(colors.CONFIRM_DANGEROUS_EMBED);
}

async function formatStatements(statements: QuoteStatement[], guild: Guild): Promise<string> {
    return Promise.all(statements.map(s => formatSingleStatement(s, guild))).then(lines => lines.join("\n"));
}

async function formatSingleStatement(statement: QuoteStatement, guild: Guild): Promise<string> {
    const author = await formatStatementAuthor(statement, guild);
    return `"${statement.text}" - ${author}`;
}

async function formatStatementAuthor(statement: QuoteStatement, guild: Guild): Promise<string> {
    if (await isUserInGuild(statement.authorId, guild)) {
        return `<@${statement.authorId}>`;
    }
    return statement.authorUsername;
}

function createDeleteConfirmButtons(quoteId: string): ActionRowBuilder<ButtonBuilder> {
    const cancelButton = new ButtonBuilder()
        .setCustomId(`quote;delete;confirm;${quoteId}`)
        .setLabel("Confirm Deletion")
        .setStyle(ButtonStyle.Danger);

    const confirmButton = new ButtonBuilder()
        .setCustomId(`quote;delete;cancel;${quoteId}`)
        .setLabel("Cancel")
        .setStyle(ButtonStyle.Secondary); // Gray button because green or blue could imply confirmation

    return new ActionRowBuilder<ButtonBuilder>()
        .addComponents(confirmButton, cancelButton);
}

function getQuoteByToken(token: string) {
    return prisma.quoteMeta.findUnique({
        where: {
            token: token,
        },
        include: {
            statements: true,
        }
    });
}

function checkQuoteEditPermissions(quote: QuoteMeta, user: User): boolean {
    return quote.creatorId === user.id;
    // TODO: Allow server admins to edit any quote in their server
}

function createListEmbed(quotes: QuoteMeta[]): EmbedBuilder {

}

function createEditMetaModal(quote: QuoteMeta): ModalBuilder {
    const quoteContextInput = new TextInputBuilder()
        .setCustomId(quoteModalFields.add.quoteContext)
        .setRequired(false)
        .setStyle(TextInputStyle.Paragraph)
        .setValue(quote.context ?? "");

    const quoteContextLabel = new LabelBuilder()
        .setLabel("The context of the quote")
        .setTextInputComponent(quoteContextInput);

    return new ModalBuilder()
        .setCustomId(`quote;edit;meta;${quote.id}`)
        .setTitle("Edit Quote Metadata")
        .addLabelComponents(quoteContextLabel);
}

export const quoteModalFields = {
    add: {
        quoteText: "quote_text",
        quoteAuthor: "quote_author",
        quoteContext: "quote_context",
    },
    edit: {
        quoteText: "quote_text",
        quoteAuthor: "quote_author",
        quoteContext: "quote_context",
    }
} as const;

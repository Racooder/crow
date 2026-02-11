// TODO: Implement

import { LabelBuilder, ModalBuilder, ModalSubmitInteraction, TextInputBuilder, TextInputStyle, UserSelectMenuBuilder } from "discord.js";
import type { Modal, SubModal } from "../../../modals/index.js";
import { debug } from "../../../log.js";
import { Ok, type Result } from "../../../result.js";
import { createBasicTextInput } from "../../../util/modal.js";
import type { QuoteStatement } from "../../../generated/prisma/client.js";

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

export const Quote: Modal = {
    id: "quote",
    handler: async (interaction: ModalSubmitInteraction, args: string[]): Promise<Result> => {
        debug("Handling 'quote' modal");
        // Command handling logic goes here
        return Ok();
    },
    submodals: {
        "add": {
            builder: () => {
                const quoteText = createBasicTextInput(quoteModalFields.add.quoteText, "The text of the quote", true);
                const quoteAuthor = createQuoteAuthorInput();
                const quoteContext = createBasicTextInput(quoteModalFields.add.quoteContext, "The context of the quote", false);

                return new ModalBuilder()
                    .setCustomId("quote;add")
                    .setTitle("Add a Quote")
                    .addLabelComponents(quoteText, quoteAuthor, quoteContext);
            },
            handler: async (interaction: ModalSubmitInteraction, _args: string[]) => {
                debug("Handling 'quote;add' modal submission");
                // Add quote handling logic goes here
                return Ok();
            }
        } as const,
        "conversation": {
            submodals: {
                "meta": {
                    builder: (conversationLength: number) => {
                        const quoteContext = createBasicTextInput(quoteModalFields.add.quoteContext, "The context of the quote", false);

                        return new ModalBuilder()
                            .setCustomId(`quote;conversation;meta;${conversationLength}`)
                            .setTitle("Add Conversation Quote Metadata")
                            .addLabelComponents(quoteContext);
                    }
                }
            } as const
        } as const
    } as const
};

function createQuoteAuthorInput(defaultUserId?: string): LabelBuilder {
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

// Conversation Meta

export 

// Edit Statement

function createEditStatementModal(statement: QuoteStatement): ModalBuilder {
    const quoteTextInput = new TextInputBuilder()
        .setCustomId(quoteModalFields.edit.quoteText)
        .setRequired(true)
        .setStyle(TextInputStyle.Paragraph)
        .setValue(statement.text);

    const quoteTextLabel = new LabelBuilder()
        .setLabel("The text of the quote")
        .setTextInputComponent(quoteTextInput);

    const quoteAuthorLabel = createQuoteAuthorInput(statement.authorId);

    return new ModalBuilder()
        .setCustomId(`quote;edit;${statement.id};${statement.order}`)
        .setTitle("Edit Quote Statement")
        .addLabelComponents(quoteTextLabel, quoteAuthorLabel);

}

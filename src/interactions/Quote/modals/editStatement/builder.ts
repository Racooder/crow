import { LabelBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } from "discord.js";
import type { QuoteStatement } from "../../../../generated/prisma/browser.js";

export function createEditStatementModal(statement: QuoteStatement): ModalBuilder {
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

import { LabelBuilder, ModalBuilder, ModalSubmitInteraction, TextInputBuilder, TextInputStyle } from "discord.js";
import type { Modal } from "./index.js";
import { debug } from "../log.js";
import { Ok, type Result } from "../result.js";
import type { QuoteStatement } from "../generated/prisma/client.js";
import { createQuoteAuthorInput, quoteModalFields } from "../commands/Quote.js";

export const Template: Modal = {
    id: "template",
    handler: async function execute(interaction: ModalSubmitInteraction, args: string[]): Promise<Result> {
        debug("Handling 'template' command");
        // Command handling logic goes here
        return Ok();
    }
}

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

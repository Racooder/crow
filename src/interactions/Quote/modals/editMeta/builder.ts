import { LabelBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } from "discord.js";
import type { QuoteMeta } from "../../../../generated/prisma/client.js";
import editQuoteMetaModalFields from "./fields.js";

export default function createEditMetaModal(quote: Partial<QuoteMeta>): ModalBuilder {
    const quoteContextInput = new TextInputBuilder()
        .setCustomId(editQuoteMetaModalFields.quoteContext)
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

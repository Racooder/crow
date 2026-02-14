import { LabelBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } from "discord.js";
import type { QuoteMeta } from "../../../generated/prisma/client.js";
import { quoteModalFields } from "./Quote.js";

export default function createEditMetaModal(quote: QuoteMeta): ModalBuilder {
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

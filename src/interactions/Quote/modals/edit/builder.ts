import { LabelBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, UserSelectMenuBuilder } from "discord.js";
import addQuoteMetaModalFields from "./fields.js";
import type { PopulatedQuote } from "../../../../database/Quote.js";

export default function createEditModal(quoteObj: PopulatedQuote): ModalBuilder {
    const authorSelectMenu = new UserSelectMenuBuilder()
        .setCustomId(addQuoteMetaModalFields.authorSelectMenu)
        .setPlaceholder("Select the author of the quote")
        .setDefaultUsers([quoteObj.statements[0]!.authorId])
        .setRequired(true);
    const authorLabel = new LabelBuilder()
        .setLabel("Author")
        .setUserSelectMenuComponent(authorSelectMenu);

    const statementInput = new TextInputBuilder()
        .setCustomId(addQuoteMetaModalFields.statement)
        .setStyle(TextInputStyle.Paragraph)
        .setRequired(true)
        .setValue(quoteObj.statements[0]!.text);
    const statementLabel = new LabelBuilder()
        .setLabel("Statement")
        .setTextInputComponent(statementInput);

    const contextInput = new TextInputBuilder()
        .setCustomId(addQuoteMetaModalFields.quoteContext)
        .setStyle(TextInputStyle.Paragraph)
        .setRequired(false)
        .setValue(quoteObj.context || "");
    const quoteContextLabel = new LabelBuilder()
        .setLabel("Context")
        .setTextInputComponent(contextInput);

    return new ModalBuilder()
        .setCustomId(`quote;edit;${quoteObj.id}`)
        .setTitle(`Edit Quote (${quoteObj.token})`)
        .addLabelComponents(authorLabel, statementLabel, quoteContextLabel);
}

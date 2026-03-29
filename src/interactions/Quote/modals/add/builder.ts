import { LabelBuilder, ModalBuilder, TextDisplayBuilder, UserSelectMenuBuilder } from "discord.js";
import addQuoteMetaModalFields from "./fields.js";
import { createLabeledTextInput } from "../../../../util/modal.js";

export default function createAddModal(): ModalBuilder {
    const description = new TextDisplayBuilder()
        .setContent("To add a conversation quote use the `/quote conversation` command.");

    const authorSelectMenu = new UserSelectMenuBuilder()
        .setCustomId(addQuoteMetaModalFields.authorSelectMenu)
        .setPlaceholder("Select the user that said the quote")
        .setRequired(true);
    const authorLabel = new LabelBuilder()
        .setLabel("Author")
        .setUserSelectMenuComponent(authorSelectMenu);

    const statementInput = createLabeledTextInput(addQuoteMetaModalFields.statement, "The statement of the quote", true);
    const quoteContextLabel = createLabeledTextInput(addQuoteMetaModalFields.quoteContext, "The context of the quote", false);

    return new ModalBuilder()
        .setCustomId("quote;add")
        .setTitle("Add Quote")
        .addTextDisplayComponents(description)
        .addLabelComponents(authorLabel, statementInput, quoteContextLabel);
}

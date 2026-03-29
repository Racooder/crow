import { LabelBuilder, TextInputStyle, TextInputBuilder } from "discord.js";
import { debug } from "../log.js";

function createTextInputBuilder(id: string, required: boolean): TextInputBuilder {
    debug(`Creating text input builder: id='${id}', required=${required}`)

    return new TextInputBuilder()
        .setCustomId(id)
        .setRequired(required)
        .setStyle(TextInputStyle.Paragraph);
}

export function createLabeledTextInput(id: string, labelText: string, required: boolean, placeholder?: string): LabelBuilder {
    debug(`Creating text input: id='${id}', label='${labelText}', required=${required}`);

    const input = createTextInputBuilder(id, required);

    if (placeholder) {
        input.setPlaceholder(placeholder);
    }

    return new LabelBuilder()
        .setLabel(labelText)
        .setTextInputComponent(input);
}

import { LabelBuilder, TextInputStyle, TextInputBuilder } from "discord.js";
import { debug } from "../log.js";

function createTextInputBuilder(id: string, required: boolean): TextInputBuilder {
    debug(`Creating text input builder: id='${id}', required=${required}`)

    return new TextInputBuilder()
        .setCustomId(id)
        .setRequired(required)
        .setStyle(TextInputStyle.Paragraph);
}

export function createLabledTextInput(id: string, labelText: string, required: boolean): LabelBuilder {
    debug(`Creating text input: id='${id}', label='${labelText}', required=${required}`);

    const input = createTextInputBuilder(id, required);

    return new LabelBuilder()
        .setLabel(labelText)
        .setTextInputComponent(input);
}

export function createLabeledTextInputWithPlaceholder(id: string, labelText: string, placeholder: string, required: boolean) {
    debug(`Creating text input: id='${id}', label='${labelText}', placeholder='${placeholder}' required=${required}`);

    const input = createTextInputBuilder(id, required)
        .setPlaceholder(placeholder);

    return new LabelBuilder()
        .setLabel(labelText)
        .setTextInputComponent(input);
}

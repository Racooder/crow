import { ButtonBuilder, ButtonStyle } from "discord.js";

export default function createDeleteCancelButton(quoteId: string) {
    return new ButtonBuilder()
        .setCustomId(`quote;delete;cancel;${quoteId}`)
        .setLabel("Cancel Deletion")
        .setStyle(ButtonStyle.Secondary); // Gray button because green or blue could imply confirmation
}

import { ButtonBuilder, ButtonStyle } from "discord.js";

export default function createDeleteConfirmButton(quoteId: string) {
    return new ButtonBuilder()
        .setCustomId(`quote;delete;confirm;${quoteId}`)
        .setLabel("Confirm Deletion")
        .setStyle(ButtonStyle.Danger);
}

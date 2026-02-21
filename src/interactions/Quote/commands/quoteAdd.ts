import type { ChatInputCommandInteraction } from "discord.js";
import { Ok, type Result } from "../../../result.js";
import { debug } from "../../../log.js";

export default async function quoteAddCommandHandler(interaction: ChatInputCommandInteraction): Promise<Result> {
    debug("Handling 'quote add' command");

    const conversationLength = interaction.options.getInteger("conversation_length", false);

    if (conversationLength !== null && conversationLength >= 2) {
        const modal = createQuoteMetaModal(conversationLength);
        await interaction.showModal(modal);
        return Ok();
    }

    const modal = createAddModal();
    await interaction.showModal(modal);
    return Ok();
}

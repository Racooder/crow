import type { ChatInputCommandInteraction } from "discord.js";
import { Ok, type Result } from "../../../result.js";
import { debug } from "../../../log.js";
import createAddModal from "../modals/add/builder.js";

export default async function quoteAddCommandHandler(interaction: ChatInputCommandInteraction): Promise<Result> {
    debug("Handling 'quote add' command");

    const modal = createAddModal();
    await interaction.showModal(modal);
    return Ok();
}

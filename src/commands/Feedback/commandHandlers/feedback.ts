import type { ChatInputCommandInteraction } from "discord.js";
import { debug } from "../../../log.js";
import { Err, Ok, type Result } from "../../../result.js";

export default async function feedbackCommandHandler(interaction: ChatInputCommandInteraction): Promise<Result> {
    debug("Handling 'feedback' command");

    const feedbackType = interaction.options.getString("type", true);

    let modal;
    switch (feedbackType) {
        case "bug":
            modal = createBugReportModal();
            break;
        case "feature":
            modal = createFeatureRequestModal();
            break;
        case "general":
            modal = createGeneralFeedbackModal();
            break;
        default:
            return Err("An unknown feedback type was selected in the feedback command.");
    }

    await interaction.showModal(modal);

    return Ok();
}
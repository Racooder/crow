import type { ChatInputCommandInteraction } from "discord.js";
import { debug } from "../../../log.js";
import { Err, Ok, type Result } from "../../../result.js";
import createBugReportModal from "../modals/bugReport/builder.js";
import createFeatureRequestModal from "../modals/featureRequest/builder.js";
import createOtherFeedbackModal from "../modals/otherFeedback/builder.js";

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
        case "other":
            modal = createOtherFeedbackModal();
            break;
        default:
            return Err("An unknown feedback type was selected in the feedback command.");
    }

    await interaction.showModal(modal);

    return Ok();
}
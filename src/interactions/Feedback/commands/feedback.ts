import type { ChatInputCommandInteraction } from "discord.js";
import { debug } from "../../../log.js";
import { Err, Ok, type Result } from "../../../result.js";
import createBugReportModal from "../modals/bugReport/builder.js";
import createFeatureRequestModal from "../modals/featureRequest/builder.js";
import createOtherFeedbackModal from "../modals/otherFeedback/builder.js";
import typeOptionNameLocalization from "../../../localization/feedback/type_option_name.json" with { type: 'json' };
import { FeedbackType } from "../../../generated/prisma/enums.js";

export default async function feedbackCommandHandler(interaction: ChatInputCommandInteraction): Promise<Result> {
    debug("Handling 'feedback' command");

    const feedbackType = interaction.options.getString(typeOptionNameLocalization["en-US"], true);

    let modal;
    switch (feedbackType) {
        case FeedbackType.BUG:
            modal = createBugReportModal();
            break;
        case FeedbackType.FEATURE:
            modal = createFeatureRequestModal();
            break;
        case FeedbackType.GENERAL:
            modal = createOtherFeedbackModal();
            break;
        default:
            return Err("An unknown feedback type was selected in the feedback command.");
    }

    await interaction.showModal(modal);

    return Ok();
}

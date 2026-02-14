import expectedBehaviourLabelLocalizations from "../../../../localization/feedback/bug_report_modal_expected_behavior_label.json" with { type: 'json' };
import actualBehaviorLabelLocalizations from "../../../../localization/feedback/bug_report_modal_actual_behavior_label.json" with { type: 'json' };
import stepsToReproduceLabelLocalizations from "../../../../localization/feedback/bug_report_modal_steps_to_reproduce_label.json" with { type: 'json' };
import otherDetailsLabelLocalizations from "../../../../localization/feedback/bug_report_modal_other_details_label.json" with { type: 'json' };
import translate from "../../../../translate.js";

import type { ModalSubmitInteraction } from "discord.js";
import { Ok, type Result } from "../../../../result.js";
import { debug } from "../../../../log.js";
import { bugReportModalFields } from "./shared.js";
import { FeedbackType } from "../../../../generated/prisma/enums.js";
import { createFeedback, getFeedbackReceivedMessage, sendFeedbackToDiscord } from "../shared.js";

export default async function handleBugReportModal(interaction: ModalSubmitInteraction, _args: string[]): Promise<Result> {
    debug("Handling 'feedback;bug' modal submission");

    const expectedBehavior = interaction.fields.getTextInputValue(bugReportModalFields.expectedBehavior) ?? "N/A";
    const actualBehavior = interaction.fields.getTextInputValue(bugReportModalFields.actualBehavior) ?? "N/A";
    const stepsToReproduce = interaction.fields.getTextInputValue(bugReportModalFields.stepsToReproduce) ?? "N/A";
    const otherDetails = interaction.fields.getTextInputValue(bugReportModalFields.otherDetails) ?? "N/A";

    const feedbackMessage = `**${translate(expectedBehaviourLabelLocalizations)}:** ${expectedBehavior}\n**${translate(actualBehaviorLabelLocalizations)}:** ${actualBehavior}\n**${translate(stepsToReproduceLabelLocalizations)}:** ${stepsToReproduce}\n**${translate(otherDetailsLabelLocalizations)}:** ${otherDetails}`;

    createFeedback(FeedbackType.BUG, interaction.user, feedbackMessage);
    sendFeedbackToDiscord(FeedbackType.BUG, interaction.user, feedbackMessage);

    interaction.reply(getFeedbackReceivedMessage());
    return Ok();
}

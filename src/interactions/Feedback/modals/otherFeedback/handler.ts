import descriptionLabelLocalizations from "../../../../localization/feedback/other_feedback_modal_description_label.json" with { type: 'json' };
import translate from "../../../../translate.js";

import type { ModalSubmitInteraction } from "discord.js";
import { Ok, type Result } from "../../../../result.js";
import { debug } from "../../../../log.js";
import { createFeedback, getFeedbackReceivedMessage, sendFeedbackToDiscord } from "../shared.js";
import { FeedbackType } from "../../../../generated/prisma/browser.js";
import otherFeedbackModalFields from "./fields.js";

export default async function handleOtherFeedbackModal(interaction: ModalSubmitInteraction, _args: string[]): Promise<Result> {
    debug("Handling 'feedback;other' modal submission");

    const description = interaction.fields.getTextInputValue(otherFeedbackModalFields.description) ?? "N/A";

    const feedbackMessage = `**${translate(descriptionLabelLocalizations)}:** ${description}`;

    createFeedback(FeedbackType.GENERAL, interaction.user, feedbackMessage);
    sendFeedbackToDiscord(FeedbackType.GENERAL, interaction.user, feedbackMessage);

    interaction.reply(getFeedbackReceivedMessage());
    return Ok();
}

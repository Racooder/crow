import descriptionLabelLocalizations from "../../../../localization/feedback/feature_request_modal_description_label.json" with { type: 'json' };
import otherDetailsLabelLocalizations from "../../../../localization/feedback/feature_request_modal_description_placeholder.json" with { type: 'json' };
import translate from "../../../../translate.js";

import type { ModalSubmitInteraction } from "discord.js";
import { Ok, type Result } from "../../../../result.js";
import { debug } from "../../../../log.js";
import { createFeedback, getFeedbackReceivedMessage, sendFeedbackToDiscord } from "../shared.js";
import { FeedbackType } from "../../../../generated/prisma/browser.js";
import { featureRequestModalFields } from "./common.js";

export default async function handleFeatureRequestModal(interaction: ModalSubmitInteraction, _args: string[]): Promise<Result> {
    debug("Handling 'feedback;feature' modal submission");

    const description = interaction.fields.getTextInputValue(featureRequestModalFields.description) ?? "N/A";
    const otherDetails = interaction.fields.getTextInputValue(featureRequestModalFields.otherDetails) ?? "N/A";

    const feedbackMessage = `**${translate(descriptionLabelLocalizations)}:** ${description}\n**${translate(otherDetailsLabelLocalizations)}:** ${otherDetails}`;

    createFeedback(FeedbackType.FEATURE, interaction.user, feedbackMessage);
    sendFeedbackToDiscord(FeedbackType.FEATURE, interaction.user, feedbackMessage);

    interaction.reply(getFeedbackReceivedMessage());
    return Ok();
}

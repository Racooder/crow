import { EmbedBuilder, MessageFlags, ModalSubmitInteraction, User, type InteractionReplyOptions } from "discord.js";
import type { Modal } from "./index.js";
import { debug } from "../log.js";
import { Ok, type Result } from "../result.js";
import prisma from "../prisma.js";
import { FeedbackType } from "../generated/prisma/enums.js";
import { feedbackModalFields } from "../commands/Feedback.js";
import { sendToChannel } from "../util/client.js";
import { config } from "../config.js";
import colors from "../colors.js";

const FEEDBACK_RECEIVED_MESSAGE: InteractionReplyOptions = {
    content: "Thank you for your feedback! It has been received successfully.",
    flags: [MessageFlags.Ephemeral],
};

export const Feedback: Modal = {
    id: "feedback",
    submodals: {
        "bug_report": {
            handler: async function executeBugReport(interaction: ModalSubmitInteraction, _args: string[]): Promise<Result> {
                debug("Handling 'feedback;bug_report' modal submission");

                const expectedBehavior = interaction.fields.getTextInputValue(feedbackModalFields.bugReport.expectedBehavior) ?? "N/A";
                const actualBehavior = interaction.fields.getTextInputValue(feedbackModalFields.bugReport.actualBehavior) ?? "N/A";
                const stepsToReproduce = interaction.fields.getTextInputValue(feedbackModalFields.bugReport.stepsToReproduce) ?? "N/A";

                const feedbackMessage = `**Expected Behavior:** ${expectedBehavior}\n**Actual Behavior:** ${actualBehavior}\n**Steps to Reproduce:** ${stepsToReproduce}`;

                createFeedback(FeedbackType.BUG, interaction.user, feedbackMessage);
                sendFeedbackToDiscord(FeedbackType.BUG, interaction.user, feedbackMessage);

                interaction.reply(FEEDBACK_RECEIVED_MESSAGE);
                return Ok();
            }
        },
        "feature_request": {
            handler: async function executeFeatureRequest(interaction: ModalSubmitInteraction, _args: string[]): Promise<Result> {
                debug("Handling 'feedback;feature_request' modal submission");

                const description = interaction.fields.getTextInputValue(feedbackModalFields.featureRequest.description) ?? "N/A";
                const otherDetails = interaction.fields.getTextInputValue(feedbackModalFields.featureRequest.otherDetails) ?? "N/A";

                const feedbackMessage = `**Description:** ${description}\n**Other Details:** ${otherDetails}`;

                createFeedback(FeedbackType.FEATURE, interaction.user, feedbackMessage);
                sendFeedbackToDiscord(FeedbackType.FEATURE, interaction.user, feedbackMessage);

                interaction.reply(FEEDBACK_RECEIVED_MESSAGE);
                return Ok();
            }
        },
        "general_feedback": {
            handler: async function executeGeneralFeedback(interaction: ModalSubmitInteraction, _args: string[]): Promise<Result> {
                debug("Handling 'feedback;general_feedback' modal submission");

                const description = interaction.fields.getTextInputValue(feedbackModalFields.generalFeedback.description) ?? "N/A";

                const feedbackMessage = `**Description:** ${description}`;

                createFeedback(FeedbackType.GENERAL, interaction.user, feedbackMessage);
                sendFeedbackToDiscord(FeedbackType.GENERAL, interaction.user, feedbackMessage);

                interaction.reply(FEEDBACK_RECEIVED_MESSAGE);
                return Ok();
            }
        },
    }
}

async function sendFeedbackToDiscord(type: FeedbackType, author: User, message: string): Promise<void> {
    if (config.feedback_channel === "") return;
    const embed = createFeedbackEmbed(type, author, message);
    sendToChannel(config.feedback_channel, {
        embeds: [embed],
    });
}

const EMBED_COLORS = {
    [FeedbackType.BUG]: colors.BUG_FEEDBACK,
    [FeedbackType.FEATURE]: colors.FEATURE_FEEDBACK,
    [FeedbackType.GENERAL]: colors.GENERAL_FEEDBACK,
}

function createFeedbackEmbed(type: FeedbackType, author: User, message: string): EmbedBuilder {
    return new EmbedBuilder()
        .setAuthor({ name: author.tag, iconURL: author.displayAvatarURL() })
        .setTitle(`Feedback (${type})`)
        .setDescription(message)
        .setColor(EMBED_COLORS[type]);
}

async function createFeedback(type: FeedbackType, author: User, message: string): Promise<void> {
    await prisma.feedback.create({
        data: {
            type: type,
            authorId: author.id,
            message: message
        }
    });
}

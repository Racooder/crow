import { EmbedBuilder, MessageFlags, type InteractionReplyOptions, type User } from "discord.js";
import Colors from "../../../Colors.js";
import { config } from "../../../config.js";
import { FeedbackType } from "../../../generated/prisma/enums.js";
import { sendToChannel } from "../../../util/client.js";
import prisma from "../../../prisma.js";

export function getFeedbackReceivedMessage(): InteractionReplyOptions {
    return {
        content: "Thank you for your feedback! It has been received successfully.",
        flags: [MessageFlags.Ephemeral],
    };
}

export async function sendFeedbackToDiscord(type: FeedbackType, author: User, message: string): Promise<void> {
    if (config.feedback_channel === "") return;
    const embed = createFeedbackEmbed(type, author, message);
    sendToChannel(config.feedback_channel, {
        embeds: [embed],
    });
}

const EMBED_COLORS = {
    [FeedbackType.BUG]: Colors.BUG_FEEDBACK,
    [FeedbackType.FEATURE]: Colors.FEATURE_FEEDBACK,
    [FeedbackType.GENERAL]: Colors.GENERAL_FEEDBACK,
}

export function createFeedbackEmbed(type: FeedbackType, author: User, message: string): EmbedBuilder {
    return new EmbedBuilder()
        .setAuthor({ name: author.tag, iconURL: author.displayAvatarURL() })
        .setTitle(`Feedback (${type})`)
        .setDescription(message)
        .setColor(EMBED_COLORS[type]);
}

export async function createFeedback(type: FeedbackType, author: User, message: string): Promise<void> {
    await prisma.feedback.create({
        data: {
            type: type,
            authorId: author.id,
            message: message
        }
    });
}

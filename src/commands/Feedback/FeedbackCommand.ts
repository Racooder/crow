import { ApplicationCommandOptionType, ApplicationCommandType } from "discord.js";
import type { Command } from "../commands.js";
import feedbackCommandHandler from "./commandHandlers/feedback.js";

export default {
    data: {
        name: "feedback",
        description: "Provide feedback on the bot",
        type: ApplicationCommandType.ChatInput,
        options: [
            {
                name: "type",
                description: "Type of feedback",
                type: ApplicationCommandOptionType.String,
                required: true,
                choices: [
                    { name: "Bug Report", value: "bug" },
                    { name: "Feature Request", value: "feature" },
                    { name: "General Feedback", value: "general" },
                ]
            }
        ],
    },
    handler: feedbackCommandHandler,
    subcommands: {},
} as Command;

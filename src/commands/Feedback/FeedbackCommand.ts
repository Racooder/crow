import nameLocalizations from "../../localization/feedback/commad_name.json" with { type: 'json' };
import descriptionLocalizations from "../../localization/feedback/command_description.json" with { type: 'json' };
import typeOptionNameLocalization from "../../localization/feedback/commad_name.json" with { type: 'json' };
import typeOptionDescriptionLocalization from "../../localization/feedback/command_description.json" with { type: 'json' };

import { ApplicationCommandOptionType, ApplicationCommandType } from "discord.js";
import type { Command } from "../commands.js";
import feedbackCommandHandler from "./commandHandlers/feedback.js";

export default {
    data: {
        name: nameLocalizations["en-US"],
        nameLocalizations: nameLocalizations,
        description: descriptionLocalizations["en-US"],
        descriptionLocalizations: descriptionLocalizations,
        type: ApplicationCommandType.ChatInput,
        options: [
            {
                name: typeOptionNameLocalization["en-US"],
                nameLocalizations: typeOptionNameLocalization,
                description: typeOptionDescriptionLocalization["en-US"],
                descriptionLocalizations: typeOptionDescriptionLocalization,
                type: ApplicationCommandOptionType.String,
                choices: [
                    { name: "Bug Report", value: "bug" },
                    { name: "Feature Request", value: "feature" },
                    { name: "General Feedback", value: "general" },
                ],
                required: true,
            }
        ],
    },
    handler: feedbackCommandHandler,
    subcommands: {},
} as Command;

import nameLocalizations from "../../../localization/feedback/commad_name.json" with { type: 'json' };
import descriptionLocalizations from "../../../localization/feedback/command_description.json" with { type: 'json' };
import typeOptionNameLocalization from "../../../localization/feedback/type_option_name.json" with { type: 'json' };
import typeOptionDescriptionLocalization from "../../../localization/feedback/type_option_description.json" with { type: 'json' };

import feedbackCommandHandler from "./feedback.js";

import { ApplicationCommandOptionType, ApplicationCommandType } from "discord.js";
import type { Command } from "../../commands.js";
import { FeedbackType } from "../../../generated/prisma/enums.js";

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
                    { name: "Bug Report", value: FeedbackType.BUG },
                    { name: "Feature Request", value: FeedbackType.FEATURE },
                    { name: "General Feedback", value: FeedbackType.GENERAL },
                ],
                required: true,
            }
        ],
    },
    handler: feedbackCommandHandler,
    subcommands: {},
} as Command;

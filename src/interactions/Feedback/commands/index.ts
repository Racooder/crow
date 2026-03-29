import nameLocalizations from "../../../localization/feedback/commad_name.json" with { type: 'json' };
import descriptionLocalizations from "../../../localization/feedback/command_description.json" with { type: 'json' };
import typeOptionNameLocalization from "../../../localization/feedback/type_option_name.json" with { type: 'json' };
import typeOptionDescriptionLocalization from "../../../localization/feedback/type_option_description.json" with { type: 'json' };
import typeOptionBugChoiceLocalization from "../../../localization/feedback/type_option_bug_choice.json" with { type: 'json' };
import typeOptionFeatureChoiceLocalization from "../../../localization/feedback/type_option_feature_choice.json" with { type: 'json' };
import typeOptionGeneralChoiceLocalization from "../../../localization/feedback/type_option_general_choice.json" with { type: 'json' };

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
                    {
                        name: typeOptionBugChoiceLocalization["en-US"],
                        nameLocalizations: typeOptionBugChoiceLocalization,
                        value: FeedbackType.BUG
                    },
                    {
                        name: typeOptionFeatureChoiceLocalization["en-US"],
                        nameLocalizations: typeOptionFeatureChoiceLocalization,
                        value: FeedbackType.FEATURE
                    },
                    {
                        name: typeOptionGeneralChoiceLocalization["en-US"],
                        nameLocalizations: typeOptionGeneralChoiceLocalization,
                        value: FeedbackType.GENERAL
                    },
                ],
                required: true,
            }
        ],
    },
    handler: feedbackCommandHandler,
    subcommands: {},
} as Command;

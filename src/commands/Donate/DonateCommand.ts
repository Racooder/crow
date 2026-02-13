import nameLocalizations from "../../localization/donate/commad_name.json" with { type: 'json' };
import descriptionLocalizations from "../../localization/donate/command_description.json" with { type: 'json' };

import { ApplicationCommandType } from "discord.js";
import type { Command } from "../commands.js";
import donateCommandHandler from "./commandHandlers/donate.js";

export default {
    data: {
        name: nameLocalizations["en-US"],
        nameLocalizations: nameLocalizations,
        description: descriptionLocalizations["en-US"],
        descriptionLocalizations: descriptionLocalizations,
        type: ApplicationCommandType.ChatInput,
    },
    handler: donateCommandHandler,
    subcommands: {},
} as Command;

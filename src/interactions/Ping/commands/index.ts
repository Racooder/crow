import nameLocalizations from "../../../localization/ping/commad_name.json" with { type: 'json' };
import descriptionLocalizations from "../../../localization/ping/command_description.json" with { type: 'json' };

import pingCommandHandler from "./ping.js";

import { ApplicationCommandType } from "discord.js";
import type { Command } from "../../commands.js";

export default {
    data: {
        name: nameLocalizations["en-US"],
        nameLocalizations: nameLocalizations,
        description: descriptionLocalizations["en-US"],
        descriptionLocalizations: descriptionLocalizations,
        type: ApplicationCommandType.ChatInput,
    },
    handler: pingCommandHandler,
    subcommands: {},
} as Command;

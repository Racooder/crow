import { ApplicationCommandType } from "discord.js";
import type { Command } from "../commands.js";
import donateCommandHandler from "./commandHandlers/donate.js";

export default {
    data: {
        name: "donate",
        description: "Support the development of this bot",
        type: ApplicationCommandType.ChatInput,
    },
    handler: donateCommandHandler,
    subcommands: {},
} as Command;

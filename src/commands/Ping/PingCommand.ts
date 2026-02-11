import { ApplicationCommandType } from "discord.js";
import type { Command } from "../commands.js";
import pingCommandHandler from "./commandHandlers/ping.js";

export default {
    data: {
        name: "ping",
        description: "Check your connection with the bot",
        type: ApplicationCommandType.ChatInput,
    },
    handler: pingCommandHandler,
    subcommands: {},
} as Command;

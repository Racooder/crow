import type { ChatInputApplicationCommandData, ChatInputCommandInteraction } from "discord.js";

import { Ping } from "./Ping.js";
import { Donate } from "./Donate.js";
import { debug } from "../log.js";
import type { Result } from "../result.js";
import { Feedback } from "./Feedback.js";

export type CommandHandler = (interaction: ChatInputCommandInteraction) => Promise<Result>;

export interface Subcommand {
    handler?: CommandHandler;
    subcommands?: Record<string, Subcommand>;
}

export interface Command extends Subcommand {
    data: ChatInputApplicationCommandData;
}

// Commands registry

export const COMMANDS: Record<string, Command> = {
    [Ping.data.name]: Ping,
    [Donate.data.name]: Donate,
    [Feedback.data.name]: Feedback,
};

export function getCommandsData(): ChatInputApplicationCommandData[] {
    debug("Getting data from all commands");
    return Object.values(COMMANDS).map(cmd => cmd.data);
}

export function mapCommandData<T>(callbackFunction: (data: ChatInputApplicationCommandData) => T): T[] {
    debug("Mapping commands data");
    return Object.values(COMMANDS).map(cmd => callbackFunction(cmd.data));
}

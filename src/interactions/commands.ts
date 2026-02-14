import PingCommand  from "./Ping/commands/index.js";
import DonateCommand from "./Donate/commands/index.js";
import FeedbackCommand from "./Feedback/commands/index.js";
// TODO: Implement QuoteCommand and import here

import type { ChatInputApplicationCommandData, ChatInputCommandInteraction } from "discord.js";
import { debug } from "../log.js";
import type { Result } from "../result.js";

export type CommandHandler = (interaction: ChatInputCommandInteraction) => Promise<Result>;

export interface Subcommand {
    handler?: CommandHandler;
    subcommands: Record<string, Subcommand>;
}

export interface Command extends Subcommand {
    data: ChatInputApplicationCommandData;
}

// Commands registry

export const COMMANDS: Record<string, Command> = {
    [PingCommand.data.name]: PingCommand,
    [DonateCommand.data.name]: DonateCommand,
    [FeedbackCommand.data.name]: FeedbackCommand,
};

export function getCommandsData(): ChatInputApplicationCommandData[] {
    debug("Getting data from all commands");
    return Object.values(COMMANDS).map(cmd => cmd.data);
}

export function mapCommandData<T>(callbackFunction: (data: ChatInputApplicationCommandData) => T): T[] {
    debug("Mapping commands data");
    return Object.values(COMMANDS).map(cmd => callbackFunction(cmd.data));
}

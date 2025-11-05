import { ApplicationCommandType, ChatInputCommandInteraction } from "discord.js";
import type { Command } from "./index.js";
import { debug } from "../log.js";
import type { Result } from "../result.js";

export const Quote: Command = {
    data: {
        name: "quote",
        description: "A quote command!",
        type: ApplicationCommandType.ChatInput,
    },
    handler: async function execute(interaction: ChatInputCommandInteraction): Promise<Result> {
        debug("Handling 'template' command");
        // Command handling logic goes here
        return [true, undefined];
    }
}

import type { ChatInputCommandInteraction } from "discord.js";
import { Err, type Result } from "../../../result.js";

export default async function quoteContextCommandHandler(interaction: ChatInputCommandInteraction): Promise<Result> {
    return Err("Not implemented yet"); // TODO: Implement
}

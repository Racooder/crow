import type { MessageCreateOptions, MessagePayload } from "discord.js";
import client from "../client.js";
import { Err, Ok, type Result } from "../result.js";
//! Can't use log here because of circular dependency

export async function sendToChannel(channelId: string, message: string | MessagePayload | MessageCreateOptions): Promise<Result> {
    const channel = await client.channels.fetch(channelId);

    if (!channel) return Err("Can't access the log channel");
    if (!channel.isSendable()) return Err("Can't send messages in the log channel");

    channel.send(message);
    return Ok();
}

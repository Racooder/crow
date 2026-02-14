import { ChatInputCommandInteraction, MessageFlags } from "discord.js";
import createPingEmbed from "../embeds/ping.js";
import { debug } from "../../../log.js";
import client from "../../../client.js";
import { Ok, type Result } from "../../../result.js";

export default async function pingCommandHandler(interaction: ChatInputCommandInteraction): Promise<Result> {
    debug("Handling 'ping' command");
    const latency = Math.abs(Date.now() - interaction.createdTimestamp);
    const apiLatency = client.ws.ping;

    const embed = createPingEmbed(latency, apiLatency);

    debug("Sending reply");
    await interaction.reply({
        embeds: [embed],
        flags: [MessageFlags.Ephemeral],
    });

    return Ok();
}

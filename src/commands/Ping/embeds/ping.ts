import { EmbedBuilder } from "discord.js";
import { debug } from "../../../log.js";
import Colors from "../../../Colors.js";

export default function createPingEmbed(latency: number, apiLatency: number): EmbedBuilder { // TODO: Move to embeds folder
    debug("Building ping embed")
    const latencySuffix = getLatencySuffix(latency);
    const apiLatencySuffix = getLatencySuffix(apiLatency);

    return new EmbedBuilder()
        .setColor(Colors.PING_EMBED)
        .addFields(
            {
                name: ":stopwatch: Latency",
                value: `${latency}ms ${latencySuffix}`,
            },
            {
                name: ":heartbeat: API Latency",
                value: apiLatency < 0
                    ? "Couldn't be calculated"
                    : `${apiLatency}ms ${apiLatencySuffix}`,
            }
        );
}

function getLatencySuffix(latency: number): string {
    debug("Getting latency suffix")
    // Special cases:
    switch (latency) {
        case 69:
            return "(Nice)";
        case 420:
            return "(Blaze it)";
        case 0:
            return "(Who's your ISP?)";
    }

    // Ranges:
    if (latency < 0) {
        return "(How?)";
    }
    if (latency > 1000) {
        return "(Is your router on the moon?)";
    }

    // Default:
    return "";
}

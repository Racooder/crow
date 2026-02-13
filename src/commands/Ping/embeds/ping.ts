import latencyLocalization from "../../../localization/ping/ping_embed_latency.json" with { type: 'json' };
import apiLatencyLocalization from "../../../localization/ping/ping_embed_api_latency.json" with { type: 'json' };
import apiLatencyCalculationErrorLocalization from "../../../localization/ping/ping_embed_api_latency_calculation_error.json" with { type: 'json' };
import latencySuffix69 from "../../../localization/ping/ping_embed_latency_suffix_69.json" with { type: 'json' };
import latencySuffix420 from "../../../localization/ping/ping_embed_latency_suffix_420.json" with { type: 'json' };
import latencySuffix0 from "../../../localization/ping/ping_embed_latency_suffix_0.json" with { type: 'json' };
import latencySuffixLess0 from "../../../localization/ping/ping_embed_latency_suffix_less_0.json" with { type: 'json' };
import latencySuffixGreater1000 from "../../../localization/ping/ping_embed_latency_suffix_greater_1000.json" with { type: 'json' };
import translate from "../../../translate.js";

import { EmbedBuilder } from "discord.js";
import { debug } from "../../../log.js";
import Colors from "../../../Colors.js";

export default function createPingEmbed(latency: number, apiLatency: number): EmbedBuilder {
    debug("Building ping embed")
    const latencySuffix = getLatencySuffix(latency);
    const apiLatencySuffix = getLatencySuffix(apiLatency);

    return new EmbedBuilder()
        .setColor(Colors.PING_EMBED)
        .addFields(
            {
                name: `:stopwatch: ${translate(latencyLocalization)}`,
                value: `${latency}ms ${latencySuffix}`,
            },
            {
                name: `:heartbeat: ${translate(apiLatencyLocalization)}`,
                value: apiLatency < 0
                    ? translate(apiLatencyCalculationErrorLocalization)
                    : `${apiLatency}ms ${apiLatencySuffix}`,
            }
        );
}

function getLatencySuffix(latency: number): string {
    debug("Getting latency suffix")
    // Special cases:
    switch (latency) {
        case 69:
            return translate(latencySuffix69);
        case 420:
            return translate(latencySuffix420);
        case 0:
            return translate(latencySuffix0);
    }

    // Ranges:
    if (latency < 0) {
        return translate(latencySuffixLess0);
    }
    if (latency > 1000) {
        return translate(latencySuffixGreater1000);
    }

    // Default:
    return "";
}

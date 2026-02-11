import { Client, GatewayIntentBits } from "discord.js";
import { debug } from "./log.js";

debug("Creating discord client");
const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers],
});

export default client;

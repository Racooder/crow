import { Client } from "discord.js";
import { debug } from "./log.js";

debug("Creating discord client");
const client = new Client({
    intents: ["Guilds", "GuildMembers"],
});

export default client;

import { Client } from "discord.js";
//! Can't use log here because of circular dependency

const client = new Client({
    intents: ["Guilds"],
});

export default client;

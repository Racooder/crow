import client from "./client.js";
import { config } from "./config.js";
import { EVENT_LISTENERS } from "./events/index.js";
import { info } from "./log.js";

info("Starting event listeners")
for (const listener of EVENT_LISTENERS) {
    listener.start();
}

info("Logging in")
client.login(config.discord_token);

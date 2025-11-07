import { copyFileSync, existsSync } from 'fs';
import dotenv from 'dotenv';
//! Can't use log here because of circular dependency

function loadDotenv(): void {
    if (existsSync("meta/.env")) {
        dotenv.config({ path: "meta/.env" });
        return;
    }

    if (!existsSync("meta/.env.template")) {
        throw new Error("Config template not found");
    }

    copyFileSync("meta/.env.template", "meta/.env");
    throw new Error("Config file created from template. Please fill in the required values.");
}

type Config = {
    testing_guild_id: string;
    log_channel: string;
    log_role: string;
    feedback_channel: string;

    discord_token: string;
    client_id: string;
    database_url: string;
}

function loadConfig(): Config {
    loadDotenv();
    return {
        testing_guild_id: process.env['TESTING_GUILD_ID'] as string,
        log_channel: process.env['LOG_CHANNEL'] as string,
        log_role: process.env['LOG_ROLE'] as string,
        feedback_channel: process.env['FEEDBACK_CHANNEL'] as string,

        discord_token: process.env['DISCORD_TOKEN'] as string,
        client_id: process.env['CLIENT_ID'] as string,
        database_url: process.env['DATABASE_URL'] as string,
    };
}

export const config = loadConfig();

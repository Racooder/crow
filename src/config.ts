import { copyFileSync, existsSync } from 'fs';
import dotenv from 'dotenv';
//! Can't use log here because of circular dependency

function loadDotenv(): void {
    if (existsSync(".env")) {
        dotenv.config({ path: ".env" });
        return;
    }

    if (!existsSync(".env.template")) {
        throw new Error("Config template not found");
    }

    copyFileSync(".env.template", ".env");
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
};

function validateConfig(config: Config): void {
    if (typeof config.testing_guild_id !== 'string' || config.testing_guild_id.length === 0) {
        throw new Error("Invalid or missing TESTING_GUILD_ID in config");
    }
    if (typeof config.log_channel !== 'string' || config.log_channel.length === 0) {
        throw new Error("Invalid or missing LOG_CHANNEL in config");
    }
    if (typeof config.log_role !== 'string' || config.log_role.length === 0) {
        throw new Error("Invalid or missing LOG_ROLE in config");
    }
    if (typeof config.feedback_channel !== 'string' || config.feedback_channel.length === 0) {
        throw new Error("Invalid or missing FEEDBACK_CHANNEL in config");
    }
    if (typeof config.discord_token !== 'string' || config.discord_token.length === 0) {
        throw new Error("Invalid or missing DISCORD_TOKEN in config");
    }
    if (typeof config.client_id !== 'string' || config.client_id.length === 0) {
        throw new Error("Invalid or missing CLIENT_ID in config");
    }
    if (typeof config.database_url !== 'string' || config.database_url.length === 0) {
        throw new Error("Invalid or missing DATABASE_URL in config");
    }
}

function loadConfig(): Config {
    loadDotenv();
    let config = {
        testing_guild_id: process.env['TESTING_GUILD_ID'] as string,
        log_channel: process.env['LOG_CHANNEL'] as string,
        log_role: process.env['LOG_ROLE'] as string,
        feedback_channel: process.env['FEEDBACK_CHANNEL'] as string,

        discord_token: process.env['DISCORD_TOKEN'] as string,
        client_id: process.env['CLIENT_ID'] as string,
        database_url: process.env['DATABASE_URL'] as string,
    } as const;
    validateConfig(config);
    return config;
}

export const config = loadConfig();

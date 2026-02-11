import { REST, Routes } from 'discord.js';
import { config } from './config.js';
import { getCommandsData } from './commands/commands.js';
import { debug, error } from './log.js';

const rest = new REST({ version: '10' }).setToken(config.discord_token);

export async function deployCommands(guildId: string): Promise<void> {
    try {
        debug(`Refreshing application (/) commands for ${guildId}`);

        await rest.put(
            Routes.applicationGuildCommands(config.client_id, guildId),
            {
                body: getCommandsData(),
            }
        );
    } catch (e) {
        if (typeof e === "string" || e instanceof Error) {
            error(e);
        } else {
            console.error(e);
            error("Failed to deploy commands (unknown error)");
        }
    }
}

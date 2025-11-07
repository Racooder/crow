import type { Guild } from "discord.js";

export async function isUserInGuild(userId: string, guild: Guild): Promise<boolean> {
    if (guild.members.cache.has(userId)) {
        return true;
    }
    try {
        await guild.members.fetch(userId);
        return true;
    } catch {
        return false;
    }
}

import { ChatInputCommandInteraction } from "discord.js";
import { debug } from "../../../log.js";
import { Ok, type Result } from "../../../result.js";

export default async function maintenanceCommandHandler(interaction: ChatInputCommandInteraction, commandName: string, note: string): Promise<Result> {
    debug(`Handling 'maintenance' command`);

    await interaction.reply({
        content: `The \`${commandName}\` command is currently under maintenance.\n${note}`,
        ephemeral: true,
    });

    return Ok();
}

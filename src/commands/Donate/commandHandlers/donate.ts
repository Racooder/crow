import { ActionRowBuilder, ChatInputCommandInteraction, MessageFlags, type APIActionRowComponent, type APIComponentInMessageActionRow } from "discord.js";
import { debug } from "../../../log.js";
import { Ok, type Result } from "../../../result.js";
import createDonationEmbed from "../embeds/donation.js";
import createKofiButton from "../components/kofiButton/builder.js";
import createPaypalButton from "../components/paypalButton/builder.js";

export default async function donateCommandHandler(interaction: ChatInputCommandInteraction): Promise<Result> {
    debug("Handling 'donate' command");

    const embed = createDonationEmbed();
    const actionRow = createActionRow();

    debug("Sending reply");
    await interaction.reply({
        embeds: [embed],
        components: [actionRow],
        flags: [MessageFlags.Ephemeral],
    });

    return Ok();
}

function createActionRow(): APIActionRowComponent<APIComponentInMessageActionRow> { // TODO: Move to components folder
    debug("Creating action row");

    const actionRow = new ActionRowBuilder()
        .addComponents(createKofiButton())
        .addComponents(createPaypalButton());

    return actionRow.toJSON() as APIActionRowComponent<APIComponentInMessageActionRow>;
}
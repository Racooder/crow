import { EmbedBuilder } from "discord.js";
import { debug } from "../../../log.js";
import Colors from "../../../Colors.js";

const THUMBNAIL_URL = "https://storage.ko-fi.com/cdn/brandasset/kofi_s_logo_nolabel.png?_gl=1*1vvq19e*_ga*NjQ5OTU3ODE0LjE2OTAyMDY1NjY.*_ga_M13FZ7VQ2C*MTY5MTQyNDc2Mi45LjEuMTY5MTQyNjA4NC41Ni4wLjA.";

export default function createDonationEmbed(): EmbedBuilder {
    debug("Creating embed");
    return new EmbedBuilder()
        .setColor(Colors.DONATE_EMBED)
        .setTitle("Donate on Ko-fi or directly per PayPal!")
        .setDescription("Consider supporting the developement and hosting of the bot by donating via Ko-fi or PayPal!")
        .setThumbnail(THUMBNAIL_URL);
}

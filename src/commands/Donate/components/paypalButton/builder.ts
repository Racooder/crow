import { ButtonBuilder, ButtonStyle } from "discord.js";
import { debug } from "../../../../log.js";

const PAYPAL_URL = "https://paypal.me/racooder";

export default function createPaypalButton(): ButtonBuilder {
    debug("Creating PayPal button");
    return new ButtonBuilder()
        .setStyle(ButtonStyle.Link)
        .setLabel("PayPal")
        .setURL(PAYPAL_URL);
}

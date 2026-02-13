import labelLocalizations from "../../../../localization/donate/paypal_button_label.json" with { type: 'json' };
import translate from "../../../../translate.js";

import { ButtonBuilder, ButtonStyle } from "discord.js";
import { debug } from "../../../../log.js";

const PAYPAL_URL = "https://paypal.me/racooder";

export default function createPaypalButton(): ButtonBuilder {
    debug("Creating PayPal button");
    return new ButtonBuilder()
        .setStyle(ButtonStyle.Link)
        .setLabel(translate(labelLocalizations))
        .setURL(PAYPAL_URL);
}

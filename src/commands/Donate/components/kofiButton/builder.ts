import labelLocalizations from "../../../../localization/donate/kofi_button_label.json" with { type: 'json' };
import translate from "../../../../translate.js";

import { ButtonBuilder, ButtonStyle } from "discord.js";
import { debug } from "../../../../log.js";

const KOFI_URL = "https://ko-fi.com/racooder";

export default function createKofiButton(): ButtonBuilder {
    debug("Creating Ko-fi button");
    return new ButtonBuilder()
        .setStyle(ButtonStyle.Link)
        .setLabel(translate(labelLocalizations))
        .setURL(KOFI_URL);
}

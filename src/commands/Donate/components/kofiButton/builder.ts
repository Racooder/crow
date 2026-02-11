import { ButtonBuilder, ButtonStyle } from "discord.js";
import { debug } from "../../../../log.js";

const KOFI_URL = "https://ko-fi.com/racooder";

export default function createKofiButton(): ButtonBuilder {
    debug("Creating Ko-fi button");
    return new ButtonBuilder()
        .setStyle(ButtonStyle.Link)
        .setLabel("Ko-fi")
        .setURL(KOFI_URL);
}

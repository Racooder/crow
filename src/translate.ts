import type { LocalizationMap } from "discord.js";
import FallBackTranslationMissingError from "./errors/FallBackTranslationMissing.js";

/**
 * @throws {Error} If the translation for 'en-US' is missing in the provided localization map.
 */
export default function translate(localizationMap: LocalizationMap) {
    const translation = localizationMap["en-US"];
    if (translation === null || translation === undefined) {
        throw new FallBackTranslationMissingError();
    }
    return translation;
}

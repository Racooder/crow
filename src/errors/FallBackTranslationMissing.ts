export default class FallBackTranslationMissingError extends Error {
    constructor() {
        super("Fallback translation for 'en-US' is missing");
        this.name = "FallBackTranslationMissingError";
    }
}

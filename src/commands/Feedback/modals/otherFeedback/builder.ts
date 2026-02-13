import titleLocalization from "../../../../localization/feedback/other_feedback_modal_title.json" with { type: 'json' };
import descriptionLabelLocalizations from "../../../../localization/feedback/other_feedback_modal_description_label.json" with { type: 'json' };
import descriptionPlaceholderLocalizations from "../../../../localization/feedback/other_feedback_modal_description_placeholder.json" with { type: 'json' };
import translate from "../../../../translate.js";

import { ModalBuilder } from "@discordjs/builders";
import { debug } from "../../../../log.js";
import { createLabeledTextInputWithPlaceholder } from "../../../../util/modal.js";
import { otherFeedbackModalFields } from "./shared.js";

export default function createOtherFeedbackModal(): ModalBuilder {
    debug("Creating other feedback modal");

    const description = createLabeledTextInputWithPlaceholder(otherFeedbackModalFields.description, translate(descriptionLabelLocalizations), translate(descriptionPlaceholderLocalizations), true);

    return new ModalBuilder()
        .setCustomId("feedback;other")
        .setTitle(translate(titleLocalization))
        .addLabelComponents(description);
}

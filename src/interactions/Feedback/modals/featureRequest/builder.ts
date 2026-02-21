import titleLocalization from "../../../../localization/feedback/feature_request_modal_title.json" with { type: 'json' };
import descriptionLabelLocalizations from "../../../../localization/feedback/feature_request_modal_description_label.json" with { type: 'json' };
import descriptionPlaceholderLocalizations from "../../../../localization/feedback/feature_request_modal_description_placeholder.json" with { type: 'json' };
import otherDetailsLabelLocalizations from "../../../../localization/feedback/feature_request_modal_description_placeholder.json" with { type: 'json' };
import translate from "../../../../translate.js";

import { ModalBuilder } from "@discordjs/builders";
import { debug } from "../../../../log.js";
import { createLabeledTextInputWithPlaceholder, createLabledTextInput } from "../../../../util/modal.js";
import featureRequestModalFields from "./fields.js";

export default function createFeatureRequestModal(): ModalBuilder {
    debug("Creating feature request feedback modal");

    const description = createLabeledTextInputWithPlaceholder(featureRequestModalFields.description, translate(descriptionLabelLocalizations), translate(descriptionPlaceholderLocalizations), true);
    const otherDetails = createLabledTextInput(featureRequestModalFields.otherDetails, translate(otherDetailsLabelLocalizations), false);

    return new ModalBuilder()
        .setCustomId("feedback;feature")
        .setTitle(translate(titleLocalization))
        .addLabelComponents(description, otherDetails);
}

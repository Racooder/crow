import titleLocalization from "../../../../localization/feedback/feature_request_modal_title.json" with { type: 'json' };
import descriptionLabelLocalizations from "../../../../localization/feedback/feature_request_modal_description_label.json" with { type: 'json' };
import descriptionPlaceholderLocalizations from "../../../../localization/feedback/feature_request_modal_description_placeholder.json" with { type: 'json' };
import otherDetailsLabelLocalizations from "../../../../localization/feedback/feature_request_modal_description_placeholder.json" with { type: 'json' };
import translate from "../../../../translate.js";

import { debug } from "../../../../log.js";
import { createLabeledTextInput } from "../../../../util/modal.js";
import featureRequestModalFields from "./fields.js";
import { ModalBuilder } from "discord.js";

export default function createFeatureRequestModal(): ModalBuilder {
    debug("Creating feature request feedback modal");

    const description = createLabeledTextInput(featureRequestModalFields.description, translate(descriptionLabelLocalizations), true, translate(descriptionPlaceholderLocalizations));
    const otherDetails = createLabeledTextInput(featureRequestModalFields.otherDetails, translate(otherDetailsLabelLocalizations), false);

    return new ModalBuilder()
        .setCustomId("feedback;feature")
        .setTitle(translate(titleLocalization))
        .addLabelComponents(description, otherDetails);
}

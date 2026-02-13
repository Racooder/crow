import titleLocalization from "../../../../localization/feedback/bug_report_modal_title.json" with { type: 'json' };
import expectedBehaviourLabelLocalizations from "../../../../localization/feedback/bug_report_modal_expected_behavior_label.json" with { type: 'json' };
import expectedBehaviourPlaceholderLocalizations from "../../../../localization/feedback/bug_report_modal_expected_behavior_placeholder.json" with { type: 'json' };
import actualBehaviorLabelLocalizations from "../../../../localization/feedback/bug_report_modal_actual_behavior_label.json" with { type: 'json' };
import actualBehaviorPlaceholderLocalizations from "../../../../localization/feedback/bug_report_modal_actual_behavior_placeholder.json" with { type: 'json' };
import stepsToReproduceLabelLocalizations from "../../../../localization/feedback/bug_report_modal_steps_to_reproduce_label.json" with { type: 'json' };
import otherDetailsLabelLocalizations from "../../../../localization/feedback/bug_report_modal_other_details_label.json" with { type: 'json' };
import translate from "../../../../translate.js";

import { ModalBuilder } from "@discordjs/builders";
import { debug } from "../../../../log.js";
import { createLabeledTextInputWithPlaceholder, createLabledTextInput } from '../../../../util/modal.js';
import { bugReportModalFields } from "./shared.js";

export default function createBugReportModal(): ModalBuilder {
    debug("Creating bug report feedback modal");

    const expectedBehavior = createLabeledTextInputWithPlaceholder(bugReportModalFields.expectedBehavior, translate(expectedBehaviourLabelLocalizations), translate(expectedBehaviourPlaceholderLocalizations), true)
    const actualBehavior = createLabeledTextInputWithPlaceholder(bugReportModalFields.actualBehavior, translate(actualBehaviorLabelLocalizations), translate(actualBehaviorPlaceholderLocalizations), true);
    const stepsToReproduce = createLabledTextInput(bugReportModalFields.stepsToReproduce, translate(stepsToReproduceLabelLocalizations), true)
    const otherDetails = createLabledTextInput(bugReportModalFields.otherDetails, translate(otherDetailsLabelLocalizations), false);

    return new ModalBuilder()
        .setCustomId("feedback;bug")
        .setTitle(translate(titleLocalization))
        .addLabelComponents(expectedBehavior, actualBehavior, stepsToReproduce, otherDetails);
}

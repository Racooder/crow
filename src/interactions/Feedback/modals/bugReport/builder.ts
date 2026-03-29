import titleLocalizations from "../../../../localization/feedback/bug_report_modal_title.json" with { type: 'json' };
import expectedBehaviourLabelLocalizations from "../../../../localization/feedback/bug_report_modal_expected_behavior_label.json" with { type: 'json' };
import expectedBehaviourPlaceholderLocalizations from "../../../../localization/feedback/bug_report_modal_expected_behavior_placeholder.json" with { type: 'json' };
import actualBehaviorLabelLocalizations from "../../../../localization/feedback/bug_report_modal_actual_behavior_label.json" with { type: 'json' };
import actualBehaviorPlaceholderLocalizations from "../../../../localization/feedback/bug_report_modal_actual_behavior_placeholder.json" with { type: 'json' };
import stepsToReproduceLabelLocalizations from "../../../../localization/feedback/bug_report_modal_steps_to_reproduce_label.json" with { type: 'json' };
import otherDetailsLabelLocalizations from "../../../../localization/feedback/bug_report_modal_other_details_label.json" with { type: 'json' };
import translate from "../../../../translate.js";

import { debug } from "../../../../log.js";
import { createLabeledTextInput } from '../../../../util/modal.js';
import bugReportModalFields from "./fields.js";
import { ModalBuilder } from "discord.js";

export default function createBugReportModal(): ModalBuilder {
    debug("Creating bug report feedback modal");

    const expectedBehavior = createLabeledTextInput(bugReportModalFields.expectedBehavior, translate(expectedBehaviourLabelLocalizations), true, translate(expectedBehaviourPlaceholderLocalizations));
    const actualBehavior = createLabeledTextInput(bugReportModalFields.actualBehavior, translate(actualBehaviorLabelLocalizations), true, translate(actualBehaviorPlaceholderLocalizations));
    const stepsToReproduce = createLabeledTextInput(bugReportModalFields.stepsToReproduce, translate(stepsToReproduceLabelLocalizations), true);
    const otherDetails = createLabeledTextInput(bugReportModalFields.otherDetails, translate(otherDetailsLabelLocalizations), false);

    return new ModalBuilder()
        .setCustomId("feedback;bug")
        .setTitle(translate(titleLocalizations))
        .addLabelComponents(expectedBehavior, actualBehavior, stepsToReproduce, otherDetails);
}

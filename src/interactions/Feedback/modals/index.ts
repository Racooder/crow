import handleBugReportModal from "./bugReport/handler.js";
import handleFeatureRequestModal from "./featureRequest/handler.js";
import handleOtherFeedbackModal from "./otherFeedback/handler.js";

import type { Modal } from "../../modals.js";

export default {
    id: "feedback",
    submodals: {
        bug: {
            handler: handleBugReportModal,
            submodals: {},
        },
        feature: {
            handler: handleFeatureRequestModal,
            submodals: {},
        },
        other: {
            handler: handleOtherFeedbackModal,
            submodals: {},
        }
    },
} as Modal;

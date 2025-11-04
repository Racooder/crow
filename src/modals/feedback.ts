import { Client, ModalSubmitInteraction } from "discord.js";
import type { Modal } from "./index.js";
import { debug } from "../log.js";
import type { Result } from "../exception.js";

export const Feedback: Modal = {
    id: "feedback",
    submodals: {
        "bug_report": {
            handler: async function executeBugReport(_client: Client, _interaction: ModalSubmitInteraction, _args: string[]): Promise<Result> {
                debug("Handling 'feedback;bug_report' modal submission");
                // Bug report handling logic goes here
                return [true];
            }
        },
        "feature_request": {
            handler: async function executeFeatureRequest(_client: Client, _interaction: ModalSubmitInteraction, _args: string[]): Promise<Result> {
                debug("Handling 'feedback;feature_request' modal submission");
                // Feature request handling logic goes here
                return [true];
            }
        },
        "general_feedback": {
            handler: async function executeGeneralFeedback(_client: Client, _interaction: ModalSubmitInteraction, _args: string[]): Promise<Result> {
                debug("Handling 'feedback;general_feedback' modal submission");
                // General feedback handling logic goes here
                return [true];
            }
        },
    }
}

import type { ModalSubmitInteraction } from "discord.js";
import type { Result } from "../exception.js";
import { Feedback } from "./Feedback.js";

export type ModalHandler = (interaction: ModalSubmitInteraction, args: string[]) => Promise<Result>;

export interface SubModal {
    handler?: ModalHandler;
    submodals?: Record<string, SubModal>;
}

export interface Modal extends SubModal {
    id: string;
}

export const MODALS: Record<string, Modal> = {
    [Feedback.id]: Feedback,
};

import type { ModalBuilder, ModalSubmitInteraction } from "discord.js";
import type { Result } from "../result.js";
import { Feedback } from "../commands/Feedback/modals/Feedback.js";

export type ModalHandler = (interaction: ModalSubmitInteraction, args: string[]) => Promise<Result>;

export interface SubModal {
    builder?: (...args: any[]) => ModalBuilder;
    handler?: ModalHandler;
    submodals?: Record<string, SubModal>;
}

export interface Modal extends SubModal {
    id: string;
}

export const MODALS: Record<string, Modal> = {
    [Feedback.id]: Feedback,
};

// TODO: Split up modal handler files into new format and import here

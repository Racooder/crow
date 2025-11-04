import type { Client, ModalSubmitInteraction } from "discord.js";
import type { Result } from "../exception.js";
import { Feedback } from "./feedback.js";

export type ModalHandler = (client: Client, interaction: ModalSubmitInteraction, args: string[]) => Promise<Result>;

interface SubModal {
    handler?: ModalHandler;
    submodals?: Record<string, SubModal>;
}

export interface Modal extends SubModal {
    id: string;
}

export const MODALS: Modal[] = [
    Feedback
];

import { InteractionCreate } from "./InteractionCreate.js";
import { ClientReady } from "./ClientReady.js";

export type EventListener = {
    start: () => void;
}

// Event Listener Registry

export const EVENT_LISTENERS: EventListener[] = [
    InteractionCreate,
    ClientReady,
];

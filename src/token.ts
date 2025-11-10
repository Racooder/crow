import { customAlphabet } from "nanoid";

const alphabet = 'abcdefghijklmnopqrstuvwxyz0123456789';
export const generateToken = customAlphabet(alphabet, 7); // 7 chars, 36^7 = ~36.2 bits entropy

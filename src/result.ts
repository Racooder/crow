import { Exception } from "./exception.js";

export type Result<T = undefined> = [true, T] | [false, Exception];

export function Err<T = undefined>(logMessage: string, userReply?: string): Result<T> {
    return [false, new Exception(logMessage, userReply)];
}

export function Ok<T>(value?: T): Result<T> {
    return [true, value as T];
}

export function isOk<T>(result: Result<T>): result is [true, T] {
    return result[0] === true;
}

export function isErr<T>(result: Result<T>): result is [false, Exception] {
    return result[0] === false;
}

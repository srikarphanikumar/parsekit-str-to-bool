export type StringBoolean = string | boolean | number | undefined | null;

export interface StringToBooleanOptions {
    strict?: boolean;
    truthyValues?: string[];
    falsyValues?: string[];
    caseSensitive?: boolean;
    trimInput?: boolean;
}

export class StringToBooleanError extends Error {
    constructor(value: unknown) {
        super(`Invalid boolean value: ${String(value)}`);
        this.name = 'StringToBooleanError';
    }
}



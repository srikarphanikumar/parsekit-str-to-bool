import {
    StringBoolean,
    StringToBooleanOptions,
    StringToBooleanError
} from './types';

import { DEFAULT_OPTIONS } from './defaults';

export function stringToBoolean(
    value: StringBoolean,
    options: StringToBooleanOptions = {}
): boolean {
    const mergedOptions = { ...DEFAULT_OPTIONS, ...options };

    // Handle null/undefined
    if (value === null || value === undefined) {
        if (mergedOptions.strict) {
            throw new StringToBooleanError(value);
        }
        return false;
    }

    // Handle boolean
    if (typeof value === 'boolean') {
        return value;
    }

    // Handle number
    if (typeof value === 'number') {
        if (mergedOptions.strict && value !== 0 && value !== 1) {
            throw new StringToBooleanError(value);
        }
        return value !== 0;
    }

    // Handle string
    let normalizedValue = String(value);
    if (mergedOptions.trimInput) {
        normalizedValue = normalizedValue.trim();
    }
    if (!mergedOptions.caseSensitive) {
        normalizedValue = normalizedValue.toLowerCase();
    }

    const truthyValues = new Set(mergedOptions.truthyValues);
    const falsyValues = new Set(mergedOptions.falsyValues);

    if (truthyValues.has(normalizedValue)) {
        return true;
    }

    if (falsyValues.has(normalizedValue)) {
        return false;
    }

    if (mergedOptions.strict) {
        throw new StringToBooleanError(value);
    }

    return false;
}

export function stringToBooleanStrict(value: StringBoolean): boolean {
    return stringToBoolean(value, { strict: true });
}

export function stringToBooleanWithOptions(
    value: StringBoolean,
    options: StringToBooleanOptions
): boolean {
    return stringToBoolean(value, options);
}

export { StringToBooleanError, type StringBoolean, type StringToBooleanOptions };
export default stringToBoolean;
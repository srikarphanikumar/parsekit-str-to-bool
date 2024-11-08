import { StringToBooleanOptions } from "./types";

export const DEFAULT_TRUTHY_VALUES = [
    'true',
    'yes',
    'y',
    '1',
    'on',
    'enable',
    'enabled',
    'ok',
    'positive',
];

export const DEFAULT_FALSY_VALUES = [
    'false',
    'no',
    'n',
    '0',
    'off',
    'disable',
    'disabled',
    'negative',
];

export const DEFAULT_OPTIONS: Required<StringToBooleanOptions> = {
    strict: false,
    truthyValues: DEFAULT_TRUTHY_VALUES,
    falsyValues: DEFAULT_FALSY_VALUES,
    caseSensitive: false,
    trimInput: true,
};
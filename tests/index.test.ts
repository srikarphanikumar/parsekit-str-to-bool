import {
    stringToBoolean,
    stringToBooleanStrict,
    stringToBooleanWithOptions,
    StringToBooleanError
} from '../src';

describe('stringToBoolean', () => {
    describe('basic functionality', () => {
        test('converts truthy string values', () => {
            expect(stringToBoolean('true')).toBe(true);
            expect(stringToBoolean('yes')).toBe(true);
            expect(stringToBoolean('y')).toBe(true);
            expect(stringToBoolean('1')).toBe(true);
            expect(stringToBoolean('on')).toBe(true);
        });

        test('converts falsy string values', () => {
            expect(stringToBoolean('false')).toBe(false);
            expect(stringToBoolean('no')).toBe(false);
            expect(stringToBoolean('n')).toBe(false);
            expect(stringToBoolean('0')).toBe(false);
            expect(stringToBoolean('off')).toBe(false);
        });
    });

    describe('type handling', () => {
        test('handles boolean inputs', () => {
            expect(stringToBoolean(true)).toBe(true);
            expect(stringToBoolean(false)).toBe(false);
        });

        test('handles number inputs', () => {
            expect(stringToBoolean(1)).toBe(true);
            expect(stringToBoolean(0)).toBe(false);
        });

        test('handles null/undefined', () => {
            expect(stringToBoolean(null)).toBe(false);
            expect(stringToBoolean(undefined)).toBe(false);
        });
    });

    describe('options', () => {
        test('respects case sensitivity', () => {
            expect(stringToBoolean('TRUE', { caseSensitive: true })).toBe(false);
            expect(stringToBoolean('true', { caseSensitive: true })).toBe(true);
        });

        test('handles custom truthy/falsy values', () => {
            expect(
                stringToBoolean('si', { truthyValues: ['si'] })
            ).toBe(true);
            expect(
                stringToBoolean('nein', { falsyValues: ['nein'] })
            ).toBe(false);
        });

        test('respects trimInput option', () => {
            expect(stringToBoolean(' true ', { trimInput: true })).toBe(true);
            expect(stringToBoolean(' true ', { trimInput: false })).toBe(false);
        });
    });

    describe('number handling', () => {
        test('handles non-binary numbers in strict mode', () => {
            expect(() => stringToBoolean(2, { strict: true }))
                .toThrow(StringToBooleanError);
            expect(() => stringToBoolean(-1, { strict: true }))
                .toThrow(StringToBooleanError);
        });

        test('handles non-binary numbers in non-strict mode', () => {
            expect(stringToBoolean(2)).toBe(true);
            expect(stringToBoolean(-1)).toBe(true);
        });
    });

    describe('edge cases', () => {
        test('handles empty string', () => {
            expect(stringToBoolean('')).toBe(false);
            expect(() => stringToBoolean('', { strict: true }))
                .toThrow(StringToBooleanError);
        });

        test('handles whitespace strings', () => {
            expect(stringToBoolean('   ')).toBe(false);
            expect(() => stringToBoolean('   ', { strict: true }))
                .toThrow(StringToBooleanError);
        });

        test('handles case sensitivity with custom values', () => {
            expect(
                stringToBoolean('TRUE', {
                    caseSensitive: true,
                    truthyValues: ['TRUE']
                })
            ).toBe(true);

            expect(
                stringToBoolean('TRUE', {
                    caseSensitive: true,
                    truthyValues: ['true']
                })
            ).toBe(false);
        });
    });
});

describe('stringToBooleanStrict', () => {
    test('throws error for invalid values', () => {
        expect(() => stringToBooleanStrict('invalid'))
            .toThrow(StringToBooleanError);
        expect(() => stringToBooleanStrict(null))
            .toThrow(StringToBooleanError);
    });
});

describe('stringToBooleanWithOptions', () => {
    test('works with custom options', () => {
        expect(
            stringToBooleanWithOptions('ja', {
                truthyValues: ['ja'],
                strict: true
            })
        ).toBe(true);
    });
});
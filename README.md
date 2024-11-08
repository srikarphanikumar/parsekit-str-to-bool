# @parsekit/string-to-boolean

A ZERO-DEPENDENCY robust TypeScript utility to convert strings to boolean values with extensive options and type safety.

[![npm version](https://img.shields.io/npm/v/@parsekit/string-to-boolean.svg)](https://www.npmjs.com/package/@parsekit/string-to-boolean)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Features

- 🚀 TypeScript support with full type safety
- 🎯 Configurable truthy and falsy values
- ⚙️ Customizable options (case sensitivity, input trimming)
- 💪 Strict mode for rigorous parsing
- 🧩 Handles various input types (strings, numbers, booleans)
- 0️⃣ Zero dependencies

## Installation

```bash
# Using npm
npm install @parsekit/string-to-boolean

# Using yarn
yarn add @parsekit/string-to-boolean

# Using pnpm
pnpm add @parsekit/string-to-boolean
```

## Usage

### Basic Usage

```typescript
import { stringToBoolean } from '@parsekit/string-to-boolean';

// Simple conversions
stringToBoolean('true');     // returns true
stringToBoolean('false');    // returns false
stringToBoolean('yes');      // returns true
stringToBoolean('no');       // returns false
stringToBoolean(1);          // returns true
stringToBoolean(0);          // returns false
```

### Strict Mode

```typescript
import { stringToBooleanStrict } from '@parsekit/string-to-boolean';

// Throws error for invalid values
stringToBooleanStrict('true');     // returns true
stringToBooleanStrict('invalid');  // throws StringToBooleanError
```

### Custom Options

```typescript
import { stringToBoolean } from '@parsekit/string-to-boolean';

const options = {
  truthyValues: ['yes', 'y', '1', 'true'],
  falsyValues: ['no', 'n', '0', 'false'],
  caseSensitive: false,
  trimInput: true,
  strict: false
};

stringToBoolean(' YES ', options);  // returns true
stringToBoolean('n', options);      // returns false
```

## API Reference

### `stringToBoolean(value: StringBoolean, options?: StringToBooleanOptions): boolean`

Main function to convert various input types to boolean.

#### Parameters

- `value`: The value to convert (string, number, boolean, null, or undefined)
- `options`: Optional configuration object

#### Options

```typescript
interface StringToBooleanOptions {
  truthyValues?: string[];      // Default: ['true', 'yes', 'y', '1']
  falsyValues?: string[];       // Default: ['false', 'no', 'n', '0']
  caseSensitive?: boolean;      // Default: false
  trimInput?: boolean;          // Default: true
  strict?: boolean;             // Default: false
}
```

### `stringToBooleanStrict(value: StringBoolean): boolean`

Convenience function that calls `stringToBoolean` with `strict: true`.

### `stringToBooleanWithOptions(value: StringBoolean, options: StringToBooleanOptions): boolean`

Alternative function name for better code readability when using options.

## Default Values

The package comes with the following default values:

```typescript
const DEFAULT_OPTIONS = {
  truthyValues: ['true', 'yes', 'y', '1'],
  falsyValues: ['false', 'no', 'n', '0'],
  caseSensitive: false,
  trimInput: true,
  strict: false
};
```

## Error Handling

The package exports `StringToBooleanError` for error cases:

```typescript
try {
  stringToBooleanStrict('maybe');
} catch (error) {
  if (error instanceof StringToBooleanError) {
    console.error('Invalid boolean value:', error.message);
  }
}
```

## Examples

### Case Sensitivity

```typescript
// Case insensitive (default)
stringToBoolean('TRUE');  // returns true
stringToBoolean('False'); // returns false

// Case sensitive
stringToBoolean('TRUE', { caseSensitive: true });  // returns false
```

### Input Trimming

```typescript
// Trimming enabled (default)
stringToBoolean(' true ');  // returns true

// Trimming disabled
stringToBoolean(' true ', { trimInput: false });  // returns false
```

### Custom Values

```typescript
const options = {
  truthyValues: ['on', 'active'],
  falsyValues: ['off', 'inactive']
};

stringToBoolean('on', options);      // returns true
stringToBoolean('active', options);  // returns true
stringToBoolean('off', options);     // returns false
```

### Handling Special Values

```typescript
// Null/undefined handling
stringToBoolean(null);              // returns false
stringToBoolean(undefined);         // returns false
stringToBoolean(null, { strict: true });  // throws StringToBooleanError

// Number handling
stringToBoolean(1);                 // returns true
stringToBoolean(0);                 // returns false
stringToBoolean(2, { strict: true });  // throws StringToBooleanError
```

## TypeScript Support

The package includes TypeScript definitions and exports the following types:

```typescript
type StringBoolean = string | number | boolean | null | undefined;

interface StringToBooleanOptions {
  truthyValues?: string[];
  falsyValues?: string[];
  caseSensitive?: boolean;
  trimInput?: boolean;
  strict?: boolean;
}
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT © [Srikar Phani Kumar Marti](https://github.com/srikarphanikumar)
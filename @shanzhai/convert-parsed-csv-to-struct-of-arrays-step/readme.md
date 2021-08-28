# `@shanzhai/convert-parsed-csv-to-struct-of-arrays-step` [![Continuous Integration](https://github.com/jameswilddev/shanzhai/workflows/Continuous%20Integration/badge.svg)](https://github.com/jameswilddev/shanzhai/actions) [![License](https://img.shields.io/github/license/jameswilddev/shanzhai.svg)](https://github.com/jameswilddev/shanzhai/blob/master/license) [![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fjameswilddev%2Fshanzhai.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fjameswilddev%2Fshanzhai?ref=badge_shield) [![Renovate enabled](https://img.shields.io/badge/renovate-enabled-brightgreen.svg)](https://renovatebot.com/) [![npm](https://img.shields.io/npm/v/@shanzhai/convert-parsed-csv-to-struct-of-arrays-step.svg)](https://www.npmjs.com/package/@shanzhai/convert-parsed-csv-to-struct-of-arrays-step) [![npm type definitions](https://img.shields.io/npm/types/@shanzhai/convert-parsed-csv-to-struct-of-arrays-step.svg)](https://www.npmjs.com/package/@shanzhai/convert-parsed-csv-to-struct-of-arrays-step)

A Shanzhai step which converts a parsed CSV file to a "struct-of-arrays" format where each column is its own array.

## Usage

Use `ConvertParsedCsvToStructOfArraysStep` to convert a parsed CSV to an object
suitable for inclusion in the
[TypeScript global store](https://www.npmjs.com/package/@shanzhai/type-script-global-store).
For example, returning the following from a trigger's event handler:

```typescript
new ConvertParsedCsvToStructOfArraysStep(
  `A description of the operation being performed`,
  `aPrefixForAnyGlobals`,
  new ConstantInput([
    [`TestHeaderA`, `TestHeaderB`, `TestHeaderC`],
    [`Test Value A A`, `125`, `null`],
    [`Test Value A B`, `552`, `false`],
    [`Test Value A C`, `924`, `true`],
  ]),
  new OutputWhichReceivesConvertedCSV()
);
```

Would write the following to the output:

```typescript
{
  aPrefixForAnyGlobalsTestHeaderA: [
    `Test Value A A`,
    `Test Value A B`,
    `Test Value A C`,
  ],
  aPrefixForAnyGlobalsTestHeaderB: [
    125,
    552,
    924,
  ],
  aPrefixForAnyGlobalsTestHeaderC: [
    null,
    false,
    true,
  ],
};
```

If the content of a cell is JSON-serializable, that value will be used.  If this
is not desirable, quote the value (effectively turning it into a JSON string).

## Dependencies

This package has no runtime dependencies.

## Peer Dependencies

This package has no runtime peer dependencies (it does not expect any other packages to be installed alongside itself).

## License

[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fjameswilddev%2Fshanzhai.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Fjameswilddev%2Fshanzhai?ref=badge_large)

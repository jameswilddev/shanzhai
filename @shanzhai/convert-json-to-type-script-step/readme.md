# `@shanzhai/convert-json-to-type-script-step` [![Continuous Integration](https://github.com/jameswilddev/shanzhai/workflows/Continuous%20Integration/badge.svg)](https://github.com/jameswilddev/shanzhai/actions) [![License](https://img.shields.io/github/license/jameswilddev/shanzhai.svg)](https://github.com/jameswilddev/shanzhai/blob/master/license) [![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fjameswilddev%2Fshanzhai.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fjameswilddev%2Fshanzhai?ref=badge_shield) [![Renovate enabled](https://img.shields.io/badge/renovate-enabled-brightgreen.svg)](https://renovatebot.com/) [![npm](https://img.shields.io/npm/v/@shanzhai/convert-json-to-type-script-step.svg)](https://www.npmjs.com/package/@shanzhai/convert-json-to-type-script-step) [![npm type definitions](https://img.shields.io/npm/types/@shanzhai/convert-json-to-type-script-step.svg)](https://www.npmjs.com/package/@shanzhai/convert-json-to-type-script-step)

A Shanzhai step which converts a JSON value to TypeScript source code for ambient declarations.

## Usage

Use `ConvertJsonToTypeScriptStep` to convert an object containing constants into
a set of TypeScript type declarations.  For example, returning the following
from a trigger's event handler:

```typescript
new ConvertJsonToTypeScriptStep(
  `A description of the operation being performed`,
  new ConstantInput({
    theFirstDeclaration: 3,
    theSecondDeclaration: {
      anObjectContaining: [
        `an`,
        `array`,
      ],
    }
  })
);
```

To produce the following output:

```typescript
declare const theFirstDeclaration: 3;

declare const theSecondDeclaration: {
  readonly anObjectContaining: readonly [
    `an`,
    `array`,
  ],
};
```

The values are not included; these should be injected during minification.

## Dependencies

This package has no runtime dependencies.

## Peer Dependencies

This package has no runtime peer dependencies (it does not expect any other packages to be installed alongside itself).

## License

[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fjameswilddev%2Fshanzhai.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Fjameswilddev%2Fshanzhai?ref=badge_large)

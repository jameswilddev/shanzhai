# `@shanzhai/stringify-json-output` [![Continuous Integration](https://github.com/jameswilddev/shanzhai/workflows/Continuous%20Integration/badge.svg)](https://github.com/jameswilddev/shanzhai/actions) [![License](https://img.shields.io/github/license/jameswilddev/shanzhai.svg)](https://github.com/jameswilddev/shanzhai/blob/master/license) [![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fjameswilddev%2Fshanzhai.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fjameswilddev%2Fshanzhai?ref=badge_shield) [![Renovate enabled](https://img.shields.io/badge/renovate-enabled-brightgreen.svg)](https://renovatebot.com/) [![npm](https://img.shields.io/npm/v/@shanzhai/stringify-json-output.svg)](https://www.npmjs.com/package/@shanzhai/stringify-json-output) [![npm type definitions](https://img.shields.io/npm/types/@shanzhai/stringify-json-output.svg)](https://www.npmjs.com/package/@shanzhai/stringify-json-output)

A Shanzhai output which "stringifies" a value before passing it to an output.

## Usage

Give an instance of `StringifyJsonOutput` to a `Step` as an output and it will
convert the value it is given into a string of JSON before passing it to its
nested `Output`.

For example, the following examples are equivalent:

```typescript
new CopyStep(
  `Example`,
  new ConstantInput([1, 2, 3]),
  new StringifyJsonOutput(new ExampleOutput())
);
```

```typescript
new CopyStep(
  `Example`,
  new ConstantInput(`[1,2,3]`),
  new ExampleOutput()
);
```

Note that this does not directly use `JSON.stringify`; it has the following
differences:

- Object key order is always sorted, ascending.
- Object properties with undefined values are omitted from the string of JSON.

## Dependencies

This package has no runtime dependencies.

## Peer Dependencies

This package has no runtime peer dependencies (it does not expect any other packages to be installed alongside itself).

## License

[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fjameswilddev%2Fshanzhai.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Fjameswilddev%2Fshanzhai?ref=badge_large)

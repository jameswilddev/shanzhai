# `@shanzhai/stringify-json-input` [![Continuous Integration](https://github.com/jameswilddev/shanzhai/workflows/Continuous%20Integration/badge.svg)](https://github.com/jameswilddev/shanzhai/actions) [![License](https://img.shields.io/github/license/jameswilddev/shanzhai.svg)](https://github.com/jameswilddev/shanzhai/blob/master/license) [![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fjameswilddev%2Fshanzhai.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fjameswilddev%2Fshanzhai?ref=badge_shield) [![Renovate enabled](https://img.shields.io/badge/renovate-enabled-brightgreen.svg)](https://renovatebot.com/) [![npm](https://img.shields.io/npm/v/@shanzhai/stringify-json-input.svg)](https://www.npmjs.com/package/@shanzhai/stringify-json-input) [![npm type definitions](https://img.shields.io/npm/types/@shanzhai/stringify-json-input.svg)](https://www.npmjs.com/package/@shanzhai/stringify-json-input)

A Shanzhai input which "stringifies" a value after retrieving it from an input.

## Usage

Give an instance of `StringifyJsonInput` to a `Step` as an input and it will
convert the value returned by its nested `Input` into a string of JSON.

For example, the following examples are equivalent:

```typescript
new ExampleStep(
  new StringifyJsonInput(new ConstantInput([1, 2, 3]))
);
```

```typescript
new ExampleStep(
  new ConstantInput(`[1,2,3]`])
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

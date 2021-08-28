# `@shanzhai/stringify-json-step` [![Continuous Integration](https://github.com/jameswilddev/shanzhai/workflows/Continuous%20Integration/badge.svg)](https://github.com/jameswilddev/shanzhai/actions) [![License](https://img.shields.io/github/license/jameswilddev/shanzhai.svg)](https://github.com/jameswilddev/shanzhai/blob/master/license) [![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fjameswilddev%2Fshanzhai.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fjameswilddev%2Fshanzhai?ref=badge_shield) [![Renovate enabled](https://img.shields.io/badge/renovate-enabled-brightgreen.svg)](https://renovatebot.com/) [![npm](https://img.shields.io/npm/v/@shanzhai/stringify-json-step.svg)](https://www.npmjs.com/package/@shanzhai/stringify-json-step) [![npm type definitions](https://img.shields.io/npm/types/@shanzhai/stringify-json-step.svg)](https://www.npmjs.com/package/@shanzhai/stringify-json-step)

A Shanzhai step which "stringifies" a JSON value to a string.

## Usage

If within a trigger's event handler an instance of `StringifyJsonStep` similar
to the following were to be returned:

```typescript
new StringifyJsonStep(
  `A description of the operation being performed`,
  new InputForAJsonValue(),
  new OutputForStringOfJson(),
);
```

A string containing the rendered generated string of JSON would be written to
the output.

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

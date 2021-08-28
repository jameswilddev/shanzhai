# `@shanzhai/parse-json-step` [![Continuous Integration](https://github.com/jameswilddev/shanzhai/workflows/Continuous%20Integration/badge.svg)](https://github.com/jameswilddev/shanzhai/actions) [![License](https://img.shields.io/github/license/jameswilddev/shanzhai.svg)](https://github.com/jameswilddev/shanzhai/blob/master/license) [![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fjameswilddev%2Fshanzhai.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fjameswilddev%2Fshanzhai?ref=badge_shield) [![Renovate enabled](https://img.shields.io/badge/renovate-enabled-brightgreen.svg)](https://renovatebot.com/) [![npm](https://img.shields.io/npm/v/@shanzhai/parse-json-step.svg)](https://www.npmjs.com/package/@shanzhai/parse-json-step) [![npm type definitions](https://img.shields.io/npm/types/@shanzhai/parse-json-step.svg)](https://www.npmjs.com/package/@shanzhai/parse-json-step)

A Shanzhai step which parses JSON from a string.

## Usage

If within a trigger's event handler an instance of `ParseJsonStep` similar to the
following were to be returned:

```typescript
new ParseJsonStep(
  `A description of the operation being performed`,
  new ConstantInput(`{"testKey":"testValue"}`),
  new OutputForParsedJson()
);
```

A value similar to the following would be written to the output:

```typescript
{ testKey: `testValue` };
```

## Dependencies

This package has no runtime dependencies.

## Peer Dependencies

This package has no runtime peer dependencies (it does not expect any other packages to be installed alongside itself).

## License

[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fjameswilddev%2Fshanzhai.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Fjameswilddev%2Fshanzhai?ref=badge_large)

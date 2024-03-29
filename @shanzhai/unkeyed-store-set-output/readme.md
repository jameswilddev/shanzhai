# `@shanzhai/unkeyed-store-set-output` [![Continuous Integration](https://github.com/jameswilddev/shanzhai/workflows/Continuous%20Integration/badge.svg)](https://github.com/jameswilddev/shanzhai/actions) [![License](https://img.shields.io/github/license/jameswilddev/shanzhai.svg)](https://github.com/jameswilddev/shanzhai/blob/master/license) [![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fjameswilddev%2Fshanzhai.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fjameswilddev%2Fshanzhai?ref=badge_shield) [![Renovate enabled](https://img.shields.io/badge/renovate-enabled-brightgreen.svg)](https://renovatebot.com/) [![npm](https://img.shields.io/npm/v/@shanzhai/unkeyed-store-set-output.svg)](https://www.npmjs.com/package/@shanzhai/unkeyed-store-set-output) [![npm type definitions](https://img.shields.io/npm/types/@shanzhai/unkeyed-store-set-output.svg)](https://www.npmjs.com/package/@shanzhai/unkeyed-store-set-output)

A Shanzhai output which sets the value of an unkeyed store.

## Usage

Provide an instance of `UnkeyedStoreSetOutput` as an output to a `Step` and when
that `Step` outputs a value, it will pass it onto its given `UnkeyedStore`.

For example:

```typescript
new ExampleStep(
  new UnkeyedStoreSetOutput(anExampleUnkeyedStore)
);
```

## Dependencies

This package has no runtime dependencies.

## Peer Dependencies

This package has no runtime peer dependencies (it does not expect any other packages to be installed alongside itself).

## License

[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fjameswilddev%2Fshanzhai.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Fjameswilddev%2Fshanzhai?ref=badge_large)

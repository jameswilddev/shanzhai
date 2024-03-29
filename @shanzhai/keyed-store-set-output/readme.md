# `@shanzhai/keyed-store-set-output` [![Continuous Integration](https://github.com/jameswilddev/shanzhai/workflows/Continuous%20Integration/badge.svg)](https://github.com/jameswilddev/shanzhai/actions) [![License](https://img.shields.io/github/license/jameswilddev/shanzhai.svg)](https://github.com/jameswilddev/shanzhai/blob/master/license) [![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fjameswilddev%2Fshanzhai.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fjameswilddev%2Fshanzhai?ref=badge_shield) [![Renovate enabled](https://img.shields.io/badge/renovate-enabled-brightgreen.svg)](https://renovatebot.com/) [![npm](https://img.shields.io/npm/v/@shanzhai/keyed-store-set-output.svg)](https://www.npmjs.com/package/@shanzhai/keyed-store-set-output) [![npm type definitions](https://img.shields.io/npm/types/@shanzhai/keyed-store-set-output.svg)](https://www.npmjs.com/package/@shanzhai/keyed-store-set-output)

A Shanzhai output which sets a value in a keyed store.

## Usage

Provide an instance of `KeyedStoreSetOutput` as an output to a `Step` to set a
specific key/value in a `KeyedStore`.

```typescript
new ExampleStep(
  new KeyedStoreSetOutput(
    aKeyedStoreInWhichToSetAKeyValue,
    `An Example Key To Set`
  )
);
```

## Dependencies

This package has no runtime dependencies.

## Peer Dependencies

This package has no runtime peer dependencies (it does not expect any other packages to be installed alongside itself).

## License

[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fjameswilddev%2Fshanzhai.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Fjameswilddev%2Fshanzhai?ref=badge_large)

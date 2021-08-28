# `@shanzhai/keyed-store-get-all-input` [![Continuous Integration](https://github.com/jameswilddev/shanzhai/workflows/Continuous%20Integration/badge.svg)](https://github.com/jameswilddev/shanzhai/actions) [![License](https://img.shields.io/github/license/jameswilddev/shanzhai.svg)](https://github.com/jameswilddev/shanzhai/blob/master/license) [![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fjameswilddev%2Fshanzhai.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fjameswilddev%2Fshanzhai?ref=badge_shield) [![Renovate enabled](https://img.shields.io/badge/renovate-enabled-brightgreen.svg)](https://renovatebot.com/) [![npm](https://img.shields.io/npm/v/@shanzhai/keyed-store-get-all-input.svg)](https://www.npmjs.com/package/@shanzhai/keyed-store-get-all-input) [![npm type definitions](https://img.shields.io/npm/types/@shanzhai/keyed-store-get-all-input.svg)](https://www.npmjs.com/package/@shanzhai/keyed-store-get-all-input)

A Shanzhai input which reads all keys and values from a keyed store as an object.

## Usage

Provide an instance of `KeyedStoreGetAllInput` as an input to a `Step` to
provide an object containing all of a `KeyedStore`'s keys and values to it.

```typescript
new ExampleStep(
  new KeyedStoreGetAllInput(aKeyedStoreFromWhichToRetrieveAllKeysAndValues)
);
```

## Dependencies

This package has no runtime dependencies.

## Peer Dependencies

This package has no runtime peer dependencies (it does not expect any other packages to be installed alongside itself).

## License

[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fjameswilddev%2Fshanzhai.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Fjameswilddev%2Fshanzhai?ref=badge_large)

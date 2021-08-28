# `@shanzhai/unkeyed-store-get-input` [![Continuous Integration](https://github.com/jameswilddev/shanzhai/workflows/Continuous%20Integration/badge.svg)](https://github.com/jameswilddev/shanzhai/actions) [![License](https://img.shields.io/github/license/jameswilddev/shanzhai.svg)](https://github.com/jameswilddev/shanzhai/blob/master/license) [![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fjameswilddev%2Fshanzhai.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fjameswilddev%2Fshanzhai?ref=badge_shield) [![Renovate enabled](https://img.shields.io/badge/renovate-enabled-brightgreen.svg)](https://renovatebot.com/) [![npm](https://img.shields.io/npm/v/@shanzhai/unkeyed-store-get-input.svg)](https://www.npmjs.com/package/@shanzhai/unkeyed-store-get-input) [![npm type definitions](https://img.shields.io/npm/types/@shanzhai/unkeyed-store-get-input.svg)](https://www.npmjs.com/package/@shanzhai/unkeyed-store-get-input)

A Shanzhai input which reads the value of an unkeyed store.

## Usage

Provide an instance of `UnkeyedStoreGetInput` as an input to a `Step` and when
that `Step` requests a value, it will retrieve the current value of its given
`UnkeyedStore`.

For example:

```typescript
new ExampleStep(
  new UnkeyedStoreGetInput(anExampleUnkeyedStore)
);
```

As this calls `UnkeyedStore.get` under the hood, behavior is similarly undefined
should the store not have a value at the time.

## Dependencies

This package has no runtime dependencies.

## Peer Dependencies

This package has no runtime peer dependencies (it does not expect any other packages to be installed alongside itself).

## License

[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fjameswilddev%2Fshanzhai.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Fjameswilddev%2Fshanzhai?ref=badge_large)

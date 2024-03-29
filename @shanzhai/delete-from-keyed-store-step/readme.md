# `@shanzhai/delete-from-keyed-store-step` [![Continuous Integration](https://github.com/jameswilddev/shanzhai/workflows/Continuous%20Integration/badge.svg)](https://github.com/jameswilddev/shanzhai/actions) [![License](https://img.shields.io/github/license/jameswilddev/shanzhai.svg)](https://github.com/jameswilddev/shanzhai/blob/master/license) [![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fjameswilddev%2Fshanzhai.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fjameswilddev%2Fshanzhai?ref=badge_shield) [![Renovate enabled](https://img.shields.io/badge/renovate-enabled-brightgreen.svg)](https://renovatebot.com/) [![npm](https://img.shields.io/npm/v/@shanzhai/delete-from-keyed-store-step.svg)](https://www.npmjs.com/package/@shanzhai/delete-from-keyed-store-step) [![npm type definitions](https://img.shields.io/npm/types/@shanzhai/delete-from-keyed-store-step.svg)](https://www.npmjs.com/package/@shanzhai/delete-from-keyed-store-step)

A Shanzhai step which deletes a key/value from a keyed store.

## Usage

Within a trigger's event handler, return an instance of
`DeleteFromKeyedStoreStep` similar to the following:

```typescript
new DeleteFromKeyedStoreStep(
  aKeyedStore,
  `A Key Within That Store`
)
```

The key/value specified will be deleted from the store.

If it does not exist in the store, nothing happens.

## Dependencies

This package has no runtime dependencies.

## Peer Dependencies

This package has no runtime peer dependencies (it does not expect any other packages to be installed alongside itself).

## License

[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fjameswilddev%2Fshanzhai.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Fjameswilddev%2Fshanzhai?ref=badge_large)

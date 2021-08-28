# `@shanzhai/ephemeral-keyed-store` [![Continuous Integration](https://github.com/jameswilddev/shanzhai/workflows/Continuous%20Integration/badge.svg)](https://github.com/jameswilddev/shanzhai/actions) [![License](https://img.shields.io/github/license/jameswilddev/shanzhai.svg)](https://github.com/jameswilddev/shanzhai/blob/master/license) [![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fjameswilddev%2Fshanzhai.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fjameswilddev%2Fshanzhai?ref=badge_shield) [![Renovate enabled](https://img.shields.io/badge/renovate-enabled-brightgreen.svg)](https://renovatebot.com/) [![npm](https://img.shields.io/npm/v/@shanzhai/ephemeral-keyed-store.svg)](https://www.npmjs.com/package/@shanzhai/ephemeral-keyed-store) [![npm type definitions](https://img.shields.io/npm/types/@shanzhai/ephemeral-keyed-store.svg)](https://www.npmjs.com/package/@shanzhai/ephemeral-keyed-store)

A keyed Shanzhai store which holds data in memory until the application closes.

## Usage

This is an implementation of `KeyedStore`, and can be used anywhere requiring
one.

```typescript
const store = new EphemeralKeyedStore<number>(`Test Name`);

store.set(`Test Key A`, 5);
store.set(`Test Key B`, 6);
store.set(`Test Key C`, 7);

store.delete(`Test Key B`);

store.get(`Test Key A`); // 5.
store.getAll(); // { "Test Key A": 5, "Test Key C": 7 }
store.getKeys(); // [`Test Key A`, `Test Key B`]
```

All information is stored in-memory, and will be lost when the application is
closed.

## Dependencies

This package has no runtime dependencies.

## Peer Dependencies

This package has no runtime peer dependencies (it does not expect any other packages to be installed alongside itself).

## License

[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fjameswilddev%2Fshanzhai.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Fjameswilddev%2Fshanzhai?ref=badge_large)

# `@shanzhai/merge-object-input` [![Continuous Integration](https://github.com/jameswilddev/shanzhai/workflows/Continuous%20Integration/badge.svg)](https://github.com/jameswilddev/shanzhai/actions) [![License](https://img.shields.io/github/license/jameswilddev/shanzhai.svg)](https://github.com/jameswilddev/shanzhai/blob/master/license) [![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fjameswilddev%2Fshanzhai.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fjameswilddev%2Fshanzhai?ref=badge_shield) [![Renovate enabled](https://img.shields.io/badge/renovate-enabled-brightgreen.svg)](https://renovatebot.com/) [![npm](https://img.shields.io/npm/v/@shanzhai/merge-object-input.svg)](https://www.npmjs.com/package/@shanzhai/merge-object-input) [![npm type definitions](https://img.shields.io/npm/types/@shanzhai/merge-object-input.svg)](https://www.npmjs.com/package/@shanzhai/merge-object-input)

A Shanzhai input which builds an object by merging the objects retrieved by other inputs.

## Example

The following two examples are equivalent:

```typescript
new MergeObjectInput([
  new ConstantInput({
    a: 3,
    b: 10,
  }),
  new ConstantInput({
    c: 7,
  }),
]);

new ConstantInput({
  a: 3,
  b: 10,
  c: 7,
});
```

## Dependencies

This package has no runtime dependencies.

## Peer Dependencies

This package has no runtime peer dependencies (it does not expect any other packages to be installed alongside itself).

## License

[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fjameswilddev%2Fshanzhai.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Fjameswilddev%2Fshanzhai?ref=badge_large)

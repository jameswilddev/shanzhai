# `@shanzhai/concatenate-object-values-input` [![Continuous Integration](https://github.com/jameswilddev/shanzhai/workflows/Continuous%20Integration/badge.svg)](https://github.com/jameswilddev/shanzhai/actions) [![License](https://img.shields.io/github/license/jameswilddev/shanzhai.svg)](https://github.com/jameswilddev/shanzhai/blob/master/license) [![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fjameswilddev%2Fshanzhai.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fjameswilddev%2Fshanzhai?ref=badge_shield) [![Renovate enabled](https://img.shields.io/badge/renovate-enabled-brightgreen.svg)](https://renovatebot.com/) [![npm](https://img.shields.io/npm/v/@shanzhai/concatenate-object-values-input.svg)](https://www.npmjs.com/package/@shanzhai/concatenate-object-values-input) [![npm type definitions](https://img.shields.io/npm/types/@shanzhai/concatenate-object-values-input.svg)](https://www.npmjs.com/package/@shanzhai/concatenate-object-values-input)

A Shanzhai input which concatenates the (string) values of an object returned by another input.

## Example

The following two examples are equivalent:

```typescript
new ConcatenateObjectValuesInput(
  new ConstantInput({
    keyA: `ValueA`,
    keyB: `ValueB`,
    keyC: `ValueC`,
  })
);

new ConstantInput(`ValueAValueBValueC`);
```

## Dependencies

This package has no runtime dependencies.

## Peer Dependencies

This package has no runtime peer dependencies (it does not expect any other packages to be installed alongside itself).

## License

[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fjameswilddev%2Fshanzhai.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Fjameswilddev%2Fshanzhai?ref=badge_large)

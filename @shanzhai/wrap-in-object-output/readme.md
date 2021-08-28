# `@shanzhai/wrap-in-object-output` [![Continuous Integration](https://github.com/jameswilddev/shanzhai/workflows/Continuous%20Integration/badge.svg)](https://github.com/jameswilddev/shanzhai/actions) [![License](https://img.shields.io/github/license/jameswilddev/shanzhai.svg)](https://github.com/jameswilddev/shanzhai/blob/master/license) [![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fjameswilddev%2Fshanzhai.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fjameswilddev%2Fshanzhai?ref=badge_shield) [![Renovate enabled](https://img.shields.io/badge/renovate-enabled-brightgreen.svg)](https://renovatebot.com/) [![npm](https://img.shields.io/npm/v/@shanzhai/wrap-in-object-output.svg)](https://www.npmjs.com/package/@shanzhai/wrap-in-object-output) [![npm type definitions](https://img.shields.io/npm/types/@shanzhai/wrap-in-object-output.svg)](https://www.npmjs.com/package/@shanzhai/wrap-in-object-output)

A Shanzhai output which wraps a value in an object with a given key.

## Usage

Give an instance of `WrapInObjectOutput` to a `Step` as an output and it will
wrap the value in an object before passing it to its nested `Output`.

For example, the following examples are equivalent:

```typescript
new CopyStep(
  `Example`,
  new ConstantInput([1, 2, 3]),
  new WrapInObjectOutput(`testKey`, new ExampleOutput())
);
```

```typescript
new CopyStep(
  `Example`,
  new ConstantInput({ testKey: [1, 2, 3] }),
  new ExampleOutput()
);
```

## Dependencies

This package has no runtime dependencies.

## Peer Dependencies

This package has no runtime peer dependencies (it does not expect any other packages to be installed alongside itself).

## License

[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fjameswilddev%2Fshanzhai.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Fjameswilddev%2Fshanzhai?ref=badge_large)

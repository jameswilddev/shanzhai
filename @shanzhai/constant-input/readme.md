# `@shanzhai/constant-input` [![Continuous Integration](https://github.com/jameswilddev/shanzhai/workflows/Continuous%20Integration/badge.svg)](https://github.com/jameswilddev/shanzhai/actions) [![License](https://img.shields.io/github/license/jameswilddev/shanzhai.svg)](https://github.com/jameswilddev/shanzhai/blob/master/license) [![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fjameswilddev%2Fshanzhai.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fjameswilddev%2Fshanzhai?ref=badge_shield) [![Renovate enabled](https://img.shields.io/badge/renovate-enabled-brightgreen.svg)](https://renovatebot.com/) [![npm](https://img.shields.io/npm/v/@shanzhai/constant-input.svg)](https://www.npmjs.com/package/@shanzhai/constant-input) [![npm type definitions](https://img.shields.io/npm/types/@shanzhai/constant-input.svg)](https://www.npmjs.com/package/@shanzhai/constant-input)

A Shanzhai input which provides a constant input to a build step.

## Usage

Construct an instance of `ConstantInput`, giving the value to use as a constant
to its constructor.

You will then be able to use that instance as an input to any `Step` accepting
an `Input` of that value's type.

```typescript
new ExampleStep(
  new ConstantInput(`An Example Value`)
);
```

## Dependencies

This package has no runtime dependencies.

## Peer Dependencies

This package has no runtime peer dependencies (it does not expect any other packages to be installed alongside itself).

## License

[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fjameswilddev%2Fshanzhai.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Fjameswilddev%2Fshanzhai?ref=badge_large)

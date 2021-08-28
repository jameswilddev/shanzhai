# `@shanzhai/copy-step` [![Continuous Integration](https://github.com/jameswilddev/shanzhai/workflows/Continuous%20Integration/badge.svg)](https://github.com/jameswilddev/shanzhai/actions) [![License](https://img.shields.io/github/license/jameswilddev/shanzhai.svg)](https://github.com/jameswilddev/shanzhai/blob/master/license) [![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fjameswilddev%2Fshanzhai.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fjameswilddev%2Fshanzhai?ref=badge_shield) [![Renovate enabled](https://img.shields.io/badge/renovate-enabled-brightgreen.svg)](https://renovatebot.com/) [![npm](https://img.shields.io/npm/v/@shanzhai/copy-step.svg)](https://www.npmjs.com/package/@shanzhai/copy-step) [![npm type definitions](https://img.shields.io/npm/types/@shanzhai/copy-step.svg)](https://www.npmjs.com/package/@shanzhai/copy-step)

A Shanzhai step which copies an input to an output.

## Usage

Within a trigger's event handler, return an instance of `CopyStep` similar to
the following:

```typescript
new CopyStep(
  `A description of the operation being performed`,
  new InputRetrievingTheInformationToCopy(),
  new OutputStoringTheInformationBeingCopied()
)
```

## Dependencies

This package has no runtime dependencies.

## Peer Dependencies

This package has no runtime peer dependencies (it does not expect any other packages to be installed alongside itself).

## License

[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fjameswilddev%2Fshanzhai.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Fjameswilddev%2Fshanzhai?ref=badge_large)

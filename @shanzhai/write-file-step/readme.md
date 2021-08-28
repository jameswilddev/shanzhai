# `@shanzhai/write-file-step` [![Continuous Integration](https://github.com/jameswilddev/shanzhai/workflows/Continuous%20Integration/badge.svg)](https://github.com/jameswilddev/shanzhai/actions) [![License](https://img.shields.io/github/license/jameswilddev/shanzhai.svg)](https://github.com/jameswilddev/shanzhai/blob/master/license) [![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fjameswilddev%2Fshanzhai.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fjameswilddev%2Fshanzhai?ref=badge_shield) [![Renovate enabled](https://img.shields.io/badge/renovate-enabled-brightgreen.svg)](https://renovatebot.com/) [![npm](https://img.shields.io/npm/v/@shanzhai/write-file-step.svg)](https://www.npmjs.com/package/@shanzhai/write-file-step) [![npm type definitions](https://img.shields.io/npm/types/@shanzhai/write-file-step.svg)](https://www.npmjs.com/package/@shanzhai/write-file-step)

A Shanzhai step which writes to a binary or UTF-8 encoded text file, creating it if it does not exist, or replacing it if it does.

## Usage

If within a trigger's event handler an instance of `WriteFileStep` similar to
the following were to be returned:

```typescript
new WriteFileStep(
  `A description of the operation being performed`,
  [`A`, `Path`, `To`, `A`, `File`, `To`, `Write`],
  new ConstantInput(`Example File Content`)
);
```

The file would be created with the given content (which could be a string, for a
text file, or a `Buffer`, for a binary file).

If the file already existed, it would be overwritten.

If the file's parent directory did not exist, an error would be raised.

## Dependencies

This package has no runtime dependencies.

## Peer Dependencies

This package has no runtime peer dependencies (it does not expect any other packages to be installed alongside itself).

## License

[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fjameswilddev%2Fshanzhai.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Fjameswilddev%2Fshanzhai?ref=badge_large)

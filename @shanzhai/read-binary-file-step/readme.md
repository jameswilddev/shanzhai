# `@shanzhai/read-binary-file-step` [![Continuous Integration](https://github.com/jameswilddev/shanzhai/workflows/Continuous%20Integration/badge.svg)](https://github.com/jameswilddev/shanzhai/actions) [![License](https://img.shields.io/github/license/jameswilddev/shanzhai.svg)](https://github.com/jameswilddev/shanzhai/blob/master/license) [![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fjameswilddev%2Fshanzhai.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fjameswilddev%2Fshanzhai?ref=badge_shield) [![Renovate enabled](https://img.shields.io/badge/renovate-enabled-brightgreen.svg)](https://renovatebot.com/) [![npm](https://img.shields.io/npm/v/@shanzhai/read-binary-file-step.svg)](https://www.npmjs.com/package/@shanzhai/read-binary-file-step) [![npm type definitions](https://img.shields.io/npm/types/@shanzhai/read-binary-file-step.svg)](https://www.npmjs.com/package/@shanzhai/read-binary-file-step)

A Shanzhai step which reads the content of a binary file.

## Usage

If within a trigger's event handler an instance of `ReadBinaryFileStep` similar
to the following were to be returned:

```typescript
new ReadBinaryFile(
  `A description of the operation being performed`,
  [`A`, `Path`, `To`, `A`, `File`]
  new OutputForReadBinaryFile()
);
```

A Buffer containing the file's content would be written to the output.

## Dependencies

This package has no runtime dependencies.

## Peer Dependencies

This package has no runtime peer dependencies (it does not expect any other packages to be installed alongside itself).

## License

[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fjameswilddev%2Fshanzhai.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Fjameswilddev%2Fshanzhai?ref=badge_large)

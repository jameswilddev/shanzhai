# `@shanzhai/read-text-file-step` [![Continuous Integration](https://github.com/jameswilddev/shanzhai/workflows/Continuous%20Integration/badge.svg)](https://github.com/jameswilddev/shanzhai/actions) [![License](https://img.shields.io/github/license/jameswilddev/shanzhai.svg)](https://github.com/jameswilddev/shanzhai/blob/master/license) [![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fjameswilddev%2Fshanzhai.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fjameswilddev%2Fshanzhai?ref=badge_shield) [![Renovate enabled](https://img.shields.io/badge/renovate-enabled-brightgreen.svg)](https://renovatebot.com/) [![npm](https://img.shields.io/npm/v/@shanzhai/read-text-file-step.svg)](https://www.npmjs.com/package/@shanzhai/read-text-file-step) [![npm type definitions](https://img.shields.io/npm/types/@shanzhai/read-text-file-step.svg)](https://www.npmjs.com/package/@shanzhai/read-text-file-step)

A Shanzhai step which reads the content of a UTF-8 encoded text file.

## Usage

If within a trigger's event handler an instance of `ReadTextFileStep` similar
to the following were to be returned:

```typescript
new ReadTextFile(
  `A description of the operation being performed`,
  [`A`, `Path`, `To`, `A`, `File`]
  new OutputForReadTextFile()
);
```

A string containing the file's content would be written to the output.

## Dependencies

This package has no runtime dependencies.

## Peer Dependencies

This package has no runtime peer dependencies (it does not expect any other packages to be installed alongside itself).

## License

[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fjameswilddev%2Fshanzhai.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Fjameswilddev%2Fshanzhai?ref=badge_large)

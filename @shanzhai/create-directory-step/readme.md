# `@shanzhai/create-directory-step` [![Continuous Integration](https://github.com/jameswilddev/shanzhai/workflows/Continuous%20Integration/badge.svg)](https://github.com/jameswilddev/shanzhai/actions) [![License](https://img.shields.io/github/license/jameswilddev/shanzhai.svg)](https://github.com/jameswilddev/shanzhai/blob/master/license) [![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fjameswilddev%2Fshanzhai.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fjameswilddev%2Fshanzhai?ref=badge_shield) [![Renovate enabled](https://img.shields.io/badge/renovate-enabled-brightgreen.svg)](https://renovatebot.com/) [![npm](https://img.shields.io/npm/v/@shanzhai/create-directory-step.svg)](https://www.npmjs.com/package/@shanzhai/create-directory-step) [![npm type definitions](https://img.shields.io/npm/types/@shanzhai/create-directory-step.svg)](https://www.npmjs.com/package/@shanzhai/create-directory-step)

A Shanzhai step which ensures that a directory exists (as well as all of its parent directories).

## Usage

Within a trigger's event handler, return an instance of `CreateDirectoryStep`
similar to the following:

```typescript
new CreateDirectoryStep(
  `A description of the operation being performed`,
  [`a`, `path`, `to`, `a`, `directory`, `to`, `create`]
)
```

Any part of the path `a/path/to/a/directory/to/create` which does not already
exist will be created as a directory.

If any part already exists as a file, an error will occur.

If the entire path already exists as a directory, nothing will happen.

## Dependencies

This package has no runtime dependencies.

## Peer Dependencies

This package has no runtime peer dependencies (it does not expect any other packages to be installed alongside itself).

## License

[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fjameswilddev%2Fshanzhai.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Fjameswilddev%2Fshanzhai?ref=badge_large)

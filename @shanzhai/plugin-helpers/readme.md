# `@shanzhai/plugin-helpers` [![Continuous Integration](https://github.com/jameswilddev/shanzhai/workflows/Continuous%20Integration/badge.svg)](https://github.com/jameswilddev/shanzhai/actions) [![License](https://img.shields.io/github/license/jameswilddev/shanzhai.svg)](https://github.com/jameswilddev/shanzhai/blob/master/license) [![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fjameswilddev%2Fshanzhai.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fjameswilddev%2Fshanzhai?ref=badge_shield) [![Renovate enabled](https://img.shields.io/badge/renovate-enabled-brightgreen.svg)](https://renovatebot.com/) [![npm](https://img.shields.io/npm/v/@shanzhai/plugin-helpers.svg)](https://www.npmjs.com/package/@shanzhai/plugin-helpers) [![npm type definitions](https://img.shields.io/npm/types/@shanzhai/plugin-helpers.svg)](https://www.npmjs.com/package/@shanzhai/plugin-helpers)

Helpers for searching for plugins during a Shanzhai build.

## Usage

This package exports a `searchForPlugins` function which scans the
`package.json` file in the current working directory to list all Shanzhai
plugins within the current package and its direct dependencies.

```typescript
import { searchForPlugins } from "@shanzhai/plugin-helpers";

const anObjectOfPlugins = await searchForPlugins();
```

## Dependencies

This package has no runtime dependencies.

## Peer Dependencies

This package has no runtime peer dependencies (it does not expect any other packages to be installed alongside itself).

## License

[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fjameswilddev%2Fshanzhai.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Fjameswilddev%2Fshanzhai?ref=badge_large)

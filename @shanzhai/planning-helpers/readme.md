# `@shanzhai/planning-helpers` [![Continuous Integration](https://github.com/jameswilddev/shanzhai/workflows/Continuous%20Integration/badge.svg)](https://github.com/jameswilddev/shanzhai/actions) [![License](https://img.shields.io/github/license/jameswilddev/shanzhai.svg)](https://github.com/jameswilddev/shanzhai/blob/master/license) [![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fjameswilddev%2Fshanzhai.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fjameswilddev%2Fshanzhai?ref=badge_shield) [![Renovate enabled](https://img.shields.io/badge/renovate-enabled-brightgreen.svg)](https://renovatebot.com/) [![npm](https://img.shields.io/npm/v/@shanzhai/planning-helpers.svg)](https://www.npmjs.com/package/@shanzhai/planning-helpers) [![npm type definitions](https://img.shields.io/npm/types/@shanzhai/planning-helpers.svg)](https://www.npmjs.com/package/@shanzhai/planning-helpers)

Helpers which generate a tree of steps to execute to perform a Shanzhai build.

## Usage

This package exports a `plan` function which is to be used to determine exactly
which operations need to be performed during a build.

```typescript
import { plan } from "@shanzhai/planning-helpers";

const theStepToExecute = plan(
  anObjectOfPlugins,
  true, // This is the first run.
  aDiffOfFileNames,
);
```

## Dependencies

This package has the following runtime dependencies:

Name      | Version                                                                                        
--------- | -----------------------------------------------------------------------------------------------
minimatch | [![5.0.1](https://img.shields.io/npm/v/minimatch.svg)](https://www.npmjs.com/package/minimatch)

## Peer Dependencies

This package has no runtime peer dependencies (it does not expect any other packages to be installed alongside itself).

## License

[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fjameswilddev%2Fshanzhai.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Fjameswilddev%2Fshanzhai?ref=badge_large)

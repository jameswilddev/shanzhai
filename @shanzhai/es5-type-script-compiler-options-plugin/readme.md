# `@shanzhai/es5-type-script-compiler-options-plugin` [![Continuous Integration](https://github.com/jameswilddev/shanzhai/workflows/Continuous%20Integration/badge.svg)](https://github.com/jameswilddev/shanzhai/actions) [![License](https://img.shields.io/github/license/jameswilddev/shanzhai.svg)](https://github.com/jameswilddev/shanzhai/blob/master/license) [![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fjameswilddev%2Fshanzhai.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fjameswilddev%2Fshanzhai?ref=badge_shield) [![Renovate enabled](https://img.shields.io/badge/renovate-enabled-brightgreen.svg)](https://renovatebot.com/) [![npm](https://img.shields.io/npm/v/@shanzhai/es5-type-script-compiler-options-plugin.svg)](https://www.npmjs.com/package/@shanzhai/es5-type-script-compiler-options-plugin) [![npm type definitions](https://img.shields.io/npm/types/@shanzhai/es5-type-script-compiler-options-plugin.svg)](https://www.npmjs.com/package/@shanzhai/es5-type-script-compiler-options-plugin)

A Shanzhai plugin which loads a set of TypeScript compiler options for ES5.

## Usage

When installed, this plugin will load a configuration into the
[TypeScript compiler options store](@shanzhai/type-script-compiler-options-store).

The full configuration can be found within the source code,
[here](https://github.com/jameswilddev/shanzhai/blob/master/%40shanzhai/es5-type-script-compiler-options-plugin/index.ts),
but the general summary is that:

- All strictness options are enabled.
- The target platform is any ES5-compatible web browser.

## Dependencies

This package has the following runtime dependencies:

Name       | Version                                                                                          
---------- | -------------------------------------------------------------------------------------------------
typescript | [![4.4.2](https://img.shields.io/npm/v/typescript.svg)](https://www.npmjs.com/package/typescript)

## Peer Dependencies

This package has no runtime peer dependencies (it does not expect any other packages to be installed alongside itself).

## License

[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fjameswilddev%2Fshanzhai.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Fjameswilddev%2Fshanzhai?ref=badge_large)

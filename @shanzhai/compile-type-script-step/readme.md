# `@shanzhai/compile-type-script-step` [![Continuous Integration](https://github.com/jameswilddev/shanzhai/workflows/Continuous%20Integration/badge.svg)](https://github.com/jameswilddev/shanzhai/actions) [![License](https://img.shields.io/github/license/jameswilddev/shanzhai.svg)](https://github.com/jameswilddev/shanzhai/blob/master/license) [![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fjameswilddev%2Fshanzhai.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fjameswilddev%2Fshanzhai?ref=badge_shield) [![Renovate enabled](https://img.shields.io/badge/renovate-enabled-brightgreen.svg)](https://renovatebot.com/) [![npm](https://img.shields.io/npm/v/@shanzhai/compile-type-script-step.svg)](https://www.npmjs.com/package/@shanzhai/compile-type-script-step) [![npm type definitions](https://img.shields.io/npm/types/@shanzhai/compile-type-script-step.svg)](https://www.npmjs.com/package/@shanzhai/compile-type-script-step)

A Shanzhai step which compiles parsed TypeScript to Javascript.

## Usage

This step is unlikely to have any use other than combining the output of
[ParseTypeScriptStep](https://www.npmjs.com/package/@shanzhai/parse-type-script-step).

Within a trigger's event handler, return an instance of `CompileTypeScriptStep`
similar to the following:

```typescript
new CompileTypeScriptStep(
  new ConstantInput({
    keyA: aParsedTypeScriptFile,
    keyB: anotherParsedTypeScriptFile,
  }),
  new ConstantInput(aSetOfTypeScriptCompilerOptions),
  new OutputForCompiledJavascript(),
);
```

This will compile all of the input parsed TypeScript files into a single
Javascript file and output it.

## Dependencies

This package has the following runtime dependencies:

Name       | Version                                                                                          
---------- | -------------------------------------------------------------------------------------------------
typescript | [![4.4.2](https://img.shields.io/npm/v/typescript.svg)](https://www.npmjs.com/package/typescript)

## Peer Dependencies

This package has no runtime peer dependencies (it does not expect any other packages to be installed alongside itself).

## License

[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fjameswilddev%2Fshanzhai.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Fjameswilddev%2Fshanzhai?ref=badge_large)

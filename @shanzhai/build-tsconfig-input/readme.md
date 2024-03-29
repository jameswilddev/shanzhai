# `@shanzhai/build-tsconfig-input` [![Continuous Integration](https://github.com/jameswilddev/shanzhai/workflows/Continuous%20Integration/badge.svg)](https://github.com/jameswilddev/shanzhai/actions) [![License](https://img.shields.io/github/license/jameswilddev/shanzhai.svg)](https://github.com/jameswilddev/shanzhai/blob/master/license) [![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fjameswilddev%2Fshanzhai.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fjameswilddev%2Fshanzhai?ref=badge_shield) [![Renovate enabled](https://img.shields.io/badge/renovate-enabled-brightgreen.svg)](https://renovatebot.com/) [![npm](https://img.shields.io/npm/v/@shanzhai/build-tsconfig-input.svg)](https://www.npmjs.com/package/@shanzhai/build-tsconfig-input) [![npm type definitions](https://img.shields.io/npm/types/@shanzhai/build-tsconfig-input.svg)](https://www.npmjs.com/package/@shanzhai/build-tsconfig-input)

A Shanzhai input which converts TypeScript compiler options to JSON as would be found in a tsconfig.json file.

## Usage

The following two examples are equivalent:

```typescript
new BuildObjectInput({
  new ConstantInput({
    jsx: JsxEmit.ReactNative,
    module: ModuleKind.CommonJS,
    newLine: NewLineKind.CarriageReturnLineFeed,
    target: ScriptTarget.ES2019,
    moduleResolution: ModuleResolutionKind.NodeJs,
    lib: [`ESNext.Intl`, `ES2017.SharedMemory`, `ES7`],
    importsNotUsedAsValues: ImportsNotUsedAsValues.Preserve,
    jsxFactory: `Test JSX Factory`,
  }),
  new ConstantInput(true),
  new ConstantInput(true),
  new ConstantInput(`Test Extends`),
  new ConstantInput(`Test Compiler`),
  new ConstantInput([`Test File A`, `Test File B`]),
  new ConstantInput([`Test Exclude A`, `Test Exclude B`]),
  new ConstantInput([`Test Include A`, `Test Include B`]),
  new ConstantInput({ path: `Test Path` })
});

new ConstantInput({
  compilerOptions: {
    jsx: `react-native`,
    module: `CommonJS`,
    newLine: `crlf`,
    target: `ES2019`,
    moduleResolution: `Node`,
    lib: [`ESNext.Intl`, `ES2017.SharedMemory`, `ES7`],
    importsNotUsedAsValues: `preserve`,
    jsxFactory: `Test JSX Factory`,
  },
  compileOnSave: true,
  typeAcquisition: { enable: true },
  extends: `Test Extends`,
  "ts-node": { compiler: `Test Compiler` },
  files: [`Test File A`, `Test File B`],
  exclude: [`Test Exclude A`, `Test Exclude B`],
  include: [`Test Include A`, `Test Include B`],
  references: { path: `Test Path` },
});
```

## Dependencies

This package has no runtime dependencies.

## Peer Dependencies

This package has no runtime peer dependencies (it does not expect any other packages to be installed alongside itself).

## License

[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fjameswilddev%2Fshanzhai.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Fjameswilddev%2Fshanzhai?ref=badge_large)

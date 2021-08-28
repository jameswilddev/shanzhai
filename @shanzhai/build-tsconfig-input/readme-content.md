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

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

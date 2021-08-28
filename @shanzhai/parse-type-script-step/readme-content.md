## Usage

If within a trigger's event handler an instance of `ParseTypeScriptStep` similar
to the following were to be returned:

```typescript
new ParseTypeScriptStep(
  `A description of the operation being performed`,
  new InputForUnparsedTypeScript(),
  new InputForTypeScriptCompilerOptions(),
  new OutputForParsedTypeScript()
);
```

A parsed TypeScript source file would be written to the output.

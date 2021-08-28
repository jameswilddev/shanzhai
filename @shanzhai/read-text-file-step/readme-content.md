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

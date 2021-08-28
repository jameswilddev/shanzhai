## Usage

If within a trigger's event handler an instance of `ReadBinaryFileStep` similar
to the following were to be returned:

```typescript
new ReadBinaryFile(
  `A description of the operation being performed`,
  [`A`, `Path`, `To`, `A`, `File`]
  new OutputForReadBinaryFile()
);
```

A Buffer containing the file's content would be written to the output.

## Usage

If within a trigger's event handler an instance of `ZipStep` similar to the
following were to be returned:

```typescript
new WriteFileStep(
  `A description of the operation being performed`,
  new ObjectOfDataToCompressInput(),
  new BufferContainingTheCreatedZipOutput()
);
```

If the file already exists, it will be overwritten.

If the file's parent directory does not exist, an error will occur.

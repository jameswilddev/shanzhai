## Usage

If within a trigger's event handler an instance of `WriteFileStep` similar to
the following were to be returned:

```typescript
new WriteFileStep(
  `A description of the operation being performed`,
  [`A`, `Path`, `To`, `A`, `File`, `To`, `Write`],
  new ConstantInput(`Example File Content`)
);
```

The file would be created with the given content (which could be a string, for a
text file, or a `Buffer`, for a binary file).

If the file already existed, it would be overwritten.

If the file's parent directory did not exist, an error would be raised.

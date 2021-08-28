## Usage

If within a trigger's event handler an instance of `ParsePugStep` similar to the
following were to be returned:

```typescript
new ParsePugStep(
  `A description of the operation being performed`,
  new InputForUnparsedPug(),
  new OutputForParsedPug()
);
```

A Pug render function would be written to the output.

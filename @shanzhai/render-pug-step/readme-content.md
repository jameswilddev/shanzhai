## Usage

If within a trigger's event handler an instance of `RenderPugStep` similar to
the following were to be returned:

```typescript
new RenderPugStep(
  `A description of the operation being performed`,
  new InputForPreviouslyParsedPugTemplate(),
  new InputForPugLocalsObject(),
  new OutputForReadTextFile()
);
```

A string containing the rendered HTML would be written to the output.

## Usage

If within a trigger's event handler an instance of `StringifyJsonStep` similar
to the following were to be returned:

```typescript
new StringifyJsonStep(
  `A description of the operation being performed`,
  new InputForAJsonValue(),
  new OutputForStringOfJson(),
);
```

A string containing the rendered generated string of JSON would be written to
the output.

Note that this does not directly use `JSON.stringify`; it has the following
differences:

- Object key order is always sorted, ascending.
- Object properties with undefined values are omitted from the string of JSON.

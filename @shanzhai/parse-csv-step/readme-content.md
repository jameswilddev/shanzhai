## Usage

If within a trigger's event handler an instance of `ParseCsvStep` similar to the
following were to be returned:

```typescript
new ParseCsvStep(
  `A description of the operation being performed`,
  new ConstantInput(`Example AA, Example AB, Example AC
Example BA, Example BB, Example BC
Example CA, Example CB, Example CC`
  ),
  new OutputForParsedCsv()
);
```

An array similar to the following would be written to the output:

```typescript
[
  [`Example AA`, `Example AB`, `Example AC`],
  [`Example BA`, `Example BB`, `Example BC`],
  [`Example CA`, `Example CB`, `Example CC`],
];
```

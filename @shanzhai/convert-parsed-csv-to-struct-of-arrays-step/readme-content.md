## Usage

Use `ConvertParsedCsvToStructOfArraysStep` to convert a parsed CSV to an object
suitable for inclusion in the
[TypeScript global store](https://www.npmjs.com/package/@shanzhai/type-script-global-store).
For example, returning the following from a trigger's event handler:

```typescript
new ConvertParsedCsvToStructOfArraysStep(
  `A description of the operation being performed`,
  `aPrefixForAnyGlobals`,
  new ConstantInput([
    [`TestHeaderA`, `TestHeaderB`, `TestHeaderC`],
    [`Test Value A A`, `125`, `null`],
    [`Test Value A B`, `552`, `false`],
    [`Test Value A C`, `924`, `true`],
  ]),
  new OutputWhichReceivesConvertedCSV()
);
```

Would write the following to the output:

```typescript
{
  aPrefixForAnyGlobalsTestHeaderA: [
    `Test Value A A`,
    `Test Value A B`,
    `Test Value A C`,
  ],
  aPrefixForAnyGlobalsTestHeaderB: [
    125,
    552,
    924,
  ],
  aPrefixForAnyGlobalsTestHeaderC: [
    null,
    false,
    true,
  ],
};
```

If the content of a cell is JSON-serializable, that value will be used.  If this
is not desirable, quote the value (effectively turning it into a JSON string).

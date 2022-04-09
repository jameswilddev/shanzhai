## Usage

If within a trigger's event handler an instance of `ParseJsonStep` similar to the
following were to be returned:

```typescript
new ParseJsonStep(
  `A description of the operation being performed`,
  new ConstantInput(`{"testKey":"testValue"}`),
  new OutputForParsedJson()
);
```

A value similar to the following would be written to the output:

```typescript
{ testKey: `testValue` };
```

## Usage

Provide an instance of `UnkeyedStoreSetOutput` as an output to a `Step` and when
that `Step` outputs a value, it will pass it onto its given `UnkeyedStore`.

For example:

```typescript
new ExampleStep(
  new UnkeyedStoreSetOutput(anExampleUnkeyedStore)
);
```

## Usage

Provide an instance of `KeyedStoreSetOutput` as an output to a `Step` to set a
specific key/value in a `KeyedStore`.

```typescript
new ExampleStep(
  new KeyedStoreSetOutput(
    aKeyedStoreInWhichToSetAKeyValue,
    `An Example Key To Set`
  )
);
```

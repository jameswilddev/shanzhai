## Usage

Provide an instance of `KeyedStoreGetAllInput` as an input to a `Step` to
provide an object containing all of a `KeyedStore`'s keys and values to it.

```typescript
new ExampleStep(
  new KeyedStoreGetAllInput(aKeyedStoreFromWhichToRetrieveAllKeysAndValues)
);
```

## Usage

Provide an instance of `KeyedStoreGetKeysInput` as an input to a `Step` to
provide an array containing all of a `KeyedStore`'s keys to it.

```typescript
new ExampleStep(
  new KeyedStoreGetKeysInput(aKeyedStoreFromWhichToRetrieveAllKeys)
);
```

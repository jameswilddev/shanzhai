## Usage

Provide an instance of `KeyedStoreGetInput` as an input to a `Step` to
provide a particular key's value to it.

```typescript
new ExampleStep(
  new KeyedStoreGetInput(
    aKeyedStoreFromWhichToRetrieveASpecificKeysValue,
    `Example Key To Retrieve`
  )
);
```

## Usage

Within a trigger's event handler, return an instance of
`DeleteFromKeyedStoreStep` similar to the following:

```typescript
new DeleteFromKeyedStoreStep(
  aKeyedStore,
  `A Key Within That Store`
)
```

The key/value specified will be deleted from the store.

If it does not exist in the store, nothing happens.

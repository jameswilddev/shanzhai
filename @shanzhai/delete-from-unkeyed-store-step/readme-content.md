## Usage

Within a trigger's event handler, return an instance of
`DeleteFromUnkeyedStoreStep` similar to the following:

```typescript
new DeleteFromUnkeyedStoreStep(anUnkeyedStore)
```

The value will be deleted from the store.

If the store does not have a value, nothing happens.

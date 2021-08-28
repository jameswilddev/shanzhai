## Usage

Provide an instance of `UnkeyedStoreGetInput` as an input to a `Step` and when
that `Step` requests a value, it will retrieve the current value of its given
`UnkeyedStore`.

For example:

```typescript
new ExampleStep(
  new UnkeyedStoreGetInput(anExampleUnkeyedStore)
);
```

As this calls `UnkeyedStore.get` under the hood, behavior is similarly undefined
should the store not have a value at the time.

## Usage

This is an implementation of `UnkeyedStore`, and can be used anywhere requiring
one.

```typescript
const store = new EphemeralKeyedStore<number>(`Test Name`);
store.set(1);
store.delete();
store.set(2);
store.get(); // 2.
```

All information is stored in-memory, and will be lost when the application is
closed.

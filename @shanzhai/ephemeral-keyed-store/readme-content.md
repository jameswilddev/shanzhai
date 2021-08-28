## Usage

This is an implementation of `KeyedStore`, and can be used anywhere requiring
one.

```typescript
const store = new EphemeralKeyedStore<number>(`Test Name`);

store.set(`Test Key A`, 5);
store.set(`Test Key B`, 6);
store.set(`Test Key C`, 7);

store.delete(`Test Key B`);

store.get(`Test Key A`); // 5.
store.getAll(); // { "Test Key A": 5, "Test Key C": 7 }
store.getKeys(); // [`Test Key A`, `Test Key B`]
```

All information is stored in-memory, and will be lost when the application is
closed.

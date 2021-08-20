## Example

The following two examples are equivalent:

```typescript
new MergeObjectInput([
  new ConstantInput({
    a: 3,
    b: 10,
  }),
  new ConstantInput({
    c: 7,
  }),
]);

new ConstantInput({
  a: 3,
  b: 10,
  c: 7,
});
```

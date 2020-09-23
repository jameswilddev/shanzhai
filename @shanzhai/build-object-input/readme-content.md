## Example

The following two examples are equivalent:

```typescript
new BuildObjectInput({
  a: new ConstantInput(3),
  b: new ConstantInput(10),
  c: new ConstantInput(7),
})

new ConstantInput({
  a: 3,
  b: 10,
  c: 7,
});
```

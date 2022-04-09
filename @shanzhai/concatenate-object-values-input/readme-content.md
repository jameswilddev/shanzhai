## Example

The following two examples are equivalent:

```typescript
new ConcatenateObjectValuesInput(
  new ConstantInput({
    keyA: `ValueA`,
    keyB: `ValueB`,
    keyC: `ValueC`,
  })
);

new ConstantInput(`ValueAValueBValueC`);
```

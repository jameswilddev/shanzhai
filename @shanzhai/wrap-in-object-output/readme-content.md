## Usage

Give an instance of `WrapInObjectOutput` to a `Step` as an output and it will
wrap the value in an object before passing it to its nested `Output`.

For example, the following examples are equivalent:

```typescript
new CopyStep(
  `Example`,
  new ConstantInput([1, 2, 3]),
  new WrapInObjectOutput(`testKey`, new ExampleOutput())
);
```

```typescript
new CopyStep(
  `Example`,
  new ConstantInput({ testKey: [1, 2, 3] }),
  new ExampleOutput()
);
```

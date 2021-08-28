## Usage

Give an instance of `StringifyJsonOutput` to a `Step` as an output and it will
convert the value it is given into a string of JSON before passing it to its
nested `Output`.

For example, the following examples are equivalent:

```typescript
new CopyStep(
  `Example`,
  new ConstantInput([1, 2, 3]),
  new StringifyJsonOutput(new ExampleOutput())
);
```

```typescript
new CopyStep(
  `Example`,
  new ConstantInput(`[1,2,3]`),
  new ExampleOutput()
);
```

Note that this does not directly use `JSON.stringify`; it has the following
differences:

- Object key order is always sorted, ascending.
- Object properties with undefined values are omitted from the string of JSON.

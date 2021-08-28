## Usage

Construct an instance of `ConstantInput`, giving the value to use as a constant
to its constructor.

You will then be able to use that instance as an input to any `Step` accepting
an `Input` of that value's type.

```typescript
new ExampleStep(
  new ConstantInput(`An Example Value`)
);
```

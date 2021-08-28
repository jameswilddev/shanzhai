## Usage

Within a trigger's event handler, return an instance of `SerialStep` similar to
the following:

```typescript
new SerialStep(
  `A description of the operation being performed`,
  [
    new FirstStepToExecute(),
    new SecondStepToExecute(),
    new ThirdStepToExecute(),
  ]
)
```

This will execute each of the steps sequentially; one after the other.

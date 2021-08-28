## Usage

Within a trigger's event handler, return an instance of `ParallelStep` similar
to the following:

```typescript
new ParallelStep(
  `A description of the operation being performed`,
  [
    new FirstStepToExecute(),
    new SecondStepToExecute(),
    new ThirdStepToExecute(),
  ]
)
```

This will execute each of the steps simultaneously, in parallel.

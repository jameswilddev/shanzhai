## Usage

Within a trigger's event handler, return an instance of `CopyStep` similar to
the following:

```typescript
new CopyStep(
  `A description of the operation being performed`,
  new InputRetrievingTheInformationToCopy(),
  new OutputStoringTheInformationBeingCopied()
)
```

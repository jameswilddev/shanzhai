## Usage

Within a trigger's event handler, return an instance of `MinifyJavascriptStep`
similar to the following:

```typescript
new MinifyJavascriptStep(
  `A description of the operation being performed`,
  new AnInputOfUnminifiedJavascript(),
  new AnInputOfAnObjectOfGlobalConstants(),
  new AnOutputOfMinifiedJavascript()
);
```

## Configuration Notes

The configuration used is highly aggressive.

It assumes that no other script in the page needs any of top-level declarations,
and leaves only object property minification disabled (due to its high risk of
unexpected side effects).

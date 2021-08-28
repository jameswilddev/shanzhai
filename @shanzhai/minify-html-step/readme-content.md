## Usage

Within a trigger's event handler, return an instance of `MinifyHtmlStep` similar
to the following:

```typescript
new MinifyHtmlStep(
  `A description of the operation being performed`,
  new AnInputOfUnminifiedHtml(),
  new AnOutputOfMinifiedHtml()
);
```

## Configuration Notes

The configuration used is highly aggressive, and the resulting HTML may actually
be invalid, but should still function.

It will not be suitable for inclusion in other HTML documents, however.

## Usage

Within a trigger's event handler, return an instance of `MinifySvgStep`
similar to the following:

```typescript
new MinifySvgStep(
  `A description of the operation being performed`,
  new AnInputOfUnminifiedSvg(),
  new AnOutputOfMinifiedSvg()
);
```

## Configuration Notes

The configuration used is highly aggressive.  It should be reasonable for static
SVGs.

- Coordinates are rounded to the nearest pixels.
- Colors are reduced from 24 to 12 bits.
- Ids, classes, etc. are all removed.
- Invisible elements are removed.
- Grouping elements which do not alter appearance are flattened.

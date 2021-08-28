## Usage

This step is unlikely to have any use other than combining the output of
[ConvertSvgDocumentToDefStep](https://www.npmjs.com/package/@shanzhai/convert-svg-document-to-def-step).

If within a trigger's event handler an instance of `CollectSvgDefsStep` similar
to the following were to be returned:

```typescript
new CollectSvgDefsStep(
  new ConstantInput({
    testKeyA: `<rect id="" width="100" height="220" />`,
    testKeyB: `<circle id="" cx="310" cy="70" r="50" />`,
  }),
  new OutputOfGeneratedTypeScript(),
  new OutputOfGeneratedConstants(),
  new OutputOfGeneratedSvg()
)
```

Each input def must:

- Be (mostly) valid SVG.
- Have a single root element which is NOT `<svg>`, with an `id` attribute which
  is empty.
- Have no other IDs within.

This would then output:

- TypeScript defining the `AnySvg` type, which is a union of all of the
  generated constants (e.g. `type AnySvg = 0 | 1;`).
- Constants (for use as TypeScript globals) mapping the keys of the defs input
  to the IDs injected into them (e.g. `{ testKeyA: 0, testKeyB: 1 }`).
- The defs, combined into a single piece of SVG, with injected IDs to match the
  TypeScript globals (e.g.
  `<rect id="0" width="100" height="220" /><circle id="1" cx="310" cy="70" r="50" />`
  ).

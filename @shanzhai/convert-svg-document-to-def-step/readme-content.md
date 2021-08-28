## Usage

This step is unlikely to have any use other than supplying input to
[CollectSvgDefsStep](https://www.npmjs.com/package/@shanzhai/collect-svg-defs-step).

Should a trigger's event handler return the following:

```typescript
new ConvertSvgDocumentToDefStep(
  new ConstantInput(`<svg><rect width="100" height="220" /></svg>`),
  new OutputOfConvertedDef()
);
```

It will write something similar to the following to its output:

`<rect id="" width="100" height="220" />`

If there are multiple elements, a wrapping `<g>` will be added.

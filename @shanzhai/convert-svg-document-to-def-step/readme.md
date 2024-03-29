# `@shanzhai/convert-svg-document-to-def-step` [![Continuous Integration](https://github.com/jameswilddev/shanzhai/workflows/Continuous%20Integration/badge.svg)](https://github.com/jameswilddev/shanzhai/actions) [![License](https://img.shields.io/github/license/jameswilddev/shanzhai.svg)](https://github.com/jameswilddev/shanzhai/blob/master/license) [![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fjameswilddev%2Fshanzhai.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fjameswilddev%2Fshanzhai?ref=badge_shield) [![Renovate enabled](https://img.shields.io/badge/renovate-enabled-brightgreen.svg)](https://renovatebot.com/) [![npm](https://img.shields.io/npm/v/@shanzhai/convert-svg-document-to-def-step.svg)](https://www.npmjs.com/package/@shanzhai/convert-svg-document-to-def-step) [![npm type definitions](https://img.shields.io/npm/types/@shanzhai/convert-svg-document-to-def-step.svg)](https://www.npmjs.com/package/@shanzhai/convert-svg-document-to-def-step)

A Shanzhai step which converts a SVG document to a def to be embedded in another SVG document.

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

## Dependencies

This package has the following runtime dependencies:

Name | Version                                                                              
---- | -------------------------------------------------------------------------------------
svgo | [![2.8.0](https://img.shields.io/npm/v/svgo.svg)](https://www.npmjs.com/package/svgo)

## Peer Dependencies

This package has no runtime peer dependencies (it does not expect any other packages to be installed alongside itself).

## License

[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fjameswilddev%2Fshanzhai.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Fjameswilddev%2Fshanzhai?ref=badge_large)

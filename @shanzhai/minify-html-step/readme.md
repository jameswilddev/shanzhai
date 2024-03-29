# `@shanzhai/minify-html-step` [![Continuous Integration](https://github.com/jameswilddev/shanzhai/workflows/Continuous%20Integration/badge.svg)](https://github.com/jameswilddev/shanzhai/actions) [![License](https://img.shields.io/github/license/jameswilddev/shanzhai.svg)](https://github.com/jameswilddev/shanzhai/blob/master/license) [![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fjameswilddev%2Fshanzhai.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fjameswilddev%2Fshanzhai?ref=badge_shield) [![Renovate enabled](https://img.shields.io/badge/renovate-enabled-brightgreen.svg)](https://renovatebot.com/) [![npm](https://img.shields.io/npm/v/@shanzhai/minify-html-step.svg)](https://www.npmjs.com/package/@shanzhai/minify-html-step) [![npm type definitions](https://img.shields.io/npm/types/@shanzhai/minify-html-step.svg)](https://www.npmjs.com/package/@shanzhai/minify-html-step)

A Shanzhai step which minifies a HTML file.

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

## Dependencies

This package has the following runtime dependencies:

Name          | Version                                                                                                
------------- | -------------------------------------------------------------------------------------------------------
html-minifier | [![4.0.0](https://img.shields.io/npm/v/html-minifier.svg)](https://www.npmjs.com/package/html-minifier)

## Peer Dependencies

This package has no runtime peer dependencies (it does not expect any other packages to be installed alongside itself).

## License

[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fjameswilddev%2Fshanzhai.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Fjameswilddev%2Fshanzhai?ref=badge_large)

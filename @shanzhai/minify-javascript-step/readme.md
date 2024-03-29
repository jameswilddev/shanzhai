# `@shanzhai/minify-javascript-step` [![Continuous Integration](https://github.com/jameswilddev/shanzhai/workflows/Continuous%20Integration/badge.svg)](https://github.com/jameswilddev/shanzhai/actions) [![License](https://img.shields.io/github/license/jameswilddev/shanzhai.svg)](https://github.com/jameswilddev/shanzhai/blob/master/license) [![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fjameswilddev%2Fshanzhai.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fjameswilddev%2Fshanzhai?ref=badge_shield) [![Renovate enabled](https://img.shields.io/badge/renovate-enabled-brightgreen.svg)](https://renovatebot.com/) [![npm](https://img.shields.io/npm/v/@shanzhai/minify-javascript-step.svg)](https://www.npmjs.com/package/@shanzhai/minify-javascript-step) [![npm type definitions](https://img.shields.io/npm/types/@shanzhai/minify-javascript-step.svg)](https://www.npmjs.com/package/@shanzhai/minify-javascript-step)

A Shanzhai step which minifies a Javascript file.

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

## Dependencies

This package has the following runtime dependencies:

Name      | Version                                                                                         
--------- | ------------------------------------------------------------------------------------------------
uglify-js | [![3.15.4](https://img.shields.io/npm/v/uglify-js.svg)](https://www.npmjs.com/package/uglify-js)

## Peer Dependencies

This package has no runtime peer dependencies (it does not expect any other packages to be installed alongside itself).

## License

[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fjameswilddev%2Fshanzhai.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Fjameswilddev%2Fshanzhai?ref=badge_large)

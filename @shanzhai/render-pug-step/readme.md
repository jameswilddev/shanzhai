# `@shanzhai/render-pug-step` [![Continuous Integration](https://github.com/jameswilddev/shanzhai/workflows/Continuous%20Integration/badge.svg)](https://github.com/jameswilddev/shanzhai/actions) [![License](https://img.shields.io/github/license/jameswilddev/shanzhai.svg)](https://github.com/jameswilddev/shanzhai/blob/master/license) [![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fjameswilddev%2Fshanzhai.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fjameswilddev%2Fshanzhai?ref=badge_shield) [![Renovate enabled](https://img.shields.io/badge/renovate-enabled-brightgreen.svg)](https://renovatebot.com/) [![npm](https://img.shields.io/npm/v/@shanzhai/render-pug-step.svg)](https://www.npmjs.com/package/@shanzhai/render-pug-step) [![npm type definitions](https://img.shields.io/npm/types/@shanzhai/render-pug-step.svg)](https://www.npmjs.com/package/@shanzhai/render-pug-step)

A Shanzhai step which renders parsed Pug files.

## Usage

If within a trigger's event handler an instance of `RenderPugStep` similar to
the following were to be returned:

```typescript
new RenderPugStep(
  `A description of the operation being performed`,
  new InputForPreviouslyParsedPugTemplate(),
  new InputForPugLocalsObject(),
  new OutputForReadTextFile()
);
```

A string containing the rendered HTML would be written to the output.

## Dependencies

This package has the following runtime dependencies:

Name | Version                                                                            
---- | -----------------------------------------------------------------------------------
pug  | [![3.0.2](https://img.shields.io/npm/v/pug.svg)](https://www.npmjs.com/package/pug)

## Peer Dependencies

This package has no runtime peer dependencies (it does not expect any other packages to be installed alongside itself).

## License

[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fjameswilddev%2Fshanzhai.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Fjameswilddev%2Fshanzhai?ref=badge_large)

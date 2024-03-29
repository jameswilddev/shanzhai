# `@shanzhai/parallel-step` [![Continuous Integration](https://github.com/jameswilddev/shanzhai/workflows/Continuous%20Integration/badge.svg)](https://github.com/jameswilddev/shanzhai/actions) [![License](https://img.shields.io/github/license/jameswilddev/shanzhai.svg)](https://github.com/jameswilddev/shanzhai/blob/master/license) [![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fjameswilddev%2Fshanzhai.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fjameswilddev%2Fshanzhai?ref=badge_shield) [![Renovate enabled](https://img.shields.io/badge/renovate-enabled-brightgreen.svg)](https://renovatebot.com/) [![npm](https://img.shields.io/npm/v/@shanzhai/parallel-step.svg)](https://www.npmjs.com/package/@shanzhai/parallel-step) [![npm type definitions](https://img.shields.io/npm/types/@shanzhai/parallel-step.svg)](https://www.npmjs.com/package/@shanzhai/parallel-step)

A Shanzhai build step which runs any number of child build steps in parallel.

## Usage

Within a trigger's event handler, return an instance of `ParallelStep` similar
to the following:

```typescript
new ParallelStep(
  `A description of the operation being performed`,
  [
    new FirstStepToExecute(),
    new SecondStepToExecute(),
    new ThirdStepToExecute(),
  ]
)
```

This will execute each of the steps simultaneously, in parallel.

## Dependencies

This package has no runtime dependencies.

## Peer Dependencies

This package has no runtime peer dependencies (it does not expect any other packages to be installed alongside itself).

## License

[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fjameswilddev%2Fshanzhai.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Fjameswilddev%2Fshanzhai?ref=badge_large)

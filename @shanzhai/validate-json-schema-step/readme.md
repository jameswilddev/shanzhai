# `@shanzhai/validate-json-schema-step` [![Continuous Integration](https://github.com/jameswilddev/shanzhai/workflows/Continuous%20Integration/badge.svg)](https://github.com/jameswilddev/shanzhai/actions) [![License](https://img.shields.io/github/license/jameswilddev/shanzhai.svg)](https://github.com/jameswilddev/shanzhai/blob/master/license) [![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fjameswilddev%2Fshanzhai.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fjameswilddev%2Fshanzhai?ref=badge_shield) [![Renovate enabled](https://img.shields.io/badge/renovate-enabled-brightgreen.svg)](https://renovatebot.com/) [![npm](https://img.shields.io/npm/v/@shanzhai/validate-json-schema-step.svg)](https://www.npmjs.com/package/@shanzhai/validate-json-schema-step) [![npm type definitions](https://img.shields.io/npm/types/@shanzhai/validate-json-schema-step.svg)](https://www.npmjs.com/package/@shanzhai/validate-json-schema-step)

A Shanzhai step which validates a JSON value against a JSON schema.

## Usage

If within a trigger's event handler an instance of `ValidateJsonSchemaStep`
similar to the following were to be returned:

```typescript
new ValidateJsonSchemaStep(
  `A description of the operation being performed`,
  new InputForAJsonSchema(),
  new InputForAValueToValidate(),
  new OutputForTheValidatedValue(),
);
```

The value which be checked against the JSON schema.  If it passes, the value
will be copied to the output.  If it fails, an error is raised.

## Dependencies

This package has the following runtime dependencies:

Name       | Version                                                                                          
---------- | -------------------------------------------------------------------------------------------------
jsonschema | [![1.4.0](https://img.shields.io/npm/v/jsonschema.svg)](https://www.npmjs.com/package/jsonschema)

## Peer Dependencies

This package has no runtime peer dependencies (it does not expect any other packages to be installed alongside itself).

## License

[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fjameswilddev%2Fshanzhai.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Fjameswilddev%2Fshanzhai?ref=badge_large)

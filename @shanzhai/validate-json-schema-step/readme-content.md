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

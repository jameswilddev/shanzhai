## Usage

Use `ConvertJsonToTypeScriptStep` to convert an object containing constants into
a set of TypeScript type declarations.  For example, returning the following
from a trigger's event handler:

```typescript
new ConvertJsonToTypeScriptStep(
  `A description of the operation being performed`,
  new ConstantInput({
    theFirstDeclaration: 3,
    theSecondDeclaration: {
      anObjectContaining: [
        `an`,
        `array`,
      ],
    }
  })
);
```

To produce the following output:

```typescript
declare const theFirstDeclaration: 3;

declare const theSecondDeclaration: {
  readonly anObjectContaining: readonly [
    `an`,
    `array`,
  ],
};
```

The values are not included; these should be injected during minification.

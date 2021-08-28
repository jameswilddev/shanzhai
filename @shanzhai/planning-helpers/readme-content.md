## Usage

This package exports a `plan` function which is to be used to determine exactly
which operations need to be performed during a build.

```typescript
import { plan } from "@shanzhai/planning-helpers";

const theStepToExecute = plan(
  anObjectOfPlugins,
  true, // This is the first run.
  aDiffOfFileNames,
);
```

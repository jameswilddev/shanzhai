## Usage

An `execute` function is exported which executes a step, with a streaming log
output:

```typescript
import { execute } from "@shanzhai/execution-helpers";

// Returns true when successful, otherwise, false.
await execute(new ExampleStep(), process.stderr);
```

## Usage

This package exports a `searchForPlugins` function which scans the
`package.json` file in the current working directory to list all Shanzhai
plugins within the current package and its direct dependencies.

```typescript
import { searchForPlugins } from "@shanzhai/plugin-helpers";

const anObjectOfPlugins = await searchForPlugins();
```

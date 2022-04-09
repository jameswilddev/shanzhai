## Usage

```typescript
import { globCompareFunction } from "@shanzhai/glob-compare-function";

console.log([
  `some-file.*`,
  `**/*.*`,
  `file.path`,
  `**/some-file.path`,
  `**/*.some-file-path`,
  `some/file.path`,
].sort(globCompareFunction))
```

```json
[
  "file.path`",
  "some/file.path`",
  "some-file.*`",
  "**/some-file.path`",
  "**/*.some-file-path`",
  "**/*.*",
]
```

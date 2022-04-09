## Usage

```typescript
import { globCompareFunction } from "@shanzhai/glob-compare-function";

console.log([
  `some-file.*`,
  `matched/**/more-specific/changed/*`,
  `matched/**/added/*`,
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
  "matched/**/more-specific/changed/*",
  "matched/**/added/*",
  "**/*.some-file-path`",
  "**/*.*",
]
```

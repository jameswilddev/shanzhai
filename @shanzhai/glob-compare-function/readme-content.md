## Usage

```typescript
import { globCompareFunction } from "@shanzhai/glob-compare-function";

console.log([
  `**/some-file.path`,
  `**/*.some-file-path`,
  `**/*.*`,
  `some/file.path`,
  `some-file.*`,
  `file.path`,
  `matched/**/all/*/*`,
  `matched/**/added/*`,
  `matched/**/more-specific/changed/*`,
].sort(globCompareFunction))
```

```json
[
  "file.path",
  "some/file.path",
  "some-file.*",
  "matched/**/more-specific/changed/*",
  "matched/**/all/*/*",
  "matched/**/added/*",
  "**/some-file.path",
  "**/*.some-file-path",
  "**/*.*"
]
```

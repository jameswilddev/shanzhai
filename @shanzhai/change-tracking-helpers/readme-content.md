## Usage

This is a collection of helpers.  Each requires its own explanation.

### Generating Diffs

The `generateDiff` function compares two objects containing key-value pairs.

The differences between them are returned.

```typescript
import { generateDiff } from "@shanzhai/change-tracking-helpers";

generateDiff({
  testRemoved: 123,
  testChanged: 456,
  testUnchanged: 789,
}, {
  testChanged: 456,
  testUnchanged: 789,
  testAdded: 101112,
});
```

This will return the following:

```typescript
{
  added: [`testAdded`],
  changed: [`testChanged`],
  deleted: [`testDeleted`],
  unchanged: [`testUnchanged`],
};
```

### Hashing files

The `hashFile` function resolves to the SHA-1 hash of a file.

As a reminder, SHA-1 is considered suitable for change tracking but not for
protecting against malicious changes.

```typescript
import { hashFile } from "@shanzhai/change-tracking-helpers";

await hashFile(`a/file/path`);
```

This will resolve to a string containing the hash in hexadecimal.

### Filtering out common temporary or system files

The `pathAccepted` function determines whether a given string appears to be a
temporary or system file or not.

```typescript
import { pathAccepted } from "@shanzhai/change-tracking-helpers";

pathAccepted(`a/file/path`);
```

Some examples of paths which would not be accepted:

- `.a-dotfile`
- `a/nested/.dotfile/path`

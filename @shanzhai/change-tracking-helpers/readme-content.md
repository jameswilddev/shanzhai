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

### Mapping diffs

The `mapDiff` function runs every value in a given `Diff` through a given
mapping function.

In this example, we map strings to their lengths, returning null to indicate
that mapping failed if their length exceeds 12.

```typescript
import { mapDiff } from "@shanzhai/change-tracking-helpers";

mapDiff(
  {
    added: [`testAdded`, `testLongAdded`],
    changed: [`testChanged`, `testLongChanged`],
    deleted: [`testDeleted`, `testLongDeleted`],
    unchanged: [`testUnchanged`, `testLongUnchanged`],
  },
  input => input.length > 12 ? null : input.length,
);
```

There are two outputs to the function; a new `Diff` containing the successfully
mapped values and a list of any `added` values which failed to map (the given
mapping function returned `null`).

```typescript
{
  diff: {
    added: [9],
    changed: [11],
    deleted: [11],
    unchanged: [13],
  },
  errors: [`testLongAdded`],
};
```

Note that changed, unchanged or deleted items which failed to map are
effectively ignored.

### Parsing paths

The `parsePath` function attempts to parse a string as a `ParsedPath`, returning
`null` if the string does not appear to be compatible.

```typescript
import { parsePath } from "@shanzhai/change-tracking-helpers";

parsePath(`an/example-valid.path`);
```

This would return:

```typescript
{
  typeScriptName: `an_exampleValid`,
  fullPath: `an/example-valid.path`,
  fileExtension: `path`,
  fullPathWithoutExtension: `an/example-valid`,
};
```

Examples of files which would not be accepted include:

- `a/path/with/no/extension`
- `a/path/with/characters?which.typescript-cannot-accept`

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

# `@shanzhai/change-tracking-helpers` [![Continuous Integration](https://github.com/jameswilddev/shanzhai/workflows/Continuous%20Integration/badge.svg)](https://github.com/jameswilddev/shanzhai/actions) [![License](https://img.shields.io/github/license/jameswilddev/shanzhai.svg)](https://github.com/jameswilddev/shanzhai/blob/master/license) [![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fjameswilddev%2Fshanzhai.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fjameswilddev%2Fshanzhai?ref=badge_shield) [![Renovate enabled](https://img.shields.io/badge/renovate-enabled-brightgreen.svg)](https://renovatebot.com/) [![npm](https://img.shields.io/npm/v/@shanzhai/change-tracking-helpers.svg)](https://www.npmjs.com/package/@shanzhai/change-tracking-helpers) [![npm type definitions](https://img.shields.io/npm/types/@shanzhai/change-tracking-helpers.svg)](https://www.npmjs.com/package/@shanzhai/change-tracking-helpers)

Helpers for tracking changes to files during a Shanzhai build.

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

## Dependencies

This package has no runtime dependencies.

## Peer Dependencies

This package has no runtime peer dependencies (it does not expect any other packages to be installed alongside itself).

## License

[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fjameswilddev%2Fshanzhai.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Fjameswilddev%2Fshanzhai?ref=badge_large)

## Usage

Within a trigger's event handler, return an instance of `DeleteStep` similar to
the following:

```typescript
new DeleteStep(
  `A description of the operation being performed`,
  [`a`, `path`, `to`, `a`, `file`, `or`, `directory`, `to`, `delete`]
)
```

If a file or directory called `a/path/to/a/file/or/directory/to/delete` exists,
it will be deleted.

Directories will be deleted even if they are not empty.

If no such file or directory exists, nothing happens.

## Usage

Within a trigger's event handler, return an instance of `CreateDirectoryStep`
similar to the following:

```typescript
new CreateDirectoryStep(
  `A description of the operation being performed`,
  [`a`, `path`, `to`, `a`, `directory`, `to`, `create`]
)
```

Any part of the path `a/path/to/a/directory/to/create` which does not already
exist will be created as a directory.

If any part already exists as a file, an error will occur.

If the entire path already exists as a directory, nothing will happen.

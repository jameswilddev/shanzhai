export type Diff = {
  readonly added: ReadonlyArray<string>;
  readonly changed: ReadonlyArray<string>;
  readonly deleted: ReadonlyArray<string>;
};

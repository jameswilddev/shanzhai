export type Diff<T> = {
  readonly added: ReadonlyArray<T>;
  readonly changed: ReadonlyArray<T>;
  readonly deleted: ReadonlyArray<T>;
  readonly unchanged: ReadonlyArray<T>;
};

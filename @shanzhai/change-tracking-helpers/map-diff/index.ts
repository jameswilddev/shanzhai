import { Diff } from "@shanzhai/interfaces";

export const mapDiff = <TInput, TOutput>(
  diff: Diff<TInput>,
  callback: (input: TInput) => null | TOutput
): {
  readonly diff: Diff<TOutput>;
  readonly errors: ReadonlyArray<TInput>;
} => {
  const errors: TInput[] = [];
  const added: TOutput[] = [];

  for (const input of diff.added) {
    const mapped = callback(input);

    if (mapped === null) {
      errors.push(input);
    } else {
      added.push(mapped);
    }
  }

  const changed = diff.changed
    .map((item) => callback(item))
    .filter((mapped): mapped is TOutput => mapped !== null);

  const deleted = diff.deleted
    .map((item) => callback(item))
    .filter((mapped): mapped is TOutput => mapped !== null);

  const unchanged = diff.unchanged
    .map((item) => callback(item))
    .filter((mapped): mapped is TOutput => mapped !== null);

  return { diff: { added, changed, deleted, unchanged }, errors };
};

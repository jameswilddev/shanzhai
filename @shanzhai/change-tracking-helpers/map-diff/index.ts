import { Diff } from "@shanzhai/interfaces";

/**
 * Similar to the "map" method of an array, but for a {@link Diff}.
 * @param diff     The {@link Diff} to map.
 * @param callback The {@link Function} which maps a value of the the given
 *                 {@link diff}.  Return null should the value not be mappable.
 * @returns        A {@link Diff} containing the successfully mapped items from
 *                 the given {@link diff}.  Any which failed to map are either
 *                 discarded (unchanged/changed/deleted) or logged in the
 *                 "errors" property (added).
 */
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

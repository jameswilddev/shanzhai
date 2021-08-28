import { Diff } from "@shanzhai/interfaces";

/**
 * Generates a {@link Diff} by comparing two objects, one describing a past
 * state, and the other describing a current state.
 * @template TValue The values of the states to compare.
 * @param from The past state to compare.
 * @param to The current state to compare.
 * @returns A {@link Diff} containing the keys of the compared state
 * {@link TValue}s.
 */
export function generateDiff<TValue>(
  from: { readonly [key: string]: TValue },
  to: { readonly [key: string]: TValue }
): Diff<string> {
  const fromKeys = Object.keys(from).sort();
  const toKeys = Object.keys(to).sort();

  const added = toKeys.filter((key) => !fromKeys.includes(key));
  const changed = toKeys.filter(
    (key) => fromKeys.includes(key) && from[key] !== to[key]
  );
  const deleted = fromKeys.filter((key) => !toKeys.includes(key));
  const unchanged = fromKeys.filter(
    (key) => toKeys.includes(key) && from[key] === to[key]
  );

  return {
    added,
    changed,
    deleted,
    unchanged,
  };
}

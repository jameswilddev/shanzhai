import { Diff } from "@shanzhai/interfaces";

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

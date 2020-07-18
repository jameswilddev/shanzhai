import { Timestamps } from "../timestamps";
import { Diff } from "../diff";

export const generateDiff = (from: Timestamps, to: Timestamps): Diff => {
  const fromKeys = Object.keys(from).sort();
  const toKeys = Object.keys(to).sort();

  const added = toKeys.filter((key) => !fromKeys.includes(key));
  const changed = toKeys.filter(
    (key) => fromKeys.includes(key) && from[key] !== to[key]
  );
  const deleted = fromKeys.filter((key) => !toKeys.includes(key));

  return {
    added,
    changed,
    deleted,
  };
};

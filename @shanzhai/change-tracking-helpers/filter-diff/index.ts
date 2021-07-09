import { Diff } from "@shanzhai/interfaces";

export const filterDiff = <T>(
  diff: Diff<T>,
  callback: (item: T) => boolean
): Diff<T> => {
  const wrappedCallback = (item: T) => callback(item);

  return {
    added: diff.added.filter(wrappedCallback),
    changed: diff.changed.filter(wrappedCallback),
    deleted: diff.deleted.filter(wrappedCallback),
    unchanged: diff.unchanged.filter(wrappedCallback),
  };
};

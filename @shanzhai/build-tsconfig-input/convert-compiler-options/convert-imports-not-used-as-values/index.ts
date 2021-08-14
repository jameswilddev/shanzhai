import { ImportsNotUsedAsValues } from "typescript";

export function convertImportsNotUsedAsValues(
  importsNotUsedAsValues: undefined | ImportsNotUsedAsValues
): undefined | `remove` | `preserve` | `error` {
  switch (importsNotUsedAsValues) {
    case undefined:
      return undefined;

    case ImportsNotUsedAsValues.Remove:
      return `remove`;

    case ImportsNotUsedAsValues.Preserve:
      return `preserve`;

    case ImportsNotUsedAsValues.Error:
      return `error`;
  }
}

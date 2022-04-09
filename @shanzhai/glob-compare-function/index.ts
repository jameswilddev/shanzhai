/**
 * A comparison function for sorting glob patterns by priority.
 * @param a The first glob pattern to compare.
 * @param b The second glob pattern to compare.
 * @returns When {@link a} takes priority over {@link b}, a negative number.  When {@link b} takes priority over {@link a}, a positive number.  When {@link a} and {@link b} are equal in priority, 0.
 */
export function globCompareFunction(a: string, b: string): number {
  return a.split(`*`).length - b.split(`*`).length || a.length - b.length;
}

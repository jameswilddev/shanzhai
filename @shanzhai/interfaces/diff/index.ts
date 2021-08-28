/**
 * Describes the result of comparing a previous and current state.
 * @template T An item of the compared states.
 */
export type Diff<T> = {
  /**
   * The items which were added between the previous and current states.
   */
  readonly added: ReadonlyArray<T>;

  /**
   * The items which were changed between the previous and current states.
   */
  readonly changed: ReadonlyArray<T>;

  /**
   * The items which were deleted between the previous and current states.
   */
  readonly deleted: ReadonlyArray<T>;

  /**
   * The items which were not added, changed or deleted between the previous and
   * current states.
   */
  readonly unchanged: ReadonlyArray<T>;
};

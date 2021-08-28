/**
 * Describes a single-value store.
 * The means and permanence of the store are implementation-defined.
 * @template TValue The type of value to store.
 */
export interface UnkeyedStore<TValue> {
  /**
   * Indicates that this is an {@link UnkeyedStore}.
   */
  readonly type: `unkeyedStore`;

  /**
   * The name of this {@link UnkeyedStore}.
   */
  readonly name: string;

  /**
   * Retrieves the current {@link TValue}
   * Behavior is undefined should the value not be set.
   * @return The current {@link TValue}.
   */
  get(): Promise<TValue>;

  /**
   * Sets the current {@link TValue}.
   * If a value has been set, it is to be overwritten.
   * @param value The {@link TValue} to set.
   */
  set(value: TValue): Promise<void>;
}

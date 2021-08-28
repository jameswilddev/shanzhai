/**
 * Describes a key-value store.
 * The means and permanence of the store are implementation-defined.
 * @template TValue The type of value to store.
 */
export interface KeyedStore<TValue> {
  /**
   * Indicates that this is a {@link KeyedStore}.
   */
  readonly type: `keyedStore`;

  /**
   * The name of this {@link KeyedStore}.
   */
  readonly name: string;

  /**
   * Retrieves a {@link TValue} by its corresponding key.
   * Behavior is undefined should the key/value not be set.
   * @param key The key of the {@link TValue} to retrieve.
   * @return The {@link TValue} referred to by the given {@link key}.
   */
  get(key: string): Promise<TValue>;

  /**
   * Sets a {@link TValue} by its corresponding key.
   * If the key is already in use, its value is to be overwritten.
   * @param key The key of the {@link TValue} to set.
   * @param value The {@link TValue} to set.
   */
  set(key: string, value: TValue): Promise<void>;

  /**
   * Deletes a {@link TValue} by its corresponding key.
   * If the key is not currently in use, nothing must happen.
   * @param key The key of the {@link TValue} to delete.
   */
  delete(key: string): Promise<void>;

  /**
   * Retrieves this entire {@link KeyedStore}'s content, as an object.
   * @returns This entire {@link KeyedStore}'s content, as an object.
   */
  getAll(): Promise<{ readonly [key: string]: TValue }>;

  /**
   * Lists every key in this {@link KeyedStore}.
   * @returns Every key in this {@link KeyedStore}.
   */
  getKeys(): Promise<ReadonlyArray<string>>;
}

import { UnkeyedStore } from "../../stores/unkeyed-store";
import { KeyedStore } from "../../stores/keyed-store";
import { Step } from "../../step";

/**
 * Indicates that {@link Step}s are to be executed when values are deleted, set
 * or both in a {@link KeyedStore}.
 */
export type KeyedStoreTrigger = {
  /**
   * Specifies that this is a {@link KeyedStoreTrigger}.
   */
  readonly type: `keyedStore`;

  /**
   * The {@link KeyedStore} which can cause this {@link StoreAggregateTrigger}
   * to execute {@link Step}s.
   */
  readonly keyedStore: KeyedStore<unknown>;

  /**
   * If any {@link UnkeyedStore} in this list is modified in any way, each
   * unchanged entry in the {@link keyedStore} is treated as though it has been
   * deleted and re-set.
   *
   * For example, you may be processing files held in a store, but also be
   * dependent upon configuration.  When that configuration changes, all of the
   * previously processed files are considered stale and in need of
   * re-processing to compensate.
   *
   * This also applies an ordering constraint, meaning that events raised by
   * changes to {@link keyedStore} will be delayed until all changes to these
   * other stores have completed.
   */
  readonly refreshAllOnSettingAtLeastOneUnkeyedStore: ReadonlyArray<
    UnkeyedStore<unknown>
  >;

  /**
   * Invoked when the {@link keyedStore} is deleted from.
   * @param key The key of the deleted value.
   * @returns The {@link Step} which is to be executed in response.
   */
  down(key: string): Step;

  /**
   * Invoked when the {@link keyedStore} has a value set.
   * @param key The key of the value set.
   * @returns The {@link Step} which is to be executed in response.
   */
  up(key: string): Step;
};

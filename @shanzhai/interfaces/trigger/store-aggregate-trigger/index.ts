import { KeyedStore } from "../../stores/keyed-store";
import { UnkeyedStore } from "../../stores/unkeyed-store";
import { Step } from "../../step";

/**
 * Indicates that a {@link Step} is to be executed should any of a list of
 * {@link UnkeyedStore}s and/or {@link KeyedStore}s experience any changes at
 * all.
 */
export type StoreAggregateTrigger = {
  /**
   * Specifies that this is a {@link StoreAggregateTrigger}.
   */
  readonly type: `storeAggregate`;

  /**
   * The {@link UnkeyedStore}s and/or {@link KeyedStore}s which can cause this
   * {@link StoreAggregateTrigger} to execute a {@link Step}.
   */
  readonly stores: ReadonlyArray<UnkeyedStore<unknown> | KeyedStore<unknown>>;

  /**
   * Invoked when this {@link StoreAggregateTrigger} is executed.
   * @returns The {@link Step} which is to be executed in response.
   */
  invalidated(): Step;
};

import { UnkeyedStore } from "../../stores/unkeyed-store";
import { Step } from "../../step";

/**
 * Indicates that {@link Step}s are to be executed the vlaue of a
 * {@link UnkeyedStore} is set or deleted.
 */
export type UnkeyedStoreTrigger = {
  /**
   * Specifies that this is a {@link UnkeyedStoreTrigger}.
   */
  readonly type: `unkeyedStore`;

  /**
   * The {@link UnkeyedStore} which can cause this {@link UnkeyedStoreTrigger}
   * to execute {@link Step}s.
   */
  readonly unkeyedStore: UnkeyedStore<unknown>;

  /**
   * Invoked when the {@link unkeyedStore} is deleted from.
   * @returns The {@link Step} which is to be executed in response.
   */
  down(): Step;

  /**
   * Invoked when the {@link unkeyedStore}'s value is set.
   * @returns The {@link Step} which is to be executed in response.
   */
  up(): Step;
};

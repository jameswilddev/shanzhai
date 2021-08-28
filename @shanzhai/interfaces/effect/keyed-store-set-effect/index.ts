import { KeyedStore } from "../../stores/keyed-store";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Step } from "../../step";

/**
 * Indicates that a {@link Step} will set a specific key in a
 * {@link KeyedStore}.
 */
export type KeyedStoreSetEffect = {
  /**
   * Indicates that this is a {@link KeyedStoreSetEffect}.
   */
  readonly type: `keyedStoreSet`;

  /**
   * The {@link KeyedStore} in which a key will be set.
   */
  readonly keyedStore: KeyedStore<unknown>;

  /**
   * The key which will be set in the {@link keyedStore}.
   */
  readonly key: string;
};

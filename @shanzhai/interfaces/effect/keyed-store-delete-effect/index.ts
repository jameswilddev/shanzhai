import { KeyedStore } from "../../stores/keyed-store";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Step } from "../../step";

/**
 * Indicates that a {@link Step} will delete a specific key from a
 * {@link KeyedStore}.
 */
export type KeyedStoreDeleteEffect = {
  /**
   * Indicates that this is a {@link KeyedStoreDeleteEffect}.
   */
  readonly type: `keyedStoreDelete`;

  /**
   * The {@link KeyedStore} from which a key will be deleted.
   */
  readonly keyedStore: KeyedStore<unknown>;

  /**
   * The key which will be deleted from the {@link keyedStore}.
   */
  readonly key: string;
};

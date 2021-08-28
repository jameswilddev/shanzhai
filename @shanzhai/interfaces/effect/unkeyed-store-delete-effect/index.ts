import { UnkeyedStore } from "../../stores/unkeyed-store";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Step } from "../../step";

/**
 * Indicates that a {@link Step} will delete the value of an
 * {@link UnkeyedStore}.
 */
export type UnkeyedStoreDeleteEffect = {
  /**
   * Indicates that this is a {@link UnkeyedStoreDeleteEffect}.
   */
  readonly type: `unkeyedStoreDelete`;

  /**
   * The {@link UnkeyedStore} from which the value will be deleted.
   */
  readonly unkeyedStore: UnkeyedStore<unknown>;
};

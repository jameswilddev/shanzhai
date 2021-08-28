import { UnkeyedStore } from "../../stores/unkeyed-store";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Step } from "../../step";

/**
 * Indicates that a {@link Step} will set the value of an {@link UnkeyedStore}.
 */
export type UnkeyedStoreSetEffect = {
  /**
   * Indicates that this is a {@link UnkeyedStoreSetEffect}.
   */
  readonly type: `unkeyedStoreSet`;

  /**
   * The {@link UnkeyedStore} in which a value will be set.
   */
  readonly unkeyedStore: UnkeyedStore<unknown>;
};

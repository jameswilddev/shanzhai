import { UnkeyedStore } from "../../stores/unkeyed-store";

export type UnkeyedStoreSetEffect = {
  readonly type: `unkeyedStoreSet`;
  readonly unkeyedStore: UnkeyedStore<unknown>;
};

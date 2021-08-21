import { UnkeyedStore } from "../../stores/unkeyed-store";

export type UnkeyedStoreDeleteEffect = {
  readonly type: `unkeyedStoreDelete`;
  readonly unkeyedStore: UnkeyedStore<unknown>;
};

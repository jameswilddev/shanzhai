import { Store } from "../../store";

export type UnkeyedStoreDeleteEffect = {
  readonly type: `unkeyedStoreDelete`;
  readonly store: Store;
};

import { KeyedStore } from "../../stores/keyed-store";

export type KeyedStoreDeleteEffect = {
  readonly type: `keyedStoreDelete`;
  readonly keyedStore: KeyedStore;
  readonly key: string;
};

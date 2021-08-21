import { KeyedStore } from "../../stores/keyed-store";

export type KeyedStoreSetEffect = {
  readonly type: `keyedStoreSet`;
  readonly keyedStore: KeyedStore<unknown>;
  readonly key: string;
};

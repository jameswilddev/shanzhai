import { Store } from "../../store";

export type KeyedStoreDeleteEffect<T> = {
  readonly type: `keyedStoreDelete`;
  readonly store: Store;
  readonly key: T;
};

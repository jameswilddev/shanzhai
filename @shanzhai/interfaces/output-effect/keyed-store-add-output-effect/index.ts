import { Store } from "../../store";

export type KeyedStoreAddOutputEffect<T> = {
  readonly type: `keyedStoreAddOutputEffect`;
  readonly store: Store;
  readonly key: T;
};

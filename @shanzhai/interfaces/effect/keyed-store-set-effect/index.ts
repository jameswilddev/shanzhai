import { Store } from "../../store";

export type KeyedStoreSetEffect<T> = {
  readonly type: `keyedStoreSet`;
  readonly store: Store;
  readonly key: T;
};

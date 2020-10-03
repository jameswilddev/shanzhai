import { Store } from "../../store";

export type KeyedStoreAddEffect<T> = {
  readonly type: `keyedStoreAdd`;
  readonly store: Store;
  readonly key: T;
};

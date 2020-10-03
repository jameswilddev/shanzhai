import { Store } from "../../store";

export type KeyedStoreDeleteOutputEffect<T> = {
  readonly type: `keyedStoreDeleteOutputEffect`;
  readonly store: Store;
  readonly key: T;
};

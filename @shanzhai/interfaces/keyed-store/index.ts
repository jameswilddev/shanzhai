import { Store } from "../store";

export interface KeyedStore<TKey extends string> extends Store {
  getKeys(): ReadonlyArray<TKey>;
}

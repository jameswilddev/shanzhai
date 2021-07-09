import { Store } from "../store";

export interface KeyedStore extends Store {
  getKeys(): ReadonlyArray<string>;
}

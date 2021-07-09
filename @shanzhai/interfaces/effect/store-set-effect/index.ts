import { Store } from "../../store";

export type StoreSetEffect = {
  readonly type: `storeSet`;
  readonly store: Store;
};

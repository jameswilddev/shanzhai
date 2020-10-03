import { Store } from "../../store";

export type StoreUpdateEffect = {
  readonly type: `storeUpdate`;
  readonly store: Store;
};

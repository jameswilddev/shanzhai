import { Store } from "../../store";

export type StoreUpdateOutputEffect = {
  readonly type: `storeUpdateOutputEffect`;
  readonly store: Store;
};

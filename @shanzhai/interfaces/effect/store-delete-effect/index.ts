import { Store } from "../../store";

export type StoreDeleteEffect = {
  readonly type: `storeDelete`;
  readonly store: Store;
};

import { Step } from "../../step";
import { Store } from "../../store";

export type KeyedStoreTrigger<T> = {
  readonly type: `keyedStore`;

  readonly store: Store;

  readonly regeneratedByChangesToStores: Store;

  down(key: T): Step;
  up(key: T): Step;
};

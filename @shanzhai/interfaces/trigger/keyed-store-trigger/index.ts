import { Step } from "../../step";
import { Store } from "../../store";

export type KeyedStoreTrigger<T> = {
  readonly type: `keyedStore`;

  readonly store: Store;

  readonly regeneratedByChangesToStores: ReadonlyArray<Store>;

  down(key: T): Promise<ReadonlyArray<Step>>;
  up(key: T): Promise<ReadonlyArray<Step>>;
};

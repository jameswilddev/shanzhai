import { Step } from "../../step";
import { Store } from "../../store";

export type KeyedStoreTrigger = {
  readonly type: `keyedStore`;

  readonly store: Store;

  readonly regeneratedByChangesToStores: ReadonlyArray<Store>;

  down(key: string): Promise<ReadonlyArray<Step>>;
  up(key: string): Promise<ReadonlyArray<Step>>;
};

import { Step } from "../../step";
import { Store } from "../../store";

export type KeyedStoreTrigger = {
  readonly type: `keyedStore`;

  readonly regeneratedByChangesToStores: ReadonlyArray<Store>;

  down(key: string): ReadonlyArray<Step>;
  up(key: string): ReadonlyArray<Step>;
};

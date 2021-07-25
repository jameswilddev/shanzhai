import { KeyedStore } from "../../stores/keyed-store";
import { Step } from "../../step";

export type KeyedStoreTrigger = {
  readonly type: `keyedStore`;

  readonly keyedStore: KeyedStore;

  down(key: string): Step;
  up(key: string): Step;
};

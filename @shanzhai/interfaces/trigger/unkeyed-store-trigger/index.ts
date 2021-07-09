import { Step } from "../../step";
import { Store } from "../../store";

export type UnkeyedStoreTrigger = {
  readonly type: `unkeyedStore`;

  readonly store: Store;

  down(): Step;
  up(): Step;
};

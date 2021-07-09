import { Step } from "../../step";
import { Store } from "../../store";

export type StoreTrigger = {
  readonly type: `store`;

  readonly store: Store;

  down(): Step;
  up(): Step;
};

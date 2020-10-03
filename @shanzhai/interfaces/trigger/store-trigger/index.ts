import { Step } from "../../step";
import { Store } from "../../store";

export type StoreTrigger = {
  readonly type: `store`;

  readonly stores: ReadonlyArray<Store>;

  down(): Promise<ReadonlyArray<Step>>;
  up(): Promise<ReadonlyArray<Step>>;
};

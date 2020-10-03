import { Step } from "../../step";
import { Store } from "../../store";

export type StoreTrigger = {
  readonly type: `store`;

  readonly stores: ReadonlyArray<Store>;

  readonly down: ReadonlyArray<Step>;
  readonly up: ReadonlyArray<Step>;
};

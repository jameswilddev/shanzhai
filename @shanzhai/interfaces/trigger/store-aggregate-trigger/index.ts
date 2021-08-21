import { KeyedStore } from "../../stores/keyed-store";
import { UnkeyedStore } from "../../stores/unkeyed-store";
import { Step } from "../../step";

export type StoreAggregateTrigger = {
  readonly type: `storeAggregate`;

  readonly stores: ReadonlyArray<UnkeyedStore<unknown> | KeyedStore<unknown>>;

  invalidated(): Step;
};

import { UnkeyedStore } from "../../stores/unkeyed-store";
import { KeyedStore } from "../../stores/keyed-store";
import { Step } from "../../step";

export type KeyedStoreTrigger = {
  readonly type: `keyedStore`;

  readonly keyedStore: KeyedStore<unknown>;

  readonly refreshAllWhenStoresChange: ReadonlyArray<
    UnkeyedStore<unknown> | KeyedStore<unknown>
  >;

  down(key: string): Step;
  up(key: string): Step;
};

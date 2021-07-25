import { UnkeyedStore } from "../../stores/unkeyed-store";
import { Step } from "../../step";

export type UnkeyedStoreTrigger = {
  readonly type: `unkeyedStore`;

  readonly unkeyedStore: UnkeyedStore;

  down(): Step;
  up(): Step;
};

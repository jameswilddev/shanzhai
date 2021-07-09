import { Store } from "../../store";

export type UnkeyedStoreSetEffect = {
  readonly type: `unkeyedStoreSet`;
  readonly store: Store;
};

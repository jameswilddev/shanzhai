import { KeyedStoreAddEffect } from "./keyed-store-add-effect";
import { KeyedStoreDeleteEffect } from "./keyed-store-delete-effect";
import { StoreUpdateEffect } from "./store-update-effect";

export type Effect =
  | KeyedStoreAddEffect<unknown>
  | KeyedStoreDeleteEffect<unknown>
  | StoreUpdateEffect;

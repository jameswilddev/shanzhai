import { KeyedStoreSetEffect } from "./keyed-store-set-effect";
import { KeyedStoreDeleteEffect } from "./keyed-store-delete-effect";
import { StoreSetEffect } from "./store-set-effect";

export type Effect =
  | KeyedStoreSetEffect<unknown>
  | KeyedStoreDeleteEffect<unknown>
  | StoreSetEffect;

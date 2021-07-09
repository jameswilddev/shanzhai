import { KeyedStoreSetEffect } from "./keyed-store-set-effect";
import { KeyedStoreDeleteEffect } from "./keyed-store-delete-effect";
import { UnkeyedStoreSetEffect } from "./unkeyed-store-set-effect";
import { UnkeyedStoreDeleteEffect } from "./unkeyed-store-delete-effect";

export type Effect =
  | KeyedStoreSetEffect<unknown>
  | KeyedStoreDeleteEffect<unknown>
  | UnkeyedStoreSetEffect
  | UnkeyedStoreDeleteEffect;

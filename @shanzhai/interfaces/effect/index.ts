import { KeyedStoreSetEffect } from "./keyed-store-set-effect";
import { KeyedStoreDeleteEffect } from "./keyed-store-delete-effect";
import { UnkeyedStoreSetEffect } from "./unkeyed-store-set-effect";
import { UnkeyedStoreDeleteEffect } from "./unkeyed-store-delete-effect";

/**
 * A description of an effect produced when a {@link Step} is executed.
 */
export type Effect =
  | KeyedStoreSetEffect
  | KeyedStoreDeleteEffect
  | UnkeyedStoreSetEffect
  | UnkeyedStoreDeleteEffect;

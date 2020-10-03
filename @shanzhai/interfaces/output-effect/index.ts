import { KeyedStoreAddOutputEffect } from "./keyed-store-add-output-effect";
import { KeyedStoreDeleteOutputEffect } from "./keyed-store-delete-output-effect";
import { StoreUpdateOutputEffect } from "./store-update-output-effect";

export type OutputEffect =
  | KeyedStoreAddOutputEffect<unknown>
  | KeyedStoreDeleteOutputEffect<unknown>
  | StoreUpdateOutputEffect;

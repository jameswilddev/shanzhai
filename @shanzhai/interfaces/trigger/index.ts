import { FileTrigger } from "./file-trigger";
import { KeyedStoreTrigger } from "./keyed-store-trigger";
import { OneTimeTrigger } from "./one-time-trigger";
import { UnkeyedStoreTrigger } from "./unkeyed-store-trigger";

export type Trigger =
  | FileTrigger
  | KeyedStoreTrigger
  | OneTimeTrigger
  | UnkeyedStoreTrigger;

import { FileTrigger } from "./file-trigger";
import { KeyedStoreTrigger } from "./keyed-store-trigger";
import { OneTimeTrigger } from "./one-time-trigger";
import { StoreTrigger } from "./store-trigger";

export type Trigger =
  | FileTrigger
  | KeyedStoreTrigger
  | OneTimeTrigger
  | StoreTrigger;

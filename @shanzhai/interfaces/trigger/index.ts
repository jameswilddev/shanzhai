import { FileExtensionTrigger } from "./file-extension-trigger";
import { FileTrigger } from "./file-trigger";
import { KeyedStoreTrigger } from "./keyed-store-trigger";
import { OneTimeTrigger } from "./one-time-trigger";
import { StoreAggregateTrigger } from "./store-aggregate-trigger";
import { UnkeyedStoreTrigger } from "./unkeyed-store-trigger";

export type Trigger =
  | FileExtensionTrigger
  | FileTrigger
  | KeyedStoreTrigger
  | OneTimeTrigger
  | UnkeyedStoreTrigger
  | StoreAggregateTrigger;

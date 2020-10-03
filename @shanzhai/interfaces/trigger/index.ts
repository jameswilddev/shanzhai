import { FileTrigger } from "./file-trigger";
import { KeyedStoreTrigger } from "./keyed-store-trigger";
import { StoreTrigger } from "./store-trigger";

export type Trigger = FileTrigger | KeyedStoreTrigger | StoreTrigger;

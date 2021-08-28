import { FileExtensionTrigger } from "./file-extension-trigger";
import { FileTrigger } from "./file-trigger";
import { KeyedStoreTrigger } from "./keyed-store-trigger";
import { OneTimeTrigger } from "./one-time-trigger";
import { StoreAggregateTrigger } from "./store-aggregate-trigger";
import { UnkeyedStoreTrigger } from "./unkeyed-store-trigger";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Step } from "../step";

/**
 * A description of an event which may cause one or more {@link Step}s to be
 * executed.
 */
export type Trigger =
  | FileExtensionTrigger
  | FileTrigger
  | KeyedStoreTrigger
  | OneTimeTrigger
  | UnkeyedStoreTrigger
  | StoreAggregateTrigger;

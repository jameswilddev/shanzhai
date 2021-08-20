import { Json } from "@shanzhai/interfaces";
import { KeyValueStore } from "@shanzhai/key-value-store";

export const typeScriptGlobalStore = new KeyValueStore<{
  readonly [key: string]: Json;
}>(`typeScriptGlobalStore`);

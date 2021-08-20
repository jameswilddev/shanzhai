import { Json } from "@shanzhai/interfaces";
import { KeyValueStore } from "@shanzhai/key-value-store";

export const pugLocalStore = new KeyValueStore<{
  readonly [originPluginKey: string]: { readonly [localKey: string]: Json };
}>(`pugLocalStore`);

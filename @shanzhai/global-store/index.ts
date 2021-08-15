import { Json } from "@shanzhai/interfaces";
import { KeyValueStore } from "@shanzhai/key-value-store";

export const globalStore = new KeyValueStore<{
  readonly [originPluginKey: string]: { readonly [globalKey: string]: Json };
}>(`globalStore`);

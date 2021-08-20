import { Json } from "@shanzhai/interfaces";
import { KeyValueStore } from "@shanzhai/key-value-store";

export const pugLocalStore = new KeyValueStore<{
  readonly [key: string]: Json;
}>(`pugLocalStore`);

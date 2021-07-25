import { Json } from "@shanzhai/interfaces";
import { KeyValueStore } from "@shanzhai/key-value-store";

export const globalStore = new KeyValueStore<{ readonly [name: string]: Json }>(
  `globalStore`
);

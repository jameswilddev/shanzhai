import { Json } from "@shanzhai/interfaces";
import { KeyValueStore } from "@shanzhai/key-value-store";

export const globalStore = new KeyValueStore<
  string,
  { readonly [name: string]: Json }
>(`globalStore`);

import { Json } from "@shanzhai/interfaces";
import { EphemeralKeyedStore } from "@shanzhai/ephemeral-keyed-store";

export const pugLocalStore = new EphemeralKeyedStore<{
  readonly [key: string]: Json;
}>(`pugLocalStore`);

import { Json } from "@shanzhai/interfaces";
import { EphemeralKeyedStore } from "@shanzhai/ephemeral-keyed-store";

export const typeScriptGlobalStore = new EphemeralKeyedStore<{
  readonly [key: string]: Json;
}>(`typeScriptGlobalStore`);

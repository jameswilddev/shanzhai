import { EphemeralKeyedStore } from "@shanzhai/ephemeral-keyed-store";

export const typeScriptSourceStore = new EphemeralKeyedStore<string>(
  `typeScriptSourceStore`
);

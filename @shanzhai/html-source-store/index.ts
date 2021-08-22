import { EphemeralKeyedStore } from "@shanzhai/ephemeral-keyed-store";

export const htmlSourceStore = new EphemeralKeyedStore<string>(
  `htmlSourceStore`
);

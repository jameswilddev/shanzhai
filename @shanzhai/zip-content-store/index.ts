import { EphemeralKeyedStore } from "@shanzhai/ephemeral-keyed-store";

export const zipContentStore = new EphemeralKeyedStore<string | Buffer>(
  `zipContentStore`
);

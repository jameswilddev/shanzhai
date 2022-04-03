import { EphemeralKeyedStore } from "@shanzhai/ephemeral-keyed-store";

export const htmlHeaderStore = new EphemeralKeyedStore<Record<string, string>>(
  `htmlHeaderStore`
);

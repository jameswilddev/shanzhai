import { EphemeralKeyedStore } from "@shanzhai/ephemeral-keyed-store";

export const htmlHeaderStore = new EphemeralKeyedStore<string>(
  `htmlHeaderStore`
);

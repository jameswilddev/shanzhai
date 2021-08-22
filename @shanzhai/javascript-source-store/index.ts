import { EphemeralKeyedStore } from "@shanzhai/ephemeral-keyed-store";

export const javascriptSourceStore = new EphemeralKeyedStore<string>(
  `javascriptSourceStore`
);

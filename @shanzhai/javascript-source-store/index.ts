import { EphemeralUnkeyedStore } from "@shanzhai/ephemeral-unkeyed-store";

export const javascriptSourceStore = new EphemeralUnkeyedStore<string>(
  `javascriptSourceStore`
);

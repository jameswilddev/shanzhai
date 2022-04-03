import { EphemeralUnkeyedStore } from "@shanzhai/ephemeral-unkeyed-store";

export const faviconsOptionsSourceStore = new EphemeralUnkeyedStore<string>(
  `faviconsOptionsSourceStore`
);

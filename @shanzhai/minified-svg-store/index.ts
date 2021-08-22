import { EphemeralKeyedStore } from "@shanzhai/ephemeral-keyed-store";

export const minifiedSvgStore = new EphemeralKeyedStore<string>(
  `minifiedSvgStore`
);

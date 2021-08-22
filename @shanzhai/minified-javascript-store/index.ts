import { EphemeralKeyedStore } from "@shanzhai/ephemeral-keyed-store";

export const minifiedJavascriptStore = new EphemeralKeyedStore<string>(
  `minifiedJavascriptStore`
);

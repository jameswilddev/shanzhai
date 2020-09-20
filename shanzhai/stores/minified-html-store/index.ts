import { KeyValueStore } from "../key-value-store";

export const minifiedHtmlStore = new KeyValueStore<string, string>(
  `minifiedHtmlStore`
);

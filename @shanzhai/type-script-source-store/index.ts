import { KeyValueStore } from "@shanzhai/key-value-store";

export const typeScriptSourceStore = new KeyValueStore<string, string>(
  `typeScriptSourceStore`
);

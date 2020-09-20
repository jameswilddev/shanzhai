import { KeyValueStore } from "@shanzhai/key-value-store";

export const readTextFileStore = new KeyValueStore<string, string>(
  `readTextFileStore`
);

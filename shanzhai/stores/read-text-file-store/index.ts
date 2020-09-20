import { KeyValueStore } from "../key-value-store";

export const readTextFileStore = new KeyValueStore<string, string>(
  `readTextFileStore`
);

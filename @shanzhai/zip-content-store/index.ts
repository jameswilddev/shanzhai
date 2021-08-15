import { KeyValueStore } from "@shanzhai/key-value-store";

export const zipContentStore = new KeyValueStore<string | Buffer>(
  `zipContentStore`
);

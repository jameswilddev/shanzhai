import * as pug from "pug";
import { KeyValueStore } from "@shanzhai/key-value-store";

export const parsedPugStore = new KeyValueStore<pug.compileTemplate>(
  `parsedPugStore`
);

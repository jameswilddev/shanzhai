import * as pug from "pug";
import { KeyValueStore } from "../key-value-store";

export const parsedPugStore = new KeyValueStore<string, pug.compileTemplate>(
  `parsedPugStore`
);

export const renderedPugStore = new KeyValueStore<string, string>(
  `renderedPugStore`
);

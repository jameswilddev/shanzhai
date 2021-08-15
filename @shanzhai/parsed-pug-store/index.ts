import * as pug from "pug";
import { ValueStore } from "@shanzhai/value-store";

export const parsedPugStore = new ValueStore<pug.compileTemplate>(
  `parsedPugStore`
);

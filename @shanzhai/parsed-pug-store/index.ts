import * as pug from "pug";
import { EphemeralKeyedStore } from "@shanzhai/ephemeral-keyed-store";

export const parsedPugStore = new EphemeralKeyedStore<pug.compileTemplate>(
  `parsedPugStore`
);

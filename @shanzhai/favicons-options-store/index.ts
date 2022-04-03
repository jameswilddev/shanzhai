import * as favicons from "favicons";
import { EphemeralUnkeyedStore } from "@shanzhai/ephemeral-unkeyed-store";

export const faviconsOptionsStore =
  new EphemeralUnkeyedStore<favicons.FaviconOptions>(`faviconsOptionsStore`);

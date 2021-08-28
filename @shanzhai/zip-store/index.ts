import { EphemeralUnkeyedStore } from "@shanzhai/ephemeral-unkeyed-store";

/**
 * Stores the zipped distributable, ephemerally.
 */
export const zipStore = new EphemeralUnkeyedStore<Buffer>(`zipStore`);

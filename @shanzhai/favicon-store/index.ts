import { EphemeralUnkeyedStore } from "@shanzhai/ephemeral-unkeyed-store";

export const faviconStore = new EphemeralUnkeyedStore<Buffer>(`faviconStore`);

import { EphemeralUnkeyedStore } from "@shanzhai/ephemeral-unkeyed-store";

export const zipStore = new EphemeralUnkeyedStore<Buffer>(`zipStore`);

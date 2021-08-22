import { EphemeralKeyedStore } from "@shanzhai/ephemeral-keyed-store";

export const pugSourceStore = new EphemeralKeyedStore<string>(`pugSourceStore`);

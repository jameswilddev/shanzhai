import { EphemeralKeyedStore } from "@shanzhai/ephemeral-keyed-store";

export const svgSourceStore = new EphemeralKeyedStore<string>(`svgSourceStore`);

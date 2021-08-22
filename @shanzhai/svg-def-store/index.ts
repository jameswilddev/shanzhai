import { EphemeralKeyedStore } from "@shanzhai/ephemeral-keyed-store";

export const svgDefStore = new EphemeralKeyedStore<string>(`svgDefStore`);

import { EphemeralKeyedStore } from "@shanzhai/ephemeral-keyed-store";

export const zipContentStore = new EphemeralKeyedStore<
  Record<string, string | Buffer>
>(`zipContentStore`);

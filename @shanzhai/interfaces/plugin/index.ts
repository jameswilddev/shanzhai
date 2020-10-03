import { Trigger } from "../trigger";

export type Plugin<T extends { readonly [name: string]: Trigger }> = {
  readonly triggers: T;
};

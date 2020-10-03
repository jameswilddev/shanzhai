import { Trigger } from "../trigger";

export type Plugin = {
  readonly triggers: ReadonlyArray<Trigger>;
};

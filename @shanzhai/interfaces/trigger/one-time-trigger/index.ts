import { Step } from "../../step";

export type OneTimeTrigger = {
  readonly type: `oneTime`;

  up(): Step;
};

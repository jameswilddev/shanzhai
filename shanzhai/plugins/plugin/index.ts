import { ParsedPath } from "../../change-tracking/parsed-path";
import { Step } from "../../steps/step";

export type Plugin = {
  readonly perFile: null | {
    readonly extension: string;

    down(path: ParsedPath, regeneratedByEvent: boolean): ReadonlyArray<Step>;
    up(path: ParsedPath, regeneratedByEvent: boolean): ReadonlyArray<Step>;

    readonly regeneratesOnEvents: ReadonlyArray<string>;
    readonly raisesEvents: ReadonlyArray<string>;
  };

  readonly aggregation: null | {
    readonly down: ReadonlyArray<Step>;
    readonly up: ReadonlyArray<Step>;

    readonly regeneratesOnEvents: ReadonlyArray<string>;
    readonly raisesEvents: ReadonlyArray<string>;
  };
};

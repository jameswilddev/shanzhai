import { ParsedPath } from "../../parsed-path";
import { Step } from "../../step";

export type FileTrigger = {
  readonly type: `file`;

  readonly path: ReadonlyArray<string>;

  down(path: ParsedPath): Step;
  up(path: ParsedPath): Step;
};

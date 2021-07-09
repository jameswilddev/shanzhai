import { ParsedPath } from "../../parsed-path";
import { Step } from "../../step";

export type FileTrigger = {
  readonly type: `file`;

  readonly extension: string;

  down(path: ParsedPath): Step;
  up(path: ParsedPath): Step;
};

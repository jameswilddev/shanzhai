import { ParsedPath } from "../../parsed-path";
import { Step } from "../../step";
import { Store } from "../../store";

export type FileTrigger = {
  readonly type: `file`;

  readonly extension: string;
  readonly regeneratedByChangesToStore: Store;

  down(path: ParsedPath): Step;
  up(path: ParsedPath): Step;
};

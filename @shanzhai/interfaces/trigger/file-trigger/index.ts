import { ParsedPath } from "../../parsed-path";
import { Step } from "../../step";
import { Store } from "../../store";

export type FileTrigger = {
  readonly type: `file`;

  readonly extension: string;
  readonly regeneratedByChangesToStores: ReadonlyArray<Store>;

  down(path: ParsedPath): ReadonlyArray<Step>;
  up(path: ParsedPath): ReadonlyArray<Step>;
};

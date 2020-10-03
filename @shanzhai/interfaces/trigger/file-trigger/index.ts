import { ParsedPath } from "../../parsed-path";
import { Step } from "../../step";
import { Store } from "../../store";

export type FileTrigger = {
  readonly type: `file`;

  readonly extension: string;
  readonly regeneratedByChangesToStores: ReadonlyArray<Store>;

  down(path: ParsedPath): Promise<ReadonlyArray<Step>>;
  up(path: ParsedPath): Promise<ReadonlyArray<Step>>;
};

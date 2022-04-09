import { Plugin, FileTrigger, Step } from "@shanzhai/interfaces";
import { ReadTextFileStep } from "@shanzhai/read-text-file-step";
import { NopStep } from "@shanzhai/nop-step";
import { UnkeyedStoreSetOutput } from "@shanzhai/unkeyed-store-set-output";
import { faviconsOptionsSourceStore } from "@shanzhai/favicons-options-source-store";

const readFaviconsOptionsPlugin: Plugin<{
  readonly readFaviconsOptions: FileTrigger;
}> = {
  triggers: {
    readFaviconsOptions: {
      type: `file`,
      glob: `favicons-options.json`,
      down(): Step {
        return new NopStep(`Previous favicons options will be retained`);
      },
      up(path: string): Step {
        return new ReadTextFileStep(
          [`src`, path],
          new UnkeyedStoreSetOutput(faviconsOptionsSourceStore)
        );
      },
    },
  },
};

export = readFaviconsOptionsPlugin;

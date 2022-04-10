import { Plugin, FileTrigger, Step } from "@shanzhai/interfaces";
import { ReadTextFileStep } from "@shanzhai/read-text-file-step";
import { pugSourceStore } from "@shanzhai/pug-source-store";
import { DeleteFromKeyedStoreStep } from "@shanzhai/delete-from-keyed-store-step";
import { KeyedStoreSetOutput } from "@shanzhai/keyed-store-set-output";

const readPugFilesPlugin: Plugin<{
  readonly readPugFiles: FileTrigger;
}> = {
  triggers: {
    readPugFiles: {
      type: `file`,
      glob: `**/*.pug`,
      down(path: string): Step {
        return new DeleteFromKeyedStoreStep(pugSourceStore, path);
      },
      up(path: string): Step {
        return new ReadTextFileStep(
          [`src`, path],
          new KeyedStoreSetOutput(pugSourceStore, path)
        );
      },
      writesToStores: [pugSourceStore],
    },
  },
};

export = readPugFilesPlugin;

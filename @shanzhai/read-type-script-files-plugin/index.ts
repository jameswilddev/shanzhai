import { Plugin, FileTrigger, Step } from "@shanzhai/interfaces";
import { ReadTextFileStep } from "@shanzhai/read-text-file-step";
import { typeScriptSourceStore } from "@shanzhai/type-script-source-store";
import { DeleteFromKeyedStoreStep } from "@shanzhai/delete-from-keyed-store-step";
import { KeyedStoreSetOutput } from "@shanzhai/keyed-store-set-output";

const readTypeScriptFilesPlugin: Plugin<{
  readonly readTypeScriptFiles: FileTrigger;
}> = {
  triggers: {
    readTypeScriptFiles: {
      type: `file`,
      glob: `**/*.ts`,
      down(path: string): Step {
        return new DeleteFromKeyedStoreStep(typeScriptSourceStore, path);
      },
      up(path: string): Step {
        return new ReadTextFileStep(
          [`src`, path],
          new KeyedStoreSetOutput(typeScriptSourceStore, path)
        );
      },
      writesToStores: [typeScriptSourceStore],
    },
  },
};

export = readTypeScriptFilesPlugin;

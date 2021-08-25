import {
  Plugin,
  FileExtensionTrigger,
  ParsedPath,
  Step,
} from "@shanzhai/interfaces";
import { ReadTextFileStep } from "@shanzhai/read-text-file-step";
import { typeScriptSourceStore } from "@shanzhai/type-script-source-store";
import { DeleteFromKeyedStoreStep } from "@shanzhai/delete-from-keyed-store-step";
import { KeyedStoreSetOutput } from "@shanzhai/keyed-store-set-output";

const readTypeScriptFilesPlugin: Plugin<{
  readonly readTypeScriptFiles: FileExtensionTrigger;
}> = {
  triggers: {
    readTypeScriptFiles: {
      type: `fileExtension`,
      extension: `ts`,
      down(path: ParsedPath): Step {
        return new DeleteFromKeyedStoreStep(
          typeScriptSourceStore,
          path.fullPath
        );
      },
      up(path: ParsedPath): Step {
        return new ReadTextFileStep(
          [`src`, path.fullPath],
          new KeyedStoreSetOutput(typeScriptSourceStore, path.fullPath)
        );
      },
    },
  },
};

export = readTypeScriptFilesPlugin;

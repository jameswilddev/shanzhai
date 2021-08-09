import {
  Plugin,
  FileExtensionTrigger,
  ParsedPath,
  Step,
} from "@shanzhai/interfaces";
import {
  DeleteFromKeyValueStoreStep,
  KeyValueStoreOutput,
} from "@shanzhai/key-value-store";
import { ReadTextFileStep } from "@shanzhai/read-text-file-step";
import { typeScriptSourceStore } from "@shanzhai/type-script-source-store";

const readTypeScriptFilesPlugin: Plugin<{
  readonly readTypeScriptFiles: FileExtensionTrigger;
}> = {
  triggers: {
    readTypeScriptFiles: {
      type: `fileExtension`,
      extension: `ts`,
      down(path: ParsedPath): Step {
        return new DeleteFromKeyValueStoreStep(
          typeScriptSourceStore,
          path.fullPath
        );
      },
      up(path: ParsedPath): Step {
        return new ReadTextFileStep(
          [`src`, path.fullPath],
          new KeyValueStoreOutput(typeScriptSourceStore, path.fullPath)
        );
      },
    },
  },
};

export = readTypeScriptFilesPlugin;

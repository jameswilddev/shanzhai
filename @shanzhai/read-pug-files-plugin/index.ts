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
import { pugSourceStore } from "@shanzhai/pug-source-store";

const readPugFilesPlugin: Plugin<{
  readonly readPugFiles: FileExtensionTrigger;
}> = {
  triggers: {
    readPugFiles: {
      type: `fileExtension`,
      extension: `pug`,
      down(path: ParsedPath): Step {
        return new DeleteFromKeyValueStoreStep(pugSourceStore, path.fullPath);
      },
      up(path: ParsedPath): Step {
        return new ReadTextFileStep(
          [`src`, path.fullPath],
          new KeyValueStoreOutput(pugSourceStore, path.fullPath)
        );
      },
    },
  },
};

export = readPugFilesPlugin;

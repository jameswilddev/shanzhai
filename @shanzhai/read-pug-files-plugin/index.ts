import {
  Plugin,
  FileExtensionTrigger,
  ParsedPath,
  Step,
} from "@shanzhai/interfaces";
import { ReadTextFileStep } from "@shanzhai/read-text-file-step";
import { pugSourceStore } from "@shanzhai/pug-source-store";
import { DeleteFromKeyedStoreStep } from "@shanzhai/delete-from-keyed-store-step";
import { KeyedStoreSetOutput } from "@shanzhai/keyed-store-set-output";

const readPugFilesPlugin: Plugin<{
  readonly readPugFiles: FileExtensionTrigger;
}> = {
  triggers: {
    readPugFiles: {
      type: `fileExtension`,
      extension: `pug`,
      down(path: ParsedPath): Step {
        return new DeleteFromKeyedStoreStep(pugSourceStore, path.fullPath);
      },
      up(path: ParsedPath): Step {
        return new ReadTextFileStep(
          [`src`, path.fullPath],
          new KeyedStoreSetOutput(pugSourceStore, path.fullPath)
        );
      },
    },
  },
};

export = readPugFilesPlugin;

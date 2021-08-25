import {
  Plugin,
  FileExtensionTrigger,
  ParsedPath,
  Step,
} from "@shanzhai/interfaces";
import { ReadTextFileStep } from "@shanzhai/read-text-file-step";
import { svgSourceStore } from "@shanzhai/svg-source-store";
import { DeleteFromKeyedStoreStep } from "@shanzhai/delete-from-keyed-store-step";
import { KeyedStoreSetOutput } from "@shanzhai/keyed-store-set-output";

const readSvgFilesPlugin: Plugin<{
  readonly readSvgFiles: FileExtensionTrigger;
}> = {
  triggers: {
    readSvgFiles: {
      type: `fileExtension`,
      extension: `svg`,
      down(path: ParsedPath): Step {
        return new DeleteFromKeyedStoreStep(svgSourceStore, path.fullPath);
      },
      up(path: ParsedPath): Step {
        return new ReadTextFileStep(
          [`src`, path.fullPath],
          new KeyedStoreSetOutput(svgSourceStore, path.fullPath)
        );
      },
    },
  },
};

export = readSvgFilesPlugin;

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
import { svgSourceStore } from "@shanzhai/svg-source-store";

const readSvgFilesPlugin: Plugin<{
  readonly readSvgFiles: FileExtensionTrigger;
}> = {
  triggers: {
    readSvgFiles: {
      type: `fileExtension`,
      extension: `svg`,
      down(path: ParsedPath): Step {
        return new DeleteFromKeyValueStoreStep(svgSourceStore, path.fullPath);
      },
      up(path: ParsedPath): Step {
        return new ReadTextFileStep(
          [`src`, path.fullPath],
          new KeyValueStoreOutput(svgSourceStore, path.fullPath)
        );
      },
    },
  },
};

export = readSvgFilesPlugin;

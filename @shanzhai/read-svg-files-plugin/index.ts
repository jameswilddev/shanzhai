import { Plugin, FileTrigger, Step } from "@shanzhai/interfaces";
import { ReadTextFileStep } from "@shanzhai/read-text-file-step";
import { svgSourceStore } from "@shanzhai/svg-source-store";
import { DeleteFromKeyedStoreStep } from "@shanzhai/delete-from-keyed-store-step";
import { KeyedStoreSetOutput } from "@shanzhai/keyed-store-set-output";

const readSvgFilesPlugin: Plugin<{
  readonly readSvgFiles: FileTrigger;
}> = {
  triggers: {
    readSvgFiles: {
      type: `file`,
      glob: `**/*.svg`,
      down(path: string): Step {
        return new DeleteFromKeyedStoreStep(svgSourceStore, path);
      },
      up(path: string): Step {
        return new ReadTextFileStep(
          [`src`, path],
          new KeyedStoreSetOutput(svgSourceStore, path)
        );
      },
    },
  },
};

export = readSvgFilesPlugin;

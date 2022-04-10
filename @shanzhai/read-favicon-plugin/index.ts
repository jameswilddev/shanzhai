import { Plugin, FileTrigger, Step } from "@shanzhai/interfaces";
import { ReadBinaryFileStep } from "@shanzhai/read-binary-file-step";
import { NopStep } from "@shanzhai/nop-step";
import { UnkeyedStoreSetOutput } from "@shanzhai/unkeyed-store-set-output";
import { faviconStore } from "@shanzhai/favicon-store";

const readFaviconPlugin: Plugin<{
  readonly readFavicon: FileTrigger;
}> = {
  triggers: {
    readFavicon: {
      type: `file`,
      glob: `favicon.*`,
      down(): Step {
        return new NopStep(`Previous favicon will be retained`);
      },
      up(path: string): Step {
        return new ReadBinaryFileStep(
          [`src`, path],
          new UnkeyedStoreSetOutput(faviconStore)
        );
      },
      writesToStores: [faviconStore],
    },
  },
};

export = readFaviconPlugin;

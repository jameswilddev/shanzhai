import { Plugin, KeyedStoreTrigger, Step } from "@shanzhai/interfaces";
import { zipContentStore } from "@shanzhai/zip-content-store";
import { WriteFileStep } from "@shanzhai/write-file-step";
import { DeleteStep } from "@shanzhai/delete-step";
import { KeyValueStoreInput } from "@shanzhai/key-value-store";

const outputZipContentPlugin: Plugin<{
  readonly outputZipContent: KeyedStoreTrigger;
}> = {
  triggers: {
    outputZipContent: {
      type: `keyedStore`,
      keyedStore: zipContentStore,
      down(key: string): Step {
        return new DeleteStep(`Delete previously output zip content "${key}"`, [
          `dist`,
          `content`,
          key,
        ]);
      },
      up(key: string): Step {
        return new WriteFileStep(
          `Output zip content "${key}"`,
          [`dist`, `content`, key],
          new KeyValueStoreInput(zipContentStore, key)
        );
      },
    },
  },
};

export = outputZipContentPlugin;

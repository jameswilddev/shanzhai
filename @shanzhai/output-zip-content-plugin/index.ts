import { Plugin, KeyedStoreTrigger, Step } from "@shanzhai/interfaces";
import { zipContentStore } from "@shanzhai/zip-content-store";
import { WriteFileStep } from "@shanzhai/write-file-step";
import { DeleteStep } from "@shanzhai/delete-step";
import { KeyedStoreGetInput } from "@shanzhai/keyed-store-get-input";
import { SerialStep } from "@shanzhai/serial-step";
import { CreateDirectoryStep } from "@shanzhai/create-directory-step";

function splitKey(key: string): ReadonlyArray<string> {
  return key.split(/[\\/]/);
}

const outputZipContentPlugin: Plugin<{
  readonly outputZipContent: KeyedStoreTrigger;
}> = {
  triggers: {
    outputZipContent: {
      type: `keyedStore`,
      keyedStore: zipContentStore,
      refreshAllWhenStoresChange: [],
      down(key: string): Step {
        return new DeleteStep(`Delete previously output zip content "${key}"`, [
          `dist`,
          `content`,
          ...splitKey(key),
        ]);
      },
      up(key: string): Step {
        const split = splitKey(key);
        const directory = split.slice(0, split.length - 1);
        return new SerialStep(`Output zip content "${key}"`, [
          new CreateDirectoryStep(`Create directory for "${key}"`, [
            `dist`,
            `content`,
            ...directory,
          ]),
          new WriteFileStep(
            `Output zip content "${key}"`,
            [`dist`, `content`, ...split],
            new KeyedStoreGetInput(zipContentStore, key)
          ),
        ]);
      },
      writesToStores: [],
    },
  },
};

export = outputZipContentPlugin;

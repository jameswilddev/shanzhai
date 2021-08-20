import { Plugin, UnkeyedStoreTrigger, Step } from "@shanzhai/interfaces";
import { zipStore } from "@shanzhai/zip-store";
import { WriteFileStep } from "@shanzhai/write-file-step";
import { ValueStoreInput } from "@shanzhai/value-store";
import { DeleteStep } from "@shanzhai/delete-step";

const outputZipPlugin: Plugin<{
  readonly outputZip: UnkeyedStoreTrigger;
}> = {
  triggers: {
    outputZip: {
      type: `unkeyedStore`,
      unkeyedStore: zipStore,
      down(): Step {
        return new DeleteStep(`Delete previously output zip`, [
          `dist`,
          `distributable.zip`,
        ]);
      },
      up(): Step {
        return new WriteFileStep(
          `Output zip`,
          [`dist`, `distributable.zip`],
          new ValueStoreInput(zipStore)
        );
      },
    },
  },
};

export = outputZipPlugin;

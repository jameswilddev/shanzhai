import { Plugin, UnkeyedStoreTrigger, Step } from "@shanzhai/interfaces";
import { zipStore } from "@shanzhai/zip-store";
import { WriteFileStep } from "@shanzhai/write-file-step";
import { DeleteStep } from "@shanzhai/delete-step";
import { UnkeyedStoreGetInput } from "@shanzhai/unkeyed-store-get-input";
import { CreateDirectoryStep } from "@shanzhai/create-directory-step";
import { SerialStep } from "@shanzhai/serial-step";

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
        return new SerialStep(`Output zip`, [
          new CreateDirectoryStep(`Create "dist" directory`, [`dist`]),
          new WriteFileStep(
            `Output zip`,
            [`dist`, `distributable.zip`],
            new UnkeyedStoreGetInput(zipStore)
          ),
        ]);
      },
    },
  },
};

export = outputZipPlugin;

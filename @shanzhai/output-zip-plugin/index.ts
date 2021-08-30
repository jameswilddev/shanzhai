import { Plugin, StoreAggregateTrigger, Step } from "@shanzhai/interfaces";
import { zipStore } from "@shanzhai/zip-store";
import { WriteFileStep } from "@shanzhai/write-file-step";
import { UnkeyedStoreGetInput } from "@shanzhai/unkeyed-store-get-input";
import { CreateDirectoryStep } from "@shanzhai/create-directory-step";
import { SerialStep } from "@shanzhai/serial-step";

const outputZipPlugin: Plugin<{
  readonly outputZip: StoreAggregateTrigger;
}> = {
  triggers: {
    outputZip: {
      type: `storeAggregate`,
      stores: [zipStore],
      invalidated(): Step {
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

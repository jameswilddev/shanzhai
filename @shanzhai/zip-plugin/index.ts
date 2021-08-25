import { Plugin, StoreAggregateTrigger, Step } from "@shanzhai/interfaces";
import { zipContentStore } from "@shanzhai/zip-content-store";
import { SerialStep } from "@shanzhai/serial-step";
import { zipStore } from "@shanzhai/zip-store";
import { ZipStep } from "@shanzhai/zip-step";
import { DeleteFromUnkeyedStoreStep } from "@shanzhai/delete-from-unkeyed-store-step";
import { KeyedStoreGetAllInput } from "@shanzhai/keyed-store-get-all-input";
import { UnkeyedStoreSetOutput } from "@shanzhai/unkeyed-store-set-output";

const zipPlugin: Plugin<{
  readonly zip: StoreAggregateTrigger;
}> = {
  triggers: {
    zip: {
      type: `storeAggregate`,
      stores: [zipContentStore],
      invalidated(): Step {
        return new SerialStep(`Zip`, [
          new DeleteFromUnkeyedStoreStep(zipStore),
          new ZipStep(
            `Zip`,
            new KeyedStoreGetAllInput(zipContentStore),
            new UnkeyedStoreSetOutput(zipStore)
          ),
        ]);
      },
    },
  },
};

export = zipPlugin;

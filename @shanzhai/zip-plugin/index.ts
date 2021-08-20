import { Plugin, StoreAggregateTrigger, Step } from "@shanzhai/interfaces";
import { KeyValueStoreAllInput } from "@shanzhai/key-value-store";
import { zipContentStore } from "@shanzhai/zip-content-store";
import { SerialStep } from "@shanzhai/serial-step";
import {
  DeleteFromValueStoreStep,
  ValueStoreOutput,
} from "@shanzhai/value-store";
import { zipStore } from "@shanzhai/zip-store";
import { ZipStep } from "@shanzhai/zip-step";

const zipPlugin: Plugin<{
  readonly zip: StoreAggregateTrigger;
}> = {
  triggers: {
    zip: {
      type: `storeAggregate`,
      stores: [zipContentStore],
      invalidated(): Step {
        return new SerialStep(`Zip`, [
          new DeleteFromValueStoreStep(zipStore),
          new ZipStep(
            `Zip`,
            new KeyValueStoreAllInput(zipContentStore),
            new ValueStoreOutput(zipStore)
          ),
        ]);
      },
    },
  },
};

export = zipPlugin;

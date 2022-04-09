import { Plugin, StoreAggregateTrigger, Step } from "@shanzhai/interfaces";
import { zipContentStore } from "@shanzhai/zip-content-store";
import { zipStore } from "@shanzhai/zip-store";
import { ZipStep } from "@shanzhai/zip-step";
import { KeyedStoreGetAllInput } from "@shanzhai/keyed-store-get-all-input";
import { UnkeyedStoreSetOutput } from "@shanzhai/unkeyed-store-set-output";
import { MergeObjectInput } from "@shanzhai/merge-object-input";

const zipPlugin: Plugin<{
  readonly zip: StoreAggregateTrigger;
}> = {
  triggers: {
    zip: {
      type: `storeAggregate`,
      stores: [zipContentStore],
      invalidated(): Step {
        return new ZipStep(
          `Zip`,
          new MergeObjectInput(new KeyedStoreGetAllInput(zipContentStore)),
          new UnkeyedStoreSetOutput(zipStore)
        );
      },
    },
  },
};

export = zipPlugin;

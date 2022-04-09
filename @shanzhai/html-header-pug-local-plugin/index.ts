import { Step, Plugin, StoreAggregateTrigger } from "@shanzhai/interfaces";
import { htmlHeaderStore } from "@shanzhai/html-header-store";
import { pugLocalStore } from "@shanzhai/pug-local-store";
import { KeyedStoreSetOutput } from "@shanzhai/keyed-store-set-output";
import { ConcatenateObjectValuesInput } from "@shanzhai/concatenate-object-values-input";
import { CopyStep } from "@shanzhai/copy-step";
import { WrapInObjectOutput } from "@shanzhai/wrap-in-object-output";
import { KeyedStoreGetAllInput } from "@shanzhai/keyed-store-get-all-input";

const htmlHeaderPugLocalPlugin: Plugin<{
  readonly htmlHeaderPugLocal: StoreAggregateTrigger;
}> = {
  triggers: {
    htmlHeaderPugLocal: {
      type: `storeAggregate`,
      stores: [htmlHeaderStore],
      invalidated(): Step {
        return new CopyStep(
          `Copy HTML headers to Pug locals`,
          new ConcatenateObjectValuesInput(
            new KeyedStoreGetAllInput(htmlHeaderStore)
          ),
          new WrapInObjectOutput(
            `headers`,
            new KeyedStoreSetOutput(pugLocalStore, `htmlHeaderPugLocalPlugin`)
          )
        );
      },
    },
  },
};

export = htmlHeaderPugLocalPlugin;

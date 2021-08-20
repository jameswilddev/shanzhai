import { Plugin, StoreAggregateTrigger, Step } from "@shanzhai/interfaces";
import {
  DeleteFromKeyValueStoreStep,
  KeyValueStoreOutput,
  KeyValueStoreAllInput,
} from "@shanzhai/key-value-store";
import { SerialStep } from "@shanzhai/serial-step";
import { ParallelStep } from "@shanzhai/parallel-step";
import { CollectSvgDefsStep } from "@shanzhai/collect-svg-defs-step";
import { svgDefStore } from "@shanzhai/svg-def-store";
import { typeScriptSourceStore } from "@shanzhai/type-script-source-store";
import { pugLocalStore } from "@shanzhai/pug-local-store";
import { typeScriptGlobalStore } from "@shanzhai/type-script-global-store";
import { WrapInObjectOutput } from "@shanzhai/wrap-in-object-output";

const collectSvgDefsPlugin: Plugin<{
  readonly collectSvgDefs: StoreAggregateTrigger;
}> = {
  triggers: {
    collectSvgDefs: {
      type: `storeAggregate`,
      stores: [svgDefStore],
      invalidated(): Step {
        return new SerialStep(`Collect SVG defs`, [
          new ParallelStep(`Delete previous outputs`, [
            new DeleteFromKeyValueStoreStep(
              typeScriptSourceStore,
              `temp/collect-svg-defs-plugin.ts`
            ),
            new DeleteFromKeyValueStoreStep(
              typeScriptGlobalStore,
              `collect-svg-defs-plugin`
            ),
            new DeleteFromKeyValueStoreStep(
              pugLocalStore,
              `collect-svg-defs-plugin-`
            ),
          ]),
          new CollectSvgDefsStep(
            new KeyValueStoreAllInput(svgDefStore),
            new KeyValueStoreOutput(
              typeScriptSourceStore,
              `temp/collect-svg-defs-plugin.ts`
            ),
            new KeyValueStoreOutput(
              typeScriptGlobalStore,
              `collect-svg-defs-plugin`
            ),
            new WrapInObjectOutput(
              `collectSvgDefsPluginSvg`,
              new KeyValueStoreOutput(pugLocalStore, `collect-svg-defs-plugin`)
            )
          ),
        ]);
      },
    },
  },
};

export = collectSvgDefsPlugin;

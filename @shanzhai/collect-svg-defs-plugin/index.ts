import { Plugin, StoreAggregateTrigger, Step } from "@shanzhai/interfaces";
import {
  DeleteFromKeyValueStoreStep,
  KeyValueStoreOutput,
  KeyValueStoreAllInput,
} from "@shanzhai/key-value-store";
import { SerialStep } from "@shanzhai/serial-step";
import { DeleteFromValueStoreStep } from "@shanzhai/value-store";
import { ParallelStep } from "@shanzhai/parallel-step";
import { globalStore } from "@shanzhai/global-store";
import { collectedSvgDefStore } from "@shanzhai/collected-svg-def-store";
import { CollectSvgDefsStep } from "@shanzhai/collect-svg-defs-step";
import { svgDefStore } from "@shanzhai/svg-def-store";
import { typeScriptSourceStore } from "@shanzhai/type-script-source-store";
import { ValueStoreOutput } from "@shanzhai/value-store";

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
              globalStore,
              `collect-svg-defs-plugin`
            ),
            new DeleteFromValueStoreStep(collectedSvgDefStore),
          ]),
          new CollectSvgDefsStep(
            new KeyValueStoreAllInput(svgDefStore),
            new KeyValueStoreOutput(
              typeScriptSourceStore,
              `temp/collect-svg-defs-plugin.ts`
            ),
            new KeyValueStoreOutput(globalStore, `collect-svg-defs-plugin`),
            new ValueStoreOutput(collectedSvgDefStore)
          ),
        ]);
      },
    },
  },
};

export = collectSvgDefsPlugin;

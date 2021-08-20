import { Step } from "@shanzhai/interfaces";
import { DeleteFromKeyValueStoreStep } from "@shanzhai/key-value-store";
import { svgDefStore } from "@shanzhai/svg-def-store";
import { typeScriptSourceStore } from "@shanzhai/type-script-source-store";
import { CollectSvgDefsStep } from "@shanzhai/collect-svg-defs-step";
import { KeyValueStoreOutput } from "@shanzhai/key-value-store";
import { KeyValueStoreAllInput } from "@shanzhai/key-value-store";
import { ParallelStep } from "@shanzhai/parallel-step";
import { SerialStep } from "@shanzhai/serial-step";
import { pugLocalStore } from "@shanzhai/pug-local-store";
import { typeScriptGlobalStore } from "@shanzhai/type-script-global-store";
import { WrapInObjectOutput } from "@shanzhai/wrap-in-object-output";
import collectSvgDefsPlugin = require(".");

describe(`collect-svg-defs-plugin`, () => {
  it(`listens for changes to SVG defs`, () => {
    expect(collectSvgDefsPlugin.triggers.collectSvgDefs.stores).toEqual([
      svgDefStore,
    ]);
  });

  describe(`when SVG defs change`, () => {
    let step: Step;

    beforeAll(() => {
      step = collectSvgDefsPlugin.triggers.collectSvgDefs.invalidated();
    });

    it(`collects the defs`, () => {
      expect(step).toEqual(
        new SerialStep(`Collect SVG defs`, [
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
        ])
      );
    });
  });
});

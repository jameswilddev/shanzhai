import { Step } from "@shanzhai/interfaces";
import { svgDefStore } from "@shanzhai/svg-def-store";
import { typeScriptSourceStore } from "@shanzhai/type-script-source-store";
import { CollectSvgDefsStep } from "@shanzhai/collect-svg-defs-step";
import { ParallelStep } from "@shanzhai/parallel-step";
import { SerialStep } from "@shanzhai/serial-step";
import { pugLocalStore } from "@shanzhai/pug-local-store";
import { typeScriptGlobalStore } from "@shanzhai/type-script-global-store";
import { WrapInObjectOutput } from "@shanzhai/wrap-in-object-output";
import { DeleteFromKeyedStoreStep } from "@shanzhai/delete-from-keyed-store-step";
import { KeyedStoreGetAllInput } from "@shanzhai/keyed-store-get-all-input";
import { KeyedStoreSetOutput } from "@shanzhai/keyed-store-set-output";
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
            new DeleteFromKeyedStoreStep(
              typeScriptSourceStore,
              `temp/collect-svg-defs-plugin.ts`
            ),
            new DeleteFromKeyedStoreStep(
              typeScriptGlobalStore,
              `collect-svg-defs-plugin`
            ),
            new DeleteFromKeyedStoreStep(
              pugLocalStore,
              `collect-svg-defs-plugin-`
            ),
          ]),
          new CollectSvgDefsStep(
            new KeyedStoreGetAllInput(svgDefStore),
            new KeyedStoreSetOutput(
              typeScriptSourceStore,
              `temp/collect-svg-defs-plugin.ts`
            ),
            new KeyedStoreSetOutput(
              typeScriptGlobalStore,
              `collect-svg-defs-plugin`
            ),
            new WrapInObjectOutput(
              `collectSvgDefsPluginSvg`,
              new KeyedStoreSetOutput(pugLocalStore, `collect-svg-defs-plugin`)
            )
          ),
        ])
      );
    });
  });
});

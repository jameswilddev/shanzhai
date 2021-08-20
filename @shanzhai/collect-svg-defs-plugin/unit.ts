import { Step } from "@shanzhai/interfaces";
import { DeleteFromKeyValueStoreStep } from "@shanzhai/key-value-store";
import { svgDefStore } from "@shanzhai/svg-def-store";
import { typeScriptSourceStore } from "@shanzhai/type-script-source-store";
import { DeleteFromValueStoreStep } from "@shanzhai/value-store";
import { CollectSvgDefsStep } from "@shanzhai/collect-svg-defs-step";
import { collectedSvgDefStore } from "@shanzhai/collected-svg-def-store";
import { globalStore } from "@shanzhai/global-store";
import { KeyValueStoreOutput } from "@shanzhai/key-value-store";
import { KeyValueStoreAllInput } from "@shanzhai/key-value-store";
import { ParallelStep } from "@shanzhai/parallel-step";
import { SerialStep } from "@shanzhai/serial-step";
import { ValueStoreOutput } from "@shanzhai/value-store";
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
        ])
      );
    });
  });
});

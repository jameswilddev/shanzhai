import { Step } from "@shanzhai/interfaces";
import { svgSourceStore } from "@shanzhai/svg-source-store";
import { MinifySvgStep } from "@shanzhai/minify-svg-step";
import { minifiedSvgStore } from "@shanzhai/minified-svg-store";
import { DeleteFromKeyedStoreStep } from "@shanzhai/delete-from-keyed-store-step";
import { KeyedStoreGetInput } from "@shanzhai/keyed-store-get-input";
import { KeyedStoreSetOutput } from "@shanzhai/keyed-store-set-output";
import minifySvgPlugin = require(".");

describe(`minify-svg-plugin`, () => {
  it(`is triggered by the SVG source store`, () => {
    expect(minifySvgPlugin.triggers.minifySvg.keyedStore).toBe(svgSourceStore);
  });

  it(`does not refresh all when other stores change`, () => {
    expect(
      minifySvgPlugin.triggers.minifySvg.refreshAllWhenStoresChange
    ).toEqual([]);
  });

  describe(`when SVG source is removed`, () => {
    let step: Step;

    beforeAll(() => {
      step = minifySvgPlugin.triggers.minifySvg.down(`Test Key`);
    });

    it(`deletes the minified SVG from the store`, () => {
      expect(step).toEqual(
        new DeleteFromKeyedStoreStep(minifiedSvgStore, `Test Key`)
      );
    });
  });

  describe(`when SVG source is added`, () => {
    let step: Step;

    beforeAll(() => {
      step = minifySvgPlugin.triggers.minifySvg.up(`Test Key`);
    });

    it(`minifies the SVG`, () => {
      expect(step).toEqual(
        new MinifySvgStep(
          `Test Key`,
          new KeyedStoreGetInput(svgSourceStore, `Test Key`),
          new KeyedStoreSetOutput(minifiedSvgStore, `Test Key`)
        )
      );
    });
  });
});

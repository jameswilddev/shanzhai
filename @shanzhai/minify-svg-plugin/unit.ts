import { Step } from "@shanzhai/interfaces";
import { DeleteFromKeyValueStoreStep } from "@shanzhai/key-value-store";
import { svgSourceStore } from "@shanzhai/svg-source-store";
import { MinifySvgStep } from "@shanzhai/minify-svg-step";
import {
  KeyValueStoreInput,
  KeyValueStoreOutput,
} from "@shanzhai/key-value-store";
import { minifiedSvgStore } from "@shanzhai/minified-svg-store";
import minifySvgPlugin = require(".");

describe(`minify-svg-plugin`, () => {
  it(`is triggered by the SVG source store`, () => {
    expect(minifySvgPlugin.triggers.minifySvg.keyedStore).toBe(svgSourceStore);
  });

  describe(`when SVG source is removed`, () => {
    let step: Step;

    beforeAll(() => {
      step = minifySvgPlugin.triggers.minifySvg.down(`Test Key`);
    });

    it(`deletes the minified SVG from the store`, () => {
      expect(step).toEqual(
        new DeleteFromKeyValueStoreStep(minifiedSvgStore, `Test Key`)
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
          new KeyValueStoreInput(svgSourceStore, `Test Key`),
          new KeyValueStoreOutput(minifiedSvgStore, `Test Key`)
        )
      );
    });
  });
});

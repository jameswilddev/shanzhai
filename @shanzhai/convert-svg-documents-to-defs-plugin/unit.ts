import { Step } from "@shanzhai/interfaces";
import { minifiedSvgStore } from "@shanzhai/minified-svg-store";
import { DeleteFromKeyedStoreStep } from "@shanzhai/delete-from-keyed-store-step";
import { KeyedStoreGetInput } from "@shanzhai/keyed-store-get-input";
import { KeyedStoreSetOutput } from "@shanzhai/keyed-store-set-output";
import { ConvertSvgDocumentToDefStep } from "@shanzhai/convert-svg-document-to-def-step";
import { svgDefStore } from "@shanzhai/svg-def-store";
import minifySvgPlugin = require(".");

describe(`convert-svg-documents-to-defs-plugin`, () => {
  it(`is triggered by the minified SVG store`, () => {
    expect(minifySvgPlugin.triggers.convertSvgDocumentsToDefs.keyedStore).toBe(
      minifiedSvgStore
    );
  });

  describe(`when SVG source is removed`, () => {
    let step: Step;

    beforeAll(() => {
      step =
        minifySvgPlugin.triggers.convertSvgDocumentsToDefs.down(`Test Key`);
    });

    it(`deletes the converted def from the store`, () => {
      expect(step).toEqual(
        new DeleteFromKeyedStoreStep(svgDefStore, `Test Key`)
      );
    });
  });

  describe(`when SVG source is added`, () => {
    let step: Step;

    beforeAll(() => {
      step = minifySvgPlugin.triggers.convertSvgDocumentsToDefs.up(`Test Key`);
    });

    it(`minifies the SVG`, () => {
      expect(step).toEqual(
        new ConvertSvgDocumentToDefStep(
          new KeyedStoreGetInput(minifiedSvgStore, `Test Key`),
          new KeyedStoreSetOutput(svgDefStore, `Test Key`)
        )
      );
    });
  });
});

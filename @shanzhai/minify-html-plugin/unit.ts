import { Step } from "@shanzhai/interfaces";
import { htmlSourceStore } from "@shanzhai/html-source-store";
import { MinifyHtmlStep } from "@shanzhai/minify-html-step";
import { zipContentStore } from "@shanzhai/zip-content-store";
import { DeleteFromKeyedStoreStep } from "@shanzhai/delete-from-keyed-store-step";
import { KeyedStoreGetInput } from "@shanzhai/keyed-store-get-input";
import { KeyedStoreSetOutput } from "@shanzhai/keyed-store-set-output";
import minifyHtmlPlugin = require(".");

describe(`minify-html-plugin`, () => {
  it(`is triggered by the HTML source store`, () => {
    expect(minifyHtmlPlugin.triggers.minifyHtml.keyedStore).toBe(
      htmlSourceStore
    );
  });

  describe(`when HTML source is removed`, () => {
    let step: Step;

    beforeAll(() => {
      step = minifyHtmlPlugin.triggers.minifyHtml.down(`Test Key`);
    });

    it(`deletes the minified HTML from the store`, () => {
      expect(step).toEqual(
        new DeleteFromKeyedStoreStep(zipContentStore, `Test Key`)
      );
    });
  });

  describe(`when HTML source is added`, () => {
    let step: Step;

    beforeAll(() => {
      step = minifyHtmlPlugin.triggers.minifyHtml.up(`Test Key`);
    });

    it(`minifies the HTML`, () => {
      expect(step).toEqual(
        new MinifyHtmlStep(
          `Test Key`,
          new KeyedStoreGetInput(htmlSourceStore, `Test Key`),
          new KeyedStoreSetOutput(zipContentStore, `Test Key`)
        )
      );
    });
  });
});

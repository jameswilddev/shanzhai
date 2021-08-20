import { Step } from "@shanzhai/interfaces";
import { DeleteFromKeyValueStoreStep } from "@shanzhai/key-value-store";
import { htmlSourceStore } from "@shanzhai/html-source-store";
import { MinifyHtmlStep } from "@shanzhai/minify-html-step";
import {
  KeyValueStoreInput,
  KeyValueStoreOutput,
} from "@shanzhai/key-value-store";
import { minifiedHtmlStore } from "@shanzhai/minified-html-store";
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
        new DeleteFromKeyValueStoreStep(minifiedHtmlStore, `Test Key`)
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
          new KeyValueStoreInput(htmlSourceStore, `Test Key`),
          new KeyValueStoreOutput(minifiedHtmlStore, `Test Key`)
        )
      );
    });
  });
});

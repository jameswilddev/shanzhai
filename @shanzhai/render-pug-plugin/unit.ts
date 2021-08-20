import { Step } from "@shanzhai/interfaces";
import { DeleteFromKeyValueStoreStep } from "@shanzhai/key-value-store";
import { htmlSourceStore } from "@shanzhai/html-source-store";
import {
  KeyValueStoreInput,
  KeyValueStoreOutput,
  KeyValueStoreAllInput,
} from "@shanzhai/key-value-store";
import { parsedPugStore } from "@shanzhai/parsed-pug-store";
import { RenderPugStep } from "@shanzhai/render-pug-step";
import { MergeObjectInput } from "@shanzhai/merge-object-input";
import { pugLocalStore } from "@shanzhai/pug-local-store";
import readPugFilesPlugin = require(".");

describe(`render-pug-plugin`, () => {
  describe(`when parsed Pug is removed`, () => {
    let step: Step;

    beforeAll(() => {
      step = readPugFilesPlugin.triggers.renderPug.down(`Test Key`);
    });

    it(`deletes the rendered Pug from the store`, () => {
      expect(step).toEqual(
        new DeleteFromKeyValueStoreStep(htmlSourceStore, `Test Key`)
      );
    });
  });

  describe(`when parsed Pug is added`, () => {
    let step: Step;

    beforeAll(() => {
      step = readPugFilesPlugin.triggers.renderPug.up(`Test Key`);
    });

    it(`renders the Pug`, () => {
      expect(step).toEqual(
        new RenderPugStep(
          `Render Pug "Test Key"`,
          new KeyValueStoreInput(parsedPugStore, `Test Key`),
          new MergeObjectInput(new KeyValueStoreAllInput(pugLocalStore)),
          new KeyValueStoreOutput(htmlSourceStore, `Test Key`)
        )
      );
    });
  });
});

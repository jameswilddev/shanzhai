import { Step } from "@shanzhai/interfaces";
import { htmlSourceStore } from "@shanzhai/html-source-store";
import { parsedPugStore } from "@shanzhai/parsed-pug-store";
import { RenderPugStep } from "@shanzhai/render-pug-step";
import { MergeObjectInput } from "@shanzhai/merge-object-input";
import { pugLocalStore } from "@shanzhai/pug-local-store";
import { DeleteFromKeyedStoreStep } from "@shanzhai/delete-from-keyed-store-step";
import { KeyedStoreGetInput } from "@shanzhai/keyed-store-get-input";
import { KeyedStoreSetOutput } from "@shanzhai/keyed-store-set-output";
import { KeyedStoreGetAllInput } from "@shanzhai/keyed-store-get-all-input";
import readPugFilesPlugin = require(".");

describe(`render-pug-plugin`, () => {
  it(`uses the correct keyed store`, () => {
    expect(readPugFilesPlugin.triggers.renderPug.keyedStore).toBe(
      parsedPugStore
    );
  });

  it(`refreshes all when the locals change`, () => {
    expect(
      readPugFilesPlugin.triggers.renderPug.refreshAllWhenStoresChange
    ).toEqual([pugLocalStore]);
  });

  describe(`when parsed Pug is removed`, () => {
    let step: Step;

    beforeAll(() => {
      step = readPugFilesPlugin.triggers.renderPug.down(`Test Key`);
    });

    it(`deletes the rendered Pug from the store`, () => {
      expect(step).toEqual(
        new DeleteFromKeyedStoreStep(htmlSourceStore, `Test Key`)
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
          new KeyedStoreGetInput(parsedPugStore, `Test Key`),
          new MergeObjectInput(new KeyedStoreGetAllInput(pugLocalStore)),
          new KeyedStoreSetOutput(htmlSourceStore, `Test Key`)
        )
      );
    });
  });
});

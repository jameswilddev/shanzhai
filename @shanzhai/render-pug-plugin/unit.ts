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

  describe(`when parsed Pug without an extension is removed`, () => {
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

  describe(`when parsed Pug without an extension is added`, () => {
    let step: Step;

    beforeAll(() => {
      step = readPugFilesPlugin.triggers.renderPug.up(`Test Key`);
    });

    it(`renders the Pug`, () => {
      expect(step).toEqual(
        new RenderPugStep(
          `Render Pug "Test Key" as "Test Key"`,
          new KeyedStoreGetInput(parsedPugStore, `Test Key`),
          new MergeObjectInput(new KeyedStoreGetAllInput(pugLocalStore)),
          new KeyedStoreSetOutput(htmlSourceStore, `Test Key`)
        )
      );
    });
  });

  describe(`when parsed Pug with an unexpected extension is removed`, () => {
    let step: Step;

    beforeAll(() => {
      step = readPugFilesPlugin.triggers.renderPug.down(
        `test.pug.key.with.an.unexpected.extension`
      );
    });

    it(`deletes the rendered Pug from the store`, () => {
      expect(step).toEqual(
        new DeleteFromKeyedStoreStep(
          htmlSourceStore,
          `test.pug.key.with.an.unexpected.extension`
        )
      );
    });
  });

  describe(`when parsed Pug with an unexpected extension is added`, () => {
    let step: Step;

    beforeAll(() => {
      step = readPugFilesPlugin.triggers.renderPug.up(
        `test.pug.key.with.an.unexpected.extension`
      );
    });

    it(`renders the Pug`, () => {
      expect(step).toEqual(
        new RenderPugStep(
          `Render Pug "test.pug.key.with.an.unexpected.extension" as "test.pug.key.with.an.unexpected.extension"`,
          new KeyedStoreGetInput(
            parsedPugStore,
            `test.pug.key.with.an.unexpected.extension`
          ),
          new MergeObjectInput(new KeyedStoreGetAllInput(pugLocalStore)),
          new KeyedStoreSetOutput(
            htmlSourceStore,
            `test.pug.key.with.an.unexpected.extension`
          )
        )
      );
    });
  });

  describe(`when parsed Pug with the expected extension is removed`, () => {
    let step: Step;

    beforeAll(() => {
      step = readPugFilesPlugin.triggers.renderPug.down(
        `test.key.with.an.expected.extension.pug`
      );
    });

    it(`deletes the rendered Pug from the store`, () => {
      expect(step).toEqual(
        new DeleteFromKeyedStoreStep(
          htmlSourceStore,
          `test.key.with.an.expected.extension.html`
        )
      );
    });
  });

  describe(`when parsed Pug with the expected extension is added`, () => {
    let step: Step;

    beforeAll(() => {
      step = readPugFilesPlugin.triggers.renderPug.up(
        `test.key.with.an.expected.extension.pug`
      );
    });

    it(`renders the Pug`, () => {
      expect(step).toEqual(
        new RenderPugStep(
          `Render Pug "test.key.with.an.expected.extension.pug" as "test.key.with.an.expected.extension.html"`,
          new KeyedStoreGetInput(
            parsedPugStore,
            `test.key.with.an.expected.extension.pug`
          ),
          new MergeObjectInput(new KeyedStoreGetAllInput(pugLocalStore)),
          new KeyedStoreSetOutput(
            htmlSourceStore,
            `test.key.with.an.expected.extension.html`
          )
        )
      );
    });
  });

  describe(`when parsed Pug with a possibly confused extension is removed`, () => {
    let step: Step;

    beforeAll(() => {
      step = readPugFilesPlugin.triggers.renderPug.down(
        `test.key.with.a.possiblyconfusedextensionpug`
      );
    });

    it(`deletes the rendered Pug from the store`, () => {
      expect(step).toEqual(
        new DeleteFromKeyedStoreStep(
          htmlSourceStore,
          `test.key.with.a.possiblyconfusedextensionpug`
        )
      );
    });
  });

  describe(`when parsed Pug with a possibly confused extension is added`, () => {
    let step: Step;

    beforeAll(() => {
      step = readPugFilesPlugin.triggers.renderPug.up(
        `test.key.with.a.possiblyconfusedextensionpug`
      );
    });

    it(`renders the Pug`, () => {
      expect(step).toEqual(
        new RenderPugStep(
          `Render Pug "test.key.with.a.possiblyconfusedextensionpug" as "test.key.with.a.possiblyconfusedextensionpug"`,
          new KeyedStoreGetInput(
            parsedPugStore,
            `test.key.with.a.possiblyconfusedextensionpug`
          ),
          new MergeObjectInput(new KeyedStoreGetAllInput(pugLocalStore)),
          new KeyedStoreSetOutput(
            htmlSourceStore,
            `test.key.with.a.possiblyconfusedextensionpug`
          )
        )
      );
    });
  });
});

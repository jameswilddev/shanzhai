import { Step } from "@shanzhai/interfaces";
import { htmlHeaderStore } from "@shanzhai/html-header-store";
import { pugLocalStore } from "@shanzhai/pug-local-store";
import { KeyedStoreSetOutput } from "@shanzhai/keyed-store-set-output";
import { ConcatenateObjectValuesInput } from "@shanzhai/concatenate-object-values-input";
import { CopyStep } from "@shanzhai/copy-step";
import { WrapInObjectOutput } from "@shanzhai/wrap-in-object-output";
import { KeyedStoreGetAllInput } from "@shanzhai/keyed-store-get-all-input";
import htmlHeaderPugLocalPlugin = require(".");

describe(`html-header-pug-local-plugin`, () => {
  it(`is triggered by the expected stores`, () => {
    expect(htmlHeaderPugLocalPlugin.triggers.htmlHeaderPugLocal.stores).toEqual(
      [htmlHeaderStore]
    );
  });

  it(`advertises the stores it will write to`, () => {
    expect(
      htmlHeaderPugLocalPlugin.triggers.htmlHeaderPugLocal.writesToStores
    ).toEqual(jasmine.arrayWithExactContents([pugLocalStore]));
  });

  describe(`when the favicons options are set`, () => {
    let step: Step;

    beforeAll(() => {
      step = htmlHeaderPugLocalPlugin.triggers.htmlHeaderPugLocal.invalidated();
    });

    it(`copies the concatenated HTML headers to the Pug locals store`, () => {
      expect(step).toEqual(
        new CopyStep(
          `Copy HTML headers to Pug locals`,
          new ConcatenateObjectValuesInput(
            new KeyedStoreGetAllInput(htmlHeaderStore)
          ),
          new WrapInObjectOutput(
            `headers`,
            new KeyedStoreSetOutput(pugLocalStore, `htmlHeaderPugLocalPlugin`)
          )
        )
      );
    });
  });
});

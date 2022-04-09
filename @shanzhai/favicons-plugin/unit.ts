import { Step } from "@shanzhai/interfaces";
import { faviconStore } from "@shanzhai/favicon-store";
import { faviconsOptionsStore } from "@shanzhai/favicons-options-store";
import { KeyedStoreSetOutput } from "@shanzhai/keyed-store-set-output";
import { FaviconsStep } from "@shanzhai/favicons-step";
import { UnkeyedStoreGetInput } from "@shanzhai/unkeyed-store-get-input";
import { htmlHeaderStore } from "@shanzhai/html-header-store";
import { zipContentStore } from "@shanzhai/zip-content-store";
import faviconsPlugin = require(".");

describe(`favicons-plugin`, () => {
  it(`is triggered by the favicon and favicons options stores`, () => {
    expect(faviconsPlugin.triggers.favicons.stores).toEqual(
      jasmine.arrayWithExactContents([faviconStore, faviconsOptionsStore])
    );
  });

  describe(`when the stores change`, () => {
    let step: Step;

    beforeAll(() => {
      step = faviconsPlugin.triggers.favicons.invalidated();
    });

    it(`minifies the HTML`, () => {
      expect(step).toEqual(
        new FaviconsStep(
          `Favicons`,
          new UnkeyedStoreGetInput(faviconStore),
          new UnkeyedStoreGetInput(faviconsOptionsStore),
          new KeyedStoreSetOutput(htmlHeaderStore, `favicons`),
          new KeyedStoreSetOutput(zipContentStore, `favicons`)
        )
      );
    });
  });
});

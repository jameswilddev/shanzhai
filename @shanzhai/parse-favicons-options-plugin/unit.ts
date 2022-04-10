import { Step, UnkeyedStore, Json } from "@shanzhai/interfaces";
import { ParseJsonStep } from "@shanzhai/parse-json-step";
import { faviconsOptionsSourceStore } from "@shanzhai/favicons-options-source-store";
import { faviconsOptionsStore } from "@shanzhai/favicons-options-store";
import { UnkeyedStoreGetInput } from "@shanzhai/unkeyed-store-get-input";
import { UnkeyedStoreSetOutput } from "@shanzhai/unkeyed-store-set-output";
import parseFaviconsOptionsPlugin = require(".");

describe(`parse-favicons-options-plugin`, () => {
  it(`is triggered by the expected stores`, () => {
    expect(
      parseFaviconsOptionsPlugin.triggers.parseFaviconsOptions.stores
    ).toEqual([faviconsOptionsSourceStore]);
  });

  it(`advertises the stores it will write to`, () => {
    expect(
      parseFaviconsOptionsPlugin.triggers.parseFaviconsOptions.writesToStores
    ).toEqual(jasmine.arrayWithExactContents([faviconsOptionsStore]));
  });

  describe(`when the favicons options are set`, () => {
    let step: Step;

    beforeAll(() => {
      step =
        parseFaviconsOptionsPlugin.triggers.parseFaviconsOptions.invalidated();
    });

    it(`parses the favicons options`, () => {
      expect(step).toEqual(
        new ParseJsonStep(
          `Parse favicons options`,
          new UnkeyedStoreGetInput(faviconsOptionsSourceStore),
          new UnkeyedStoreSetOutput(
            faviconsOptionsStore as unknown as UnkeyedStore<Json>
          )
        )
      );
    });
  });
});

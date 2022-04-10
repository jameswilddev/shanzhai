import { Step } from "@shanzhai/interfaces";
import { ReadTextFileStep } from "@shanzhai/read-text-file-step";
import { NopStep } from "@shanzhai/nop-step";
import { UnkeyedStoreSetOutput } from "@shanzhai/unkeyed-store-set-output";
import { faviconsOptionsSourceStore } from "@shanzhai/favicons-options-source-store";
import readFaviconsOptionsPlugin = require(".");

describe(`read-favicons-options-plugin`, () => {
  it(`matches the favicons-options.json file`, () => {
    expect(readFaviconsOptionsPlugin.triggers.readFaviconsOptions.glob).toEqual(
      `favicons-options.json`
    );
  });

  it(`advertises the stores it will write to`, () => {
    expect(
      readFaviconsOptionsPlugin.triggers.readFaviconsOptions.writesToStores
    ).toEqual(jasmine.arrayWithExactContents([faviconsOptionsSourceStore]));
  });

  describe(`when a file is removed`, () => {
    let step: Step;

    beforeAll(() => {
      step =
        readFaviconsOptionsPlugin.triggers.readFaviconsOptions.down(
          `Test Full Path`
        );
    });

    it(`does nothing`, () => {
      expect(step).toEqual(
        new NopStep(`Previous favicons options will be retained`)
      );
    });
  });

  describe(`when a file is added`, () => {
    let step: Step;

    beforeAll(() => {
      step =
        readFaviconsOptionsPlugin.triggers.readFaviconsOptions.up(
          `Test Full Path`
        );
    });

    it(`reads the file into the store`, () => {
      expect(step).toEqual(
        new ReadTextFileStep(
          [`src`, `Test Full Path`],
          new UnkeyedStoreSetOutput(faviconsOptionsSourceStore)
        )
      );
    });
  });
});

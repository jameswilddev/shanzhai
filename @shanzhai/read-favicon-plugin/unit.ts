import { Step } from "@shanzhai/interfaces";
import { ReadBinaryFileStep } from "@shanzhai/read-binary-file-step";
import { NopStep } from "@shanzhai/nop-step";
import { UnkeyedStoreSetOutput } from "@shanzhai/unkeyed-store-set-output";
import { faviconStore } from "@shanzhai/favicon-store";
import readFaviconPlugin = require(".");

describe(`read-favicon-plugin`, () => {
  it(`matches the favicon file`, () => {
    expect(readFaviconPlugin.triggers.readFavicon.glob).toEqual(`favicon.*`);
  });

  describe(`when a file is removed`, () => {
    let step: Step;

    beforeAll(() => {
      step = readFaviconPlugin.triggers.readFavicon.down(`Test Full Path`);
    });

    it(`does nothing`, () => {
      expect(step).toEqual(new NopStep(`Previous favicon will be retained`));
    });
  });

  describe(`when a file is added`, () => {
    let step: Step;

    beforeAll(() => {
      step = readFaviconPlugin.triggers.readFavicon.up(`Test Full Path`);
    });

    it(`reads the file into the store`, () => {
      expect(step).toEqual(
        new ReadBinaryFileStep(
          [`src`, `Test Full Path`],
          new UnkeyedStoreSetOutput(faviconStore)
        )
      );
    });
  });
});

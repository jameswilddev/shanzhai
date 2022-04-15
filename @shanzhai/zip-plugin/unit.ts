import { Step } from "@shanzhai/interfaces";
import { zipContentStore } from "@shanzhai/zip-content-store";
import { zipStore } from "@shanzhai/zip-store";
import { ZipStep } from "@shanzhai/zip-step";
import { KeyedStoreGetAllInput } from "@shanzhai/keyed-store-get-all-input";
import { UnkeyedStoreSetOutput } from "@shanzhai/unkeyed-store-set-output";
import { MergeObjectInput } from "@shanzhai/merge-object-input";
import zipPlugin = require(".");

describe(`zip-plugin`, () => {
  it(`listens for changes to zip content`, () => {
    expect(zipPlugin.triggers.zip.stores).toEqual([zipContentStore]);
  });

  it(`advertises the stores it will write to`, () => {
    expect(
      expect(zipPlugin.triggers.zip.writesToStores).toEqual(
        jasmine.arrayWithExactContents([zipStore])
      )
    );
  });

  describe(`when SVG defs change`, () => {
    let step: Step;

    beforeAll(() => {
      step = zipPlugin.triggers.zip.invalidated();
    });

    it(`zips all content`, () => {
      expect(step).toEqual(
        new ZipStep(
          `Zip`,
          new MergeObjectInput(new KeyedStoreGetAllInput(zipContentStore)),
          new UnkeyedStoreSetOutput(zipStore)
        )
      );
    });
  });
});

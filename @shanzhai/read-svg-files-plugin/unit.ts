import { Step } from "@shanzhai/interfaces";
import { svgSourceStore } from "@shanzhai/svg-source-store";
import { ReadTextFileStep } from "@shanzhai/read-text-file-step";
import { DeleteFromKeyedStoreStep } from "@shanzhai/delete-from-keyed-store-step";
import { KeyedStoreSetOutput } from "@shanzhai/keyed-store-set-output";
import readSvgFilesPlugin = require(".");

describe(`read-svg-files-plugin`, () => {
  it(`matches *.svg files`, () => {
    expect(readSvgFilesPlugin.triggers.readSvgFiles.extension).toEqual(`svg`);
  });

  describe(`when a file is removed`, () => {
    let step: Step;

    beforeAll(() => {
      step = readSvgFilesPlugin.triggers.readSvgFiles.down({
        typeScriptName: `Test TypeScript Name`,
        fullPath: `Test Full Path`,
        fileExtension: `Test File Extension`,
        fullPathWithoutExtension: `Test Full Path Without Extension`,
      });
    });

    it(`deletes the read file from the store`, () => {
      expect(step).toEqual(
        new DeleteFromKeyedStoreStep(svgSourceStore, `Test Full Path`)
      );
    });
  });

  describe(`when a file is added`, () => {
    let step: Step;

    beforeAll(() => {
      step = readSvgFilesPlugin.triggers.readSvgFiles.up({
        typeScriptName: `Test TypeScript Name`,
        fullPath: `Test Full Path`,
        fileExtension: `Test File Extension`,
        fullPathWithoutExtension: `Test Full Path Without Extension`,
      });
    });

    it(`reads the file into the store`, () => {
      expect(step).toEqual(
        new ReadTextFileStep(
          [`src`, `Test Full Path`],
          new KeyedStoreSetOutput(svgSourceStore, `Test Full Path`)
        )
      );
    });
  });
});

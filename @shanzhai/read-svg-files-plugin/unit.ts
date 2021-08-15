import { Step } from "@shanzhai/interfaces";
import { DeleteFromKeyValueStoreStep } from "@shanzhai/key-value-store";
import { svgSourceStore } from "@shanzhai/svg-source-store";
import { ReadTextFileStep } from "@shanzhai/read-text-file-step";
import { KeyValueStoreOutput } from "@shanzhai/key-value-store";
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
        new DeleteFromKeyValueStoreStep(svgSourceStore, `Test Full Path`)
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
          new KeyValueStoreOutput(svgSourceStore, `Test Full Path`)
        )
      );
    });
  });
});

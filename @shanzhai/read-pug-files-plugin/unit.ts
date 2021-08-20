import { Step } from "@shanzhai/interfaces";
import { DeleteFromKeyValueStoreStep } from "@shanzhai/key-value-store";
import { pugSourceStore } from "@shanzhai/pug-source-store";
import { ReadTextFileStep } from "@shanzhai/read-text-file-step";
import { KeyValueStoreOutput } from "@shanzhai/key-value-store";
import readPugFilesPlugin = require(".");

describe(`read-pug-files-plugin`, () => {
  it(`matches *.pug files`, () => {
    expect(readPugFilesPlugin.triggers.readPugFiles.extension).toEqual(`pug`);
  });

  describe(`when a file is removed`, () => {
    let step: Step;

    beforeAll(() => {
      step = readPugFilesPlugin.triggers.readPugFiles.down({
        typeScriptName: `Test TypeScript Name`,
        fullPath: `Test Full Path`,
        fileExtension: `Test File Extension`,
        fullPathWithoutExtension: `Test Full Path Without Extension`,
      });
    });

    it(`deletes the read file from the store`, () => {
      expect(step).toEqual(
        new DeleteFromKeyValueStoreStep(pugSourceStore, `Test Full Path`)
      );
    });
  });

  describe(`when a file is added`, () => {
    let step: Step;

    beforeAll(() => {
      step = readPugFilesPlugin.triggers.readPugFiles.up({
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
          new KeyValueStoreOutput(pugSourceStore, `Test Full Path`)
        )
      );
    });
  });
});

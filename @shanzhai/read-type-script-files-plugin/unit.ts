import { Step } from "@shanzhai/interfaces";
import { typeScriptSourceStore } from "@shanzhai/type-script-source-store";
import { ReadTextFileStep } from "@shanzhai/read-text-file-step";
import { DeleteFromKeyedStoreStep } from "@shanzhai/delete-from-keyed-store-step";
import { KeyedStoreSetOutput } from "@shanzhai/keyed-store-set-output";
import readTypeScriptFilesPlugin = require(".");

describe(`read-type-script-files-plugin`, () => {
  it(`matches *.ts files`, () => {
    expect(
      readTypeScriptFilesPlugin.triggers.readTypeScriptFiles.extension
    ).toEqual(`ts`);
  });

  describe(`when a file is removed`, () => {
    let step: Step;

    beforeAll(() => {
      step = readTypeScriptFilesPlugin.triggers.readTypeScriptFiles.down({
        typeScriptName: `Test TypeScript Name`,
        fullPath: `Test Full Path`,
        fileExtension: `Test File Extension`,
        fullPathWithoutExtension: `Test Full Path Without Extension`,
      });
    });

    it(`deletes the read file from the store`, () => {
      expect(step).toEqual(
        new DeleteFromKeyedStoreStep(typeScriptSourceStore, `Test Full Path`)
      );
    });
  });

  describe(`when a file is added`, () => {
    let step: Step;

    beforeAll(() => {
      step = readTypeScriptFilesPlugin.triggers.readTypeScriptFiles.up({
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
          new KeyedStoreSetOutput(typeScriptSourceStore, `Test Full Path`)
        )
      );
    });
  });
});

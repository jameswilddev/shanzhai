import { Step } from "@shanzhai/interfaces";
import { DeleteFromKeyValueStoreStep } from "@shanzhai/key-value-store";
import { typeScriptSourceStore } from "@shanzhai/type-script-source-store";
import { ReadTextFileStep } from "@shanzhai/read-text-file-step";
import { KeyValueStoreOutput } from "@shanzhai/key-value-store";
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
        new DeleteFromKeyValueStoreStep(typeScriptSourceStore, `Test Full Path`)
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

    it(`deletes the read file from the store`, () => {
      expect(step).toEqual(
        new ReadTextFileStep(
          [`Test Full Path`],
          new KeyValueStoreOutput(typeScriptSourceStore, `Test Full Path`)
        )
      );
    });
  });
});

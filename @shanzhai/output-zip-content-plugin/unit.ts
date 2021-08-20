import { Step } from "@shanzhai/interfaces";
import { DeleteStep } from "@shanzhai/delete-step";
import { WriteFileStep } from "@shanzhai/write-file-step";
import { KeyValueStoreInput } from "@shanzhai/key-value-store";
import { zipContentStore } from "@shanzhai/zip-content-store";
import readTypeScriptFilesPlugin = require(".");

describe(`output-zip-content-plugin`, () => {
  describe(`when zip content is deleted`, () => {
    let step: Step;

    beforeAll(() => {
      step =
        readTypeScriptFilesPlugin.triggers.outputZipContent.down(`Test Key`);
    });

    it(`deletes the tsconfig from disk`, () => {
      expect(step).toEqual(
        new DeleteStep(`Delete previously output zip content "Test Key"`, [
          `dist`,
          `content`,
          `Test Key`,
        ])
      );
    });
  });

  describe(`when zip content is set`, () => {
    let step: Step;

    beforeAll(() => {
      step = readTypeScriptFilesPlugin.triggers.outputZipContent.up(`Test Key`);
    });

    it(`writes the zip content to disk`, () => {
      expect(step).toEqual(
        new WriteFileStep(
          `Output zip content "Test Key"`,
          [`dist`, `content`, `Test Key`],
          new KeyValueStoreInput(zipContentStore, `Test Key`)
        )
      );
    });
  });
});

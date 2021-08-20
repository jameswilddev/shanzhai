import { Step } from "@shanzhai/interfaces";
import { DeleteStep } from "@shanzhai/delete-step";
import { WriteFileStep } from "@shanzhai/write-file-step";
import { ValueStoreInput } from "@shanzhai/value-store";
import { zipStore } from "@shanzhai/zip-store";
import outputZipPlugin = require(".");

describe(`output-zip-plugin`, () => {
  describe(`when the zip is unset`, () => {
    let step: Step;

    beforeAll(() => {
      step = outputZipPlugin.triggers.outputZip.down();
    });

    it(`deletes the zip from disk`, () => {
      expect(step).toEqual(
        new DeleteStep(`Delete previously output zip`, [
          `dist`,
          `distributable.zip`,
        ])
      );
    });
  });

  describe(`when the zip is set`, () => {
    let step: Step;

    beforeAll(() => {
      step = outputZipPlugin.triggers.outputZip.up();
    });

    it(`writes the tsconfig to disk`, () => {
      expect(step).toEqual(
        new WriteFileStep(
          `Output zip`,
          [`dist`, `distributable.zip`],
          new ValueStoreInput(zipStore)
        )
      );
    });
  });
});

import { Step } from "@shanzhai/interfaces";
import { WriteFileStep } from "@shanzhai/write-file-step";
import { zipStore } from "@shanzhai/zip-store";
import { UnkeyedStoreGetInput } from "@shanzhai/unkeyed-store-get-input";
import { CreateDirectoryStep } from "@shanzhai/create-directory-step";
import { SerialStep } from "@shanzhai/serial-step";
import outputZipPlugin = require(".");

describe(`output-zip-plugin`, () => {
  it(`is triggered by the expected stores`, () => {
    expect(outputZipPlugin.triggers.outputZip.stores).toEqual([zipStore]);
  });

  it(`advertises the stores it will write to`, () => {
    expect(
      expect(outputZipPlugin.triggers.outputZip.writesToStores).toEqual(
        jasmine.arrayWithExactContents([])
      )
    );
  });

  describe(`when the zip is set`, () => {
    let step: Step;

    beforeAll(() => {
      step = outputZipPlugin.triggers.outputZip.invalidated();
    });

    it(`writes the tsconfig to disk`, () => {
      expect(step).toEqual(
        new SerialStep(`Output zip`, [
          new CreateDirectoryStep(`Create "dist" directory`, [`dist`]),
          new WriteFileStep(
            `Output zip`,
            [`dist`, `distributable.zip`],
            new UnkeyedStoreGetInput(zipStore)
          ),
        ])
      );
    });
  });
});

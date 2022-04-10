import { Step } from "@shanzhai/interfaces";
import { DeleteStep } from "@shanzhai/delete-step";
import { WriteFileStep } from "@shanzhai/write-file-step";
import { zipContentStore } from "@shanzhai/zip-content-store";
import { KeyedStoreGetInput } from "@shanzhai/keyed-store-get-input";
import { SerialStep } from "@shanzhai/serial-step";
import { CreateDirectoryStep } from "@shanzhai/create-directory-step";
import outputZipContentPlugin = require(".");

describe(`output-zip-content-plugin`, () => {
  it(`is triggered by the zip content store`, () => {
    expect(outputZipContentPlugin.triggers.outputZipContent.keyedStore).toBe(
      zipContentStore
    );
  });

  it(`does not refresh all when other stores change`, () => {
    expect(
      outputZipContentPlugin.triggers.outputZipContent
        .refreshAllWhenStoresChange
    ).toEqual([]);
  });

  it(`advertises the stores it will write to`, () => {
    expect(
      outputZipContentPlugin.triggers.outputZipContent.writesToStores
    ).toEqual(jasmine.arrayWithExactContents([]));
  });

  describe(`when zip content is deleted`, () => {
    let step: Step;

    beforeAll(() => {
      step = outputZipContentPlugin.triggers.outputZipContent.down(
        `Test/Key\\With/Various\\Slashes`
      );
    });

    it(`deletes the tsconfig from disk`, () => {
      expect(step).toEqual(
        new DeleteStep(
          `Delete previously output zip content "Test/Key\\With/Various\\Slashes"`,
          [`dist`, `content`, `Test`, `Key`, `With`, `Various`, `Slashes`]
        )
      );
    });
  });

  describe(`when zip content is set`, () => {
    let step: Step;

    beforeAll(() => {
      step = outputZipContentPlugin.triggers.outputZipContent.up(
        `Test/Key\\With/Various\\Slashes`
      );
    });

    it(`writes the zip content to disk`, () => {
      expect(step).toEqual(
        new SerialStep(`Output zip content "Test/Key\\With/Various\\Slashes"`, [
          new CreateDirectoryStep(
            `Create directory for "Test/Key\\With/Various\\Slashes"`,
            [`dist`, `content`, `Test`, `Key`, `With`, `Various`]
          ),
          new WriteFileStep(
            `Output zip content "Test/Key\\With/Various\\Slashes"`,
            [`dist`, `content`, `Test`, `Key`, `With`, `Various`, `Slashes`],
            new KeyedStoreGetInput(
              zipContentStore,
              `Test/Key\\With/Various\\Slashes`
            )
          ),
        ])
      );
    });
  });
});

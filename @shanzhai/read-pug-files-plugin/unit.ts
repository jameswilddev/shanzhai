import { Step } from "@shanzhai/interfaces";
import { pugSourceStore } from "@shanzhai/pug-source-store";
import { ReadTextFileStep } from "@shanzhai/read-text-file-step";
import { DeleteFromKeyedStoreStep } from "@shanzhai/delete-from-keyed-store-step";
import { KeyedStoreSetOutput } from "@shanzhai/keyed-store-set-output";
import readPugFilesPlugin = require(".");

describe(`read-pug-files-plugin`, () => {
  it(`matches *.pug files`, () => {
    expect(readPugFilesPlugin.triggers.readPugFiles.glob).toEqual(`**/*.pug`);
  });

  describe(`when a file is removed`, () => {
    let step: Step;

    beforeAll(() => {
      step = readPugFilesPlugin.triggers.readPugFiles.down(`Test Full Path`);
    });

    it(`deletes the read file from the store`, () => {
      expect(step).toEqual(
        new DeleteFromKeyedStoreStep(pugSourceStore, `Test Full Path`)
      );
    });
  });

  describe(`when a file is added`, () => {
    let step: Step;

    beforeAll(() => {
      step = readPugFilesPlugin.triggers.readPugFiles.up(`Test Full Path`);
    });

    it(`reads the file into the store`, () => {
      expect(step).toEqual(
        new ReadTextFileStep(
          [`src`, `Test Full Path`],
          new KeyedStoreSetOutput(pugSourceStore, `Test Full Path`)
        )
      );
    });
  });
});

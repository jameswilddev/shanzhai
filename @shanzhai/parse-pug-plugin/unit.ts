import { Step } from "@shanzhai/interfaces";
import { pugSourceStore } from "@shanzhai/pug-source-store";
import { parsedPugStore } from "@shanzhai/parsed-pug-store";
import { ParsePugStep } from "@shanzhai/parse-pug-step";
import { DeleteFromKeyedStoreStep } from "@shanzhai/delete-from-keyed-store-step";
import { KeyedStoreGetInput } from "@shanzhai/keyed-store-get-input";
import { KeyedStoreSetOutput } from "@shanzhai/keyed-store-set-output";
import readPugFilesPlugin = require(".");

describe(`parse-pug-plugin`, () => {
  it(`uses the correct keyed store`, () => {
    expect(readPugFilesPlugin.triggers.parsePug.keyedStore).toBe(
      pugSourceStore
    );
  });

  it(`advertises the stores it will write to`, () => {
    expect(
      expect(readPugFilesPlugin.triggers.parsePug.writesToStores).toEqual(
        jasmine.arrayWithExactContents([parsedPugStore])
      )
    );
  });

  it(`does not refresh all`, () => {
    expect(
      readPugFilesPlugin.triggers.parsePug.refreshAllWhenStoresChange
    ).toEqual([]);
  });

  describe(`when Pug source is removed`, () => {
    let step: Step;

    beforeAll(() => {
      step = readPugFilesPlugin.triggers.parsePug.down(`Test Key`);
    });

    it(`deletes the read file from the store`, () => {
      expect(step).toEqual(
        new DeleteFromKeyedStoreStep(parsedPugStore, `Test Key`)
      );
    });
  });

  describe(`when Pug source is added`, () => {
    let step: Step;

    beforeAll(() => {
      step = readPugFilesPlugin.triggers.parsePug.up(`Test Key`);
    });

    it(`parses the file`, () => {
      expect(step).toEqual(
        new ParsePugStep(
          `Parse Pug "Test Key"`,
          new KeyedStoreGetInput(pugSourceStore, `Test Key`),
          new KeyedStoreSetOutput(parsedPugStore, `Test Key`)
        )
      );
    });
  });
});

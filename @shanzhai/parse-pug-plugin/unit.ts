import { Step } from "@shanzhai/interfaces";
import { DeleteFromKeyValueStoreStep } from "@shanzhai/key-value-store";
import { pugSourceStore } from "@shanzhai/pug-source-store";
import {
  KeyValueStoreInput,
  KeyValueStoreOutput,
} from "@shanzhai/key-value-store";
import { parsedPugStore } from "@shanzhai/parsed-pug-store";
import { ParsePugStep } from "@shanzhai/parse-pug-step";
import readPugFilesPlugin = require(".");

describe(`parse-pug-plugin`, () => {
  describe(`when Pug source is removed`, () => {
    let step: Step;

    beforeAll(() => {
      step = readPugFilesPlugin.triggers.parsePug.down(`Test Key`);
    });

    it(`deletes the read file from the store`, () => {
      expect(step).toEqual(
        new DeleteFromKeyValueStoreStep(parsedPugStore, `Test Key`)
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
          new KeyValueStoreInput(pugSourceStore, `Test Key`),
          new KeyValueStoreOutput(parsedPugStore, `Test Key`)
        )
      );
    });
  });
});

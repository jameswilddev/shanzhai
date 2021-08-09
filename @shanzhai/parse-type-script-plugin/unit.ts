import { Step } from "@shanzhai/interfaces";
import { DeleteFromKeyValueStoreStep } from "@shanzhai/key-value-store";
import { typeScriptSourceStore } from "@shanzhai/type-script-source-store";
import {
  KeyValueStoreInput,
  KeyValueStoreOutput,
} from "@shanzhai/key-value-store";
import { ValueStoreInput } from "@shanzhai/value-store";
import { parsedTypeScriptStore } from "@shanzhai/parsed-type-script-store";
import { ParseTypeScriptStep } from "@shanzhai/parse-type-script-step";
import { typeScriptCompilerOptionsStore } from "@shanzhai/type-script-compiler-options-store";
import readTypeScriptFilesPlugin = require(".");

describe(`parse-type-script-plugin`, () => {
  describe(`when a file is removed`, () => {
    let step: Step;

    beforeAll(() => {
      step =
        readTypeScriptFilesPlugin.triggers.parseTypeScript.down(
          `Test Full Path`
        );
    });

    it(`deletes the read file from the store`, () => {
      expect(step).toEqual(
        new DeleteFromKeyValueStoreStep(parsedTypeScriptStore, `Test Full Path`)
      );
    });
  });

  describe(`when a file is added`, () => {
    let step: Step;

    beforeAll(() => {
      step =
        readTypeScriptFilesPlugin.triggers.parseTypeScript.up(`Test Full Path`);
    });

    it(`parses the file`, () => {
      expect(step).toEqual(
        new ParseTypeScriptStep(
          new KeyValueStoreInput(typeScriptSourceStore, `Test Full Path`),
          new ValueStoreInput(typeScriptCompilerOptionsStore),
          `Test Full Path`,
          new KeyValueStoreOutput(parsedTypeScriptStore, `Test Full Path`)
        )
      );
    });
  });
});

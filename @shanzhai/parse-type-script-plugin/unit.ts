import { Step } from "@shanzhai/interfaces";
import { typeScriptSourceStore } from "@shanzhai/type-script-source-store";
import { parsedTypeScriptStore } from "@shanzhai/parsed-type-script-store";
import { ParseTypeScriptStep } from "@shanzhai/parse-type-script-step";
import { typeScriptCompilerOptionsStore } from "@shanzhai/type-script-compiler-options-store";
import { DeleteFromKeyedStoreStep } from "@shanzhai/delete-from-keyed-store-step";
import { KeyedStoreGetInput } from "@shanzhai/keyed-store-get-input";
import { UnkeyedStoreGetInput } from "@shanzhai/unkeyed-store-get-input";
import { KeyedStoreSetOutput } from "@shanzhai/keyed-store-set-output";
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
        new DeleteFromKeyedStoreStep(parsedTypeScriptStore, `Test Full Path`)
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
          new KeyedStoreGetInput(typeScriptSourceStore, `Test Full Path`),
          new UnkeyedStoreGetInput(typeScriptCompilerOptionsStore),
          `Test Full Path`,
          new KeyedStoreSetOutput(parsedTypeScriptStore, `Test Full Path`)
        )
      );
    });
  });
});

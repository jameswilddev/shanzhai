import { Step } from "@shanzhai/interfaces";
import { typeScriptCompilerOptionsStore } from "@shanzhai/type-script-compiler-options-store";
import { parsedTypeScriptStore } from "@shanzhai/parsed-type-script-store";
import { javascriptSourceStore } from "@shanzhai/javascript-source-store";
import { CompileTypeScriptStep } from "@shanzhai/compile-type-script-step";
import { KeyedStoreGetAllInput } from "@shanzhai/keyed-store-get-all-input";
import { UnkeyedStoreGetInput } from "@shanzhai/unkeyed-store-get-input";
import { UnkeyedStoreSetOutput } from "@shanzhai/unkeyed-store-set-output";
import compileTypeScriptPlugin = require(".");

describe(`compile-type-script-plugin`, () => {
  it(`is triggered by the expected stores`, () => {
    expect(compileTypeScriptPlugin.triggers.compileTypeScript.stores).toEqual([
      typeScriptCompilerOptionsStore,
      parsedTypeScriptStore,
    ]);
  });

  describe(`when the stores change`, () => {
    let step: Step;

    beforeAll(() => {
      step = compileTypeScriptPlugin.triggers.compileTypeScript.invalidated();
    });

    it(`minifies the SVG`, () => {
      expect(step).toEqual(
        new CompileTypeScriptStep(
          new KeyedStoreGetAllInput(parsedTypeScriptStore),
          new UnkeyedStoreGetInput(typeScriptCompilerOptionsStore),
          new UnkeyedStoreSetOutput(javascriptSourceStore)
        )
      );
    });
  });
});

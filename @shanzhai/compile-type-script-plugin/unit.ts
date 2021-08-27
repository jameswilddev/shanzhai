import { Step } from "@shanzhai/interfaces";
import { DeleteFromUnkeyedStoreStep } from "@shanzhai/delete-from-unkeyed-store-step";
import { typeScriptCompilerOptionsStore } from "@shanzhai/type-script-compiler-options-store";
import { parsedTypeScriptStore } from "@shanzhai/parsed-type-script-store";
import { SerialStep } from "@shanzhai/serial-step";
import { javascriptSourceStore } from "@shanzhai/javascript-source-store";
import { CompileTypeScriptStep } from "@shanzhai/compile-type-script-step";
import { KeyedStoreGetAllInput } from "@shanzhai/keyed-store-get-all-input";
import { UnkeyedStoreGetInput } from "@shanzhai/unkeyed-store-get-input";
import { UnkeyedStoreSetOutput } from "@shanzhai/unkeyed-store-set-output";
import minifySvgPlugin = require(".");

describe(`compile-type-script-plugin`, () => {
  it(`is triggered by the expected stores`, () => {
    expect(minifySvgPlugin.triggers.compileTypeScript.stores).toEqual([
      typeScriptCompilerOptionsStore,
      parsedTypeScriptStore,
    ]);
  });

  describe(`when the stores change`, () => {
    let step: Step;

    beforeAll(() => {
      step = minifySvgPlugin.triggers.compileTypeScript.invalidated();
    });

    it(`minifies the SVG`, () => {
      expect(step).toEqual(
        new SerialStep(`Compile TypeScript`, [
          new DeleteFromUnkeyedStoreStep(javascriptSourceStore),
          new CompileTypeScriptStep(
            new KeyedStoreGetAllInput(parsedTypeScriptStore),
            new UnkeyedStoreGetInput(typeScriptCompilerOptionsStore),
            new UnkeyedStoreSetOutput(javascriptSourceStore)
          ),
        ])
      );
    });
  });
});

import { Step } from "@shanzhai/interfaces";
import { typeScriptCompilerOptionsStore } from "@shanzhai/type-script-compiler-options-store";
import { WriteFileStep } from "@shanzhai/write-file-step";
import { StringifyJsonInput } from "@shanzhai/stringify-json-input";
import { BuildTsconfigInput } from "@shanzhai/build-tsconfig-input";
import { ConstantInput } from "@shanzhai/constant-input";
import { UnkeyedStoreGetInput } from "@shanzhai/unkeyed-store-get-input";
import readTypeScriptFilesPlugin = require(".");

describe(`output-type-script-compiler-options-plugin`, () => {
  it(`is triggered by the TypeScript compiler options store`, () => {
    expect(
      readTypeScriptFilesPlugin.triggers.outputTypeScriptCompilerOptions.stores
    ).toEqual([typeScriptCompilerOptionsStore]);
  });

  it(`advertises the stores it will write to`, () => {
    expect(
      expect(
        readTypeScriptFilesPlugin.triggers.outputTypeScriptCompilerOptions
          .writesToStores
      ).toEqual(jasmine.arrayWithExactContents([]))
    );
  });

  describe(`when compiler options are set`, () => {
    let step: Step;

    beforeAll(() => {
      step =
        readTypeScriptFilesPlugin.triggers.outputTypeScriptCompilerOptions.invalidated();
    });

    it(`writes the tsconfig to disk`, () => {
      expect(step).toEqual(
        new WriteFileStep(
          `Output TypeScript compiler options`,
          [`tsconfig.json`],
          new StringifyJsonInput(
            new BuildTsconfigInput(
              new UnkeyedStoreGetInput(typeScriptCompilerOptionsStore),
              new ConstantInput(undefined),
              new ConstantInput(undefined),
              new ConstantInput(undefined),
              new ConstantInput(undefined),
              new ConstantInput(undefined),
              new ConstantInput(undefined),
              new ConstantInput([`src/**/*.ts`]),
              new ConstantInput(undefined)
            )
          )
        )
      );
    });
  });
});

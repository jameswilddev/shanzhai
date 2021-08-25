import { Step } from "@shanzhai/interfaces";
import { typeScriptCompilerOptionsStore } from "@shanzhai/type-script-compiler-options-store";
import { DeleteStep } from "@shanzhai/delete-step";
import { WriteFileStep } from "@shanzhai/write-file-step";
import { StringifyJsonInput } from "@shanzhai/stringify-json-input";
import { BuildTsconfigInput } from "@shanzhai/build-tsconfig-input";
import { ConstantInput } from "@shanzhai/constant-input";
import { UnkeyedStoreGetInput } from "@shanzhai/unkeyed-store-get-input";
import readTypeScriptFilesPlugin = require(".");

describe(`output-type-script-compiler-options-plugin`, () => {
  describe(`when the compiler options are deleted`, () => {
    let step: Step;

    beforeAll(() => {
      step =
        readTypeScriptFilesPlugin.triggers.outputTypeScriptCompilerOptions.down();
    });

    it(`deletes the tsconfig from disk`, () => {
      expect(step).toEqual(
        new DeleteStep(`Delete previously output TypeScript compiler options`, [
          `tsconfig.json`,
        ])
      );
    });
  });

  describe(`when compiler options are set`, () => {
    let step: Step;

    beforeAll(() => {
      step =
        readTypeScriptFilesPlugin.triggers.outputTypeScriptCompilerOptions.up();
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

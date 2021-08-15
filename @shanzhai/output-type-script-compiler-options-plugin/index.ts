import { Plugin, UnkeyedStoreTrigger, Step } from "@shanzhai/interfaces";
import { typeScriptCompilerOptionsStore } from "@shanzhai/type-script-compiler-options-store";
import { WriteFileStep } from "@shanzhai/write-file-step";
import { ValueStoreInput } from "@shanzhai/value-store";
import { DeleteStep } from "@shanzhai/delete-step";
import { StringifyJsonInput } from "@shanzhai/stringify-json-input";
import { BuildTsconfigInput } from "@shanzhai/build-tsconfig-input";
import { ConstantInput } from "@shanzhai/constant-input";

const outputTypeScriptCompilerOptionsPlugin: Plugin<{
  readonly outputTypeScriptCompilerOptions: UnkeyedStoreTrigger;
}> = {
  triggers: {
    outputTypeScriptCompilerOptions: {
      type: `unkeyedStore`,
      unkeyedStore: typeScriptCompilerOptionsStore,
      down(): Step {
        return new DeleteStep(
          `Delete previously output TypeScript compiler options`,
          [`tsconfig.json`]
        );
      },
      up(): Step {
        return new WriteFileStep(
          `Output TypeScript compiler options`,
          [`tsconfig.json`],
          new StringifyJsonInput(
            new BuildTsconfigInput(
              new ValueStoreInput(typeScriptCompilerOptionsStore),
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
        );
      },
    },
  },
};

export = outputTypeScriptCompilerOptionsPlugin;

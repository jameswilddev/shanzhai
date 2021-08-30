import { Plugin, StoreAggregateTrigger, Step } from "@shanzhai/interfaces";
import { typeScriptCompilerOptionsStore } from "@shanzhai/type-script-compiler-options-store";
import { WriteFileStep } from "@shanzhai/write-file-step";
import { StringifyJsonInput } from "@shanzhai/stringify-json-input";
import { BuildTsconfigInput } from "@shanzhai/build-tsconfig-input";
import { ConstantInput } from "@shanzhai/constant-input";
import { UnkeyedStoreGetInput } from "@shanzhai/unkeyed-store-get-input";

const outputTypeScriptCompilerOptionsPlugin: Plugin<{
  readonly outputTypeScriptCompilerOptions: StoreAggregateTrigger;
}> = {
  triggers: {
    outputTypeScriptCompilerOptions: {
      type: `storeAggregate`,
      stores: [typeScriptCompilerOptionsStore],
      invalidated(): Step {
        return new WriteFileStep(
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
        );
      },
    },
  },
};

export = outputTypeScriptCompilerOptionsPlugin;

import { Plugin, StoreAggregateTrigger, Step } from "@shanzhai/interfaces";
import { UnkeyedStoreSetOutput } from "@shanzhai/unkeyed-store-set-output";
import { typeScriptCompilerOptionsStore } from "@shanzhai/type-script-compiler-options-store";
import { parsedTypeScriptStore } from "@shanzhai/parsed-type-script-store";
import { SerialStep } from "@shanzhai/serial-step";
import { javascriptSourceStore } from "@shanzhai/javascript-source-store";
import { CompileTypeScriptStep } from "@shanzhai/compile-type-script-step";
import { KeyedStoreGetAllInput } from "@shanzhai/keyed-store-get-all-input";
import { UnkeyedStoreGetInput } from "@shanzhai/unkeyed-store-get-input";
import { DeleteFromUnkeyedStoreStep } from "@shanzhai/delete-from-unkeyed-store-step";

const compileTypeScriptPlugin: Plugin<{
  readonly compileTypeScript: StoreAggregateTrigger;
}> = {
  triggers: {
    compileTypeScript: {
      type: `storeAggregate`,
      stores: [typeScriptCompilerOptionsStore, parsedTypeScriptStore],
      invalidated(): Step {
        return new SerialStep(`Compile TypeScript`, [
          new DeleteFromUnkeyedStoreStep(javascriptSourceStore),
          new CompileTypeScriptStep(
            new KeyedStoreGetAllInput(parsedTypeScriptStore),
            new UnkeyedStoreGetInput(typeScriptCompilerOptionsStore),
            new UnkeyedStoreSetOutput(javascriptSourceStore)
          ),
        ]);
      },
    },
  },
};

export = compileTypeScriptPlugin;

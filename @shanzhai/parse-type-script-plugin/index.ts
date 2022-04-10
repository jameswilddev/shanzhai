import { Plugin, KeyedStoreTrigger, Step } from "@shanzhai/interfaces";
import { typeScriptSourceStore } from "@shanzhai/type-script-source-store";
import { parsedTypeScriptStore } from "@shanzhai/parsed-type-script-store";
import { ParseTypeScriptStep } from "@shanzhai/parse-type-script-step";
import { typeScriptCompilerOptionsStore } from "@shanzhai/type-script-compiler-options-store";
import { DeleteFromKeyedStoreStep } from "@shanzhai/delete-from-keyed-store-step";
import { KeyedStoreGetInput } from "@shanzhai/keyed-store-get-input";
import { UnkeyedStoreGetInput } from "@shanzhai/unkeyed-store-get-input";
import { KeyedStoreSetOutput } from "@shanzhai/keyed-store-set-output";

const parseTypeScriptPlugin: Plugin<{
  readonly parseTypeScript: KeyedStoreTrigger;
}> = {
  triggers: {
    parseTypeScript: {
      type: `keyedStore`,
      keyedStore: typeScriptSourceStore,
      refreshAllWhenStoresChange: [typeScriptCompilerOptionsStore],
      down(key: string): Step {
        return new DeleteFromKeyedStoreStep(parsedTypeScriptStore, key);
      },
      up(key: string): Step {
        return new ParseTypeScriptStep(
          new KeyedStoreGetInput(typeScriptSourceStore, key),
          new UnkeyedStoreGetInput(typeScriptCompilerOptionsStore),
          key,
          new KeyedStoreSetOutput(parsedTypeScriptStore, key)
        );
      },
      writesToStores: [parsedTypeScriptStore],
    },
  },
};

export = parseTypeScriptPlugin;

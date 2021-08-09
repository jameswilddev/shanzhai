import { Plugin, KeyedStoreTrigger, Step } from "@shanzhai/interfaces";
import {
  DeleteFromKeyValueStoreStep,
  KeyValueStoreOutput,
  KeyValueStoreInput,
} from "@shanzhai/key-value-store";
import { typeScriptSourceStore } from "@shanzhai/type-script-source-store";
import { parsedTypeScriptStore } from "@shanzhai/parsed-type-script-store";
import { ParseTypeScriptStep } from "@shanzhai/parse-type-script-step";
import { ValueStoreInput } from "@shanzhai/value-store";
import { typeScriptCompilerOptionsStore } from "@shanzhai/type-script-compiler-options-store";

const parseTypeScriptPlugin: Plugin<{
  readonly parseTypeScript: KeyedStoreTrigger;
}> = {
  triggers: {
    parseTypeScript: {
      type: `keyedStore`,
      keyedStore: typeScriptSourceStore,
      down(key: string): Step {
        return new DeleteFromKeyValueStoreStep(parsedTypeScriptStore, key);
      },
      up(key: string): Step {
        return new ParseTypeScriptStep(
          new KeyValueStoreInput(typeScriptSourceStore, key),
          new ValueStoreInput(typeScriptCompilerOptionsStore),
          key,
          new KeyValueStoreOutput(parsedTypeScriptStore, key)
        );
      },
    },
  },
};

export = parseTypeScriptPlugin;

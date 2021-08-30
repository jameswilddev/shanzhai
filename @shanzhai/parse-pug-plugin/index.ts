import { Plugin, KeyedStoreTrigger, Step } from "@shanzhai/interfaces";
import { pugSourceStore } from "@shanzhai/pug-source-store";
import { parsedPugStore } from "@shanzhai/parsed-pug-store";
import { ParsePugStep } from "@shanzhai/parse-pug-step";
import { DeleteFromKeyedStoreStep } from "@shanzhai/delete-from-keyed-store-step";
import { KeyedStoreGetInput } from "@shanzhai/keyed-store-get-input";
import { KeyedStoreSetOutput } from "@shanzhai/keyed-store-set-output";

const parsePugPlugin: Plugin<{
  readonly parsePug: KeyedStoreTrigger;
}> = {
  triggers: {
    parsePug: {
      type: `keyedStore`,
      keyedStore: pugSourceStore,
      refreshAllWhenStoresChange: [],
      down(key: string): Step {
        return new DeleteFromKeyedStoreStep(parsedPugStore, key);
      },
      up(key: string): Step {
        return new ParsePugStep(
          `Parse Pug "Test Key"`,
          new KeyedStoreGetInput(pugSourceStore, key),
          new KeyedStoreSetOutput(parsedPugStore, key)
        );
      },
    },
  },
};

export = parsePugPlugin;

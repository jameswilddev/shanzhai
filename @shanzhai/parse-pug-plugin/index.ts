import { Plugin, KeyedStoreTrigger, Step } from "@shanzhai/interfaces";
import {
  DeleteFromKeyValueStoreStep,
  KeyValueStoreOutput,
  KeyValueStoreInput,
} from "@shanzhai/key-value-store";
import { pugSourceStore } from "@shanzhai/pug-source-store";
import { parsedPugStore } from "@shanzhai/parsed-pug-store";
import { ParsePugStep } from "@shanzhai/parse-pug-step";

const parsePugPlugin: Plugin<{
  readonly parsePug: KeyedStoreTrigger;
}> = {
  triggers: {
    parsePug: {
      type: `keyedStore`,
      keyedStore: pugSourceStore,
      down(key: string): Step {
        return new DeleteFromKeyValueStoreStep(parsedPugStore, key);
      },
      up(key: string): Step {
        return new ParsePugStep(
          `Parse Pug "Test Key"`,
          new KeyValueStoreInput(pugSourceStore, key),
          new KeyValueStoreOutput(parsedPugStore, key)
        );
      },
    },
  },
};

export = parsePugPlugin;

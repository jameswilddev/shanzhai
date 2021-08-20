import { Plugin, KeyedStoreTrigger, Step } from "@shanzhai/interfaces";
import {
  DeleteFromKeyValueStoreStep,
  KeyValueStoreOutput,
  KeyValueStoreInput,
  KeyValueStoreAllInput,
} from "@shanzhai/key-value-store";
import { parsedPugStore } from "@shanzhai/parsed-pug-store";
import { htmlSourceStore } from "@shanzhai/html-source-store";
import { RenderPugStep } from "@shanzhai/render-pug-step";
import { globalStore } from "@shanzhai/global-store";
import { MergeObjectInput } from "@shanzhai/merge-object-input";

const renderPugPlugin: Plugin<{
  readonly renderPug: KeyedStoreTrigger;
}> = {
  triggers: {
    renderPug: {
      type: `keyedStore`,
      keyedStore: parsedPugStore,
      down(key: string): Step {
        return new DeleteFromKeyValueStoreStep(htmlSourceStore, key);
      },
      up(key: string): Step {
        return new RenderPugStep(
          `Render Pug "${key}"`,
          new KeyValueStoreInput(parsedPugStore, key),
          new MergeObjectInput(new KeyValueStoreAllInput(globalStore)),
          new KeyValueStoreOutput(htmlSourceStore, key)
        );
      },
    },
  },
};

export = renderPugPlugin;

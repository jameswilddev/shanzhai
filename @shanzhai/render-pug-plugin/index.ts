import { Plugin, KeyedStoreTrigger, Step } from "@shanzhai/interfaces";
import { parsedPugStore } from "@shanzhai/parsed-pug-store";
import { htmlSourceStore } from "@shanzhai/html-source-store";
import { RenderPugStep } from "@shanzhai/render-pug-step";
import { pugLocalStore } from "@shanzhai/pug-local-store";
import { MergeObjectInput } from "@shanzhai/merge-object-input";
import { DeleteFromKeyedStoreStep } from "@shanzhai/delete-from-keyed-store-step";
import { KeyedStoreGetInput } from "@shanzhai/keyed-store-get-input";
import { KeyedStoreSetOutput } from "@shanzhai/keyed-store-set-output";
import { KeyedStoreGetAllInput } from "@shanzhai/keyed-store-get-all-input";

const renderPugPlugin: Plugin<{
  readonly renderPug: KeyedStoreTrigger;
}> = {
  triggers: {
    renderPug: {
      type: `keyedStore`,
      keyedStore: parsedPugStore,
      refreshAllWhenStoresChange: [pugLocalStore],
      down(key: string): Step {
        return new DeleteFromKeyedStoreStep(htmlSourceStore, key);
      },
      up(key: string): Step {
        return new RenderPugStep(
          `Render Pug "${key}"`,
          new KeyedStoreGetInput(parsedPugStore, key),
          new MergeObjectInput(new KeyedStoreGetAllInput(pugLocalStore)),
          new KeyedStoreSetOutput(htmlSourceStore, key)
        );
      },
    },
  },
};

export = renderPugPlugin;

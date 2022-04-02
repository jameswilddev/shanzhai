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

const replaceExtension = (from: string): string =>
  from.replace(/\.pug$/, `.html`);

const renderPugPlugin: Plugin<{
  readonly renderPug: KeyedStoreTrigger;
}> = {
  triggers: {
    renderPug: {
      type: `keyedStore`,
      keyedStore: parsedPugStore,
      refreshAllWhenStoresChange: [pugLocalStore],
      down(key: string): Step {
        return new DeleteFromKeyedStoreStep(
          htmlSourceStore,
          replaceExtension(key)
        );
      },
      up(key: string): Step {
        const withReplacedExtension = replaceExtension(key);

        return new RenderPugStep(
          `Render Pug "${key}" as "${withReplacedExtension}"`,
          new KeyedStoreGetInput(parsedPugStore, key),
          new MergeObjectInput(new KeyedStoreGetAllInput(pugLocalStore)),
          new KeyedStoreSetOutput(htmlSourceStore, withReplacedExtension)
        );
      },
    },
  },
};

export = renderPugPlugin;

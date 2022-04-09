import { Plugin, KeyedStoreTrigger, Step } from "@shanzhai/interfaces";
import { MinifyHtmlStep } from "@shanzhai/minify-html-step";
import { htmlSourceStore } from "@shanzhai/html-source-store";
import { zipContentStore } from "@shanzhai/zip-content-store";
import { DeleteFromKeyedStoreStep } from "@shanzhai/delete-from-keyed-store-step";
import { KeyedStoreGetInput } from "@shanzhai/keyed-store-get-input";
import { KeyedStoreSetOutput } from "@shanzhai/keyed-store-set-output";
import { WrapInObjectOutput } from "@shanzhai/wrap-in-object-output";

const minifyHtmlPlugin: Plugin<{
  readonly minifyHtml: KeyedStoreTrigger;
}> = {
  triggers: {
    minifyHtml: {
      type: `keyedStore`,
      keyedStore: htmlSourceStore,
      refreshAllWhenStoresChange: [],
      down(key: string): Step {
        return new DeleteFromKeyedStoreStep(zipContentStore, key);
      },
      up(key: string): Step {
        return new MinifyHtmlStep(
          key,
          new KeyedStoreGetInput(htmlSourceStore, key),
          new WrapInObjectOutput(
            key,
            new KeyedStoreSetOutput(zipContentStore, key)
          )
        );
      },
    },
  },
};

export = minifyHtmlPlugin;

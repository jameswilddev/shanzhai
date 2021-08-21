import { Plugin, KeyedStoreTrigger, Step } from "@shanzhai/interfaces";
import {
  DeleteFromKeyValueStoreStep,
  KeyValueStoreInput,
  KeyValueStoreOutput,
} from "@shanzhai/key-value-store";
import { MinifyHtmlStep } from "@shanzhai/minify-html-step";
import { htmlSourceStore } from "@shanzhai/html-source-store";
import { zipContentStore } from "@shanzhai/zip-content-store";

const minifyHtmlPlugin: Plugin<{
  readonly minifyHtml: KeyedStoreTrigger;
}> = {
  triggers: {
    minifyHtml: {
      type: `keyedStore`,
      keyedStore: htmlSourceStore,
      down(key: string): Step {
        return new DeleteFromKeyValueStoreStep(zipContentStore, key);
      },
      up(key: string): Step {
        return new MinifyHtmlStep(
          key,
          new KeyValueStoreInput(htmlSourceStore, key),
          new KeyValueStoreOutput(zipContentStore, key)
        );
      },
    },
  },
};

export = minifyHtmlPlugin;

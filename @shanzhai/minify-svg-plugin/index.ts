import { Plugin, KeyedStoreTrigger, Step } from "@shanzhai/interfaces";
import { MinifySvgStep } from "@shanzhai/minify-svg-step";
import { svgSourceStore } from "@shanzhai/svg-source-store";
import { minifiedSvgStore } from "@shanzhai/minified-svg-store";
import { DeleteFromKeyedStoreStep } from "@shanzhai/delete-from-keyed-store-step";
import { KeyedStoreGetInput } from "@shanzhai/keyed-store-get-input";
import { KeyedStoreSetOutput } from "@shanzhai/keyed-store-set-output";

const minifySvgPlugin: Plugin<{
  readonly minifySvg: KeyedStoreTrigger;
}> = {
  triggers: {
    minifySvg: {
      type: `keyedStore`,
      keyedStore: svgSourceStore,
      refreshAllWhenStoresChange: [],
      down(key: string): Step {
        return new DeleteFromKeyedStoreStep(minifiedSvgStore, key);
      },
      up(key: string): Step {
        return new MinifySvgStep(
          key,
          new KeyedStoreGetInput(svgSourceStore, key),
          new KeyedStoreSetOutput(minifiedSvgStore, key)
        );
      },
      writesToStores: [minifiedSvgStore],
    },
  },
};

export = minifySvgPlugin;

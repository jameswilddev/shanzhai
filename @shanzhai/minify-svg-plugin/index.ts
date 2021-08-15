import { Plugin, KeyedStoreTrigger, Step } from "@shanzhai/interfaces";
import {
  DeleteFromKeyValueStoreStep,
  KeyValueStoreInput,
  KeyValueStoreOutput,
} from "@shanzhai/key-value-store";
import { MinifySvgStep } from "@shanzhai/minify-svg-step";
import { svgSourceStore } from "@shanzhai/svg-source-store";
import { minifiedSvgStore } from "@shanzhai/minified-svg-store";

const minifySvgPlugin: Plugin<{
  readonly minifySvg: KeyedStoreTrigger;
}> = {
  triggers: {
    minifySvg: {
      type: `keyedStore`,
      keyedStore: svgSourceStore,
      down(key: string): Step {
        return new DeleteFromKeyValueStoreStep(minifiedSvgStore, key);
      },
      up(key: string): Step {
        return new MinifySvgStep(
          key,
          new KeyValueStoreInput(svgSourceStore, key),
          new KeyValueStoreOutput(minifiedSvgStore, key)
        );
      },
    },
  },
};

export = minifySvgPlugin;

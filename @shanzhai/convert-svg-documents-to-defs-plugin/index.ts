import { Plugin, KeyedStoreTrigger, Step } from "@shanzhai/interfaces";
import { minifiedSvgStore } from "@shanzhai/minified-svg-store";
import { DeleteFromKeyedStoreStep } from "@shanzhai/delete-from-keyed-store-step";
import { KeyedStoreGetInput } from "@shanzhai/keyed-store-get-input";
import { KeyedStoreSetOutput } from "@shanzhai/keyed-store-set-output";
import { ConvertSvgDocumentToDefStep } from "@shanzhai/convert-svg-document-to-def-step";
import { svgDefStore } from "@shanzhai/svg-def-store";

const convertSvgDocumentsToDefsPlugin: Plugin<{
  readonly convertSvgDocumentsToDefs: KeyedStoreTrigger;
}> = {
  triggers: {
    convertSvgDocumentsToDefs: {
      type: `keyedStore`,
      keyedStore: minifiedSvgStore,
      refreshAllWhenStoresChange: [],
      down(key: string): Step {
        return new DeleteFromKeyedStoreStep(svgDefStore, key);
      },
      up(key: string): Step {
        return new ConvertSvgDocumentToDefStep(
          new KeyedStoreGetInput(minifiedSvgStore, key),
          new KeyedStoreSetOutput(svgDefStore, key)
        );
      },
    },
  },
};

export = convertSvgDocumentsToDefsPlugin;

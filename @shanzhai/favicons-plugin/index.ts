import { Plugin, Step, StoreAggregateTrigger } from "@shanzhai/interfaces";
import { faviconStore } from "@shanzhai/favicon-store";
import { faviconsOptionsStore } from "@shanzhai/favicons-options-store";
import { KeyedStoreSetOutput } from "@shanzhai/keyed-store-set-output";
import { FaviconsStep } from "@shanzhai/favicons-step";
import { UnkeyedStoreGetInput } from "@shanzhai/unkeyed-store-get-input";
import { htmlHeaderStore } from "@shanzhai/html-header-store";
import { zipContentStore } from "@shanzhai/zip-content-store";

const faviconsPlugin: Plugin<{
  readonly favicons: StoreAggregateTrigger;
}> = {
  triggers: {
    favicons: {
      type: `storeAggregate`,
      stores: [faviconStore, faviconsOptionsStore],
      invalidated(): Step {
        return new FaviconsStep(
          `Favicons`,
          new UnkeyedStoreGetInput(faviconStore),
          new UnkeyedStoreGetInput(faviconsOptionsStore),
          new KeyedStoreSetOutput(htmlHeaderStore, `favicons`),
          new KeyedStoreSetOutput(zipContentStore, `favicons`)
        );
      },
      writesToStores: [htmlHeaderStore, zipContentStore],
    },
  },
};

export = faviconsPlugin;

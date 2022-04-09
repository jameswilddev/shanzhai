import {
  Plugin,
  StoreAggregateTrigger,
  Step,
  Json,
  UnkeyedStore,
} from "@shanzhai/interfaces";
import { ParseJsonStep } from "@shanzhai/parse-json-step";
import { faviconsOptionsSourceStore } from "@shanzhai/favicons-options-source-store";
import { faviconsOptionsStore } from "@shanzhai/favicons-options-store";
import { UnkeyedStoreGetInput } from "@shanzhai/unkeyed-store-get-input";
import { UnkeyedStoreSetOutput } from "@shanzhai/unkeyed-store-set-output";

const parseFaviconsOptionsPlugin: Plugin<{
  readonly parseFaviconsOptions: StoreAggregateTrigger;
}> = {
  triggers: {
    parseFaviconsOptions: {
      type: `storeAggregate`,
      stores: [faviconsOptionsSourceStore],
      invalidated(): Step {
        return new ParseJsonStep(
          `Parse favicons options`,
          new UnkeyedStoreGetInput(faviconsOptionsSourceStore),
          new UnkeyedStoreSetOutput(
            faviconsOptionsStore as unknown as UnkeyedStore<Json>
          )
        );
      },
    },
  },
};

export = parseFaviconsOptionsPlugin;

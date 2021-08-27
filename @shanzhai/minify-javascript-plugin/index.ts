import { Plugin, UnkeyedStoreTrigger, Step } from "@shanzhai/interfaces";
import { javascriptSourceStore } from "@shanzhai/javascript-source-store";
import { DeleteFromKeyedStoreStep } from "@shanzhai/delete-from-keyed-store-step";
import { MinifyJavascriptStep } from "@shanzhai/minify-javascript-step";
import { UnkeyedStoreGetInput } from "@shanzhai/unkeyed-store-get-input";
import { typeScriptGlobalStore } from "@shanzhai/type-script-global-store";
import { MergeObjectInput } from "@shanzhai/merge-object-input";
import { pugLocalStore } from "@shanzhai/pug-local-store";
import { WrapInObjectOutput } from "@shanzhai/wrap-in-object-output";
import { KeyedStoreSetOutput } from "@shanzhai/keyed-store-set-output";
import { KeyedStoreGetAllInput } from "@shanzhai/keyed-store-get-all-input";

const minifyJavascriptPlugin: Plugin<{
  readonly minifyJavascript: UnkeyedStoreTrigger;
}> = {
  triggers: {
    minifyJavascript: {
      type: `unkeyedStore`,
      unkeyedStore: javascriptSourceStore,
      down(): Step {
        return new DeleteFromKeyedStoreStep(
          pugLocalStore,
          `minify-javascript-plugin`
        );
      },
      up(): Step {
        return new MinifyJavascriptStep(
          `Minify Javascript`,
          new UnkeyedStoreGetInput(javascriptSourceStore),
          new MergeObjectInput(
            new KeyedStoreGetAllInput(typeScriptGlobalStore)
          ),
          new WrapInObjectOutput(
            `minifyJavascriptPluginJavascript`,
            new KeyedStoreSetOutput(pugLocalStore, `minify-javascript-plugin`)
          )
        );
      },
    },
  },
};

export = minifyJavascriptPlugin;

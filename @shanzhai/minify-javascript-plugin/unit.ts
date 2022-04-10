import { Step } from "@shanzhai/interfaces";
import { javascriptSourceStore } from "@shanzhai/javascript-source-store";
import { MinifyJavascriptStep } from "@shanzhai/minify-javascript-step";
import { UnkeyedStoreGetInput } from "@shanzhai/unkeyed-store-get-input";
import { KeyedStoreSetOutput } from "@shanzhai/keyed-store-set-output";
import { MergeObjectInput } from "@shanzhai/merge-object-input";
import { typeScriptGlobalStore } from "@shanzhai/type-script-global-store";
import { WrapInObjectOutput } from "@shanzhai/wrap-in-object-output";
import { pugLocalStore } from "@shanzhai/pug-local-store";
import { KeyedStoreGetAllInput } from "@shanzhai/keyed-store-get-all-input";
import minifyJavascriptPlugin = require(".");

describe(`minify-javascript-plugin`, () => {
  it(`is triggered by the Javascript source store`, () => {
    expect(minifyJavascriptPlugin.triggers.minifyJavascript.stores).toEqual([
      javascriptSourceStore,
    ]);
  });

  it(`advertises the stores it will write to`, () => {
    expect(
      minifyJavascriptPlugin.triggers.minifyJavascript.writesToStores
    ).toEqual(jasmine.arrayWithExactContents([pugLocalStore]));
  });

  describe(`when Javascript source changes`, () => {
    let step: Step;

    beforeAll(() => {
      step = minifyJavascriptPlugin.triggers.minifyJavascript.invalidated();
    });

    it(`minifies the Javascript`, () => {
      expect(step).toEqual(
        new MinifyJavascriptStep(
          `Minify Javascript`,
          new UnkeyedStoreGetInput(javascriptSourceStore),
          new MergeObjectInput(
            new KeyedStoreGetAllInput(typeScriptGlobalStore)
          ),
          new WrapInObjectOutput(
            `minifyJavascriptPluginJavascript`,
            new KeyedStoreSetOutput(pugLocalStore, `minify-javascript-plugin`)
          )
        )
      );
    });
  });
});

import { typeScriptGlobalStore } from ".";

describe(`type-script-global-store`, () => {
  it(`uses the correct name`, () => {
    expect(typeScriptGlobalStore.name).toEqual(`typeScriptGlobalStore`);
  });
});

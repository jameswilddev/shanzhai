import { parsedTypeScriptStore } from ".";

describe(`parsedTypeScriptStore`, () => {
  it(`uses the correct name`, () => {
    expect(parsedTypeScriptStore.name).toEqual(`parsedTypeScriptStore`);
  });
});

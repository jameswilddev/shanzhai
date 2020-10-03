import { minifiedJavascriptStore } from ".";

describe(`minifiedJavascriptStore`, () => {
  it(`uses the correct name`, () => {
    expect(minifiedJavascriptStore.name).toEqual(`minifiedJavascriptStore`);
  });
});

import { minifiedHtmlStore } from ".";

describe(`minified-html-store`, () => {
  it(`uses the correct name`, () => {
    expect(minifiedHtmlStore.name).toEqual(`minifiedHtmlStore`);
  });
});

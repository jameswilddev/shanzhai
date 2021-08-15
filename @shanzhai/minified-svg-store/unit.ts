import { minifiedSvgStore } from ".";

describe(`minified-svg-store`, () => {
  it(`uses the correct name`, () => {
    expect(minifiedSvgStore.name).toEqual(`minifiedSvgStore`);
  });
});

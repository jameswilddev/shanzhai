import { svgSourceStore } from ".";

describe(`svg-source-store`, () => {
  it(`uses the correct name`, () => {
    expect(svgSourceStore.name).toEqual(`svgSourceStore`);
  });
});

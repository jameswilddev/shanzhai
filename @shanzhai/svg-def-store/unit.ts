import { svgDefStore } from ".";

describe(`svg-def-store`, () => {
  it(`uses the correct name`, () => {
    expect(svgDefStore.name).toEqual(`svgDefStore`);
  });
});

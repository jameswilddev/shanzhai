import { collectedSvgDefStore } from ".";

describe(`collected-svg-def-store`, () => {
  it(`uses the correct name`, () => {
    expect(collectedSvgDefStore.name).toEqual(`collectedSvgDefStore`);
  });
});

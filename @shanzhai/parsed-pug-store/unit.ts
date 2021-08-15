import { parsedPugStore } from ".";

describe(`parsed-pug-store`, () => {
  it(`uses the correct name`, () => {
    expect(parsedPugStore.name).toEqual(`parsedPugStore`);
  });
});

import { zipContentStore } from ".";

describe(`zip-content-store`, () => {
  it(`uses the correct name`, () => {
    expect(zipContentStore.name).toEqual(`zipContentStore`);
  });
});

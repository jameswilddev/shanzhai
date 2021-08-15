import { zipStore } from ".";

describe(`zip-store`, () => {
  it(`uses the correct name`, () => {
    expect(zipStore.name).toEqual(`zipStore`);
  });
});

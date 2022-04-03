import { faviconStore } from ".";

describe(`faviconStore`, () => {
  it(`uses the correct name`, () => {
    expect(faviconStore.name).toEqual(`faviconStore`);
  });
});

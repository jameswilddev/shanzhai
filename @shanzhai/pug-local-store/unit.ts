import { pugLocalStore } from ".";

describe(`pug-local-store`, () => {
  it(`uses the correct name`, () => {
    expect(pugLocalStore.name).toEqual(`pugLocalStore`);
  });
});

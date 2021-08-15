import { pugSourceStore } from ".";

describe(`pug-source-store`, () => {
  it(`uses the correct name`, () => {
    expect(pugSourceStore.name).toEqual(`pugSourceStore`);
  });
});

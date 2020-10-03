import { globalStore } from ".";

describe(`globalStore`, () => {
  it(`uses the correct name`, () => {
    expect(globalStore.name).toEqual(`globalStore`);
  });
});

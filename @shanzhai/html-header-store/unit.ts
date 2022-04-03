import { htmlHeaderStore } from ".";

describe(`html-header-store`, () => {
  it(`uses the correct name`, () => {
    expect(htmlHeaderStore.name).toEqual(`htmlHeaderStore`);
  });
});

import { htmlSourceStore } from ".";

describe(`html-source-store`, () => {
  it(`uses the correct name`, () => {
    expect(htmlSourceStore.name).toEqual(`htmlSourceStore`);
  });
});

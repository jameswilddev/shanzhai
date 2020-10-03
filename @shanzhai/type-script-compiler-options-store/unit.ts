import { typeScriptCompilerOptionsStore } from ".";

describe(`typeScriptCompilerOptionsStore`, () => {
  it(`uses the correct name`, () => {
    expect(typeScriptCompilerOptionsStore.name).toEqual(
      `typeScriptCompilerOptionsStore`
    );
  });
});

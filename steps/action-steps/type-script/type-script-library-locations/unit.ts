import * as path from "path";
import { typeScriptLibraryLocations } from ".";

describe(`typescriptLibraryLocations`, () => {
  it(`contains the expected locations`, () => {
    expect(typeScriptLibraryLocations).toEqual([
      path.join(
        process.cwd(),
        `node_modules`,
        `typescript`,
        `lib`,
        `lib.dom.d.ts`
      ),
      path.join(
        process.cwd(),
        `node_modules`,
        `typescript`,
        `lib`,
        `lib.es5.d.ts`
      ),
      path.join(
        process.cwd(),
        `node_modules`,
        `typescript`,
        `lib`,
        `lib.scripthost.d.ts`
      ),
    ]);
  });
});

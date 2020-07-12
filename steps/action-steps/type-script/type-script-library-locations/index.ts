import * as path from "path";
import { compilerOptions } from "../compiler-options";

export const typeScriptLibraryLocations = compilerOptions.lib.map((library) =>
  require.resolve(path.join(`typescript`, `lib`, `lib.${library}.d.ts`))
);

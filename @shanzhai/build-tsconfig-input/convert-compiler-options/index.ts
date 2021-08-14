import { CompilerOptionsDefinition } from "@schemastore/tsconfig";
import { CompilerOptions } from "typescript";
import { convertImportsNotUsedAsValues } from "./convert-imports-not-used-as-values";
import { convertJsx } from "./convert-jsx";
import { convertLib } from "./convert-lib";
import { convertModule } from "./convert-module";
import { convertModuleResolution } from "./convert-module-resolution";
import { convertNewLine } from "./convert-new-line";
import { convertTarget } from "./convert-target";

export function convertCompilerOptions(
  compilerOptions: undefined | CompilerOptions
): CompilerOptionsDefinition[`compilerOptions`] {
  if (compilerOptions === undefined) {
    return undefined;
  } else {
    const lib = convertLib(compilerOptions.lib);

    return {
      ...compilerOptions,
      jsx: convertJsx(compilerOptions.jsx),
      module: convertModule(compilerOptions.module),
      newLine: convertNewLine(compilerOptions.newLine),
      target: convertTarget(compilerOptions.target),
      moduleResolution: convertModuleResolution(
        compilerOptions.moduleResolution
      ),
      lib: lib === undefined ? undefined : [...lib],
      importsNotUsedAsValues: convertImportsNotUsedAsValues(
        compilerOptions.importsNotUsedAsValues
      ),
    };
  }
}

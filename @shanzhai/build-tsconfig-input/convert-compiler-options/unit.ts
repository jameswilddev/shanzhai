import { CompilerOptionsDefinition } from "@schemastore/tsconfig";
import {
  ImportsNotUsedAsValues,
  JsxEmit,
  ModuleKind,
  ModuleResolutionKind,
  NewLineKind,
  ScriptTarget,
} from "typescript";
import { convertCompilerOptions } from ".";

describe(`convert-compiler-options`, () => {
  describe(`undefined`, () => {
    let output: CompilerOptionsDefinition[`compilerOptions`];

    beforeAll(() => {
      convertCompilerOptions(undefined);
    });

    it(`returns undefined`, () => {
      expect(output).toBeUndefined();
    });
  });

  describe(`with value`, () => {
    let output: CompilerOptionsDefinition[`compilerOptions`];

    beforeAll(() => {
      output = convertCompilerOptions({
        jsx: JsxEmit.ReactNative,
        module: ModuleKind.CommonJS,
        newLine: NewLineKind.CarriageReturnLineFeed,
        target: ScriptTarget.ES2019,
        moduleResolution: ModuleResolutionKind.NodeJs,
        lib: [`ESNext.Intl`, `ES2017.SharedMemory`, `ES7`],
        importsNotUsedAsValues: ImportsNotUsedAsValues.Preserve,
        jsxFactory: `Test JSX Factory`,
      });
    });

    it(`returns the converted compiler options`, () => {
      expect(output).toEqual({
        jsx: `react-native`,
        module: `CommonJS`,
        newLine: `crlf`,
        target: `ES2019`,
        moduleResolution: `Node`,
        lib: [`ESNext.Intl`, `ES2017.SharedMemory`, `ES7`],
        importsNotUsedAsValues: `preserve`,
        jsxFactory: `Test JSX Factory`,
      });
    });
  });
});

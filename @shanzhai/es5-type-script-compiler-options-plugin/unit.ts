import * as typescript from "typescript";
import { Step } from "@shanzhai/interfaces";
import { CopyStep } from "@shanzhai/copy-step";
import { ConstantInput } from "@shanzhai/constant-input";
import { ValueStoreOutput } from "@shanzhai/value-store";
import { typeScriptCompilerOptionsStore } from "@shanzhai/type-script-compiler-options-store";
import es5TypeScriptCompilerOptionsPlugin = require(".");

describe(`es5-type-script-compiler-options-plugin`, () => {
  describe(`on startup`, () => {
    let step: Step;

    beforeAll(() => {
      step =
        es5TypeScriptCompilerOptionsPlugin.triggers.es5TypeScriptCompilerOptions.up();
    });

    it(`reads the file into the store`, () => {
      expect(step).toEqual(
        new CopyStep(
          `ES5 TypeScript Compiler Options`,
          new ConstantInput({
            allowJs: false,
            allowSyntheticDefaultImports: false,
            allowUmdGlobalAccess: false,
            allowUnreachableCode: false,
            allowUnusedLabels: false,
            alwaysStrict: true,
            baseUrl: ``,
            charset: `utf8`,
            // checkJs: boolean,
            declaration: false,
            declarationMap: false,
            emitDeclarationOnly: false,
            // declarationDir: string,
            disableSizeLimit: true,
            disableSourceOfProjectReferenceRedirect: false,
            disableSolutionSearching: false,
            disableReferencedProjectLoad: false,
            downlevelIteration: true,
            emitBOM: false,
            emitDecoratorMetadata: false,
            experimentalDecorators: false,
            forceConsistentCasingInFileNames: true,
            importHelpers: false,
            importsNotUsedAsValues: typescript.ImportsNotUsedAsValues.Error,
            inlineSourceMap: false,
            inlineSources: false,
            isolatedModules: false,
            jsx: typescript.JsxEmit.None,
            keyofStringsOnly: true,
            lib: [`dom`, `es5`, `scripthost`],
            // locale: string,
            // mapRoot: string,
            maxNodeModuleJsDepth: 0,
            module: typescript.ModuleKind.None,
            moduleResolution: typescript.ModuleResolutionKind.NodeJs,
            newLine: typescript.NewLineKind.LineFeed,
            noEmit: false,
            noEmitHelpers: true,
            noEmitOnError: true,
            noErrorTruncation: true,
            noFallthroughCasesInSwitch: true,
            noImplicitAny: true,
            noImplicitReturns: true,
            noImplicitThis: true,
            noStrictGenericChecks: false,
            noUnusedLocals: true,
            noUnusedParameters: true,
            noImplicitUseStrict: true,
            noPropertyAccessFromIndexSignature: true,
            assumeChangesOnlyAffectDirectDependencies: false,
            noLib: false,
            noResolve: true,
            noUncheckedIndexedAccess: true,
            // out: string,
            // outDir: string,
            outFile: `result.js`,
            // paths: MapLike<string[]>,
            preserveConstEnums: false,
            noImplicitOverride: true,
            preserveSymlinks: false,
            // project: string,
            // reactNamespace: string,
            // jsxFactory: string,
            // jsxFragmentFactory: string,
            // jsxImportSource: string,
            // composite: boolean,
            incremental: false,
            tsBuildInfoFile: undefined,
            removeComments: true,
            // rootDir: string,
            //rootDirs: string[],
            skipLibCheck: false,
            skipDefaultLibCheck: false,
            sourceMap: false,
            // sourceRoot: string,
            strict: true,
            strictFunctionTypes: true,
            strictBindCallApply: true,
            strictNullChecks: true,
            strictPropertyInitialization: true,
            stripInternal: true,
            suppressExcessPropertyErrors: false,
            suppressImplicitAnyIndexErrors: false,
            target: typescript.ScriptTarget.ES5,
            traceResolution: false,
            resolveJsonModule: false,
            types: [],
            typeRoots: [],
            esModuleInterop: false,
            useDefineForClassFields: true,
          }),
          new ValueStoreOutput(typeScriptCompilerOptionsStore)
        )
      );
    });
  });
});
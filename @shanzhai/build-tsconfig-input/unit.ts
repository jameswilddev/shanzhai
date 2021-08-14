import {
  CompilerOptions,
  ImportsNotUsedAsValues,
  JsxEmit,
  ModuleKind,
  ModuleResolutionKind,
  NewLineKind,
  ScriptTarget,
} from "typescript";
import {
  JSONSchemaForTheTypeScriptCompilerSConfigurationFile,
  ReferencesDefinition,
  TsNodeDefinition,
  TypeAcquisitionDefinition,
} from "@schemastore/tsconfig";
import { Input } from "@shanzhai/interfaces";
import { BuildTsconfigInput } from ".";

describe(`build-tsconfig-input`, () => {
  describe(`on construction`, () => {
    let compilerOptions: Input<undefined | CompilerOptions>;
    let compileOnSave: Input<undefined | boolean>;
    let typeAcquisition: Input<TypeAcquisitionDefinition[`typeAcquisition`]>;
    let _extends: Input<undefined | string>;
    let tsNode: Input<TsNodeDefinition[`ts-node`]>;
    let files: Input<undefined | ReadonlyArray<string>>;
    let exclude: Input<undefined | ReadonlyArray<string>>;
    let include: Input<undefined | ReadonlyArray<string>>;
    let references: Input<ReferencesDefinition[`references`]>;
    let buildTsconfigInput: BuildTsconfigInput;

    beforeAll(() => {
      compilerOptions = { get: jasmine.createSpy(`compilerOptions.get`) };
      compileOnSave = { get: jasmine.createSpy(`compileOnSave.get`) };
      typeAcquisition = { get: jasmine.createSpy(`typeAcquisition.get`) };
      _extends = { get: jasmine.createSpy(`_extends.get`) };
      tsNode = { get: jasmine.createSpy(`tsNode.get`) };
      files = { get: jasmine.createSpy(`files.get`) };
      exclude = { get: jasmine.createSpy(`exclude.get`) };
      include = { get: jasmine.createSpy(`include.get`) };
      references = { get: jasmine.createSpy(`references.get`) };

      buildTsconfigInput = new BuildTsconfigInput(
        compilerOptions,
        compileOnSave,
        typeAcquisition,
        _extends,
        tsNode,
        files,
        exclude,
        include,
        references
      );
    });

    it(`exposes the compiler options input`, () => {
      expect(buildTsconfigInput.compilerOptions).toBe(compilerOptions);
    });

    it(`exposes the compile-on-save input`, () => {
      expect(buildTsconfigInput.compileOnSave).toBe(compileOnSave);
    });

    it(`exposes the type acquisition input`, () => {
      expect(buildTsconfigInput.typeAcquisition).toBe(typeAcquisition);
    });

    it(`exposes the extends input`, () => {
      expect(buildTsconfigInput._extends).toBe(_extends);
    });

    it(`exposes the ts node input`, () => {
      expect(buildTsconfigInput.tsNode).toBe(tsNode);
    });

    it(`exposes the files input`, () => {
      expect(buildTsconfigInput.files).toBe(files);
    });

    it(`exposes the exclude input`, () => {
      expect(buildTsconfigInput.exclude).toBe(exclude);
    });

    it(`exposes the include input`, () => {
      expect(buildTsconfigInput.include).toBe(include);
    });

    it(`exposes the references input`, () => {
      expect(buildTsconfigInput.references).toBe(references);
    });

    it(`does not read from the compiler options input`, () => {
      expect(compilerOptions.get).not.toHaveBeenCalled();
    });

    it(`does not read from the compile-on-save input`, () => {
      expect(compileOnSave.get).not.toHaveBeenCalled();
    });

    it(`does not read from the type acquisition input`, () => {
      expect(typeAcquisition.get).not.toHaveBeenCalled();
    });

    it(`does not read from the extends input`, () => {
      expect(_extends.get).not.toHaveBeenCalled();
    });

    it(`does not read from the ts node input`, () => {
      expect(tsNode.get).not.toHaveBeenCalled();
    });

    it(`does not read from the files input`, () => {
      expect(files.get).not.toHaveBeenCalled();
    });

    it(`does not read from the exclude input`, () => {
      expect(exclude.get).not.toHaveBeenCalled();
    });

    it(`does not read from the include input`, () => {
      expect(include.get).not.toHaveBeenCalled();
    });

    it(`does not read from the references input`, () => {
      expect(references.get).not.toHaveBeenCalled();
    });
  });

  describe(`on execution`, () => {
    let compilerOptions: Input<undefined | CompilerOptions>;
    let compileOnSave: Input<undefined | boolean>;
    let typeAcquisition: Input<TypeAcquisitionDefinition[`typeAcquisition`]>;
    let _extends: Input<undefined | string>;
    let tsNode: Input<TsNodeDefinition[`ts-node`]>;
    let files: Input<undefined | ReadonlyArray<string>>;
    let exclude: Input<undefined | ReadonlyArray<string>>;
    let include: Input<undefined | ReadonlyArray<string>>;
    let references: Input<ReferencesDefinition[`references`]>;
    let buildTsconfigInput: BuildTsconfigInput;
    let output: JSONSchemaForTheTypeScriptCompilerSConfigurationFile;

    beforeAll(async () => {
      compilerOptions = {
        get: jasmine.createSpy(`compilerOptions.get`).and.resolveTo({
          jsx: JsxEmit.ReactNative,
          module: ModuleKind.CommonJS,
          newLine: NewLineKind.CarriageReturnLineFeed,
          target: ScriptTarget.ES2019,
          moduleResolution: ModuleResolutionKind.NodeJs,
          lib: [`ESNext.Intl`, `ES2017.SharedMemory`, `ES7`],
          importsNotUsedAsValues: ImportsNotUsedAsValues.Preserve,
          jsxFactory: `Test JSX Factory`,
        }),
      };
      compileOnSave = {
        get: jasmine.createSpy(`compileOnSave.get`).and.resolveTo(true),
      };
      typeAcquisition = {
        get: jasmine
          .createSpy(`typeAcquisition.get`)
          .and.resolveTo({ enable: true }),
      };
      _extends = {
        get: jasmine.createSpy(`_extends.get`).and.resolveTo(`Test Extends`),
      };
      tsNode = {
        get: jasmine.createSpy(`tsNode.get`).and.resolveTo({
          compiler: `Test Compiler`,
        }),
      };
      files = {
        get: jasmine
          .createSpy(`files.get`)
          .and.resolveTo([`Test File A`, `Test File B`]),
      };
      exclude = {
        get: jasmine
          .createSpy(`exclude.get`)
          .and.resolveTo([`Test Exclude A`, `Test Exclude B`]),
      };
      include = {
        get: jasmine
          .createSpy(`include.get`)
          .and.resolveTo([`Test Include A`, `Test Include B`]),
      };
      references = {
        get: jasmine
          .createSpy(`references.get`)
          .and.resolveTo({ path: `Test Path` }),
      };
      buildTsconfigInput = new BuildTsconfigInput(
        compilerOptions,
        compileOnSave,
        typeAcquisition,
        _extends,
        tsNode,
        files,
        exclude,
        include,
        references
      );

      output = await buildTsconfigInput.get();
    });

    it(`continues to expose the compiler options input`, () => {
      expect(buildTsconfigInput.compilerOptions).toBe(compilerOptions);
    });

    it(`continues to expose the compile-on-save input`, () => {
      expect(buildTsconfigInput.compileOnSave).toBe(compileOnSave);
    });

    it(`continues to expose the type acquisition input`, () => {
      expect(buildTsconfigInput.typeAcquisition).toBe(typeAcquisition);
    });

    it(`continues to expose the extends input`, () => {
      expect(buildTsconfigInput._extends).toBe(_extends);
    });

    it(`continues to expose the ts node input`, () => {
      expect(buildTsconfigInput.tsNode).toBe(tsNode);
    });

    it(`continues to expose the files input`, () => {
      expect(buildTsconfigInput.files).toBe(files);
    });

    it(`continues to expose the exclude input`, () => {
      expect(buildTsconfigInput.exclude).toBe(exclude);
    });

    it(`continues to expose the include input`, () => {
      expect(buildTsconfigInput.include).toBe(include);
    });

    it(`continues to expose the references input`, () => {
      expect(buildTsconfigInput.references).toBe(references);
    });

    it(`reads from the compiler options input once`, () => {
      expect(compilerOptions.get).toHaveBeenCalledTimes(1);
    });

    it(`reads from the compile-on-save input once`, () => {
      expect(compileOnSave.get).toHaveBeenCalledTimes(1);
    });

    it(`reads from the type acquisition input once`, () => {
      expect(typeAcquisition.get).toHaveBeenCalledTimes(1);
    });

    it(`reads from the extends input once`, () => {
      expect(_extends.get).toHaveBeenCalledTimes(1);
    });

    it(`reads from the ts node input once`, () => {
      expect(tsNode.get).toHaveBeenCalledTimes(1);
    });

    it(`reads from the files input once`, () => {
      expect(files.get).toHaveBeenCalledTimes(1);
    });

    it(`reads from the exclude input once`, () => {
      expect(exclude.get).toHaveBeenCalledTimes(1);
    });

    it(`reads from the include input once`, () => {
      expect(include.get).toHaveBeenCalledTimes(1);
    });

    it(`reads from the references input once`, () => {
      expect(references.get).toHaveBeenCalledTimes(1);
    });

    it(`returns the expected tsconfig`, () => {
      expect(output).toEqual({
        compilerOptions: {
          jsx: `react-native`,
          module: `CommonJS`,
          newLine: `crlf`,
          target: `ES2019`,
          moduleResolution: `Node`,
          lib: [`ESNext.Intl`, `ES2017.SharedMemory`, `ES7`],
          importsNotUsedAsValues: `preserve`,
          jsxFactory: `Test JSX Factory`,
        },
        compileOnSave: true,
        typeAcquisition: { enable: true },
        extends: `Test Extends`,
        "ts-node": { compiler: `Test Compiler` },
        files: [`Test File A`, `Test File B`],
        exclude: [`Test Exclude A`, `Test Exclude B`],
        include: [`Test Include A`, `Test Include B`],
        references: { path: `Test Path` },
      });
    });
  });
});

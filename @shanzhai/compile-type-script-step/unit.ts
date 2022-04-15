import * as path from "path";
import * as fs from "fs";
import * as typescript from "typescript";
import { Input, Output, Effect, UnkeyedStore } from "@shanzhai/interfaces";
import { CompileTypeScriptStep } from ".";

describe(`CompileTypeScriptStep`, () => {
  const unkeyedStore: UnkeyedStore<unknown> = {
    type: `unkeyedStore`,
    name: `Test Unkeyed Store`,
    get: jasmine.createSpy(`unkeyedStore.get`).and.callFake(fail),
    set: jasmine.createSpy(`unkeyedStore.set`).and.callFake(fail),
  };

  const outputEffectA: Effect = {
    type: `unkeyedStoreSet`,
    unkeyedStore,
  };

  const outputEffectB: Effect = {
    type: `unkeyedStoreSet`,
    unkeyedStore,
  };

  const outputEffectC: Effect = {
    type: `unkeyedStoreSet`,
    unkeyedStore,
  };

  describe(`on construction`, () => {
    let inputGet: jasmine.Spy;
    let input: Input<{ readonly [key: string]: typescript.SourceFile }>;
    let compilerOptionsGet: jasmine.Spy;
    let compilerOptions: Input<typescript.CompilerOptions>;
    let outputSet: jasmine.Spy;
    let output: Output<string>;
    let compileTypeScriptStep: CompileTypeScriptStep;

    beforeAll(async () => {
      inputGet = jasmine.createSpy(`inputGet`);
      input = { get: inputGet };

      compilerOptionsGet = jasmine.createSpy(`compilerOptionsGet`);
      compilerOptions = { get: compilerOptionsGet };

      outputSet = jasmine.createSpy(`outputSet`);
      output = {
        set: outputSet,
        effects: [outputEffectA, outputEffectB, outputEffectC],
      };

      compileTypeScriptStep = new CompileTypeScriptStep(
        input,
        compilerOptions,
        output
      );
    });

    it(`exposes its name`, () => {
      expect(compileTypeScriptStep.name).toEqual(`Compile TypeScript`);
    });

    it(`exposes the output's effects`, () => {
      expect(compileTypeScriptStep.effects).toEqual([
        outputEffectA,
        outputEffectB,
        outputEffectC,
      ]);
    });

    it(`exposes its input`, () => {
      expect(compileTypeScriptStep.input).toBe(input);
    });

    it(`does not read from its input`, () => {
      expect(inputGet).not.toHaveBeenCalled();
    });

    it(`exposes its compiler options`, () => {
      expect(compileTypeScriptStep.compilerOptions).toBe(compilerOptions);
    });

    it(`does not read form its compiler options`, () => {
      expect(compilerOptionsGet).not.toHaveBeenCalled();
    });

    it(`exposes its output`, () => {
      expect(compileTypeScriptStep.output).toBe(output);
    });

    it(`writes to its output once`, () => {
      expect(outputSet).not.toHaveBeenCalled();
    });
  });

  describe(`on execution`, () => {
    describe(`successful`, () => {
      let inputGet: jasmine.Spy;
      let input: Input<{ readonly [key: string]: typescript.SourceFile }>;
      let compilerOptionsGet: jasmine.Spy;
      let compilerOptions: Input<typescript.CompilerOptions>;
      let outputSet: jasmine.Spy;
      let output: Output<string>;
      let compileTypeScriptStep: CompileTypeScriptStep;

      beforeAll(async () => {
        const files: { [key: string]: typescript.SourceFile } = {};

        const prepareInput = (source: string, fileName: string): void => {
          files[fileName] = typescript.createSourceFile(
            fileName,
            source,
            typescript.ScriptTarget.ES2015,
            false,
            typescript.ScriptKind.TS
          );
        };

        prepareInput(
          await fs.promises.readFile(
            require.resolve(path.join(`typescript`, `lib`, `lib.dom.d.ts`)),
            `utf8`
          ),
          require.resolve(path.join(`typescript`, `lib`, `lib.dom.d.ts`))
        );

        prepareInput(
          await fs.promises.readFile(
            require.resolve(path.join(`typescript`, `lib`, `lib.es5.d.ts`)),
            `utf8`
          ),
          require.resolve(path.join(`typescript`, `lib`, `lib.es5.d.ts`))
        );

        prepareInput(
          `declare function callback(value: string): void;`,
          path.join(`Test Path`, `To Test`, `File.ts`)
        );

        prepareInput(
          `const square = (value: number): number => value * value;`,
          path.join(`Test Path`, `To Another`, `Test`, `File.ts`)
        );

        prepareInput(`callback("Example " + square(21));`, `Test Root File.ts`);

        inputGet = jasmine.createSpy(`inputGet`).and.resolveTo(files);
        input = { get: inputGet };
        compilerOptionsGet = jasmine
          .createSpy(`compilerOptionsGet`)
          .and.resolveTo({
            lib: [`dom`, `es5`],
            outFile: `result.js`,
            strictNullChecks: true,
            target: typescript.ScriptTarget.ES5,
            types: [],
            typeRoots: [],
          });
        compilerOptions = { get: compilerOptionsGet };
        outputSet = jasmine.createSpy(`outputSet`).and.resolveTo();
        output = {
          set: outputSet,
          effects: [outputEffectA, outputEffectB, outputEffectC],
        };

        compileTypeScriptStep = new CompileTypeScriptStep(
          input,
          compilerOptions,
          output
        );

        await compileTypeScriptStep.execute();
      });

      it(`does not change its exposed input`, () => {
        expect(compileTypeScriptStep.input).toBe(input);
      });

      it(`reads its input once`, () => {
        expect(inputGet).toHaveBeenCalledTimes(1);
      });

      it(`does not change its exposed output`, () => {
        expect(compileTypeScriptStep.output).toBe(output);
      });

      it(`writes to its output once`, () => {
        expect(outputSet).toHaveBeenCalledTimes(1);
      });

      it(`writes Javascript which executes as expected to its output`, () => {
        const results: string[] = [];

        const callback = (value: string): void => {
          results.push(value);
        };
        callback;

        const compiled = outputSet.calls.argsFor(0)[0];

        eval(compiled);

        expect(results).toEqual([`Example 441`]);
      });
    });

    describe(`invalid file`, () => {
      let inputGet: jasmine.Spy;
      let input: Input<{ readonly [key: string]: typescript.SourceFile }>;
      let compilerOptionsGet: jasmine.Spy;
      let compilerOptions: Input<typescript.CompilerOptions>;
      let outputSet: jasmine.Spy;
      let output: Output<string>;
      let compileTypeScriptStep: CompileTypeScriptStep;
      let error: null | Error = null;

      beforeAll(async () => {
        const files: { [key: string]: typescript.SourceFile } = {};

        const prepareInput = (source: string, fileName: string): void => {
          files[fileName] = typescript.createSourceFile(
            fileName,
            source,
            typescript.ScriptTarget.ES2015,
            false,
            typescript.ScriptKind.TS
          );
        };

        prepareInput(
          await fs.promises.readFile(
            require.resolve(path.join(`typescript`, `lib`, `lib.dom.d.ts`)),
            `utf8`
          ),
          require.resolve(path.join(`typescript`, `lib`, `lib.dom.d.ts`))
        );

        prepareInput(
          await fs.promises.readFile(
            require.resolve(path.join(`typescript`, `lib`, `lib.es5.d.ts`)),
            `utf8`
          ),
          require.resolve(path.join(`typescript`, `lib`, `lib.es5.d.ts`))
        );

        prepareInput(
          `declare function callback(value: string): void;`,
          path.join(`Test Path`, `To Test`, `File.ts`)
        );

        prepareInput(
          `
            const square = (value: number): number => value * value;
            let x = [[{ x: 0 }]];
            const y = [[{ y: "" }]];
            x = y;
            square(null);
          `,
          path.join(`Test Path`, `To Another`, `Test`, `File.ts`)
        );

        prepareInput(
          `callback("Example " + square(false));`,
          `Test Root File.ts`
        );

        inputGet = jasmine.createSpy(`inputGet`).and.resolveTo(files);
        input = { get: inputGet };
        compilerOptionsGet = jasmine
          .createSpy(`compilerOptionsGet`)
          .and.resolveTo({
            lib: [`dom`, `es5`],
            outFile: `result.js`,
            strictNullChecks: true,
            target: typescript.ScriptTarget.ES5,
            types: [],
            typeRoots: [],
          });
        compilerOptions = { get: compilerOptionsGet };
        outputSet = jasmine.createSpy(`outputSet`);
        output = {
          set: outputSet,
          effects: [outputEffectA, outputEffectB, outputEffectC],
        };

        compileTypeScriptStep = new CompileTypeScriptStep(
          input,
          compilerOptions,
          output
        );

        try {
          await compileTypeScriptStep.execute();
        } catch (e) {
          error = e as Error;
        }
      });

      it(`does not change its exposed input`, () => {
        expect(compileTypeScriptStep.input).toBe(input);
      });

      it(`reads each of its exposed inputs once`, () => {
        expect(inputGet).toHaveBeenCalledTimes(1);
      });

      it(`does not change its exposed output`, () => {
        expect(compileTypeScriptStep.output).toBe(output);
      });

      it(`does not write to its output`, () => {
        expect(outputSet).not.toHaveBeenCalled();
      });

      it(`throws the expected error`, () => {
        expect(error).toEqual(
          new Error(`Failed to compile TypeScript:
Test Path/To Another/Test/File.ts@5: Type '{ y: string; }[][]' is not assignable to type '{ x: number; }[][]'.
    Type '{ y: string; }[]' is not assignable to type '{ x: number; }[]'.
      Property 'x' is missing in type '{ y: string; }' but required in type '{ x: number; }'.
Test Path/To Another/Test/File.ts@6: Argument of type 'null' is not assignable to parameter of type 'number'.
Test Root File.ts@1: Argument of type 'boolean' is not assignable to parameter of type 'number'.`)
        );
      });
    });

    describe(`invalid configuration`, () => {
      let inputGet: jasmine.Spy;
      let input: Input<{ readonly [key: string]: typescript.SourceFile }>;
      let compilerOptionsGet: jasmine.Spy;
      let compilerOptions: Input<typescript.CompilerOptions>;
      let outputSet: jasmine.Spy;
      let output: Output<string>;
      let compileTypeScriptStep: CompileTypeScriptStep;
      let error: null | Error = null;

      beforeAll(async () => {
        const files: { [key: string]: typescript.SourceFile } = {};

        const prepareInput = (source: string, fileName: string): void => {
          files[fileName] = typescript.createSourceFile(
            fileName,
            source,
            typescript.ScriptTarget.ES2015,
            false,
            typescript.ScriptKind.TS
          );
        };

        prepareInput(
          `declare function callback(value: string): void;`,
          path.join(`Test Path`, `To Test`, `File.ts`)
        );

        prepareInput(
          `const square = (value: number): number => value * value;`,
          path.join(`Test Path`, `To Another`, `Test`, `File.ts`)
        );

        prepareInput(`callback("Example " + square(21));`, `Test Root File.ts`);

        inputGet = jasmine.createSpy(`inputGet`).and.resolveTo(files);
        input = { get: inputGet };
        compilerOptionsGet = jasmine
          .createSpy(`compilerOptionsGet`)
          .and.resolveTo({
            lib: [],
            outFile: `result.js`,
            strictNullChecks: true,
            target: typescript.ScriptTarget.ES5,
            types: [],
            typeRoots: [],
          });
        compilerOptions = { get: compilerOptionsGet };
        outputSet = jasmine.createSpy(`outputSet`);
        output = {
          set: outputSet,
          effects: [outputEffectA, outputEffectB, outputEffectC],
        };

        compileTypeScriptStep = new CompileTypeScriptStep(
          input,
          compilerOptions,
          output
        );

        try {
          await compileTypeScriptStep.execute();
        } catch (e) {
          error = e as Error;
        }
      });

      it(`does not change its exposed input`, () => {
        expect(compileTypeScriptStep.input).toBe(input);
      });

      it(`reads each of its exposed inputs once`, () => {
        expect(inputGet).toHaveBeenCalledTimes(1);
      });

      it(`does not change its exposed output`, () => {
        expect(compileTypeScriptStep.output).toBe(output);
      });

      it(`does not write to its output`, () => {
        expect(outputSet).not.toHaveBeenCalled();
      });

      it(`throws the expected error`, () => {
        expect(error).toEqual(
          new Error(`Failed to compile TypeScript:
Cannot find global type 'Array'.
Cannot find global type 'Boolean'.
Cannot find global type 'Function'.
Cannot find global type 'IArguments'.
Cannot find global type 'Number'.
Cannot find global type 'Object'.
Cannot find global type 'RegExp'.
Cannot find global type 'String'.`)
        );
      });
    });

    describe(`no files emitted`, () => {
      let inputGet: jasmine.Spy;
      let input: Input<{ readonly [key: string]: typescript.SourceFile }>;
      let compilerOptionsGet: jasmine.Spy;
      let compilerOptions: Input<typescript.CompilerOptions>;
      let outputSet: jasmine.Spy;
      let output: Output<string>;
      let compileTypeScriptStep: CompileTypeScriptStep;
      let error: null | Error = null;

      beforeAll(async () => {
        const files: { [key: string]: typescript.SourceFile } = {};

        const prepareInput = (source: string, fileName: string): void => {
          files[fileName] = typescript.createSourceFile(
            fileName,
            source,
            typescript.ScriptTarget.ES2015,
            false,
            typescript.ScriptKind.TS
          );
        };

        prepareInput(
          await fs.promises.readFile(
            require.resolve(path.join(`typescript`, `lib`, `lib.dom.d.ts`)),
            `utf8`
          ),
          require.resolve(path.join(`typescript`, `lib`, `lib.dom.d.ts`))
        );

        prepareInput(
          await fs.promises.readFile(
            require.resolve(path.join(`typescript`, `lib`, `lib.es5.d.ts`)),
            `utf8`
          ),
          require.resolve(path.join(`typescript`, `lib`, `lib.es5.d.ts`))
        );

        prepareInput(
          `declare function callback(value: string): void;`,
          path.join(`Test Path`, `To Test`, `File.ts`)
        );

        prepareInput(
          `const square = (value: number): number => value * value;`,
          path.join(`Test Path`, `To Another`, `Test`, `File.ts`)
        );

        prepareInput(`callback("Example " + square(21));`, `Test Root File.ts`);

        inputGet = jasmine.createSpy(`inputGet`).and.resolveTo(files);
        input = { get: inputGet };
        compilerOptionsGet = jasmine
          .createSpy(`compilerOptionsGet`)
          .and.resolveTo({
            lib: [`dom`, `es5`],
            noEmit: true,
            strictNullChecks: true,
            target: typescript.ScriptTarget.ES5,
            types: [],
            typeRoots: [],
          });
        compilerOptions = { get: compilerOptionsGet };
        outputSet = jasmine.createSpy(`outputSet`);
        output = {
          set: outputSet,
          effects: [outputEffectA, outputEffectB, outputEffectC],
        };

        compileTypeScriptStep = new CompileTypeScriptStep(
          input,
          compilerOptions,
          output
        );

        try {
          await compileTypeScriptStep.execute();
        } catch (e) {
          error = e as Error;
        }
      });

      it(`does not change its exposed input`, () => {
        expect(compileTypeScriptStep.input).toBe(input);
      });

      it(`reads each of its exposed inputs once`, () => {
        expect(inputGet).toHaveBeenCalledTimes(1);
      });

      it(`does not change its exposed output`, () => {
        expect(compileTypeScriptStep.output).toBe(output);
      });

      it(`does not write to its output`, () => {
        expect(outputSet).not.toHaveBeenCalled();
      });

      it(`throws the expected error`, () => {
        expect(error).toEqual(new Error(`No files were written.`));
      });
    });

    describe(`two files emitted`, () => {
      let inputGet: jasmine.Spy;
      let input: Input<{ readonly [key: string]: typescript.SourceFile }>;
      let compilerOptionsGet: jasmine.Spy;
      let compilerOptions: Input<typescript.CompilerOptions>;
      let outputSet: jasmine.Spy;
      let output: Output<string>;
      let compileTypeScriptStep: CompileTypeScriptStep;
      let error: null | Error = null;

      beforeAll(async () => {
        const files: { [key: string]: typescript.SourceFile } = {};

        const prepareInput = (source: string, fileName: string): void => {
          files[fileName] = typescript.createSourceFile(
            fileName,
            source,
            typescript.ScriptTarget.ES2015,
            false,
            typescript.ScriptKind.TS
          );
        };

        prepareInput(
          await fs.promises.readFile(
            require.resolve(path.join(`typescript`, `lib`, `lib.dom.d.ts`)),
            `utf8`
          ),
          require.resolve(path.join(`typescript`, `lib`, `lib.dom.d.ts`))
        );

        prepareInput(
          await fs.promises.readFile(
            require.resolve(path.join(`typescript`, `lib`, `lib.es5.d.ts`)),
            `utf8`
          ),
          require.resolve(path.join(`typescript`, `lib`, `lib.es5.d.ts`))
        );

        prepareInput(
          `declare function callback(value: string): void;`,
          path.join(`Test Path`, `To Test`, `File.ts`)
        );

        prepareInput(
          `const square = (value: number): number => value * value;
          callback("Example " + square(21));`,
          path.join(`Test Path`, `To Another`, `Test`, `File.ts`)
        );

        inputGet = jasmine.createSpy(`inputGet`).and.resolveTo(files);
        input = { get: inputGet };
        compilerOptionsGet = jasmine
          .createSpy(`compilerOptionsGet`)
          .and.resolveTo({
            lib: [`dom`, `es5`],
            strictNullChecks: true,
            target: typescript.ScriptTarget.ES5,
            types: [],
            typeRoots: [],
          });
        compilerOptions = { get: compilerOptionsGet };
        outputSet = jasmine.createSpy(`outputSet`);
        output = {
          set: outputSet,
          effects: [outputEffectA, outputEffectB, outputEffectC],
        };

        compileTypeScriptStep = new CompileTypeScriptStep(
          input,
          compilerOptions,
          output
        );

        try {
          await compileTypeScriptStep.execute();
        } catch (e) {
          error = e as Error;
        }
      });

      it(`does not change its exposed input`, () => {
        expect(compileTypeScriptStep.input).toBe(input);
      });

      it(`reads each of its exposed inputs once`, () => {
        expect(inputGet).toHaveBeenCalledTimes(1);
      });

      it(`does not change its exposed output`, () => {
        expect(compileTypeScriptStep.output).toBe(output);
      });

      it(`does not write to its output`, () => {
        expect(outputSet).not.toHaveBeenCalled();
      });

      it(`throws the expected error`, () => {
        expect(error).toEqual(
          new Error(
            `Multiple files ("Test Path/To Another/Test/File.js", "Test Path/To Test/File.js") were written.`
          )
        );
      });
    });

    describe(`three files emitted`, () => {
      let inputGet: jasmine.Spy;
      let input: Input<{ readonly [key: string]: typescript.SourceFile }>;
      let compilerOptionsGet: jasmine.Spy;
      let compilerOptions: Input<typescript.CompilerOptions>;
      let outputSet: jasmine.Spy;
      let output: Output<string>;
      let compileTypeScriptStep: CompileTypeScriptStep;
      let error: null | Error = null;

      beforeAll(async () => {
        const files: { [key: string]: typescript.SourceFile } = {};

        const prepareInput = (source: string, fileName: string): void => {
          files[fileName] = typescript.createSourceFile(
            fileName,
            source,
            typescript.ScriptTarget.ES2015,
            false,
            typescript.ScriptKind.TS
          );
        };

        prepareInput(
          await fs.promises.readFile(
            require.resolve(path.join(`typescript`, `lib`, `lib.dom.d.ts`)),
            `utf8`
          ),
          require.resolve(path.join(`typescript`, `lib`, `lib.dom.d.ts`))
        );

        prepareInput(
          await fs.promises.readFile(
            require.resolve(path.join(`typescript`, `lib`, `lib.es5.d.ts`)),
            `utf8`
          ),
          require.resolve(path.join(`typescript`, `lib`, `lib.es5.d.ts`))
        );

        prepareInput(
          `declare function callback(value: string): void;`,
          path.join(`Test Path`, `To Test`, `File.ts`)
        );

        prepareInput(
          `const square = (value: number): number => value * value;`,
          path.join(`Test Path`, `To Another`, `Test`, `File.ts`)
        );

        prepareInput(`callback("Example " + square(21));`, `Test Root File.ts`);

        inputGet = jasmine.createSpy(`inputGet`).and.resolveTo(files);
        input = { get: inputGet };
        compilerOptionsGet = jasmine
          .createSpy(`compilerOptionsGet`)
          .and.resolveTo({
            lib: [`dom`, `es5`],
            strictNullChecks: true,
            target: typescript.ScriptTarget.ES5,
            types: [],
            typeRoots: [],
          });
        compilerOptions = { get: compilerOptionsGet };
        outputSet = jasmine.createSpy(`outputSet`);
        output = {
          set: outputSet,
          effects: [outputEffectA, outputEffectB, outputEffectC],
        };

        compileTypeScriptStep = new CompileTypeScriptStep(
          input,
          compilerOptions,
          output
        );

        try {
          await compileTypeScriptStep.execute();
        } catch (e) {
          error = e as Error;
        }
      });

      it(`does not change its exposed input`, () => {
        expect(compileTypeScriptStep.input).toBe(input);
      });

      it(`reads each of its exposed inputs once`, () => {
        expect(inputGet).toHaveBeenCalledTimes(1);
      });

      it(`does not change its exposed output`, () => {
        expect(compileTypeScriptStep.output).toBe(output);
      });

      it(`does not write to its output`, () => {
        expect(outputSet).not.toHaveBeenCalled();
      });

      it(`throws the expected error`, () => {
        expect(error).toEqual(
          new Error(
            `Multiple files ("Test Path/To Another/Test/File.js", "Test Path/To Test/File.js", "Test Root File.js") were written.`
          )
        );
      });
    });
  });
});

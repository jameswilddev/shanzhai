import * as path from "path";
import * as fs from "fs";
import * as typescript from "typescript";
import { Input } from "../../../inputs/input";
import { Output } from "../../../outputs/output";
import { ParseTypeScriptStep } from "../parse-type-script-step";
import { CompileTypeScriptStep } from ".";
import { typeScriptLibraryLocations } from "../type-script-library-locations";

describe(`CompileTypeScriptStep`, () => {
  describe(`on construction`, () => {
    let inputAGet: jasmine.Spy;
    let inputA: Input<typescript.SourceFile>;
    let inputBGet: jasmine.Spy;
    let inputB: Input<typescript.SourceFile>;
    let inputCGet: jasmine.Spy;
    let inputC: Input<typescript.SourceFile>;
    let outputSet: jasmine.Spy;
    let output: Output<string>;
    let compileTypeScriptStep: CompileTypeScriptStep;

    beforeAll(async () => {
      inputAGet = jasmine.createSpy(`inputAGet`);
      inputA = { get: inputAGet };

      inputBGet = jasmine.createSpy(`inputBGet`);
      inputB = { get: inputBGet };

      inputCGet = jasmine.createSpy(`inputCGet`);
      inputC = { get: inputCGet };

      outputSet = jasmine.createSpy(`outputSet`);
      output = { set: outputSet };

      compileTypeScriptStep = new CompileTypeScriptStep(
        `Test Name`,
        [inputA, inputB, inputC],
        output
      );
    });

    it(`exposes its inputs`, () => {
      expect(compileTypeScriptStep.inputs).toEqual([inputA, inputB, inputC]);
    });

    it(`does not read from its inputs`, () => {
      expect(inputAGet).not.toHaveBeenCalled();
      expect(inputBGet).not.toHaveBeenCalled();
      expect(inputCGet).not.toHaveBeenCalled();
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
      const libraryInputGet: jasmine.Spy[] = [];
      const libraryInput: Input<typescript.SourceFile>[] = [];
      let inputAGet: jasmine.Spy;
      let inputA: Input<typescript.SourceFile>;
      let inputBGet: jasmine.Spy;
      let inputB: Input<typescript.SourceFile>;
      let inputCGet: jasmine.Spy;
      let inputC: Input<typescript.SourceFile>;
      let outputSet: jasmine.Spy;
      let output: Output<string>;
      let compileTypeScriptStep: CompileTypeScriptStep;

      beforeAll(async () => {
        const prepareInput = async (
          source: string,
          fileName: string,
          spyName: string
        ): Promise<jasmine.Spy> => {
          let preOutput: undefined | typescript.SourceFile;
          await new ParseTypeScriptStep(
            `Parse`,
            { get: () => source },
            fileName,
            {
              set: (value) => {
                preOutput = value;
              },
            }
          ).execute();

          return jasmine
            .createSpy(spyName)
            .and.returnValue(preOutput as typescript.SourceFile);
        };

        for (const libraryLocation of typeScriptLibraryLocations) {
          const source = await fs.promises.readFile(libraryLocation, `utf8`);

          const get = await prepareInput(
            source,
            libraryLocation,
            `libraryInputGet`
          );

          libraryInputGet.push(get);
          libraryInput.push({ get });
        }

        inputAGet = await prepareInput(
          `declare function callback(value: string): void;`,
          path.join(`Test Path`, `To Test`, `File.ts`),
          `inputAGet`
        );
        inputA = { get: inputAGet };

        inputBGet = await prepareInput(
          `const square = (value: number): number => value * value;`,
          path.join(`Test Path`, `To Another`, `Test`, `File.ts`),
          `inputBGet`
        );
        inputB = { get: inputBGet };

        inputCGet = await prepareInput(
          `callback("Example " + square(21));`,
          `Test Root File.ts`,
          `inputCGet`
        );
        inputC = { get: inputCGet };

        outputSet = jasmine.createSpy(`outputSet`);
        output = { set: outputSet };

        compileTypeScriptStep = new CompileTypeScriptStep(
          `Test Name`,
          libraryInput.concat([inputA, inputB, inputC]),
          output
        );

        await compileTypeScriptStep.execute();
      });

      it(`does not change its exposed inputs`, () => {
        expect(compileTypeScriptStep.inputs).toEqual(
          libraryInput.concat([inputA, inputB, inputC])
        );
      });

      it(`reads each of its exposed inputs once`, () => {
        for (const get of libraryInputGet) {
          expect(get).toHaveBeenCalledTimes(1);
        }
        expect(inputAGet).toHaveBeenCalledTimes(1);
        expect(inputBGet).toHaveBeenCalledTimes(1);
        expect(inputCGet).toHaveBeenCalledTimes(1);
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

    describe(`invalid`, () => {
      const libraryInputGet: jasmine.Spy[] = [];
      const libraryInput: Input<typescript.SourceFile>[] = [];
      let inputAGet: jasmine.Spy;
      let inputA: Input<typescript.SourceFile>;
      let inputBGet: jasmine.Spy;
      let inputB: Input<typescript.SourceFile>;
      let inputCGet: jasmine.Spy;
      let inputC: Input<typescript.SourceFile>;
      let outputSet: jasmine.Spy;
      let output: Output<string>;
      let compileTypeScriptStep: CompileTypeScriptStep;
      let error: null | Error = null;

      beforeAll(async () => {
        const prepareInput = async (
          source: string,
          fileName: string,
          spyName: string
        ): Promise<jasmine.Spy> => {
          let preOutput: undefined | typescript.SourceFile;
          await new ParseTypeScriptStep(
            `Parse`,
            { get: () => source },
            fileName,
            {
              set: (value) => {
                preOutput = value;
              },
            }
          ).execute();

          return jasmine
            .createSpy(spyName)
            .and.returnValue(preOutput as typescript.SourceFile);
        };

        for (const libraryLocation of typeScriptLibraryLocations) {
          const source = await fs.promises.readFile(libraryLocation, `utf8`);

          const get = await prepareInput(
            source,
            libraryLocation,
            `libraryInputGet`
          );

          libraryInputGet.push(get);
          libraryInput.push({ get });
        }

        inputAGet = await prepareInput(
          `declare function callback(value: string): void;`,
          path.join(`Test Path`, `To Test`, `File.ts`),
          `inputAGet`
        );
        inputA = { get: inputAGet };

        inputBGet = await prepareInput(
          `
            const square = (value: number): number => value * value;
            let x = [[{ x: 0 }]];
            const y = [[{ y: "" }]];
            x = y;
            square(null);
          `,
          path.join(`Test Path`, `To Another`, `Test`, `File.ts`),
          `inputBGet`
        );
        inputB = { get: inputBGet };

        inputCGet = await prepareInput(
          `callback("Example " + square(false));`,
          `Test Root File.ts`,
          `inputCGet`
        );
        inputC = { get: inputCGet };

        outputSet = jasmine.createSpy(`outputSet`);
        output = { set: outputSet };

        compileTypeScriptStep = new CompileTypeScriptStep(
          `Test Name`,
          libraryInput.concat([inputA, inputB, inputC]),
          output
        );

        try {
          await compileTypeScriptStep.execute();
        } catch (e) {
          error = e;
        }
      });

      it(`does not change its exposed inputs`, () => {
        expect(compileTypeScriptStep.inputs).toEqual(
          libraryInput.concat([inputA, inputB, inputC])
        );
      });

      it(`reads each of its exposed inputs once`, () => {
        for (const get of libraryInputGet) {
          expect(get).toHaveBeenCalledTimes(1);
        }
        expect(inputAGet).toHaveBeenCalledTimes(1);
        expect(inputBGet).toHaveBeenCalledTimes(1);
        expect(inputCGet).toHaveBeenCalledTimes(1);
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
Test Root File.ts@1: Argument of type 'false' is not assignable to parameter of type 'number'.`)
        );
      });
    });
  });
});

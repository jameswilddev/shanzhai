import * as path from "path";
import * as fs from "fs";
import * as typescript from "typescript";
import { Input, Output } from "@shanzhai/interfaces";
import { ParseTypeScriptStep } from "../parse-type-script-step";
import { CompileTypeScriptStep } from ".";
import { typeScriptLibraryLocations } from "../type-script-library-locations";

describe(`CompileTypeScriptStep`, () => {
  describe(`on construction`, () => {
    let inputGet: jasmine.Spy;
    let input: Input<ReadonlyArray<typescript.SourceFile>>;
    let outputSet: jasmine.Spy;
    let output: Output<string>;
    let compileTypeScriptStep: CompileTypeScriptStep;

    beforeAll(async () => {
      inputGet = jasmine.createSpy(`inputGet`);
      input = { get: inputGet };

      outputSet = jasmine.createSpy(`outputSet`);
      output = { set: outputSet };

      compileTypeScriptStep = new CompileTypeScriptStep(input, output);
    });

    it(`exposes its name`, () => {
      expect(compileTypeScriptStep.name).toEqual(`Compile TypeScript`);
    });

    it(`exposes its input`, () => {
      expect(compileTypeScriptStep.input).toBe(input);
    });

    it(`does not read from its input`, () => {
      expect(inputGet).not.toHaveBeenCalled();
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
      let input: Input<ReadonlyArray<typescript.SourceFile>>;
      let outputSet: jasmine.Spy;
      let output: Output<string>;
      let compileTypeScriptStep: CompileTypeScriptStep;

      beforeAll(async () => {
        const files: typescript.SourceFile[] = [];

        const prepareInput = async (
          source: string,
          fileName: string
        ): Promise<void> => {
          await new ParseTypeScriptStep({ get: () => source }, fileName, {
            set: (value) => {
              files.push(value);
            },
          }).execute();
        };

        for (const libraryLocation of typeScriptLibraryLocations) {
          const source = await fs.promises.readFile(libraryLocation, `utf8`);

          await prepareInput(source, libraryLocation);
        }

        await prepareInput(
          `declare function callback(value: string): void;`,
          path.join(`Test Path`, `To Test`, `File.ts`)
        );

        await prepareInput(
          `const square = (value: number): number => value * value;`,
          path.join(`Test Path`, `To Another`, `Test`, `File.ts`)
        );

        await prepareInput(
          `callback("Example " + square(21));`,
          `Test Root File.ts`
        );

        inputGet = jasmine.createSpy(`inputGet`).and.returnValue(files);
        input = { get: inputGet };
        outputSet = jasmine.createSpy(`outputSet`);
        output = { set: outputSet };

        compileTypeScriptStep = new CompileTypeScriptStep(input, output);

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

    describe(`invalid`, () => {
      let inputGet: jasmine.Spy;
      let input: Input<ReadonlyArray<typescript.SourceFile>>;
      let outputSet: jasmine.Spy;
      let output: Output<string>;
      let compileTypeScriptStep: CompileTypeScriptStep;
      let error: null | Error = null;

      beforeAll(async () => {
        const files: typescript.SourceFile[] = [];

        const prepareInput = async (
          source: string,
          fileName: string
        ): Promise<void> => {
          await new ParseTypeScriptStep({ get: () => source }, fileName, {
            set: (value) => {
              files.push(value);
            },
          }).execute();
        };

        for (const libraryLocation of typeScriptLibraryLocations) {
          const source = await fs.promises.readFile(libraryLocation, `utf8`);

          await prepareInput(source, libraryLocation);
        }

        await prepareInput(
          `declare function callback(value: string): void;`,
          path.join(`Test Path`, `To Test`, `File.ts`)
        );

        await prepareInput(
          `
            const square = (value: number): number => value * value;
            let x = [[{ x: 0 }]];
            const y = [[{ y: "" }]];
            x = y;
            square(null);
          `,
          path.join(`Test Path`, `To Another`, `Test`, `File.ts`)
        );

        await prepareInput(
          `callback("Example " + square(false));`,
          `Test Root File.ts`
        );

        inputGet = jasmine.createSpy(`inputGet`).and.returnValue(files);
        input = { get: inputGet };
        outputSet = jasmine.createSpy(`outputSet`);
        output = { set: outputSet };

        compileTypeScriptStep = new CompileTypeScriptStep(input, output);

        try {
          await compileTypeScriptStep.execute();
        } catch (e) {
          error = e;
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
  });
});

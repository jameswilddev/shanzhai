import * as typescript from "typescript";
import { Input, Output } from "@shanzhai/interfaces";
import { ParseTypeScriptStep } from ".";

describe(`ParseTypeScriptStep`, () => {
  describe(`on construction`, () => {
    let inputGet: jasmine.Spy;
    let input: Input<string>;
    let compilerOptionsGet: jasmine.Spy;
    let compilerOptions: Input<typescript.CompilerOptions>;
    let outputSet: jasmine.Spy;
    let output: Output<typescript.SourceFile>;
    let parseTypeScriptStep: ParseTypeScriptStep;

    beforeAll(() => {
      inputGet = jasmine.createSpy(`inputGet`);
      input = { get: inputGet };
      compilerOptionsGet = jasmine.createSpy(`compilerOptionsGet`);
      compilerOptions = { get: compilerOptionsGet };
      outputSet = jasmine.createSpy(`outputSet`);
      output = { set: outputSet };

      parseTypeScriptStep = new ParseTypeScriptStep(
        input,
        compilerOptions,
        `Test File Name`,
        output
      );
    });

    it(`exposes the name`, () => {
      expect(parseTypeScriptStep.name).toEqual(
        `Parse "Test File Name" as TypeScript`
      );
    });

    it(`exposes the input`, () => {
      expect(parseTypeScriptStep.input).toBe(input);
    });

    it(`does not read from the input`, () => {
      expect(inputGet).not.toHaveBeenCalled();
    });

    it(`exposes the compiler options`, () => {
      expect(parseTypeScriptStep.compilerOptions).toBe(compilerOptions);
    });

    it(`does not read from the compiler options`, () => {
      expect(compilerOptionsGet).not.toHaveBeenCalled();
    });

    it(`exposes the file name`, () => {
      expect(parseTypeScriptStep.fileName).toEqual(`Test File Name`);
    });

    it(`exposes the output`, () => {
      expect(parseTypeScriptStep.output).toBe(output);
    });

    it(`does not write to the output`, () => {
      expect(outputSet).not.toHaveBeenCalled();
    });
  });

  describe(`on execution`, () => {
    describe(`when the file parses without a compile target`, () => {
      let inputGet: jasmine.Spy;
      let input: Input<string>;
      let compilerOptionsGet: jasmine.Spy;
      let compilerOptions: Input<typescript.CompilerOptions>;
      let outputSet: jasmine.Spy;
      let output: Output<typescript.SourceFile>;
      let parseTypeScriptStep: ParseTypeScriptStep;

      beforeAll(async () => {
        inputGet = jasmine
          .createSpy(`inputGet`)
          .and.returnValue(`const example: string = "Test Example";`);
        input = { get: inputGet };
        compilerOptionsGet = jasmine
          .createSpy(`compilerOptionsGet`)
          .and.returnValue({});
        compilerOptions = { get: compilerOptionsGet };
        outputSet = jasmine.createSpy(`outputSet`);
        output = { set: outputSet };

        parseTypeScriptStep = new ParseTypeScriptStep(
          input,
          compilerOptions,
          `Test File Name`,
          output
        );

        await parseTypeScriptStep.execute();
      });

      it(`continues to expose the input`, () => {
        expect(parseTypeScriptStep.input).toBe(input);
      });

      it(`reads from the input once`, () => {
        expect(inputGet).toHaveBeenCalledTimes(1);
      });

      it(`continues to expose the compiler options`, () => {
        expect(parseTypeScriptStep.compilerOptions).toBe(compilerOptions);
      });

      it(`reads from the compiler options once`, () => {
        expect(compilerOptionsGet).toHaveBeenCalledTimes(1);
      });

      it(`continues to expose the file name`, () => {
        expect(parseTypeScriptStep.fileName).toEqual(`Test File Name`);
      });

      it(`continues to expose the output`, () => {
        expect(parseTypeScriptStep.output).toBe(output);
      });

      it(`writes to the output once`, () => {
        expect(outputSet).toHaveBeenCalledTimes(1);
      });

      it(`uses the given options`, () => {
        expect(
          (outputSet.calls.argsFor(0)[0] as typescript.SourceFile)
            .languageVersion
        ).toEqual(typescript.ScriptTarget.ES3);
      });

      it(`uses the given source`, () => {
        expect(
          (outputSet.calls.argsFor(0)[0] as typescript.SourceFile).text
        ).toEqual(`const example: string = "Test Example";`);
      });
    });

    describe(`when the file parses with a compile target`, () => {
      let inputGet: jasmine.Spy;
      let input: Input<string>;
      let compilerOptionsGet: jasmine.Spy;
      let compilerOptions: Input<typescript.CompilerOptions>;
      let outputSet: jasmine.Spy;
      let output: Output<typescript.SourceFile>;
      let parseTypeScriptStep: ParseTypeScriptStep;

      beforeAll(async () => {
        inputGet = jasmine
          .createSpy(`inputGet`)
          .and.returnValue(`const example: string = "Test Example";`);
        input = { get: inputGet };
        compilerOptionsGet = jasmine
          .createSpy(`compilerOptionsGet`)
          .and.returnValue({
            target: typescript.ScriptTarget.ES2015,
          });
        compilerOptions = { get: compilerOptionsGet };
        outputSet = jasmine.createSpy(`outputSet`);
        output = { set: outputSet };

        parseTypeScriptStep = new ParseTypeScriptStep(
          input,
          compilerOptions,
          `Test File Name`,
          output
        );

        await parseTypeScriptStep.execute();
      });

      it(`continues to expose the input`, () => {
        expect(parseTypeScriptStep.input).toBe(input);
      });

      it(`reads from the input once`, () => {
        expect(inputGet).toHaveBeenCalledTimes(1);
      });

      it(`continues to expose the compiler options`, () => {
        expect(parseTypeScriptStep.compilerOptions).toBe(compilerOptions);
      });

      it(`reads from the compiler options once`, () => {
        expect(compilerOptionsGet).toHaveBeenCalledTimes(1);
      });

      it(`continues to expose the file name`, () => {
        expect(parseTypeScriptStep.fileName).toEqual(`Test File Name`);
      });

      it(`continues to expose the output`, () => {
        expect(parseTypeScriptStep.output).toBe(output);
      });

      it(`writes to the output once`, () => {
        expect(outputSet).toHaveBeenCalledTimes(1);
      });

      it(`uses the given options`, () => {
        expect(
          (outputSet.calls.argsFor(0)[0] as typescript.SourceFile)
            .languageVersion
        ).toEqual(typescript.ScriptTarget.ES2015);
      });

      it(`uses the given options`, () => {
        expect(
          (outputSet.calls.argsFor(0)[0] as typescript.SourceFile)
            .languageVersion
        ).toEqual(typescript.ScriptTarget.ES2015);
      });

      it(`uses the given source`, () => {
        expect(
          (outputSet.calls.argsFor(0)[0] as typescript.SourceFile).text
        ).toEqual(`const example: string = "Test Example";`);
      });
    });

    describe(`when the file fails to parse`, () => {
      let inputGet: jasmine.Spy;
      let input: Input<string>;
      let compilerOptionsGet: jasmine.Spy;
      let compilerOptions: Input<typescript.CompilerOptions>;
      let outputSet: jasmine.Spy;
      let output: Output<typescript.SourceFile>;
      let parseTypeScriptStep: ParseTypeScriptStep;
      let error: null | Error = null;

      beforeAll(async () => {
        inputGet = jasmine.createSpy(`inputGet`).and.returnValue(
          `};
          !;
          thisLine.isFine();
          const example: string = "Test Example;`
        );
        input = { get: inputGet };
        compilerOptionsGet = jasmine
          .createSpy(`compilerOptionsGet`)
          .and.returnValue({});
        compilerOptions = { get: compilerOptionsGet };
        outputSet = jasmine.createSpy(`outputSet`);
        output = { set: outputSet };

        parseTypeScriptStep = new ParseTypeScriptStep(
          input,
          compilerOptions,
          `Test File Name`,
          output
        );

        try {
          await parseTypeScriptStep.execute();
        } catch (e) {
          error = e;
        }
      });

      it(`continues to expose the input`, () => {
        expect(parseTypeScriptStep.input).toBe(input);
      });

      it(`reads from the input once`, () => {
        expect(inputGet).toHaveBeenCalledTimes(1);
      });

      it(`continues to expose the compiler options`, () => {
        expect(parseTypeScriptStep.compilerOptions).toBe(compilerOptions);
      });

      it(`reads from the compiler options once`, () => {
        expect(compilerOptionsGet).toHaveBeenCalledTimes(1);
      });

      it(`continues to expose the file name`, () => {
        expect(parseTypeScriptStep.fileName).toEqual(`Test File Name`);
      });

      it(`continues to expose the output`, () => {
        expect(parseTypeScriptStep.output).toBe(output);
      });

      it(`does not write to the output`, () => {
        expect(outputSet).not.toHaveBeenCalled();
      });

      it(`throws the expected error`, () => {
        expect(error).toEqual(
          new Error(
            `Failed to parse TypeScript:
Line 1: Declaration or statement expected.
Line 2: Expression expected.
Line 4: Unterminated string literal.`
          )
        );
      });
    });
  });
});
import * as typescript from "typescript";
import { Input } from "../../../inputs/input";
import { Output } from "../../../outputs/output";
import { ParseTypeScriptStep } from ".";

describe(`ParseTypeScriptStep`, () => {
  describe(`on construction`, () => {
    let inputGet: jasmine.Spy;
    let input: Input<string>;
    let outputSet: jasmine.Spy;
    let output: Output<typescript.SourceFile>;
    let parseTypeScriptStep: ParseTypeScriptStep;

    beforeAll(() => {
      inputGet = jasmine.createSpy(`inputGet`);
      input = { get: inputGet };
      outputSet = jasmine.createSpy(`outputSet`);
      output = { set: outputSet };

      parseTypeScriptStep = new ParseTypeScriptStep(
        `Test Name`,
        input,
        `Test File Name`,
        output
      );
    });

    it(`exposes the name`, () => {
      expect(parseTypeScriptStep.name).toEqual(`Test Name`);
    });

    it(`exposes the input`, () => {
      expect(parseTypeScriptStep.input).toBe(input);
    });

    it(`does not read from the input`, () => {
      expect(inputGet).not.toHaveBeenCalled();
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
    describe(`when the file parses`, () => {
      let inputGet: jasmine.Spy;
      let input: Input<string>;
      let outputSet: jasmine.Spy;
      let output: Output<typescript.SourceFile>;
      let parseTypeScriptStep: ParseTypeScriptStep;

      beforeAll(async () => {
        inputGet = jasmine
          .createSpy(`inputGet`)
          .and.returnValue(`const example: string = "Test Example";`);
        input = { get: inputGet };
        outputSet = jasmine.createSpy(`outputSet`);
        output = { set: outputSet };

        parseTypeScriptStep = new ParseTypeScriptStep(
          `Test Name`,
          input,
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

      it(`continues to expose the file name`, () => {
        expect(parseTypeScriptStep.fileName).toEqual(`Test File Name`);
      });

      it(`continues to expose the output`, () => {
        expect(parseTypeScriptStep.output).toBe(output);
      });

      it(`writes to the output once`, () => {
        expect(outputSet).toHaveBeenCalledTimes(1);
      });

      // Note: we can't really validate the output here - this will be done while testing compilation.
    });

    describe(`when the file fails to parse with an error string`, () => {
      let inputGet: jasmine.Spy;
      let input: Input<string>;
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
        outputSet = jasmine.createSpy(`outputSet`);
        output = { set: outputSet };

        parseTypeScriptStep = new ParseTypeScriptStep(
          `Test Name`,
          input,
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

import { MinifyJavascriptStep } from ".";
import { Input, Output } from "@shanzhai/interfaces";

describe(`MinifyJavascriptStep`, () => {
  type TestConstants = {
    readonly testConstantA: number;
    readonly testConstantB: ReadonlyArray<string>;
  };

  describe(`on construction`, () => {
    let inputGet: jasmine.Spy;
    let input: Input<string>;
    let constantsGet: jasmine.Spy;
    let constants: Input<TestConstants>;
    let outputSet: jasmine.Spy;
    let output: Output<string>;
    let minifyJavascriptStep: MinifyJavascriptStep<TestConstants>;

    beforeAll(() => {
      inputGet = jasmine.createSpy(`inputGet`);
      input = { get: inputGet };
      constantsGet = jasmine.createSpy(`constantsGet`);
      constants = { get: constantsGet };
      outputSet = jasmine.createSpy(`outputSet`);
      output = {
        set: outputSet,
        effects: [],
      };

      minifyJavascriptStep = new MinifyJavascriptStep(
        `Test Name`,
        input,
        constants,
        output
      );
    });

    it(`exposes its name`, () => {
      expect(minifyJavascriptStep.name).toEqual(`Test Name`);
    });

    it(`exposes its input`, () => {
      expect(minifyJavascriptStep.input).toBe(input);
    });

    it(`does not read from its input`, () => {
      expect(inputGet).not.toHaveBeenCalled();
    });

    it(`exposes its constants`, () => {
      expect(minifyJavascriptStep.constants).toBe(constants);
    });

    it(`does not read from its constants`, () => {
      expect(constantsGet).not.toHaveBeenCalled();
    });

    it(`exposes its output`, () => {
      expect(minifyJavascriptStep.output).toBe(output);
    });

    it(`does not write to its output`, () => {
      expect(outputSet).not.toHaveBeenCalled();
    });

    it(`sets a reasonable iteration cap`, () => {
      expect(minifyJavascriptStep.maximumIterations).toEqual(10);
    });
  });

  describe(`on iterating the first time`, () => {
    let inputGet: jasmine.Spy;
    let constantsGet: jasmine.Spy;
    let constants: Input<TestConstants>;
    let outputSet: jasmine.Spy;
    let minifyJavascriptStep: MinifyJavascriptStep<TestConstants>;
    const original = `callback(testConstantA * 10 + testConstantB.join("::"))`;
    let minified: string;
    const constantsValue: TestConstants = {
      testConstantA: 47,
      testConstantB: [
        `Test Constant B A`,
        `Test Constant B B`,
        `Test Constant B C`,
      ],
    };

    beforeAll(async () => {
      inputGet = jasmine.createSpy(`inputGet`);
      constantsGet = jasmine
        .createSpy(`constantsGet`)
        .and.resolveTo(constantsValue);
      constants = { get: constantsGet };
      outputSet = jasmine.createSpy(`outputSet`).and.resolveTo();

      minifyJavascriptStep = new MinifyJavascriptStep(
        `Test Name`,
        { get: inputGet },
        constants,
        {
          set: outputSet,
          effects: [],
        }
      );

      minified = await minifyJavascriptStep.iterate(original);
    });

    it(`does not read from its input`, () => {
      expect(inputGet).not.toHaveBeenCalled();
    });

    it(`does not change its exposed constants`, () => {
      expect(minifyJavascriptStep.constants).toBe(constants);
    });

    it(`reads its constants once`, () => {
      expect(constantsGet).toHaveBeenCalledTimes(1);
    });

    it(`does not write to its output`, () => {
      expect(outputSet).not.toHaveBeenCalled();
    });

    it(`does not change its iteration cap`, () => {
      expect(minifyJavascriptStep.maximumIterations).toEqual(10);
    });

    it(`returns functionally identical Javascript`, () => {
      const results: string[] = [];

      const callback = (value: string): void => {
        results.push(value);
      };
      callback;

      eval(minified);

      eval(
        `var testConstantA = ${JSON.stringify(
          constantsValue.testConstantA
        )}; var testConstantB = ${JSON.stringify(
          constantsValue.testConstantB
        )}; ${original}`
      );

      expect(results).toEqual([jasmine.anything(), jasmine.anything()]);
      expect(results[0]).toEqual(results[1]);
    });
  });

  describe(`on iterating a subsequent time`, () => {
    let inputGet: jasmine.Spy;
    let constantsGet: jasmine.Spy;
    let constants: Input<TestConstants>;
    let outputSet: jasmine.Spy;
    let minifyJavascriptStep: MinifyJavascriptStep<TestConstants>;
    const original = `callback(testConstantA * 10 + testConstantB.join("::"))`;
    let minified: string;
    const constantsValue: TestConstants = {
      testConstantA: 47,
      testConstantB: [
        `Test Constant B A`,
        `Test Constant B B`,
        `Test Constant B C`,
      ],
    };

    beforeAll(async () => {
      inputGet = jasmine.createSpy(`inputGet`);
      constantsGet = jasmine
        .createSpy(`constantsGet`)
        .and.resolveTo(constantsValue);
      constants = { get: constantsGet };
      outputSet = jasmine.createSpy(`outputSet`).and.resolveTo();

      minifyJavascriptStep = new MinifyJavascriptStep(
        `Test Name`,
        { get: inputGet },
        constants,
        {
          set: outputSet,
          effects: [],
        }
      );

      await minifyJavascriptStep.iterate(`irrelevant();`);
      minified = await minifyJavascriptStep.iterate(original);
    });

    it(`does not read from its input`, () => {
      expect(inputGet).not.toHaveBeenCalled();
    });

    it(`does not change its exposed constants`, () => {
      expect(minifyJavascriptStep.constants).toBe(constants);
    });

    it(`does not read its constants again`, () => {
      expect(constantsGet).toHaveBeenCalledTimes(1);
    });

    it(`does not write to its output`, () => {
      expect(outputSet).not.toHaveBeenCalled();
    });

    it(`does not change its iteration cap`, () => {
      expect(minifyJavascriptStep.maximumIterations).toEqual(10);
    });

    it(`returns functionally identical Javascript`, () => {
      const results: string[] = [];

      const callback = (value: string): void => {
        results.push(value);
      };
      callback;

      eval(minified);

      eval(
        `var testConstantA = ${JSON.stringify(
          constantsValue.testConstantA
        )}; var testConstantB = ${JSON.stringify(
          constantsValue.testConstantB
        )}; ${original}`
      );

      expect(results).toEqual([jasmine.anything(), jasmine.anything()]);
      expect(results[0]).toEqual(results[1]);
    });
  });

  describe(`when the Javascript is invalid`, () => {
    let inputGet: jasmine.Spy;
    let constantsGet: jasmine.Spy;
    let constants: Input<TestConstants>;
    let outputSet: jasmine.Spy;
    let minifyJavascriptStep: MinifyJavascriptStep<TestConstants>;
    const original = `callback(testConstantA * 10 + testConstantB.join("::")`;
    let error: null | Error = null;
    const constantsValue: TestConstants = {
      testConstantA: 47,
      testConstantB: [
        `Test Constant B A`,
        `Test Constant B B`,
        `Test Constant B C`,
      ],
    };

    beforeAll(async () => {
      inputGet = jasmine.createSpy(`inputGet`);
      constantsGet = jasmine
        .createSpy(`constantsGet`)
        .and.resolveTo(constantsValue);
      constants = { get: constantsGet };
      outputSet = jasmine.createSpy(`outputSet`);

      minifyJavascriptStep = new MinifyJavascriptStep(
        `Test Name`,
        { get: inputGet },
        constants,
        {
          set: outputSet,
          effects: [],
        }
      );

      try {
        await minifyJavascriptStep.iterate(original);
      } catch (e) {
        error = e as Error;
      }
    });

    it(`does not read from its input`, () => {
      expect(inputGet).not.toHaveBeenCalled();
    });

    it(`does not change its exposed constants`, () => {
      expect(minifyJavascriptStep.constants).toBe(constants);
    });

    it(`reads its constants once`, () => {
      expect(constantsGet).toHaveBeenCalledTimes(1);
    });

    it(`does not write to its output`, () => {
      expect(outputSet).not.toHaveBeenCalled();
    });

    it(`does not change its iteration cap`, () => {
      expect(minifyJavascriptStep.maximumIterations).toEqual(10);
    });

    it(`throws the expected error`, () => {
      expect(error).toEqual(
        new Error(
          `Error minifying Javascript: {"message":"Unexpected token: eof, expected: punc «,»","filename":"0","line":1,"col":54,"pos":54}.`
        )
      );
    });
  });
});

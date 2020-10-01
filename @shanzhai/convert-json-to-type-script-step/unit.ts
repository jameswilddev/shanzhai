import { Input, Output } from "@shanzhai/interfaces";
import { ConvertJsonToTypeScriptStep, KeyedJson } from ".";

describe(`ConvertJsonToTypeScriptStep`, () => {
  describe(`on construction`, () => {
    let inputGet: jasmine.Spy;
    let input: Input<KeyedJson>;
    let outputSet: jasmine.Spy;
    let output: Output<string>;
    let convertJsonToTypeScriptStep: ConvertJsonToTypeScriptStep;

    beforeAll(() => {
      inputGet = jasmine.createSpy(`inputGet`);
      input = { get: inputGet };
      outputSet = jasmine.createSpy(`outputSet`);
      output = { set: outputSet };

      convertJsonToTypeScriptStep = new ConvertJsonToTypeScriptStep(
        `Test Name`,
        input,
        output
      );
    });

    it(`exposes its name`, () => {
      expect(convertJsonToTypeScriptStep.name).toEqual(`Test Name`);
    });

    it(`exposes the input`, () => {
      expect(convertJsonToTypeScriptStep.input).toBe(input);
    });

    it(`does not read from the input`, () => {
      expect(inputGet).not.toHaveBeenCalled();
    });

    it(`exposes the output`, () => {
      expect(convertJsonToTypeScriptStep.output).toBe(output);
    });

    it(`does not write to the output`, () => {
      expect(outputSet).not.toHaveBeenCalled();
    });
  });

  describe(`on execution`, () => {
    const scenario = (
      description: string,
      inputKeyedJson: KeyedJson,
      outputJson: string
    ): void => {
      describe(description, () => {
        let inputGet: jasmine.Spy;
        let input: Input<KeyedJson>;
        let outputSet: jasmine.Spy;
        let output: Output<string>;
        let convertJsonToTypeScriptStep: ConvertJsonToTypeScriptStep;

        beforeAll(async () => {
          inputGet = jasmine
            .createSpy(`inputGet`)
            .and.resolveTo(inputKeyedJson);
          input = { get: inputGet };
          outputSet = jasmine.createSpy(`outputSet`).and.resolveTo();
          output = { set: outputSet };

          convertJsonToTypeScriptStep = new ConvertJsonToTypeScriptStep(
            `Test Name`,
            input,
            output
          );

          await convertJsonToTypeScriptStep.execute();
        });

        it(`continues to expose the input`, () => {
          expect(convertJsonToTypeScriptStep.input).toBe(input);
        });

        it(`reads once from the input`, () => {
          expect(inputGet).toHaveBeenCalledTimes(1);
        });

        it(`continues to expose the output`, () => {
          expect(convertJsonToTypeScriptStep.output).toBe(output);
        });

        it(`writes once to the output`, () => {
          expect(outputSet).toHaveBeenCalledTimes(1);
        });

        it(`writes the stringified JSON`, () => {
          expect(outputSet).toHaveBeenCalledWith(outputJson);
        });
      });
    };

    scenario(`empty`, {}, ``);

    scenario(
      `populated`,
      {
        testNullName: null,
        testFalseName: false,
        testTrueName: true,
        testEmptyStringName: ``,
        testNonEmptyStringName: `Test "Non-Empty" String`,
        testZeroName: 0,
        testPositiveIntegerName: 358,
        testNegativeIntegerName: -358,
        testPositiveFloatName: 3.58,
        testNegativeFloatName: -3.58,
        testEmptyArrayName: [],
        testOneItemArrayName: [false],
        testTwoItemArrayName: [false, 358],
        testThreeItemArrayName: [false, 358, true],
        testEmptyObjectName: {},
        testOneItemObjectName: { "Test Key B": false },
        testTwoItemObjectName: { "Test Key B": false, "Test Key A": null },
        testThreeItemObjectName: {
          "Test Key B": false,
          "Test Key A": null,
          "Test Key C": true,
        },
        testComplexName: {
          "Test Root B": [
            null,
            {
              "Test Nested C": false,
              "Test Nested A": true,
              'Test "Nested" B': `Test "Nested" String`,
            },
            [{}],
            -70,
          ],
          "Test Root A": 36.5,
        },
      },
      `const testComplexName: { readonly "Test Root A": 36.5, readonly "Test Root B": readonly [null, { readonly "Test \\"Nested\\" B": "Test \\"Nested\\" String", readonly "Test Nested A": true, readonly "Test Nested C": false }, readonly [{}], -70] } = { "Test Root A": 36.5, "Test Root B": [null, { "Test \\"Nested\\" B": "Test \\"Nested\\" String", "Test Nested A": true, "Test Nested C": false }, [{}], -70] };

const testEmptyArrayName: readonly [] = [];

const testEmptyObjectName: {} = {};

const testEmptyStringName: "" = "";

const testFalseName: false = false;

const testNegativeFloatName: -3.58 = -3.58;

const testNegativeIntegerName: -358 = -358;

const testNonEmptyStringName: "Test \\"Non-Empty\\" String" = "Test \\"Non-Empty\\" String";

const testNullName: null = null;

const testOneItemArrayName: readonly [false] = [false];

const testOneItemObjectName: { readonly "Test Key B": false } = { "Test Key B": false };

const testPositiveFloatName: 3.58 = 3.58;

const testPositiveIntegerName: 358 = 358;

const testThreeItemArrayName: readonly [false, 358, true] = [false, 358, true];

const testThreeItemObjectName: { readonly "Test Key A": null, readonly "Test Key B": false, readonly "Test Key C": true } = { "Test Key A": null, "Test Key B": false, "Test Key C": true };

const testTrueName: true = true;

const testTwoItemArrayName: readonly [false, 358] = [false, 358];

const testTwoItemObjectName: { readonly "Test Key A": null, readonly "Test Key B": false } = { "Test Key A": null, "Test Key B": false };

const testZeroName: 0 = 0;

`
    );
  });
});

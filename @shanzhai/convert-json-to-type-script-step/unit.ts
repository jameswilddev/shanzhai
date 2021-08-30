import {
  Input,
  Output,
  Effect,
  UnkeyedStore,
  Json,
} from "@shanzhai/interfaces";
import { ConvertJsonToTypeScriptStep } from ".";

describe(`ConvertJsonToTypeScriptStep`, () => {
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
    let input: Input<{ readonly [key: string]: Json }>;
    let outputSet: jasmine.Spy;
    let output: Output<string>;
    let convertJsonToTypeScriptStep: ConvertJsonToTypeScriptStep;

    beforeAll(() => {
      inputGet = jasmine.createSpy(`inputGet`);
      input = { get: inputGet };
      outputSet = jasmine.createSpy(`outputSet`);
      output = {
        set: outputSet,
        effects: [outputEffectA, outputEffectB, outputEffectC],
      };

      convertJsonToTypeScriptStep = new ConvertJsonToTypeScriptStep(
        `Test Name`,
        input,
        output
      );
    });

    it(`exposes its name`, () => {
      expect(convertJsonToTypeScriptStep.name).toEqual(`Test Name`);
    });

    it(`exposes the output's effects`, () => {
      expect(convertJsonToTypeScriptStep.effects).toEqual([
        outputEffectA,
        outputEffectB,
        outputEffectC,
      ]);
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
      inputKeyedJson: { readonly [key: string]: Json },
      outputJson: string
    ): void => {
      describe(description, () => {
        let inputGet: jasmine.Spy;
        let input: Input<{ readonly [key: string]: Json }>;
        let outputSet: jasmine.Spy;
        let output: Output<string>;
        let convertJsonToTypeScriptStep: ConvertJsonToTypeScriptStep;

        beforeAll(async () => {
          inputGet = jasmine
            .createSpy(`inputGet`)
            .and.resolveTo(inputKeyedJson);
          input = { get: inputGet };
          outputSet = jasmine.createSpy(`outputSet`).and.resolveTo();
          output = {
            set: outputSet,
            effects: [outputEffectA, outputEffectB, outputEffectC],
          };

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
      `declare const testComplexName: { readonly "Test Root A": 36.5, readonly "Test Root B": readonly [null, { readonly "Test \\"Nested\\" B": "Test \\"Nested\\" String", readonly "Test Nested A": true, readonly "Test Nested C": false }, readonly [{}], -70] };

declare const testEmptyArrayName: readonly [];

declare const testEmptyObjectName: {};

declare const testEmptyStringName: "";

declare const testFalseName: false;

declare const testNegativeFloatName: -3.58;

declare const testNegativeIntegerName: -358;

declare const testNonEmptyStringName: "Test \\"Non-Empty\\" String";

declare const testNullName: null;

declare const testOneItemArrayName: readonly [false];

declare const testOneItemObjectName: { readonly "Test Key B": false };

declare const testPositiveFloatName: 3.58;

declare const testPositiveIntegerName: 358;

declare const testThreeItemArrayName: readonly [false, 358, true];

declare const testThreeItemObjectName: { readonly "Test Key A": null, readonly "Test Key B": false, readonly "Test Key C": true };

declare const testTrueName: true;

declare const testTwoItemArrayName: readonly [false, 358];

declare const testTwoItemObjectName: { readonly "Test Key A": null, readonly "Test Key B": false };

declare const testZeroName: 0;

`
    );
  });
});

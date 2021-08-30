import { StringifyJsonStep } from ".";
import {
  Input,
  Output,
  Json,
  Effect,
  UnkeyedStore,
} from "@shanzhai/interfaces";

describe(`StringifyJsonStep`, () => {
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
    let input: Input<Json>;
    let outputSet: jasmine.Spy;
    let output: Output<string>;
    let parseJsonStep: StringifyJsonStep;

    beforeAll(() => {
      inputGet = jasmine.createSpy(`inputGet`);
      input = { get: inputGet };
      outputSet = jasmine.createSpy(`outputSet`);
      output = {
        set: outputSet,
        effects: [outputEffectA, outputEffectB, outputEffectC],
      };

      parseJsonStep = new StringifyJsonStep(`Test Name`, input, output);
    });

    it(`exposes its name`, () => {
      expect(parseJsonStep.name).toEqual(`Test Name`);
    });

    it(`exposes the output's effects`, () => {
      expect(parseJsonStep.effects).toEqual([
        outputEffectA,
        outputEffectB,
        outputEffectC,
      ]);
    });

    it(`exposes the input`, () => {
      expect(parseJsonStep.input).toBe(input);
    });

    it(`does not read from the input`, () => {
      expect(inputGet).not.toHaveBeenCalled();
    });

    it(`exposes the output`, () => {
      expect(parseJsonStep.output).toBe(output);
    });

    it(`does not write to the output`, () => {
      expect(outputSet).not.toHaveBeenCalled();
    });
  });

  describe(`on execution`, () => {
    const scenario = (
      description: string,
      inputJson: Json,
      outputJson: string
    ): void => {
      describe(description, () => {
        let inputGet: jasmine.Spy;
        let input: Input<Json>;
        let outputSet: jasmine.Spy;
        let output: Output<string>;
        let stringifyJsonStep: StringifyJsonStep;

        beforeAll(async () => {
          inputGet = jasmine.createSpy(`inputGet`).and.resolveTo(inputJson);
          input = { get: inputGet };
          outputSet = jasmine.createSpy(`outputSet`).and.resolveTo();
          output = {
            set: outputSet,
            effects: [outputEffectA, outputEffectB, outputEffectC],
          };

          stringifyJsonStep = new StringifyJsonStep(`Test Name`, input, output);

          await stringifyJsonStep.execute();
        });

        it(`continues to expose the input`, () => {
          expect(stringifyJsonStep.input).toBe(input);
        });

        it(`reads once from the input`, () => {
          expect(inputGet).toHaveBeenCalledTimes(1);
        });

        it(`continues to expose the output`, () => {
          expect(stringifyJsonStep.output).toBe(output);
        });

        it(`writes once to the output`, () => {
          expect(outputSet).toHaveBeenCalledTimes(1);
        });

        it(`writes the stringified JSON`, () => {
          expect(outputSet).toHaveBeenCalledWith(outputJson);
        });
      });
    };

    scenario(`null`, null, `null`);
    scenario(`false`, false, `false`);
    scenario(`true`, true, `true`);
    scenario(`empty string`, ``, `""`);
    scenario(
      `non-empty string`,
      `Test "Non-Empty" String`,
      `"Test \\"Non-Empty\\" String"`
    );
    scenario(`zero`, 0, `0`);
    scenario(`positive integer`, 358, `358`);
    scenario(`negative integer`, -358, `-358`);
    scenario(`positive float`, 3.58, `3.58`);
    scenario(`negative float`, -3.58, `-3.58`);
    scenario(`empty array`, [], `[]`);
    scenario(`one-item array`, [false], `[false]`);
    scenario(`two-item array`, [false, 358], `[false,358]`);
    scenario(`three-item array`, [false, 358, true], `[false,358,true]`);
    scenario(`empty object`, {}, `{}`);
    scenario(
      `one-item object`,
      { "Test Key B": false },
      `{"Test Key B":false}`
    );
    scenario(
      `two-item object`,
      { "Test Key B": false, "Test Key A": null },
      `{"Test Key A":null,"Test Key B":false}`
    );
    scenario(
      `three-item object`,
      { "Test Key B": false, "Test Key A": null, "Test Key C": true },
      `{"Test Key A":null,"Test Key B":false,"Test Key C":true}`
    );
    scenario(
      `complex`,
      {
        "Test Root B": [
          null,
          {
            "Test Nested D": false,
            "Test Nested A": true,
            'Test "Nested" B': `Test "Nested" String`,
            "Test Nested C": undefined,
          },
          [{}],
          -70,
        ],
        "Test Root A": 36.5,
      } as unknown as Json,
      `{"Test Root A":36.5,"Test Root B":[null,{"Test \\"Nested\\" B":"Test \\"Nested\\" String","Test Nested A":true,"Test Nested D":false},[{}],-70]}`
    );
  });
});

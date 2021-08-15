import { StringifyJsonOutput } from ".";
import { Output, Json, Effect } from "@shanzhai/interfaces";

describe(`StringifyJsonOutput`, () => {
  const outputEffectA: Effect = {
    type: `unkeyedStoreSet`,
    unkeyedStore: { type: `unkeyedStore`, name: `Test Output Effect A` },
  };

  const outputEffectB: Effect = {
    type: `unkeyedStoreSet`,
    unkeyedStore: { type: `unkeyedStore`, name: `Test Output Effect B` },
  };

  const outputEffectC: Effect = {
    type: `unkeyedStoreSet`,
    unkeyedStore: { type: `unkeyedStore`, name: `Test Output Effect C` },
  };

  describe(`on construction`, () => {
    let outputSet: jasmine.Spy;
    let output: Output<string>;
    let stringifyJsonOutput: StringifyJsonOutput;

    beforeAll(() => {
      outputSet = jasmine.createSpy(`outputSet`);
      output = {
        set: outputSet,
        effects: [outputEffectA, outputEffectB, outputEffectC],
      };

      stringifyJsonOutput = new StringifyJsonOutput(output);
    });

    it(`exposes the output's effects`, () => {
      expect(stringifyJsonOutput.effects).toEqual([
        outputEffectA,
        outputEffectB,
        outputEffectC,
      ]);
    });

    it(`exposes the output`, () => {
      expect(stringifyJsonOutput.output).toBe(output);
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
        let outputSet: jasmine.Spy;
        let output: Output<string>;
        let stringifyJsonOutput: StringifyJsonOutput;

        beforeAll(async () => {
          outputSet = jasmine.createSpy(`outputSet`).and.resolveTo();
          output = {
            set: outputSet,
            effects: [outputEffectA, outputEffectB, outputEffectC],
          };

          stringifyJsonOutput = new StringifyJsonOutput(output);

          await stringifyJsonOutput.set(inputJson);
        });

        it(`continues to expose the output's effects`, () => {
          expect(stringifyJsonOutput.effects).toEqual([
            outputEffectA,
            outputEffectB,
            outputEffectC,
          ]);
        });

        it(`continues to expose the output`, () => {
          expect(stringifyJsonOutput.output).toBe(output);
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

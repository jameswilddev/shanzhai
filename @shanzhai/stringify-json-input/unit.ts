import { StringifyJsonInput } from ".";
import { Input, Json } from "@shanzhai/interfaces";

describe(`StringifyJsonInput`, () => {
  describe(`on construction`, () => {
    let inputGet: jasmine.Spy;
    let input: Input<Json>;
    let stringifyJsonInput: StringifyJsonInput;

    beforeAll(() => {
      inputGet = jasmine.createSpy(`inputGet`);
      input = { get: inputGet };

      stringifyJsonInput = new StringifyJsonInput(input);
    });

    it(`exposes the input`, () => {
      expect(stringifyJsonInput.input).toBe(input);
    });

    it(`does not read from the input`, () => {
      expect(inputGet).not.toHaveBeenCalled();
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
        let stringifyJsonInput: StringifyJsonInput;
        let output: string;

        beforeAll(async () => {
          inputGet = jasmine.createSpy(`inputGet`).and.resolveTo(inputJson);
          input = { get: inputGet };

          stringifyJsonInput = new StringifyJsonInput(input);

          output = await stringifyJsonInput.get();
        });

        it(`continues to expose the input`, () => {
          expect(stringifyJsonInput.input).toBe(input);
        });

        it(`reads once from the input`, () => {
          expect(inputGet).toHaveBeenCalledTimes(1);
        });

        it(`returns the stringified JSON`, () => {
          expect(output).toEqual(outputJson);
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
            "Test Nested C": false,
            "Test Nested A": true,
            'Test "Nested" B': `Test "Nested" String`,
          },
          [{}],
          -70,
        ],
        "Test Root A": 36.5,
      },
      `{"Test Root A":36.5,"Test Root B":[null,{"Test \\"Nested\\" B":"Test \\"Nested\\" String","Test Nested A":true,"Test Nested C":false},[{}],-70]}`
    );
  });
});

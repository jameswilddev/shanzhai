import { Input, Output } from "@shanzhai/interfaces";
import { RawCsv } from "../raw-csv";
import { ConvertCsvToJsonStep } from ".";
import { KeyedJson } from "../../json/convert-json-to-type-script-step";

describe(`ConvertCsvToJsonStep`, () => {
  describe(`on construction`, () => {
    let inputGet: jasmine.Spy;
    let input: Input<RawCsv>;
    let outputSet: jasmine.Spy;
    let output: Output<KeyedJson>;
    let convertCsvToJsonStep: ConvertCsvToJsonStep;

    beforeAll(() => {
      inputGet = jasmine.createSpy(`inputGet`);
      input = { get: inputGet };
      outputSet = jasmine.createSpy(`outputSet`);
      output = { set: outputSet };

      convertCsvToJsonStep = new ConvertCsvToJsonStep(
        `Test Name`,
        `testKeyPrefix`,
        input,
        output
      );
    });

    it(`exposes its name`, () => {
      expect(convertCsvToJsonStep.name).toEqual(`Test Name`);
    });

    it(`exposes the key prefix`, () => {
      expect(convertCsvToJsonStep.keyPrefix).toEqual(`testKeyPrefix`);
    });

    it(`exposes its input`, () => {
      expect(convertCsvToJsonStep.input).toBe(input);
    });

    it(`does not read from its input`, () => {
      expect(inputGet).not.toHaveBeenCalled();
    });

    it(`exposes its output`, () => {
      expect(convertCsvToJsonStep.output).toBe(output);
    });

    it(`does not write to its output`, () => {
      expect(outputSet).not.toHaveBeenCalled();
    });
  });

  describe(`on execution`, () => {
    const valid = (
      description: string,
      inputContent: RawCsv,
      outputContent: KeyedJson
    ): void => {
      describe(description, () => {
        let inputGet: jasmine.Spy;
        let input: Input<RawCsv>;
        let outputSet: jasmine.Spy;
        let output: Output<KeyedJson>;
        let convertCsvToJsonStep: ConvertCsvToJsonStep;

        beforeAll(async () => {
          inputGet = jasmine
            .createSpy(`inputGet`)
            .and.returnValue(inputContent);
          input = { get: inputGet };
          outputSet = jasmine.createSpy(`outputSet`);
          output = { set: outputSet };

          convertCsvToJsonStep = new ConvertCsvToJsonStep(
            `Test Name`,
            `testKeyPrefix`,
            input,
            output
          );

          await convertCsvToJsonStep.execute();
        });

        it(`continues to expose the key prefix`, () => {
          expect(convertCsvToJsonStep.keyPrefix).toEqual(`testKeyPrefix`);
        });

        it(`continues to expose its input`, () => {
          expect(convertCsvToJsonStep.input).toBe(input);
        });

        it(`reads from its input once`, () => {
          expect(inputGet).toHaveBeenCalledTimes(1);
        });

        it(`continues to expose its output`, () => {
          expect(convertCsvToJsonStep.output).toBe(output);
        });

        it(`writes to its output once`, () => {
          expect(outputSet).toHaveBeenCalledTimes(1);
        });

        it(`writes the parsed CSV to its output`, () => {
          expect(outputSet).toHaveBeenCalledWith(outputContent);
        });
      });
    };

    valid(
      `when headers are present without data`,
      [[`testName_A1$`, `test$Name2`, ``, `__testName$3`, `testName4`]],
      {
        testKeyPrefixtestName_A1$: [],
        testKeyPrefixtest$Name2: [],
        testKeyPrefix__testName$3: [],
        testKeyPrefixtestName4: [],
      }
    );

    valid(
      `when headers and data are present`,
      [
        [`testName_A1$`, `test$Name2`, ``, `__testName$3`, `testName4`],
        [`Test Non-JSON Value A A`, ``, ``, `true`, `Test Non-JSON Value A E`],
        [``, ``, ``, ``, `{"test":["complex","object"]}`],
        [
          `Test Non-JSON Value C A`,
          ``,
          ``,
          `Test Non-JSON Value C D`,
          `Test Non-JSON Value C E`,
        ],
      ],
      {
        testKeyPrefixtestName_A1$: [
          `Test Non-JSON Value A A`,
          ``,
          `Test Non-JSON Value C A`,
        ],
        testKeyPrefixtest$Name2: [``, ``, ``],
        testKeyPrefix__testName$3: [true, ``, `Test Non-JSON Value C D`],
        testKeyPrefixtestName4: [
          `Test Non-JSON Value A E`,
          { test: [`complex`, `object`] },
          `Test Non-JSON Value C E`,
        ],
      }
    );

    const invalid = (
      description: string,
      inputContent: RawCsv,
      errorContent: string
    ): void => {
      describe(description, () => {
        let inputGet: jasmine.Spy;
        let input: Input<RawCsv>;
        let outputSet: jasmine.Spy;
        let output: Output<KeyedJson>;
        let convertCsvToJsonStep: ConvertCsvToJsonStep;
        let error: null | Error = null;

        beforeAll(async () => {
          inputGet = jasmine
            .createSpy(`inputGet`)
            .and.returnValue(inputContent);
          input = { get: inputGet };
          outputSet = jasmine.createSpy(`outputSet`);
          output = { set: outputSet };

          convertCsvToJsonStep = new ConvertCsvToJsonStep(
            `Test Name`,
            `testKeyPrefix`,
            input,
            output
          );

          try {
            await convertCsvToJsonStep.execute();
          } catch (e) {
            error = e;
          }
        });

        it(`continues to expose the key prefix`, () => {
          expect(convertCsvToJsonStep.keyPrefix).toEqual(`testKeyPrefix`);
        });

        it(`continues to expose its input`, () => {
          expect(convertCsvToJsonStep.input).toBe(input);
        });

        it(`reads from its input once`, () => {
          expect(inputGet).toHaveBeenCalledTimes(1);
        });

        it(`continues to expose its output`, () => {
          expect(convertCsvToJsonStep.output).toBe(output);
        });

        it(`does not write to its output`, () => {
          expect(outputSet).not.toHaveBeenCalled();
        });

        it(`throws the expected error`, () => {
          expect(error).toEqual(new Error(errorContent));
        });
      });
    };

    invalid(`when no rows are present`, [], `The file contains no rows.`);

    invalid(
      `when there is data without a header`,
      [
        [`testName_A1$`, `test$Name2`, ``, `__testName$3`, `testName4`],
        [`Test Non-JSON Value A A`, ``, ``, `true`, `Test Non-JSON Value A E`],
        [``, ``, `Test Unexpected Data`, ``, `{"test":["complex","object"]}`],
        [
          `Test Non-JSON Value C A`,
          ``,
          ``,
          `Test Non-JSON Value C D`,
          `Test Non-JSON Value C E`,
        ],
      ],
      `The file contains a column without a header.`
    );

    invalid(
      `when there is a space in a column name`,
      [
        [`testName_A1$`, `test $Name2`, ``, `__testName$3`, `testName4`],
        [`Test Non-JSON Value A A`, ``, ``, `true`, `Test Non-JSON Value A E`],
        [``, ``, ``, ``, `{"test":["complex","object"]}`],
        [
          `Test Non-JSON Value C A`,
          ``,
          ``,
          `Test Non-JSON Value C D`,
          `Test Non-JSON Value C E`,
        ],
      ],
      `Column "test $Name2" is invalidly named.`
    );

    invalid(
      `when there is a new line in a column name`,
      [
        [`testName_A1$`, `test\n$Name2`, ``, `__testName$3`, `testName4`],
        [`Test Non-JSON Value A A`, ``, ``, `true`, `Test Non-JSON Value A E`],
        [``, ``, ``, ``, `{"test":["complex","object"]}`],
        [
          `Test Non-JSON Value C A`,
          ``,
          ``,
          `Test Non-JSON Value C D`,
          `Test Non-JSON Value C E`,
        ],
      ],
      `Column "test\\n$Name2" is invalidly named.`
    );

    invalid(
      `when there is a tab in a column name`,
      [
        [`testName_A1$`, `test\t$Name2`, ``, `__testName$3`, `testName4`],
        [`Test Non-JSON Value A A`, ``, ``, `true`, `Test Non-JSON Value A E`],
        [``, ``, ``, ``, `{"test":["complex","object"]}`],
        [
          `Test Non-JSON Value C A`,
          ``,
          ``,
          `Test Non-JSON Value C D`,
          `Test Non-JSON Value C E`,
        ],
      ],
      `Column "test\\t$Name2" is invalidly named.`
    );

    invalid(
      `when there is an unsupported symbol in a column name`,
      [
        [`testName_A1$`, `test%Name2`, ``, `__testName$3`, `testName4`],
        [`Test Non-JSON Value A A`, ``, ``, `true`, `Test Non-JSON Value A E`],
        [``, ``, ``, ``, `{"test":["complex","object"]}`],
        [
          `Test Non-JSON Value C A`,
          ``,
          ``,
          `Test Non-JSON Value C D`,
          `Test Non-JSON Value C E`,
        ],
      ],
      `Column "test%Name2" is invalidly named.`
    );

    invalid(
      `when the file contains no columns`,
      [[``, ``, ``, ``, ``]],
      `The file contains no columns.`
    );

    invalid(
      `when two column names are the same`,
      [
        [`testName_A1$`, `test$Name2`, `testName3`, `test$Name2`, `testName4`],
        [`Test Non-JSON Value A A`, ``, ``, `true`, `Test Non-JSON Value A E`],
        [``, ``, ``, ``, `{"test":["complex","object"]}`],
        [
          `Test Non-JSON Value C A`,
          ``,
          ``,
          `Test Non-JSON Value C D`,
          `Test Non-JSON Value C E`,
        ],
      ],
      `Column "test$Name2" is not unique.`
    );
  });
});

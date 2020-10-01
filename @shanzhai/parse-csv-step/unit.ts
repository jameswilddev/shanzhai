import { Input, Output } from "@shanzhai/interfaces";
import { ParseCsvStep } from ".";

describe(`ParseCsvStep`, () => {
  describe(`on construction`, () => {
    let inputGet: jasmine.Spy;
    let input: Input<string>;
    let outputSet: jasmine.Spy;
    let output: Output<ReadonlyArray<ReadonlyArray<string>>>;
    let parseCsvStep: ParseCsvStep;

    beforeAll(() => {
      inputGet = jasmine.createSpy(`inputGet`);
      input = { get: inputGet };
      outputSet = jasmine.createSpy(`outputSet`);
      output = { set: outputSet };

      parseCsvStep = new ParseCsvStep(`Test Name`, input, output);
    });

    it(`exposes its name`, () => {
      expect(parseCsvStep.name).toEqual(`Test Name`);
    });

    it(`exposes its input`, () => {
      expect(parseCsvStep.input).toBe(input);
    });

    it(`does not read from its input`, () => {
      expect(inputGet).not.toHaveBeenCalled();
    });

    it(`exposes its output`, () => {
      expect(parseCsvStep.output).toBe(output);
    });

    it(`does not write to its output`, () => {
      expect(outputSet).not.toHaveBeenCalled();
    });
  });

  describe(`on execution`, () => {
    const valid = (
      description: string,
      inputContent: string,
      outputContent: ReadonlyArray<ReadonlyArray<string>>
    ): void => {
      describe(description, () => {
        let inputGet: jasmine.Spy;
        let input: Input<string>;
        let outputSet: jasmine.Spy;
        let output: Output<ReadonlyArray<ReadonlyArray<string>>>;
        let parseCsvStep: ParseCsvStep;

        beforeAll(async () => {
          inputGet = jasmine.createSpy(`inputGet`).and.resolveTo(inputContent);
          input = { get: inputGet };
          outputSet = jasmine.createSpy(`outputSet`).and.resolveTo();
          output = { set: outputSet };

          parseCsvStep = new ParseCsvStep(`Test Name`, input, output);

          await parseCsvStep.execute();
        });

        it(`continues to expose its input`, () => {
          expect(parseCsvStep.input).toBe(input);
        });

        it(`reads from its input once`, () => {
          expect(inputGet).toHaveBeenCalledTimes(1);
        });

        it(`continues to expose its output`, () => {
          expect(parseCsvStep.output).toBe(output);
        });

        it(`writes to its output once`, () => {
          expect(outputSet).toHaveBeenCalledTimes(1);
        });

        it(`writes the parsed CSV to its output`, () => {
          expect(outputSet).toHaveBeenCalledWith(outputContent);
        });
      });
    };

    valid(`when empty`, ``, []);

    valid(
      `when valid and non-empty`,
      `example-value-a-a,Example Value A B,"Example, ""Value"" A C"
"Example Value """"B"""" A",Example Value "B" B, "Example
Value

  B ""C"""${`  `}
C A,C B

D A,D B,"D C" ,D D,D E
E A, E B, E C,
F A,,F C



,G B,G C
"""H"" A   ",H B,"   H ""C"""`,
      [
        [
          `example-value-a-a`,
          `Example Value A B`,
          `Example, "Value" A C`,
          ``,
          ``,
        ],
        [
          `Example Value ""B"" A`,
          `Example Value "B" B`,
          `Example\nValue\n\n  B "C"`,
          ``,
          ``,
        ],
        [`C A`, `C B`, ``, ``, ``],
        [`D A`, `D B`, `D C`, `D D`, `D E`],
        [`E A`, `E B`, `E C`, ``, ``],
        [`F A`, ``, `F C`, ``, ``],
        [``, `G B`, `G C`, ``, ``],
        [`"H" A   `, `H B`, `   H "C"`, ``, ``],
      ]
    );

    const invalid = (
      description: string,
      inputContent: string,
      errorContent: string
    ): void => {
      describe(description, () => {
        let inputGet: jasmine.Spy;
        let input: Input<string>;
        let outputSet: jasmine.Spy;
        let output: Output<ReadonlyArray<ReadonlyArray<string>>>;
        let parseCsvStep: ParseCsvStep;
        let error: null | Error = null;

        beforeAll(async () => {
          inputGet = jasmine.createSpy(`inputGet`).and.resolveTo(inputContent);
          input = { get: inputGet };
          outputSet = jasmine.createSpy(`outputSet`);
          output = { set: outputSet };

          parseCsvStep = new ParseCsvStep(`Test Name`, input, output);

          try {
            await parseCsvStep.execute();
          } catch (e) {
            error = e;
          }
        });

        it(`continues to expose its input`, () => {
          expect(parseCsvStep.input).toBe(input);
        });

        it(`reads from its input once`, () => {
          expect(inputGet).toHaveBeenCalledTimes(1);
        });

        it(`continues to expose its output`, () => {
          expect(parseCsvStep.output).toBe(output);
        });

        it(`does not write to its output`, () => {
          expect(outputSet).not.toHaveBeenCalled();
        });

        it(`throws the expected error`, () => {
          expect(error).toEqual(new Error(errorContent));
        });
      });
    };

    invalid(
      `when a string literal is unterminated by the end of the file`,
      `example-value-a-a,Example Value A B,"Example, ""Value"" A C"
"Example Value """"B"""" A",Example Value "B" B, "Example
Value

  B ""C"""${`  `}
C A,C B

D A,D B,"D C" ,D D,D E
E A, E B, E C,
F A,,F C



,G B,G C
"""H"" A   ",H B,"   H ""C""`,
      `Unterminated quoted column.`
    );

    invalid(
      `when a string literal is immediately followed by an unexpected character`,
      `example-value-a-a,Example Value A B,"Example, ""Value"" A C"
        "Example Value """"B"""" A",Example Value "B" B, "Example
Value

  B ""C"""${`  `}
C A,C B

D A,D B,"D C"q,D D,D E
E A, E B, E C,
F A,,F C



,G B,G C
"""H"" A   ",H B,"   H ""C"""`,
      `Unexpected character "q" following closing quote.`
    );

    invalid(
      `when a string literal is immediately followed by spaces, then an unexpected character`,
      `example-value-a-a,Example Value A B,"Example, ""Value"" A C"
        "Example Value """"B"""" A",Example Value "B" B, "Example
Value

  B ""C""" q
C A,C B

D A,D B,"D C",D D,D E
E A, E B, E C,
F A,,F C



,G B,G C
"""H"" A   ",H B,"   H ""C"""`,
      `Unexpected character "q" following closing quote.`
    );
  });
});

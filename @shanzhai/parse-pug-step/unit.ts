import * as pug from "pug";
import { Input, Output, Effect } from "@shanzhai/interfaces";
import { ParsePugStep } from ".";

describe(`ParsePugStep`, () => {
  const outputEffectA: Effect = {
    type: `unkeyedStoreSet`,
    store: { name: `Test Output Effect A` },
  };

  const outputEffectB: Effect = {
    type: `unkeyedStoreSet`,
    store: { name: `Test Output Effect B` },
  };

  const outputEffectC: Effect = {
    type: `unkeyedStoreSet`,
    store: { name: `Test Output Effect C` },
  };

  describe(`on construction`, () => {
    let inputGet: jasmine.Spy;
    let input: Input<string>;
    let outputSet: jasmine.Spy;
    let output: Output<pug.compileTemplate>;
    let parsePugStep: ParsePugStep;

    beforeAll(() => {
      inputGet = jasmine.createSpy(`inputGet`);
      input = { get: inputGet };
      outputSet = jasmine.createSpy(`outputSet`);
      output = {
        set: outputSet,
        effects: [outputEffectA, outputEffectB, outputEffectC],
      };

      parsePugStep = new ParsePugStep(`Test Name`, input, output);
    });

    it(`exposes its name`, () => {
      expect(parsePugStep.name).toEqual(`Test Name`);
    });

    it(`exposes the output's effects`, () => {
      expect(parsePugStep.effects).toEqual([
        outputEffectA,
        outputEffectB,
        outputEffectC,
      ]);
    });

    it(`exposes its input`, () => {
      expect(parsePugStep.input).toEqual(input);
    });

    it(`does not read from its input`, () => {
      expect(inputGet).not.toHaveBeenCalled();
    });

    it(`exposes its output`, () => {
      expect(parsePugStep.output).toEqual(output);
    });

    it(`does not write to its output`, () => {
      expect(outputSet).not.toHaveBeenCalled();
    });
  });

  describe(`on execution`, () => {
    describe(`when the file is valid`, () => {
      let inputGet: jasmine.Spy;
      let input: Input<string>;
      let outputSet: jasmine.Spy;
      let output: Output<pug.compileTemplate>;
      let parsePugStep: ParsePugStep;

      beforeAll(async () => {
        inputGet = jasmine.createSpy(`inputGet`).and.resolveTo(`example-element
  example-mid-level#an-id
    example-child.class-a
    example-child.class-b
  example-footer(example-attribute-key="example-attribute-value")`);
        input = { get: inputGet };
        outputSet = jasmine.createSpy(`outputSet`).and.resolveTo();
        output = {
          set: outputSet,
          effects: [outputEffectA, outputEffectB, outputEffectC],
        };

        parsePugStep = new ParsePugStep(`Test Name`, input, output);

        await parsePugStep.execute();
      });

      it(`continues to expose its input`, () => {
        expect(parsePugStep.input).toBe(input);
      });

      it(`reads from its input once`, () => {
        expect(inputGet).toHaveBeenCalledTimes(1);
      });

      it(`continues to expose its output`, () => {
        expect(parsePugStep.output).toBe(output);
      });

      it(`writes to its output once`, () => {
        expect(outputSet).toHaveBeenCalledTimes(1);
      });

      it(`writes a compile function to its output`, () => {
        expect(outputSet.calls.argsFor(0)[0]()).toEqual(
          `<example-element><example-mid-level id="an-id"><example-child class="class-a"></example-child><example-child class="class-b"></example-child></example-mid-level><example-footer example-attribute-key="example-attribute-value"></example-footer></example-element>`
        );
      });
    });

    describe(`when the file is invalid`, () => {
      let inputGet: jasmine.Spy;
      let input: Input<string>;
      let outputSet: jasmine.Spy;
      let output: Output<pug.compileTemplate>;
      let parsePugStep: ParsePugStep;
      let error: null | Error = null;

      beforeAll(async () => {
        inputGet = jasmine.createSpy(`inputGet`).and.resolveTo(`example-element
  example-mid-level#
    example-child.class-a
    example-child.
  example-footer(example-attribute-key=)`);
        input = { get: inputGet };
        outputSet = jasmine.createSpy(`outputSet`);
        output = {
          set: outputSet,
          effects: [outputEffectA, outputEffectB, outputEffectC],
        };

        parsePugStep = new ParsePugStep(`Test Name`, input, output);

        try {
          await parsePugStep.execute();
        } catch (e) {
          error = e;
        }
      });

      it(`continues to expose its input`, () => {
        expect(parsePugStep.input).toBe(input);
      });

      it(`reads from its input once`, () => {
        expect(inputGet).toHaveBeenCalledTimes(1);
      });

      it(`continues to expose its output`, () => {
        expect(parsePugStep.output).toBe(output);
      });

      it(`does not write to its output`, () => {
        expect(outputSet).not.toHaveBeenCalled();
      });

      it(`throws the expected error`, () => {
        expect(error).toEqual(
          new Error(`Pug:2:20
    1| example-element
  > 2|   example-mid-level#
--------------------------^
    3|     example-child.class-a
    4|     example-child.
    5|   example-footer(example-attribute-key=)

" " is not a valid ID.`)
        );
      });
    });
  });
});

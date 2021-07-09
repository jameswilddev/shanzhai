import { Input, Output, Effect } from "@shanzhai/interfaces";
import { MinifyStep } from ".";

describe(`MinifyStep`, () => {
  type TestValue =
    | `Test Value A`
    | `Test Value B`
    | `Test Value C`
    | `Test Value D`;

  class TestMinifyStep extends MinifyStep<TestValue> {
    readonly maximumIterations = 3;

    readonly iterate = jasmine.createSpy(`iterate`);
  }

  const outputEffectA: Effect = {
    type: `storeSet`,
    store: { name: `Test Output Effect A` },
  };

  const outputEffectB: Effect = {
    type: `storeSet`,
    store: { name: `Test Output Effect B` },
  };

  const outputEffectC: Effect = {
    type: `storeSet`,
    store: { name: `Test Output Effect C` },
  };

  describe(`on construction`, () => {
    let inputGet: jasmine.Spy;
    let input: Input<TestValue>;
    let outputSet: jasmine.Spy;
    let output: Output<TestValue>;
    let minifyStep: TestMinifyStep;

    beforeAll(() => {
      inputGet = jasmine.createSpy(`inputGet`);
      input = { get: inputGet };
      outputSet = jasmine.createSpy(`outputSet`);
      output = {
        set: outputSet,
        effects: [outputEffectA, outputEffectB, outputEffectC],
      };

      minifyStep = new TestMinifyStep(`Test Name`, input, output);
    });

    it(`exposes its name`, () => {
      expect(minifyStep.name).toEqual(`Test Name`);
    });

    it(`exposes the output's effects`, () => {
      expect(minifyStep.effects).toEqual([
        outputEffectA,
        outputEffectB,
        outputEffectC,
      ]);
    });

    it(`exposes its input`, () => {
      expect(minifyStep.input).toBe(input);
    });

    it(`does not read from its input`, () => {
      expect(inputGet).not.toHaveBeenCalled();
    });

    it(`exposes its output`, () => {
      expect(minifyStep.output).toBe(output);
    });

    it(`does not write to its output`, () => {
      expect(outputSet).not.toHaveBeenCalled();
    });

    it(`does not iterate`, () => {
      expect(minifyStep.iterate).not.toHaveBeenCalled();
    });
  });

  describe(`when the first iteration is stable`, () => {
    let inputGet: jasmine.Spy;
    let input: Input<TestValue>;
    let outputSet: jasmine.Spy;
    let output: Output<TestValue>;
    let minifyStep: TestMinifyStep;

    beforeAll(async () => {
      inputGet = jasmine.createSpy(`inputGet`).and.resolveTo(`Test Value A`);
      input = { get: inputGet };
      outputSet = jasmine.createSpy(`outputSet`).and.resolveTo();
      output = {
        set: outputSet,
        effects: [outputEffectA, outputEffectB, outputEffectC],
      };

      minifyStep = new TestMinifyStep(`Test Name`, input, output);
      minifyStep.iterate.and.resolveTo(`Test Value A`);

      await minifyStep.execute();
    });

    it(`continues to expose its input`, () => {
      expect(minifyStep.input).toBe(input);
    });

    it(`reads from its input once`, () => {
      expect(inputGet).toHaveBeenCalledTimes(1);
    });

    it(`continues to expose its output`, () => {
      expect(minifyStep.output).toBe(output);
    });

    it(`writes to its output once`, () => {
      expect(outputSet).toHaveBeenCalledTimes(1);
    });

    it(`writes the result of the final iteration to its output`, () => {
      expect(outputSet).toHaveBeenCalledWith(`Test Value A`);
    });

    it(`iterates once`, () => {
      expect(minifyStep.iterate).toHaveBeenCalledTimes(1);
    });

    it(`iterates using the input`, () => {
      expect(minifyStep.iterate).withContext(`Test Value A`);
    });
  });

  describe(`when the second iteration is stable`, () => {
    let inputGet: jasmine.Spy;
    let input: Input<TestValue>;
    let outputSet: jasmine.Spy;
    let output: Output<TestValue>;
    let minifyStep: TestMinifyStep;

    beforeAll(async () => {
      inputGet = jasmine.createSpy(`inputGet`).and.resolveTo(`Test Value A`);
      input = { get: inputGet };
      outputSet = jasmine.createSpy(`outputSet`).and.resolveTo();
      output = {
        set: outputSet,
        effects: [outputEffectA, outputEffectB, outputEffectC],
      };

      minifyStep = new TestMinifyStep(`Test Name`, input, output);
      minifyStep.iterate.and.resolveTo(`Test Value B`);

      await minifyStep.execute();
    });

    it(`continues to expose its input`, () => {
      expect(minifyStep.input).toBe(input);
    });

    it(`reads from its input once`, () => {
      expect(inputGet).toHaveBeenCalledTimes(1);
    });

    it(`continues to expose its output`, () => {
      expect(minifyStep.output).toBe(output);
    });

    it(`writes to its output once`, () => {
      expect(outputSet).toHaveBeenCalledTimes(1);
    });

    it(`writes the result of the final iteration to its output`, () => {
      expect(outputSet).toHaveBeenCalledWith(`Test Value B`);
    });

    it(`iterates twice`, () => {
      expect(minifyStep.iterate).toHaveBeenCalledTimes(2);
    });

    it(`iterates using the input`, () => {
      expect(minifyStep.iterate).withContext(`Test Value A`);
    });

    it(`iterates using the result of the first iteration`, () => {
      expect(minifyStep.iterate).withContext(`Test Value B`);
    });
  });

  describe(`when the third iteration is stable`, () => {
    let inputGet: jasmine.Spy;
    let input: Input<TestValue>;
    let outputSet: jasmine.Spy;
    let output: Output<TestValue>;
    let minifyStep: TestMinifyStep;

    beforeAll(async () => {
      inputGet = jasmine.createSpy(`inputGet`).and.resolveTo(`Test Value A`);
      input = { get: inputGet };
      outputSet = jasmine.createSpy(`outputSet`).and.resolveTo();
      output = {
        set: outputSet,
        effects: [outputEffectA, outputEffectB, outputEffectC],
      };

      minifyStep = new TestMinifyStep(`Test Name`, input, output);
      minifyStep.iterate.and.callFake(async (value) => {
        switch (value) {
          case `Test Value A`:
            return `Test Value B`;

          case `Test Value B`:
          case `Test Value C`:
            return `Test Value C`;

          default:
            throw new Error(`Unexpected value "${value}".`);
        }
      });

      await minifyStep.execute();
    });

    it(`continues to expose its input`, () => {
      expect(minifyStep.input).toBe(input);
    });

    it(`reads from its input once`, () => {
      expect(inputGet).toHaveBeenCalledTimes(1);
    });

    it(`continues to expose its output`, () => {
      expect(minifyStep.output).toBe(output);
    });

    it(`writes to its output once`, () => {
      expect(outputSet).toHaveBeenCalledTimes(1);
    });

    it(`writes the result of the final iteration to its output`, () => {
      expect(outputSet).toHaveBeenCalledWith(`Test Value C`);
    });

    it(`iterates three times`, () => {
      expect(minifyStep.iterate).toHaveBeenCalledTimes(3);
    });

    it(`iterates using the input`, () => {
      expect(minifyStep.iterate).withContext(`Test Value A`);
    });

    it(`iterates using the result of the first iteration`, () => {
      expect(minifyStep.iterate).withContext(`Test Value B`);
    });

    it(`iterates using the result of the second iteration`, () => {
      expect(minifyStep.iterate).withContext(`Test Value C`);
    });
  });

  describe(`when the final iteration is unstable`, () => {
    let inputGet: jasmine.Spy;
    let input: Input<TestValue>;
    let outputSet: jasmine.Spy;
    let output: Output<TestValue>;
    let minifyStep: TestMinifyStep;
    let error: null | Error = null;

    beforeAll(async () => {
      inputGet = jasmine.createSpy(`inputGet`).and.resolveTo(`Test Value A`);
      input = { get: inputGet };
      outputSet = jasmine.createSpy(`outputSet`);
      output = {
        set: outputSet,
        effects: [outputEffectA, outputEffectB, outputEffectC],
      };

      minifyStep = new TestMinifyStep(`Test Name`, input, output);
      minifyStep.iterate.and.callFake(async (value) => {
        switch (value) {
          case `Test Value A`:
            return `Test Value B`;

          case `Test Value B`:
            return `Test Value C`;

          case `Test Value C`:
            return `Test Value D`;

          default:
            throw new Error(`Unexpected value "${value}".`);
        }
      });

      try {
        await minifyStep.execute();
      } catch (e) {
        error = e;
      }
    });

    it(`continues to expose its input`, () => {
      expect(minifyStep.input).toBe(input);
    });

    it(`reads from its input once`, () => {
      expect(inputGet).toHaveBeenCalledTimes(1);
    });

    it(`continues to expose its output`, () => {
      expect(minifyStep.output).toBe(output);
    });

    it(`does not write to the output`, () => {
      expect(outputSet).not.toHaveBeenCalled();
    });

    it(`iterates three times`, () => {
      expect(minifyStep.iterate).toHaveBeenCalledTimes(3);
    });

    it(`iterates using the input`, () => {
      expect(minifyStep.iterate).withContext(`Test Value A`);
    });

    it(`iterates using the result of the first iteration`, () => {
      expect(minifyStep.iterate).withContext(`Test Value B`);
    });

    it(`iterates using the result of the second iteration`, () => {
      expect(minifyStep.iterate).withContext(`Test Value C`);
    });

    it(`throws the expected error`, () => {
      expect(error).toEqual(
        new Error(`Failed to stably minify after 3 iteration(s).`)
      );
    });
  });
});

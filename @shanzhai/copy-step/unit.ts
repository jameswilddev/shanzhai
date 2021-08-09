import { Input, Output } from "@shanzhai/interfaces";
import { CopyStep } from ".";

type TestValue = `Test Value`;

describe(`copy-step`, () => {
  describe(`on construction`, () => {
    let input: Input<TestValue>;
    let output: Output<TestValue>;
    let copyStep: CopyStep<TestValue>;

    beforeAll(() => {
      input = { get: jasmine.createSpy(`input.get`) };
      output = {
        set: jasmine.createSpy(`output.set`),
        effects: [
          {
            type: `unkeyedStoreSet`,
            unkeyedStore: {
              type: `unkeyedStore`,
              name: `Test Output Effect A`,
            },
          },
          {
            type: `unkeyedStoreSet`,
            unkeyedStore: {
              type: `unkeyedStore`,
              name: `Test Output Effect B`,
            },
          },
        ],
      };

      copyStep = new CopyStep(input, output);
    });

    it(`exposes its input`, () => {
      expect(copyStep.input).toBe(input);
    });

    it(`exposes its output`, () => {
      expect(copyStep.output).toBe(output);
    });

    it(`exposes the output's effects`, () => {
      expect(copyStep.effects).toEqual([
        {
          type: `unkeyedStoreSet`,
          unkeyedStore: {
            type: `unkeyedStore`,
            name: `Test Output Effect A`,
          },
        },
        {
          type: `unkeyedStoreSet`,
          unkeyedStore: {
            type: `unkeyedStore`,
            name: `Test Output Effect B`,
          },
        },
      ]);
    });

    it(`does not read from its input`, () => {
      expect(input.get).not.toHaveBeenCalled();
    });

    it(`does not write to its output`, () => {
      expect(output.set).not.toHaveBeenCalled();
    });
  });

  describe(`on execution`, () => {
    let input: Input<TestValue>;
    let output: Output<TestValue>;
    let copyStep: CopyStep<TestValue>;

    beforeAll(async () => {
      input = {
        get: jasmine.createSpy(`input.get`).and.resolveTo(`Test Value`),
      };
      output = {
        set: jasmine.createSpy(`output.set`).and.resolveTo(),
        effects: [
          {
            type: `unkeyedStoreSet`,
            unkeyedStore: {
              type: `unkeyedStore`,
              name: `Test Output Effect A`,
            },
          },
          {
            type: `unkeyedStoreSet`,
            unkeyedStore: {
              type: `unkeyedStore`,
              name: `Test Output Effect B`,
            },
          },
        ],
      };

      copyStep = new CopyStep(input, output);

      await copyStep.execute();
    });

    it(`continues to expose its input`, () => {
      expect(copyStep.input).toBe(input);
    });

    it(`continues to expose its output`, () => {
      expect(copyStep.output).toBe(output);
    });

    it(`continues to expose the output's effects`, () => {
      expect(copyStep.effects).toEqual([
        {
          type: `unkeyedStoreSet`,
          unkeyedStore: {
            type: `unkeyedStore`,
            name: `Test Output Effect A`,
          },
        },
        {
          type: `unkeyedStoreSet`,
          unkeyedStore: {
            type: `unkeyedStore`,
            name: `Test Output Effect B`,
          },
        },
      ]);
    });

    it(`reads from its input once`, () => {
      expect(input.get).toHaveBeenCalledTimes(1);
    });

    it(`writes to its output once`, () => {
      expect(output.set).toHaveBeenCalledTimes(1);
    });

    it(`writes the value from the input to the output`, () => {
      expect(output.set).toHaveBeenCalledWith(`Test Value`);
    });
  });
});

import { MergeKeyedJsonStep } from ".";
import { KeyedJson } from "../convert-json-to-type-script-step";
import { Input } from "../../../inputs/input";
import { Output } from "../../../outputs/output";

describe(`MergeKeyedJsonStep`, () => {
  describe(`without JSON`, () => {
    describe(`on construction`, () => {
      let output: Output<KeyedJson>;
      let mergeKeyedJsonStep: MergeKeyedJsonStep;

      beforeAll(() => {
        output = { set: jasmine.createSpy(`output.set`) };

        mergeKeyedJsonStep = new MergeKeyedJsonStep(`Test Name`, [], output);
      });

      it(`exposes the name`, () => {
        expect(mergeKeyedJsonStep.name).toEqual(`Test Name`);
      });

      it(`exposes the inputs`, () => {
        expect(mergeKeyedJsonStep.inputs).toEqual([]);
      });

      it(`exposes the output`, () => {
        expect(mergeKeyedJsonStep.output).toBe(output);
      });

      it(`does not write to the output`, () => {
        expect(output.set).not.toHaveBeenCalled();
      });
    });

    describe(`on execution`, () => {
      let output: Output<KeyedJson>;
      let mergeKeyedJsonStep: MergeKeyedJsonStep;

      beforeAll(async () => {
        output = { set: jasmine.createSpy(`output.set`) };

        mergeKeyedJsonStep = new MergeKeyedJsonStep(`Test Name`, [], output);

        await mergeKeyedJsonStep.execute();
      });

      it(`continues to expose the name`, () => {
        expect(mergeKeyedJsonStep.name).toEqual(`Test Name`);
      });

      it(`continues to expose the inputs`, () => {
        expect(mergeKeyedJsonStep.inputs).toEqual([]);
      });

      it(`continues to expose the output`, () => {
        expect(mergeKeyedJsonStep.output).toBe(output);
      });

      it(`writes to the output once`, () => {
        expect(output.set).toHaveBeenCalledTimes(1);
      });

      it(`writes the expected JSON to the output`, () => {
        expect(output.set).toHaveBeenCalledWith({});
      });
    });
  });

  describe(`with one piece of JSON`, () => {
    describe(`on construction`, () => {
      let inputA: Input<KeyedJson>;
      let output: Output<KeyedJson>;
      let mergeKeyedJsonStep: MergeKeyedJsonStep;

      beforeAll(() => {
        inputA = { get: jasmine.createSpy(`inputA.get`) };
        output = { set: jasmine.createSpy(`output.set`) };

        mergeKeyedJsonStep = new MergeKeyedJsonStep(
          `Test Name`,
          [inputA],
          output
        );
      });

      it(`exposes the name`, () => {
        expect(mergeKeyedJsonStep.name).toEqual(`Test Name`);
      });

      it(`exposes the inputs`, () => {
        expect(mergeKeyedJsonStep.inputs).toEqual([inputA]);
      });

      it(`does not read from the inputs`, () => {
        expect(inputA.get).not.toHaveBeenCalled();
      });

      it(`exposes the output`, () => {
        expect(mergeKeyedJsonStep.output).toBe(output);
      });

      it(`does not write to the output`, () => {
        expect(output.set).not.toHaveBeenCalled();
      });
    });

    describe(`on execution`, () => {
      let inputA: Input<KeyedJson>;
      let output: Output<KeyedJson>;
      let mergeKeyedJsonStep: MergeKeyedJsonStep;

      beforeAll(async () => {
        inputA = {
          get: jasmine.createSpy(`inputA.get`).and.returnValue({
            testKeyAA: `Test Key A A`,
            testKeyAB: `Test Key A B`,
            testKeyAC: `Test Key A C`,
          }),
        };
        output = { set: jasmine.createSpy(`output.set`) };

        mergeKeyedJsonStep = new MergeKeyedJsonStep(
          `Test Name`,
          [inputA],
          output
        );

        await mergeKeyedJsonStep.execute();
      });

      it(`continues to expose the name`, () => {
        expect(mergeKeyedJsonStep.name).toEqual(`Test Name`);
      });

      it(`continues to expose the inputs`, () => {
        expect(mergeKeyedJsonStep.inputs).toEqual([inputA]);
      });

      it(`reads from the inputs once`, () => {
        expect(inputA.get).toHaveBeenCalledTimes(1);
      });

      it(`continues to expose the output`, () => {
        expect(mergeKeyedJsonStep.output).toBe(output);
      });

      it(`writes to the output once`, () => {
        expect(output.set).toHaveBeenCalledTimes(1);
      });

      it(`writes the expected JSON to the output`, () => {
        expect(output.set).toHaveBeenCalledWith({
          testKeyAA: `Test Key A A`,
          testKeyAB: `Test Key A B`,
          testKeyAC: `Test Key A C`,
        });
      });
    });
  });

  describe(`with many multiple pieces of JSON`, () => {
    describe(`on construction`, () => {
      let inputA: Input<KeyedJson>;
      let inputB: Input<KeyedJson>;
      let inputC: Input<KeyedJson>;
      let output: Output<KeyedJson>;
      let mergeKeyedJsonStep: MergeKeyedJsonStep;

      beforeAll(() => {
        inputA = { get: jasmine.createSpy(`inputA.get`) };
        inputB = { get: jasmine.createSpy(`inputB.get`) };
        inputC = { get: jasmine.createSpy(`inputC.get`) };
        output = { set: jasmine.createSpy(`output.set`) };

        mergeKeyedJsonStep = new MergeKeyedJsonStep(
          `Test Name`,
          [inputA, inputB, inputC],
          output
        );
      });

      it(`exposes the name`, () => {
        expect(mergeKeyedJsonStep.name).toEqual(`Test Name`);
      });

      it(`exposes the inputs`, () => {
        expect(mergeKeyedJsonStep.inputs).toEqual([inputA, inputB, inputC]);
      });

      it(`does not read from the inputs`, () => {
        expect(inputA.get).not.toHaveBeenCalled();
        expect(inputB.get).not.toHaveBeenCalled();
        expect(inputC.get).not.toHaveBeenCalled();
      });

      it(`exposes the output`, () => {
        expect(mergeKeyedJsonStep.output).toBe(output);
      });

      it(`does not write to the output`, () => {
        expect(output.set).not.toHaveBeenCalled();
      });
    });

    describe(`on execution`, () => {
      let inputA: Input<KeyedJson>;
      let inputB: Input<KeyedJson>;
      let inputC: Input<KeyedJson>;
      let output: Output<KeyedJson>;
      let mergeKeyedJsonStep: MergeKeyedJsonStep;

      beforeAll(async () => {
        inputA = {
          get: jasmine.createSpy(`inputA.get`).and.returnValue({
            testKeyAA: `Test Key A A`,
            testKeyAB: `Test Key A B`,
            testKeyAC: `Test Key A C`,
          }),
        };
        inputB = {
          get: jasmine.createSpy(`inputB.get`).and.returnValue({
            testKeyBA: `Test Key B A`,
            testKeyBB: `Test Key B B`,
          }),
        };
        inputC = {
          get: jasmine.createSpy(`inputC.get`).and.returnValue({
            testKeyCA: `Test Key C A`,
            testKeyCB: `Test Key C B`,
            testKeyCC: `Test Key C C`,
            testKeyCD: `Test Key C D`,
          }),
        };
        output = { set: jasmine.createSpy(`output.set`) };

        mergeKeyedJsonStep = new MergeKeyedJsonStep(
          `Test Name`,
          [inputA, inputB, inputC],
          output
        );

        await mergeKeyedJsonStep.execute();
      });

      it(`continues to expose the name`, () => {
        expect(mergeKeyedJsonStep.name).toEqual(`Test Name`);
      });

      it(`continues to expose the inputs`, () => {
        expect(mergeKeyedJsonStep.inputs).toEqual([inputA, inputB, inputC]);
      });

      it(`reads from the inputs once`, () => {
        expect(inputA.get).toHaveBeenCalledTimes(1);
        expect(inputB.get).toHaveBeenCalledTimes(1);
        expect(inputC.get).toHaveBeenCalledTimes(1);
      });

      it(`continues to expose the output`, () => {
        expect(mergeKeyedJsonStep.output).toBe(output);
      });

      it(`writes to the output once`, () => {
        expect(output.set).toHaveBeenCalledTimes(1);
      });

      it(`writes the expected JSON to the output`, () => {
        expect(output.set).toHaveBeenCalledWith({
          testKeyAA: `Test Key A A`,
          testKeyAB: `Test Key A B`,
          testKeyAC: `Test Key A C`,
          testKeyBA: `Test Key B A`,
          testKeyBB: `Test Key B B`,
          testKeyCA: `Test Key C A`,
          testKeyCB: `Test Key C B`,
          testKeyCC: `Test Key C C`,
          testKeyCD: `Test Key C D`,
        });
      });
    });
  });
});

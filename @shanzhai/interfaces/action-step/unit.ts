import { ActionStep } from "..";
import { Input } from "../input";
import { Output } from "../output";

describe(`ActionStep`, () => {
  class TestActionStep extends ActionStep {
    readonly execute = jasmine.createSpy(`execute`);
  }

  describe(`on construction`, () => {
    let actionStep: TestActionStep;

    let inputAGet: jasmine.Spy;
    let inputA: Input<number>;
    let inputBGet: jasmine.Spy;
    let inputB: Input<boolean>;

    let outputASet: jasmine.Spy;
    let outputA: Output<string>;
    let outputBSet: jasmine.Spy;
    let outputB: Output<ReadonlyArray<string>>;
    let outputCSet: jasmine.Spy;
    let outputC: Output<ReadonlyArray<number>>;

    beforeAll(() => {
      inputAGet = jasmine.createSpy(`inputAGet`);
      inputA = { get: inputAGet };
      inputBGet = jasmine.createSpy(`inputBGet`);
      inputB = { get: inputBGet };

      outputASet = jasmine.createSpy(`outputASet`);
      outputA = { set: outputASet };
      outputBSet = jasmine.createSpy(`outputBSet`);
      outputB = { set: outputBSet };
      outputCSet = jasmine.createSpy(`outputCSet`);
      outputC = { set: outputCSet };

      actionStep = new TestActionStep(
        `Test Name`,
        [inputA, inputB],
        [outputA, outputB, outputC]
      );
    });

    it(`exposes its name`, () => {
      expect(actionStep.name).toEqual(`Test Name`);
    });

    it(`exposes its inputs`, () => {
      expect(actionStep.inputs).toEqual([inputA, inputB]);
    });

    it(`does not get any of its inputs`, () => {
      expect(inputAGet).not.toHaveBeenCalled();
      expect(inputBGet).not.toHaveBeenCalled();
    });

    it(`exposes its outputs`, () => {
      expect(actionStep.outputs).toEqual([outputA, outputB, outputC]);
    });

    it(`does not set any of its outputs`, () => {
      expect(outputASet).not.toHaveBeenCalled();
      expect(outputBSet).not.toHaveBeenCalled();
      expect(outputCSet).not.toHaveBeenCalled();
    });

    it(`does not execute itself`, () => {
      expect(actionStep.execute).not.toHaveBeenCalled();
    });
  });

  describe(`on calling executePerActionStep`, () => {
    let actionStep: TestActionStep;

    let inputAGet: jasmine.Spy;
    let inputA: Input<number>;
    let inputBGet: jasmine.Spy;
    let inputB: Input<boolean>;

    let outputASet: jasmine.Spy;
    let outputA: Output<string>;
    let outputBSet: jasmine.Spy;
    let outputB: Output<ReadonlyArray<string>>;
    let outputCSet: jasmine.Spy;
    let outputC: Output<ReadonlyArray<number>>;

    let callback: jasmine.Spy;

    beforeAll(() => {
      inputAGet = jasmine.createSpy(`inputAGet`);
      inputA = { get: inputAGet };
      inputBGet = jasmine.createSpy(`inputBGet`);
      inputB = { get: inputBGet };

      outputASet = jasmine.createSpy(`outputASet`);
      outputA = { set: outputASet };
      outputBSet = jasmine.createSpy(`outputBSet`);
      outputB = { set: outputBSet };
      outputCSet = jasmine.createSpy(`outputCSet`);
      outputC = { set: outputCSet };

      actionStep = new TestActionStep(
        `Test Name`,
        [inputA, inputB],
        [outputA, outputB, outputC]
      );

      callback = jasmine.createSpy(`callback`);

      actionStep.executePerActionStep(callback);
    });

    it(`exposes its name`, () => {
      expect(actionStep.name).toEqual(`Test Name`);
    });

    it(`exposes its inputs`, () => {
      expect(actionStep.inputs).toEqual([inputA, inputB]);
    });

    it(`does not get any of its inputs`, () => {
      expect(inputAGet).not.toHaveBeenCalled();
      expect(inputBGet).not.toHaveBeenCalled();
    });

    it(`exposes its outputs`, () => {
      expect(actionStep.outputs).toEqual([outputA, outputB, outputC]);
    });

    it(`does not set any of its outputs`, () => {
      expect(outputASet).not.toHaveBeenCalled();
      expect(outputBSet).not.toHaveBeenCalled();
      expect(outputCSet).not.toHaveBeenCalled();
    });

    it(`does not execute itself`, () => {
      expect(actionStep.execute).not.toHaveBeenCalled();
    });

    it(`executes the callback once`, () => {
      expect(callback).toHaveBeenCalledTimes(1);
    });

    it(`executes the callback with itself as the argument`, () => {
      expect(callback).toHaveBeenCalledWith(actionStep);
    });
  });
});

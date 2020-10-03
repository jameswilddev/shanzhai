import { ActionStep } from "..";
import { Output } from "../output";

describe(`ActionStep`, () => {
  class TestActionStep extends ActionStep {
    readonly execute = jasmine.createSpy(`execute`);
  }

  describe(`on construction`, () => {
    let actionStep: TestActionStep;

    let outputASet: jasmine.Spy;
    let outputA: Output<string>;
    let outputBSet: jasmine.Spy;
    let outputB: Output<ReadonlyArray<string>>;
    let outputCSet: jasmine.Spy;
    let outputC: Output<ReadonlyArray<number>>;

    beforeAll(() => {
      outputASet = jasmine.createSpy(`outputASet`);
      outputA = { set: outputASet, effects: [] };
      outputBSet = jasmine.createSpy(`outputBSet`);
      outputB = { set: outputBSet, effects: [] };
      outputCSet = jasmine.createSpy(`outputCSet`);
      outputC = { set: outputCSet, effects: [] };

      actionStep = new TestActionStep(`Test Name`, [outputA, outputB, outputC]);
    });

    it(`exposes its name`, () => {
      expect(actionStep.name).toEqual(`Test Name`);
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

    let outputASet: jasmine.Spy;
    let outputA: Output<string>;
    let outputBSet: jasmine.Spy;
    let outputB: Output<ReadonlyArray<string>>;
    let outputCSet: jasmine.Spy;
    let outputC: Output<ReadonlyArray<number>>;

    let callback: jasmine.Spy;

    beforeAll(() => {
      outputASet = jasmine.createSpy(`outputASet`);
      outputA = { set: outputASet, effects: [] };
      outputBSet = jasmine.createSpy(`outputBSet`);
      outputB = { set: outputBSet, effects: [] };
      outputCSet = jasmine.createSpy(`outputCSet`);
      outputC = { set: outputCSet, effects: [] };

      actionStep = new TestActionStep(`Test Name`, [outputA, outputB, outputC]);

      callback = jasmine.createSpy(`callback`);

      actionStep.executePerActionStep(callback);
    });

    it(`exposes its name`, () => {
      expect(actionStep.name).toEqual(`Test Name`);
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

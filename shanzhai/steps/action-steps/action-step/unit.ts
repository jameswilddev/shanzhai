import { ActionStep } from ".";

describe(`ActionStep`, () => {
  class TestActionStep extends ActionStep {
    readonly execute = jasmine.createSpy(`execute`);
  }

  describe(`on construction`, () => {
    let actionStep: TestActionStep;

    beforeAll(() => {
      actionStep = new TestActionStep(`Test Name`);
    });

    it(`exposes its name`, () => {
      expect(actionStep.name).toEqual(`Test Name`);
    });

    it(`does not execute itself`, () => {
      expect(actionStep.execute).not.toHaveBeenCalled();
    });
  });

  describe(`on calling executePerActionStep`, () => {
    let actionStep: TestActionStep;
    let callback: jasmine.Spy;

    beforeAll(() => {
      callback = jasmine.createSpy(`callback`);

      actionStep = new TestActionStep(`Test Name`);

      actionStep.executePerActionStep(callback);
    });

    it(`exposes its name`, () => {
      expect(actionStep.name).toEqual(`Test Name`);
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

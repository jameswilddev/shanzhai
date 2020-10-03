import { ActionStep } from "..";
import { Effect } from "../effect";

describe(`ActionStep`, () => {
  class TestActionStep extends ActionStep {
    readonly execute = jasmine.createSpy(`execute`);
  }

  describe(`on construction`, () => {
    let actionStep: TestActionStep;

    let effectA: Effect;
    let effectB: Effect;
    let effectC: Effect;

    beforeAll(() => {
      effectA = { type: `storeUpdate`, store: { name: `Test Name` } };
      effectB = { type: `storeUpdate`, store: { name: `Test Name` } };
      effectC = { type: `storeUpdate`, store: { name: `Test Name` } };

      actionStep = new TestActionStep(`Test Name`, [effectA, effectB, effectC]);
    });

    it(`exposes its name`, () => {
      expect(actionStep.name).toEqual(`Test Name`);
    });

    it(`exposes its effects`, () => {
      expect(actionStep.effects).toEqual([effectA, effectB, effectC]);
    });

    it(`does not execute itself`, () => {
      expect(actionStep.execute).not.toHaveBeenCalled();
    });
  });

  describe(`on calling executePerActionStep`, () => {
    let actionStep: TestActionStep;

    let effectA: Effect;
    let effectB: Effect;
    let effectC: Effect;

    let callback: jasmine.Spy;

    beforeAll(() => {
      effectA = { type: `storeUpdate`, store: { name: `Test Name` } };
      effectB = { type: `storeUpdate`, store: { name: `Test Name` } };
      effectC = { type: `storeUpdate`, store: { name: `Test Name` } };

      actionStep = new TestActionStep(`Test Name`, [effectA, effectB, effectC]);

      callback = jasmine.createSpy(`callback`);

      actionStep.executePerActionStep(callback);
    });

    it(`exposes its name`, () => {
      expect(actionStep.name).toEqual(`Test Name`);
    });

    it(`exposes its effects`, () => {
      expect(actionStep.effects).toEqual([effectA, effectB, effectC]);
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

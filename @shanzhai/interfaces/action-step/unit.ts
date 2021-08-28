import { ActionStep } from "..";
import { Effect } from "../effect";
import { UnkeyedStore } from "../stores/unkeyed-store";

describe(`ActionStep`, () => {
  class TestActionStep extends ActionStep {
    readonly execute = jasmine.createSpy(`execute`);
  }

  describe(`on construction`, () => {
    let actionStep: TestActionStep;

    let unkeyedStore: UnkeyedStore<unknown>;
    let effectA: Effect;
    let effectB: Effect;
    let effectC: Effect;

    beforeAll(() => {
      unkeyedStore = {
        type: `unkeyedStore`,
        name: `Test Name`,
        get: jasmine.createSpy(`unkeyedStore.get`),
        set: jasmine.createSpy(`unkeyedStore.set`),
      };
      effectA = {
        type: `unkeyedStoreSet`,
        unkeyedStore,
      };
      effectB = {
        type: `unkeyedStoreSet`,
        unkeyedStore,
      };
      effectC = {
        type: `unkeyedStoreSet`,
        unkeyedStore,
      };

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

    it(`does not interact with its effects`, () => {
      expect(unkeyedStore.get).not.toHaveBeenCalled();
      expect(unkeyedStore.set).not.toHaveBeenCalled();
    });
  });

  describe(`on calling executePerActionStep`, () => {
    let actionStep: TestActionStep;

    let unkeyedStore: UnkeyedStore<unknown>;
    let effectA: Effect;
    let effectB: Effect;
    let effectC: Effect;

    let callback: jasmine.Spy;

    beforeAll(() => {
      unkeyedStore = {
        type: `unkeyedStore`,
        name: `Test Name`,
        get: jasmine.createSpy(`unkeyedStore.get`),
        set: jasmine.createSpy(`unkeyedStore.set`),
      };
      effectA = {
        type: `unkeyedStoreSet`,
        unkeyedStore,
      };
      effectB = {
        type: `unkeyedStoreSet`,
        unkeyedStore,
      };
      effectC = {
        type: `unkeyedStoreSet`,
        unkeyedStore,
      };

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

    it(`does not interact with its effects`, () => {
      expect(unkeyedStore.get).not.toHaveBeenCalled();
      expect(unkeyedStore.set).not.toHaveBeenCalled();
    });
  });
});

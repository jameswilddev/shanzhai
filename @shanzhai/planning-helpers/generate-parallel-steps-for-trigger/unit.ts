import { KeyedStore, Step, Diff } from "@shanzhai/interfaces";
import { SerialStep } from "@shanzhai/serial-step";
import { generateParallelStepsForTrigger } from ".";
import { UnkeyedStore } from "@shanzhai/interfaces";

describe(`generateParallelStepsForTrigger`, () => {
  describe(`oneTime`, () => {
    let effectSetUnkeyedStoreGet: jasmine.Spy;
    let effectSetUnkeyedStoreSet: jasmine.Spy;
    let effectSetKeyedStoreGet: jasmine.Spy;
    let effectSetKeyedStoreSet: jasmine.Spy;
    let effectSetKeyedStoreDelete: jasmine.Spy;
    let effectSetKeyedStoreGetAll: jasmine.Spy;
    let effectSetKeyedStoreGetKeys: jasmine.Spy;
    let effectDeletedKeyedStoreGet: jasmine.Spy;
    let effectDeletedKeyedStoreSet: jasmine.Spy;
    let effectDeletedKeyedStoreDelete: jasmine.Spy;
    let effectDeletedKeyedStoreGetAll: jasmine.Spy;
    let effectDeletedKeyedStoreGetKeys: jasmine.Spy;
    let writtenUnkeyedStoreGet: jasmine.Spy;
    let writtenUnkeyedStoreSet: jasmine.Spy;
    let writtenKeyedStoreGet: jasmine.Spy;
    let writtenKeyedStoreSet: jasmine.Spy;
    let writtenKeyedStoreDelete: jasmine.Spy;
    let writtenKeyedStoreGetAll: jasmine.Spy;
    let writtenKeyedStoreGetKeys: jasmine.Spy;
    let up: jasmine.Spy;
    let stepExecutePerActionStep: jasmine.Spy;
    let stepEffectSetUnkeyedStoreGet: jasmine.Spy;
    let stepEffectSetUnkeyedStoreSet: jasmine.Spy;
    let stepEffectSetKeyedStoreGet: jasmine.Spy;
    let stepEffectSetKeyedStoreSet: jasmine.Spy;
    let stepEffectSetKeyedStoreDelete: jasmine.Spy;
    let stepEffectSetKeyedStoreGetAll: jasmine.Spy;
    let stepEffectSetKeyedStoreGetKeys: jasmine.Spy;
    let stepEffectDeletedKeyedStoreGet: jasmine.Spy;
    let stepEffectDeletedKeyedStoreSet: jasmine.Spy;
    let stepEffectDeletedKeyedStoreDelete: jasmine.Spy;
    let stepEffectDeletedKeyedStoreGetAll: jasmine.Spy;
    let stepEffectDeletedKeyedStoreGetKeys: jasmine.Spy;
    let step: Step;
    let result: {
      readonly unclaimedFiles: Diff<string>;
      readonly parallelSteps: ReadonlyArray<Step>;
    };

    beforeAll(async () => {
      effectSetUnkeyedStoreGet = jasmine.createSpy(`effectSetUnkeyedStoreGet`);
      effectSetUnkeyedStoreSet = jasmine.createSpy(`effectSetUnkeyedStoreSet`);
      const effectSetUnkeyedStore: UnkeyedStore<unknown> = {
        type: `unkeyedStore`,
        name: `effectSetUnkeyedStore`,
        get: effectSetUnkeyedStoreGet,
        set: effectSetUnkeyedStoreSet,
      };
      effectSetKeyedStoreGet = jasmine.createSpy(`effectSetKeyedStoreGet`);
      effectSetKeyedStoreSet = jasmine.createSpy(`effectSetKeyedStoreSet`);
      effectSetKeyedStoreDelete = jasmine.createSpy(
        `effectSetKeyedStoreDelete`
      );
      effectSetKeyedStoreGetAll = jasmine.createSpy(
        `effectSetKeyedStoreGetAll`
      );
      effectSetKeyedStoreGetKeys = jasmine.createSpy(
        `effectSetKeyedStoreGetKeys`
      );
      const effectSetKeyedStore: KeyedStore<unknown> = {
        type: `keyedStore`,
        name: `effectSetKeyedStore`,
        get: effectSetKeyedStoreGet,
        set: effectSetKeyedStoreSet,
        delete: effectSetKeyedStoreDelete,
        getAll: effectSetKeyedStoreGetAll,
        getKeys: effectSetKeyedStoreGetKeys,
      };
      effectDeletedKeyedStoreGet = jasmine.createSpy(
        `effectDeletedKeyedStoreGet`
      );
      effectDeletedKeyedStoreSet = jasmine.createSpy(
        `effectDeletedKeyedStoreSet`
      );
      effectDeletedKeyedStoreDelete = jasmine.createSpy(
        `effectDeletedKeyedStoreDelete`
      );
      effectDeletedKeyedStoreGetAll = jasmine.createSpy(
        `effectDeletedKeyedStoreGetAll`
      );
      effectDeletedKeyedStoreGetKeys = jasmine.createSpy(
        `effectDeletedKeyedStoreGetKeys`
      );
      const effectDeletedKeyedStore: KeyedStore<unknown> = {
        type: `keyedStore`,
        name: `effectDeletedKeyedStore`,
        get: effectDeletedKeyedStoreGet,
        set: effectDeletedKeyedStoreSet,
        delete: effectDeletedKeyedStoreDelete,
        getAll: effectDeletedKeyedStoreGetAll,
        getKeys: effectDeletedKeyedStoreGetKeys,
      };
      writtenUnkeyedStoreGet = jasmine.createSpy(`writtenUnkeyedStoreGet`);
      writtenUnkeyedStoreSet = jasmine.createSpy(`writtenUnkeyedStoreSet`);
      const writtenUnkeyedStore: UnkeyedStore<unknown> = {
        type: `unkeyedStore`,
        name: `writtenUnkeyedStore`,
        get: writtenUnkeyedStoreGet,
        set: writtenUnkeyedStoreSet,
      };
      writtenKeyedStoreGet = jasmine.createSpy(`writtenKeyedStoreGet`);
      writtenKeyedStoreSet = jasmine.createSpy(`writtenKeyedStoreSet`);
      writtenKeyedStoreDelete = jasmine.createSpy(`writtenKeyedStoreDelete`);
      writtenKeyedStoreGetAll = jasmine.createSpy(`writtenKeyedStoreGetAll`);
      writtenKeyedStoreGetKeys = jasmine.createSpy(`writtenKeyedStoreGetKeys`);
      const writtenKeyedStore: KeyedStore<unknown> = {
        type: `keyedStore`,
        name: `writtenKeyedStore`,
        get: writtenKeyedStoreGet,
        set: writtenKeyedStoreSet,
        delete: writtenKeyedStoreDelete,
        getAll: writtenKeyedStoreGetAll,
        getKeys: writtenKeyedStoreGetKeys,
      };
      stepExecutePerActionStep = jasmine.createSpy(`stepExecutePerActionStep`);
      stepEffectSetUnkeyedStoreGet = jasmine.createSpy(
        `stepEffectSetUnkeyedStoreGet`
      );
      stepEffectSetUnkeyedStoreSet = jasmine.createSpy(
        `stepEffectSetUnkeyedStoreSet`
      );
      const stepEffectSetUnkeyedStore: UnkeyedStore<unknown> = {
        type: `unkeyedStore`,
        name: `stepEffectSetUnkeyedStore`,
        get: stepEffectSetUnkeyedStoreGet,
        set: stepEffectSetUnkeyedStoreSet,
      };
      stepEffectSetKeyedStoreGet = jasmine.createSpy(
        `stepEffectSetKeyedStoreGet`
      );
      stepEffectSetKeyedStoreSet = jasmine.createSpy(
        `stepEffectSetKeyedStoreSet`
      );
      stepEffectSetKeyedStoreDelete = jasmine.createSpy(
        `stepEffectSetKeyedStoreDelete`
      );
      stepEffectSetKeyedStoreGetAll = jasmine.createSpy(
        `stepEffectSetKeyedStoreGetAll`
      );
      stepEffectSetKeyedStoreGetKeys = jasmine.createSpy(
        `stepEffectSetKeyedStoreGetKeys`
      );
      const stepEffectSetKeyedStore: KeyedStore<unknown> = {
        type: `keyedStore`,
        name: `stepEffectSetKeyedStore`,
        get: stepEffectSetKeyedStoreGet,
        set: stepEffectSetKeyedStoreSet,
        delete: stepEffectSetKeyedStoreDelete,
        getAll: stepEffectSetKeyedStoreGetAll,
        getKeys: stepEffectSetKeyedStoreGetKeys,
      };
      stepEffectDeletedKeyedStoreGet = jasmine.createSpy(
        `stepEffectDeletedKeyedStoreGet`
      );
      stepEffectDeletedKeyedStoreSet = jasmine.createSpy(
        `stepEffectDeletedKeyedStoreSet`
      );
      stepEffectDeletedKeyedStoreDelete = jasmine.createSpy(
        `stepEffectDeletedKeyedStoreDelete`
      );
      stepEffectDeletedKeyedStoreGetAll = jasmine.createSpy(
        `stepEffectDeletedKeyedStoreGetAll`
      );
      stepEffectDeletedKeyedStoreGetKeys = jasmine.createSpy(
        `stepEffectDeletedKeyedStoreGetKeys`
      );
      const stepEffectDeletedKeyedStore: KeyedStore<unknown> = {
        type: `keyedStore`,
        name: `stepEffectDeletedKeyedStore`,
        get: stepEffectDeletedKeyedStoreGet,
        set: stepEffectDeletedKeyedStoreSet,
        delete: stepEffectDeletedKeyedStoreDelete,
        getAll: stepEffectDeletedKeyedStoreGetAll,
        getKeys: stepEffectDeletedKeyedStoreGetKeys,
      };
      step = {
        name: `step`,
        executePerActionStep: stepExecutePerActionStep,
        effects: [
          {
            type: `unkeyedStoreSet`,
            unkeyedStore: stepEffectSetUnkeyedStore,
          },
          {
            type: `keyedStoreSet`,
            keyedStore: stepEffectSetKeyedStore,
            key: `Test Set Key`,
          },
          {
            type: `keyedStoreDelete`,
            keyedStore: stepEffectDeletedKeyedStore,
            key: `Test Deleted Key`,
          },
        ],
      };
      up = jasmine.createSpy(`up`).and.returnValue(step);

      result = await generateParallelStepsForTrigger(
        {
          added: [
            `Test Added Path A`,
            `Test Added Path B`,
            `Test Added Path C`,
          ],
          changed: [`Test Changed Path A`, `Test Changed Path B`],
          unchanged: [
            `Test Unchanged Path A`,
            `Test Unchanged Path B`,
            `Test Unchanged Path C`,
            `Test Unchanged Path D`,
            `Test Unchanged Path E`,
          ],
          deleted: [
            `Test Deleted Path A`,
            `Test Deleted Path B`,
            `Test Deleted Path C`,
          ],
        },
        [
          {
            type: `unkeyedStoreSet`,
            unkeyedStore: effectSetUnkeyedStore,
          },
          {
            type: `keyedStoreSet`,
            keyedStore: effectSetKeyedStore,
            key: `Test Set Key`,
          },
          {
            type: `keyedStoreDelete`,
            keyedStore: effectDeletedKeyedStore,
            key: `Test Deleted Key`,
          },
        ],
        {
          type: `oneTime`,
          up,
          writesToStores: [writtenUnkeyedStore, writtenKeyedStore],
        }
      );
    });

    it(`creates one step`, () => {
      expect(up).toHaveBeenCalledTimes(1);
    });

    it(`returns the created step`, () => {
      expect(result.parallelSteps).toEqual([step]);
    });

    it(`returns the given unclaimed files`, () => {
      expect(result.unclaimedFiles).toEqual({
        added: [`Test Added Path A`, `Test Added Path B`, `Test Added Path C`],
        changed: [`Test Changed Path A`, `Test Changed Path B`],
        unchanged: [
          `Test Unchanged Path A`,
          `Test Unchanged Path B`,
          `Test Unchanged Path C`,
          `Test Unchanged Path D`,
          `Test Unchanged Path E`,
        ],
        deleted: [
          `Test Deleted Path A`,
          `Test Deleted Path B`,
          `Test Deleted Path C`,
        ],
      });
    });

    it(`does not interact with any stores`, () => {
      expect(effectSetUnkeyedStoreGet).not.toHaveBeenCalled();
      expect(effectSetUnkeyedStoreSet).not.toHaveBeenCalled();
      expect(effectSetKeyedStoreGet).not.toHaveBeenCalled();
      expect(effectSetKeyedStoreSet).not.toHaveBeenCalled();
      expect(effectSetKeyedStoreDelete).not.toHaveBeenCalled();
      expect(effectSetKeyedStoreGetAll).not.toHaveBeenCalled();
      expect(effectSetKeyedStoreGetKeys).not.toHaveBeenCalled();
      expect(effectDeletedKeyedStoreGet).not.toHaveBeenCalled();
      expect(effectDeletedKeyedStoreSet).not.toHaveBeenCalled();
      expect(effectDeletedKeyedStoreDelete).not.toHaveBeenCalled();
      expect(effectDeletedKeyedStoreGetAll).not.toHaveBeenCalled();
      expect(effectDeletedKeyedStoreGetKeys).not.toHaveBeenCalled();
      expect(writtenUnkeyedStoreGet).not.toHaveBeenCalled();
      expect(writtenUnkeyedStoreSet).not.toHaveBeenCalled();
      expect(writtenKeyedStoreGet).not.toHaveBeenCalled();
      expect(writtenKeyedStoreSet).not.toHaveBeenCalled();
      expect(writtenKeyedStoreDelete).not.toHaveBeenCalled();
      expect(writtenKeyedStoreGetAll).not.toHaveBeenCalled();
      expect(writtenKeyedStoreGetKeys).not.toHaveBeenCalled();
      expect(stepEffectSetUnkeyedStoreGet).not.toHaveBeenCalled();
      expect(stepEffectSetUnkeyedStoreSet).not.toHaveBeenCalled();
      expect(stepEffectSetKeyedStoreGet).not.toHaveBeenCalled();
      expect(stepEffectSetKeyedStoreSet).not.toHaveBeenCalled();
      expect(stepEffectSetKeyedStoreDelete).not.toHaveBeenCalled();
      expect(stepEffectSetKeyedStoreGetAll).not.toHaveBeenCalled();
      expect(stepEffectSetKeyedStoreGetKeys).not.toHaveBeenCalled();
      expect(stepEffectDeletedKeyedStoreGet).not.toHaveBeenCalled();
      expect(stepEffectDeletedKeyedStoreSet).not.toHaveBeenCalled();
      expect(stepEffectDeletedKeyedStoreDelete).not.toHaveBeenCalled();
      expect(stepEffectDeletedKeyedStoreGetAll).not.toHaveBeenCalled();
      expect(stepEffectDeletedKeyedStoreGetKeys).not.toHaveBeenCalled();
    });

    it(`does not interact with any steps`, () => {
      expect(stepExecutePerActionStep).not.toHaveBeenCalled();
    });
  });

  describe(`file`, () => {
    let effectSetUnkeyedStoreGet: jasmine.Spy;
    let effectSetUnkeyedStoreSet: jasmine.Spy;
    let effectSetKeyedStoreGet: jasmine.Spy;
    let effectSetKeyedStoreSet: jasmine.Spy;
    let effectSetKeyedStoreDelete: jasmine.Spy;
    let effectSetKeyedStoreGetAll: jasmine.Spy;
    let effectSetKeyedStoreGetKeys: jasmine.Spy;
    let effectDeletedKeyedStoreGet: jasmine.Spy;
    let effectDeletedKeyedStoreSet: jasmine.Spy;
    let effectDeletedKeyedStoreDelete: jasmine.Spy;
    let effectDeletedKeyedStoreGetAll: jasmine.Spy;
    let effectDeletedKeyedStoreGetKeys: jasmine.Spy;
    let writtenUnkeyedStoreGet: jasmine.Spy;
    let writtenUnkeyedStoreSet: jasmine.Spy;
    let writtenKeyedStoreGet: jasmine.Spy;
    let writtenKeyedStoreSet: jasmine.Spy;
    let writtenKeyedStoreDelete: jasmine.Spy;
    let writtenKeyedStoreGetAll: jasmine.Spy;
    let writtenKeyedStoreGetKeys: jasmine.Spy;
    let up: jasmine.Spy;
    let down: jasmine.Spy;
    let stepEffectSetUnkeyedStoreGet: jasmine.Spy;
    let stepEffectSetUnkeyedStoreSet: jasmine.Spy;
    let stepEffectSetKeyedStoreGet: jasmine.Spy;
    let stepEffectSetKeyedStoreSet: jasmine.Spy;
    let stepEffectSetKeyedStoreDelete: jasmine.Spy;
    let stepEffectSetKeyedStoreGetAll: jasmine.Spy;
    let stepEffectSetKeyedStoreGetKeys: jasmine.Spy;
    let stepEffectDeletedKeyedStoreGet: jasmine.Spy;
    let stepEffectDeletedKeyedStoreSet: jasmine.Spy;
    let stepEffectDeletedKeyedStoreDelete: jasmine.Spy;
    let stepEffectDeletedKeyedStoreGetAll: jasmine.Spy;
    let stepEffectDeletedKeyedStoreGetKeys: jasmine.Spy;
    let addExecutePerActionStep: jasmine.Spy;
    let addStep: Step;
    let changeDownExecutePerActionStep: jasmine.Spy;
    let changeDownStep: Step;
    let changeUpExecutePerActionStep: jasmine.Spy;
    let changeUpStep: Step;
    let deletedExecutePerActionStep: jasmine.Spy;
    let deleteStep: Step;
    let result: {
      readonly unclaimedFiles: Diff<string>;
      readonly parallelSteps: ReadonlyArray<Step>;
    };

    beforeAll(async () => {
      effectSetUnkeyedStoreGet = jasmine.createSpy(`effectSetUnkeyedStoreGet`);
      effectSetUnkeyedStoreSet = jasmine.createSpy(`effectSetUnkeyedStoreSet`);
      const effectSetUnkeyedStore: UnkeyedStore<unknown> = {
        type: `unkeyedStore`,
        name: `effectSetUnkeyedStore`,
        get: effectSetUnkeyedStoreGet,
        set: effectSetUnkeyedStoreSet,
      };
      effectSetKeyedStoreGet = jasmine.createSpy(`effectSetKeyedStoreGet`);
      effectSetKeyedStoreSet = jasmine.createSpy(`effectSetKeyedStoreSet`);
      effectSetKeyedStoreDelete = jasmine.createSpy(
        `effectSetKeyedStoreDelete`
      );
      effectSetKeyedStoreGetAll = jasmine.createSpy(
        `effectSetKeyedStoreGetAll`
      );
      effectSetKeyedStoreGetKeys = jasmine.createSpy(
        `effectSetKeyedStoreGetKeys`
      );
      const effectSetKeyedStore: KeyedStore<unknown> = {
        type: `keyedStore`,
        name: `effectSetKeyedStore`,
        get: effectSetKeyedStoreGet,
        set: effectSetKeyedStoreSet,
        delete: effectSetKeyedStoreDelete,
        getAll: effectSetKeyedStoreGetAll,
        getKeys: effectSetKeyedStoreGetKeys,
      };
      effectDeletedKeyedStoreGet = jasmine.createSpy(
        `effectDeletedKeyedStoreGet`
      );
      effectDeletedKeyedStoreSet = jasmine.createSpy(
        `effectDeletedKeyedStoreSet`
      );
      effectDeletedKeyedStoreDelete = jasmine.createSpy(
        `effectDeletedKeyedStoreDelete`
      );
      effectDeletedKeyedStoreGetAll = jasmine.createSpy(
        `effectDeletedKeyedStoreGetAll`
      );
      effectDeletedKeyedStoreGetKeys = jasmine.createSpy(
        `effectDeletedKeyedStoreGetKeys`
      );
      const effectDeletedKeyedStore: KeyedStore<unknown> = {
        type: `keyedStore`,
        name: `effectDeletedKeyedStore`,
        get: effectDeletedKeyedStoreGet,
        set: effectDeletedKeyedStoreSet,
        delete: effectDeletedKeyedStoreDelete,
        getAll: effectDeletedKeyedStoreGetAll,
        getKeys: effectDeletedKeyedStoreGetKeys,
      };
      writtenUnkeyedStoreGet = jasmine.createSpy(`writtenUnkeyedStoreGet`);
      writtenUnkeyedStoreSet = jasmine.createSpy(`writtenUnkeyedStoreSet`);
      const writtenUnkeyedStore: UnkeyedStore<unknown> = {
        type: `unkeyedStore`,
        name: `writtenUnkeyedStore`,
        get: writtenUnkeyedStoreGet,
        set: writtenUnkeyedStoreSet,
      };
      writtenKeyedStoreGet = jasmine.createSpy(`writtenKeyedStoreGet`);
      writtenKeyedStoreSet = jasmine.createSpy(`writtenKeyedStoreSet`);
      writtenKeyedStoreDelete = jasmine.createSpy(`writtenKeyedStoreDelete`);
      writtenKeyedStoreGetAll = jasmine.createSpy(`writtenKeyedStoreGetAll`);
      writtenKeyedStoreGetKeys = jasmine.createSpy(`writtenKeyedStoreGetKeys`);
      const writtenKeyedStore: KeyedStore<unknown> = {
        type: `keyedStore`,
        name: `writtenKeyedStore`,
        get: writtenKeyedStoreGet,
        set: writtenKeyedStoreSet,
        delete: writtenKeyedStoreDelete,
        getAll: writtenKeyedStoreGetAll,
        getKeys: writtenKeyedStoreGetKeys,
      };
      stepEffectSetUnkeyedStoreGet = jasmine.createSpy(
        `stepEffectSetUnkeyedStoreGet`
      );
      stepEffectSetUnkeyedStoreSet = jasmine.createSpy(
        `stepEffectSetUnkeyedStoreSet`
      );
      const stepEffectSetUnkeyedStore: UnkeyedStore<unknown> = {
        type: `unkeyedStore`,
        name: `stepEffectSetUnkeyedStore`,
        get: stepEffectSetUnkeyedStoreGet,
        set: stepEffectSetUnkeyedStoreSet,
      };
      stepEffectSetKeyedStoreGet = jasmine.createSpy(
        `stepEffectSetKeyedStoreGet`
      );
      stepEffectSetKeyedStoreSet = jasmine.createSpy(
        `stepEffectSetKeyedStoreSet`
      );
      stepEffectSetKeyedStoreDelete = jasmine.createSpy(
        `stepEffectSetKeyedStoreDelete`
      );
      stepEffectSetKeyedStoreGetAll = jasmine.createSpy(
        `stepEffectSetKeyedStoreGetAll`
      );
      stepEffectSetKeyedStoreGetKeys = jasmine.createSpy(
        `stepEffectSetKeyedStoreGetKeys`
      );
      const stepEffectSetKeyedStore: KeyedStore<unknown> = {
        type: `keyedStore`,
        name: `stepEffectSetKeyedStore`,
        get: stepEffectSetKeyedStoreGet,
        set: stepEffectSetKeyedStoreSet,
        delete: stepEffectSetKeyedStoreDelete,
        getAll: stepEffectSetKeyedStoreGetAll,
        getKeys: stepEffectSetKeyedStoreGetKeys,
      };
      stepEffectDeletedKeyedStoreGet = jasmine.createSpy(
        `stepEffectDeletedKeyedStoreGet`
      );
      stepEffectDeletedKeyedStoreSet = jasmine.createSpy(
        `stepEffectDeletedKeyedStoreSet`
      );
      stepEffectDeletedKeyedStoreDelete = jasmine.createSpy(
        `stepEffectDeletedKeyedStoreDelete`
      );
      stepEffectDeletedKeyedStoreGetAll = jasmine.createSpy(
        `stepEffectDeletedKeyedStoreGetAll`
      );
      stepEffectDeletedKeyedStoreGetKeys = jasmine.createSpy(
        `stepEffectDeletedKeyedStoreGetKeys`
      );
      const stepEffectDeletedKeyedStore: KeyedStore<unknown> = {
        type: `keyedStore`,
        name: `stepEffectDeletedKeyedStore`,
        get: stepEffectDeletedKeyedStoreGet,
        set: stepEffectDeletedKeyedStoreSet,
        delete: stepEffectDeletedKeyedStoreDelete,
        getAll: stepEffectDeletedKeyedStoreGetAll,
        getKeys: stepEffectDeletedKeyedStoreGetKeys,
      };
      addExecutePerActionStep = jasmine.createSpy(`addExecutePerActionStep`);
      addStep = {
        name: `addStep`,
        executePerActionStep: addExecutePerActionStep,
        effects: [
          {
            type: `unkeyedStoreSet`,
            unkeyedStore: stepEffectSetUnkeyedStore,
          },
          {
            type: `keyedStoreSet`,
            keyedStore: stepEffectSetKeyedStore,
            key: `Test Set Key`,
          },
          {
            type: `keyedStoreDelete`,
            keyedStore: stepEffectDeletedKeyedStore,
            key: `Test Deleted Key`,
          },
        ],
      };
      changeDownExecutePerActionStep = jasmine.createSpy(
        `changeDownExecutePerActionStep`
      );
      changeDownStep = {
        name: `changeDownStep`,
        executePerActionStep: changeDownExecutePerActionStep,
        effects: [
          {
            type: `unkeyedStoreSet`,
            unkeyedStore: stepEffectSetUnkeyedStore,
          },
          {
            type: `keyedStoreSet`,
            keyedStore: stepEffectSetKeyedStore,
            key: `Test Set Key`,
          },
          {
            type: `keyedStoreDelete`,
            keyedStore: stepEffectDeletedKeyedStore,
            key: `Test Deleted Key`,
          },
        ],
      };
      changeUpExecutePerActionStep = jasmine.createSpy(
        `changeUpExecutePerActionStep`
      );
      changeUpStep = {
        name: `changeUpStep`,
        executePerActionStep: changeUpExecutePerActionStep,
        effects: [
          {
            type: `unkeyedStoreSet`,
            unkeyedStore: stepEffectSetUnkeyedStore,
          },
          {
            type: `keyedStoreSet`,
            keyedStore: stepEffectSetKeyedStore,
            key: `Test Set Key`,
          },
          {
            type: `keyedStoreDelete`,
            keyedStore: stepEffectDeletedKeyedStore,
            key: `Test Deleted Key`,
          },
        ],
      };
      deletedExecutePerActionStep = jasmine.createSpy(
        `deletedExecutePerActionStep`
      );
      deleteStep = {
        name: `deleteStep`,
        executePerActionStep: deletedExecutePerActionStep,
        effects: [
          {
            type: `unkeyedStoreSet`,
            unkeyedStore: stepEffectSetUnkeyedStore,
          },
          {
            type: `keyedStoreSet`,
            keyedStore: stepEffectSetKeyedStore,
            key: `Test Set Key`,
          },
          {
            type: `keyedStoreDelete`,
            keyedStore: stepEffectDeletedKeyedStore,
            key: `Test Deleted Key`,
          },
        ],
      };
      up = jasmine.createSpy(`up`).and.callFake((path) => {
        switch (path) {
          case `something/which/was-added`:
            return addStep;

          case `something/which/was-changed`:
            return changeUpStep;

          default:
            fail(`Unexpected up path "${path}".`);
            return null;
        }
      });
      down = jasmine.createSpy(`down`).and.callFake((path) => {
        switch (path) {
          case `something/which/was-changed`:
            return changeDownStep;

          case `something/which/was-deleted`:
            return deleteStep;

          default:
            fail(`Unexpected down path "${path}".`);
            return null;
        }
      });

      result = await generateParallelStepsForTrigger(
        {
          added: [
            `Test Added Path A`,
            `something/which/was-added`,
            `Test Added Path C`,
          ],
          changed: [`Test Changed Path A`, `something/which/was-changed`],
          unchanged: [
            `Test Unchanged Path A`,
            `Test Unchanged Path B`,
            `Test Unchanged Path C`,
            `something/which/did-not-change`,
            `Test Unchanged Path E`,
          ],
          deleted: [
            `Test Deleted Path A`,
            `something/which/was-deleted`,
            `Test Deleted Path C`,
          ],
        },
        [
          {
            type: `unkeyedStoreSet`,
            unkeyedStore: effectSetUnkeyedStore,
          },
          {
            type: `keyedStoreSet`,
            keyedStore: effectSetKeyedStore,
            key: `Test Set Key`,
          },
          {
            type: `keyedStoreDelete`,
            keyedStore: effectDeletedKeyedStore,
            key: `Test Deleted Key`,
          },
        ],
        {
          type: `file`,
          glob: `something/which/was-*`,
          up,
          down,
          writesToStores: [writtenUnkeyedStore, writtenKeyedStore],
        }
      );
    });

    it(`creates an up step for added files`, () => {
      expect(up).toHaveBeenCalledWith(`something/which/was-added`);
    });

    it(`creates an up step for changed files`, () => {
      expect(up).toHaveBeenCalledWith(`something/which/was-changed`);
    });

    it(`creates no further up steps`, () => {
      expect(up).toHaveBeenCalledTimes(2);
    });

    it(`creates a down step for changed files`, () => {
      expect(down).toHaveBeenCalledWith(`something/which/was-changed`);
    });

    it(`creates a down step for deleted files`, () => {
      expect(down).toHaveBeenCalledWith(`something/which/was-deleted`);
    });

    it(`creates no further down steps`, () => {
      expect(down).toHaveBeenCalledTimes(2);
    });

    it(`returns the created steps`, () => {
      expect(result.parallelSteps).toEqual(
        jasmine.arrayWithExactContents([
          addStep,
          new SerialStep(`something/which/was-changed`, [
            changeDownStep,
            changeUpStep,
          ]),
          deleteStep,
        ])
      );
    });

    it(`returns the remaining unclaimed files`, () => {
      expect(result.unclaimedFiles).toEqual({
        added: [`Test Added Path A`, `Test Added Path C`],
        changed: [`Test Changed Path A`],
        unchanged: [
          `Test Unchanged Path A`,
          `Test Unchanged Path B`,
          `Test Unchanged Path C`,
          `something/which/did-not-change`,
          `Test Unchanged Path E`,
        ],
        deleted: [`Test Deleted Path A`, `Test Deleted Path C`],
      });
    });

    it(`does not interact with any stores`, () => {
      expect(effectSetUnkeyedStoreGet).not.toHaveBeenCalled();
      expect(effectSetUnkeyedStoreSet).not.toHaveBeenCalled();
      expect(effectSetKeyedStoreGet).not.toHaveBeenCalled();
      expect(effectSetKeyedStoreSet).not.toHaveBeenCalled();
      expect(effectSetKeyedStoreDelete).not.toHaveBeenCalled();
      expect(effectSetKeyedStoreGetAll).not.toHaveBeenCalled();
      expect(effectSetKeyedStoreGetKeys).not.toHaveBeenCalled();
      expect(effectDeletedKeyedStoreGet).not.toHaveBeenCalled();
      expect(effectDeletedKeyedStoreSet).not.toHaveBeenCalled();
      expect(effectDeletedKeyedStoreDelete).not.toHaveBeenCalled();
      expect(effectDeletedKeyedStoreGetAll).not.toHaveBeenCalled();
      expect(effectDeletedKeyedStoreGetKeys).not.toHaveBeenCalled();
      expect(writtenUnkeyedStoreGet).not.toHaveBeenCalled();
      expect(writtenUnkeyedStoreSet).not.toHaveBeenCalled();
      expect(writtenKeyedStoreGet).not.toHaveBeenCalled();
      expect(writtenKeyedStoreSet).not.toHaveBeenCalled();
      expect(writtenKeyedStoreDelete).not.toHaveBeenCalled();
      expect(writtenKeyedStoreGetAll).not.toHaveBeenCalled();
      expect(writtenKeyedStoreGetKeys).not.toHaveBeenCalled();
      expect(stepEffectSetUnkeyedStoreGet).not.toHaveBeenCalled();
      expect(stepEffectSetUnkeyedStoreSet).not.toHaveBeenCalled();
      expect(stepEffectSetKeyedStoreGet).not.toHaveBeenCalled();
      expect(stepEffectSetKeyedStoreSet).not.toHaveBeenCalled();
      expect(stepEffectSetKeyedStoreDelete).not.toHaveBeenCalled();
      expect(stepEffectSetKeyedStoreGetAll).not.toHaveBeenCalled();
      expect(stepEffectSetKeyedStoreGetKeys).not.toHaveBeenCalled();
      expect(stepEffectDeletedKeyedStoreGet).not.toHaveBeenCalled();
      expect(stepEffectDeletedKeyedStoreSet).not.toHaveBeenCalled();
      expect(stepEffectDeletedKeyedStoreDelete).not.toHaveBeenCalled();
      expect(stepEffectDeletedKeyedStoreGetAll).not.toHaveBeenCalled();
      expect(stepEffectDeletedKeyedStoreGetKeys).not.toHaveBeenCalled();
    });

    it(`does not interact with any steps`, () => {
      expect(addExecutePerActionStep).not.toHaveBeenCalled();
      expect(changeDownExecutePerActionStep).not.toHaveBeenCalled();
      expect(changeUpExecutePerActionStep).not.toHaveBeenCalled();
      expect(deletedExecutePerActionStep).not.toHaveBeenCalled();
    });
  });

  describe(`keyedStore`, () => {
    describe(`many stores trigger a full refresh`, () => {
      let effectSetUnkeyedStoreGet: jasmine.Spy;
      let effectSetUnkeyedStoreSet: jasmine.Spy;
      let effectSetKeyedStoreGet: jasmine.Spy;
      let effectSetKeyedStoreSet: jasmine.Spy;
      let effectSetKeyedStoreDelete: jasmine.Spy;
      let effectSetKeyedStoreGetAll: jasmine.Spy;
      let effectSetKeyedStoreGetKeys: jasmine.Spy;
      let effectDeletedKeyedStoreGet: jasmine.Spy;
      let effectDeletedKeyedStoreSet: jasmine.Spy;
      let effectDeletedKeyedStoreDelete: jasmine.Spy;
      let effectDeletedKeyedStoreGetAll: jasmine.Spy;
      let effectDeletedKeyedStoreGetKeys: jasmine.Spy;
      let unusedUnkeyedStoreGet: jasmine.Spy;
      let unusedUnkeyedStoreSet: jasmine.Spy;
      let unusedKeyedStoreGet: jasmine.Spy;
      let unusedKeyedStoreSet: jasmine.Spy;
      let unusedKeyedStoreDelete: jasmine.Spy;
      let unusedKeyedStoreGetAll: jasmine.Spy;
      let unusedKeyedStoreGetKeys: jasmine.Spy;
      let writtenUnkeyedStoreGet: jasmine.Spy;
      let writtenUnkeyedStoreSet: jasmine.Spy;
      let writtenKeyedStoreGet: jasmine.Spy;
      let writtenKeyedStoreSet: jasmine.Spy;
      let writtenKeyedStoreDelete: jasmine.Spy;
      let writtenKeyedStoreGetAll: jasmine.Spy;
      let writtenKeyedStoreGetKeys: jasmine.Spy;
      let keyedStoreGet: jasmine.Spy;
      let keyedStoreSet: jasmine.Spy;
      let keyedStoreDelete: jasmine.Spy;
      let keyedStoreGetAll: jasmine.Spy;
      let keyedStoreGetKeys: jasmine.Spy;
      let up: jasmine.Spy;
      let down: jasmine.Spy;
      let stepEffectSetUnkeyedStoreGet: jasmine.Spy;
      let stepEffectSetUnkeyedStoreSet: jasmine.Spy;
      let stepEffectSetKeyedStoreGet: jasmine.Spy;
      let stepEffectSetKeyedStoreSet: jasmine.Spy;
      let stepEffectSetKeyedStoreDelete: jasmine.Spy;
      let stepEffectSetKeyedStoreGetAll: jasmine.Spy;
      let stepEffectSetKeyedStoreGetKeys: jasmine.Spy;
      let stepEffectDeletedKeyedStoreGet: jasmine.Spy;
      let stepEffectDeletedKeyedStoreSet: jasmine.Spy;
      let stepEffectDeletedKeyedStoreDelete: jasmine.Spy;
      let stepEffectDeletedKeyedStoreGetAll: jasmine.Spy;
      let stepEffectDeletedKeyedStoreGetKeys: jasmine.Spy;
      let setExecutePerActionStep: jasmine.Spy;
      let setStep: Step;
      let deletedThenSetDownExecutePerActionStep: jasmine.Spy;
      let deletedThenSetDownStep: Step;
      let deletedThenSetUpExecutePerActionStep: jasmine.Spy;
      let deletedThenSetUpStep: Step;
      let deletedExecutePerActionStep: jasmine.Spy;
      let deleteStep: Step;
      let refreshedDownExecutePerActionStep: jasmine.Spy;
      let refreshedDownStep: Step;
      let refreshedUpExecutePerActionStep: jasmine.Spy;
      let refreshedUpStep: Step;
      let result: {
        readonly unclaimedFiles: Diff<string>;
        readonly parallelSteps: ReadonlyArray<Step>;
      };

      beforeAll(async () => {
        effectSetUnkeyedStoreGet = jasmine.createSpy(
          `effectSetUnkeyedStoreGet`
        );
        effectSetUnkeyedStoreSet = jasmine.createSpy(
          `effectSetUnkeyedStoreSet`
        );
        const effectSetUnkeyedStore: UnkeyedStore<unknown> = {
          type: `unkeyedStore`,
          name: `effectSetUnkeyedStore`,
          get: effectSetUnkeyedStoreGet,
          set: effectSetUnkeyedStoreSet,
        };
        effectSetKeyedStoreGet = jasmine.createSpy(`effectSetKeyedStoreGet`);
        effectSetKeyedStoreSet = jasmine.createSpy(`effectSetKeyedStoreSet`);
        effectSetKeyedStoreDelete = jasmine.createSpy(
          `effectSetKeyedStoreDelete`
        );
        effectSetKeyedStoreGetAll = jasmine.createSpy(
          `effectSetKeyedStoreGetAll`
        );
        effectSetKeyedStoreGetKeys = jasmine.createSpy(
          `effectSetKeyedStoreGetKeys`
        );
        const effectSetKeyedStore: KeyedStore<unknown> = {
          type: `keyedStore`,
          name: `effectSetKeyedStore`,
          get: effectSetKeyedStoreGet,
          set: effectSetKeyedStoreSet,
          delete: effectSetKeyedStoreDelete,
          getAll: effectSetKeyedStoreGetAll,
          getKeys: effectSetKeyedStoreGetKeys,
        };
        effectDeletedKeyedStoreGet = jasmine.createSpy(
          `effectDeletedKeyedStoreGet`
        );
        effectDeletedKeyedStoreSet = jasmine.createSpy(
          `effectDeletedKeyedStoreSet`
        );
        effectDeletedKeyedStoreDelete = jasmine.createSpy(
          `effectDeletedKeyedStoreDelete`
        );
        effectDeletedKeyedStoreGetAll = jasmine.createSpy(
          `effectDeletedKeyedStoreGetAll`
        );
        effectDeletedKeyedStoreGetKeys = jasmine.createSpy(
          `effectDeletedKeyedStoreGetKeys`
        );
        const effectDeletedKeyedStore: KeyedStore<unknown> = {
          type: `keyedStore`,
          name: `effectDeletedKeyedStore`,
          get: effectDeletedKeyedStoreGet,
          set: effectDeletedKeyedStoreSet,
          delete: effectDeletedKeyedStoreDelete,
          getAll: effectDeletedKeyedStoreGetAll,
          getKeys: effectDeletedKeyedStoreGetKeys,
        };
        unusedUnkeyedStoreGet = jasmine.createSpy(`unusedUnkeyedStoreGet`);
        unusedUnkeyedStoreSet = jasmine.createSpy(`unusedUnkeyedStoreSet`);
        const unusedUnkeyedStore: UnkeyedStore<unknown> = {
          type: `unkeyedStore`,
          name: `unusedUnkeyedStore`,
          get: unusedUnkeyedStoreGet,
          set: unusedUnkeyedStoreSet,
        };
        unusedKeyedStoreGet = jasmine.createSpy(`unusedKeyedStoreGet`);
        unusedKeyedStoreSet = jasmine.createSpy(`unusedKeyedStoreSet`);
        unusedKeyedStoreDelete = jasmine.createSpy(`unusedKeyedStoreDelete`);
        unusedKeyedStoreGetAll = jasmine.createSpy(`unusedKeyedStoreGetAll`);
        unusedKeyedStoreGetKeys = jasmine.createSpy(`unusedKeyedStoreGetKeys`);
        const unusedKeyedStore: KeyedStore<unknown> = {
          type: `keyedStore`,
          name: `unusedKeyedStore`,
          get: unusedKeyedStoreGet,
          set: unusedKeyedStoreSet,
          delete: unusedKeyedStoreDelete,
          getAll: unusedKeyedStoreGetAll,
          getKeys: unusedKeyedStoreGetKeys,
        };
        writtenUnkeyedStoreGet = jasmine.createSpy(`writtenUnkeyedStoreGet`);
        writtenUnkeyedStoreSet = jasmine.createSpy(`writtenUnkeyedStoreSet`);
        const writtenUnkeyedStore: UnkeyedStore<unknown> = {
          type: `unkeyedStore`,
          name: `writtenUnkeyedStore`,
          get: writtenUnkeyedStoreGet,
          set: writtenUnkeyedStoreSet,
        };
        writtenKeyedStoreGet = jasmine.createSpy(`writtenKeyedStoreGet`);
        writtenKeyedStoreSet = jasmine.createSpy(`writtenKeyedStoreSet`);
        writtenKeyedStoreDelete = jasmine.createSpy(`writtenKeyedStoreDelete`);
        writtenKeyedStoreGetAll = jasmine.createSpy(`writtenKeyedStoreGetAll`);
        writtenKeyedStoreGetKeys = jasmine.createSpy(
          `writtenKeyedStoreGetKeys`
        );
        const writtenKeyedStore: KeyedStore<unknown> = {
          type: `keyedStore`,
          name: `writtenKeyedStore`,
          get: writtenKeyedStoreGet,
          set: writtenKeyedStoreSet,
          delete: writtenKeyedStoreDelete,
          getAll: writtenKeyedStoreGetAll,
          getKeys: writtenKeyedStoreGetKeys,
        };
        keyedStoreGet = jasmine.createSpy(`keyedStoreGet`);
        keyedStoreSet = jasmine.createSpy(`keyedStoreSet`);
        keyedStoreDelete = jasmine.createSpy(`keyedStoreDelete`);
        keyedStoreGetAll = jasmine.createSpy(`keyedStoreGetAll`);
        keyedStoreGetKeys = jasmine
          .createSpy(`keyedStoreGetKeys`)
          .and.resolveTo([
            `Test Deleted Key`,
            `Test Deleted Then Set Key`,
            `Test Refreshed Key`,
          ]);
        const keyedStore: KeyedStore<unknown> = {
          type: `keyedStore`,
          name: `keyedStore`,
          get: keyedStoreGet,
          set: keyedStoreSet,
          delete: keyedStoreDelete,
          getAll: keyedStoreGetAll,
          getKeys: keyedStoreGetKeys,
        };
        stepEffectSetUnkeyedStoreGet = jasmine.createSpy(
          `stepEffectSetUnkeyedStoreGet`
        );
        stepEffectSetUnkeyedStoreSet = jasmine.createSpy(
          `stepEffectSetUnkeyedStoreSet`
        );
        const stepEffectSetUnkeyedStore: UnkeyedStore<unknown> = {
          type: `unkeyedStore`,
          name: `stepEffectSetUnkeyedStore`,
          get: stepEffectSetUnkeyedStoreGet,
          set: stepEffectSetUnkeyedStoreSet,
        };
        stepEffectSetKeyedStoreGet = jasmine.createSpy(
          `stepEffectSetKeyedStoreGet`
        );
        stepEffectSetKeyedStoreSet = jasmine.createSpy(
          `stepEffectSetKeyedStoreSet`
        );
        stepEffectSetKeyedStoreDelete = jasmine.createSpy(
          `stepEffectSetKeyedStoreDelete`
        );
        stepEffectSetKeyedStoreGetAll = jasmine.createSpy(
          `stepEffectSetKeyedStoreGetAll`
        );
        stepEffectSetKeyedStoreGetKeys = jasmine.createSpy(
          `stepEffectSetKeyedStoreGetKeys`
        );
        const stepEffectSetKeyedStore: KeyedStore<unknown> = {
          type: `keyedStore`,
          name: `stepEffectSetKeyedStore`,
          get: stepEffectSetKeyedStoreGet,
          set: stepEffectSetKeyedStoreSet,
          delete: stepEffectSetKeyedStoreDelete,
          getAll: stepEffectSetKeyedStoreGetAll,
          getKeys: stepEffectSetKeyedStoreGetKeys,
        };
        stepEffectDeletedKeyedStoreGet = jasmine.createSpy(
          `stepEffectDeletedKeyedStoreGet`
        );
        stepEffectDeletedKeyedStoreSet = jasmine.createSpy(
          `stepEffectDeletedKeyedStoreSet`
        );
        stepEffectDeletedKeyedStoreDelete = jasmine.createSpy(
          `stepEffectDeletedKeyedStoreDelete`
        );
        stepEffectDeletedKeyedStoreGetAll = jasmine.createSpy(
          `stepEffectDeletedKeyedStoreGetAll`
        );
        stepEffectDeletedKeyedStoreGetKeys = jasmine.createSpy(
          `stepEffectDeletedKeyedStoreGetKeys`
        );
        const stepEffectDeletedKeyedStore: KeyedStore<unknown> = {
          type: `keyedStore`,
          name: `stepEffectDeletedKeyedStore`,
          get: stepEffectDeletedKeyedStoreGet,
          set: stepEffectDeletedKeyedStoreSet,
          delete: stepEffectDeletedKeyedStoreDelete,
          getAll: stepEffectDeletedKeyedStoreGetAll,
          getKeys: stepEffectDeletedKeyedStoreGetKeys,
        };
        setExecutePerActionStep = jasmine.createSpy(`setExecutePerActionStep`);
        setStep = {
          name: `setStep`,
          executePerActionStep: setExecutePerActionStep,
          effects: [
            {
              type: `unkeyedStoreSet`,
              unkeyedStore: stepEffectSetUnkeyedStore,
            },
            {
              type: `keyedStoreSet`,
              keyedStore: stepEffectSetKeyedStore,
              key: `Test Set Key`,
            },
            {
              type: `keyedStoreDelete`,
              keyedStore: stepEffectDeletedKeyedStore,
              key: `Test Deleted Key`,
            },
          ],
        };
        deletedThenSetDownExecutePerActionStep = jasmine.createSpy(
          `deletedThenSetDownExecutePerActionStep`
        );
        deletedThenSetDownStep = {
          name: `deletedThenSetDownStep`,
          executePerActionStep: deletedThenSetDownExecutePerActionStep,
          effects: [
            {
              type: `unkeyedStoreSet`,
              unkeyedStore: stepEffectSetUnkeyedStore,
            },
            {
              type: `keyedStoreSet`,
              keyedStore: stepEffectSetKeyedStore,
              key: `Test Set Key`,
            },
            {
              type: `keyedStoreDelete`,
              keyedStore: stepEffectDeletedKeyedStore,
              key: `Test Deleted Key`,
            },
          ],
        };
        deletedThenSetUpExecutePerActionStep = jasmine.createSpy(
          `deletedThenSetUpExecutePerActionStep`
        );
        deletedThenSetUpStep = {
          name: `deletedThenSetUpStep`,
          executePerActionStep: deletedThenSetUpExecutePerActionStep,
          effects: [
            {
              type: `unkeyedStoreSet`,
              unkeyedStore: stepEffectSetUnkeyedStore,
            },
            {
              type: `keyedStoreSet`,
              keyedStore: stepEffectSetKeyedStore,
              key: `Test Set Key`,
            },
            {
              type: `keyedStoreDelete`,
              keyedStore: stepEffectDeletedKeyedStore,
              key: `Test Deleted Key`,
            },
          ],
        };
        deletedExecutePerActionStep = jasmine.createSpy(
          `deletedExecutePerActionStep`
        );
        deleteStep = {
          name: `deleteStep`,
          executePerActionStep: deletedExecutePerActionStep,
          effects: [
            {
              type: `unkeyedStoreSet`,
              unkeyedStore: stepEffectSetUnkeyedStore,
            },
            {
              type: `keyedStoreSet`,
              keyedStore: stepEffectSetKeyedStore,
              key: `Test Set Key`,
            },
            {
              type: `keyedStoreDelete`,
              keyedStore: stepEffectDeletedKeyedStore,
              key: `Test Deleted Key`,
            },
          ],
        };
        refreshedDownExecutePerActionStep = jasmine.createSpy(
          `refreshedDownExecutePerActionStep`
        );
        refreshedDownStep = {
          name: `refreshedDownStep`,
          executePerActionStep: refreshedDownExecutePerActionStep,
          effects: [
            {
              type: `unkeyedStoreSet`,
              unkeyedStore: stepEffectSetUnkeyedStore,
            },
            {
              type: `keyedStoreSet`,
              keyedStore: stepEffectSetKeyedStore,
              key: `Test Set Key`,
            },
            {
              type: `keyedStoreDelete`,
              keyedStore: stepEffectDeletedKeyedStore,
              key: `Test Deleted Key`,
            },
          ],
        };
        refreshedUpExecutePerActionStep = jasmine.createSpy(
          `refreshedUpExecutePerActionStep`
        );
        refreshedUpStep = {
          name: `refreshedUpStep`,
          executePerActionStep: refreshedUpExecutePerActionStep,
          effects: [
            {
              type: `unkeyedStoreSet`,
              unkeyedStore: stepEffectSetUnkeyedStore,
            },
            {
              type: `keyedStoreSet`,
              keyedStore: stepEffectSetKeyedStore,
              key: `Test Set Key`,
            },
            {
              type: `keyedStoreDelete`,
              keyedStore: stepEffectDeletedKeyedStore,
              key: `Test Deleted Key`,
            },
          ],
        };
        up = jasmine.createSpy(`up`).and.callFake((path) => {
          switch (path) {
            case `Test Set Key`:
              return setStep;

            case `Test Deleted Then Set Key`:
              return deletedThenSetUpStep;

            case `Test Refreshed Key`:
              return refreshedUpStep;

            default:
              fail(`Unexpected up key "${path}".`);
              return null;
          }
        });
        down = jasmine.createSpy(`down`).and.callFake((path) => {
          switch (path) {
            case `Test Deleted Then Set Key`:
              return deletedThenSetDownStep;

            case `Test Deleted Key`:
              return deleteStep;

            case `Test Refreshed Key`:
              return refreshedDownStep;

            default:
              fail(`Unexpected down key "${path}".`);
              return null;
          }
        });

        result = await generateParallelStepsForTrigger(
          {
            added: [
              `Test Added Path A`,
              `Test Added Path B`,
              `Test Added Path C`,
            ],
            changed: [`Test Changed Path A`, `Test Changed Path B`],
            unchanged: [
              `Test Unchanged Path A`,
              `Test Unchanged Path B`,
              `Test Unchanged Path C`,
              `Test Unchanged Path D`,
              `Test Unchanged Path E`,
            ],
            deleted: [
              `Test Deleted Path A`,
              `Test Deleted Path B`,
              `Test Deleted Path C`,
            ],
          },
          [
            {
              type: `unkeyedStoreSet`,
              unkeyedStore: effectSetUnkeyedStore,
            },
            {
              type: `keyedStoreSet`,
              keyedStore: effectSetKeyedStore,
              key: `Test Set Key`,
            },
            {
              type: `keyedStoreDelete`,
              keyedStore,
              key: `Test Deleted Key`,
            },
            {
              type: `keyedStoreDelete`,
              keyedStore,
              key: `Test Deleted Then Set Key`,
            },
            {
              type: `keyedStoreSet`,
              keyedStore,
              key: `Test Deleted Then Set Key`,
            },
            {
              type: `keyedStoreSet`,
              keyedStore,
              key: `Test Set Key`,
            },
            {
              type: `keyedStoreDelete`,
              keyedStore: effectDeletedKeyedStore,
              key: `Test Deleted Key`,
            },
          ],
          {
            type: `keyedStore`,
            keyedStore,
            refreshAllWhenStoresChange: [
              unusedUnkeyedStore,
              effectSetKeyedStore,
              effectSetUnkeyedStore,
              unusedKeyedStore,
              effectSetKeyedStore,
            ],
            up,
            down,
            writesToStores: [writtenUnkeyedStore, writtenKeyedStore],
          }
        );
      });

      it(`lists all keys in the store once`, () => {
        expect(keyedStoreGetKeys).toHaveBeenCalledTimes(1);
      });

      it(`creates an up step for set keys`, () => {
        expect(up).toHaveBeenCalledWith(`Test Set Key`);
      });

      it(`creates an up step for deleted then set keys`, () => {
        expect(up).toHaveBeenCalledWith(`Test Deleted Then Set Key`);
      });

      it(`creates an up step for refreshed keys`, () => {
        expect(up).toHaveBeenCalledWith(`Test Refreshed Key`);
      });

      it(`creates no further up steps`, () => {
        expect(up).toHaveBeenCalledTimes(3);
      });

      it(`creates a down step for deleted then set keys`, () => {
        expect(down).toHaveBeenCalledWith(`Test Deleted Then Set Key`);
      });

      it(`creates a down step for deleted keys`, () => {
        expect(down).toHaveBeenCalledWith(`Test Deleted Key`);
      });

      it(`creates a down step for refreshed keys`, () => {
        expect(down).toHaveBeenCalledWith(`Test Refreshed Key`);
      });

      it(`creates no further down steps`, () => {
        expect(down).toHaveBeenCalledTimes(3);
      });

      it(`returns the created steps`, () => {
        expect(result.parallelSteps).toEqual(
          jasmine.arrayWithExactContents([
            setStep,
            new SerialStep(`Test Deleted Then Set Key`, [
              deletedThenSetDownStep,
              deletedThenSetUpStep,
            ]),
            deleteStep,
            new SerialStep(`Test Refreshed Key`, [
              refreshedDownStep,
              refreshedUpStep,
            ]),
          ])
        );
      });

      it(`returns the given unclaimed files`, () => {
        expect(result.unclaimedFiles).toEqual({
          added: [
            `Test Added Path A`,
            `Test Added Path B`,
            `Test Added Path C`,
          ],
          changed: [`Test Changed Path A`, `Test Changed Path B`],
          unchanged: [
            `Test Unchanged Path A`,
            `Test Unchanged Path B`,
            `Test Unchanged Path C`,
            `Test Unchanged Path D`,
            `Test Unchanged Path E`,
          ],
          deleted: [
            `Test Deleted Path A`,
            `Test Deleted Path B`,
            `Test Deleted Path C`,
          ],
        });
      });

      it(`does not further interact with any stores`, () => {
        expect(effectSetUnkeyedStoreGet).not.toHaveBeenCalled();
        expect(effectSetUnkeyedStoreSet).not.toHaveBeenCalled();
        expect(effectSetKeyedStoreGet).not.toHaveBeenCalled();
        expect(effectSetKeyedStoreSet).not.toHaveBeenCalled();
        expect(effectSetKeyedStoreDelete).not.toHaveBeenCalled();
        expect(effectSetKeyedStoreGetAll).not.toHaveBeenCalled();
        expect(effectSetKeyedStoreGetKeys).not.toHaveBeenCalled();
        expect(effectDeletedKeyedStoreGet).not.toHaveBeenCalled();
        expect(effectDeletedKeyedStoreSet).not.toHaveBeenCalled();
        expect(effectDeletedKeyedStoreDelete).not.toHaveBeenCalled();
        expect(effectDeletedKeyedStoreGetAll).not.toHaveBeenCalled();
        expect(effectDeletedKeyedStoreGetKeys).not.toHaveBeenCalled();
        expect(unusedUnkeyedStoreGet).not.toHaveBeenCalled();
        expect(unusedUnkeyedStoreSet).not.toHaveBeenCalled();
        expect(unusedKeyedStoreGet).not.toHaveBeenCalled();
        expect(unusedKeyedStoreSet).not.toHaveBeenCalled();
        expect(unusedKeyedStoreDelete).not.toHaveBeenCalled();
        expect(unusedKeyedStoreGetAll).not.toHaveBeenCalled();
        expect(unusedKeyedStoreGetKeys).not.toHaveBeenCalled();
        expect(writtenUnkeyedStoreGet).not.toHaveBeenCalled();
        expect(writtenUnkeyedStoreSet).not.toHaveBeenCalled();
        expect(writtenKeyedStoreGet).not.toHaveBeenCalled();
        expect(writtenKeyedStoreSet).not.toHaveBeenCalled();
        expect(writtenKeyedStoreDelete).not.toHaveBeenCalled();
        expect(writtenKeyedStoreGetAll).not.toHaveBeenCalled();
        expect(writtenKeyedStoreGetKeys).not.toHaveBeenCalled();
        expect(keyedStoreGet).not.toHaveBeenCalled();
        expect(keyedStoreSet).not.toHaveBeenCalled();
        expect(keyedStoreDelete).not.toHaveBeenCalled();
        expect(keyedStoreGetAll).not.toHaveBeenCalled();
        expect(stepEffectSetUnkeyedStoreGet).not.toHaveBeenCalled();
        expect(stepEffectSetUnkeyedStoreSet).not.toHaveBeenCalled();
        expect(stepEffectSetKeyedStoreGet).not.toHaveBeenCalled();
        expect(stepEffectSetKeyedStoreSet).not.toHaveBeenCalled();
        expect(stepEffectSetKeyedStoreDelete).not.toHaveBeenCalled();
        expect(stepEffectSetKeyedStoreGetAll).not.toHaveBeenCalled();
        expect(stepEffectSetKeyedStoreGetKeys).not.toHaveBeenCalled();
        expect(stepEffectDeletedKeyedStoreGet).not.toHaveBeenCalled();
        expect(stepEffectDeletedKeyedStoreSet).not.toHaveBeenCalled();
        expect(stepEffectDeletedKeyedStoreDelete).not.toHaveBeenCalled();
        expect(stepEffectDeletedKeyedStoreGetAll).not.toHaveBeenCalled();
        expect(stepEffectDeletedKeyedStoreGetKeys).not.toHaveBeenCalled();
      });

      it(`does not interact with any steps`, () => {
        expect(setExecutePerActionStep).not.toHaveBeenCalled();
        expect(deletedThenSetDownExecutePerActionStep).not.toHaveBeenCalled();
        expect(deletedThenSetUpExecutePerActionStep).not.toHaveBeenCalled();
        expect(deletedExecutePerActionStep).not.toHaveBeenCalled();
        expect(refreshedDownExecutePerActionStep).not.toHaveBeenCalled();
        expect(refreshedUpExecutePerActionStep).not.toHaveBeenCalled();
      });
    });

    describe(`when setting a keyed store triggers a full refresh`, () => {
      let effectSetUnkeyedStoreGet: jasmine.Spy;
      let effectSetUnkeyedStoreSet: jasmine.Spy;
      let effectSetKeyedStoreGet: jasmine.Spy;
      let effectSetKeyedStoreSet: jasmine.Spy;
      let effectSetKeyedStoreDelete: jasmine.Spy;
      let effectSetKeyedStoreGetAll: jasmine.Spy;
      let effectSetKeyedStoreGetKeys: jasmine.Spy;
      let effectDeletedKeyedStoreGet: jasmine.Spy;
      let effectDeletedKeyedStoreSet: jasmine.Spy;
      let effectDeletedKeyedStoreDelete: jasmine.Spy;
      let effectDeletedKeyedStoreGetAll: jasmine.Spy;
      let effectDeletedKeyedStoreGetKeys: jasmine.Spy;
      let unusedUnkeyedStoreGet: jasmine.Spy;
      let unusedUnkeyedStoreSet: jasmine.Spy;
      let unusedKeyedStoreGet: jasmine.Spy;
      let unusedKeyedStoreSet: jasmine.Spy;
      let unusedKeyedStoreDelete: jasmine.Spy;
      let unusedKeyedStoreGetAll: jasmine.Spy;
      let unusedKeyedStoreGetKeys: jasmine.Spy;
      let writtenUnkeyedStoreGet: jasmine.Spy;
      let writtenUnkeyedStoreSet: jasmine.Spy;
      let writtenKeyedStoreGet: jasmine.Spy;
      let writtenKeyedStoreSet: jasmine.Spy;
      let writtenKeyedStoreDelete: jasmine.Spy;
      let writtenKeyedStoreGetAll: jasmine.Spy;
      let writtenKeyedStoreGetKeys: jasmine.Spy;
      let keyedStoreGet: jasmine.Spy;
      let keyedStoreSet: jasmine.Spy;
      let keyedStoreDelete: jasmine.Spy;
      let keyedStoreGetAll: jasmine.Spy;
      let keyedStoreGetKeys: jasmine.Spy;
      let up: jasmine.Spy;
      let down: jasmine.Spy;
      let stepEffectSetUnkeyedStoreGet: jasmine.Spy;
      let stepEffectSetUnkeyedStoreSet: jasmine.Spy;
      let stepEffectSetKeyedStoreGet: jasmine.Spy;
      let stepEffectSetKeyedStoreSet: jasmine.Spy;
      let stepEffectSetKeyedStoreDelete: jasmine.Spy;
      let stepEffectSetKeyedStoreGetAll: jasmine.Spy;
      let stepEffectSetKeyedStoreGetKeys: jasmine.Spy;
      let stepEffectDeletedKeyedStoreGet: jasmine.Spy;
      let stepEffectDeletedKeyedStoreSet: jasmine.Spy;
      let stepEffectDeletedKeyedStoreDelete: jasmine.Spy;
      let stepEffectDeletedKeyedStoreGetAll: jasmine.Spy;
      let stepEffectDeletedKeyedStoreGetKeys: jasmine.Spy;
      let setExecutePerActionStep: jasmine.Spy;
      let setStep: Step;
      let deletedThenSetDownExecutePerActionStep: jasmine.Spy;
      let deletedThenSetDownStep: Step;
      let deletedThenSetUpExecutePerActionStep: jasmine.Spy;
      let deletedThenSetUpStep: Step;
      let deletedExecutePerActionStep: jasmine.Spy;
      let deleteStep: Step;
      let refreshedDownExecutePerActionStep: jasmine.Spy;
      let refreshedDownStep: Step;
      let refreshedUpExecutePerActionStep: jasmine.Spy;
      let refreshedUpStep: Step;
      let result: {
        readonly unclaimedFiles: Diff<string>;
        readonly parallelSteps: ReadonlyArray<Step>;
      };

      beforeAll(async () => {
        effectSetUnkeyedStoreGet = jasmine.createSpy(
          `effectSetUnkeyedStoreGet`
        );
        effectSetUnkeyedStoreSet = jasmine.createSpy(
          `effectSetUnkeyedStoreSet`
        );
        const effectSetUnkeyedStore: UnkeyedStore<unknown> = {
          type: `unkeyedStore`,
          name: `effectSetUnkeyedStore`,
          get: effectSetUnkeyedStoreGet,
          set: effectSetUnkeyedStoreSet,
        };
        effectSetKeyedStoreGet = jasmine.createSpy(`effectSetKeyedStoreGet`);
        effectSetKeyedStoreSet = jasmine.createSpy(`effectSetKeyedStoreSet`);
        effectSetKeyedStoreDelete = jasmine.createSpy(
          `effectSetKeyedStoreDelete`
        );
        effectSetKeyedStoreGetAll = jasmine.createSpy(
          `effectSetKeyedStoreGetAll`
        );
        effectSetKeyedStoreGetKeys = jasmine.createSpy(
          `effectSetKeyedStoreGetKeys`
        );
        const effectSetKeyedStore: KeyedStore<unknown> = {
          type: `keyedStore`,
          name: `effectSetKeyedStore`,
          get: effectSetKeyedStoreGet,
          set: effectSetKeyedStoreSet,
          delete: effectSetKeyedStoreDelete,
          getAll: effectSetKeyedStoreGetAll,
          getKeys: effectSetKeyedStoreGetKeys,
        };
        effectDeletedKeyedStoreGet = jasmine.createSpy(
          `effectDeletedKeyedStoreGet`
        );
        effectDeletedKeyedStoreSet = jasmine.createSpy(
          `effectDeletedKeyedStoreSet`
        );
        effectDeletedKeyedStoreDelete = jasmine.createSpy(
          `effectDeletedKeyedStoreDelete`
        );
        effectDeletedKeyedStoreGetAll = jasmine.createSpy(
          `effectDeletedKeyedStoreGetAll`
        );
        effectDeletedKeyedStoreGetKeys = jasmine.createSpy(
          `effectDeletedKeyedStoreGetKeys`
        );
        const effectDeletedKeyedStore: KeyedStore<unknown> = {
          type: `keyedStore`,
          name: `effectDeletedKeyedStore`,
          get: effectDeletedKeyedStoreGet,
          set: effectDeletedKeyedStoreSet,
          delete: effectDeletedKeyedStoreDelete,
          getAll: effectDeletedKeyedStoreGetAll,
          getKeys: effectDeletedKeyedStoreGetKeys,
        };
        unusedUnkeyedStoreGet = jasmine.createSpy(`unusedUnkeyedStoreGet`);
        unusedUnkeyedStoreSet = jasmine.createSpy(`unusedUnkeyedStoreSet`);
        const unusedUnkeyedStore: UnkeyedStore<unknown> = {
          type: `unkeyedStore`,
          name: `unusedUnkeyedStore`,
          get: unusedUnkeyedStoreGet,
          set: unusedUnkeyedStoreSet,
        };
        unusedKeyedStoreGet = jasmine.createSpy(`unusedKeyedStoreGet`);
        unusedKeyedStoreSet = jasmine.createSpy(`unusedKeyedStoreSet`);
        unusedKeyedStoreDelete = jasmine.createSpy(`unusedKeyedStoreDelete`);
        unusedKeyedStoreGetAll = jasmine.createSpy(`unusedKeyedStoreGetAll`);
        unusedKeyedStoreGetKeys = jasmine.createSpy(`unusedKeyedStoreGetKeys`);
        const unusedKeyedStore: KeyedStore<unknown> = {
          type: `keyedStore`,
          name: `unusedKeyedStore`,
          get: unusedKeyedStoreGet,
          set: unusedKeyedStoreSet,
          delete: unusedKeyedStoreDelete,
          getAll: unusedKeyedStoreGetAll,
          getKeys: unusedKeyedStoreGetKeys,
        };
        writtenUnkeyedStoreGet = jasmine.createSpy(`writtenUnkeyedStoreGet`);
        writtenUnkeyedStoreSet = jasmine.createSpy(`writtenUnkeyedStoreSet`);
        const writtenUnkeyedStore: UnkeyedStore<unknown> = {
          type: `unkeyedStore`,
          name: `writtenUnkeyedStore`,
          get: writtenUnkeyedStoreGet,
          set: writtenUnkeyedStoreSet,
        };
        writtenKeyedStoreGet = jasmine.createSpy(`writtenKeyedStoreGet`);
        writtenKeyedStoreSet = jasmine.createSpy(`writtenKeyedStoreSet`);
        writtenKeyedStoreDelete = jasmine.createSpy(`writtenKeyedStoreDelete`);
        writtenKeyedStoreGetAll = jasmine.createSpy(`writtenKeyedStoreGetAll`);
        writtenKeyedStoreGetKeys = jasmine.createSpy(
          `writtenKeyedStoreGetKeys`
        );
        const writtenKeyedStore: KeyedStore<unknown> = {
          type: `keyedStore`,
          name: `writtenKeyedStore`,
          get: writtenKeyedStoreGet,
          set: writtenKeyedStoreSet,
          delete: writtenKeyedStoreDelete,
          getAll: writtenKeyedStoreGetAll,
          getKeys: writtenKeyedStoreGetKeys,
        };
        keyedStoreGet = jasmine.createSpy(`keyedStoreGet`);
        keyedStoreSet = jasmine.createSpy(`keyedStoreSet`);
        keyedStoreDelete = jasmine.createSpy(`keyedStoreDelete`);
        keyedStoreGetAll = jasmine.createSpy(`keyedStoreGetAll`);
        keyedStoreGetKeys = jasmine
          .createSpy(`keyedStoreGetKeys`)
          .and.resolveTo([
            `Test Deleted Key`,
            `Test Deleted Then Set Key`,
            `Test Refreshed Key`,
          ]);
        const keyedStore: KeyedStore<unknown> = {
          type: `keyedStore`,
          name: `keyedStore`,
          get: keyedStoreGet,
          set: keyedStoreSet,
          delete: keyedStoreDelete,
          getAll: keyedStoreGetAll,
          getKeys: keyedStoreGetKeys,
        };
        stepEffectSetUnkeyedStoreGet = jasmine.createSpy(
          `stepEffectSetUnkeyedStoreGet`
        );
        stepEffectSetUnkeyedStoreSet = jasmine.createSpy(
          `stepEffectSetUnkeyedStoreSet`
        );
        const stepEffectSetUnkeyedStore: UnkeyedStore<unknown> = {
          type: `unkeyedStore`,
          name: `stepEffectSetUnkeyedStore`,
          get: stepEffectSetUnkeyedStoreGet,
          set: stepEffectSetUnkeyedStoreSet,
        };
        stepEffectSetKeyedStoreGet = jasmine.createSpy(
          `stepEffectSetKeyedStoreGet`
        );
        stepEffectSetKeyedStoreSet = jasmine.createSpy(
          `stepEffectSetKeyedStoreSet`
        );
        stepEffectSetKeyedStoreDelete = jasmine.createSpy(
          `stepEffectSetKeyedStoreDelete`
        );
        stepEffectSetKeyedStoreGetAll = jasmine.createSpy(
          `stepEffectSetKeyedStoreGetAll`
        );
        stepEffectSetKeyedStoreGetKeys = jasmine.createSpy(
          `stepEffectSetKeyedStoreGetKeys`
        );
        const stepEffectSetKeyedStore: KeyedStore<unknown> = {
          type: `keyedStore`,
          name: `stepEffectSetKeyedStore`,
          get: stepEffectSetKeyedStoreGet,
          set: stepEffectSetKeyedStoreSet,
          delete: stepEffectSetKeyedStoreDelete,
          getAll: stepEffectSetKeyedStoreGetAll,
          getKeys: stepEffectSetKeyedStoreGetKeys,
        };
        stepEffectDeletedKeyedStoreGet = jasmine.createSpy(
          `stepEffectDeletedKeyedStoreGet`
        );
        stepEffectDeletedKeyedStoreSet = jasmine.createSpy(
          `stepEffectDeletedKeyedStoreSet`
        );
        stepEffectDeletedKeyedStoreDelete = jasmine.createSpy(
          `stepEffectDeletedKeyedStoreDelete`
        );
        stepEffectDeletedKeyedStoreGetAll = jasmine.createSpy(
          `stepEffectDeletedKeyedStoreGetAll`
        );
        stepEffectDeletedKeyedStoreGetKeys = jasmine.createSpy(
          `stepEffectDeletedKeyedStoreGetKeys`
        );
        const stepEffectDeletedKeyedStore: KeyedStore<unknown> = {
          type: `keyedStore`,
          name: `stepEffectDeletedKeyedStore`,
          get: stepEffectDeletedKeyedStoreGet,
          set: stepEffectDeletedKeyedStoreSet,
          delete: stepEffectDeletedKeyedStoreDelete,
          getAll: stepEffectDeletedKeyedStoreGetAll,
          getKeys: stepEffectDeletedKeyedStoreGetKeys,
        };
        setExecutePerActionStep = jasmine.createSpy(`setExecutePerActionStep`);
        setStep = {
          name: `setStep`,
          executePerActionStep: setExecutePerActionStep,
          effects: [
            {
              type: `unkeyedStoreSet`,
              unkeyedStore: stepEffectSetUnkeyedStore,
            },
            {
              type: `keyedStoreSet`,
              keyedStore: stepEffectSetKeyedStore,
              key: `Test Set Key`,
            },
            {
              type: `keyedStoreDelete`,
              keyedStore: stepEffectDeletedKeyedStore,
              key: `Test Deleted Key`,
            },
          ],
        };
        deletedThenSetDownExecutePerActionStep = jasmine.createSpy(
          `deletedThenSetDownExecutePerActionStep`
        );
        deletedThenSetDownStep = {
          name: `deletedThenSetDownStep`,
          executePerActionStep: deletedThenSetDownExecutePerActionStep,
          effects: [
            {
              type: `unkeyedStoreSet`,
              unkeyedStore: stepEffectSetUnkeyedStore,
            },
            {
              type: `keyedStoreSet`,
              keyedStore: stepEffectSetKeyedStore,
              key: `Test Set Key`,
            },
            {
              type: `keyedStoreDelete`,
              keyedStore: stepEffectDeletedKeyedStore,
              key: `Test Deleted Key`,
            },
          ],
        };
        deletedThenSetUpExecutePerActionStep = jasmine.createSpy(
          `deletedThenSetUpExecutePerActionStep`
        );
        deletedThenSetUpStep = {
          name: `deletedThenSetUpStep`,
          executePerActionStep: deletedThenSetUpExecutePerActionStep,
          effects: [
            {
              type: `unkeyedStoreSet`,
              unkeyedStore: stepEffectSetUnkeyedStore,
            },
            {
              type: `keyedStoreSet`,
              keyedStore: stepEffectSetKeyedStore,
              key: `Test Set Key`,
            },
            {
              type: `keyedStoreDelete`,
              keyedStore: stepEffectDeletedKeyedStore,
              key: `Test Deleted Key`,
            },
          ],
        };
        deletedExecutePerActionStep = jasmine.createSpy(
          `deletedExecutePerActionStep`
        );
        deleteStep = {
          name: `deleteStep`,
          executePerActionStep: deletedExecutePerActionStep,
          effects: [
            {
              type: `unkeyedStoreSet`,
              unkeyedStore: stepEffectSetUnkeyedStore,
            },
            {
              type: `keyedStoreSet`,
              keyedStore: stepEffectSetKeyedStore,
              key: `Test Set Key`,
            },
            {
              type: `keyedStoreDelete`,
              keyedStore: stepEffectDeletedKeyedStore,
              key: `Test Deleted Key`,
            },
          ],
        };
        refreshedDownExecutePerActionStep = jasmine.createSpy(
          `refreshedDownExecutePerActionStep`
        );
        refreshedDownStep = {
          name: `refreshedDownStep`,
          executePerActionStep: refreshedDownExecutePerActionStep,
          effects: [
            {
              type: `unkeyedStoreSet`,
              unkeyedStore: stepEffectSetUnkeyedStore,
            },
            {
              type: `keyedStoreSet`,
              keyedStore: stepEffectSetKeyedStore,
              key: `Test Set Key`,
            },
            {
              type: `keyedStoreDelete`,
              keyedStore: stepEffectDeletedKeyedStore,
              key: `Test Deleted Key`,
            },
          ],
        };
        refreshedUpExecutePerActionStep = jasmine.createSpy(
          `refreshedUpExecutePerActionStep`
        );
        refreshedUpStep = {
          name: `refreshedUpStep`,
          executePerActionStep: refreshedUpExecutePerActionStep,
          effects: [
            {
              type: `unkeyedStoreSet`,
              unkeyedStore: stepEffectSetUnkeyedStore,
            },
            {
              type: `keyedStoreSet`,
              keyedStore: stepEffectSetKeyedStore,
              key: `Test Set Key`,
            },
            {
              type: `keyedStoreDelete`,
              keyedStore: stepEffectDeletedKeyedStore,
              key: `Test Deleted Key`,
            },
          ],
        };
        up = jasmine.createSpy(`up`).and.callFake((path) => {
          switch (path) {
            case `Test Set Key`:
              return setStep;

            case `Test Deleted Then Set Key`:
              return deletedThenSetUpStep;

            case `Test Refreshed Key`:
              return refreshedUpStep;

            default:
              fail(`Unexpected up key "${path}".`);
              return null;
          }
        });
        down = jasmine.createSpy(`down`).and.callFake((path) => {
          switch (path) {
            case `Test Deleted Then Set Key`:
              return deletedThenSetDownStep;

            case `Test Deleted Key`:
              return deleteStep;

            case `Test Refreshed Key`:
              return refreshedDownStep;

            default:
              fail(`Unexpected down key "${path}".`);
              return null;
          }
        });

        result = await generateParallelStepsForTrigger(
          {
            added: [
              `Test Added Path A`,
              `Test Added Path B`,
              `Test Added Path C`,
            ],
            changed: [`Test Changed Path A`, `Test Changed Path B`],
            unchanged: [
              `Test Unchanged Path A`,
              `Test Unchanged Path B`,
              `Test Unchanged Path C`,
              `Test Unchanged Path D`,
              `Test Unchanged Path E`,
            ],
            deleted: [
              `Test Deleted Path A`,
              `Test Deleted Path B`,
              `Test Deleted Path C`,
            ],
          },
          [
            {
              type: `unkeyedStoreSet`,
              unkeyedStore: effectSetUnkeyedStore,
            },
            {
              type: `keyedStoreSet`,
              keyedStore: effectSetKeyedStore,
              key: `Test Set Key`,
            },
            {
              type: `keyedStoreDelete`,
              keyedStore,
              key: `Test Deleted Key`,
            },
            {
              type: `keyedStoreDelete`,
              keyedStore,
              key: `Test Deleted Then Set Key`,
            },
            {
              type: `keyedStoreSet`,
              keyedStore,
              key: `Test Deleted Then Set Key`,
            },
            {
              type: `keyedStoreSet`,
              keyedStore,
              key: `Test Set Key`,
            },
            {
              type: `keyedStoreDelete`,
              keyedStore: effectDeletedKeyedStore,
              key: `Test Deleted Key`,
            },
          ],
          {
            type: `keyedStore`,
            keyedStore,
            refreshAllWhenStoresChange: [
              unusedUnkeyedStore,
              effectSetKeyedStore,
              unusedKeyedStore,
            ],
            up,
            down,
            writesToStores: [writtenUnkeyedStore, writtenKeyedStore],
          }
        );
      });

      it(`lists all keys in the store once`, () => {
        expect(keyedStoreGetKeys).toHaveBeenCalledTimes(1);
      });

      it(`creates an up step for set keys`, () => {
        expect(up).toHaveBeenCalledWith(`Test Set Key`);
      });

      it(`creates an up step for deleted then set keys`, () => {
        expect(up).toHaveBeenCalledWith(`Test Deleted Then Set Key`);
      });

      it(`creates an up step for refreshed keys`, () => {
        expect(up).toHaveBeenCalledWith(`Test Refreshed Key`);
      });

      it(`creates no further up steps`, () => {
        expect(up).toHaveBeenCalledTimes(3);
      });

      it(`creates a down step for deleted then set keys`, () => {
        expect(down).toHaveBeenCalledWith(`Test Deleted Then Set Key`);
      });

      it(`creates a down step for deleted keys`, () => {
        expect(down).toHaveBeenCalledWith(`Test Deleted Key`);
      });

      it(`creates a down step for refreshed keys`, () => {
        expect(down).toHaveBeenCalledWith(`Test Refreshed Key`);
      });

      it(`creates no further down steps`, () => {
        expect(down).toHaveBeenCalledTimes(3);
      });

      it(`returns the created steps`, () => {
        expect(result.parallelSteps).toEqual(
          jasmine.arrayWithExactContents([
            setStep,
            new SerialStep(`Test Deleted Then Set Key`, [
              deletedThenSetDownStep,
              deletedThenSetUpStep,
            ]),
            deleteStep,
            new SerialStep(`Test Refreshed Key`, [
              refreshedDownStep,
              refreshedUpStep,
            ]),
          ])
        );
      });

      it(`returns the given unclaimed files`, () => {
        expect(result.unclaimedFiles).toEqual({
          added: [
            `Test Added Path A`,
            `Test Added Path B`,
            `Test Added Path C`,
          ],
          changed: [`Test Changed Path A`, `Test Changed Path B`],
          unchanged: [
            `Test Unchanged Path A`,
            `Test Unchanged Path B`,
            `Test Unchanged Path C`,
            `Test Unchanged Path D`,
            `Test Unchanged Path E`,
          ],
          deleted: [
            `Test Deleted Path A`,
            `Test Deleted Path B`,
            `Test Deleted Path C`,
          ],
        });
      });

      it(`does not further interact with any stores`, () => {
        expect(effectSetUnkeyedStoreGet).not.toHaveBeenCalled();
        expect(effectSetUnkeyedStoreSet).not.toHaveBeenCalled();
        expect(effectSetKeyedStoreGet).not.toHaveBeenCalled();
        expect(effectSetKeyedStoreSet).not.toHaveBeenCalled();
        expect(effectSetKeyedStoreDelete).not.toHaveBeenCalled();
        expect(effectSetKeyedStoreGetAll).not.toHaveBeenCalled();
        expect(effectSetKeyedStoreGetKeys).not.toHaveBeenCalled();
        expect(effectDeletedKeyedStoreGet).not.toHaveBeenCalled();
        expect(effectDeletedKeyedStoreSet).not.toHaveBeenCalled();
        expect(effectDeletedKeyedStoreDelete).not.toHaveBeenCalled();
        expect(effectDeletedKeyedStoreGetAll).not.toHaveBeenCalled();
        expect(effectDeletedKeyedStoreGetKeys).not.toHaveBeenCalled();
        expect(unusedUnkeyedStoreGet).not.toHaveBeenCalled();
        expect(unusedUnkeyedStoreSet).not.toHaveBeenCalled();
        expect(unusedKeyedStoreGet).not.toHaveBeenCalled();
        expect(unusedKeyedStoreSet).not.toHaveBeenCalled();
        expect(unusedKeyedStoreDelete).not.toHaveBeenCalled();
        expect(unusedKeyedStoreGetAll).not.toHaveBeenCalled();
        expect(unusedKeyedStoreGetKeys).not.toHaveBeenCalled();
        expect(writtenUnkeyedStoreGet).not.toHaveBeenCalled();
        expect(writtenUnkeyedStoreSet).not.toHaveBeenCalled();
        expect(writtenKeyedStoreGet).not.toHaveBeenCalled();
        expect(writtenKeyedStoreSet).not.toHaveBeenCalled();
        expect(writtenKeyedStoreDelete).not.toHaveBeenCalled();
        expect(writtenKeyedStoreGetAll).not.toHaveBeenCalled();
        expect(writtenKeyedStoreGetKeys).not.toHaveBeenCalled();
        expect(keyedStoreGet).not.toHaveBeenCalled();
        expect(keyedStoreSet).not.toHaveBeenCalled();
        expect(keyedStoreDelete).not.toHaveBeenCalled();
        expect(keyedStoreGetAll).not.toHaveBeenCalled();
        expect(stepEffectSetUnkeyedStoreGet).not.toHaveBeenCalled();
        expect(stepEffectSetUnkeyedStoreSet).not.toHaveBeenCalled();
        expect(stepEffectSetKeyedStoreGet).not.toHaveBeenCalled();
        expect(stepEffectSetKeyedStoreSet).not.toHaveBeenCalled();
        expect(stepEffectSetKeyedStoreDelete).not.toHaveBeenCalled();
        expect(stepEffectSetKeyedStoreGetAll).not.toHaveBeenCalled();
        expect(stepEffectSetKeyedStoreGetKeys).not.toHaveBeenCalled();
        expect(stepEffectDeletedKeyedStoreGet).not.toHaveBeenCalled();
        expect(stepEffectDeletedKeyedStoreSet).not.toHaveBeenCalled();
        expect(stepEffectDeletedKeyedStoreDelete).not.toHaveBeenCalled();
        expect(stepEffectDeletedKeyedStoreGetAll).not.toHaveBeenCalled();
        expect(stepEffectDeletedKeyedStoreGetKeys).not.toHaveBeenCalled();
      });

      it(`does not interact with any steps`, () => {
        expect(setExecutePerActionStep).not.toHaveBeenCalled();
        expect(deletedThenSetDownExecutePerActionStep).not.toHaveBeenCalled();
        expect(deletedThenSetUpExecutePerActionStep).not.toHaveBeenCalled();
        expect(deletedExecutePerActionStep).not.toHaveBeenCalled();
        expect(refreshedDownExecutePerActionStep).not.toHaveBeenCalled();
        expect(refreshedUpExecutePerActionStep).not.toHaveBeenCalled();
      });
    });

    describe(`when deleting a keyed store triggers a full refresh`, () => {
      let effectSetUnkeyedStoreGet: jasmine.Spy;
      let effectSetUnkeyedStoreSet: jasmine.Spy;
      let effectSetKeyedStoreGet: jasmine.Spy;
      let effectSetKeyedStoreSet: jasmine.Spy;
      let effectSetKeyedStoreDelete: jasmine.Spy;
      let effectSetKeyedStoreGetAll: jasmine.Spy;
      let effectSetKeyedStoreGetKeys: jasmine.Spy;
      let effectDeletedKeyedStoreGet: jasmine.Spy;
      let effectDeletedKeyedStoreSet: jasmine.Spy;
      let effectDeletedKeyedStoreDelete: jasmine.Spy;
      let effectDeletedKeyedStoreGetAll: jasmine.Spy;
      let effectDeletedKeyedStoreGetKeys: jasmine.Spy;
      let unusedUnkeyedStoreGet: jasmine.Spy;
      let unusedUnkeyedStoreSet: jasmine.Spy;
      let unusedKeyedStoreGet: jasmine.Spy;
      let unusedKeyedStoreSet: jasmine.Spy;
      let unusedKeyedStoreDelete: jasmine.Spy;
      let unusedKeyedStoreGetAll: jasmine.Spy;
      let unusedKeyedStoreGetKeys: jasmine.Spy;
      let writtenUnkeyedStoreGet: jasmine.Spy;
      let writtenUnkeyedStoreSet: jasmine.Spy;
      let writtenKeyedStoreGet: jasmine.Spy;
      let writtenKeyedStoreSet: jasmine.Spy;
      let writtenKeyedStoreDelete: jasmine.Spy;
      let writtenKeyedStoreGetAll: jasmine.Spy;
      let writtenKeyedStoreGetKeys: jasmine.Spy;
      let keyedStoreGet: jasmine.Spy;
      let keyedStoreSet: jasmine.Spy;
      let keyedStoreDelete: jasmine.Spy;
      let keyedStoreGetAll: jasmine.Spy;
      let keyedStoreGetKeys: jasmine.Spy;
      let up: jasmine.Spy;
      let down: jasmine.Spy;
      let stepEffectSetUnkeyedStoreGet: jasmine.Spy;
      let stepEffectSetUnkeyedStoreSet: jasmine.Spy;
      let stepEffectSetKeyedStoreGet: jasmine.Spy;
      let stepEffectSetKeyedStoreSet: jasmine.Spy;
      let stepEffectSetKeyedStoreDelete: jasmine.Spy;
      let stepEffectSetKeyedStoreGetAll: jasmine.Spy;
      let stepEffectSetKeyedStoreGetKeys: jasmine.Spy;
      let stepEffectDeletedKeyedStoreGet: jasmine.Spy;
      let stepEffectDeletedKeyedStoreSet: jasmine.Spy;
      let stepEffectDeletedKeyedStoreDelete: jasmine.Spy;
      let stepEffectDeletedKeyedStoreGetAll: jasmine.Spy;
      let stepEffectDeletedKeyedStoreGetKeys: jasmine.Spy;
      let setExecutePerActionStep: jasmine.Spy;
      let setStep: Step;
      let deletedThenSetDownExecutePerActionStep: jasmine.Spy;
      let deletedThenSetDownStep: Step;
      let deletedThenSetUpExecutePerActionStep: jasmine.Spy;
      let deletedThenSetUpStep: Step;
      let deletedExecutePerActionStep: jasmine.Spy;
      let deleteStep: Step;
      let refreshedDownExecutePerActionStep: jasmine.Spy;
      let refreshedDownStep: Step;
      let refreshedUpExecutePerActionStep: jasmine.Spy;
      let refreshedUpStep: Step;
      let result: {
        readonly unclaimedFiles: Diff<string>;
        readonly parallelSteps: ReadonlyArray<Step>;
      };

      beforeAll(async () => {
        effectSetUnkeyedStoreGet = jasmine.createSpy(
          `effectSetUnkeyedStoreGet`
        );
        effectSetUnkeyedStoreSet = jasmine.createSpy(
          `effectSetUnkeyedStoreSet`
        );
        const effectSetUnkeyedStore: UnkeyedStore<unknown> = {
          type: `unkeyedStore`,
          name: `effectSetUnkeyedStore`,
          get: effectSetUnkeyedStoreGet,
          set: effectSetUnkeyedStoreSet,
        };
        effectSetKeyedStoreGet = jasmine.createSpy(`effectSetKeyedStoreGet`);
        effectSetKeyedStoreSet = jasmine.createSpy(`effectSetKeyedStoreSet`);
        effectSetKeyedStoreDelete = jasmine.createSpy(
          `effectSetKeyedStoreDelete`
        );
        effectSetKeyedStoreGetAll = jasmine.createSpy(
          `effectSetKeyedStoreGetAll`
        );
        effectSetKeyedStoreGetKeys = jasmine.createSpy(
          `effectSetKeyedStoreGetKeys`
        );
        const effectSetKeyedStore: KeyedStore<unknown> = {
          type: `keyedStore`,
          name: `effectSetKeyedStore`,
          get: effectSetKeyedStoreGet,
          set: effectSetKeyedStoreSet,
          delete: effectSetKeyedStoreDelete,
          getAll: effectSetKeyedStoreGetAll,
          getKeys: effectSetKeyedStoreGetKeys,
        };
        effectDeletedKeyedStoreGet = jasmine.createSpy(
          `effectDeletedKeyedStoreGet`
        );
        effectDeletedKeyedStoreSet = jasmine.createSpy(
          `effectDeletedKeyedStoreSet`
        );
        effectDeletedKeyedStoreDelete = jasmine.createSpy(
          `effectDeletedKeyedStoreDelete`
        );
        effectDeletedKeyedStoreGetAll = jasmine.createSpy(
          `effectDeletedKeyedStoreGetAll`
        );
        effectDeletedKeyedStoreGetKeys = jasmine.createSpy(
          `effectDeletedKeyedStoreGetKeys`
        );
        const effectDeletedKeyedStore: KeyedStore<unknown> = {
          type: `keyedStore`,
          name: `effectDeletedKeyedStore`,
          get: effectDeletedKeyedStoreGet,
          set: effectDeletedKeyedStoreSet,
          delete: effectDeletedKeyedStoreDelete,
          getAll: effectDeletedKeyedStoreGetAll,
          getKeys: effectDeletedKeyedStoreGetKeys,
        };
        unusedUnkeyedStoreGet = jasmine.createSpy(`unusedUnkeyedStoreGet`);
        unusedUnkeyedStoreSet = jasmine.createSpy(`unusedUnkeyedStoreSet`);
        const unusedUnkeyedStore: UnkeyedStore<unknown> = {
          type: `unkeyedStore`,
          name: `unusedUnkeyedStore`,
          get: unusedUnkeyedStoreGet,
          set: unusedUnkeyedStoreSet,
        };
        unusedKeyedStoreGet = jasmine.createSpy(`unusedKeyedStoreGet`);
        unusedKeyedStoreSet = jasmine.createSpy(`unusedKeyedStoreSet`);
        unusedKeyedStoreDelete = jasmine.createSpy(`unusedKeyedStoreDelete`);
        unusedKeyedStoreGetAll = jasmine.createSpy(`unusedKeyedStoreGetAll`);
        unusedKeyedStoreGetKeys = jasmine.createSpy(`unusedKeyedStoreGetKeys`);
        const unusedKeyedStore: KeyedStore<unknown> = {
          type: `keyedStore`,
          name: `unusedKeyedStore`,
          get: unusedKeyedStoreGet,
          set: unusedKeyedStoreSet,
          delete: unusedKeyedStoreDelete,
          getAll: unusedKeyedStoreGetAll,
          getKeys: unusedKeyedStoreGetKeys,
        };
        writtenUnkeyedStoreGet = jasmine.createSpy(`writtenUnkeyedStoreGet`);
        writtenUnkeyedStoreSet = jasmine.createSpy(`writtenUnkeyedStoreSet`);
        const writtenUnkeyedStore: UnkeyedStore<unknown> = {
          type: `unkeyedStore`,
          name: `writtenUnkeyedStore`,
          get: writtenUnkeyedStoreGet,
          set: writtenUnkeyedStoreSet,
        };
        writtenKeyedStoreGet = jasmine.createSpy(`writtenKeyedStoreGet`);
        writtenKeyedStoreSet = jasmine.createSpy(`writtenKeyedStoreSet`);
        writtenKeyedStoreDelete = jasmine.createSpy(`writtenKeyedStoreDelete`);
        writtenKeyedStoreGetAll = jasmine.createSpy(`writtenKeyedStoreGetAll`);
        writtenKeyedStoreGetKeys = jasmine.createSpy(
          `writtenKeyedStoreGetKeys`
        );
        const writtenKeyedStore: KeyedStore<unknown> = {
          type: `keyedStore`,
          name: `writtenKeyedStore`,
          get: writtenKeyedStoreGet,
          set: writtenKeyedStoreSet,
          delete: writtenKeyedStoreDelete,
          getAll: writtenKeyedStoreGetAll,
          getKeys: writtenKeyedStoreGetKeys,
        };
        keyedStoreGet = jasmine.createSpy(`keyedStoreGet`);
        keyedStoreSet = jasmine.createSpy(`keyedStoreSet`);
        keyedStoreDelete = jasmine.createSpy(`keyedStoreDelete`);
        keyedStoreGetAll = jasmine.createSpy(`keyedStoreGetAll`);
        keyedStoreGetKeys = jasmine
          .createSpy(`keyedStoreGetKeys`)
          .and.resolveTo([
            `Test Deleted Key`,
            `Test Deleted Then Set Key`,
            `Test Refreshed Key`,
          ]);
        const keyedStore: KeyedStore<unknown> = {
          type: `keyedStore`,
          name: `keyedStore`,
          get: keyedStoreGet,
          set: keyedStoreSet,
          delete: keyedStoreDelete,
          getAll: keyedStoreGetAll,
          getKeys: keyedStoreGetKeys,
        };
        stepEffectSetUnkeyedStoreGet = jasmine.createSpy(
          `stepEffectSetUnkeyedStoreGet`
        );
        stepEffectSetUnkeyedStoreSet = jasmine.createSpy(
          `stepEffectSetUnkeyedStoreSet`
        );
        const stepEffectSetUnkeyedStore: UnkeyedStore<unknown> = {
          type: `unkeyedStore`,
          name: `stepEffectSetUnkeyedStore`,
          get: stepEffectSetUnkeyedStoreGet,
          set: stepEffectSetUnkeyedStoreSet,
        };
        stepEffectSetKeyedStoreGet = jasmine.createSpy(
          `stepEffectSetKeyedStoreGet`
        );
        stepEffectSetKeyedStoreSet = jasmine.createSpy(
          `stepEffectSetKeyedStoreSet`
        );
        stepEffectSetKeyedStoreDelete = jasmine.createSpy(
          `stepEffectSetKeyedStoreDelete`
        );
        stepEffectSetKeyedStoreGetAll = jasmine.createSpy(
          `stepEffectSetKeyedStoreGetAll`
        );
        stepEffectSetKeyedStoreGetKeys = jasmine.createSpy(
          `stepEffectSetKeyedStoreGetKeys`
        );
        const stepEffectSetKeyedStore: KeyedStore<unknown> = {
          type: `keyedStore`,
          name: `stepEffectSetKeyedStore`,
          get: stepEffectSetKeyedStoreGet,
          set: stepEffectSetKeyedStoreSet,
          delete: stepEffectSetKeyedStoreDelete,
          getAll: stepEffectSetKeyedStoreGetAll,
          getKeys: stepEffectSetKeyedStoreGetKeys,
        };
        stepEffectDeletedKeyedStoreGet = jasmine.createSpy(
          `stepEffectDeletedKeyedStoreGet`
        );
        stepEffectDeletedKeyedStoreSet = jasmine.createSpy(
          `stepEffectDeletedKeyedStoreSet`
        );
        stepEffectDeletedKeyedStoreDelete = jasmine.createSpy(
          `stepEffectDeletedKeyedStoreDelete`
        );
        stepEffectDeletedKeyedStoreGetAll = jasmine.createSpy(
          `stepEffectDeletedKeyedStoreGetAll`
        );
        stepEffectDeletedKeyedStoreGetKeys = jasmine.createSpy(
          `stepEffectDeletedKeyedStoreGetKeys`
        );
        const stepEffectDeletedKeyedStore: KeyedStore<unknown> = {
          type: `keyedStore`,
          name: `stepEffectDeletedKeyedStore`,
          get: stepEffectDeletedKeyedStoreGet,
          set: stepEffectDeletedKeyedStoreSet,
          delete: stepEffectDeletedKeyedStoreDelete,
          getAll: stepEffectDeletedKeyedStoreGetAll,
          getKeys: stepEffectDeletedKeyedStoreGetKeys,
        };
        setExecutePerActionStep = jasmine.createSpy(`setExecutePerActionStep`);
        setStep = {
          name: `setStep`,
          executePerActionStep: setExecutePerActionStep,
          effects: [
            {
              type: `unkeyedStoreSet`,
              unkeyedStore: stepEffectSetUnkeyedStore,
            },
            {
              type: `keyedStoreSet`,
              keyedStore: stepEffectSetKeyedStore,
              key: `Test Set Key`,
            },
            {
              type: `keyedStoreDelete`,
              keyedStore: stepEffectDeletedKeyedStore,
              key: `Test Deleted Key`,
            },
          ],
        };
        deletedThenSetDownExecutePerActionStep = jasmine.createSpy(
          `deletedThenSetDownExecutePerActionStep`
        );
        deletedThenSetDownStep = {
          name: `deletedThenSetDownStep`,
          executePerActionStep: deletedThenSetDownExecutePerActionStep,
          effects: [
            {
              type: `unkeyedStoreSet`,
              unkeyedStore: stepEffectSetUnkeyedStore,
            },
            {
              type: `keyedStoreSet`,
              keyedStore: stepEffectSetKeyedStore,
              key: `Test Set Key`,
            },
            {
              type: `keyedStoreDelete`,
              keyedStore: stepEffectDeletedKeyedStore,
              key: `Test Deleted Key`,
            },
          ],
        };
        deletedThenSetUpExecutePerActionStep = jasmine.createSpy(
          `deletedThenSetUpExecutePerActionStep`
        );
        deletedThenSetUpStep = {
          name: `deletedThenSetUpStep`,
          executePerActionStep: deletedThenSetUpExecutePerActionStep,
          effects: [
            {
              type: `unkeyedStoreSet`,
              unkeyedStore: stepEffectSetUnkeyedStore,
            },
            {
              type: `keyedStoreSet`,
              keyedStore: stepEffectSetKeyedStore,
              key: `Test Set Key`,
            },
            {
              type: `keyedStoreDelete`,
              keyedStore: stepEffectDeletedKeyedStore,
              key: `Test Deleted Key`,
            },
          ],
        };
        deletedExecutePerActionStep = jasmine.createSpy(
          `deletedExecutePerActionStep`
        );
        deleteStep = {
          name: `deleteStep`,
          executePerActionStep: deletedExecutePerActionStep,
          effects: [
            {
              type: `unkeyedStoreSet`,
              unkeyedStore: stepEffectSetUnkeyedStore,
            },
            {
              type: `keyedStoreSet`,
              keyedStore: stepEffectSetKeyedStore,
              key: `Test Set Key`,
            },
            {
              type: `keyedStoreDelete`,
              keyedStore: stepEffectDeletedKeyedStore,
              key: `Test Deleted Key`,
            },
          ],
        };
        refreshedDownExecutePerActionStep = jasmine.createSpy(
          `refreshedDownExecutePerActionStep`
        );
        refreshedDownStep = {
          name: `refreshedDownStep`,
          executePerActionStep: refreshedDownExecutePerActionStep,
          effects: [
            {
              type: `unkeyedStoreSet`,
              unkeyedStore: stepEffectSetUnkeyedStore,
            },
            {
              type: `keyedStoreSet`,
              keyedStore: stepEffectSetKeyedStore,
              key: `Test Set Key`,
            },
            {
              type: `keyedStoreDelete`,
              keyedStore: stepEffectDeletedKeyedStore,
              key: `Test Deleted Key`,
            },
          ],
        };
        refreshedUpExecutePerActionStep = jasmine.createSpy(
          `refreshedUpExecutePerActionStep`
        );
        refreshedUpStep = {
          name: `refreshedUpStep`,
          executePerActionStep: refreshedUpExecutePerActionStep,
          effects: [
            {
              type: `unkeyedStoreSet`,
              unkeyedStore: stepEffectSetUnkeyedStore,
            },
            {
              type: `keyedStoreSet`,
              keyedStore: stepEffectSetKeyedStore,
              key: `Test Set Key`,
            },
            {
              type: `keyedStoreDelete`,
              keyedStore: stepEffectDeletedKeyedStore,
              key: `Test Deleted Key`,
            },
          ],
        };
        up = jasmine.createSpy(`up`).and.callFake((path) => {
          switch (path) {
            case `Test Set Key`:
              return setStep;

            case `Test Deleted Then Set Key`:
              return deletedThenSetUpStep;

            case `Test Refreshed Key`:
              return refreshedUpStep;

            default:
              fail(`Unexpected up key "${path}".`);
              return null;
          }
        });
        down = jasmine.createSpy(`down`).and.callFake((path) => {
          switch (path) {
            case `Test Deleted Then Set Key`:
              return deletedThenSetDownStep;

            case `Test Deleted Key`:
              return deleteStep;

            case `Test Refreshed Key`:
              return refreshedDownStep;

            default:
              fail(`Unexpected down key "${path}".`);
              return null;
          }
        });

        result = await generateParallelStepsForTrigger(
          {
            added: [
              `Test Added Path A`,
              `Test Added Path B`,
              `Test Added Path C`,
            ],
            changed: [`Test Changed Path A`, `Test Changed Path B`],
            unchanged: [
              `Test Unchanged Path A`,
              `Test Unchanged Path B`,
              `Test Unchanged Path C`,
              `Test Unchanged Path D`,
              `Test Unchanged Path E`,
            ],
            deleted: [
              `Test Deleted Path A`,
              `Test Deleted Path B`,
              `Test Deleted Path C`,
            ],
          },
          [
            {
              type: `unkeyedStoreSet`,
              unkeyedStore: effectSetUnkeyedStore,
            },
            {
              type: `keyedStoreSet`,
              keyedStore: effectSetKeyedStore,
              key: `Test Set Key`,
            },
            {
              type: `keyedStoreDelete`,
              keyedStore,
              key: `Test Deleted Key`,
            },
            {
              type: `keyedStoreDelete`,
              keyedStore,
              key: `Test Deleted Then Set Key`,
            },
            {
              type: `keyedStoreSet`,
              keyedStore,
              key: `Test Deleted Then Set Key`,
            },
            {
              type: `keyedStoreSet`,
              keyedStore,
              key: `Test Set Key`,
            },
            {
              type: `keyedStoreDelete`,
              keyedStore: effectDeletedKeyedStore,
              key: `Test Deleted Key`,
            },
          ],
          {
            type: `keyedStore`,
            keyedStore,
            refreshAllWhenStoresChange: [
              unusedUnkeyedStore,
              effectDeletedKeyedStore,
              unusedKeyedStore,
            ],
            up,
            down,
            writesToStores: [writtenUnkeyedStore, writtenKeyedStore],
          }
        );
      });

      it(`lists all keys in the store once`, () => {
        expect(keyedStoreGetKeys).toHaveBeenCalledTimes(1);
      });

      it(`creates an up step for set keys`, () => {
        expect(up).toHaveBeenCalledWith(`Test Set Key`);
      });

      it(`creates an up step for deleted then set keys`, () => {
        expect(up).toHaveBeenCalledWith(`Test Deleted Then Set Key`);
      });

      it(`creates an up step for refreshed keys`, () => {
        expect(up).toHaveBeenCalledWith(`Test Refreshed Key`);
      });

      it(`creates no further up steps`, () => {
        expect(up).toHaveBeenCalledTimes(3);
      });

      it(`creates a down step for deleted then set keys`, () => {
        expect(down).toHaveBeenCalledWith(`Test Deleted Then Set Key`);
      });

      it(`creates a down step for deleted keys`, () => {
        expect(down).toHaveBeenCalledWith(`Test Deleted Key`);
      });

      it(`creates a down step for refreshed keys`, () => {
        expect(down).toHaveBeenCalledWith(`Test Refreshed Key`);
      });

      it(`creates no further down steps`, () => {
        expect(down).toHaveBeenCalledTimes(3);
      });

      it(`returns the created steps`, () => {
        expect(result.parallelSteps).toEqual(
          jasmine.arrayWithExactContents([
            setStep,
            new SerialStep(`Test Deleted Then Set Key`, [
              deletedThenSetDownStep,
              deletedThenSetUpStep,
            ]),
            deleteStep,
            new SerialStep(`Test Refreshed Key`, [
              refreshedDownStep,
              refreshedUpStep,
            ]),
          ])
        );
      });

      it(`returns the given unclaimed files`, () => {
        expect(result.unclaimedFiles).toEqual({
          added: [
            `Test Added Path A`,
            `Test Added Path B`,
            `Test Added Path C`,
          ],
          changed: [`Test Changed Path A`, `Test Changed Path B`],
          unchanged: [
            `Test Unchanged Path A`,
            `Test Unchanged Path B`,
            `Test Unchanged Path C`,
            `Test Unchanged Path D`,
            `Test Unchanged Path E`,
          ],
          deleted: [
            `Test Deleted Path A`,
            `Test Deleted Path B`,
            `Test Deleted Path C`,
          ],
        });
      });

      it(`does not further interact with any stores`, () => {
        expect(effectSetUnkeyedStoreGet).not.toHaveBeenCalled();
        expect(effectSetUnkeyedStoreSet).not.toHaveBeenCalled();
        expect(effectSetKeyedStoreGet).not.toHaveBeenCalled();
        expect(effectSetKeyedStoreSet).not.toHaveBeenCalled();
        expect(effectSetKeyedStoreDelete).not.toHaveBeenCalled();
        expect(effectSetKeyedStoreGetAll).not.toHaveBeenCalled();
        expect(effectSetKeyedStoreGetKeys).not.toHaveBeenCalled();
        expect(effectDeletedKeyedStoreGet).not.toHaveBeenCalled();
        expect(effectDeletedKeyedStoreSet).not.toHaveBeenCalled();
        expect(effectDeletedKeyedStoreDelete).not.toHaveBeenCalled();
        expect(effectDeletedKeyedStoreGetAll).not.toHaveBeenCalled();
        expect(effectDeletedKeyedStoreGetKeys).not.toHaveBeenCalled();
        expect(unusedUnkeyedStoreGet).not.toHaveBeenCalled();
        expect(unusedUnkeyedStoreSet).not.toHaveBeenCalled();
        expect(unusedKeyedStoreGet).not.toHaveBeenCalled();
        expect(unusedKeyedStoreSet).not.toHaveBeenCalled();
        expect(unusedKeyedStoreDelete).not.toHaveBeenCalled();
        expect(unusedKeyedStoreGetAll).not.toHaveBeenCalled();
        expect(unusedKeyedStoreGetKeys).not.toHaveBeenCalled();
        expect(writtenUnkeyedStoreGet).not.toHaveBeenCalled();
        expect(writtenUnkeyedStoreSet).not.toHaveBeenCalled();
        expect(writtenKeyedStoreGet).not.toHaveBeenCalled();
        expect(writtenKeyedStoreSet).not.toHaveBeenCalled();
        expect(writtenKeyedStoreDelete).not.toHaveBeenCalled();
        expect(writtenKeyedStoreGetAll).not.toHaveBeenCalled();
        expect(writtenKeyedStoreGetKeys).not.toHaveBeenCalled();
        expect(keyedStoreGet).not.toHaveBeenCalled();
        expect(keyedStoreSet).not.toHaveBeenCalled();
        expect(keyedStoreDelete).not.toHaveBeenCalled();
        expect(keyedStoreGetAll).not.toHaveBeenCalled();
        expect(stepEffectSetUnkeyedStoreGet).not.toHaveBeenCalled();
        expect(stepEffectSetUnkeyedStoreSet).not.toHaveBeenCalled();
        expect(stepEffectSetKeyedStoreGet).not.toHaveBeenCalled();
        expect(stepEffectSetKeyedStoreSet).not.toHaveBeenCalled();
        expect(stepEffectSetKeyedStoreDelete).not.toHaveBeenCalled();
        expect(stepEffectSetKeyedStoreGetAll).not.toHaveBeenCalled();
        expect(stepEffectSetKeyedStoreGetKeys).not.toHaveBeenCalled();
        expect(stepEffectDeletedKeyedStoreGet).not.toHaveBeenCalled();
        expect(stepEffectDeletedKeyedStoreSet).not.toHaveBeenCalled();
        expect(stepEffectDeletedKeyedStoreDelete).not.toHaveBeenCalled();
        expect(stepEffectDeletedKeyedStoreGetAll).not.toHaveBeenCalled();
        expect(stepEffectDeletedKeyedStoreGetKeys).not.toHaveBeenCalled();
      });

      it(`does not interact with any steps`, () => {
        expect(setExecutePerActionStep).not.toHaveBeenCalled();
        expect(deletedThenSetDownExecutePerActionStep).not.toHaveBeenCalled();
        expect(deletedThenSetUpExecutePerActionStep).not.toHaveBeenCalled();
        expect(deletedExecutePerActionStep).not.toHaveBeenCalled();
        expect(refreshedDownExecutePerActionStep).not.toHaveBeenCalled();
        expect(refreshedUpExecutePerActionStep).not.toHaveBeenCalled();
      });
    });

    describe(`when setting an unkeyed store triggers a full refresh`, () => {
      let effectSetUnkeyedStoreGet: jasmine.Spy;
      let effectSetUnkeyedStoreSet: jasmine.Spy;
      let effectSetKeyedStoreGet: jasmine.Spy;
      let effectSetKeyedStoreSet: jasmine.Spy;
      let effectSetKeyedStoreDelete: jasmine.Spy;
      let effectSetKeyedStoreGetAll: jasmine.Spy;
      let effectSetKeyedStoreGetKeys: jasmine.Spy;
      let effectDeletedKeyedStoreGet: jasmine.Spy;
      let effectDeletedKeyedStoreSet: jasmine.Spy;
      let effectDeletedKeyedStoreDelete: jasmine.Spy;
      let effectDeletedKeyedStoreGetAll: jasmine.Spy;
      let effectDeletedKeyedStoreGetKeys: jasmine.Spy;
      let unusedUnkeyedStoreGet: jasmine.Spy;
      let unusedUnkeyedStoreSet: jasmine.Spy;
      let unusedKeyedStoreGet: jasmine.Spy;
      let unusedKeyedStoreSet: jasmine.Spy;
      let unusedKeyedStoreDelete: jasmine.Spy;
      let unusedKeyedStoreGetAll: jasmine.Spy;
      let unusedKeyedStoreGetKeys: jasmine.Spy;
      let writtenUnkeyedStoreGet: jasmine.Spy;
      let writtenUnkeyedStoreSet: jasmine.Spy;
      let writtenKeyedStoreGet: jasmine.Spy;
      let writtenKeyedStoreSet: jasmine.Spy;
      let writtenKeyedStoreDelete: jasmine.Spy;
      let writtenKeyedStoreGetAll: jasmine.Spy;
      let writtenKeyedStoreGetKeys: jasmine.Spy;
      let keyedStoreGet: jasmine.Spy;
      let keyedStoreSet: jasmine.Spy;
      let keyedStoreDelete: jasmine.Spy;
      let keyedStoreGetAll: jasmine.Spy;
      let keyedStoreGetKeys: jasmine.Spy;
      let up: jasmine.Spy;
      let down: jasmine.Spy;
      let stepEffectSetUnkeyedStoreGet: jasmine.Spy;
      let stepEffectSetUnkeyedStoreSet: jasmine.Spy;
      let stepEffectSetKeyedStoreGet: jasmine.Spy;
      let stepEffectSetKeyedStoreSet: jasmine.Spy;
      let stepEffectSetKeyedStoreDelete: jasmine.Spy;
      let stepEffectSetKeyedStoreGetAll: jasmine.Spy;
      let stepEffectSetKeyedStoreGetKeys: jasmine.Spy;
      let stepEffectDeletedKeyedStoreGet: jasmine.Spy;
      let stepEffectDeletedKeyedStoreSet: jasmine.Spy;
      let stepEffectDeletedKeyedStoreDelete: jasmine.Spy;
      let stepEffectDeletedKeyedStoreGetAll: jasmine.Spy;
      let stepEffectDeletedKeyedStoreGetKeys: jasmine.Spy;
      let setExecutePerActionStep: jasmine.Spy;
      let setStep: Step;
      let deletedThenSetDownExecutePerActionStep: jasmine.Spy;
      let deletedThenSetDownStep: Step;
      let deletedThenSetUpExecutePerActionStep: jasmine.Spy;
      let deletedThenSetUpStep: Step;
      let deletedExecutePerActionStep: jasmine.Spy;
      let deleteStep: Step;
      let refreshedDownExecutePerActionStep: jasmine.Spy;
      let refreshedDownStep: Step;
      let refreshedUpExecutePerActionStep: jasmine.Spy;
      let refreshedUpStep: Step;
      let result: {
        readonly unclaimedFiles: Diff<string>;
        readonly parallelSteps: ReadonlyArray<Step>;
      };

      beforeAll(async () => {
        effectSetUnkeyedStoreGet = jasmine.createSpy(
          `effectSetUnkeyedStoreGet`
        );
        effectSetUnkeyedStoreSet = jasmine.createSpy(
          `effectSetUnkeyedStoreSet`
        );
        const effectSetUnkeyedStore: UnkeyedStore<unknown> = {
          type: `unkeyedStore`,
          name: `effectSetUnkeyedStore`,
          get: effectSetUnkeyedStoreGet,
          set: effectSetUnkeyedStoreSet,
        };
        effectSetKeyedStoreGet = jasmine.createSpy(`effectSetKeyedStoreGet`);
        effectSetKeyedStoreSet = jasmine.createSpy(`effectSetKeyedStoreSet`);
        effectSetKeyedStoreDelete = jasmine.createSpy(
          `effectSetKeyedStoreDelete`
        );
        effectSetKeyedStoreGetAll = jasmine.createSpy(
          `effectSetKeyedStoreGetAll`
        );
        effectSetKeyedStoreGetKeys = jasmine.createSpy(
          `effectSetKeyedStoreGetKeys`
        );
        const effectSetKeyedStore: KeyedStore<unknown> = {
          type: `keyedStore`,
          name: `effectSetKeyedStore`,
          get: effectSetKeyedStoreGet,
          set: effectSetKeyedStoreSet,
          delete: effectSetKeyedStoreDelete,
          getAll: effectSetKeyedStoreGetAll,
          getKeys: effectSetKeyedStoreGetKeys,
        };
        effectDeletedKeyedStoreGet = jasmine.createSpy(
          `effectDeletedKeyedStoreGet`
        );
        effectDeletedKeyedStoreSet = jasmine.createSpy(
          `effectDeletedKeyedStoreSet`
        );
        effectDeletedKeyedStoreDelete = jasmine.createSpy(
          `effectDeletedKeyedStoreDelete`
        );
        effectDeletedKeyedStoreGetAll = jasmine.createSpy(
          `effectDeletedKeyedStoreGetAll`
        );
        effectDeletedKeyedStoreGetKeys = jasmine.createSpy(
          `effectDeletedKeyedStoreGetKeys`
        );
        const effectDeletedKeyedStore: KeyedStore<unknown> = {
          type: `keyedStore`,
          name: `effectDeletedKeyedStore`,
          get: effectDeletedKeyedStoreGet,
          set: effectDeletedKeyedStoreSet,
          delete: effectDeletedKeyedStoreDelete,
          getAll: effectDeletedKeyedStoreGetAll,
          getKeys: effectDeletedKeyedStoreGetKeys,
        };
        unusedUnkeyedStoreGet = jasmine.createSpy(`unusedUnkeyedStoreGet`);
        unusedUnkeyedStoreSet = jasmine.createSpy(`unusedUnkeyedStoreSet`);
        const unusedUnkeyedStore: UnkeyedStore<unknown> = {
          type: `unkeyedStore`,
          name: `unusedUnkeyedStore`,
          get: unusedUnkeyedStoreGet,
          set: unusedUnkeyedStoreSet,
        };
        unusedKeyedStoreGet = jasmine.createSpy(`unusedKeyedStoreGet`);
        unusedKeyedStoreSet = jasmine.createSpy(`unusedKeyedStoreSet`);
        unusedKeyedStoreDelete = jasmine.createSpy(`unusedKeyedStoreDelete`);
        unusedKeyedStoreGetAll = jasmine.createSpy(`unusedKeyedStoreGetAll`);
        unusedKeyedStoreGetKeys = jasmine.createSpy(`unusedKeyedStoreGetKeys`);
        const unusedKeyedStore: KeyedStore<unknown> = {
          type: `keyedStore`,
          name: `unusedKeyedStore`,
          get: unusedKeyedStoreGet,
          set: unusedKeyedStoreSet,
          delete: unusedKeyedStoreDelete,
          getAll: unusedKeyedStoreGetAll,
          getKeys: unusedKeyedStoreGetKeys,
        };
        writtenUnkeyedStoreGet = jasmine.createSpy(`writtenUnkeyedStoreGet`);
        writtenUnkeyedStoreSet = jasmine.createSpy(`writtenUnkeyedStoreSet`);
        const writtenUnkeyedStore: UnkeyedStore<unknown> = {
          type: `unkeyedStore`,
          name: `writtenUnkeyedStore`,
          get: writtenUnkeyedStoreGet,
          set: writtenUnkeyedStoreSet,
        };
        writtenKeyedStoreGet = jasmine.createSpy(`writtenKeyedStoreGet`);
        writtenKeyedStoreSet = jasmine.createSpy(`writtenKeyedStoreSet`);
        writtenKeyedStoreDelete = jasmine.createSpy(`writtenKeyedStoreDelete`);
        writtenKeyedStoreGetAll = jasmine.createSpy(`writtenKeyedStoreGetAll`);
        writtenKeyedStoreGetKeys = jasmine.createSpy(
          `writtenKeyedStoreGetKeys`
        );
        const writtenKeyedStore: KeyedStore<unknown> = {
          type: `keyedStore`,
          name: `writtenKeyedStore`,
          get: writtenKeyedStoreGet,
          set: writtenKeyedStoreSet,
          delete: writtenKeyedStoreDelete,
          getAll: writtenKeyedStoreGetAll,
          getKeys: writtenKeyedStoreGetKeys,
        };
        keyedStoreGet = jasmine.createSpy(`keyedStoreGet`);
        keyedStoreSet = jasmine.createSpy(`keyedStoreSet`);
        keyedStoreDelete = jasmine.createSpy(`keyedStoreDelete`);
        keyedStoreGetAll = jasmine.createSpy(`keyedStoreGetAll`);
        keyedStoreGetKeys = jasmine
          .createSpy(`keyedStoreGetKeys`)
          .and.resolveTo([
            `Test Deleted Key`,
            `Test Deleted Then Set Key`,
            `Test Refreshed Key`,
          ]);
        const keyedStore: KeyedStore<unknown> = {
          type: `keyedStore`,
          name: `keyedStore`,
          get: keyedStoreGet,
          set: keyedStoreSet,
          delete: keyedStoreDelete,
          getAll: keyedStoreGetAll,
          getKeys: keyedStoreGetKeys,
        };
        stepEffectSetUnkeyedStoreGet = jasmine.createSpy(
          `stepEffectSetUnkeyedStoreGet`
        );
        stepEffectSetUnkeyedStoreSet = jasmine.createSpy(
          `stepEffectSetUnkeyedStoreSet`
        );
        const stepEffectSetUnkeyedStore: UnkeyedStore<unknown> = {
          type: `unkeyedStore`,
          name: `stepEffectSetUnkeyedStore`,
          get: stepEffectSetUnkeyedStoreGet,
          set: stepEffectSetUnkeyedStoreSet,
        };
        stepEffectSetKeyedStoreGet = jasmine.createSpy(
          `stepEffectSetKeyedStoreGet`
        );
        stepEffectSetKeyedStoreSet = jasmine.createSpy(
          `stepEffectSetKeyedStoreSet`
        );
        stepEffectSetKeyedStoreDelete = jasmine.createSpy(
          `stepEffectSetKeyedStoreDelete`
        );
        stepEffectSetKeyedStoreGetAll = jasmine.createSpy(
          `stepEffectSetKeyedStoreGetAll`
        );
        stepEffectSetKeyedStoreGetKeys = jasmine.createSpy(
          `stepEffectSetKeyedStoreGetKeys`
        );
        const stepEffectSetKeyedStore: KeyedStore<unknown> = {
          type: `keyedStore`,
          name: `stepEffectSetKeyedStore`,
          get: stepEffectSetKeyedStoreGet,
          set: stepEffectSetKeyedStoreSet,
          delete: stepEffectSetKeyedStoreDelete,
          getAll: stepEffectSetKeyedStoreGetAll,
          getKeys: stepEffectSetKeyedStoreGetKeys,
        };
        stepEffectDeletedKeyedStoreGet = jasmine.createSpy(
          `stepEffectDeletedKeyedStoreGet`
        );
        stepEffectDeletedKeyedStoreSet = jasmine.createSpy(
          `stepEffectDeletedKeyedStoreSet`
        );
        stepEffectDeletedKeyedStoreDelete = jasmine.createSpy(
          `stepEffectDeletedKeyedStoreDelete`
        );
        stepEffectDeletedKeyedStoreGetAll = jasmine.createSpy(
          `stepEffectDeletedKeyedStoreGetAll`
        );
        stepEffectDeletedKeyedStoreGetKeys = jasmine.createSpy(
          `stepEffectDeletedKeyedStoreGetKeys`
        );
        const stepEffectDeletedKeyedStore: KeyedStore<unknown> = {
          type: `keyedStore`,
          name: `stepEffectDeletedKeyedStore`,
          get: stepEffectDeletedKeyedStoreGet,
          set: stepEffectDeletedKeyedStoreSet,
          delete: stepEffectDeletedKeyedStoreDelete,
          getAll: stepEffectDeletedKeyedStoreGetAll,
          getKeys: stepEffectDeletedKeyedStoreGetKeys,
        };
        setExecutePerActionStep = jasmine.createSpy(`setExecutePerActionStep`);
        setStep = {
          name: `setStep`,
          executePerActionStep: setExecutePerActionStep,
          effects: [
            {
              type: `unkeyedStoreSet`,
              unkeyedStore: stepEffectSetUnkeyedStore,
            },
            {
              type: `keyedStoreSet`,
              keyedStore: stepEffectSetKeyedStore,
              key: `Test Set Key`,
            },
            {
              type: `keyedStoreDelete`,
              keyedStore: stepEffectDeletedKeyedStore,
              key: `Test Deleted Key`,
            },
          ],
        };
        deletedThenSetDownExecutePerActionStep = jasmine.createSpy(
          `deletedThenSetDownExecutePerActionStep`
        );
        deletedThenSetDownStep = {
          name: `deletedThenSetDownStep`,
          executePerActionStep: deletedThenSetDownExecutePerActionStep,
          effects: [
            {
              type: `unkeyedStoreSet`,
              unkeyedStore: stepEffectSetUnkeyedStore,
            },
            {
              type: `keyedStoreSet`,
              keyedStore: stepEffectSetKeyedStore,
              key: `Test Set Key`,
            },
            {
              type: `keyedStoreDelete`,
              keyedStore: stepEffectDeletedKeyedStore,
              key: `Test Deleted Key`,
            },
          ],
        };
        deletedThenSetUpExecutePerActionStep = jasmine.createSpy(
          `deletedThenSetUpExecutePerActionStep`
        );
        deletedThenSetUpStep = {
          name: `deletedThenSetUpStep`,
          executePerActionStep: deletedThenSetUpExecutePerActionStep,
          effects: [
            {
              type: `unkeyedStoreSet`,
              unkeyedStore: stepEffectSetUnkeyedStore,
            },
            {
              type: `keyedStoreSet`,
              keyedStore: stepEffectSetKeyedStore,
              key: `Test Set Key`,
            },
            {
              type: `keyedStoreDelete`,
              keyedStore: stepEffectDeletedKeyedStore,
              key: `Test Deleted Key`,
            },
          ],
        };
        deletedExecutePerActionStep = jasmine.createSpy(
          `deletedExecutePerActionStep`
        );
        deleteStep = {
          name: `deleteStep`,
          executePerActionStep: deletedExecutePerActionStep,
          effects: [
            {
              type: `unkeyedStoreSet`,
              unkeyedStore: stepEffectSetUnkeyedStore,
            },
            {
              type: `keyedStoreSet`,
              keyedStore: stepEffectSetKeyedStore,
              key: `Test Set Key`,
            },
            {
              type: `keyedStoreDelete`,
              keyedStore: stepEffectDeletedKeyedStore,
              key: `Test Deleted Key`,
            },
          ],
        };
        refreshedDownExecutePerActionStep = jasmine.createSpy(
          `refreshedDownExecutePerActionStep`
        );
        refreshedDownStep = {
          name: `refreshedDownStep`,
          executePerActionStep: refreshedDownExecutePerActionStep,
          effects: [
            {
              type: `unkeyedStoreSet`,
              unkeyedStore: stepEffectSetUnkeyedStore,
            },
            {
              type: `keyedStoreSet`,
              keyedStore: stepEffectSetKeyedStore,
              key: `Test Set Key`,
            },
            {
              type: `keyedStoreDelete`,
              keyedStore: stepEffectDeletedKeyedStore,
              key: `Test Deleted Key`,
            },
          ],
        };
        refreshedUpExecutePerActionStep = jasmine.createSpy(
          `refreshedUpExecutePerActionStep`
        );
        refreshedUpStep = {
          name: `refreshedUpStep`,
          executePerActionStep: refreshedUpExecutePerActionStep,
          effects: [
            {
              type: `unkeyedStoreSet`,
              unkeyedStore: stepEffectSetUnkeyedStore,
            },
            {
              type: `keyedStoreSet`,
              keyedStore: stepEffectSetKeyedStore,
              key: `Test Set Key`,
            },
            {
              type: `keyedStoreDelete`,
              keyedStore: stepEffectDeletedKeyedStore,
              key: `Test Deleted Key`,
            },
          ],
        };
        up = jasmine.createSpy(`up`).and.callFake((path) => {
          switch (path) {
            case `Test Set Key`:
              return setStep;

            case `Test Deleted Then Set Key`:
              return deletedThenSetUpStep;

            case `Test Refreshed Key`:
              return refreshedUpStep;

            default:
              fail(`Unexpected up key "${path}".`);
              return null;
          }
        });
        down = jasmine.createSpy(`down`).and.callFake((path) => {
          switch (path) {
            case `Test Deleted Then Set Key`:
              return deletedThenSetDownStep;

            case `Test Deleted Key`:
              return deleteStep;

            case `Test Refreshed Key`:
              return refreshedDownStep;

            default:
              fail(`Unexpected down key "${path}".`);
              return null;
          }
        });

        result = await generateParallelStepsForTrigger(
          {
            added: [
              `Test Added Path A`,
              `Test Added Path B`,
              `Test Added Path C`,
            ],
            changed: [`Test Changed Path A`, `Test Changed Path B`],
            unchanged: [
              `Test Unchanged Path A`,
              `Test Unchanged Path B`,
              `Test Unchanged Path C`,
              `Test Unchanged Path D`,
              `Test Unchanged Path E`,
            ],
            deleted: [
              `Test Deleted Path A`,
              `Test Deleted Path B`,
              `Test Deleted Path C`,
            ],
          },
          [
            {
              type: `unkeyedStoreSet`,
              unkeyedStore: effectSetUnkeyedStore,
            },
            {
              type: `keyedStoreSet`,
              keyedStore: effectSetKeyedStore,
              key: `Test Set Key`,
            },
            {
              type: `keyedStoreDelete`,
              keyedStore,
              key: `Test Deleted Key`,
            },
            {
              type: `keyedStoreDelete`,
              keyedStore,
              key: `Test Deleted Then Set Key`,
            },
            {
              type: `keyedStoreSet`,
              keyedStore,
              key: `Test Deleted Then Set Key`,
            },
            {
              type: `keyedStoreSet`,
              keyedStore,
              key: `Test Set Key`,
            },
            {
              type: `keyedStoreDelete`,
              keyedStore: effectDeletedKeyedStore,
              key: `Test Deleted Key`,
            },
          ],
          {
            type: `keyedStore`,
            keyedStore,
            refreshAllWhenStoresChange: [
              unusedUnkeyedStore,
              effectSetUnkeyedStore,
              unusedKeyedStore,
            ],
            up,
            down,
            writesToStores: [writtenUnkeyedStore, writtenKeyedStore],
          }
        );
      });

      it(`lists all keys in the store once`, () => {
        expect(keyedStoreGetKeys).toHaveBeenCalledTimes(1);
      });

      it(`creates an up step for set keys`, () => {
        expect(up).toHaveBeenCalledWith(`Test Set Key`);
      });

      it(`creates an up step for deleted then set keys`, () => {
        expect(up).toHaveBeenCalledWith(`Test Deleted Then Set Key`);
      });

      it(`creates an up step for refreshed keys`, () => {
        expect(up).toHaveBeenCalledWith(`Test Refreshed Key`);
      });

      it(`creates no further up steps`, () => {
        expect(up).toHaveBeenCalledTimes(3);
      });

      it(`creates a down step for deleted then set keys`, () => {
        expect(down).toHaveBeenCalledWith(`Test Deleted Then Set Key`);
      });

      it(`creates a down step for deleted keys`, () => {
        expect(down).toHaveBeenCalledWith(`Test Deleted Key`);
      });

      it(`creates a down step for refreshed keys`, () => {
        expect(down).toHaveBeenCalledWith(`Test Refreshed Key`);
      });

      it(`creates no further down steps`, () => {
        expect(down).toHaveBeenCalledTimes(3);
      });

      it(`returns the created steps`, () => {
        expect(result.parallelSteps).toEqual(
          jasmine.arrayWithExactContents([
            setStep,
            new SerialStep(`Test Deleted Then Set Key`, [
              deletedThenSetDownStep,
              deletedThenSetUpStep,
            ]),
            deleteStep,
            new SerialStep(`Test Refreshed Key`, [
              refreshedDownStep,
              refreshedUpStep,
            ]),
          ])
        );
      });

      it(`returns the given unclaimed files`, () => {
        expect(result.unclaimedFiles).toEqual({
          added: [
            `Test Added Path A`,
            `Test Added Path B`,
            `Test Added Path C`,
          ],
          changed: [`Test Changed Path A`, `Test Changed Path B`],
          unchanged: [
            `Test Unchanged Path A`,
            `Test Unchanged Path B`,
            `Test Unchanged Path C`,
            `Test Unchanged Path D`,
            `Test Unchanged Path E`,
          ],
          deleted: [
            `Test Deleted Path A`,
            `Test Deleted Path B`,
            `Test Deleted Path C`,
          ],
        });
      });

      it(`does not further interact with any stores`, () => {
        expect(effectSetUnkeyedStoreGet).not.toHaveBeenCalled();
        expect(effectSetUnkeyedStoreSet).not.toHaveBeenCalled();
        expect(effectSetKeyedStoreGet).not.toHaveBeenCalled();
        expect(effectSetKeyedStoreSet).not.toHaveBeenCalled();
        expect(effectSetKeyedStoreDelete).not.toHaveBeenCalled();
        expect(effectSetKeyedStoreGetAll).not.toHaveBeenCalled();
        expect(effectSetKeyedStoreGetKeys).not.toHaveBeenCalled();
        expect(effectDeletedKeyedStoreGet).not.toHaveBeenCalled();
        expect(effectDeletedKeyedStoreSet).not.toHaveBeenCalled();
        expect(effectDeletedKeyedStoreDelete).not.toHaveBeenCalled();
        expect(effectDeletedKeyedStoreGetAll).not.toHaveBeenCalled();
        expect(effectDeletedKeyedStoreGetKeys).not.toHaveBeenCalled();
        expect(unusedUnkeyedStoreGet).not.toHaveBeenCalled();
        expect(unusedUnkeyedStoreSet).not.toHaveBeenCalled();
        expect(unusedKeyedStoreGet).not.toHaveBeenCalled();
        expect(unusedKeyedStoreSet).not.toHaveBeenCalled();
        expect(unusedKeyedStoreDelete).not.toHaveBeenCalled();
        expect(unusedKeyedStoreGetAll).not.toHaveBeenCalled();
        expect(unusedKeyedStoreGetKeys).not.toHaveBeenCalled();
        expect(writtenUnkeyedStoreGet).not.toHaveBeenCalled();
        expect(writtenUnkeyedStoreSet).not.toHaveBeenCalled();
        expect(writtenKeyedStoreGet).not.toHaveBeenCalled();
        expect(writtenKeyedStoreSet).not.toHaveBeenCalled();
        expect(writtenKeyedStoreDelete).not.toHaveBeenCalled();
        expect(writtenKeyedStoreGetAll).not.toHaveBeenCalled();
        expect(writtenKeyedStoreGetKeys).not.toHaveBeenCalled();
        expect(keyedStoreGet).not.toHaveBeenCalled();
        expect(keyedStoreSet).not.toHaveBeenCalled();
        expect(keyedStoreDelete).not.toHaveBeenCalled();
        expect(keyedStoreGetAll).not.toHaveBeenCalled();
        expect(stepEffectSetUnkeyedStoreGet).not.toHaveBeenCalled();
        expect(stepEffectSetUnkeyedStoreSet).not.toHaveBeenCalled();
        expect(stepEffectSetKeyedStoreGet).not.toHaveBeenCalled();
        expect(stepEffectSetKeyedStoreSet).not.toHaveBeenCalled();
        expect(stepEffectSetKeyedStoreDelete).not.toHaveBeenCalled();
        expect(stepEffectSetKeyedStoreGetAll).not.toHaveBeenCalled();
        expect(stepEffectSetKeyedStoreGetKeys).not.toHaveBeenCalled();
        expect(stepEffectDeletedKeyedStoreGet).not.toHaveBeenCalled();
        expect(stepEffectDeletedKeyedStoreSet).not.toHaveBeenCalled();
        expect(stepEffectDeletedKeyedStoreDelete).not.toHaveBeenCalled();
        expect(stepEffectDeletedKeyedStoreGetAll).not.toHaveBeenCalled();
        expect(stepEffectDeletedKeyedStoreGetKeys).not.toHaveBeenCalled();
      });

      it(`does not interact with any steps`, () => {
        expect(setExecutePerActionStep).not.toHaveBeenCalled();
        expect(deletedThenSetDownExecutePerActionStep).not.toHaveBeenCalled();
        expect(deletedThenSetUpExecutePerActionStep).not.toHaveBeenCalled();
        expect(deletedExecutePerActionStep).not.toHaveBeenCalled();
        expect(refreshedDownExecutePerActionStep).not.toHaveBeenCalled();
        expect(refreshedUpExecutePerActionStep).not.toHaveBeenCalled();
      });
    });

    describe(`when no full refresh occurs`, () => {
      let effectSetUnkeyedStoreGet: jasmine.Spy;
      let effectSetUnkeyedStoreSet: jasmine.Spy;
      let effectSetKeyedStoreGet: jasmine.Spy;
      let effectSetKeyedStoreSet: jasmine.Spy;
      let effectSetKeyedStoreDelete: jasmine.Spy;
      let effectSetKeyedStoreGetAll: jasmine.Spy;
      let effectSetKeyedStoreGetKeys: jasmine.Spy;
      let effectDeletedKeyedStoreGet: jasmine.Spy;
      let effectDeletedKeyedStoreSet: jasmine.Spy;
      let effectDeletedKeyedStoreDelete: jasmine.Spy;
      let effectDeletedKeyedStoreGetAll: jasmine.Spy;
      let effectDeletedKeyedStoreGetKeys: jasmine.Spy;
      let unusedUnkeyedStoreGet: jasmine.Spy;
      let unusedUnkeyedStoreSet: jasmine.Spy;
      let unusedKeyedStoreGet: jasmine.Spy;
      let unusedKeyedStoreSet: jasmine.Spy;
      let unusedKeyedStoreDelete: jasmine.Spy;
      let unusedKeyedStoreGetAll: jasmine.Spy;
      let unusedKeyedStoreGetKeys: jasmine.Spy;
      let writtenUnkeyedStoreGet: jasmine.Spy;
      let writtenUnkeyedStoreSet: jasmine.Spy;
      let writtenKeyedStoreGet: jasmine.Spy;
      let writtenKeyedStoreSet: jasmine.Spy;
      let writtenKeyedStoreDelete: jasmine.Spy;
      let writtenKeyedStoreGetAll: jasmine.Spy;
      let writtenKeyedStoreGetKeys: jasmine.Spy;
      let keyedStoreGet: jasmine.Spy;
      let keyedStoreSet: jasmine.Spy;
      let keyedStoreDelete: jasmine.Spy;
      let keyedStoreGetAll: jasmine.Spy;
      let keyedStoreGetKeys: jasmine.Spy;
      let up: jasmine.Spy;
      let down: jasmine.Spy;
      let stepEffectSetUnkeyedStoreGet: jasmine.Spy;
      let stepEffectSetUnkeyedStoreSet: jasmine.Spy;
      let stepEffectSetKeyedStoreGet: jasmine.Spy;
      let stepEffectSetKeyedStoreSet: jasmine.Spy;
      let stepEffectSetKeyedStoreDelete: jasmine.Spy;
      let stepEffectSetKeyedStoreGetAll: jasmine.Spy;
      let stepEffectSetKeyedStoreGetKeys: jasmine.Spy;
      let stepEffectDeletedKeyedStoreGet: jasmine.Spy;
      let stepEffectDeletedKeyedStoreSet: jasmine.Spy;
      let stepEffectDeletedKeyedStoreDelete: jasmine.Spy;
      let stepEffectDeletedKeyedStoreGetAll: jasmine.Spy;
      let stepEffectDeletedKeyedStoreGetKeys: jasmine.Spy;
      let setExecutePerActionStep: jasmine.Spy;
      let setStep: Step;
      let deletedThenSetDownExecutePerActionStep: jasmine.Spy;
      let deletedThenSetDownStep: Step;
      let deletedThenSetUpExecutePerActionStep: jasmine.Spy;
      let deletedThenSetUpStep: Step;
      let deletedExecutePerActionStep: jasmine.Spy;
      let deleteStep: Step;
      let result: {
        readonly unclaimedFiles: Diff<string>;
        readonly parallelSteps: ReadonlyArray<Step>;
      };

      beforeAll(async () => {
        effectSetUnkeyedStoreGet = jasmine.createSpy(
          `effectSetUnkeyedStoreGet`
        );
        effectSetUnkeyedStoreSet = jasmine.createSpy(
          `effectSetUnkeyedStoreSet`
        );
        const effectSetUnkeyedStore: UnkeyedStore<unknown> = {
          type: `unkeyedStore`,
          name: `effectSetUnkeyedStore`,
          get: effectSetUnkeyedStoreGet,
          set: effectSetUnkeyedStoreSet,
        };
        effectSetKeyedStoreGet = jasmine.createSpy(`effectSetKeyedStoreGet`);
        effectSetKeyedStoreSet = jasmine.createSpy(`effectSetKeyedStoreSet`);
        effectSetKeyedStoreDelete = jasmine.createSpy(
          `effectSetKeyedStoreDelete`
        );
        effectSetKeyedStoreGetAll = jasmine.createSpy(
          `effectSetKeyedStoreGetAll`
        );
        effectSetKeyedStoreGetKeys = jasmine.createSpy(
          `effectSetKeyedStoreGetKeys`
        );
        const effectSetKeyedStore: KeyedStore<unknown> = {
          type: `keyedStore`,
          name: `effectSetKeyedStore`,
          get: effectSetKeyedStoreGet,
          set: effectSetKeyedStoreSet,
          delete: effectSetKeyedStoreDelete,
          getAll: effectSetKeyedStoreGetAll,
          getKeys: effectSetKeyedStoreGetKeys,
        };
        effectDeletedKeyedStoreGet = jasmine.createSpy(
          `effectDeletedKeyedStoreGet`
        );
        effectDeletedKeyedStoreSet = jasmine.createSpy(
          `effectDeletedKeyedStoreSet`
        );
        effectDeletedKeyedStoreDelete = jasmine.createSpy(
          `effectDeletedKeyedStoreDelete`
        );
        effectDeletedKeyedStoreGetAll = jasmine.createSpy(
          `effectDeletedKeyedStoreGetAll`
        );
        effectDeletedKeyedStoreGetKeys = jasmine.createSpy(
          `effectDeletedKeyedStoreGetKeys`
        );
        const effectDeletedKeyedStore: KeyedStore<unknown> = {
          type: `keyedStore`,
          name: `effectDeletedKeyedStore`,
          get: effectDeletedKeyedStoreGet,
          set: effectDeletedKeyedStoreSet,
          delete: effectDeletedKeyedStoreDelete,
          getAll: effectDeletedKeyedStoreGetAll,
          getKeys: effectDeletedKeyedStoreGetKeys,
        };
        unusedUnkeyedStoreGet = jasmine.createSpy(`unusedUnkeyedStoreGet`);
        unusedUnkeyedStoreSet = jasmine.createSpy(`unusedUnkeyedStoreSet`);
        const unusedUnkeyedStore: UnkeyedStore<unknown> = {
          type: `unkeyedStore`,
          name: `unusedUnkeyedStore`,
          get: unusedUnkeyedStoreGet,
          set: unusedUnkeyedStoreSet,
        };
        unusedKeyedStoreGet = jasmine.createSpy(`unusedKeyedStoreGet`);
        unusedKeyedStoreSet = jasmine.createSpy(`unusedKeyedStoreSet`);
        unusedKeyedStoreDelete = jasmine.createSpy(`unusedKeyedStoreDelete`);
        unusedKeyedStoreGetAll = jasmine.createSpy(`unusedKeyedStoreGetAll`);
        unusedKeyedStoreGetKeys = jasmine.createSpy(`unusedKeyedStoreGetKeys`);
        const unusedKeyedStore: KeyedStore<unknown> = {
          type: `keyedStore`,
          name: `unusedKeyedStore`,
          get: unusedKeyedStoreGet,
          set: unusedKeyedStoreSet,
          delete: unusedKeyedStoreDelete,
          getAll: unusedKeyedStoreGetAll,
          getKeys: unusedKeyedStoreGetKeys,
        };
        writtenUnkeyedStoreGet = jasmine.createSpy(`writtenUnkeyedStoreGet`);
        writtenUnkeyedStoreSet = jasmine.createSpy(`writtenUnkeyedStoreSet`);
        const writtenUnkeyedStore: UnkeyedStore<unknown> = {
          type: `unkeyedStore`,
          name: `writtenUnkeyedStore`,
          get: writtenUnkeyedStoreGet,
          set: writtenUnkeyedStoreSet,
        };
        writtenKeyedStoreGet = jasmine.createSpy(`writtenKeyedStoreGet`);
        writtenKeyedStoreSet = jasmine.createSpy(`writtenKeyedStoreSet`);
        writtenKeyedStoreDelete = jasmine.createSpy(`writtenKeyedStoreDelete`);
        writtenKeyedStoreGetAll = jasmine.createSpy(`writtenKeyedStoreGetAll`);
        writtenKeyedStoreGetKeys = jasmine.createSpy(
          `writtenKeyedStoreGetKeys`
        );
        const writtenKeyedStore: KeyedStore<unknown> = {
          type: `keyedStore`,
          name: `writtenKeyedStore`,
          get: writtenKeyedStoreGet,
          set: writtenKeyedStoreSet,
          delete: writtenKeyedStoreDelete,
          getAll: writtenKeyedStoreGetAll,
          getKeys: writtenKeyedStoreGetKeys,
        };
        keyedStoreGet = jasmine.createSpy(`keyedStoreGet`);
        keyedStoreSet = jasmine.createSpy(`keyedStoreSet`);
        keyedStoreDelete = jasmine.createSpy(`keyedStoreDelete`);
        keyedStoreGetAll = jasmine.createSpy(`keyedStoreGetAll`);
        keyedStoreGetKeys = jasmine.createSpy(`keyedStoreGetKeys`);
        const keyedStore: KeyedStore<unknown> = {
          type: `keyedStore`,
          name: `keyedStore`,
          get: keyedStoreGet,
          set: keyedStoreSet,
          delete: keyedStoreDelete,
          getAll: keyedStoreGetAll,
          getKeys: keyedStoreGetKeys,
        };
        stepEffectSetUnkeyedStoreGet = jasmine.createSpy(
          `stepEffectSetUnkeyedStoreGet`
        );
        stepEffectSetUnkeyedStoreSet = jasmine.createSpy(
          `stepEffectSetUnkeyedStoreSet`
        );
        const stepEffectSetUnkeyedStore: UnkeyedStore<unknown> = {
          type: `unkeyedStore`,
          name: `stepEffectSetUnkeyedStore`,
          get: stepEffectSetUnkeyedStoreGet,
          set: stepEffectSetUnkeyedStoreSet,
        };
        stepEffectSetKeyedStoreGet = jasmine.createSpy(
          `stepEffectSetKeyedStoreGet`
        );
        stepEffectSetKeyedStoreSet = jasmine.createSpy(
          `stepEffectSetKeyedStoreSet`
        );
        stepEffectSetKeyedStoreDelete = jasmine.createSpy(
          `stepEffectSetKeyedStoreDelete`
        );
        stepEffectSetKeyedStoreGetAll = jasmine.createSpy(
          `stepEffectSetKeyedStoreGetAll`
        );
        stepEffectSetKeyedStoreGetKeys = jasmine.createSpy(
          `stepEffectSetKeyedStoreGetKeys`
        );
        const stepEffectSetKeyedStore: KeyedStore<unknown> = {
          type: `keyedStore`,
          name: `stepEffectSetKeyedStore`,
          get: stepEffectSetKeyedStoreGet,
          set: stepEffectSetKeyedStoreSet,
          delete: stepEffectSetKeyedStoreDelete,
          getAll: stepEffectSetKeyedStoreGetAll,
          getKeys: stepEffectSetKeyedStoreGetKeys,
        };
        stepEffectDeletedKeyedStoreGet = jasmine.createSpy(
          `stepEffectDeletedKeyedStoreGet`
        );
        stepEffectDeletedKeyedStoreSet = jasmine.createSpy(
          `stepEffectDeletedKeyedStoreSet`
        );
        stepEffectDeletedKeyedStoreDelete = jasmine.createSpy(
          `stepEffectDeletedKeyedStoreDelete`
        );
        stepEffectDeletedKeyedStoreGetAll = jasmine.createSpy(
          `stepEffectDeletedKeyedStoreGetAll`
        );
        stepEffectDeletedKeyedStoreGetKeys = jasmine.createSpy(
          `stepEffectDeletedKeyedStoreGetKeys`
        );
        const stepEffectDeletedKeyedStore: KeyedStore<unknown> = {
          type: `keyedStore`,
          name: `stepEffectDeletedKeyedStore`,
          get: stepEffectDeletedKeyedStoreGet,
          set: stepEffectDeletedKeyedStoreSet,
          delete: stepEffectDeletedKeyedStoreDelete,
          getAll: stepEffectDeletedKeyedStoreGetAll,
          getKeys: stepEffectDeletedKeyedStoreGetKeys,
        };
        setExecutePerActionStep = jasmine.createSpy(`setExecutePerActionStep`);
        setStep = {
          name: `setStep`,
          executePerActionStep: setExecutePerActionStep,
          effects: [
            {
              type: `unkeyedStoreSet`,
              unkeyedStore: stepEffectSetUnkeyedStore,
            },
            {
              type: `keyedStoreSet`,
              keyedStore: stepEffectSetKeyedStore,
              key: `Test Set Key`,
            },
            {
              type: `keyedStoreDelete`,
              keyedStore: stepEffectDeletedKeyedStore,
              key: `Test Deleted Key`,
            },
          ],
        };
        deletedThenSetDownExecutePerActionStep = jasmine.createSpy(
          `deletedThenSetDownExecutePerActionStep`
        );
        deletedThenSetDownStep = {
          name: `deletedThenSetDownStep`,
          executePerActionStep: deletedThenSetDownExecutePerActionStep,
          effects: [
            {
              type: `unkeyedStoreSet`,
              unkeyedStore: stepEffectSetUnkeyedStore,
            },
            {
              type: `keyedStoreSet`,
              keyedStore: stepEffectSetKeyedStore,
              key: `Test Set Key`,
            },
            {
              type: `keyedStoreDelete`,
              keyedStore: stepEffectDeletedKeyedStore,
              key: `Test Deleted Key`,
            },
          ],
        };
        deletedThenSetUpExecutePerActionStep = jasmine.createSpy(
          `deletedThenSetUpExecutePerActionStep`
        );
        deletedThenSetUpStep = {
          name: `deletedThenSetUpStep`,
          executePerActionStep: deletedThenSetUpExecutePerActionStep,
          effects: [
            {
              type: `unkeyedStoreSet`,
              unkeyedStore: stepEffectSetUnkeyedStore,
            },
            {
              type: `keyedStoreSet`,
              keyedStore: stepEffectSetKeyedStore,
              key: `Test Set Key`,
            },
            {
              type: `keyedStoreDelete`,
              keyedStore: stepEffectDeletedKeyedStore,
              key: `Test Deleted Key`,
            },
          ],
        };
        deletedExecutePerActionStep = jasmine.createSpy(
          `deletedExecutePerActionStep`
        );
        deleteStep = {
          name: `deleteStep`,
          executePerActionStep: deletedExecutePerActionStep,
          effects: [
            {
              type: `unkeyedStoreSet`,
              unkeyedStore: stepEffectSetUnkeyedStore,
            },
            {
              type: `keyedStoreSet`,
              keyedStore: stepEffectSetKeyedStore,
              key: `Test Set Key`,
            },
            {
              type: `keyedStoreDelete`,
              keyedStore: stepEffectDeletedKeyedStore,
              key: `Test Deleted Key`,
            },
          ],
        };
        up = jasmine.createSpy(`up`).and.callFake((path) => {
          switch (path) {
            case `Test Set Key`:
              return setStep;

            case `Test Deleted Then Set Key`:
              return deletedThenSetUpStep;

            default:
              fail(`Unexpected up key "${path}".`);
              return null;
          }
        });
        down = jasmine.createSpy(`down`).and.callFake((path) => {
          switch (path) {
            case `Test Deleted Then Set Key`:
              return deletedThenSetDownStep;

            case `Test Deleted Key`:
              return deleteStep;

            default:
              fail(`Unexpected down key "${path}".`);
              return null;
          }
        });

        result = await generateParallelStepsForTrigger(
          {
            added: [
              `Test Added Path A`,
              `Test Added Path B`,
              `Test Added Path C`,
            ],
            changed: [`Test Changed Path A`, `Test Changed Path B`],
            unchanged: [
              `Test Unchanged Path A`,
              `Test Unchanged Path B`,
              `Test Unchanged Path C`,
              `Test Unchanged Path D`,
              `Test Unchanged Path E`,
            ],
            deleted: [
              `Test Deleted Path A`,
              `Test Deleted Path B`,
              `Test Deleted Path C`,
            ],
          },
          [
            {
              type: `unkeyedStoreSet`,
              unkeyedStore: effectSetUnkeyedStore,
            },
            {
              type: `keyedStoreSet`,
              keyedStore: effectSetKeyedStore,
              key: `Test Set Key`,
            },
            {
              type: `keyedStoreDelete`,
              keyedStore,
              key: `Test Deleted Key`,
            },
            {
              type: `keyedStoreDelete`,
              keyedStore,
              key: `Test Deleted Then Set Key`,
            },
            {
              type: `keyedStoreSet`,
              keyedStore,
              key: `Test Deleted Then Set Key`,
            },
            {
              type: `keyedStoreSet`,
              keyedStore,
              key: `Test Set Key`,
            },
            {
              type: `keyedStoreDelete`,
              keyedStore: effectDeletedKeyedStore,
              key: `Test Deleted Key`,
            },
          ],
          {
            type: `keyedStore`,
            keyedStore,
            refreshAllWhenStoresChange: [unusedUnkeyedStore, unusedKeyedStore],
            up,
            down,
            writesToStores: [writtenUnkeyedStore, writtenKeyedStore],
          }
        );
      });

      it(`creates an up step for set keys`, () => {
        expect(up).toHaveBeenCalledWith(`Test Set Key`);
      });

      it(`creates an up step for deleted then set keys`, () => {
        expect(up).toHaveBeenCalledWith(`Test Deleted Then Set Key`);
      });

      it(`creates no further up steps`, () => {
        expect(up).toHaveBeenCalledTimes(2);
      });

      it(`creates a down step for deleted then set keys`, () => {
        expect(down).toHaveBeenCalledWith(`Test Deleted Then Set Key`);
      });

      it(`creates a down step for deleted keys`, () => {
        expect(down).toHaveBeenCalledWith(`Test Deleted Key`);
      });

      it(`creates no further down steps`, () => {
        expect(down).toHaveBeenCalledTimes(2);
      });

      it(`returns the created steps`, () => {
        expect(result.parallelSteps).toEqual(
          jasmine.arrayWithExactContents([
            setStep,
            new SerialStep(`Test Deleted Then Set Key`, [
              deletedThenSetDownStep,
              deletedThenSetUpStep,
            ]),
            deleteStep,
          ])
        );
      });

      it(`returns the given unclaimed files`, () => {
        expect(result.unclaimedFiles).toEqual({
          added: [
            `Test Added Path A`,
            `Test Added Path B`,
            `Test Added Path C`,
          ],
          changed: [`Test Changed Path A`, `Test Changed Path B`],
          unchanged: [
            `Test Unchanged Path A`,
            `Test Unchanged Path B`,
            `Test Unchanged Path C`,
            `Test Unchanged Path D`,
            `Test Unchanged Path E`,
          ],
          deleted: [
            `Test Deleted Path A`,
            `Test Deleted Path B`,
            `Test Deleted Path C`,
          ],
        });
      });

      it(`does not interact with any stores`, () => {
        expect(effectSetUnkeyedStoreGet).not.toHaveBeenCalled();
        expect(effectSetUnkeyedStoreSet).not.toHaveBeenCalled();
        expect(effectSetKeyedStoreGet).not.toHaveBeenCalled();
        expect(effectSetKeyedStoreSet).not.toHaveBeenCalled();
        expect(effectSetKeyedStoreDelete).not.toHaveBeenCalled();
        expect(effectSetKeyedStoreGetAll).not.toHaveBeenCalled();
        expect(effectSetKeyedStoreGetKeys).not.toHaveBeenCalled();
        expect(effectDeletedKeyedStoreGet).not.toHaveBeenCalled();
        expect(effectDeletedKeyedStoreSet).not.toHaveBeenCalled();
        expect(effectDeletedKeyedStoreDelete).not.toHaveBeenCalled();
        expect(effectDeletedKeyedStoreGetAll).not.toHaveBeenCalled();
        expect(effectDeletedKeyedStoreGetKeys).not.toHaveBeenCalled();
        expect(unusedUnkeyedStoreGet).not.toHaveBeenCalled();
        expect(unusedUnkeyedStoreSet).not.toHaveBeenCalled();
        expect(unusedKeyedStoreGet).not.toHaveBeenCalled();
        expect(unusedKeyedStoreSet).not.toHaveBeenCalled();
        expect(unusedKeyedStoreDelete).not.toHaveBeenCalled();
        expect(unusedKeyedStoreGetAll).not.toHaveBeenCalled();
        expect(unusedKeyedStoreGetKeys).not.toHaveBeenCalled();
        expect(writtenUnkeyedStoreGet).not.toHaveBeenCalled();
        expect(writtenUnkeyedStoreSet).not.toHaveBeenCalled();
        expect(writtenKeyedStoreGet).not.toHaveBeenCalled();
        expect(writtenKeyedStoreSet).not.toHaveBeenCalled();
        expect(writtenKeyedStoreDelete).not.toHaveBeenCalled();
        expect(writtenKeyedStoreGetAll).not.toHaveBeenCalled();
        expect(writtenKeyedStoreGetKeys).not.toHaveBeenCalled();
        expect(keyedStoreGet).not.toHaveBeenCalled();
        expect(keyedStoreSet).not.toHaveBeenCalled();
        expect(keyedStoreDelete).not.toHaveBeenCalled();
        expect(keyedStoreGetAll).not.toHaveBeenCalled();
        expect(keyedStoreGetKeys).not.toHaveBeenCalled();
        expect(stepEffectSetUnkeyedStoreGet).not.toHaveBeenCalled();
        expect(stepEffectSetUnkeyedStoreSet).not.toHaveBeenCalled();
        expect(stepEffectSetKeyedStoreGet).not.toHaveBeenCalled();
        expect(stepEffectSetKeyedStoreSet).not.toHaveBeenCalled();
        expect(stepEffectSetKeyedStoreDelete).not.toHaveBeenCalled();
        expect(stepEffectSetKeyedStoreGetAll).not.toHaveBeenCalled();
        expect(stepEffectSetKeyedStoreGetKeys).not.toHaveBeenCalled();
        expect(stepEffectDeletedKeyedStoreGet).not.toHaveBeenCalled();
        expect(stepEffectDeletedKeyedStoreSet).not.toHaveBeenCalled();
        expect(stepEffectDeletedKeyedStoreDelete).not.toHaveBeenCalled();
        expect(stepEffectDeletedKeyedStoreGetAll).not.toHaveBeenCalled();
        expect(stepEffectDeletedKeyedStoreGetKeys).not.toHaveBeenCalled();
      });

      it(`does not interact with any steps`, () => {
        expect(setExecutePerActionStep).not.toHaveBeenCalled();
        expect(deletedThenSetDownExecutePerActionStep).not.toHaveBeenCalled();
        expect(deletedThenSetUpExecutePerActionStep).not.toHaveBeenCalled();
        expect(deletedExecutePerActionStep).not.toHaveBeenCalled();
      });
    });
  });

  describe(`store aggregate`, () => {
    describe(`when stores are set and deleted`, () => {
      let effectSetUnkeyedStoreGet: jasmine.Spy;
      let effectSetUnkeyedStoreSet: jasmine.Spy;
      let effectSetKeyedStoreGet: jasmine.Spy;
      let effectSetKeyedStoreSet: jasmine.Spy;
      let effectSetKeyedStoreDelete: jasmine.Spy;
      let effectSetKeyedStoreGetAll: jasmine.Spy;
      let effectSetKeyedStoreGetKeys: jasmine.Spy;
      let effectDeletedKeyedStoreGet: jasmine.Spy;
      let effectDeletedKeyedStoreSet: jasmine.Spy;
      let effectDeletedKeyedStoreDelete: jasmine.Spy;
      let effectDeletedKeyedStoreGetAll: jasmine.Spy;
      let effectDeletedKeyedStoreGetKeys: jasmine.Spy;
      let writtenUnkeyedStoreGet: jasmine.Spy;
      let writtenUnkeyedStoreSet: jasmine.Spy;
      let writtenKeyedStoreGet: jasmine.Spy;
      let writtenKeyedStoreSet: jasmine.Spy;
      let writtenKeyedStoreDelete: jasmine.Spy;
      let writtenKeyedStoreGetAll: jasmine.Spy;
      let writtenKeyedStoreGetKeys: jasmine.Spy;
      let invalidated: jasmine.Spy;
      let stepExecutePerActionStep: jasmine.Spy;
      let stepEffectSetUnkeyedStoreGet: jasmine.Spy;
      let stepEffectSetUnkeyedStoreSet: jasmine.Spy;
      let stepEffectSetKeyedStoreGet: jasmine.Spy;
      let stepEffectSetKeyedStoreSet: jasmine.Spy;
      let stepEffectSetKeyedStoreDelete: jasmine.Spy;
      let stepEffectSetKeyedStoreGetAll: jasmine.Spy;
      let stepEffectSetKeyedStoreGetKeys: jasmine.Spy;
      let stepEffectDeletedKeyedStoreGet: jasmine.Spy;
      let stepEffectDeletedKeyedStoreSet: jasmine.Spy;
      let stepEffectDeletedKeyedStoreDelete: jasmine.Spy;
      let stepEffectDeletedKeyedStoreGetAll: jasmine.Spy;
      let stepEffectDeletedKeyedStoreGetKeys: jasmine.Spy;
      let step: Step;
      let result: {
        readonly unclaimedFiles: Diff<string>;
        readonly parallelSteps: ReadonlyArray<Step>;
      };

      beforeAll(async () => {
        effectSetUnkeyedStoreGet = jasmine.createSpy(
          `effectSetUnkeyedStoreGet`
        );
        effectSetUnkeyedStoreSet = jasmine.createSpy(
          `effectSetUnkeyedStoreSet`
        );
        const effectSetUnkeyedStore: UnkeyedStore<unknown> = {
          type: `unkeyedStore`,
          name: `effectSetUnkeyedStore`,
          get: effectSetUnkeyedStoreGet,
          set: effectSetUnkeyedStoreSet,
        };
        effectSetKeyedStoreGet = jasmine.createSpy(`effectSetKeyedStoreGet`);
        effectSetKeyedStoreSet = jasmine.createSpy(`effectSetKeyedStoreSet`);
        effectSetKeyedStoreDelete = jasmine.createSpy(
          `effectSetKeyedStoreDelete`
        );
        effectSetKeyedStoreGetAll = jasmine.createSpy(
          `effectSetKeyedStoreGetAll`
        );
        effectSetKeyedStoreGetKeys = jasmine.createSpy(
          `effectSetKeyedStoreGetKeys`
        );
        const effectSetKeyedStore: KeyedStore<unknown> = {
          type: `keyedStore`,
          name: `effectSetKeyedStore`,
          get: effectSetKeyedStoreGet,
          set: effectSetKeyedStoreSet,
          delete: effectSetKeyedStoreDelete,
          getAll: effectSetKeyedStoreGetAll,
          getKeys: effectSetKeyedStoreGetKeys,
        };
        effectDeletedKeyedStoreGet = jasmine.createSpy(
          `effectDeletedKeyedStoreGet`
        );
        effectDeletedKeyedStoreSet = jasmine.createSpy(
          `effectDeletedKeyedStoreSet`
        );
        effectDeletedKeyedStoreDelete = jasmine.createSpy(
          `effectDeletedKeyedStoreDelete`
        );
        effectDeletedKeyedStoreGetAll = jasmine.createSpy(
          `effectDeletedKeyedStoreGetAll`
        );
        effectDeletedKeyedStoreGetKeys = jasmine.createSpy(
          `effectDeletedKeyedStoreGetKeys`
        );
        const effectDeletedKeyedStore: KeyedStore<unknown> = {
          type: `keyedStore`,
          name: `effectDeletedKeyedStore`,
          get: effectDeletedKeyedStoreGet,
          set: effectDeletedKeyedStoreSet,
          delete: effectDeletedKeyedStoreDelete,
          getAll: effectDeletedKeyedStoreGetAll,
          getKeys: effectDeletedKeyedStoreGetKeys,
        };
        writtenUnkeyedStoreGet = jasmine.createSpy(`writtenUnkeyedStoreGet`);
        writtenUnkeyedStoreSet = jasmine.createSpy(`writtenUnkeyedStoreSet`);
        const writtenUnkeyedStore: UnkeyedStore<unknown> = {
          type: `unkeyedStore`,
          name: `writtenUnkeyedStore`,
          get: writtenUnkeyedStoreGet,
          set: writtenUnkeyedStoreSet,
        };
        writtenKeyedStoreGet = jasmine.createSpy(`writtenKeyedStoreGet`);
        writtenKeyedStoreSet = jasmine.createSpy(`writtenKeyedStoreSet`);
        writtenKeyedStoreDelete = jasmine.createSpy(`writtenKeyedStoreDelete`);
        writtenKeyedStoreGetAll = jasmine.createSpy(`writtenKeyedStoreGetAll`);
        writtenKeyedStoreGetKeys = jasmine.createSpy(
          `writtenKeyedStoreGetKeys`
        );
        const writtenKeyedStore: KeyedStore<unknown> = {
          type: `keyedStore`,
          name: `writtenKeyedStore`,
          get: writtenKeyedStoreGet,
          set: writtenKeyedStoreSet,
          delete: writtenKeyedStoreDelete,
          getAll: writtenKeyedStoreGetAll,
          getKeys: writtenKeyedStoreGetKeys,
        };
        stepExecutePerActionStep = jasmine.createSpy(
          `stepExecutePerActionStep`
        );
        stepEffectSetUnkeyedStoreGet = jasmine.createSpy(
          `stepEffectSetUnkeyedStoreGet`
        );
        stepEffectSetUnkeyedStoreSet = jasmine.createSpy(
          `stepEffectSetUnkeyedStoreSet`
        );
        const stepEffectSetUnkeyedStore: UnkeyedStore<unknown> = {
          type: `unkeyedStore`,
          name: `stepEffectSetUnkeyedStore`,
          get: stepEffectSetUnkeyedStoreGet,
          set: stepEffectSetUnkeyedStoreSet,
        };
        stepEffectSetKeyedStoreGet = jasmine.createSpy(
          `stepEffectSetKeyedStoreGet`
        );
        stepEffectSetKeyedStoreSet = jasmine.createSpy(
          `stepEffectSetKeyedStoreSet`
        );
        stepEffectSetKeyedStoreDelete = jasmine.createSpy(
          `stepEffectSetKeyedStoreDelete`
        );
        stepEffectSetKeyedStoreGetAll = jasmine.createSpy(
          `stepEffectSetKeyedStoreGetAll`
        );
        stepEffectSetKeyedStoreGetKeys = jasmine.createSpy(
          `stepEffectSetKeyedStoreGetKeys`
        );
        const stepEffectSetKeyedStore: KeyedStore<unknown> = {
          type: `keyedStore`,
          name: `stepEffectSetKeyedStore`,
          get: stepEffectSetKeyedStoreGet,
          set: stepEffectSetKeyedStoreSet,
          delete: stepEffectSetKeyedStoreDelete,
          getAll: stepEffectSetKeyedStoreGetAll,
          getKeys: stepEffectSetKeyedStoreGetKeys,
        };
        stepEffectDeletedKeyedStoreGet = jasmine.createSpy(
          `stepEffectDeletedKeyedStoreGet`
        );
        stepEffectDeletedKeyedStoreSet = jasmine.createSpy(
          `stepEffectDeletedKeyedStoreSet`
        );
        stepEffectDeletedKeyedStoreDelete = jasmine.createSpy(
          `stepEffectDeletedKeyedStoreDelete`
        );
        stepEffectDeletedKeyedStoreGetAll = jasmine.createSpy(
          `stepEffectDeletedKeyedStoreGetAll`
        );
        stepEffectDeletedKeyedStoreGetKeys = jasmine.createSpy(
          `stepEffectDeletedKeyedStoreGetKeys`
        );
        const stepEffectDeletedKeyedStore: KeyedStore<unknown> = {
          type: `keyedStore`,
          name: `stepEffectDeletedKeyedStore`,
          get: stepEffectDeletedKeyedStoreGet,
          set: stepEffectDeletedKeyedStoreSet,
          delete: stepEffectDeletedKeyedStoreDelete,
          getAll: stepEffectDeletedKeyedStoreGetAll,
          getKeys: stepEffectDeletedKeyedStoreGetKeys,
        };
        step = {
          name: `step`,
          executePerActionStep: stepExecutePerActionStep,
          effects: [
            {
              type: `unkeyedStoreSet`,
              unkeyedStore: stepEffectSetUnkeyedStore,
            },
            {
              type: `keyedStoreSet`,
              keyedStore: stepEffectSetKeyedStore,
              key: `Test Set Key`,
            },
            {
              type: `keyedStoreDelete`,
              keyedStore: stepEffectDeletedKeyedStore,
              key: `Test Deleted Key`,
            },
          ],
        };
        invalidated = jasmine.createSpy(`invalidated`).and.returnValue(step);

        result = await generateParallelStepsForTrigger(
          {
            added: [
              `Test Added Path A`,
              `Test Added Path B`,
              `Test Added Path C`,
            ],
            changed: [`Test Changed Path A`, `Test Changed Path B`],
            unchanged: [
              `Test Unchanged Path A`,
              `Test Unchanged Path B`,
              `Test Unchanged Path C`,
              `Test Unchanged Path D`,
              `Test Unchanged Path E`,
            ],
            deleted: [
              `Test Deleted Path A`,
              `Test Deleted Path B`,
              `Test Deleted Path C`,
            ],
          },
          [
            {
              type: `unkeyedStoreSet`,
              unkeyedStore: effectSetUnkeyedStore,
            },
            {
              type: `keyedStoreSet`,
              keyedStore: effectSetKeyedStore,
              key: `Test Set Key`,
            },
            {
              type: `keyedStoreDelete`,
              keyedStore: effectDeletedKeyedStore,
              key: `Test Deleted Key`,
            },
          ],
          {
            type: `storeAggregate`,
            invalidated,
            stores: [
              effectSetUnkeyedStore,
              effectSetKeyedStore,
              effectDeletedKeyedStore,
            ],
            writesToStores: [writtenUnkeyedStore, writtenKeyedStore],
          }
        );
      });

      it(`creates one step`, () => {
        expect(invalidated).toHaveBeenCalledTimes(1);
      });

      it(`returns the created step`, () => {
        expect(result.parallelSteps).toEqual([step]);
      });

      it(`returns the given unclaimed files`, () => {
        expect(result.unclaimedFiles).toEqual({
          added: [
            `Test Added Path A`,
            `Test Added Path B`,
            `Test Added Path C`,
          ],
          changed: [`Test Changed Path A`, `Test Changed Path B`],
          unchanged: [
            `Test Unchanged Path A`,
            `Test Unchanged Path B`,
            `Test Unchanged Path C`,
            `Test Unchanged Path D`,
            `Test Unchanged Path E`,
          ],
          deleted: [
            `Test Deleted Path A`,
            `Test Deleted Path B`,
            `Test Deleted Path C`,
          ],
        });
      });

      it(`does not interact with any stores`, () => {
        expect(effectSetUnkeyedStoreGet).not.toHaveBeenCalled();
        expect(effectSetUnkeyedStoreSet).not.toHaveBeenCalled();
        expect(effectSetKeyedStoreGet).not.toHaveBeenCalled();
        expect(effectSetKeyedStoreSet).not.toHaveBeenCalled();
        expect(effectSetKeyedStoreDelete).not.toHaveBeenCalled();
        expect(effectSetKeyedStoreGetAll).not.toHaveBeenCalled();
        expect(effectSetKeyedStoreGetKeys).not.toHaveBeenCalled();
        expect(effectDeletedKeyedStoreGet).not.toHaveBeenCalled();
        expect(effectDeletedKeyedStoreSet).not.toHaveBeenCalled();
        expect(effectDeletedKeyedStoreDelete).not.toHaveBeenCalled();
        expect(effectDeletedKeyedStoreGetAll).not.toHaveBeenCalled();
        expect(effectDeletedKeyedStoreGetKeys).not.toHaveBeenCalled();
        expect(writtenUnkeyedStoreGet).not.toHaveBeenCalled();
        expect(writtenUnkeyedStoreSet).not.toHaveBeenCalled();
        expect(writtenKeyedStoreGet).not.toHaveBeenCalled();
        expect(writtenKeyedStoreSet).not.toHaveBeenCalled();
        expect(writtenKeyedStoreDelete).not.toHaveBeenCalled();
        expect(writtenKeyedStoreGetAll).not.toHaveBeenCalled();
        expect(writtenKeyedStoreGetKeys).not.toHaveBeenCalled();
        expect(stepEffectSetUnkeyedStoreGet).not.toHaveBeenCalled();
        expect(stepEffectSetUnkeyedStoreSet).not.toHaveBeenCalled();
        expect(stepEffectSetKeyedStoreGet).not.toHaveBeenCalled();
        expect(stepEffectSetKeyedStoreSet).not.toHaveBeenCalled();
        expect(stepEffectSetKeyedStoreDelete).not.toHaveBeenCalled();
        expect(stepEffectSetKeyedStoreGetAll).not.toHaveBeenCalled();
        expect(stepEffectSetKeyedStoreGetKeys).not.toHaveBeenCalled();
        expect(stepEffectDeletedKeyedStoreGet).not.toHaveBeenCalled();
        expect(stepEffectDeletedKeyedStoreSet).not.toHaveBeenCalled();
        expect(stepEffectDeletedKeyedStoreDelete).not.toHaveBeenCalled();
        expect(stepEffectDeletedKeyedStoreGetAll).not.toHaveBeenCalled();
        expect(stepEffectDeletedKeyedStoreGetKeys).not.toHaveBeenCalled();
      });

      it(`does not interact with any steps`, () => {
        expect(stepExecutePerActionStep).not.toHaveBeenCalled();
      });
    });

    describe(`when an unkeyed store is set`, () => {
      let effectSetUnkeyedStoreGet: jasmine.Spy;
      let effectSetUnkeyedStoreSet: jasmine.Spy;
      let effectSetKeyedStoreGet: jasmine.Spy;
      let effectSetKeyedStoreSet: jasmine.Spy;
      let effectSetKeyedStoreDelete: jasmine.Spy;
      let effectSetKeyedStoreGetAll: jasmine.Spy;
      let effectSetKeyedStoreGetKeys: jasmine.Spy;
      let effectDeletedKeyedStoreGet: jasmine.Spy;
      let effectDeletedKeyedStoreSet: jasmine.Spy;
      let effectDeletedKeyedStoreDelete: jasmine.Spy;
      let effectDeletedKeyedStoreGetAll: jasmine.Spy;
      let effectDeletedKeyedStoreGetKeys: jasmine.Spy;
      let unusedUnkeyedStoreGet: jasmine.Spy;
      let unusedUnkeyedStoreSet: jasmine.Spy;
      let unusedKeyedStoreGet: jasmine.Spy;
      let unusedKeyedStoreSet: jasmine.Spy;
      let unusedKeyedStoreDelete: jasmine.Spy;
      let unusedKeyedStoreGetAll: jasmine.Spy;
      let unusedKeyedStoreGetKeys: jasmine.Spy;
      let writtenUnkeyedStoreGet: jasmine.Spy;
      let writtenUnkeyedStoreSet: jasmine.Spy;
      let writtenKeyedStoreGet: jasmine.Spy;
      let writtenKeyedStoreSet: jasmine.Spy;
      let writtenKeyedStoreDelete: jasmine.Spy;
      let writtenKeyedStoreGetAll: jasmine.Spy;
      let writtenKeyedStoreGetKeys: jasmine.Spy;
      let invalidated: jasmine.Spy;
      let stepExecutePerActionStep: jasmine.Spy;
      let stepEffectSetUnkeyedStoreGet: jasmine.Spy;
      let stepEffectSetUnkeyedStoreSet: jasmine.Spy;
      let stepEffectSetKeyedStoreGet: jasmine.Spy;
      let stepEffectSetKeyedStoreSet: jasmine.Spy;
      let stepEffectSetKeyedStoreDelete: jasmine.Spy;
      let stepEffectSetKeyedStoreGetAll: jasmine.Spy;
      let stepEffectSetKeyedStoreGetKeys: jasmine.Spy;
      let stepEffectDeletedKeyedStoreGet: jasmine.Spy;
      let stepEffectDeletedKeyedStoreSet: jasmine.Spy;
      let stepEffectDeletedKeyedStoreDelete: jasmine.Spy;
      let stepEffectDeletedKeyedStoreGetAll: jasmine.Spy;
      let stepEffectDeletedKeyedStoreGetKeys: jasmine.Spy;
      let step: Step;
      let result: {
        readonly unclaimedFiles: Diff<string>;
        readonly parallelSteps: ReadonlyArray<Step>;
      };

      beforeAll(async () => {
        effectSetUnkeyedStoreGet = jasmine.createSpy(
          `effectSetUnkeyedStoreGet`
        );
        effectSetUnkeyedStoreSet = jasmine.createSpy(
          `effectSetUnkeyedStoreSet`
        );
        const effectSetUnkeyedStore: UnkeyedStore<unknown> = {
          type: `unkeyedStore`,
          name: `effectSetUnkeyedStore`,
          get: effectSetUnkeyedStoreGet,
          set: effectSetUnkeyedStoreSet,
        };
        effectSetKeyedStoreGet = jasmine.createSpy(`effectSetKeyedStoreGet`);
        effectSetKeyedStoreSet = jasmine.createSpy(`effectSetKeyedStoreSet`);
        effectSetKeyedStoreDelete = jasmine.createSpy(
          `effectSetKeyedStoreDelete`
        );
        effectSetKeyedStoreGetAll = jasmine.createSpy(
          `effectSetKeyedStoreGetAll`
        );
        effectSetKeyedStoreGetKeys = jasmine.createSpy(
          `effectSetKeyedStoreGetKeys`
        );
        const effectSetKeyedStore: KeyedStore<unknown> = {
          type: `keyedStore`,
          name: `effectSetKeyedStore`,
          get: effectSetKeyedStoreGet,
          set: effectSetKeyedStoreSet,
          delete: effectSetKeyedStoreDelete,
          getAll: effectSetKeyedStoreGetAll,
          getKeys: effectSetKeyedStoreGetKeys,
        };
        effectDeletedKeyedStoreGet = jasmine.createSpy(
          `effectDeletedKeyedStoreGet`
        );
        effectDeletedKeyedStoreSet = jasmine.createSpy(
          `effectDeletedKeyedStoreSet`
        );
        effectDeletedKeyedStoreDelete = jasmine.createSpy(
          `effectDeletedKeyedStoreDelete`
        );
        effectDeletedKeyedStoreGetAll = jasmine.createSpy(
          `effectDeletedKeyedStoreGetAll`
        );
        effectDeletedKeyedStoreGetKeys = jasmine.createSpy(
          `effectDeletedKeyedStoreGetKeys`
        );
        const effectDeletedKeyedStore: KeyedStore<unknown> = {
          type: `keyedStore`,
          name: `effectDeletedKeyedStore`,
          get: effectDeletedKeyedStoreGet,
          set: effectDeletedKeyedStoreSet,
          delete: effectDeletedKeyedStoreDelete,
          getAll: effectDeletedKeyedStoreGetAll,
          getKeys: effectDeletedKeyedStoreGetKeys,
        };
        unusedUnkeyedStoreGet = jasmine.createSpy(`unusedUnkeyedStoreGet`);
        unusedUnkeyedStoreSet = jasmine.createSpy(`unusedUnkeyedStoreSet`);
        const unusedUnkeyedStore: UnkeyedStore<unknown> = {
          type: `unkeyedStore`,
          name: `unusedUnkeyedStore`,
          get: unusedUnkeyedStoreGet,
          set: unusedUnkeyedStoreSet,
        };
        unusedKeyedStoreGet = jasmine.createSpy(`unusedKeyedStoreGet`);
        unusedKeyedStoreSet = jasmine.createSpy(`unusedKeyedStoreSet`);
        unusedKeyedStoreDelete = jasmine.createSpy(`unusedKeyedStoreDelete`);
        unusedKeyedStoreGetAll = jasmine.createSpy(`unusedKeyedStoreGetAll`);
        unusedKeyedStoreGetKeys = jasmine.createSpy(`unusedKeyedStoreGetKeys`);
        const unusedKeyedStore: KeyedStore<unknown> = {
          type: `keyedStore`,
          name: `unusedKeyedStore`,
          get: unusedKeyedStoreGet,
          set: unusedKeyedStoreSet,
          delete: unusedKeyedStoreDelete,
          getAll: unusedKeyedStoreGetAll,
          getKeys: unusedKeyedStoreGetKeys,
        };
        writtenUnkeyedStoreGet = jasmine.createSpy(`writtenUnkeyedStoreGet`);
        writtenUnkeyedStoreSet = jasmine.createSpy(`writtenUnkeyedStoreSet`);
        const writtenUnkeyedStore: UnkeyedStore<unknown> = {
          type: `unkeyedStore`,
          name: `writtenUnkeyedStore`,
          get: writtenUnkeyedStoreGet,
          set: writtenUnkeyedStoreSet,
        };
        writtenKeyedStoreGet = jasmine.createSpy(`writtenKeyedStoreGet`);
        writtenKeyedStoreSet = jasmine.createSpy(`writtenKeyedStoreSet`);
        writtenKeyedStoreDelete = jasmine.createSpy(`writtenKeyedStoreDelete`);
        writtenKeyedStoreGetAll = jasmine.createSpy(`writtenKeyedStoreGetAll`);
        writtenKeyedStoreGetKeys = jasmine.createSpy(
          `writtenKeyedStoreGetKeys`
        );
        const writtenKeyedStore: KeyedStore<unknown> = {
          type: `keyedStore`,
          name: `writtenKeyedStore`,
          get: writtenKeyedStoreGet,
          set: writtenKeyedStoreSet,
          delete: writtenKeyedStoreDelete,
          getAll: writtenKeyedStoreGetAll,
          getKeys: writtenKeyedStoreGetKeys,
        };
        stepExecutePerActionStep = jasmine.createSpy(
          `stepExecutePerActionStep`
        );
        stepEffectSetUnkeyedStoreGet = jasmine.createSpy(
          `stepEffectSetUnkeyedStoreGet`
        );
        stepEffectSetUnkeyedStoreSet = jasmine.createSpy(
          `stepEffectSetUnkeyedStoreSet`
        );
        const stepEffectSetUnkeyedStore: UnkeyedStore<unknown> = {
          type: `unkeyedStore`,
          name: `stepEffectSetUnkeyedStore`,
          get: stepEffectSetUnkeyedStoreGet,
          set: stepEffectSetUnkeyedStoreSet,
        };
        stepEffectSetKeyedStoreGet = jasmine.createSpy(
          `stepEffectSetKeyedStoreGet`
        );
        stepEffectSetKeyedStoreSet = jasmine.createSpy(
          `stepEffectSetKeyedStoreSet`
        );
        stepEffectSetKeyedStoreDelete = jasmine.createSpy(
          `stepEffectSetKeyedStoreDelete`
        );
        stepEffectSetKeyedStoreGetAll = jasmine.createSpy(
          `stepEffectSetKeyedStoreGetAll`
        );
        stepEffectSetKeyedStoreGetKeys = jasmine.createSpy(
          `stepEffectSetKeyedStoreGetKeys`
        );
        const stepEffectSetKeyedStore: KeyedStore<unknown> = {
          type: `keyedStore`,
          name: `stepEffectSetKeyedStore`,
          get: stepEffectSetKeyedStoreGet,
          set: stepEffectSetKeyedStoreSet,
          delete: stepEffectSetKeyedStoreDelete,
          getAll: stepEffectSetKeyedStoreGetAll,
          getKeys: stepEffectSetKeyedStoreGetKeys,
        };
        stepEffectDeletedKeyedStoreGet = jasmine.createSpy(
          `stepEffectDeletedKeyedStoreGet`
        );
        stepEffectDeletedKeyedStoreSet = jasmine.createSpy(
          `stepEffectDeletedKeyedStoreSet`
        );
        stepEffectDeletedKeyedStoreDelete = jasmine.createSpy(
          `stepEffectDeletedKeyedStoreDelete`
        );
        stepEffectDeletedKeyedStoreGetAll = jasmine.createSpy(
          `stepEffectDeletedKeyedStoreGetAll`
        );
        stepEffectDeletedKeyedStoreGetKeys = jasmine.createSpy(
          `stepEffectDeletedKeyedStoreGetKeys`
        );
        const stepEffectDeletedKeyedStore: KeyedStore<unknown> = {
          type: `keyedStore`,
          name: `stepEffectDeletedKeyedStore`,
          get: stepEffectDeletedKeyedStoreGet,
          set: stepEffectDeletedKeyedStoreSet,
          delete: stepEffectDeletedKeyedStoreDelete,
          getAll: stepEffectDeletedKeyedStoreGetAll,
          getKeys: stepEffectDeletedKeyedStoreGetKeys,
        };
        step = {
          name: `step`,
          executePerActionStep: stepExecutePerActionStep,
          effects: [
            {
              type: `unkeyedStoreSet`,
              unkeyedStore: stepEffectSetUnkeyedStore,
            },
            {
              type: `keyedStoreSet`,
              keyedStore: stepEffectSetKeyedStore,
              key: `Test Set Key`,
            },
            {
              type: `keyedStoreDelete`,
              keyedStore: stepEffectDeletedKeyedStore,
              key: `Test Deleted Key`,
            },
          ],
        };
        invalidated = jasmine.createSpy(`invalidated`).and.returnValue(step);

        result = await generateParallelStepsForTrigger(
          {
            added: [
              `Test Added Path A`,
              `Test Added Path B`,
              `Test Added Path C`,
            ],
            changed: [`Test Changed Path A`, `Test Changed Path B`],
            unchanged: [
              `Test Unchanged Path A`,
              `Test Unchanged Path B`,
              `Test Unchanged Path C`,
              `Test Unchanged Path D`,
              `Test Unchanged Path E`,
            ],
            deleted: [
              `Test Deleted Path A`,
              `Test Deleted Path B`,
              `Test Deleted Path C`,
            ],
          },
          [
            {
              type: `unkeyedStoreSet`,
              unkeyedStore: effectSetUnkeyedStore,
            },
            {
              type: `keyedStoreSet`,
              keyedStore: effectSetKeyedStore,
              key: `Test Set Key`,
            },
            {
              type: `keyedStoreDelete`,
              keyedStore: effectDeletedKeyedStore,
              key: `Test Deleted Key`,
            },
          ],
          {
            type: `storeAggregate`,
            invalidated,
            stores: [
              unusedUnkeyedStore,
              effectSetUnkeyedStore,
              unusedKeyedStore,
            ],
            writesToStores: [writtenUnkeyedStore, writtenKeyedStore],
          }
        );
      });

      it(`creates one step`, () => {
        expect(invalidated).toHaveBeenCalledTimes(1);
      });

      it(`returns the created step`, () => {
        expect(result.parallelSteps).toEqual([step]);
      });

      it(`returns the given unclaimed files`, () => {
        expect(result.unclaimedFiles).toEqual({
          added: [
            `Test Added Path A`,
            `Test Added Path B`,
            `Test Added Path C`,
          ],
          changed: [`Test Changed Path A`, `Test Changed Path B`],
          unchanged: [
            `Test Unchanged Path A`,
            `Test Unchanged Path B`,
            `Test Unchanged Path C`,
            `Test Unchanged Path D`,
            `Test Unchanged Path E`,
          ],
          deleted: [
            `Test Deleted Path A`,
            `Test Deleted Path B`,
            `Test Deleted Path C`,
          ],
        });
      });

      it(`does not interact with any stores`, () => {
        expect(effectSetUnkeyedStoreGet).not.toHaveBeenCalled();
        expect(effectSetUnkeyedStoreSet).not.toHaveBeenCalled();
        expect(effectSetKeyedStoreGet).not.toHaveBeenCalled();
        expect(effectSetKeyedStoreSet).not.toHaveBeenCalled();
        expect(effectSetKeyedStoreDelete).not.toHaveBeenCalled();
        expect(effectSetKeyedStoreGetAll).not.toHaveBeenCalled();
        expect(effectSetKeyedStoreGetKeys).not.toHaveBeenCalled();
        expect(effectDeletedKeyedStoreGet).not.toHaveBeenCalled();
        expect(effectDeletedKeyedStoreSet).not.toHaveBeenCalled();
        expect(effectDeletedKeyedStoreDelete).not.toHaveBeenCalled();
        expect(effectDeletedKeyedStoreGetAll).not.toHaveBeenCalled();
        expect(effectDeletedKeyedStoreGetKeys).not.toHaveBeenCalled();
        expect(unusedUnkeyedStoreGet).not.toHaveBeenCalled();
        expect(unusedUnkeyedStoreSet).not.toHaveBeenCalled();
        expect(unusedKeyedStoreGet).not.toHaveBeenCalled();
        expect(unusedKeyedStoreSet).not.toHaveBeenCalled();
        expect(unusedKeyedStoreDelete).not.toHaveBeenCalled();
        expect(unusedKeyedStoreGetAll).not.toHaveBeenCalled();
        expect(unusedKeyedStoreGetKeys).not.toHaveBeenCalled();
        expect(writtenUnkeyedStoreGet).not.toHaveBeenCalled();
        expect(writtenUnkeyedStoreSet).not.toHaveBeenCalled();
        expect(writtenKeyedStoreGet).not.toHaveBeenCalled();
        expect(writtenKeyedStoreSet).not.toHaveBeenCalled();
        expect(writtenKeyedStoreDelete).not.toHaveBeenCalled();
        expect(writtenKeyedStoreGetAll).not.toHaveBeenCalled();
        expect(writtenKeyedStoreGetKeys).not.toHaveBeenCalled();
        expect(stepEffectSetUnkeyedStoreGet).not.toHaveBeenCalled();
        expect(stepEffectSetUnkeyedStoreSet).not.toHaveBeenCalled();
        expect(stepEffectSetKeyedStoreGet).not.toHaveBeenCalled();
        expect(stepEffectSetKeyedStoreSet).not.toHaveBeenCalled();
        expect(stepEffectSetKeyedStoreDelete).not.toHaveBeenCalled();
        expect(stepEffectSetKeyedStoreGetAll).not.toHaveBeenCalled();
        expect(stepEffectSetKeyedStoreGetKeys).not.toHaveBeenCalled();
        expect(stepEffectDeletedKeyedStoreGet).not.toHaveBeenCalled();
        expect(stepEffectDeletedKeyedStoreSet).not.toHaveBeenCalled();
        expect(stepEffectDeletedKeyedStoreDelete).not.toHaveBeenCalled();
        expect(stepEffectDeletedKeyedStoreGetAll).not.toHaveBeenCalled();
        expect(stepEffectDeletedKeyedStoreGetKeys).not.toHaveBeenCalled();
      });

      it(`does not interact with any steps`, () => {
        expect(stepExecutePerActionStep).not.toHaveBeenCalled();
      });
    });

    describe(`when a keyed store is set`, () => {
      let effectSetUnkeyedStoreGet: jasmine.Spy;
      let effectSetUnkeyedStoreSet: jasmine.Spy;
      let effectSetKeyedStoreGet: jasmine.Spy;
      let effectSetKeyedStoreSet: jasmine.Spy;
      let effectSetKeyedStoreDelete: jasmine.Spy;
      let effectSetKeyedStoreGetAll: jasmine.Spy;
      let effectSetKeyedStoreGetKeys: jasmine.Spy;
      let effectDeletedKeyedStoreGet: jasmine.Spy;
      let effectDeletedKeyedStoreSet: jasmine.Spy;
      let effectDeletedKeyedStoreDelete: jasmine.Spy;
      let effectDeletedKeyedStoreGetAll: jasmine.Spy;
      let effectDeletedKeyedStoreGetKeys: jasmine.Spy;
      let unusedUnkeyedStoreGet: jasmine.Spy;
      let unusedUnkeyedStoreSet: jasmine.Spy;
      let unusedKeyedStoreGet: jasmine.Spy;
      let unusedKeyedStoreSet: jasmine.Spy;
      let unusedKeyedStoreDelete: jasmine.Spy;
      let unusedKeyedStoreGetAll: jasmine.Spy;
      let unusedKeyedStoreGetKeys: jasmine.Spy;
      let writtenUnkeyedStoreGet: jasmine.Spy;
      let writtenUnkeyedStoreSet: jasmine.Spy;
      let writtenKeyedStoreGet: jasmine.Spy;
      let writtenKeyedStoreSet: jasmine.Spy;
      let writtenKeyedStoreDelete: jasmine.Spy;
      let writtenKeyedStoreGetAll: jasmine.Spy;
      let writtenKeyedStoreGetKeys: jasmine.Spy;
      let invalidated: jasmine.Spy;
      let stepExecutePerActionStep: jasmine.Spy;
      let stepEffectSetUnkeyedStoreGet: jasmine.Spy;
      let stepEffectSetUnkeyedStoreSet: jasmine.Spy;
      let stepEffectSetKeyedStoreGet: jasmine.Spy;
      let stepEffectSetKeyedStoreSet: jasmine.Spy;
      let stepEffectSetKeyedStoreDelete: jasmine.Spy;
      let stepEffectSetKeyedStoreGetAll: jasmine.Spy;
      let stepEffectSetKeyedStoreGetKeys: jasmine.Spy;
      let stepEffectDeletedKeyedStoreGet: jasmine.Spy;
      let stepEffectDeletedKeyedStoreSet: jasmine.Spy;
      let stepEffectDeletedKeyedStoreDelete: jasmine.Spy;
      let stepEffectDeletedKeyedStoreGetAll: jasmine.Spy;
      let stepEffectDeletedKeyedStoreGetKeys: jasmine.Spy;
      let step: Step;
      let result: {
        readonly unclaimedFiles: Diff<string>;
        readonly parallelSteps: ReadonlyArray<Step>;
      };

      beforeAll(async () => {
        effectSetUnkeyedStoreGet = jasmine.createSpy(
          `effectSetUnkeyedStoreGet`
        );
        effectSetUnkeyedStoreSet = jasmine.createSpy(
          `effectSetUnkeyedStoreSet`
        );
        const effectSetUnkeyedStore: UnkeyedStore<unknown> = {
          type: `unkeyedStore`,
          name: `effectSetUnkeyedStore`,
          get: effectSetUnkeyedStoreGet,
          set: effectSetUnkeyedStoreSet,
        };
        effectSetKeyedStoreGet = jasmine.createSpy(`effectSetKeyedStoreGet`);
        effectSetKeyedStoreSet = jasmine.createSpy(`effectSetKeyedStoreSet`);
        effectSetKeyedStoreDelete = jasmine.createSpy(
          `effectSetKeyedStoreDelete`
        );
        effectSetKeyedStoreGetAll = jasmine.createSpy(
          `effectSetKeyedStoreGetAll`
        );
        effectSetKeyedStoreGetKeys = jasmine.createSpy(
          `effectSetKeyedStoreGetKeys`
        );
        const effectSetKeyedStore: KeyedStore<unknown> = {
          type: `keyedStore`,
          name: `effectSetKeyedStore`,
          get: effectSetKeyedStoreGet,
          set: effectSetKeyedStoreSet,
          delete: effectSetKeyedStoreDelete,
          getAll: effectSetKeyedStoreGetAll,
          getKeys: effectSetKeyedStoreGetKeys,
        };
        effectDeletedKeyedStoreGet = jasmine.createSpy(
          `effectDeletedKeyedStoreGet`
        );
        effectDeletedKeyedStoreSet = jasmine.createSpy(
          `effectDeletedKeyedStoreSet`
        );
        effectDeletedKeyedStoreDelete = jasmine.createSpy(
          `effectDeletedKeyedStoreDelete`
        );
        effectDeletedKeyedStoreGetAll = jasmine.createSpy(
          `effectDeletedKeyedStoreGetAll`
        );
        effectDeletedKeyedStoreGetKeys = jasmine.createSpy(
          `effectDeletedKeyedStoreGetKeys`
        );
        const effectDeletedKeyedStore: KeyedStore<unknown> = {
          type: `keyedStore`,
          name: `effectDeletedKeyedStore`,
          get: effectDeletedKeyedStoreGet,
          set: effectDeletedKeyedStoreSet,
          delete: effectDeletedKeyedStoreDelete,
          getAll: effectDeletedKeyedStoreGetAll,
          getKeys: effectDeletedKeyedStoreGetKeys,
        };
        unusedUnkeyedStoreGet = jasmine.createSpy(`unusedUnkeyedStoreGet`);
        unusedUnkeyedStoreSet = jasmine.createSpy(`unusedUnkeyedStoreSet`);
        const unusedUnkeyedStore: UnkeyedStore<unknown> = {
          type: `unkeyedStore`,
          name: `unusedUnkeyedStore`,
          get: unusedUnkeyedStoreGet,
          set: unusedUnkeyedStoreSet,
        };
        unusedKeyedStoreGet = jasmine.createSpy(`unusedKeyedStoreGet`);
        unusedKeyedStoreSet = jasmine.createSpy(`unusedKeyedStoreSet`);
        unusedKeyedStoreDelete = jasmine.createSpy(`unusedKeyedStoreDelete`);
        unusedKeyedStoreGetAll = jasmine.createSpy(`unusedKeyedStoreGetAll`);
        unusedKeyedStoreGetKeys = jasmine.createSpy(`unusedKeyedStoreGetKeys`);
        const unusedKeyedStore: KeyedStore<unknown> = {
          type: `keyedStore`,
          name: `unusedKeyedStore`,
          get: unusedKeyedStoreGet,
          set: unusedKeyedStoreSet,
          delete: unusedKeyedStoreDelete,
          getAll: unusedKeyedStoreGetAll,
          getKeys: unusedKeyedStoreGetKeys,
        };
        writtenUnkeyedStoreGet = jasmine.createSpy(`writtenUnkeyedStoreGet`);
        writtenUnkeyedStoreSet = jasmine.createSpy(`writtenUnkeyedStoreSet`);
        const writtenUnkeyedStore: UnkeyedStore<unknown> = {
          type: `unkeyedStore`,
          name: `writtenUnkeyedStore`,
          get: writtenUnkeyedStoreGet,
          set: writtenUnkeyedStoreSet,
        };
        writtenKeyedStoreGet = jasmine.createSpy(`writtenKeyedStoreGet`);
        writtenKeyedStoreSet = jasmine.createSpy(`writtenKeyedStoreSet`);
        writtenKeyedStoreDelete = jasmine.createSpy(`writtenKeyedStoreDelete`);
        writtenKeyedStoreGetAll = jasmine.createSpy(`writtenKeyedStoreGetAll`);
        writtenKeyedStoreGetKeys = jasmine.createSpy(
          `writtenKeyedStoreGetKeys`
        );
        const writtenKeyedStore: KeyedStore<unknown> = {
          type: `keyedStore`,
          name: `writtenKeyedStore`,
          get: writtenKeyedStoreGet,
          set: writtenKeyedStoreSet,
          delete: writtenKeyedStoreDelete,
          getAll: writtenKeyedStoreGetAll,
          getKeys: writtenKeyedStoreGetKeys,
        };
        stepExecutePerActionStep = jasmine.createSpy(
          `stepExecutePerActionStep`
        );
        stepEffectSetUnkeyedStoreGet = jasmine.createSpy(
          `stepEffectSetUnkeyedStoreGet`
        );
        stepEffectSetUnkeyedStoreSet = jasmine.createSpy(
          `stepEffectSetUnkeyedStoreSet`
        );
        const stepEffectSetUnkeyedStore: UnkeyedStore<unknown> = {
          type: `unkeyedStore`,
          name: `stepEffectSetUnkeyedStore`,
          get: stepEffectSetUnkeyedStoreGet,
          set: stepEffectSetUnkeyedStoreSet,
        };
        stepEffectSetKeyedStoreGet = jasmine.createSpy(
          `stepEffectSetKeyedStoreGet`
        );
        stepEffectSetKeyedStoreSet = jasmine.createSpy(
          `stepEffectSetKeyedStoreSet`
        );
        stepEffectSetKeyedStoreDelete = jasmine.createSpy(
          `stepEffectSetKeyedStoreDelete`
        );
        stepEffectSetKeyedStoreGetAll = jasmine.createSpy(
          `stepEffectSetKeyedStoreGetAll`
        );
        stepEffectSetKeyedStoreGetKeys = jasmine.createSpy(
          `stepEffectSetKeyedStoreGetKeys`
        );
        const stepEffectSetKeyedStore: KeyedStore<unknown> = {
          type: `keyedStore`,
          name: `stepEffectSetKeyedStore`,
          get: stepEffectSetKeyedStoreGet,
          set: stepEffectSetKeyedStoreSet,
          delete: stepEffectSetKeyedStoreDelete,
          getAll: stepEffectSetKeyedStoreGetAll,
          getKeys: stepEffectSetKeyedStoreGetKeys,
        };
        stepEffectDeletedKeyedStoreGet = jasmine.createSpy(
          `stepEffectDeletedKeyedStoreGet`
        );
        stepEffectDeletedKeyedStoreSet = jasmine.createSpy(
          `stepEffectDeletedKeyedStoreSet`
        );
        stepEffectDeletedKeyedStoreDelete = jasmine.createSpy(
          `stepEffectDeletedKeyedStoreDelete`
        );
        stepEffectDeletedKeyedStoreGetAll = jasmine.createSpy(
          `stepEffectDeletedKeyedStoreGetAll`
        );
        stepEffectDeletedKeyedStoreGetKeys = jasmine.createSpy(
          `stepEffectDeletedKeyedStoreGetKeys`
        );
        const stepEffectDeletedKeyedStore: KeyedStore<unknown> = {
          type: `keyedStore`,
          name: `stepEffectDeletedKeyedStore`,
          get: stepEffectDeletedKeyedStoreGet,
          set: stepEffectDeletedKeyedStoreSet,
          delete: stepEffectDeletedKeyedStoreDelete,
          getAll: stepEffectDeletedKeyedStoreGetAll,
          getKeys: stepEffectDeletedKeyedStoreGetKeys,
        };
        step = {
          name: `step`,
          executePerActionStep: stepExecutePerActionStep,
          effects: [
            {
              type: `unkeyedStoreSet`,
              unkeyedStore: stepEffectSetUnkeyedStore,
            },
            {
              type: `keyedStoreSet`,
              keyedStore: stepEffectSetKeyedStore,
              key: `Test Set Key`,
            },
            {
              type: `keyedStoreDelete`,
              keyedStore: stepEffectDeletedKeyedStore,
              key: `Test Deleted Key`,
            },
          ],
        };
        invalidated = jasmine.createSpy(`invalidated`).and.returnValue(step);

        result = await generateParallelStepsForTrigger(
          {
            added: [
              `Test Added Path A`,
              `Test Added Path B`,
              `Test Added Path C`,
            ],
            changed: [`Test Changed Path A`, `Test Changed Path B`],
            unchanged: [
              `Test Unchanged Path A`,
              `Test Unchanged Path B`,
              `Test Unchanged Path C`,
              `Test Unchanged Path D`,
              `Test Unchanged Path E`,
            ],
            deleted: [
              `Test Deleted Path A`,
              `Test Deleted Path B`,
              `Test Deleted Path C`,
            ],
          },
          [
            {
              type: `unkeyedStoreSet`,
              unkeyedStore: effectSetUnkeyedStore,
            },
            {
              type: `keyedStoreSet`,
              keyedStore: effectSetKeyedStore,
              key: `Test Set Key`,
            },
            {
              type: `keyedStoreDelete`,
              keyedStore: effectDeletedKeyedStore,
              key: `Test Deleted Key`,
            },
          ],
          {
            type: `storeAggregate`,
            invalidated,
            stores: [unusedUnkeyedStore, effectSetKeyedStore, unusedKeyedStore],
            writesToStores: [writtenUnkeyedStore, writtenKeyedStore],
          }
        );
      });

      it(`creates one step`, () => {
        expect(invalidated).toHaveBeenCalledTimes(1);
      });

      it(`returns the created step`, () => {
        expect(result.parallelSteps).toEqual([step]);
      });

      it(`returns the given unclaimed files`, () => {
        expect(result.unclaimedFiles).toEqual({
          added: [
            `Test Added Path A`,
            `Test Added Path B`,
            `Test Added Path C`,
          ],
          changed: [`Test Changed Path A`, `Test Changed Path B`],
          unchanged: [
            `Test Unchanged Path A`,
            `Test Unchanged Path B`,
            `Test Unchanged Path C`,
            `Test Unchanged Path D`,
            `Test Unchanged Path E`,
          ],
          deleted: [
            `Test Deleted Path A`,
            `Test Deleted Path B`,
            `Test Deleted Path C`,
          ],
        });
      });

      it(`does not interact with any stores`, () => {
        expect(effectSetUnkeyedStoreGet).not.toHaveBeenCalled();
        expect(effectSetUnkeyedStoreSet).not.toHaveBeenCalled();
        expect(effectSetKeyedStoreGet).not.toHaveBeenCalled();
        expect(effectSetKeyedStoreSet).not.toHaveBeenCalled();
        expect(effectSetKeyedStoreDelete).not.toHaveBeenCalled();
        expect(effectSetKeyedStoreGetAll).not.toHaveBeenCalled();
        expect(effectSetKeyedStoreGetKeys).not.toHaveBeenCalled();
        expect(effectDeletedKeyedStoreGet).not.toHaveBeenCalled();
        expect(effectDeletedKeyedStoreSet).not.toHaveBeenCalled();
        expect(effectDeletedKeyedStoreDelete).not.toHaveBeenCalled();
        expect(effectDeletedKeyedStoreGetAll).not.toHaveBeenCalled();
        expect(effectDeletedKeyedStoreGetKeys).not.toHaveBeenCalled();
        expect(unusedUnkeyedStoreGet).not.toHaveBeenCalled();
        expect(unusedUnkeyedStoreSet).not.toHaveBeenCalled();
        expect(unusedKeyedStoreGet).not.toHaveBeenCalled();
        expect(unusedKeyedStoreSet).not.toHaveBeenCalled();
        expect(unusedKeyedStoreDelete).not.toHaveBeenCalled();
        expect(unusedKeyedStoreGetAll).not.toHaveBeenCalled();
        expect(unusedKeyedStoreGetKeys).not.toHaveBeenCalled();
        expect(writtenUnkeyedStoreGet).not.toHaveBeenCalled();
        expect(writtenUnkeyedStoreSet).not.toHaveBeenCalled();
        expect(writtenKeyedStoreGet).not.toHaveBeenCalled();
        expect(writtenKeyedStoreSet).not.toHaveBeenCalled();
        expect(writtenKeyedStoreDelete).not.toHaveBeenCalled();
        expect(writtenKeyedStoreGetAll).not.toHaveBeenCalled();
        expect(writtenKeyedStoreGetKeys).not.toHaveBeenCalled();
        expect(stepEffectSetUnkeyedStoreGet).not.toHaveBeenCalled();
        expect(stepEffectSetUnkeyedStoreSet).not.toHaveBeenCalled();
        expect(stepEffectSetKeyedStoreGet).not.toHaveBeenCalled();
        expect(stepEffectSetKeyedStoreSet).not.toHaveBeenCalled();
        expect(stepEffectSetKeyedStoreDelete).not.toHaveBeenCalled();
        expect(stepEffectSetKeyedStoreGetAll).not.toHaveBeenCalled();
        expect(stepEffectSetKeyedStoreGetKeys).not.toHaveBeenCalled();
        expect(stepEffectDeletedKeyedStoreGet).not.toHaveBeenCalled();
        expect(stepEffectDeletedKeyedStoreSet).not.toHaveBeenCalled();
        expect(stepEffectDeletedKeyedStoreDelete).not.toHaveBeenCalled();
        expect(stepEffectDeletedKeyedStoreGetAll).not.toHaveBeenCalled();
        expect(stepEffectDeletedKeyedStoreGetKeys).not.toHaveBeenCalled();
      });

      it(`does not interact with any steps`, () => {
        expect(stepExecutePerActionStep).not.toHaveBeenCalled();
      });
    });

    describe(`when a keyed store is deleted`, () => {
      let effectSetUnkeyedStoreGet: jasmine.Spy;
      let effectSetUnkeyedStoreSet: jasmine.Spy;
      let effectSetKeyedStoreGet: jasmine.Spy;
      let effectSetKeyedStoreSet: jasmine.Spy;
      let effectSetKeyedStoreDelete: jasmine.Spy;
      let effectSetKeyedStoreGetAll: jasmine.Spy;
      let effectSetKeyedStoreGetKeys: jasmine.Spy;
      let effectDeletedKeyedStoreGet: jasmine.Spy;
      let effectDeletedKeyedStoreSet: jasmine.Spy;
      let effectDeletedKeyedStoreDelete: jasmine.Spy;
      let effectDeletedKeyedStoreGetAll: jasmine.Spy;
      let effectDeletedKeyedStoreGetKeys: jasmine.Spy;
      let unusedUnkeyedStoreGet: jasmine.Spy;
      let unusedUnkeyedStoreSet: jasmine.Spy;
      let unusedKeyedStoreGet: jasmine.Spy;
      let unusedKeyedStoreSet: jasmine.Spy;
      let unusedKeyedStoreDelete: jasmine.Spy;
      let unusedKeyedStoreGetAll: jasmine.Spy;
      let unusedKeyedStoreGetKeys: jasmine.Spy;
      let writtenUnkeyedStoreGet: jasmine.Spy;
      let writtenUnkeyedStoreSet: jasmine.Spy;
      let writtenKeyedStoreGet: jasmine.Spy;
      let writtenKeyedStoreSet: jasmine.Spy;
      let writtenKeyedStoreDelete: jasmine.Spy;
      let writtenKeyedStoreGetAll: jasmine.Spy;
      let writtenKeyedStoreGetKeys: jasmine.Spy;
      let invalidated: jasmine.Spy;
      let stepExecutePerActionStep: jasmine.Spy;
      let stepEffectSetUnkeyedStoreGet: jasmine.Spy;
      let stepEffectSetUnkeyedStoreSet: jasmine.Spy;
      let stepEffectSetKeyedStoreGet: jasmine.Spy;
      let stepEffectSetKeyedStoreSet: jasmine.Spy;
      let stepEffectSetKeyedStoreDelete: jasmine.Spy;
      let stepEffectSetKeyedStoreGetAll: jasmine.Spy;
      let stepEffectSetKeyedStoreGetKeys: jasmine.Spy;
      let stepEffectDeletedKeyedStoreGet: jasmine.Spy;
      let stepEffectDeletedKeyedStoreSet: jasmine.Spy;
      let stepEffectDeletedKeyedStoreDelete: jasmine.Spy;
      let stepEffectDeletedKeyedStoreGetAll: jasmine.Spy;
      let stepEffectDeletedKeyedStoreGetKeys: jasmine.Spy;
      let step: Step;
      let result: {
        readonly unclaimedFiles: Diff<string>;
        readonly parallelSteps: ReadonlyArray<Step>;
      };

      beforeAll(async () => {
        effectSetUnkeyedStoreGet = jasmine.createSpy(
          `effectSetUnkeyedStoreGet`
        );
        effectSetUnkeyedStoreSet = jasmine.createSpy(
          `effectSetUnkeyedStoreSet`
        );
        const effectSetUnkeyedStore: UnkeyedStore<unknown> = {
          type: `unkeyedStore`,
          name: `effectSetUnkeyedStore`,
          get: effectSetUnkeyedStoreGet,
          set: effectSetUnkeyedStoreSet,
        };
        effectSetKeyedStoreGet = jasmine.createSpy(`effectSetKeyedStoreGet`);
        effectSetKeyedStoreSet = jasmine.createSpy(`effectSetKeyedStoreSet`);
        effectSetKeyedStoreDelete = jasmine.createSpy(
          `effectSetKeyedStoreDelete`
        );
        effectSetKeyedStoreGetAll = jasmine.createSpy(
          `effectSetKeyedStoreGetAll`
        );
        effectSetKeyedStoreGetKeys = jasmine.createSpy(
          `effectSetKeyedStoreGetKeys`
        );
        const effectSetKeyedStore: KeyedStore<unknown> = {
          type: `keyedStore`,
          name: `effectSetKeyedStore`,
          get: effectSetKeyedStoreGet,
          set: effectSetKeyedStoreSet,
          delete: effectSetKeyedStoreDelete,
          getAll: effectSetKeyedStoreGetAll,
          getKeys: effectSetKeyedStoreGetKeys,
        };
        effectDeletedKeyedStoreGet = jasmine.createSpy(
          `effectDeletedKeyedStoreGet`
        );
        effectDeletedKeyedStoreSet = jasmine.createSpy(
          `effectDeletedKeyedStoreSet`
        );
        effectDeletedKeyedStoreDelete = jasmine.createSpy(
          `effectDeletedKeyedStoreDelete`
        );
        effectDeletedKeyedStoreGetAll = jasmine.createSpy(
          `effectDeletedKeyedStoreGetAll`
        );
        effectDeletedKeyedStoreGetKeys = jasmine.createSpy(
          `effectDeletedKeyedStoreGetKeys`
        );
        const effectDeletedKeyedStore: KeyedStore<unknown> = {
          type: `keyedStore`,
          name: `effectDeletedKeyedStore`,
          get: effectDeletedKeyedStoreGet,
          set: effectDeletedKeyedStoreSet,
          delete: effectDeletedKeyedStoreDelete,
          getAll: effectDeletedKeyedStoreGetAll,
          getKeys: effectDeletedKeyedStoreGetKeys,
        };
        unusedUnkeyedStoreGet = jasmine.createSpy(`unusedUnkeyedStoreGet`);
        unusedUnkeyedStoreSet = jasmine.createSpy(`unusedUnkeyedStoreSet`);
        const unusedUnkeyedStore: UnkeyedStore<unknown> = {
          type: `unkeyedStore`,
          name: `unusedUnkeyedStore`,
          get: unusedUnkeyedStoreGet,
          set: unusedUnkeyedStoreSet,
        };
        unusedKeyedStoreGet = jasmine.createSpy(`unusedKeyedStoreGet`);
        unusedKeyedStoreSet = jasmine.createSpy(`unusedKeyedStoreSet`);
        unusedKeyedStoreDelete = jasmine.createSpy(`unusedKeyedStoreDelete`);
        unusedKeyedStoreGetAll = jasmine.createSpy(`unusedKeyedStoreGetAll`);
        unusedKeyedStoreGetKeys = jasmine.createSpy(`unusedKeyedStoreGetKeys`);
        const unusedKeyedStore: KeyedStore<unknown> = {
          type: `keyedStore`,
          name: `unusedKeyedStore`,
          get: unusedKeyedStoreGet,
          set: unusedKeyedStoreSet,
          delete: unusedKeyedStoreDelete,
          getAll: unusedKeyedStoreGetAll,
          getKeys: unusedKeyedStoreGetKeys,
        };
        writtenUnkeyedStoreGet = jasmine.createSpy(`writtenUnkeyedStoreGet`);
        writtenUnkeyedStoreSet = jasmine.createSpy(`writtenUnkeyedStoreSet`);
        const writtenUnkeyedStore: UnkeyedStore<unknown> = {
          type: `unkeyedStore`,
          name: `writtenUnkeyedStore`,
          get: writtenUnkeyedStoreGet,
          set: writtenUnkeyedStoreSet,
        };
        writtenKeyedStoreGet = jasmine.createSpy(`writtenKeyedStoreGet`);
        writtenKeyedStoreSet = jasmine.createSpy(`writtenKeyedStoreSet`);
        writtenKeyedStoreDelete = jasmine.createSpy(`writtenKeyedStoreDelete`);
        writtenKeyedStoreGetAll = jasmine.createSpy(`writtenKeyedStoreGetAll`);
        writtenKeyedStoreGetKeys = jasmine.createSpy(
          `writtenKeyedStoreGetKeys`
        );
        const writtenKeyedStore: KeyedStore<unknown> = {
          type: `keyedStore`,
          name: `writtenKeyedStore`,
          get: writtenKeyedStoreGet,
          set: writtenKeyedStoreSet,
          delete: writtenKeyedStoreDelete,
          getAll: writtenKeyedStoreGetAll,
          getKeys: writtenKeyedStoreGetKeys,
        };
        stepExecutePerActionStep = jasmine.createSpy(
          `stepExecutePerActionStep`
        );
        stepEffectSetUnkeyedStoreGet = jasmine.createSpy(
          `stepEffectSetUnkeyedStoreGet`
        );
        stepEffectSetUnkeyedStoreSet = jasmine.createSpy(
          `stepEffectSetUnkeyedStoreSet`
        );
        const stepEffectSetUnkeyedStore: UnkeyedStore<unknown> = {
          type: `unkeyedStore`,
          name: `stepEffectSetUnkeyedStore`,
          get: stepEffectSetUnkeyedStoreGet,
          set: stepEffectSetUnkeyedStoreSet,
        };
        stepEffectSetKeyedStoreGet = jasmine.createSpy(
          `stepEffectSetKeyedStoreGet`
        );
        stepEffectSetKeyedStoreSet = jasmine.createSpy(
          `stepEffectSetKeyedStoreSet`
        );
        stepEffectSetKeyedStoreDelete = jasmine.createSpy(
          `stepEffectSetKeyedStoreDelete`
        );
        stepEffectSetKeyedStoreGetAll = jasmine.createSpy(
          `stepEffectSetKeyedStoreGetAll`
        );
        stepEffectSetKeyedStoreGetKeys = jasmine.createSpy(
          `stepEffectSetKeyedStoreGetKeys`
        );
        const stepEffectSetKeyedStore: KeyedStore<unknown> = {
          type: `keyedStore`,
          name: `stepEffectSetKeyedStore`,
          get: stepEffectSetKeyedStoreGet,
          set: stepEffectSetKeyedStoreSet,
          delete: stepEffectSetKeyedStoreDelete,
          getAll: stepEffectSetKeyedStoreGetAll,
          getKeys: stepEffectSetKeyedStoreGetKeys,
        };
        stepEffectDeletedKeyedStoreGet = jasmine.createSpy(
          `stepEffectDeletedKeyedStoreGet`
        );
        stepEffectDeletedKeyedStoreSet = jasmine.createSpy(
          `stepEffectDeletedKeyedStoreSet`
        );
        stepEffectDeletedKeyedStoreDelete = jasmine.createSpy(
          `stepEffectDeletedKeyedStoreDelete`
        );
        stepEffectDeletedKeyedStoreGetAll = jasmine.createSpy(
          `stepEffectDeletedKeyedStoreGetAll`
        );
        stepEffectDeletedKeyedStoreGetKeys = jasmine.createSpy(
          `stepEffectDeletedKeyedStoreGetKeys`
        );
        const stepEffectDeletedKeyedStore: KeyedStore<unknown> = {
          type: `keyedStore`,
          name: `stepEffectDeletedKeyedStore`,
          get: stepEffectDeletedKeyedStoreGet,
          set: stepEffectDeletedKeyedStoreSet,
          delete: stepEffectDeletedKeyedStoreDelete,
          getAll: stepEffectDeletedKeyedStoreGetAll,
          getKeys: stepEffectDeletedKeyedStoreGetKeys,
        };
        step = {
          name: `step`,
          executePerActionStep: stepExecutePerActionStep,
          effects: [
            {
              type: `unkeyedStoreSet`,
              unkeyedStore: stepEffectSetUnkeyedStore,
            },
            {
              type: `keyedStoreSet`,
              keyedStore: stepEffectSetKeyedStore,
              key: `Test Set Key`,
            },
            {
              type: `keyedStoreDelete`,
              keyedStore: stepEffectDeletedKeyedStore,
              key: `Test Deleted Key`,
            },
          ],
        };
        invalidated = jasmine.createSpy(`invalidated`).and.returnValue(step);

        result = await generateParallelStepsForTrigger(
          {
            added: [
              `Test Added Path A`,
              `Test Added Path B`,
              `Test Added Path C`,
            ],
            changed: [`Test Changed Path A`, `Test Changed Path B`],
            unchanged: [
              `Test Unchanged Path A`,
              `Test Unchanged Path B`,
              `Test Unchanged Path C`,
              `Test Unchanged Path D`,
              `Test Unchanged Path E`,
            ],
            deleted: [
              `Test Deleted Path A`,
              `Test Deleted Path B`,
              `Test Deleted Path C`,
            ],
          },
          [
            {
              type: `unkeyedStoreSet`,
              unkeyedStore: effectSetUnkeyedStore,
            },
            {
              type: `keyedStoreSet`,
              keyedStore: effectSetKeyedStore,
              key: `Test Set Key`,
            },
            {
              type: `keyedStoreDelete`,
              keyedStore: effectDeletedKeyedStore,
              key: `Test Deleted Key`,
            },
          ],
          {
            type: `storeAggregate`,
            invalidated,
            stores: [
              unusedUnkeyedStore,
              effectDeletedKeyedStore,
              unusedKeyedStore,
            ],
            writesToStores: [writtenUnkeyedStore, writtenKeyedStore],
          }
        );
      });

      it(`creates one step`, () => {
        expect(invalidated).toHaveBeenCalledTimes(1);
      });

      it(`returns the created step`, () => {
        expect(result.parallelSteps).toEqual([step]);
      });

      it(`returns the given unclaimed files`, () => {
        expect(result.unclaimedFiles).toEqual({
          added: [
            `Test Added Path A`,
            `Test Added Path B`,
            `Test Added Path C`,
          ],
          changed: [`Test Changed Path A`, `Test Changed Path B`],
          unchanged: [
            `Test Unchanged Path A`,
            `Test Unchanged Path B`,
            `Test Unchanged Path C`,
            `Test Unchanged Path D`,
            `Test Unchanged Path E`,
          ],
          deleted: [
            `Test Deleted Path A`,
            `Test Deleted Path B`,
            `Test Deleted Path C`,
          ],
        });
      });

      it(`does not interact with any stores`, () => {
        expect(effectSetUnkeyedStoreGet).not.toHaveBeenCalled();
        expect(effectSetUnkeyedStoreSet).not.toHaveBeenCalled();
        expect(effectSetKeyedStoreGet).not.toHaveBeenCalled();
        expect(effectSetKeyedStoreSet).not.toHaveBeenCalled();
        expect(effectSetKeyedStoreDelete).not.toHaveBeenCalled();
        expect(effectSetKeyedStoreGetAll).not.toHaveBeenCalled();
        expect(effectSetKeyedStoreGetKeys).not.toHaveBeenCalled();
        expect(effectDeletedKeyedStoreGet).not.toHaveBeenCalled();
        expect(effectDeletedKeyedStoreSet).not.toHaveBeenCalled();
        expect(effectDeletedKeyedStoreDelete).not.toHaveBeenCalled();
        expect(effectDeletedKeyedStoreGetAll).not.toHaveBeenCalled();
        expect(effectDeletedKeyedStoreGetKeys).not.toHaveBeenCalled();
        expect(unusedUnkeyedStoreGet).not.toHaveBeenCalled();
        expect(unusedUnkeyedStoreSet).not.toHaveBeenCalled();
        expect(unusedKeyedStoreGet).not.toHaveBeenCalled();
        expect(unusedKeyedStoreSet).not.toHaveBeenCalled();
        expect(unusedKeyedStoreDelete).not.toHaveBeenCalled();
        expect(unusedKeyedStoreGetAll).not.toHaveBeenCalled();
        expect(unusedKeyedStoreGetKeys).not.toHaveBeenCalled();
        expect(writtenUnkeyedStoreGet).not.toHaveBeenCalled();
        expect(writtenUnkeyedStoreSet).not.toHaveBeenCalled();
        expect(writtenKeyedStoreGet).not.toHaveBeenCalled();
        expect(writtenKeyedStoreSet).not.toHaveBeenCalled();
        expect(writtenKeyedStoreDelete).not.toHaveBeenCalled();
        expect(writtenKeyedStoreGetAll).not.toHaveBeenCalled();
        expect(writtenKeyedStoreGetKeys).not.toHaveBeenCalled();
        expect(stepEffectSetUnkeyedStoreGet).not.toHaveBeenCalled();
        expect(stepEffectSetUnkeyedStoreSet).not.toHaveBeenCalled();
        expect(stepEffectSetKeyedStoreGet).not.toHaveBeenCalled();
        expect(stepEffectSetKeyedStoreSet).not.toHaveBeenCalled();
        expect(stepEffectSetKeyedStoreDelete).not.toHaveBeenCalled();
        expect(stepEffectSetKeyedStoreGetAll).not.toHaveBeenCalled();
        expect(stepEffectSetKeyedStoreGetKeys).not.toHaveBeenCalled();
        expect(stepEffectDeletedKeyedStoreGet).not.toHaveBeenCalled();
        expect(stepEffectDeletedKeyedStoreSet).not.toHaveBeenCalled();
        expect(stepEffectDeletedKeyedStoreDelete).not.toHaveBeenCalled();
        expect(stepEffectDeletedKeyedStoreGetAll).not.toHaveBeenCalled();
        expect(stepEffectDeletedKeyedStoreGetKeys).not.toHaveBeenCalled();
      });

      it(`does not interact with any steps`, () => {
        expect(stepExecutePerActionStep).not.toHaveBeenCalled();
      });
    });

    describe(`when no stores are set or deleted`, () => {
      let effectSetUnkeyedStoreGet: jasmine.Spy;
      let effectSetUnkeyedStoreSet: jasmine.Spy;
      let effectSetKeyedStoreGet: jasmine.Spy;
      let effectSetKeyedStoreSet: jasmine.Spy;
      let effectSetKeyedStoreDelete: jasmine.Spy;
      let effectSetKeyedStoreGetAll: jasmine.Spy;
      let effectSetKeyedStoreGetKeys: jasmine.Spy;
      let effectDeletedKeyedStoreGet: jasmine.Spy;
      let effectDeletedKeyedStoreSet: jasmine.Spy;
      let effectDeletedKeyedStoreDelete: jasmine.Spy;
      let effectDeletedKeyedStoreGetAll: jasmine.Spy;
      let effectDeletedKeyedStoreGetKeys: jasmine.Spy;
      let unusedUnkeyedStoreGet: jasmine.Spy;
      let unusedUnkeyedStoreSet: jasmine.Spy;
      let unusedKeyedStoreGet: jasmine.Spy;
      let unusedKeyedStoreSet: jasmine.Spy;
      let unusedKeyedStoreDelete: jasmine.Spy;
      let unusedKeyedStoreGetAll: jasmine.Spy;
      let unusedKeyedStoreGetKeys: jasmine.Spy;
      let writtenUnkeyedStoreGet: jasmine.Spy;
      let writtenUnkeyedStoreSet: jasmine.Spy;
      let writtenKeyedStoreGet: jasmine.Spy;
      let writtenKeyedStoreSet: jasmine.Spy;
      let writtenKeyedStoreDelete: jasmine.Spy;
      let writtenKeyedStoreGetAll: jasmine.Spy;
      let writtenKeyedStoreGetKeys: jasmine.Spy;
      let invalidated: jasmine.Spy;
      let result: {
        readonly unclaimedFiles: Diff<string>;
        readonly parallelSteps: ReadonlyArray<Step>;
      };

      beforeAll(async () => {
        effectSetUnkeyedStoreGet = jasmine.createSpy(
          `effectSetUnkeyedStoreGet`
        );
        effectSetUnkeyedStoreSet = jasmine.createSpy(
          `effectSetUnkeyedStoreSet`
        );
        const effectSetUnkeyedStore: UnkeyedStore<unknown> = {
          type: `unkeyedStore`,
          name: `effectSetUnkeyedStore`,
          get: effectSetUnkeyedStoreGet,
          set: effectSetUnkeyedStoreSet,
        };
        effectSetKeyedStoreGet = jasmine.createSpy(`effectSetKeyedStoreGet`);
        effectSetKeyedStoreSet = jasmine.createSpy(`effectSetKeyedStoreSet`);
        effectSetKeyedStoreDelete = jasmine.createSpy(
          `effectSetKeyedStoreDelete`
        );
        effectSetKeyedStoreGetAll = jasmine.createSpy(
          `effectSetKeyedStoreGetAll`
        );
        effectSetKeyedStoreGetKeys = jasmine.createSpy(
          `effectSetKeyedStoreGetKeys`
        );
        const effectSetKeyedStore: KeyedStore<unknown> = {
          type: `keyedStore`,
          name: `effectSetKeyedStore`,
          get: effectSetKeyedStoreGet,
          set: effectSetKeyedStoreSet,
          delete: effectSetKeyedStoreDelete,
          getAll: effectSetKeyedStoreGetAll,
          getKeys: effectSetKeyedStoreGetKeys,
        };
        effectDeletedKeyedStoreGet = jasmine.createSpy(
          `effectDeletedKeyedStoreGet`
        );
        effectDeletedKeyedStoreSet = jasmine.createSpy(
          `effectDeletedKeyedStoreSet`
        );
        effectDeletedKeyedStoreDelete = jasmine.createSpy(
          `effectDeletedKeyedStoreDelete`
        );
        effectDeletedKeyedStoreGetAll = jasmine.createSpy(
          `effectDeletedKeyedStoreGetAll`
        );
        effectDeletedKeyedStoreGetKeys = jasmine.createSpy(
          `effectDeletedKeyedStoreGetKeys`
        );
        const effectDeletedKeyedStore: KeyedStore<unknown> = {
          type: `keyedStore`,
          name: `effectDeletedKeyedStore`,
          get: effectDeletedKeyedStoreGet,
          set: effectDeletedKeyedStoreSet,
          delete: effectDeletedKeyedStoreDelete,
          getAll: effectDeletedKeyedStoreGetAll,
          getKeys: effectDeletedKeyedStoreGetKeys,
        };
        unusedUnkeyedStoreGet = jasmine.createSpy(`unusedUnkeyedStoreGet`);
        unusedUnkeyedStoreSet = jasmine.createSpy(`unusedUnkeyedStoreSet`);
        const unusedUnkeyedStore: UnkeyedStore<unknown> = {
          type: `unkeyedStore`,
          name: `unusedUnkeyedStore`,
          get: unusedUnkeyedStoreGet,
          set: unusedUnkeyedStoreSet,
        };
        unusedKeyedStoreGet = jasmine.createSpy(`unusedKeyedStoreGet`);
        unusedKeyedStoreSet = jasmine.createSpy(`unusedKeyedStoreSet`);
        unusedKeyedStoreDelete = jasmine.createSpy(`unusedKeyedStoreDelete`);
        unusedKeyedStoreGetAll = jasmine.createSpy(`unusedKeyedStoreGetAll`);
        unusedKeyedStoreGetKeys = jasmine.createSpy(`unusedKeyedStoreGetKeys`);
        const unusedKeyedStore: KeyedStore<unknown> = {
          type: `keyedStore`,
          name: `unusedKeyedStore`,
          get: unusedKeyedStoreGet,
          set: unusedKeyedStoreSet,
          delete: unusedKeyedStoreDelete,
          getAll: unusedKeyedStoreGetAll,
          getKeys: unusedKeyedStoreGetKeys,
        };
        writtenUnkeyedStoreGet = jasmine.createSpy(`writtenUnkeyedStoreGet`);
        writtenUnkeyedStoreSet = jasmine.createSpy(`writtenUnkeyedStoreSet`);
        const writtenUnkeyedStore: UnkeyedStore<unknown> = {
          type: `unkeyedStore`,
          name: `writtenUnkeyedStore`,
          get: writtenUnkeyedStoreGet,
          set: writtenUnkeyedStoreSet,
        };
        writtenKeyedStoreGet = jasmine.createSpy(`writtenKeyedStoreGet`);
        writtenKeyedStoreSet = jasmine.createSpy(`writtenKeyedStoreSet`);
        writtenKeyedStoreDelete = jasmine.createSpy(`writtenKeyedStoreDelete`);
        writtenKeyedStoreGetAll = jasmine.createSpy(`writtenKeyedStoreGetAll`);
        writtenKeyedStoreGetKeys = jasmine.createSpy(
          `writtenKeyedStoreGetKeys`
        );
        const writtenKeyedStore: KeyedStore<unknown> = {
          type: `keyedStore`,
          name: `writtenKeyedStore`,
          get: writtenKeyedStoreGet,
          set: writtenKeyedStoreSet,
          delete: writtenKeyedStoreDelete,
          getAll: writtenKeyedStoreGetAll,
          getKeys: writtenKeyedStoreGetKeys,
        };
        invalidated = jasmine.createSpy(`invalidated`);

        result = await generateParallelStepsForTrigger(
          {
            added: [
              `Test Added Path A`,
              `Test Added Path B`,
              `Test Added Path C`,
            ],
            changed: [`Test Changed Path A`, `Test Changed Path B`],
            unchanged: [
              `Test Unchanged Path A`,
              `Test Unchanged Path B`,
              `Test Unchanged Path C`,
              `Test Unchanged Path D`,
              `Test Unchanged Path E`,
            ],
            deleted: [
              `Test Deleted Path A`,
              `Test Deleted Path B`,
              `Test Deleted Path C`,
            ],
          },
          [
            {
              type: `unkeyedStoreSet`,
              unkeyedStore: effectSetUnkeyedStore,
            },
            {
              type: `keyedStoreSet`,
              keyedStore: effectSetKeyedStore,
              key: `Test Set Key`,
            },
            {
              type: `keyedStoreDelete`,
              keyedStore: effectDeletedKeyedStore,
              key: `Test Deleted Key`,
            },
          ],
          {
            type: `storeAggregate`,
            invalidated,
            stores: [unusedUnkeyedStore, unusedKeyedStore],
            writesToStores: [writtenUnkeyedStore, writtenKeyedStore],
          }
        );
      });

      it(`does not create any steps`, () => {
        expect(invalidated).not.toHaveBeenCalled();
      });

      it(`returns an empty set of steps`, () => {
        expect(result.parallelSteps).toEqual([]);
      });

      it(`returns the given unclaimed files`, () => {
        expect(result.unclaimedFiles).toEqual({
          added: [
            `Test Added Path A`,
            `Test Added Path B`,
            `Test Added Path C`,
          ],
          changed: [`Test Changed Path A`, `Test Changed Path B`],
          unchanged: [
            `Test Unchanged Path A`,
            `Test Unchanged Path B`,
            `Test Unchanged Path C`,
            `Test Unchanged Path D`,
            `Test Unchanged Path E`,
          ],
          deleted: [
            `Test Deleted Path A`,
            `Test Deleted Path B`,
            `Test Deleted Path C`,
          ],
        });
      });

      it(`does not interact with any stores`, () => {
        expect(effectSetUnkeyedStoreGet).not.toHaveBeenCalled();
        expect(effectSetUnkeyedStoreSet).not.toHaveBeenCalled();
        expect(effectSetKeyedStoreGet).not.toHaveBeenCalled();
        expect(effectSetKeyedStoreSet).not.toHaveBeenCalled();
        expect(effectSetKeyedStoreDelete).not.toHaveBeenCalled();
        expect(effectSetKeyedStoreGetAll).not.toHaveBeenCalled();
        expect(effectSetKeyedStoreGetKeys).not.toHaveBeenCalled();
        expect(effectDeletedKeyedStoreGet).not.toHaveBeenCalled();
        expect(effectDeletedKeyedStoreSet).not.toHaveBeenCalled();
        expect(effectDeletedKeyedStoreDelete).not.toHaveBeenCalled();
        expect(effectDeletedKeyedStoreGetAll).not.toHaveBeenCalled();
        expect(effectDeletedKeyedStoreGetKeys).not.toHaveBeenCalled();
        expect(unusedUnkeyedStoreGet).not.toHaveBeenCalled();
        expect(unusedUnkeyedStoreSet).not.toHaveBeenCalled();
        expect(unusedKeyedStoreGet).not.toHaveBeenCalled();
        expect(unusedKeyedStoreSet).not.toHaveBeenCalled();
        expect(unusedKeyedStoreDelete).not.toHaveBeenCalled();
        expect(unusedKeyedStoreGetAll).not.toHaveBeenCalled();
        expect(unusedKeyedStoreGetKeys).not.toHaveBeenCalled();
        expect(writtenUnkeyedStoreGet).not.toHaveBeenCalled();
        expect(writtenUnkeyedStoreSet).not.toHaveBeenCalled();
        expect(writtenKeyedStoreGet).not.toHaveBeenCalled();
        expect(writtenKeyedStoreSet).not.toHaveBeenCalled();
        expect(writtenKeyedStoreDelete).not.toHaveBeenCalled();
        expect(writtenKeyedStoreGetAll).not.toHaveBeenCalled();
        expect(writtenKeyedStoreGetKeys).not.toHaveBeenCalled();
      });
    });
  });
});

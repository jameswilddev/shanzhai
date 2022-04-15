import { Diff, KeyedStore, Step, UnkeyedStore } from "@shanzhai/interfaces";
import { NopStep } from "@shanzhai/nop-step";
import { ParallelStep } from "@shanzhai/parallel-step";
import { SerialStep } from "@shanzhai/serial-step";
import { generateStepForTrigger } from ".";

describe(`generateStepForTrigger`, () => {
  describe(`when no steps are generated`, () => {
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
      readonly step: Step;
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
      invalidated = jasmine.createSpy(`invalidated`);

      result = await generateStepForTrigger(
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
          pluginName: `testPluginName`,
          triggerName: `testTriggerName`,
          trigger: {
            type: `storeAggregate`,
            invalidated,
            stores: [unusedUnkeyedStore, unusedKeyedStore],
            writesToStores: [writtenUnkeyedStore, writtenKeyedStore],
          },
        }
      );
    });

    it(`does not interact with the trigger`, () => {
      expect(invalidated).not.toHaveBeenCalled();
    });

    it(`returns a nop step`, () => {
      expect(result.step).toEqual(
        new NopStep(
          `Trigger "testTriggerName" of plugin "testPluginName" did not run`
        )
      );
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

  describe(`when one step is generated`, () => {
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
      readonly step: Step;
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
      invalidated = jasmine.createSpy(`invalidated`).and.returnValue(step);

      result = await generateStepForTrigger(
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
          pluginName: `testPluginName`,
          triggerName: `testTriggerName`,
          trigger: {
            type: `storeAggregate`,
            invalidated,
            stores: [unusedUnkeyedStore, effectSetKeyedStore, unusedKeyedStore],
            writesToStores: [writtenUnkeyedStore, writtenKeyedStore],
          },
        }
      );
    });

    it(`does not further interact with the trigger`, () => {
      expect(invalidated).toHaveBeenCalledTimes(1);
    });

    it(`returns the created step`, () => {
      expect(result.step).toEqual(step);
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

  describe(`when two steps are generated`, () => {
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
      readonly step: Step;
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

      result = await generateStepForTrigger(
        {
          added: [
            `Test Added Path A`,
            `something/which/was-added`,
            `Test Added Path C`,
          ],
          changed: [`Test Changed Path A`, `Test Changed Path B`],
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
          pluginName: `testPluginName`,
          triggerName: `testTriggerName`,
          trigger: {
            type: `file`,
            glob: `something/which/was-*`,
            up,
            down,
            writesToStores: [writtenUnkeyedStore, writtenKeyedStore],
          },
        }
      );
    });

    it(`does not further interact with the trigger`, () => {
      expect(up).toHaveBeenCalledTimes(1);
      expect(down).toHaveBeenCalledTimes(1);
    });

    it(`returns a parallel step containing the created steps`, () => {
      expect(result.step).toEqual(
        new ParallelStep(
          `Trigger "testTriggerName" of plugin "testPluginName"`,
          [addStep, deleteStep]
        )
      );
    });

    it(`returns the remaining unclaimed files`, () => {
      expect(result.unclaimedFiles).toEqual({
        added: [`Test Added Path A`, `Test Added Path C`],
        changed: [`Test Changed Path A`, `Test Changed Path B`],
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

  describe(`when three steps are generated`, () => {
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
      readonly step: Step;
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

      result = await generateStepForTrigger(
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
          pluginName: `testPluginName`,
          triggerName: `testTriggerName`,
          trigger: {
            type: `file`,
            glob: `something/which/was-*`,
            up,
            down,
            writesToStores: [writtenUnkeyedStore, writtenKeyedStore],
          },
        }
      );
    });

    it(`does not further interact with the trigger`, () => {
      expect(up).toHaveBeenCalledTimes(2);
      expect(down).toHaveBeenCalledTimes(2);
    });

    it(`returns a parallel step containing the created steps`, () => {
      expect(result.step).toEqual(
        new ParallelStep(
          `Trigger "testTriggerName" of plugin "testPluginName"`,
          [
            addStep,
            new SerialStep(`something/which/was-changed`, [
              changeDownStep,
              changeUpStep,
            ]),
            deleteStep,
          ]
        )
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
});

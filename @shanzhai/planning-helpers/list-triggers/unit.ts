import {
  OneTimeTrigger,
  FileTrigger,
  KeyedStoreTrigger,
  StoreAggregateTrigger,
  Trigger,
  KeyedStore,
  UnkeyedStore,
} from "@shanzhai/interfaces";
import { listTriggers } from ".";

describe(`listTriggers`, () => {
  describe(`on success`, () => {
    let unkeyedStoreWrittenToByStoreAggregateTriggerGet: jasmine.Spy;
    let unkeyedStoreWrittenToByStoreAggregateTriggerSet: jasmine.Spy;
    let unkeyedStoreWrittenToByStoreAggregateTrigger: UnkeyedStore<unknown>;
    let keyedStoreWrittenToByStoreAggregateTriggerGet: jasmine.Spy;
    let keyedStoreWrittenToByStoreAggregateTriggerSet: jasmine.Spy;
    let keyedStoreWrittenToByStoreAggregateTriggerDelete: jasmine.Spy;
    let keyedStoreWrittenToByStoreAggregateTriggerGetAll: jasmine.Spy;
    let keyedStoreWrittenToByStoreAggregateTriggerGetKeys: jasmine.Spy;
    let keyedStoreWrittenToByStoreAggregateTrigger: KeyedStore<unknown>;
    let unkeyedStoreWrittenToByKeyedStoreTriggerGet: jasmine.Spy;
    let unkeyedStoreWrittenToByKeyedStoreTriggerSet: jasmine.Spy;
    let unkeyedStoreWrittenToByKeyedStoreTrigger: UnkeyedStore<unknown>;
    let keyedStoreWrittenToByKeyedStoreTriggerGet: jasmine.Spy;
    let keyedStoreWrittenToByKeyedStoreTriggerSet: jasmine.Spy;
    let keyedStoreWrittenToByKeyedStoreTriggerDelete: jasmine.Spy;
    let keyedStoreWrittenToByKeyedStoreTriggerGetAll: jasmine.Spy;
    let keyedStoreWrittenToByKeyedStoreTriggerGetKeys: jasmine.Spy;
    let keyedStoreWrittenToByKeyedStoreTrigger: KeyedStore<unknown>;
    let keyedStoreWrittenToByMultipleGet: jasmine.Spy;
    let keyedStoreWrittenToByMultipleSet: jasmine.Spy;
    let keyedStoreWrittenToByMultipleDelete: jasmine.Spy;
    let keyedStoreWrittenToByMultipleGetAll: jasmine.Spy;
    let keyedStoreWrittenToByMultipleGetKeys: jasmine.Spy;
    let keyedStoreWrittenToByMultiple: KeyedStore<unknown>;
    let unwrittenKeyedStoreGet: jasmine.Spy;
    let unwrittenKeyedStoreSet: jasmine.Spy;
    let unwrittenKeyedStoreDelete: jasmine.Spy;
    let unwrittenKeyedStoreGetAll: jasmine.Spy;
    let unwrittenKeyedStoreGetKeys: jasmine.Spy;
    let unwrittenKeyedStore: KeyedStore<unknown>;
    let oneTimeTriggerUp: jasmine.Spy;
    let oneTimeTrigger: OneTimeTrigger;
    let fileTriggerADown: jasmine.Spy;
    let fileTriggerAUp: jasmine.Spy;
    let fileTriggerA: FileTrigger;
    let fileTriggerBDown: jasmine.Spy;
    let fileTriggerBUp: jasmine.Spy;
    let fileTriggerB: FileTrigger;
    let fileTriggerCDown: jasmine.Spy;
    let fileTriggerCUp: jasmine.Spy;
    let fileTriggerC: FileTrigger;
    let storeAggregateTriggerInvalidated: jasmine.Spy;
    let storeAggregateTrigger: StoreAggregateTrigger;
    let storeAggregateTriggerFollowingStoreAggregateTriggerViaUnkeyedStoreInvalidated: jasmine.Spy;
    let storeAggregateTriggerFollowingStoreAggregateTriggerViaUnkeyedStore: StoreAggregateTrigger;
    let storeAggregateTriggerFollowingStoreAggregateTriggerViaKeyedStoreInvalidated: jasmine.Spy;
    let storeAggregateTriggerFollowingStoreAggregateTriggerViaKeyedStore: StoreAggregateTrigger;
    let storeAggregateTriggerFollowingKeyedStoreTriggerViaUnkeyedStoreInvalidated: jasmine.Spy;
    let storeAggregateTriggerFollowingKeyedStoreTriggerViaUnkeyedStore: StoreAggregateTrigger;
    let storeAggregateTriggerFollowingKeyedStoreTriggerViaKeyedStoreInvalidated: jasmine.Spy;
    let storeAggregateTriggerFollowingKeyedStoreTriggerViaKeyedStore: StoreAggregateTrigger;
    let keyedStoreTriggerDown: jasmine.Spy;
    let keyedStoreTriggerUp: jasmine.Spy;
    let keyedStoreTrigger: KeyedStoreTrigger;
    let keyedStoreTriggerFollowingStoreAggregateTriggerRefreshedViaUnkeyedStoreDown: jasmine.Spy;
    let keyedStoreTriggerFollowingStoreAggregateTriggerRefreshedViaUnkeyedStoreUp: jasmine.Spy;
    let keyedStoreTriggerFollowingStoreAggregateTriggerRefreshedViaUnkeyedStore: KeyedStoreTrigger;
    let keyedStoreTriggerFollowingStoreAggregateTriggerRefreshedViaKeyedStoreDown: jasmine.Spy;
    let keyedStoreTriggerFollowingStoreAggregateTriggerRefreshedViaKeyedStoreUp: jasmine.Spy;
    let keyedStoreTriggerFollowingStoreAggregateTriggerRefreshedViaKeyedStore: KeyedStoreTrigger;
    let keyedStoreTriggerFollowingKeyedStoreTriggerRefreshedViaUnkeyedStoreDown: jasmine.Spy;
    let keyedStoreTriggerFollowingKeyedStoreTriggerRefreshedViaUnkeyedStoreUp: jasmine.Spy;
    let keyedStoreTriggerFollowingKeyedStoreTriggerRefreshedViaUnkeyedStore: KeyedStoreTrigger;
    let keyedStoreTriggerFollowingKeyedStoreTriggerRefreshedViaKeyedStoreDown: jasmine.Spy;
    let keyedStoreTriggerFollowingKeyedStoreTriggerRefreshedViaKeyedStoreUp: jasmine.Spy;
    let keyedStoreTriggerFollowingKeyedStoreTriggerRefreshedViaKeyedStore: KeyedStoreTrigger;
    let keyedStoreTriggerFollowingStoreAggregateTriggerViaKeyedStoreDown: jasmine.Spy;
    let keyedStoreTriggerFollowingStoreAggregateTriggerViaKeyedStoreUp: jasmine.Spy;
    let keyedStoreTriggerFollowingStoreAggregateTriggerViaKeyedStore: KeyedStoreTrigger;
    let keyedStoreTriggerFollowingKeyedStoreTriggerViaKeyedStoreDown: jasmine.Spy;
    let keyedStoreTriggerFollowingKeyedStoreTriggerViaKeyedStoreUp: jasmine.Spy;
    let keyedStoreTriggerFollowingKeyedStoreTriggerViaKeyedStore: KeyedStoreTrigger;
    let keyedStoreTriggerFollowingMultipleDown: jasmine.Spy;
    let keyedStoreTriggerFollowingMultipleUp: jasmine.Spy;
    let keyedStoreTriggerFollowingMultiple: KeyedStoreTrigger;
    let triggers: ReadonlyArray<{
      readonly pluginName: string;
      readonly triggerName: string;
      readonly trigger: Trigger;
    }>;

    beforeAll(() => {
      unkeyedStoreWrittenToByStoreAggregateTriggerGet = jasmine.createSpy(
        `unkeyedStoreWrittenToByStoreAggregateTriggerGet`
      );
      unkeyedStoreWrittenToByStoreAggregateTriggerSet = jasmine.createSpy(
        `unkeyedStoreWrittenToByStoreAggregateTriggerSet`
      );
      unkeyedStoreWrittenToByStoreAggregateTrigger = {
        type: `unkeyedStore`,
        name: `unkeyedStoreWrittenToByStoreAggregateTrigger`,
        get: unkeyedStoreWrittenToByStoreAggregateTriggerGet,
        set: unkeyedStoreWrittenToByStoreAggregateTriggerSet,
      };
      keyedStoreWrittenToByStoreAggregateTriggerGet = jasmine.createSpy(
        `keyedStoreWrittenToByStoreAggregateTriggerGet`
      );
      keyedStoreWrittenToByStoreAggregateTriggerSet = jasmine.createSpy(
        `keyedStoreWrittenToByStoreAggregateTriggerSet`
      );
      keyedStoreWrittenToByStoreAggregateTriggerDelete = jasmine.createSpy(
        `keyedStoreWrittenToByStoreAggregateTriggerDelete`
      );
      keyedStoreWrittenToByStoreAggregateTriggerGetAll = jasmine.createSpy(
        `keyedStoreWrittenToByStoreAggregateTriggerGetAll`
      );
      keyedStoreWrittenToByStoreAggregateTriggerGetKeys = jasmine.createSpy(
        `keyedStoreWrittenToByStoreAggregateTriggerGetKeys`
      );
      keyedStoreWrittenToByStoreAggregateTrigger = {
        type: `keyedStore`,
        name: `keyedStoreWrittenToByStoreAggregateTrigger`,
        get: keyedStoreWrittenToByStoreAggregateTriggerGet,
        set: keyedStoreWrittenToByStoreAggregateTriggerSet,
        delete: keyedStoreWrittenToByStoreAggregateTriggerDelete,
        getAll: keyedStoreWrittenToByStoreAggregateTriggerGetAll,
        getKeys: keyedStoreWrittenToByStoreAggregateTriggerGetKeys,
      };
      unkeyedStoreWrittenToByKeyedStoreTriggerGet = jasmine.createSpy(
        `unkeyedStoreWrittenToByKeyedStoreTriggerGet`
      );
      unkeyedStoreWrittenToByKeyedStoreTriggerSet = jasmine.createSpy(
        `unkeyedStoreWrittenToByKeyedStoreTriggerSet`
      );
      unkeyedStoreWrittenToByKeyedStoreTrigger = {
        type: `unkeyedStore`,
        name: `unkeyedStoreWrittenToByKeyedStoreTrigger`,
        get: unkeyedStoreWrittenToByKeyedStoreTriggerGet,
        set: unkeyedStoreWrittenToByKeyedStoreTriggerSet,
      };
      keyedStoreWrittenToByKeyedStoreTriggerGet = jasmine.createSpy(
        `keyedStoreWrittenToByKeyedStoreTriggerGet`
      );
      keyedStoreWrittenToByKeyedStoreTriggerSet = jasmine.createSpy(
        `keyedStoreWrittenToByKeyedStoreTriggerSet`
      );
      keyedStoreWrittenToByKeyedStoreTriggerDelete = jasmine.createSpy(
        `keyedStoreWrittenToByKeyedStoreTriggerDelete`
      );
      keyedStoreWrittenToByKeyedStoreTriggerGetAll = jasmine.createSpy(
        `keyedStoreWrittenToByKeyedStoreTriggerGetAll`
      );
      keyedStoreWrittenToByKeyedStoreTriggerGetKeys = jasmine.createSpy(
        `keyedStoreWrittenToByKeyedStoreTriggerGetKeys`
      );
      keyedStoreWrittenToByKeyedStoreTrigger = {
        type: `keyedStore`,
        name: `keyedStoreWrittenToByKeyedStoreTrigger`,
        get: keyedStoreWrittenToByKeyedStoreTriggerGet,
        set: keyedStoreWrittenToByKeyedStoreTriggerSet,
        delete: keyedStoreWrittenToByKeyedStoreTriggerDelete,
        getAll: keyedStoreWrittenToByKeyedStoreTriggerGetAll,
        getKeys: keyedStoreWrittenToByKeyedStoreTriggerGetKeys,
      };
      keyedStoreWrittenToByMultipleGet = jasmine.createSpy(
        `keyedStoreWrittenToByMultipleGet`
      );
      keyedStoreWrittenToByMultipleSet = jasmine.createSpy(
        `keyedStoreWrittenToByMultipleSet`
      );
      keyedStoreWrittenToByMultipleDelete = jasmine.createSpy(
        `keyedStoreWrittenToByMultipleDelete`
      );
      keyedStoreWrittenToByMultipleGetAll = jasmine.createSpy(
        `keyedStoreWrittenToByMultipleGetAll`
      );
      keyedStoreWrittenToByMultipleGetKeys = jasmine.createSpy(
        `keyedStoreWrittenToByMultipleGetKeys`
      );
      keyedStoreWrittenToByMultiple = {
        type: `keyedStore`,
        name: `keyedStoreWrittenToByMultiple`,
        get: keyedStoreWrittenToByMultipleGet,
        set: keyedStoreWrittenToByMultipleSet,
        delete: keyedStoreWrittenToByMultipleDelete,
        getAll: keyedStoreWrittenToByMultipleGetAll,
        getKeys: keyedStoreWrittenToByMultipleGetKeys,
      };
      unwrittenKeyedStoreGet = jasmine.createSpy(`unwrittenKeyedStoreGet`);
      unwrittenKeyedStoreSet = jasmine.createSpy(`unwrittenKeyedStoreSet`);
      unwrittenKeyedStoreDelete = jasmine.createSpy(
        `unwrittenKeyedStoreDelete`
      );
      unwrittenKeyedStoreGetAll = jasmine.createSpy(
        `unwrittenKeyedStoreGetAll`
      );
      unwrittenKeyedStoreGetKeys = jasmine.createSpy(
        `unwrittenKeyedStoreGetKeys`
      );
      unwrittenKeyedStore = {
        type: `keyedStore`,
        name: `unwrittenKeyedStore`,
        get: unwrittenKeyedStoreGet,
        set: unwrittenKeyedStoreSet,
        delete: unwrittenKeyedStoreDelete,
        getAll: unwrittenKeyedStoreGetAll,
        getKeys: unwrittenKeyedStoreGetKeys,
      };
      oneTimeTriggerUp = jasmine.createSpy(`oneTimeTriggerUp`);
      oneTimeTrigger = {
        type: `oneTime`,
        up: oneTimeTriggerUp,
        writesToStores: [],
      };
      fileTriggerADown = jasmine.createSpy(`fileTriggerADown`);
      fileTriggerAUp = jasmine.createSpy(`fileTriggerAUp`);
      fileTriggerA = {
        type: `file`,
        glob: `**/*.*`,
        down: fileTriggerADown,
        up: fileTriggerAUp,
        writesToStores: [],
      };
      fileTriggerBDown = jasmine.createSpy(`fileTriggerBDown`);
      fileTriggerBUp = jasmine.createSpy(`fileTriggerBUp`);
      fileTriggerB = {
        type: `file`,
        glob: `some-file.*`,
        down: fileTriggerBDown,
        up: fileTriggerBUp,
        writesToStores: [],
      };
      fileTriggerCDown = jasmine.createSpy(`fileTriggerCDown`);
      fileTriggerCUp = jasmine.createSpy(`fileTriggerCUp`);
      fileTriggerC = {
        type: `file`,
        glob: `matched/**/added/*`,
        down: fileTriggerCDown,
        up: fileTriggerCUp,
        writesToStores: [],
      };
      storeAggregateTriggerInvalidated = jasmine.createSpy(
        `storeAggregateTriggerInvalidated`
      );
      storeAggregateTrigger = {
        type: `storeAggregate`,
        stores: [],
        invalidated: storeAggregateTriggerInvalidated,
        writesToStores: [
          keyedStoreWrittenToByStoreAggregateTrigger,
          unkeyedStoreWrittenToByStoreAggregateTrigger,
        ],
      };
      storeAggregateTriggerFollowingStoreAggregateTriggerViaUnkeyedStoreInvalidated =
        jasmine.createSpy(
          `storeAggregateTriggerFollowingStoreAggregateTriggerViaUnkeyedStoreInvalidated`
        );
      storeAggregateTriggerFollowingStoreAggregateTriggerViaUnkeyedStore = {
        type: `storeAggregate`,
        stores: [unkeyedStoreWrittenToByStoreAggregateTrigger],
        invalidated:
          storeAggregateTriggerFollowingStoreAggregateTriggerViaUnkeyedStoreInvalidated,
        writesToStores: [],
      };
      storeAggregateTriggerFollowingStoreAggregateTriggerViaKeyedStoreInvalidated =
        jasmine.createSpy(
          `storeAggregateTriggerFollowingStoreAggregateTriggerViaKeyedStoreInvalidated`
        );
      storeAggregateTriggerFollowingStoreAggregateTriggerViaKeyedStore = {
        type: `storeAggregate`,
        stores: [keyedStoreWrittenToByStoreAggregateTrigger],
        invalidated:
          storeAggregateTriggerFollowingStoreAggregateTriggerViaKeyedStoreInvalidated,
        writesToStores: [],
      };
      storeAggregateTriggerFollowingKeyedStoreTriggerViaUnkeyedStoreInvalidated =
        jasmine.createSpy(
          `storeAggregateTriggerFollowingKeyedStoreTriggerViaUnkeyedStoreInvalidated`
        );
      storeAggregateTriggerFollowingKeyedStoreTriggerViaUnkeyedStore = {
        type: `storeAggregate`,
        stores: [unkeyedStoreWrittenToByKeyedStoreTrigger],
        invalidated:
          storeAggregateTriggerFollowingKeyedStoreTriggerViaUnkeyedStoreInvalidated,
        writesToStores: [],
      };
      storeAggregateTriggerFollowingKeyedStoreTriggerViaKeyedStoreInvalidated =
        jasmine.createSpy(
          `storeAggregateTriggerFollowingKeyedStoreTriggerViaKeyedStoreInvalidated`
        );
      storeAggregateTriggerFollowingKeyedStoreTriggerViaKeyedStore = {
        type: `storeAggregate`,
        stores: [keyedStoreWrittenToByKeyedStoreTrigger],
        invalidated:
          storeAggregateTriggerFollowingKeyedStoreTriggerViaKeyedStoreInvalidated,
        writesToStores: [],
      };
      keyedStoreTriggerDown = jasmine.createSpy(`keyedStoreTriggerDown`);
      keyedStoreTriggerUp = jasmine.createSpy(`keyedStoreTriggerUp`);
      keyedStoreTrigger = {
        type: `keyedStore`,
        keyedStore: unwrittenKeyedStore,
        refreshAllWhenStoresChange: [],
        down: keyedStoreTriggerDown,
        up: keyedStoreTriggerUp,
        writesToStores: [
          keyedStoreWrittenToByKeyedStoreTrigger,
          unkeyedStoreWrittenToByKeyedStoreTrigger,
        ],
      };
      keyedStoreTriggerFollowingStoreAggregateTriggerRefreshedViaUnkeyedStoreDown =
        jasmine.createSpy(
          `keyedStoreTriggerFollowingStoreAggregateTriggerRefreshedViaUnkeyedStoreDown`
        );
      keyedStoreTriggerFollowingStoreAggregateTriggerRefreshedViaUnkeyedStoreUp =
        jasmine.createSpy(
          `keyedStoreTriggerFollowingStoreAggregateTriggerRefreshedViaUnkeyedStoreUp`
        );
      keyedStoreTriggerFollowingStoreAggregateTriggerRefreshedViaUnkeyedStore =
        {
          type: `keyedStore`,
          keyedStore: unwrittenKeyedStore,
          refreshAllWhenStoresChange: [
            unkeyedStoreWrittenToByStoreAggregateTrigger,
          ],
          down: keyedStoreTriggerFollowingStoreAggregateTriggerRefreshedViaUnkeyedStoreDown,
          up: keyedStoreTriggerFollowingStoreAggregateTriggerRefreshedViaUnkeyedStoreUp,
          writesToStores: [],
        };
      keyedStoreTriggerFollowingStoreAggregateTriggerRefreshedViaKeyedStoreDown =
        jasmine.createSpy(
          `keyedStoreTriggerFollowingStoreAggregateTriggerRefreshedViaKeyedStoreDown`
        );
      keyedStoreTriggerFollowingStoreAggregateTriggerRefreshedViaKeyedStoreUp =
        jasmine.createSpy(
          `keyedStoreTriggerFollowingStoreAggregateTriggerRefreshedViaKeyedStoreUp`
        );
      keyedStoreTriggerFollowingStoreAggregateTriggerRefreshedViaKeyedStore = {
        type: `keyedStore`,
        keyedStore: unwrittenKeyedStore,
        refreshAllWhenStoresChange: [
          keyedStoreWrittenToByStoreAggregateTrigger,
        ],
        down: keyedStoreTriggerFollowingStoreAggregateTriggerRefreshedViaKeyedStoreDown,
        up: keyedStoreTriggerFollowingStoreAggregateTriggerRefreshedViaKeyedStoreUp,
        writesToStores: [],
      };
      keyedStoreTriggerFollowingKeyedStoreTriggerRefreshedViaUnkeyedStoreDown =
        jasmine.createSpy(
          `keyedStoreTriggerFollowingKeyedStoreTriggerRefreshedViaUnkeyedStoreDown`
        );
      keyedStoreTriggerFollowingKeyedStoreTriggerRefreshedViaUnkeyedStoreUp =
        jasmine.createSpy(
          `keyedStoreTriggerFollowingKeyedStoreTriggerRefreshedViaUnkeyedStoreUp`
        );
      keyedStoreTriggerFollowingKeyedStoreTriggerRefreshedViaUnkeyedStore = {
        type: `keyedStore`,
        keyedStore: unwrittenKeyedStore,
        refreshAllWhenStoresChange: [unkeyedStoreWrittenToByKeyedStoreTrigger],
        down: keyedStoreTriggerFollowingKeyedStoreTriggerRefreshedViaUnkeyedStoreDown,
        up: keyedStoreTriggerFollowingKeyedStoreTriggerRefreshedViaUnkeyedStoreUp,
        writesToStores: [],
      };
      keyedStoreTriggerFollowingKeyedStoreTriggerRefreshedViaKeyedStoreDown =
        jasmine.createSpy(
          `keyedStoreTriggerFollowingKeyedStoreTriggerRefreshedViaKeyedStoreDown`
        );
      keyedStoreTriggerFollowingKeyedStoreTriggerRefreshedViaKeyedStoreUp =
        jasmine.createSpy(
          `keyedStoreTriggerFollowingKeyedStoreTriggerRefreshedViaKeyedStoreUp`
        );
      keyedStoreTriggerFollowingKeyedStoreTriggerRefreshedViaKeyedStore = {
        type: `keyedStore`,
        keyedStore: unwrittenKeyedStore,
        refreshAllWhenStoresChange: [keyedStoreWrittenToByKeyedStoreTrigger],
        down: keyedStoreTriggerFollowingKeyedStoreTriggerRefreshedViaKeyedStoreDown,
        up: keyedStoreTriggerFollowingKeyedStoreTriggerRefreshedViaKeyedStoreUp,
        writesToStores: [],
      };
      keyedStoreTriggerFollowingStoreAggregateTriggerViaKeyedStoreDown =
        jasmine.createSpy(
          `keyedStoreTriggerFollowingStoreAggregateTriggerViaKeyedStoreDown`
        );
      keyedStoreTriggerFollowingStoreAggregateTriggerViaKeyedStoreUp =
        jasmine.createSpy(
          `keyedStoreTriggerFollowingStoreAggregateTriggerViaKeyedStoreUp`
        );
      keyedStoreTriggerFollowingStoreAggregateTriggerViaKeyedStore = {
        type: `keyedStore`,
        keyedStore: keyedStoreWrittenToByStoreAggregateTrigger,
        refreshAllWhenStoresChange: [],
        down: keyedStoreTriggerFollowingStoreAggregateTriggerViaKeyedStoreDown,
        up: keyedStoreTriggerFollowingStoreAggregateTriggerViaKeyedStoreUp,
        writesToStores: [],
      };
      keyedStoreTriggerFollowingKeyedStoreTriggerViaKeyedStoreDown =
        jasmine.createSpy(
          `keyedStoreTriggerFollowingKeyedStoreTriggerViaKeyedStoreDown`
        );
      keyedStoreTriggerFollowingKeyedStoreTriggerViaKeyedStoreUp =
        jasmine.createSpy(
          `keyedStoreTriggerFollowingKeyedStoreTriggerViaKeyedStoreUp`
        );
      keyedStoreTriggerFollowingKeyedStoreTriggerViaKeyedStore = {
        type: `keyedStore`,
        keyedStore: keyedStoreWrittenToByKeyedStoreTrigger,
        refreshAllWhenStoresChange: [],
        down: keyedStoreTriggerFollowingKeyedStoreTriggerViaKeyedStoreDown,
        up: keyedStoreTriggerFollowingKeyedStoreTriggerViaKeyedStoreUp,
        writesToStores: [keyedStoreWrittenToByMultiple],
      };
      keyedStoreTriggerFollowingMultipleDown = jasmine.createSpy(
        `keyedStoreTriggerFollowingMultipleDown`
      );
      keyedStoreTriggerFollowingMultipleUp = jasmine.createSpy(
        `keyedStoreTriggerFollowingMultipleUp`
      );
      keyedStoreTriggerFollowingMultiple = {
        type: `keyedStore`,
        keyedStore: keyedStoreWrittenToByMultiple,
        refreshAllWhenStoresChange: [],
        down: keyedStoreTriggerFollowingMultipleDown,
        up: keyedStoreTriggerFollowingMultipleUp,
        writesToStores: [],
      };

      triggers = listTriggers({
        testPluginA: {
          triggers: {
            keyedStoreTriggerFollowingMultiple,
            keyedStoreTriggerFollowingKeyedStoreTriggerViaKeyedStore,
            storeAggregateTriggerFollowingKeyedStoreTriggerViaUnkeyedStore,
            storeAggregateTriggerFollowingKeyedStoreTriggerViaKeyedStore,
            keyedStoreTrigger,
            keyedStoreTriggerFollowingStoreAggregateTriggerRefreshedViaUnkeyedStore,
            fileTriggerC,
            storeAggregateTrigger,
            keyedStoreTriggerFollowingStoreAggregateTriggerViaKeyedStore,
          },
        },
        testPluginB: {
          triggers: {
            keyedStoreTriggerFollowingStoreAggregateTriggerRefreshedViaKeyedStore,
            oneTimeTrigger,
            fileTriggerA,
            fileTriggerB,
          },
        },
        testPluginC: {
          triggers: {
            storeAggregateTriggerFollowingStoreAggregateTriggerViaUnkeyedStore,
            storeAggregateTriggerFollowingStoreAggregateTriggerViaKeyedStore,
            keyedStoreTriggerFollowingKeyedStoreTriggerRefreshedViaUnkeyedStore,
            keyedStoreTriggerFollowingKeyedStoreTriggerRefreshedViaKeyedStore,
          },
        },
      });
    });

    it(`includes every trigger`, () => {
      expect(triggers).toEqual(
        jasmine.arrayContaining([
          {
            pluginName: `testPluginB`,
            triggerName: `oneTimeTrigger`,
            trigger: oneTimeTrigger,
          },
          {
            pluginName: `testPluginB`,
            triggerName: `fileTriggerA`,
            trigger: fileTriggerA,
          },
          {
            pluginName: `testPluginB`,
            triggerName: `fileTriggerB`,
            trigger: fileTriggerB,
          },
          {
            pluginName: `testPluginA`,
            triggerName: `fileTriggerC`,
            trigger: fileTriggerC,
          },
          {
            pluginName: `testPluginA`,
            triggerName: `storeAggregateTrigger`,
            trigger: storeAggregateTrigger,
          },
          {
            pluginName: `testPluginC`,
            triggerName: `storeAggregateTriggerFollowingStoreAggregateTriggerViaUnkeyedStore`,
            trigger:
              storeAggregateTriggerFollowingStoreAggregateTriggerViaUnkeyedStore,
          },
          {
            pluginName: `testPluginC`,
            triggerName: `storeAggregateTriggerFollowingStoreAggregateTriggerViaKeyedStore`,
            trigger:
              storeAggregateTriggerFollowingStoreAggregateTriggerViaKeyedStore,
          },
          {
            pluginName: `testPluginA`,
            triggerName: `storeAggregateTriggerFollowingKeyedStoreTriggerViaUnkeyedStore`,
            trigger:
              storeAggregateTriggerFollowingKeyedStoreTriggerViaUnkeyedStore,
          },
          {
            pluginName: `testPluginA`,
            triggerName: `storeAggregateTriggerFollowingKeyedStoreTriggerViaKeyedStore`,
            trigger:
              storeAggregateTriggerFollowingKeyedStoreTriggerViaKeyedStore,
          },
          {
            pluginName: `testPluginA`,
            triggerName: `keyedStoreTrigger`,
            trigger: keyedStoreTrigger,
          },
          {
            pluginName: `testPluginA`,
            triggerName: `keyedStoreTriggerFollowingStoreAggregateTriggerRefreshedViaUnkeyedStore`,
            trigger:
              keyedStoreTriggerFollowingStoreAggregateTriggerRefreshedViaUnkeyedStore,
          },
          {
            pluginName: `testPluginB`,
            triggerName: `keyedStoreTriggerFollowingStoreAggregateTriggerRefreshedViaKeyedStore`,
            trigger:
              keyedStoreTriggerFollowingStoreAggregateTriggerRefreshedViaKeyedStore,
          },
          {
            pluginName: `testPluginC`,
            triggerName: `keyedStoreTriggerFollowingKeyedStoreTriggerRefreshedViaUnkeyedStore`,
            trigger:
              keyedStoreTriggerFollowingKeyedStoreTriggerRefreshedViaUnkeyedStore,
          },
          {
            pluginName: `testPluginC`,
            triggerName: `keyedStoreTriggerFollowingKeyedStoreTriggerRefreshedViaKeyedStore`,
            trigger:
              keyedStoreTriggerFollowingKeyedStoreTriggerRefreshedViaKeyedStore,
          },
          {
            pluginName: `testPluginA`,
            triggerName: `keyedStoreTriggerFollowingStoreAggregateTriggerViaKeyedStore`,
            trigger:
              keyedStoreTriggerFollowingStoreAggregateTriggerViaKeyedStore,
          },
          {
            pluginName: `testPluginA`,
            triggerName: `keyedStoreTriggerFollowingKeyedStoreTriggerViaKeyedStore`,
            trigger: keyedStoreTriggerFollowingKeyedStoreTriggerViaKeyedStore,
          },
        ])
      );
    });

    const checkOrder = (before: Trigger, after: Trigger): void => {
      const indexOfBefore = triggers.findIndex(
        (trigger) => trigger.trigger === before
      );
      const indexOfAfter = triggers.findIndex(
        (trigger) => trigger.trigger === after
      );

      expect(indexOfBefore).toBeLessThan(indexOfAfter);
    };

    it(`lists one time triggers before file triggers`, () => {
      checkOrder(oneTimeTrigger, fileTriggerA);
      checkOrder(oneTimeTrigger, fileTriggerB);
      checkOrder(oneTimeTrigger, fileTriggerC);
    });

    it(`lists file triggers before keyed store triggers`, () => {
      for (const fileTrigger of [fileTriggerA, fileTriggerB, fileTriggerC]) {
        for (const trigger of [
          keyedStoreTrigger,
          keyedStoreTriggerFollowingStoreAggregateTriggerRefreshedViaUnkeyedStore,
          keyedStoreTriggerFollowingStoreAggregateTriggerRefreshedViaKeyedStore,
          keyedStoreTriggerFollowingKeyedStoreTriggerRefreshedViaUnkeyedStore,
          keyedStoreTriggerFollowingKeyedStoreTriggerRefreshedViaKeyedStore,
          keyedStoreTriggerFollowingStoreAggregateTriggerViaKeyedStore,
          keyedStoreTriggerFollowingKeyedStoreTriggerViaKeyedStore,
        ]) {
          checkOrder(fileTrigger, trigger);
        }
      }
    });

    it(`lists file triggers before store aggregate triggers`, () => {
      for (const fileTrigger of [fileTriggerA, fileTriggerB, fileTriggerC]) {
        for (const trigger of [
          storeAggregateTrigger,
          storeAggregateTriggerFollowingStoreAggregateTriggerViaUnkeyedStore,
          storeAggregateTriggerFollowingStoreAggregateTriggerViaKeyedStore,
          storeAggregateTriggerFollowingKeyedStoreTriggerViaUnkeyedStore,
          storeAggregateTriggerFollowingKeyedStoreTriggerViaKeyedStore,
        ]) {
          checkOrder(fileTrigger, trigger);
        }
      }
    });

    it(`lists file triggers in order of complexity`, () => {
      checkOrder(fileTriggerB, fileTriggerC);
      checkOrder(fileTriggerC, fileTriggerA);
    });

    it(`lists keyed store triggers after keyed store triggers which write to their main store`, () => {
      checkOrder(
        keyedStoreTrigger,
        keyedStoreTriggerFollowingKeyedStoreTriggerViaKeyedStore
      );
    });

    it(`lists keyed store triggers after keyed store triggers which write to a keyed store they aggregate`, () => {
      checkOrder(
        keyedStoreTrigger,
        keyedStoreTriggerFollowingKeyedStoreTriggerRefreshedViaKeyedStore
      );
    });

    it(`lists keyed store triggers after keyed store triggers which write to an unkeyed store they aggregate`, () => {
      checkOrder(
        keyedStoreTrigger,
        keyedStoreTriggerFollowingKeyedStoreTriggerRefreshedViaUnkeyedStore
      );
    });

    it(`lists keyed store triggers after store aggregate triggers which write to their main store`, () => {
      checkOrder(
        storeAggregateTrigger,
        keyedStoreTriggerFollowingStoreAggregateTriggerViaKeyedStore
      );
    });

    it(`lists keyed store triggers after store aggregate triggers which write to a keyed store they aggregate`, () => {
      checkOrder(
        storeAggregateTrigger,
        keyedStoreTriggerFollowingStoreAggregateTriggerRefreshedViaKeyedStore
      );
    });

    it(`lists keyed store triggers after store aggregate triggers which write to an unkeyed store they aggregate`, () => {
      checkOrder(
        storeAggregateTrigger,
        keyedStoreTriggerFollowingStoreAggregateTriggerRefreshedViaUnkeyedStore
      );
    });

    it(`lists store aggregate triggers after keyed store triggers which write to an unkeyed store they aggregate`, () => {
      checkOrder(
        keyedStoreTrigger,
        storeAggregateTriggerFollowingKeyedStoreTriggerViaUnkeyedStore
      );
    });

    it(`lists store aggregate triggers after keyed store triggers which write to a keyed store they aggregate`, () => {
      checkOrder(
        keyedStoreTrigger,
        storeAggregateTriggerFollowingKeyedStoreTriggerViaKeyedStore
      );
    });

    it(`lists store aggregate triggers after store aggregate triggers which write to an unkeyed store they aggregate`, () => {
      checkOrder(
        storeAggregateTrigger,
        storeAggregateTriggerFollowingStoreAggregateTriggerViaUnkeyedStore
      );
    });

    it(`lists store aggregate triggers after store aggregate triggers which write to a keyed store they aggregate`, () => {
      checkOrder(
        storeAggregateTrigger,
        storeAggregateTriggerFollowingStoreAggregateTriggerViaKeyedStore
      );
    });

    it(`handles long chains of dependencies correctly`, () => {
      checkOrder(
        keyedStoreTriggerFollowingKeyedStoreTriggerViaKeyedStore,
        keyedStoreTriggerFollowingMultiple
      );
    });

    it(`does not interact with any stores`, () => {
      expect(
        unkeyedStoreWrittenToByStoreAggregateTriggerGet
      ).not.toHaveBeenCalled();
      expect(
        unkeyedStoreWrittenToByStoreAggregateTriggerSet
      ).not.toHaveBeenCalled();
      expect(
        keyedStoreWrittenToByStoreAggregateTriggerGet
      ).not.toHaveBeenCalled();
      expect(
        keyedStoreWrittenToByStoreAggregateTriggerSet
      ).not.toHaveBeenCalled();
      expect(
        keyedStoreWrittenToByStoreAggregateTriggerDelete
      ).not.toHaveBeenCalled();
      expect(
        keyedStoreWrittenToByStoreAggregateTriggerGetAll
      ).not.toHaveBeenCalled();
      expect(
        keyedStoreWrittenToByStoreAggregateTriggerGetKeys
      ).not.toHaveBeenCalled();
      expect(
        unkeyedStoreWrittenToByKeyedStoreTriggerGet
      ).not.toHaveBeenCalled();
      expect(
        unkeyedStoreWrittenToByKeyedStoreTriggerSet
      ).not.toHaveBeenCalled();
      expect(keyedStoreWrittenToByKeyedStoreTriggerGet).not.toHaveBeenCalled();
      expect(keyedStoreWrittenToByKeyedStoreTriggerSet).not.toHaveBeenCalled();
      expect(
        keyedStoreWrittenToByKeyedStoreTriggerDelete
      ).not.toHaveBeenCalled();
      expect(
        keyedStoreWrittenToByKeyedStoreTriggerGetAll
      ).not.toHaveBeenCalled();
      expect(
        keyedStoreWrittenToByKeyedStoreTriggerGetKeys
      ).not.toHaveBeenCalled();
      expect(unwrittenKeyedStoreGet).not.toHaveBeenCalled();
      expect(unwrittenKeyedStoreSet).not.toHaveBeenCalled();
      expect(unwrittenKeyedStoreDelete).not.toHaveBeenCalled();
      expect(unwrittenKeyedStoreGetAll).not.toHaveBeenCalled();
      expect(unwrittenKeyedStoreGetKeys).not.toHaveBeenCalled();
      expect(keyedStoreWrittenToByMultipleGet).not.toHaveBeenCalled();
      expect(keyedStoreWrittenToByMultipleSet).not.toHaveBeenCalled();
      expect(keyedStoreWrittenToByMultipleDelete).not.toHaveBeenCalled();
      expect(keyedStoreWrittenToByMultipleGetAll).not.toHaveBeenCalled();
      expect(keyedStoreWrittenToByMultipleGetKeys).not.toHaveBeenCalled();
    });

    it(`does not interact with any triggers`, () => {
      expect(oneTimeTriggerUp).not.toHaveBeenCalled();
      expect(fileTriggerADown).not.toHaveBeenCalled();
      expect(fileTriggerAUp).not.toHaveBeenCalled();
      expect(fileTriggerBDown).not.toHaveBeenCalled();
      expect(fileTriggerBUp).not.toHaveBeenCalled();
      expect(fileTriggerCDown).not.toHaveBeenCalled();
      expect(fileTriggerCUp).not.toHaveBeenCalled();
      expect(storeAggregateTriggerInvalidated).not.toHaveBeenCalled();
      expect(
        storeAggregateTriggerFollowingStoreAggregateTriggerViaUnkeyedStoreInvalidated
      ).not.toHaveBeenCalled();
      expect(
        storeAggregateTriggerFollowingStoreAggregateTriggerViaKeyedStoreInvalidated
      ).not.toHaveBeenCalled();
      expect(
        storeAggregateTriggerFollowingKeyedStoreTriggerViaUnkeyedStoreInvalidated
      ).not.toHaveBeenCalled();
      expect(
        storeAggregateTriggerFollowingKeyedStoreTriggerViaKeyedStoreInvalidated
      ).not.toHaveBeenCalled();
      expect(keyedStoreTriggerDown).not.toHaveBeenCalled();
      expect(keyedStoreTriggerUp).not.toHaveBeenCalled();
      expect(
        keyedStoreTriggerFollowingStoreAggregateTriggerRefreshedViaUnkeyedStoreDown
      ).not.toHaveBeenCalled();
      expect(
        keyedStoreTriggerFollowingStoreAggregateTriggerRefreshedViaUnkeyedStoreUp
      ).not.toHaveBeenCalled();
      expect(
        keyedStoreTriggerFollowingStoreAggregateTriggerRefreshedViaKeyedStoreDown
      ).not.toHaveBeenCalled();
      expect(
        keyedStoreTriggerFollowingStoreAggregateTriggerRefreshedViaKeyedStoreUp
      ).not.toHaveBeenCalled();
      expect(
        keyedStoreTriggerFollowingKeyedStoreTriggerRefreshedViaUnkeyedStoreDown
      ).not.toHaveBeenCalled();
      expect(
        keyedStoreTriggerFollowingKeyedStoreTriggerRefreshedViaUnkeyedStoreUp
      ).not.toHaveBeenCalled();
      expect(
        keyedStoreTriggerFollowingKeyedStoreTriggerRefreshedViaKeyedStoreDown
      ).not.toHaveBeenCalled();
      expect(
        keyedStoreTriggerFollowingKeyedStoreTriggerRefreshedViaKeyedStoreUp
      ).not.toHaveBeenCalled();
      expect(
        keyedStoreTriggerFollowingStoreAggregateTriggerViaKeyedStoreDown
      ).not.toHaveBeenCalled();
      expect(
        keyedStoreTriggerFollowingStoreAggregateTriggerViaKeyedStoreUp
      ).not.toHaveBeenCalled();
      expect(
        keyedStoreTriggerFollowingKeyedStoreTriggerViaKeyedStoreDown
      ).not.toHaveBeenCalled();
      expect(
        keyedStoreTriggerFollowingKeyedStoreTriggerViaKeyedStoreUp
      ).not.toHaveBeenCalled();
      expect(keyedStoreTriggerFollowingMultipleDown).not.toHaveBeenCalled();
      expect(keyedStoreTriggerFollowingMultipleUp).not.toHaveBeenCalled();
    });
  });

  describe(`when a trigger is dependent upon itself`, () => {
    let unkeyedStoreWrittenToByStoreAggregateTriggerGet: jasmine.Spy;
    let unkeyedStoreWrittenToByStoreAggregateTriggerSet: jasmine.Spy;
    let unkeyedStoreWrittenToByStoreAggregateTrigger: UnkeyedStore<unknown>;
    let keyedStoreWrittenToByStoreAggregateTriggerGet: jasmine.Spy;
    let keyedStoreWrittenToByStoreAggregateTriggerSet: jasmine.Spy;
    let keyedStoreWrittenToByStoreAggregateTriggerDelete: jasmine.Spy;
    let keyedStoreWrittenToByStoreAggregateTriggerGetAll: jasmine.Spy;
    let keyedStoreWrittenToByStoreAggregateTriggerGetKeys: jasmine.Spy;
    let keyedStoreWrittenToByStoreAggregateTrigger: KeyedStore<unknown>;
    let unkeyedStoreWrittenToByKeyedStoreTriggerGet: jasmine.Spy;
    let unkeyedStoreWrittenToByKeyedStoreTriggerSet: jasmine.Spy;
    let unkeyedStoreWrittenToByKeyedStoreTrigger: UnkeyedStore<unknown>;
    let keyedStoreWrittenToByKeyedStoreTriggerGet: jasmine.Spy;
    let keyedStoreWrittenToByKeyedStoreTriggerSet: jasmine.Spy;
    let keyedStoreWrittenToByKeyedStoreTriggerDelete: jasmine.Spy;
    let keyedStoreWrittenToByKeyedStoreTriggerGetAll: jasmine.Spy;
    let keyedStoreWrittenToByKeyedStoreTriggerGetKeys: jasmine.Spy;
    let keyedStoreWrittenToByKeyedStoreTrigger: KeyedStore<unknown>;
    let keyedStoreWrittenToByMultipleGet: jasmine.Spy;
    let keyedStoreWrittenToByMultipleSet: jasmine.Spy;
    let keyedStoreWrittenToByMultipleDelete: jasmine.Spy;
    let keyedStoreWrittenToByMultipleGetAll: jasmine.Spy;
    let keyedStoreWrittenToByMultipleGetKeys: jasmine.Spy;
    let keyedStoreWrittenToByMultiple: KeyedStore<unknown>;
    let unwrittenKeyedStoreGet: jasmine.Spy;
    let unwrittenKeyedStoreSet: jasmine.Spy;
    let unwrittenKeyedStoreDelete: jasmine.Spy;
    let unwrittenKeyedStoreGetAll: jasmine.Spy;
    let unwrittenKeyedStoreGetKeys: jasmine.Spy;
    let unwrittenKeyedStore: KeyedStore<unknown>;
    let oneTimeTriggerUp: jasmine.Spy;
    let oneTimeTrigger: OneTimeTrigger;
    let fileTriggerADown: jasmine.Spy;
    let fileTriggerAUp: jasmine.Spy;
    let fileTriggerA: FileTrigger;
    let fileTriggerBDown: jasmine.Spy;
    let fileTriggerBUp: jasmine.Spy;
    let fileTriggerB: FileTrigger;
    let fileTriggerCDown: jasmine.Spy;
    let fileTriggerCUp: jasmine.Spy;
    let fileTriggerC: FileTrigger;
    let storeAggregateTriggerInvalidated: jasmine.Spy;
    let storeAggregateTrigger: StoreAggregateTrigger;
    let storeAggregateTriggerFollowingStoreAggregateTriggerViaUnkeyedStoreInvalidated: jasmine.Spy;
    let storeAggregateTriggerFollowingStoreAggregateTriggerViaUnkeyedStore: StoreAggregateTrigger;
    let storeAggregateTriggerFollowingStoreAggregateTriggerViaKeyedStoreInvalidated: jasmine.Spy;
    let storeAggregateTriggerFollowingStoreAggregateTriggerViaKeyedStore: StoreAggregateTrigger;
    let storeAggregateTriggerFollowingKeyedStoreTriggerViaUnkeyedStoreInvalidated: jasmine.Spy;
    let storeAggregateTriggerFollowingKeyedStoreTriggerViaUnkeyedStore: StoreAggregateTrigger;
    let storeAggregateTriggerFollowingKeyedStoreTriggerViaKeyedStoreInvalidated: jasmine.Spy;
    let storeAggregateTriggerFollowingKeyedStoreTriggerViaKeyedStore: StoreAggregateTrigger;
    let keyedStoreTriggerDown: jasmine.Spy;
    let keyedStoreTriggerUp: jasmine.Spy;
    let keyedStoreTrigger: KeyedStoreTrigger;
    let keyedStoreTriggerFollowingStoreAggregateTriggerRefreshedViaUnkeyedStoreDown: jasmine.Spy;
    let keyedStoreTriggerFollowingStoreAggregateTriggerRefreshedViaUnkeyedStoreUp: jasmine.Spy;
    let keyedStoreTriggerFollowingStoreAggregateTriggerRefreshedViaUnkeyedStore: KeyedStoreTrigger;
    let keyedStoreTriggerFollowingStoreAggregateTriggerRefreshedViaKeyedStoreDown: jasmine.Spy;
    let keyedStoreTriggerFollowingStoreAggregateTriggerRefreshedViaKeyedStoreUp: jasmine.Spy;
    let keyedStoreTriggerFollowingStoreAggregateTriggerRefreshedViaKeyedStore: KeyedStoreTrigger;
    let keyedStoreTriggerFollowingKeyedStoreTriggerRefreshedViaUnkeyedStoreDown: jasmine.Spy;
    let keyedStoreTriggerFollowingKeyedStoreTriggerRefreshedViaUnkeyedStoreUp: jasmine.Spy;
    let keyedStoreTriggerFollowingKeyedStoreTriggerRefreshedViaUnkeyedStore: KeyedStoreTrigger;
    let keyedStoreTriggerFollowingKeyedStoreTriggerRefreshedViaKeyedStoreDown: jasmine.Spy;
    let keyedStoreTriggerFollowingKeyedStoreTriggerRefreshedViaKeyedStoreUp: jasmine.Spy;
    let keyedStoreTriggerFollowingKeyedStoreTriggerRefreshedViaKeyedStore: KeyedStoreTrigger;
    let keyedStoreTriggerFollowingStoreAggregateTriggerViaKeyedStoreDown: jasmine.Spy;
    let keyedStoreTriggerFollowingStoreAggregateTriggerViaKeyedStoreUp: jasmine.Spy;
    let keyedStoreTriggerFollowingStoreAggregateTriggerViaKeyedStore: KeyedStoreTrigger;
    let keyedStoreTriggerFollowingKeyedStoreTriggerViaKeyedStoreDown: jasmine.Spy;
    let keyedStoreTriggerFollowingKeyedStoreTriggerViaKeyedStoreUp: jasmine.Spy;
    let keyedStoreTriggerFollowingKeyedStoreTriggerViaKeyedStore: KeyedStoreTrigger;
    let keyedStoreTriggerFollowingMultipleDown: jasmine.Spy;
    let keyedStoreTriggerFollowingMultipleUp: jasmine.Spy;
    let keyedStoreTriggerFollowingMultiple: KeyedStoreTrigger;
    let error: unknown;

    beforeAll(() => {
      unkeyedStoreWrittenToByStoreAggregateTriggerGet = jasmine.createSpy(
        `unkeyedStoreWrittenToByStoreAggregateTriggerGet`
      );
      unkeyedStoreWrittenToByStoreAggregateTriggerSet = jasmine.createSpy(
        `unkeyedStoreWrittenToByStoreAggregateTriggerSet`
      );
      unkeyedStoreWrittenToByStoreAggregateTrigger = {
        type: `unkeyedStore`,
        name: `unkeyedStoreWrittenToByStoreAggregateTrigger`,
        get: unkeyedStoreWrittenToByStoreAggregateTriggerGet,
        set: unkeyedStoreWrittenToByStoreAggregateTriggerSet,
      };
      keyedStoreWrittenToByStoreAggregateTriggerGet = jasmine.createSpy(
        `keyedStoreWrittenToByStoreAggregateTriggerGet`
      );
      keyedStoreWrittenToByStoreAggregateTriggerSet = jasmine.createSpy(
        `keyedStoreWrittenToByStoreAggregateTriggerSet`
      );
      keyedStoreWrittenToByStoreAggregateTriggerDelete = jasmine.createSpy(
        `keyedStoreWrittenToByStoreAggregateTriggerDelete`
      );
      keyedStoreWrittenToByStoreAggregateTriggerGetAll = jasmine.createSpy(
        `keyedStoreWrittenToByStoreAggregateTriggerGetAll`
      );
      keyedStoreWrittenToByStoreAggregateTriggerGetKeys = jasmine.createSpy(
        `keyedStoreWrittenToByStoreAggregateTriggerGetKeys`
      );
      keyedStoreWrittenToByStoreAggregateTrigger = {
        type: `keyedStore`,
        name: `keyedStoreWrittenToByStoreAggregateTrigger`,
        get: keyedStoreWrittenToByStoreAggregateTriggerGet,
        set: keyedStoreWrittenToByStoreAggregateTriggerSet,
        delete: keyedStoreWrittenToByStoreAggregateTriggerDelete,
        getAll: keyedStoreWrittenToByStoreAggregateTriggerGetAll,
        getKeys: keyedStoreWrittenToByStoreAggregateTriggerGetKeys,
      };
      unkeyedStoreWrittenToByKeyedStoreTriggerGet = jasmine.createSpy(
        `unkeyedStoreWrittenToByKeyedStoreTriggerGet`
      );
      unkeyedStoreWrittenToByKeyedStoreTriggerSet = jasmine.createSpy(
        `unkeyedStoreWrittenToByKeyedStoreTriggerSet`
      );
      unkeyedStoreWrittenToByKeyedStoreTrigger = {
        type: `unkeyedStore`,
        name: `unkeyedStoreWrittenToByKeyedStoreTrigger`,
        get: unkeyedStoreWrittenToByKeyedStoreTriggerGet,
        set: unkeyedStoreWrittenToByKeyedStoreTriggerSet,
      };
      keyedStoreWrittenToByKeyedStoreTriggerGet = jasmine.createSpy(
        `keyedStoreWrittenToByKeyedStoreTriggerGet`
      );
      keyedStoreWrittenToByKeyedStoreTriggerSet = jasmine.createSpy(
        `keyedStoreWrittenToByKeyedStoreTriggerSet`
      );
      keyedStoreWrittenToByKeyedStoreTriggerDelete = jasmine.createSpy(
        `keyedStoreWrittenToByKeyedStoreTriggerDelete`
      );
      keyedStoreWrittenToByKeyedStoreTriggerGetAll = jasmine.createSpy(
        `keyedStoreWrittenToByKeyedStoreTriggerGetAll`
      );
      keyedStoreWrittenToByKeyedStoreTriggerGetKeys = jasmine.createSpy(
        `keyedStoreWrittenToByKeyedStoreTriggerGetKeys`
      );
      keyedStoreWrittenToByKeyedStoreTrigger = {
        type: `keyedStore`,
        name: `keyedStoreWrittenToByKeyedStoreTrigger`,
        get: keyedStoreWrittenToByKeyedStoreTriggerGet,
        set: keyedStoreWrittenToByKeyedStoreTriggerSet,
        delete: keyedStoreWrittenToByKeyedStoreTriggerDelete,
        getAll: keyedStoreWrittenToByKeyedStoreTriggerGetAll,
        getKeys: keyedStoreWrittenToByKeyedStoreTriggerGetKeys,
      };
      keyedStoreWrittenToByMultipleGet = jasmine.createSpy(
        `keyedStoreWrittenToByMultipleGet`
      );
      keyedStoreWrittenToByMultipleSet = jasmine.createSpy(
        `keyedStoreWrittenToByMultipleSet`
      );
      keyedStoreWrittenToByMultipleDelete = jasmine.createSpy(
        `keyedStoreWrittenToByMultipleDelete`
      );
      keyedStoreWrittenToByMultipleGetAll = jasmine.createSpy(
        `keyedStoreWrittenToByMultipleGetAll`
      );
      keyedStoreWrittenToByMultipleGetKeys = jasmine.createSpy(
        `keyedStoreWrittenToByMultipleGetKeys`
      );
      keyedStoreWrittenToByMultiple = {
        type: `keyedStore`,
        name: `keyedStoreWrittenToByMultiple`,
        get: keyedStoreWrittenToByMultipleGet,
        set: keyedStoreWrittenToByMultipleSet,
        delete: keyedStoreWrittenToByMultipleDelete,
        getAll: keyedStoreWrittenToByMultipleGetAll,
        getKeys: keyedStoreWrittenToByMultipleGetKeys,
      };
      unwrittenKeyedStoreGet = jasmine.createSpy(`unwrittenKeyedStoreGet`);
      unwrittenKeyedStoreSet = jasmine.createSpy(`unwrittenKeyedStoreSet`);
      unwrittenKeyedStoreDelete = jasmine.createSpy(
        `unwrittenKeyedStoreDelete`
      );
      unwrittenKeyedStoreGetAll = jasmine.createSpy(
        `unwrittenKeyedStoreGetAll`
      );
      unwrittenKeyedStoreGetKeys = jasmine.createSpy(
        `unwrittenKeyedStoreGetKeys`
      );
      unwrittenKeyedStore = {
        type: `keyedStore`,
        name: `unwrittenKeyedStore`,
        get: unwrittenKeyedStoreGet,
        set: unwrittenKeyedStoreSet,
        delete: unwrittenKeyedStoreDelete,
        getAll: unwrittenKeyedStoreGetAll,
        getKeys: unwrittenKeyedStoreGetKeys,
      };
      oneTimeTriggerUp = jasmine.createSpy(`oneTimeTriggerUp`);
      oneTimeTrigger = {
        type: `oneTime`,
        up: oneTimeTriggerUp,
        writesToStores: [],
      };
      fileTriggerADown = jasmine.createSpy(`fileTriggerADown`);
      fileTriggerAUp = jasmine.createSpy(`fileTriggerAUp`);
      fileTriggerA = {
        type: `file`,
        glob: `**/*.*`,
        down: fileTriggerADown,
        up: fileTriggerAUp,
        writesToStores: [],
      };
      fileTriggerBDown = jasmine.createSpy(`fileTriggerBDown`);
      fileTriggerBUp = jasmine.createSpy(`fileTriggerBUp`);
      fileTriggerB = {
        type: `file`,
        glob: `some-file.*`,
        down: fileTriggerBDown,
        up: fileTriggerBUp,
        writesToStores: [],
      };
      fileTriggerCDown = jasmine.createSpy(`fileTriggerCDown`);
      fileTriggerCUp = jasmine.createSpy(`fileTriggerCUp`);
      fileTriggerC = {
        type: `file`,
        glob: `matched/**/added/*`,
        down: fileTriggerCDown,
        up: fileTriggerCUp,
        writesToStores: [],
      };
      storeAggregateTriggerInvalidated = jasmine.createSpy(
        `storeAggregateTriggerInvalidated`
      );
      storeAggregateTrigger = {
        type: `storeAggregate`,
        stores: [],
        invalidated: storeAggregateTriggerInvalidated,
        writesToStores: [
          keyedStoreWrittenToByStoreAggregateTrigger,
          unkeyedStoreWrittenToByStoreAggregateTrigger,
        ],
      };
      storeAggregateTriggerFollowingStoreAggregateTriggerViaUnkeyedStoreInvalidated =
        jasmine.createSpy(
          `storeAggregateTriggerFollowingStoreAggregateTriggerViaUnkeyedStoreInvalidated`
        );
      storeAggregateTriggerFollowingStoreAggregateTriggerViaUnkeyedStore = {
        type: `storeAggregate`,
        stores: [unkeyedStoreWrittenToByStoreAggregateTrigger],
        invalidated:
          storeAggregateTriggerFollowingStoreAggregateTriggerViaUnkeyedStoreInvalidated,
        writesToStores: [],
      };
      storeAggregateTriggerFollowingStoreAggregateTriggerViaKeyedStoreInvalidated =
        jasmine.createSpy(
          `storeAggregateTriggerFollowingStoreAggregateTriggerViaKeyedStoreInvalidated`
        );
      storeAggregateTriggerFollowingStoreAggregateTriggerViaKeyedStore = {
        type: `storeAggregate`,
        stores: [keyedStoreWrittenToByStoreAggregateTrigger],
        invalidated:
          storeAggregateTriggerFollowingStoreAggregateTriggerViaKeyedStoreInvalidated,
        writesToStores: [],
      };
      storeAggregateTriggerFollowingKeyedStoreTriggerViaUnkeyedStoreInvalidated =
        jasmine.createSpy(
          `storeAggregateTriggerFollowingKeyedStoreTriggerViaUnkeyedStoreInvalidated`
        );
      storeAggregateTriggerFollowingKeyedStoreTriggerViaUnkeyedStore = {
        type: `storeAggregate`,
        stores: [unkeyedStoreWrittenToByKeyedStoreTrigger],
        invalidated:
          storeAggregateTriggerFollowingKeyedStoreTriggerViaUnkeyedStoreInvalidated,
        writesToStores: [],
      };
      storeAggregateTriggerFollowingKeyedStoreTriggerViaKeyedStoreInvalidated =
        jasmine.createSpy(
          `storeAggregateTriggerFollowingKeyedStoreTriggerViaKeyedStoreInvalidated`
        );
      storeAggregateTriggerFollowingKeyedStoreTriggerViaKeyedStore = {
        type: `storeAggregate`,
        stores: [keyedStoreWrittenToByKeyedStoreTrigger],
        invalidated:
          storeAggregateTriggerFollowingKeyedStoreTriggerViaKeyedStoreInvalidated,
        writesToStores: [],
      };
      keyedStoreTriggerDown = jasmine.createSpy(`keyedStoreTriggerDown`);
      keyedStoreTriggerUp = jasmine.createSpy(`keyedStoreTriggerUp`);
      keyedStoreTrigger = {
        type: `keyedStore`,
        keyedStore: unwrittenKeyedStore,
        refreshAllWhenStoresChange: [],
        down: keyedStoreTriggerDown,
        up: keyedStoreTriggerUp,
        writesToStores: [
          keyedStoreWrittenToByKeyedStoreTrigger,
          unkeyedStoreWrittenToByKeyedStoreTrigger,
        ],
      };
      keyedStoreTriggerFollowingStoreAggregateTriggerRefreshedViaUnkeyedStoreDown =
        jasmine.createSpy(
          `keyedStoreTriggerFollowingStoreAggregateTriggerRefreshedViaUnkeyedStoreDown`
        );
      keyedStoreTriggerFollowingStoreAggregateTriggerRefreshedViaUnkeyedStoreUp =
        jasmine.createSpy(
          `keyedStoreTriggerFollowingStoreAggregateTriggerRefreshedViaUnkeyedStoreUp`
        );
      keyedStoreTriggerFollowingStoreAggregateTriggerRefreshedViaUnkeyedStore =
        {
          type: `keyedStore`,
          keyedStore: unwrittenKeyedStore,
          refreshAllWhenStoresChange: [
            unkeyedStoreWrittenToByStoreAggregateTrigger,
          ],
          down: keyedStoreTriggerFollowingStoreAggregateTriggerRefreshedViaUnkeyedStoreDown,
          up: keyedStoreTriggerFollowingStoreAggregateTriggerRefreshedViaUnkeyedStoreUp,
          writesToStores: [],
        };
      keyedStoreTriggerFollowingStoreAggregateTriggerRefreshedViaKeyedStoreDown =
        jasmine.createSpy(
          `keyedStoreTriggerFollowingStoreAggregateTriggerRefreshedViaKeyedStoreDown`
        );
      keyedStoreTriggerFollowingStoreAggregateTriggerRefreshedViaKeyedStoreUp =
        jasmine.createSpy(
          `keyedStoreTriggerFollowingStoreAggregateTriggerRefreshedViaKeyedStoreUp`
        );
      keyedStoreTriggerFollowingStoreAggregateTriggerRefreshedViaKeyedStore = {
        type: `keyedStore`,
        keyedStore: unwrittenKeyedStore,
        refreshAllWhenStoresChange: [
          keyedStoreWrittenToByStoreAggregateTrigger,
        ],
        down: keyedStoreTriggerFollowingStoreAggregateTriggerRefreshedViaKeyedStoreDown,
        up: keyedStoreTriggerFollowingStoreAggregateTriggerRefreshedViaKeyedStoreUp,
        writesToStores: [],
      };
      keyedStoreTriggerFollowingKeyedStoreTriggerRefreshedViaUnkeyedStoreDown =
        jasmine.createSpy(
          `keyedStoreTriggerFollowingKeyedStoreTriggerRefreshedViaUnkeyedStoreDown`
        );
      keyedStoreTriggerFollowingKeyedStoreTriggerRefreshedViaUnkeyedStoreUp =
        jasmine.createSpy(
          `keyedStoreTriggerFollowingKeyedStoreTriggerRefreshedViaUnkeyedStoreUp`
        );
      keyedStoreTriggerFollowingKeyedStoreTriggerRefreshedViaUnkeyedStore = {
        type: `keyedStore`,
        keyedStore: unwrittenKeyedStore,
        refreshAllWhenStoresChange: [unkeyedStoreWrittenToByKeyedStoreTrigger],
        down: keyedStoreTriggerFollowingKeyedStoreTriggerRefreshedViaUnkeyedStoreDown,
        up: keyedStoreTriggerFollowingKeyedStoreTriggerRefreshedViaUnkeyedStoreUp,
        writesToStores: [unwrittenKeyedStore],
      };
      keyedStoreTriggerFollowingKeyedStoreTriggerRefreshedViaKeyedStoreDown =
        jasmine.createSpy(
          `keyedStoreTriggerFollowingKeyedStoreTriggerRefreshedViaKeyedStoreDown`
        );
      keyedStoreTriggerFollowingKeyedStoreTriggerRefreshedViaKeyedStoreUp =
        jasmine.createSpy(
          `keyedStoreTriggerFollowingKeyedStoreTriggerRefreshedViaKeyedStoreUp`
        );
      keyedStoreTriggerFollowingKeyedStoreTriggerRefreshedViaKeyedStore = {
        type: `keyedStore`,
        keyedStore: unwrittenKeyedStore,
        refreshAllWhenStoresChange: [keyedStoreWrittenToByKeyedStoreTrigger],
        down: keyedStoreTriggerFollowingKeyedStoreTriggerRefreshedViaKeyedStoreDown,
        up: keyedStoreTriggerFollowingKeyedStoreTriggerRefreshedViaKeyedStoreUp,
        writesToStores: [],
      };
      keyedStoreTriggerFollowingStoreAggregateTriggerViaKeyedStoreDown =
        jasmine.createSpy(
          `keyedStoreTriggerFollowingStoreAggregateTriggerViaKeyedStoreDown`
        );
      keyedStoreTriggerFollowingStoreAggregateTriggerViaKeyedStoreUp =
        jasmine.createSpy(
          `keyedStoreTriggerFollowingStoreAggregateTriggerViaKeyedStoreUp`
        );
      keyedStoreTriggerFollowingStoreAggregateTriggerViaKeyedStore = {
        type: `keyedStore`,
        keyedStore: keyedStoreWrittenToByStoreAggregateTrigger,
        refreshAllWhenStoresChange: [],
        down: keyedStoreTriggerFollowingStoreAggregateTriggerViaKeyedStoreDown,
        up: keyedStoreTriggerFollowingStoreAggregateTriggerViaKeyedStoreUp,
        writesToStores: [],
      };
      keyedStoreTriggerFollowingKeyedStoreTriggerViaKeyedStoreDown =
        jasmine.createSpy(
          `keyedStoreTriggerFollowingKeyedStoreTriggerViaKeyedStoreDown`
        );
      keyedStoreTriggerFollowingKeyedStoreTriggerViaKeyedStoreUp =
        jasmine.createSpy(
          `keyedStoreTriggerFollowingKeyedStoreTriggerViaKeyedStoreUp`
        );
      keyedStoreTriggerFollowingKeyedStoreTriggerViaKeyedStore = {
        type: `keyedStore`,
        keyedStore: keyedStoreWrittenToByKeyedStoreTrigger,
        refreshAllWhenStoresChange: [],
        down: keyedStoreTriggerFollowingKeyedStoreTriggerViaKeyedStoreDown,
        up: keyedStoreTriggerFollowingKeyedStoreTriggerViaKeyedStoreUp,
        writesToStores: [keyedStoreWrittenToByMultiple],
      };
      keyedStoreTriggerFollowingMultipleDown = jasmine.createSpy(
        `keyedStoreTriggerFollowingMultipleDown`
      );
      keyedStoreTriggerFollowingMultipleUp = jasmine.createSpy(
        `keyedStoreTriggerFollowingMultipleUp`
      );
      keyedStoreTriggerFollowingMultiple = {
        type: `keyedStore`,
        keyedStore: keyedStoreWrittenToByMultiple,
        refreshAllWhenStoresChange: [],
        down: keyedStoreTriggerFollowingMultipleDown,
        up: keyedStoreTriggerFollowingMultipleUp,
        writesToStores: [],
      };

      try {
        listTriggers({
          testPluginA: {
            triggers: {
              keyedStoreTriggerFollowingMultiple,
              keyedStoreTriggerFollowingKeyedStoreTriggerViaKeyedStore,
              storeAggregateTriggerFollowingKeyedStoreTriggerViaUnkeyedStore,
              storeAggregateTriggerFollowingKeyedStoreTriggerViaKeyedStore,
              keyedStoreTrigger,
              keyedStoreTriggerFollowingStoreAggregateTriggerRefreshedViaUnkeyedStore,
              fileTriggerC,
              storeAggregateTrigger,
              keyedStoreTriggerFollowingStoreAggregateTriggerViaKeyedStore,
            },
          },
          testPluginB: {
            triggers: {
              keyedStoreTriggerFollowingStoreAggregateTriggerRefreshedViaKeyedStore,
              oneTimeTrigger,
              fileTriggerA,
              fileTriggerB,
            },
          },
          testPluginC: {
            triggers: {
              storeAggregateTriggerFollowingStoreAggregateTriggerViaUnkeyedStore,
              storeAggregateTriggerFollowingStoreAggregateTriggerViaKeyedStore,
              keyedStoreTriggerFollowingKeyedStoreTriggerRefreshedViaUnkeyedStore,
              keyedStoreTriggerFollowingKeyedStoreTriggerRefreshedViaKeyedStore,
            },
          },
        });

        error = null;
      } catch (e) {
        error = e;
      }
    });

    it(`throws the expected error`, () => {
      expect(error).toEqual(
        new Error(
          `The triggers of the installed plugins form a cyclic dependency (a trigger is dependent upon one or more stores it directly or indirectly writes to).`
        )
      );
    });

    it(`does not interact with any stores`, () => {
      expect(
        unkeyedStoreWrittenToByStoreAggregateTriggerGet
      ).not.toHaveBeenCalled();
      expect(
        unkeyedStoreWrittenToByStoreAggregateTriggerSet
      ).not.toHaveBeenCalled();
      expect(
        keyedStoreWrittenToByStoreAggregateTriggerGet
      ).not.toHaveBeenCalled();
      expect(
        keyedStoreWrittenToByStoreAggregateTriggerSet
      ).not.toHaveBeenCalled();
      expect(
        keyedStoreWrittenToByStoreAggregateTriggerDelete
      ).not.toHaveBeenCalled();
      expect(
        keyedStoreWrittenToByStoreAggregateTriggerGetAll
      ).not.toHaveBeenCalled();
      expect(
        keyedStoreWrittenToByStoreAggregateTriggerGetKeys
      ).not.toHaveBeenCalled();
      expect(
        unkeyedStoreWrittenToByKeyedStoreTriggerGet
      ).not.toHaveBeenCalled();
      expect(
        unkeyedStoreWrittenToByKeyedStoreTriggerSet
      ).not.toHaveBeenCalled();
      expect(keyedStoreWrittenToByKeyedStoreTriggerGet).not.toHaveBeenCalled();
      expect(keyedStoreWrittenToByKeyedStoreTriggerSet).not.toHaveBeenCalled();
      expect(
        keyedStoreWrittenToByKeyedStoreTriggerDelete
      ).not.toHaveBeenCalled();
      expect(
        keyedStoreWrittenToByKeyedStoreTriggerGetAll
      ).not.toHaveBeenCalled();
      expect(
        keyedStoreWrittenToByKeyedStoreTriggerGetKeys
      ).not.toHaveBeenCalled();
      expect(unwrittenKeyedStoreGet).not.toHaveBeenCalled();
      expect(unwrittenKeyedStoreSet).not.toHaveBeenCalled();
      expect(unwrittenKeyedStoreDelete).not.toHaveBeenCalled();
      expect(unwrittenKeyedStoreGetAll).not.toHaveBeenCalled();
      expect(unwrittenKeyedStoreGetKeys).not.toHaveBeenCalled();
      expect(keyedStoreWrittenToByMultipleGet).not.toHaveBeenCalled();
      expect(keyedStoreWrittenToByMultipleSet).not.toHaveBeenCalled();
      expect(keyedStoreWrittenToByMultipleDelete).not.toHaveBeenCalled();
      expect(keyedStoreWrittenToByMultipleGetAll).not.toHaveBeenCalled();
      expect(keyedStoreWrittenToByMultipleGetKeys).not.toHaveBeenCalled();
    });

    it(`does not interact with any triggers`, () => {
      expect(oneTimeTriggerUp).not.toHaveBeenCalled();
      expect(fileTriggerADown).not.toHaveBeenCalled();
      expect(fileTriggerAUp).not.toHaveBeenCalled();
      expect(fileTriggerBDown).not.toHaveBeenCalled();
      expect(fileTriggerBUp).not.toHaveBeenCalled();
      expect(fileTriggerCDown).not.toHaveBeenCalled();
      expect(fileTriggerCUp).not.toHaveBeenCalled();
      expect(storeAggregateTriggerInvalidated).not.toHaveBeenCalled();
      expect(
        storeAggregateTriggerFollowingStoreAggregateTriggerViaUnkeyedStoreInvalidated
      ).not.toHaveBeenCalled();
      expect(
        storeAggregateTriggerFollowingStoreAggregateTriggerViaKeyedStoreInvalidated
      ).not.toHaveBeenCalled();
      expect(
        storeAggregateTriggerFollowingKeyedStoreTriggerViaUnkeyedStoreInvalidated
      ).not.toHaveBeenCalled();
      expect(
        storeAggregateTriggerFollowingKeyedStoreTriggerViaKeyedStoreInvalidated
      ).not.toHaveBeenCalled();
      expect(keyedStoreTriggerDown).not.toHaveBeenCalled();
      expect(keyedStoreTriggerUp).not.toHaveBeenCalled();
      expect(
        keyedStoreTriggerFollowingStoreAggregateTriggerRefreshedViaUnkeyedStoreDown
      ).not.toHaveBeenCalled();
      expect(
        keyedStoreTriggerFollowingStoreAggregateTriggerRefreshedViaUnkeyedStoreUp
      ).not.toHaveBeenCalled();
      expect(
        keyedStoreTriggerFollowingStoreAggregateTriggerRefreshedViaKeyedStoreDown
      ).not.toHaveBeenCalled();
      expect(
        keyedStoreTriggerFollowingStoreAggregateTriggerRefreshedViaKeyedStoreUp
      ).not.toHaveBeenCalled();
      expect(
        keyedStoreTriggerFollowingKeyedStoreTriggerRefreshedViaUnkeyedStoreDown
      ).not.toHaveBeenCalled();
      expect(
        keyedStoreTriggerFollowingKeyedStoreTriggerRefreshedViaUnkeyedStoreUp
      ).not.toHaveBeenCalled();
      expect(
        keyedStoreTriggerFollowingKeyedStoreTriggerRefreshedViaKeyedStoreDown
      ).not.toHaveBeenCalled();
      expect(
        keyedStoreTriggerFollowingKeyedStoreTriggerRefreshedViaKeyedStoreUp
      ).not.toHaveBeenCalled();
      expect(
        keyedStoreTriggerFollowingStoreAggregateTriggerViaKeyedStoreDown
      ).not.toHaveBeenCalled();
      expect(
        keyedStoreTriggerFollowingStoreAggregateTriggerViaKeyedStoreUp
      ).not.toHaveBeenCalled();
      expect(
        keyedStoreTriggerFollowingKeyedStoreTriggerViaKeyedStoreDown
      ).not.toHaveBeenCalled();
      expect(
        keyedStoreTriggerFollowingKeyedStoreTriggerViaKeyedStoreUp
      ).not.toHaveBeenCalled();
      expect(keyedStoreTriggerFollowingMultipleDown).not.toHaveBeenCalled();
      expect(keyedStoreTriggerFollowingMultipleUp).not.toHaveBeenCalled();
    });
  });

  describe(`when two triggers are interdependent`, () => {
    let unkeyedStoreWrittenToByStoreAggregateTriggerGet: jasmine.Spy;
    let unkeyedStoreWrittenToByStoreAggregateTriggerSet: jasmine.Spy;
    let unkeyedStoreWrittenToByStoreAggregateTrigger: UnkeyedStore<unknown>;
    let keyedStoreWrittenToByStoreAggregateTriggerGet: jasmine.Spy;
    let keyedStoreWrittenToByStoreAggregateTriggerSet: jasmine.Spy;
    let keyedStoreWrittenToByStoreAggregateTriggerDelete: jasmine.Spy;
    let keyedStoreWrittenToByStoreAggregateTriggerGetAll: jasmine.Spy;
    let keyedStoreWrittenToByStoreAggregateTriggerGetKeys: jasmine.Spy;
    let keyedStoreWrittenToByStoreAggregateTrigger: KeyedStore<unknown>;
    let unkeyedStoreWrittenToByKeyedStoreTriggerGet: jasmine.Spy;
    let unkeyedStoreWrittenToByKeyedStoreTriggerSet: jasmine.Spy;
    let unkeyedStoreWrittenToByKeyedStoreTrigger: UnkeyedStore<unknown>;
    let keyedStoreWrittenToByKeyedStoreTriggerGet: jasmine.Spy;
    let keyedStoreWrittenToByKeyedStoreTriggerSet: jasmine.Spy;
    let keyedStoreWrittenToByKeyedStoreTriggerDelete: jasmine.Spy;
    let keyedStoreWrittenToByKeyedStoreTriggerGetAll: jasmine.Spy;
    let keyedStoreWrittenToByKeyedStoreTriggerGetKeys: jasmine.Spy;
    let keyedStoreWrittenToByKeyedStoreTrigger: KeyedStore<unknown>;
    let keyedStoreWrittenToByMultipleGet: jasmine.Spy;
    let keyedStoreWrittenToByMultipleSet: jasmine.Spy;
    let keyedStoreWrittenToByMultipleDelete: jasmine.Spy;
    let keyedStoreWrittenToByMultipleGetAll: jasmine.Spy;
    let keyedStoreWrittenToByMultipleGetKeys: jasmine.Spy;
    let keyedStoreWrittenToByMultiple: KeyedStore<unknown>;
    let unwrittenKeyedStoreGet: jasmine.Spy;
    let unwrittenKeyedStoreSet: jasmine.Spy;
    let unwrittenKeyedStoreDelete: jasmine.Spy;
    let unwrittenKeyedStoreGetAll: jasmine.Spy;
    let unwrittenKeyedStoreGetKeys: jasmine.Spy;
    let unwrittenKeyedStore: KeyedStore<unknown>;
    let oneTimeTriggerUp: jasmine.Spy;
    let oneTimeTrigger: OneTimeTrigger;
    let fileTriggerADown: jasmine.Spy;
    let fileTriggerAUp: jasmine.Spy;
    let fileTriggerA: FileTrigger;
    let fileTriggerBDown: jasmine.Spy;
    let fileTriggerBUp: jasmine.Spy;
    let fileTriggerB: FileTrigger;
    let fileTriggerCDown: jasmine.Spy;
    let fileTriggerCUp: jasmine.Spy;
    let fileTriggerC: FileTrigger;
    let storeAggregateTriggerInvalidated: jasmine.Spy;
    let storeAggregateTrigger: StoreAggregateTrigger;
    let storeAggregateTriggerFollowingStoreAggregateTriggerViaUnkeyedStoreInvalidated: jasmine.Spy;
    let storeAggregateTriggerFollowingStoreAggregateTriggerViaUnkeyedStore: StoreAggregateTrigger;
    let storeAggregateTriggerFollowingStoreAggregateTriggerViaKeyedStoreInvalidated: jasmine.Spy;
    let storeAggregateTriggerFollowingStoreAggregateTriggerViaKeyedStore: StoreAggregateTrigger;
    let storeAggregateTriggerFollowingKeyedStoreTriggerViaUnkeyedStoreInvalidated: jasmine.Spy;
    let storeAggregateTriggerFollowingKeyedStoreTriggerViaUnkeyedStore: StoreAggregateTrigger;
    let storeAggregateTriggerFollowingKeyedStoreTriggerViaKeyedStoreInvalidated: jasmine.Spy;
    let storeAggregateTriggerFollowingKeyedStoreTriggerViaKeyedStore: StoreAggregateTrigger;
    let keyedStoreTriggerDown: jasmine.Spy;
    let keyedStoreTriggerUp: jasmine.Spy;
    let keyedStoreTrigger: KeyedStoreTrigger;
    let keyedStoreTriggerFollowingStoreAggregateTriggerRefreshedViaUnkeyedStoreDown: jasmine.Spy;
    let keyedStoreTriggerFollowingStoreAggregateTriggerRefreshedViaUnkeyedStoreUp: jasmine.Spy;
    let keyedStoreTriggerFollowingStoreAggregateTriggerRefreshedViaUnkeyedStore: KeyedStoreTrigger;
    let keyedStoreTriggerFollowingStoreAggregateTriggerRefreshedViaKeyedStoreDown: jasmine.Spy;
    let keyedStoreTriggerFollowingStoreAggregateTriggerRefreshedViaKeyedStoreUp: jasmine.Spy;
    let keyedStoreTriggerFollowingStoreAggregateTriggerRefreshedViaKeyedStore: KeyedStoreTrigger;
    let keyedStoreTriggerFollowingKeyedStoreTriggerRefreshedViaUnkeyedStoreDown: jasmine.Spy;
    let keyedStoreTriggerFollowingKeyedStoreTriggerRefreshedViaUnkeyedStoreUp: jasmine.Spy;
    let keyedStoreTriggerFollowingKeyedStoreTriggerRefreshedViaUnkeyedStore: KeyedStoreTrigger;
    let keyedStoreTriggerFollowingKeyedStoreTriggerRefreshedViaKeyedStoreDown: jasmine.Spy;
    let keyedStoreTriggerFollowingKeyedStoreTriggerRefreshedViaKeyedStoreUp: jasmine.Spy;
    let keyedStoreTriggerFollowingKeyedStoreTriggerRefreshedViaKeyedStore: KeyedStoreTrigger;
    let keyedStoreTriggerFollowingStoreAggregateTriggerViaKeyedStoreDown: jasmine.Spy;
    let keyedStoreTriggerFollowingStoreAggregateTriggerViaKeyedStoreUp: jasmine.Spy;
    let keyedStoreTriggerFollowingStoreAggregateTriggerViaKeyedStore: KeyedStoreTrigger;
    let keyedStoreTriggerFollowingKeyedStoreTriggerViaKeyedStoreDown: jasmine.Spy;
    let keyedStoreTriggerFollowingKeyedStoreTriggerViaKeyedStoreUp: jasmine.Spy;
    let keyedStoreTriggerFollowingKeyedStoreTriggerViaKeyedStore: KeyedStoreTrigger;
    let keyedStoreTriggerFollowingMultipleDown: jasmine.Spy;
    let keyedStoreTriggerFollowingMultipleUp: jasmine.Spy;
    let keyedStoreTriggerFollowingMultiple: KeyedStoreTrigger;
    let error: unknown;

    beforeAll(() => {
      unkeyedStoreWrittenToByStoreAggregateTriggerGet = jasmine.createSpy(
        `unkeyedStoreWrittenToByStoreAggregateTriggerGet`
      );
      unkeyedStoreWrittenToByStoreAggregateTriggerSet = jasmine.createSpy(
        `unkeyedStoreWrittenToByStoreAggregateTriggerSet`
      );
      unkeyedStoreWrittenToByStoreAggregateTrigger = {
        type: `unkeyedStore`,
        name: `unkeyedStoreWrittenToByStoreAggregateTrigger`,
        get: unkeyedStoreWrittenToByStoreAggregateTriggerGet,
        set: unkeyedStoreWrittenToByStoreAggregateTriggerSet,
      };
      keyedStoreWrittenToByStoreAggregateTriggerGet = jasmine.createSpy(
        `keyedStoreWrittenToByStoreAggregateTriggerGet`
      );
      keyedStoreWrittenToByStoreAggregateTriggerSet = jasmine.createSpy(
        `keyedStoreWrittenToByStoreAggregateTriggerSet`
      );
      keyedStoreWrittenToByStoreAggregateTriggerDelete = jasmine.createSpy(
        `keyedStoreWrittenToByStoreAggregateTriggerDelete`
      );
      keyedStoreWrittenToByStoreAggregateTriggerGetAll = jasmine.createSpy(
        `keyedStoreWrittenToByStoreAggregateTriggerGetAll`
      );
      keyedStoreWrittenToByStoreAggregateTriggerGetKeys = jasmine.createSpy(
        `keyedStoreWrittenToByStoreAggregateTriggerGetKeys`
      );
      keyedStoreWrittenToByStoreAggregateTrigger = {
        type: `keyedStore`,
        name: `keyedStoreWrittenToByStoreAggregateTrigger`,
        get: keyedStoreWrittenToByStoreAggregateTriggerGet,
        set: keyedStoreWrittenToByStoreAggregateTriggerSet,
        delete: keyedStoreWrittenToByStoreAggregateTriggerDelete,
        getAll: keyedStoreWrittenToByStoreAggregateTriggerGetAll,
        getKeys: keyedStoreWrittenToByStoreAggregateTriggerGetKeys,
      };
      unkeyedStoreWrittenToByKeyedStoreTriggerGet = jasmine.createSpy(
        `unkeyedStoreWrittenToByKeyedStoreTriggerGet`
      );
      unkeyedStoreWrittenToByKeyedStoreTriggerSet = jasmine.createSpy(
        `unkeyedStoreWrittenToByKeyedStoreTriggerSet`
      );
      unkeyedStoreWrittenToByKeyedStoreTrigger = {
        type: `unkeyedStore`,
        name: `unkeyedStoreWrittenToByKeyedStoreTrigger`,
        get: unkeyedStoreWrittenToByKeyedStoreTriggerGet,
        set: unkeyedStoreWrittenToByKeyedStoreTriggerSet,
      };
      keyedStoreWrittenToByKeyedStoreTriggerGet = jasmine.createSpy(
        `keyedStoreWrittenToByKeyedStoreTriggerGet`
      );
      keyedStoreWrittenToByKeyedStoreTriggerSet = jasmine.createSpy(
        `keyedStoreWrittenToByKeyedStoreTriggerSet`
      );
      keyedStoreWrittenToByKeyedStoreTriggerDelete = jasmine.createSpy(
        `keyedStoreWrittenToByKeyedStoreTriggerDelete`
      );
      keyedStoreWrittenToByKeyedStoreTriggerGetAll = jasmine.createSpy(
        `keyedStoreWrittenToByKeyedStoreTriggerGetAll`
      );
      keyedStoreWrittenToByKeyedStoreTriggerGetKeys = jasmine.createSpy(
        `keyedStoreWrittenToByKeyedStoreTriggerGetKeys`
      );
      keyedStoreWrittenToByKeyedStoreTrigger = {
        type: `keyedStore`,
        name: `keyedStoreWrittenToByKeyedStoreTrigger`,
        get: keyedStoreWrittenToByKeyedStoreTriggerGet,
        set: keyedStoreWrittenToByKeyedStoreTriggerSet,
        delete: keyedStoreWrittenToByKeyedStoreTriggerDelete,
        getAll: keyedStoreWrittenToByKeyedStoreTriggerGetAll,
        getKeys: keyedStoreWrittenToByKeyedStoreTriggerGetKeys,
      };
      keyedStoreWrittenToByMultipleGet = jasmine.createSpy(
        `keyedStoreWrittenToByMultipleGet`
      );
      keyedStoreWrittenToByMultipleSet = jasmine.createSpy(
        `keyedStoreWrittenToByMultipleSet`
      );
      keyedStoreWrittenToByMultipleDelete = jasmine.createSpy(
        `keyedStoreWrittenToByMultipleDelete`
      );
      keyedStoreWrittenToByMultipleGetAll = jasmine.createSpy(
        `keyedStoreWrittenToByMultipleGetAll`
      );
      keyedStoreWrittenToByMultipleGetKeys = jasmine.createSpy(
        `keyedStoreWrittenToByMultipleGetKeys`
      );
      keyedStoreWrittenToByMultiple = {
        type: `keyedStore`,
        name: `keyedStoreWrittenToByMultiple`,
        get: keyedStoreWrittenToByMultipleGet,
        set: keyedStoreWrittenToByMultipleSet,
        delete: keyedStoreWrittenToByMultipleDelete,
        getAll: keyedStoreWrittenToByMultipleGetAll,
        getKeys: keyedStoreWrittenToByMultipleGetKeys,
      };
      unwrittenKeyedStoreGet = jasmine.createSpy(`unwrittenKeyedStoreGet`);
      unwrittenKeyedStoreSet = jasmine.createSpy(`unwrittenKeyedStoreSet`);
      unwrittenKeyedStoreDelete = jasmine.createSpy(
        `unwrittenKeyedStoreDelete`
      );
      unwrittenKeyedStoreGetAll = jasmine.createSpy(
        `unwrittenKeyedStoreGetAll`
      );
      unwrittenKeyedStoreGetKeys = jasmine.createSpy(
        `unwrittenKeyedStoreGetKeys`
      );
      unwrittenKeyedStore = {
        type: `keyedStore`,
        name: `unwrittenKeyedStore`,
        get: unwrittenKeyedStoreGet,
        set: unwrittenKeyedStoreSet,
        delete: unwrittenKeyedStoreDelete,
        getAll: unwrittenKeyedStoreGetAll,
        getKeys: unwrittenKeyedStoreGetKeys,
      };
      oneTimeTriggerUp = jasmine.createSpy(`oneTimeTriggerUp`);
      oneTimeTrigger = {
        type: `oneTime`,
        up: oneTimeTriggerUp,
        writesToStores: [],
      };
      fileTriggerADown = jasmine.createSpy(`fileTriggerADown`);
      fileTriggerAUp = jasmine.createSpy(`fileTriggerAUp`);
      fileTriggerA = {
        type: `file`,
        glob: `**/*.*`,
        down: fileTriggerADown,
        up: fileTriggerAUp,
        writesToStores: [],
      };
      fileTriggerBDown = jasmine.createSpy(`fileTriggerBDown`);
      fileTriggerBUp = jasmine.createSpy(`fileTriggerBUp`);
      fileTriggerB = {
        type: `file`,
        glob: `some-file.*`,
        down: fileTriggerBDown,
        up: fileTriggerBUp,
        writesToStores: [],
      };
      fileTriggerCDown = jasmine.createSpy(`fileTriggerCDown`);
      fileTriggerCUp = jasmine.createSpy(`fileTriggerCUp`);
      fileTriggerC = {
        type: `file`,
        glob: `matched/**/added/*`,
        down: fileTriggerCDown,
        up: fileTriggerCUp,
        writesToStores: [],
      };
      storeAggregateTriggerInvalidated = jasmine.createSpy(
        `storeAggregateTriggerInvalidated`
      );
      storeAggregateTrigger = {
        type: `storeAggregate`,
        stores: [],
        invalidated: storeAggregateTriggerInvalidated,
        writesToStores: [
          keyedStoreWrittenToByStoreAggregateTrigger,
          unkeyedStoreWrittenToByStoreAggregateTrigger,
        ],
      };
      storeAggregateTriggerFollowingStoreAggregateTriggerViaUnkeyedStoreInvalidated =
        jasmine.createSpy(
          `storeAggregateTriggerFollowingStoreAggregateTriggerViaUnkeyedStoreInvalidated`
        );
      storeAggregateTriggerFollowingStoreAggregateTriggerViaUnkeyedStore = {
        type: `storeAggregate`,
        stores: [unkeyedStoreWrittenToByStoreAggregateTrigger],
        invalidated:
          storeAggregateTriggerFollowingStoreAggregateTriggerViaUnkeyedStoreInvalidated,
        writesToStores: [],
      };
      storeAggregateTriggerFollowingStoreAggregateTriggerViaKeyedStoreInvalidated =
        jasmine.createSpy(
          `storeAggregateTriggerFollowingStoreAggregateTriggerViaKeyedStoreInvalidated`
        );
      storeAggregateTriggerFollowingStoreAggregateTriggerViaKeyedStore = {
        type: `storeAggregate`,
        stores: [keyedStoreWrittenToByStoreAggregateTrigger],
        invalidated:
          storeAggregateTriggerFollowingStoreAggregateTriggerViaKeyedStoreInvalidated,
        writesToStores: [],
      };
      storeAggregateTriggerFollowingKeyedStoreTriggerViaUnkeyedStoreInvalidated =
        jasmine.createSpy(
          `storeAggregateTriggerFollowingKeyedStoreTriggerViaUnkeyedStoreInvalidated`
        );
      storeAggregateTriggerFollowingKeyedStoreTriggerViaUnkeyedStore = {
        type: `storeAggregate`,
        stores: [unkeyedStoreWrittenToByKeyedStoreTrigger],
        invalidated:
          storeAggregateTriggerFollowingKeyedStoreTriggerViaUnkeyedStoreInvalidated,
        writesToStores: [],
      };
      storeAggregateTriggerFollowingKeyedStoreTriggerViaKeyedStoreInvalidated =
        jasmine.createSpy(
          `storeAggregateTriggerFollowingKeyedStoreTriggerViaKeyedStoreInvalidated`
        );
      storeAggregateTriggerFollowingKeyedStoreTriggerViaKeyedStore = {
        type: `storeAggregate`,
        stores: [keyedStoreWrittenToByKeyedStoreTrigger],
        invalidated:
          storeAggregateTriggerFollowingKeyedStoreTriggerViaKeyedStoreInvalidated,
        writesToStores: [],
      };
      keyedStoreTriggerDown = jasmine.createSpy(`keyedStoreTriggerDown`);
      keyedStoreTriggerUp = jasmine.createSpy(`keyedStoreTriggerUp`);
      keyedStoreTrigger = {
        type: `keyedStore`,
        keyedStore: unwrittenKeyedStore,
        refreshAllWhenStoresChange: [],
        down: keyedStoreTriggerDown,
        up: keyedStoreTriggerUp,
        writesToStores: [
          keyedStoreWrittenToByKeyedStoreTrigger,
          unkeyedStoreWrittenToByKeyedStoreTrigger,
        ],
      };
      keyedStoreTriggerFollowingStoreAggregateTriggerRefreshedViaUnkeyedStoreDown =
        jasmine.createSpy(
          `keyedStoreTriggerFollowingStoreAggregateTriggerRefreshedViaUnkeyedStoreDown`
        );
      keyedStoreTriggerFollowingStoreAggregateTriggerRefreshedViaUnkeyedStoreUp =
        jasmine.createSpy(
          `keyedStoreTriggerFollowingStoreAggregateTriggerRefreshedViaUnkeyedStoreUp`
        );
      keyedStoreTriggerFollowingStoreAggregateTriggerRefreshedViaUnkeyedStore =
        {
          type: `keyedStore`,
          keyedStore: unwrittenKeyedStore,
          refreshAllWhenStoresChange: [
            unkeyedStoreWrittenToByStoreAggregateTrigger,
          ],
          down: keyedStoreTriggerFollowingStoreAggregateTriggerRefreshedViaUnkeyedStoreDown,
          up: keyedStoreTriggerFollowingStoreAggregateTriggerRefreshedViaUnkeyedStoreUp,
          writesToStores: [],
        };
      keyedStoreTriggerFollowingStoreAggregateTriggerRefreshedViaKeyedStoreDown =
        jasmine.createSpy(
          `keyedStoreTriggerFollowingStoreAggregateTriggerRefreshedViaKeyedStoreDown`
        );
      keyedStoreTriggerFollowingStoreAggregateTriggerRefreshedViaKeyedStoreUp =
        jasmine.createSpy(
          `keyedStoreTriggerFollowingStoreAggregateTriggerRefreshedViaKeyedStoreUp`
        );
      keyedStoreTriggerFollowingStoreAggregateTriggerRefreshedViaKeyedStore = {
        type: `keyedStore`,
        keyedStore: unwrittenKeyedStore,
        refreshAllWhenStoresChange: [
          keyedStoreWrittenToByStoreAggregateTrigger,
        ],
        down: keyedStoreTriggerFollowingStoreAggregateTriggerRefreshedViaKeyedStoreDown,
        up: keyedStoreTriggerFollowingStoreAggregateTriggerRefreshedViaKeyedStoreUp,
        writesToStores: [keyedStoreWrittenToByStoreAggregateTrigger],
      };
      keyedStoreTriggerFollowingKeyedStoreTriggerRefreshedViaUnkeyedStoreDown =
        jasmine.createSpy(
          `keyedStoreTriggerFollowingKeyedStoreTriggerRefreshedViaUnkeyedStoreDown`
        );
      keyedStoreTriggerFollowingKeyedStoreTriggerRefreshedViaUnkeyedStoreUp =
        jasmine.createSpy(
          `keyedStoreTriggerFollowingKeyedStoreTriggerRefreshedViaUnkeyedStoreUp`
        );
      keyedStoreTriggerFollowingKeyedStoreTriggerRefreshedViaUnkeyedStore = {
        type: `keyedStore`,
        keyedStore: unwrittenKeyedStore,
        refreshAllWhenStoresChange: [unkeyedStoreWrittenToByKeyedStoreTrigger],
        down: keyedStoreTriggerFollowingKeyedStoreTriggerRefreshedViaUnkeyedStoreDown,
        up: keyedStoreTriggerFollowingKeyedStoreTriggerRefreshedViaUnkeyedStoreUp,
        writesToStores: [],
      };
      keyedStoreTriggerFollowingKeyedStoreTriggerRefreshedViaKeyedStoreDown =
        jasmine.createSpy(
          `keyedStoreTriggerFollowingKeyedStoreTriggerRefreshedViaKeyedStoreDown`
        );
      keyedStoreTriggerFollowingKeyedStoreTriggerRefreshedViaKeyedStoreUp =
        jasmine.createSpy(
          `keyedStoreTriggerFollowingKeyedStoreTriggerRefreshedViaKeyedStoreUp`
        );
      keyedStoreTriggerFollowingKeyedStoreTriggerRefreshedViaKeyedStore = {
        type: `keyedStore`,
        keyedStore: unwrittenKeyedStore,
        refreshAllWhenStoresChange: [keyedStoreWrittenToByKeyedStoreTrigger],
        down: keyedStoreTriggerFollowingKeyedStoreTriggerRefreshedViaKeyedStoreDown,
        up: keyedStoreTriggerFollowingKeyedStoreTriggerRefreshedViaKeyedStoreUp,
        writesToStores: [],
      };
      keyedStoreTriggerFollowingStoreAggregateTriggerViaKeyedStoreDown =
        jasmine.createSpy(
          `keyedStoreTriggerFollowingStoreAggregateTriggerViaKeyedStoreDown`
        );
      keyedStoreTriggerFollowingStoreAggregateTriggerViaKeyedStoreUp =
        jasmine.createSpy(
          `keyedStoreTriggerFollowingStoreAggregateTriggerViaKeyedStoreUp`
        );
      keyedStoreTriggerFollowingStoreAggregateTriggerViaKeyedStore = {
        type: `keyedStore`,
        keyedStore: keyedStoreWrittenToByStoreAggregateTrigger,
        refreshAllWhenStoresChange: [],
        down: keyedStoreTriggerFollowingStoreAggregateTriggerViaKeyedStoreDown,
        up: keyedStoreTriggerFollowingStoreAggregateTriggerViaKeyedStoreUp,
        writesToStores: [],
      };
      keyedStoreTriggerFollowingKeyedStoreTriggerViaKeyedStoreDown =
        jasmine.createSpy(
          `keyedStoreTriggerFollowingKeyedStoreTriggerViaKeyedStoreDown`
        );
      keyedStoreTriggerFollowingKeyedStoreTriggerViaKeyedStoreUp =
        jasmine.createSpy(
          `keyedStoreTriggerFollowingKeyedStoreTriggerViaKeyedStoreUp`
        );
      keyedStoreTriggerFollowingKeyedStoreTriggerViaKeyedStore = {
        type: `keyedStore`,
        keyedStore: keyedStoreWrittenToByKeyedStoreTrigger,
        refreshAllWhenStoresChange: [],
        down: keyedStoreTriggerFollowingKeyedStoreTriggerViaKeyedStoreDown,
        up: keyedStoreTriggerFollowingKeyedStoreTriggerViaKeyedStoreUp,
        writesToStores: [keyedStoreWrittenToByMultiple],
      };
      keyedStoreTriggerFollowingMultipleDown = jasmine.createSpy(
        `keyedStoreTriggerFollowingMultipleDown`
      );
      keyedStoreTriggerFollowingMultipleUp = jasmine.createSpy(
        `keyedStoreTriggerFollowingMultipleUp`
      );
      keyedStoreTriggerFollowingMultiple = {
        type: `keyedStore`,
        keyedStore: keyedStoreWrittenToByMultiple,
        refreshAllWhenStoresChange: [],
        down: keyedStoreTriggerFollowingMultipleDown,
        up: keyedStoreTriggerFollowingMultipleUp,
        writesToStores: [],
      };

      try {
        listTriggers({
          testPluginA: {
            triggers: {
              keyedStoreTriggerFollowingMultiple,
              keyedStoreTriggerFollowingKeyedStoreTriggerViaKeyedStore,
              storeAggregateTriggerFollowingKeyedStoreTriggerViaUnkeyedStore,
              storeAggregateTriggerFollowingKeyedStoreTriggerViaKeyedStore,
              keyedStoreTrigger,
              keyedStoreTriggerFollowingStoreAggregateTriggerRefreshedViaUnkeyedStore,
              fileTriggerC,
              storeAggregateTrigger,
              keyedStoreTriggerFollowingStoreAggregateTriggerViaKeyedStore,
            },
          },
          testPluginB: {
            triggers: {
              keyedStoreTriggerFollowingStoreAggregateTriggerRefreshedViaKeyedStore,
              oneTimeTrigger,
              fileTriggerA,
              fileTriggerB,
            },
          },
          testPluginC: {
            triggers: {
              storeAggregateTriggerFollowingStoreAggregateTriggerViaUnkeyedStore,
              storeAggregateTriggerFollowingStoreAggregateTriggerViaKeyedStore,
              keyedStoreTriggerFollowingKeyedStoreTriggerRefreshedViaUnkeyedStore,
              keyedStoreTriggerFollowingKeyedStoreTriggerRefreshedViaKeyedStore,
            },
          },
        });

        error = null;
      } catch (e) {
        error = e;
      }
    });

    it(`throws the expected error`, () => {
      expect(error).toEqual(
        new Error(
          `The triggers of the installed plugins form a cyclic dependency (a trigger is dependent upon one or more stores it directly or indirectly writes to).`
        )
      );
    });

    it(`does not interact with any stores`, () => {
      expect(
        unkeyedStoreWrittenToByStoreAggregateTriggerGet
      ).not.toHaveBeenCalled();
      expect(
        unkeyedStoreWrittenToByStoreAggregateTriggerSet
      ).not.toHaveBeenCalled();
      expect(
        keyedStoreWrittenToByStoreAggregateTriggerGet
      ).not.toHaveBeenCalled();
      expect(
        keyedStoreWrittenToByStoreAggregateTriggerSet
      ).not.toHaveBeenCalled();
      expect(
        keyedStoreWrittenToByStoreAggregateTriggerDelete
      ).not.toHaveBeenCalled();
      expect(
        keyedStoreWrittenToByStoreAggregateTriggerGetAll
      ).not.toHaveBeenCalled();
      expect(
        keyedStoreWrittenToByStoreAggregateTriggerGetKeys
      ).not.toHaveBeenCalled();
      expect(
        unkeyedStoreWrittenToByKeyedStoreTriggerGet
      ).not.toHaveBeenCalled();
      expect(
        unkeyedStoreWrittenToByKeyedStoreTriggerSet
      ).not.toHaveBeenCalled();
      expect(keyedStoreWrittenToByKeyedStoreTriggerGet).not.toHaveBeenCalled();
      expect(keyedStoreWrittenToByKeyedStoreTriggerSet).not.toHaveBeenCalled();
      expect(
        keyedStoreWrittenToByKeyedStoreTriggerDelete
      ).not.toHaveBeenCalled();
      expect(
        keyedStoreWrittenToByKeyedStoreTriggerGetAll
      ).not.toHaveBeenCalled();
      expect(
        keyedStoreWrittenToByKeyedStoreTriggerGetKeys
      ).not.toHaveBeenCalled();
      expect(unwrittenKeyedStoreGet).not.toHaveBeenCalled();
      expect(unwrittenKeyedStoreSet).not.toHaveBeenCalled();
      expect(unwrittenKeyedStoreDelete).not.toHaveBeenCalled();
      expect(unwrittenKeyedStoreGetAll).not.toHaveBeenCalled();
      expect(unwrittenKeyedStoreGetKeys).not.toHaveBeenCalled();
      expect(keyedStoreWrittenToByMultipleGet).not.toHaveBeenCalled();
      expect(keyedStoreWrittenToByMultipleSet).not.toHaveBeenCalled();
      expect(keyedStoreWrittenToByMultipleDelete).not.toHaveBeenCalled();
      expect(keyedStoreWrittenToByMultipleGetAll).not.toHaveBeenCalled();
      expect(keyedStoreWrittenToByMultipleGetKeys).not.toHaveBeenCalled();
    });

    it(`does not interact with any triggers`, () => {
      expect(oneTimeTriggerUp).not.toHaveBeenCalled();
      expect(fileTriggerADown).not.toHaveBeenCalled();
      expect(fileTriggerAUp).not.toHaveBeenCalled();
      expect(fileTriggerBDown).not.toHaveBeenCalled();
      expect(fileTriggerBUp).not.toHaveBeenCalled();
      expect(fileTriggerCDown).not.toHaveBeenCalled();
      expect(fileTriggerCUp).not.toHaveBeenCalled();
      expect(storeAggregateTriggerInvalidated).not.toHaveBeenCalled();
      expect(
        storeAggregateTriggerFollowingStoreAggregateTriggerViaUnkeyedStoreInvalidated
      ).not.toHaveBeenCalled();
      expect(
        storeAggregateTriggerFollowingStoreAggregateTriggerViaKeyedStoreInvalidated
      ).not.toHaveBeenCalled();
      expect(
        storeAggregateTriggerFollowingKeyedStoreTriggerViaUnkeyedStoreInvalidated
      ).not.toHaveBeenCalled();
      expect(
        storeAggregateTriggerFollowingKeyedStoreTriggerViaKeyedStoreInvalidated
      ).not.toHaveBeenCalled();
      expect(keyedStoreTriggerDown).not.toHaveBeenCalled();
      expect(keyedStoreTriggerUp).not.toHaveBeenCalled();
      expect(
        keyedStoreTriggerFollowingStoreAggregateTriggerRefreshedViaUnkeyedStoreDown
      ).not.toHaveBeenCalled();
      expect(
        keyedStoreTriggerFollowingStoreAggregateTriggerRefreshedViaUnkeyedStoreUp
      ).not.toHaveBeenCalled();
      expect(
        keyedStoreTriggerFollowingStoreAggregateTriggerRefreshedViaKeyedStoreDown
      ).not.toHaveBeenCalled();
      expect(
        keyedStoreTriggerFollowingStoreAggregateTriggerRefreshedViaKeyedStoreUp
      ).not.toHaveBeenCalled();
      expect(
        keyedStoreTriggerFollowingKeyedStoreTriggerRefreshedViaUnkeyedStoreDown
      ).not.toHaveBeenCalled();
      expect(
        keyedStoreTriggerFollowingKeyedStoreTriggerRefreshedViaUnkeyedStoreUp
      ).not.toHaveBeenCalled();
      expect(
        keyedStoreTriggerFollowingKeyedStoreTriggerRefreshedViaKeyedStoreDown
      ).not.toHaveBeenCalled();
      expect(
        keyedStoreTriggerFollowingKeyedStoreTriggerRefreshedViaKeyedStoreUp
      ).not.toHaveBeenCalled();
      expect(
        keyedStoreTriggerFollowingStoreAggregateTriggerViaKeyedStoreDown
      ).not.toHaveBeenCalled();
      expect(
        keyedStoreTriggerFollowingStoreAggregateTriggerViaKeyedStoreUp
      ).not.toHaveBeenCalled();
      expect(
        keyedStoreTriggerFollowingKeyedStoreTriggerViaKeyedStoreDown
      ).not.toHaveBeenCalled();
      expect(
        keyedStoreTriggerFollowingKeyedStoreTriggerViaKeyedStoreUp
      ).not.toHaveBeenCalled();
      expect(keyedStoreTriggerFollowingMultipleDown).not.toHaveBeenCalled();
      expect(keyedStoreTriggerFollowingMultipleUp).not.toHaveBeenCalled();
    });
  });

  describe(`when a cycle crosses multiple triggers`, () => {
    let unkeyedStoreWrittenToByStoreAggregateTriggerGet: jasmine.Spy;
    let unkeyedStoreWrittenToByStoreAggregateTriggerSet: jasmine.Spy;
    let unkeyedStoreWrittenToByStoreAggregateTrigger: UnkeyedStore<unknown>;
    let keyedStoreWrittenToByStoreAggregateTriggerGet: jasmine.Spy;
    let keyedStoreWrittenToByStoreAggregateTriggerSet: jasmine.Spy;
    let keyedStoreWrittenToByStoreAggregateTriggerDelete: jasmine.Spy;
    let keyedStoreWrittenToByStoreAggregateTriggerGetAll: jasmine.Spy;
    let keyedStoreWrittenToByStoreAggregateTriggerGetKeys: jasmine.Spy;
    let keyedStoreWrittenToByStoreAggregateTrigger: KeyedStore<unknown>;
    let unkeyedStoreWrittenToByKeyedStoreTriggerGet: jasmine.Spy;
    let unkeyedStoreWrittenToByKeyedStoreTriggerSet: jasmine.Spy;
    let unkeyedStoreWrittenToByKeyedStoreTrigger: UnkeyedStore<unknown>;
    let keyedStoreWrittenToByKeyedStoreTriggerGet: jasmine.Spy;
    let keyedStoreWrittenToByKeyedStoreTriggerSet: jasmine.Spy;
    let keyedStoreWrittenToByKeyedStoreTriggerDelete: jasmine.Spy;
    let keyedStoreWrittenToByKeyedStoreTriggerGetAll: jasmine.Spy;
    let keyedStoreWrittenToByKeyedStoreTriggerGetKeys: jasmine.Spy;
    let keyedStoreWrittenToByKeyedStoreTrigger: KeyedStore<unknown>;
    let keyedStoreWrittenToByMultipleGet: jasmine.Spy;
    let keyedStoreWrittenToByMultipleSet: jasmine.Spy;
    let keyedStoreWrittenToByMultipleDelete: jasmine.Spy;
    let keyedStoreWrittenToByMultipleGetAll: jasmine.Spy;
    let keyedStoreWrittenToByMultipleGetKeys: jasmine.Spy;
    let keyedStoreWrittenToByMultiple: KeyedStore<unknown>;
    let unwrittenKeyedStoreGet: jasmine.Spy;
    let unwrittenKeyedStoreSet: jasmine.Spy;
    let unwrittenKeyedStoreDelete: jasmine.Spy;
    let unwrittenKeyedStoreGetAll: jasmine.Spy;
    let unwrittenKeyedStoreGetKeys: jasmine.Spy;
    let unwrittenKeyedStore: KeyedStore<unknown>;
    let oneTimeTriggerUp: jasmine.Spy;
    let oneTimeTrigger: OneTimeTrigger;
    let fileTriggerADown: jasmine.Spy;
    let fileTriggerAUp: jasmine.Spy;
    let fileTriggerA: FileTrigger;
    let fileTriggerBDown: jasmine.Spy;
    let fileTriggerBUp: jasmine.Spy;
    let fileTriggerB: FileTrigger;
    let fileTriggerCDown: jasmine.Spy;
    let fileTriggerCUp: jasmine.Spy;
    let fileTriggerC: FileTrigger;
    let storeAggregateTriggerInvalidated: jasmine.Spy;
    let storeAggregateTrigger: StoreAggregateTrigger;
    let storeAggregateTriggerFollowingStoreAggregateTriggerViaUnkeyedStoreInvalidated: jasmine.Spy;
    let storeAggregateTriggerFollowingStoreAggregateTriggerViaUnkeyedStore: StoreAggregateTrigger;
    let storeAggregateTriggerFollowingStoreAggregateTriggerViaKeyedStoreInvalidated: jasmine.Spy;
    let storeAggregateTriggerFollowingStoreAggregateTriggerViaKeyedStore: StoreAggregateTrigger;
    let storeAggregateTriggerFollowingKeyedStoreTriggerViaUnkeyedStoreInvalidated: jasmine.Spy;
    let storeAggregateTriggerFollowingKeyedStoreTriggerViaUnkeyedStore: StoreAggregateTrigger;
    let storeAggregateTriggerFollowingKeyedStoreTriggerViaKeyedStoreInvalidated: jasmine.Spy;
    let storeAggregateTriggerFollowingKeyedStoreTriggerViaKeyedStore: StoreAggregateTrigger;
    let keyedStoreTriggerDown: jasmine.Spy;
    let keyedStoreTriggerUp: jasmine.Spy;
    let keyedStoreTrigger: KeyedStoreTrigger;
    let keyedStoreTriggerFollowingStoreAggregateTriggerRefreshedViaUnkeyedStoreDown: jasmine.Spy;
    let keyedStoreTriggerFollowingStoreAggregateTriggerRefreshedViaUnkeyedStoreUp: jasmine.Spy;
    let keyedStoreTriggerFollowingStoreAggregateTriggerRefreshedViaUnkeyedStore: KeyedStoreTrigger;
    let keyedStoreTriggerFollowingStoreAggregateTriggerRefreshedViaKeyedStoreDown: jasmine.Spy;
    let keyedStoreTriggerFollowingStoreAggregateTriggerRefreshedViaKeyedStoreUp: jasmine.Spy;
    let keyedStoreTriggerFollowingStoreAggregateTriggerRefreshedViaKeyedStore: KeyedStoreTrigger;
    let keyedStoreTriggerFollowingKeyedStoreTriggerRefreshedViaUnkeyedStoreDown: jasmine.Spy;
    let keyedStoreTriggerFollowingKeyedStoreTriggerRefreshedViaUnkeyedStoreUp: jasmine.Spy;
    let keyedStoreTriggerFollowingKeyedStoreTriggerRefreshedViaUnkeyedStore: KeyedStoreTrigger;
    let keyedStoreTriggerFollowingKeyedStoreTriggerRefreshedViaKeyedStoreDown: jasmine.Spy;
    let keyedStoreTriggerFollowingKeyedStoreTriggerRefreshedViaKeyedStoreUp: jasmine.Spy;
    let keyedStoreTriggerFollowingKeyedStoreTriggerRefreshedViaKeyedStore: KeyedStoreTrigger;
    let keyedStoreTriggerFollowingStoreAggregateTriggerViaKeyedStoreDown: jasmine.Spy;
    let keyedStoreTriggerFollowingStoreAggregateTriggerViaKeyedStoreUp: jasmine.Spy;
    let keyedStoreTriggerFollowingStoreAggregateTriggerViaKeyedStore: KeyedStoreTrigger;
    let keyedStoreTriggerFollowingKeyedStoreTriggerViaKeyedStoreDown: jasmine.Spy;
    let keyedStoreTriggerFollowingKeyedStoreTriggerViaKeyedStoreUp: jasmine.Spy;
    let keyedStoreTriggerFollowingKeyedStoreTriggerViaKeyedStore: KeyedStoreTrigger;
    let keyedStoreTriggerFollowingMultipleDown: jasmine.Spy;
    let keyedStoreTriggerFollowingMultipleUp: jasmine.Spy;
    let keyedStoreTriggerFollowingMultiple: KeyedStoreTrigger;
    let error: unknown;

    beforeAll(() => {
      unkeyedStoreWrittenToByStoreAggregateTriggerGet = jasmine.createSpy(
        `unkeyedStoreWrittenToByStoreAggregateTriggerGet`
      );
      unkeyedStoreWrittenToByStoreAggregateTriggerSet = jasmine.createSpy(
        `unkeyedStoreWrittenToByStoreAggregateTriggerSet`
      );
      unkeyedStoreWrittenToByStoreAggregateTrigger = {
        type: `unkeyedStore`,
        name: `unkeyedStoreWrittenToByStoreAggregateTrigger`,
        get: unkeyedStoreWrittenToByStoreAggregateTriggerGet,
        set: unkeyedStoreWrittenToByStoreAggregateTriggerSet,
      };
      keyedStoreWrittenToByStoreAggregateTriggerGet = jasmine.createSpy(
        `keyedStoreWrittenToByStoreAggregateTriggerGet`
      );
      keyedStoreWrittenToByStoreAggregateTriggerSet = jasmine.createSpy(
        `keyedStoreWrittenToByStoreAggregateTriggerSet`
      );
      keyedStoreWrittenToByStoreAggregateTriggerDelete = jasmine.createSpy(
        `keyedStoreWrittenToByStoreAggregateTriggerDelete`
      );
      keyedStoreWrittenToByStoreAggregateTriggerGetAll = jasmine.createSpy(
        `keyedStoreWrittenToByStoreAggregateTriggerGetAll`
      );
      keyedStoreWrittenToByStoreAggregateTriggerGetKeys = jasmine.createSpy(
        `keyedStoreWrittenToByStoreAggregateTriggerGetKeys`
      );
      keyedStoreWrittenToByStoreAggregateTrigger = {
        type: `keyedStore`,
        name: `keyedStoreWrittenToByStoreAggregateTrigger`,
        get: keyedStoreWrittenToByStoreAggregateTriggerGet,
        set: keyedStoreWrittenToByStoreAggregateTriggerSet,
        delete: keyedStoreWrittenToByStoreAggregateTriggerDelete,
        getAll: keyedStoreWrittenToByStoreAggregateTriggerGetAll,
        getKeys: keyedStoreWrittenToByStoreAggregateTriggerGetKeys,
      };
      unkeyedStoreWrittenToByKeyedStoreTriggerGet = jasmine.createSpy(
        `unkeyedStoreWrittenToByKeyedStoreTriggerGet`
      );
      unkeyedStoreWrittenToByKeyedStoreTriggerSet = jasmine.createSpy(
        `unkeyedStoreWrittenToByKeyedStoreTriggerSet`
      );
      unkeyedStoreWrittenToByKeyedStoreTrigger = {
        type: `unkeyedStore`,
        name: `unkeyedStoreWrittenToByKeyedStoreTrigger`,
        get: unkeyedStoreWrittenToByKeyedStoreTriggerGet,
        set: unkeyedStoreWrittenToByKeyedStoreTriggerSet,
      };
      keyedStoreWrittenToByKeyedStoreTriggerGet = jasmine.createSpy(
        `keyedStoreWrittenToByKeyedStoreTriggerGet`
      );
      keyedStoreWrittenToByKeyedStoreTriggerSet = jasmine.createSpy(
        `keyedStoreWrittenToByKeyedStoreTriggerSet`
      );
      keyedStoreWrittenToByKeyedStoreTriggerDelete = jasmine.createSpy(
        `keyedStoreWrittenToByKeyedStoreTriggerDelete`
      );
      keyedStoreWrittenToByKeyedStoreTriggerGetAll = jasmine.createSpy(
        `keyedStoreWrittenToByKeyedStoreTriggerGetAll`
      );
      keyedStoreWrittenToByKeyedStoreTriggerGetKeys = jasmine.createSpy(
        `keyedStoreWrittenToByKeyedStoreTriggerGetKeys`
      );
      keyedStoreWrittenToByKeyedStoreTrigger = {
        type: `keyedStore`,
        name: `keyedStoreWrittenToByKeyedStoreTrigger`,
        get: keyedStoreWrittenToByKeyedStoreTriggerGet,
        set: keyedStoreWrittenToByKeyedStoreTriggerSet,
        delete: keyedStoreWrittenToByKeyedStoreTriggerDelete,
        getAll: keyedStoreWrittenToByKeyedStoreTriggerGetAll,
        getKeys: keyedStoreWrittenToByKeyedStoreTriggerGetKeys,
      };
      keyedStoreWrittenToByMultipleGet = jasmine.createSpy(
        `keyedStoreWrittenToByMultipleGet`
      );
      keyedStoreWrittenToByMultipleSet = jasmine.createSpy(
        `keyedStoreWrittenToByMultipleSet`
      );
      keyedStoreWrittenToByMultipleDelete = jasmine.createSpy(
        `keyedStoreWrittenToByMultipleDelete`
      );
      keyedStoreWrittenToByMultipleGetAll = jasmine.createSpy(
        `keyedStoreWrittenToByMultipleGetAll`
      );
      keyedStoreWrittenToByMultipleGetKeys = jasmine.createSpy(
        `keyedStoreWrittenToByMultipleGetKeys`
      );
      keyedStoreWrittenToByMultiple = {
        type: `keyedStore`,
        name: `keyedStoreWrittenToByMultiple`,
        get: keyedStoreWrittenToByMultipleGet,
        set: keyedStoreWrittenToByMultipleSet,
        delete: keyedStoreWrittenToByMultipleDelete,
        getAll: keyedStoreWrittenToByMultipleGetAll,
        getKeys: keyedStoreWrittenToByMultipleGetKeys,
      };
      unwrittenKeyedStoreGet = jasmine.createSpy(`unwrittenKeyedStoreGet`);
      unwrittenKeyedStoreSet = jasmine.createSpy(`unwrittenKeyedStoreSet`);
      unwrittenKeyedStoreDelete = jasmine.createSpy(
        `unwrittenKeyedStoreDelete`
      );
      unwrittenKeyedStoreGetAll = jasmine.createSpy(
        `unwrittenKeyedStoreGetAll`
      );
      unwrittenKeyedStoreGetKeys = jasmine.createSpy(
        `unwrittenKeyedStoreGetKeys`
      );
      unwrittenKeyedStore = {
        type: `keyedStore`,
        name: `unwrittenKeyedStore`,
        get: unwrittenKeyedStoreGet,
        set: unwrittenKeyedStoreSet,
        delete: unwrittenKeyedStoreDelete,
        getAll: unwrittenKeyedStoreGetAll,
        getKeys: unwrittenKeyedStoreGetKeys,
      };
      oneTimeTriggerUp = jasmine.createSpy(`oneTimeTriggerUp`);
      oneTimeTrigger = {
        type: `oneTime`,
        up: oneTimeTriggerUp,
        writesToStores: [],
      };
      fileTriggerADown = jasmine.createSpy(`fileTriggerADown`);
      fileTriggerAUp = jasmine.createSpy(`fileTriggerAUp`);
      fileTriggerA = {
        type: `file`,
        glob: `**/*.*`,
        down: fileTriggerADown,
        up: fileTriggerAUp,
        writesToStores: [],
      };
      fileTriggerBDown = jasmine.createSpy(`fileTriggerBDown`);
      fileTriggerBUp = jasmine.createSpy(`fileTriggerBUp`);
      fileTriggerB = {
        type: `file`,
        glob: `some-file.*`,
        down: fileTriggerBDown,
        up: fileTriggerBUp,
        writesToStores: [],
      };
      fileTriggerCDown = jasmine.createSpy(`fileTriggerCDown`);
      fileTriggerCUp = jasmine.createSpy(`fileTriggerCUp`);
      fileTriggerC = {
        type: `file`,
        glob: `matched/**/added/*`,
        down: fileTriggerCDown,
        up: fileTriggerCUp,
        writesToStores: [],
      };
      storeAggregateTriggerInvalidated = jasmine.createSpy(
        `storeAggregateTriggerInvalidated`
      );
      storeAggregateTrigger = {
        type: `storeAggregate`,
        stores: [],
        invalidated: storeAggregateTriggerInvalidated,
        writesToStores: [
          keyedStoreWrittenToByStoreAggregateTrigger,
          unkeyedStoreWrittenToByStoreAggregateTrigger,
        ],
      };
      storeAggregateTriggerFollowingStoreAggregateTriggerViaUnkeyedStoreInvalidated =
        jasmine.createSpy(
          `storeAggregateTriggerFollowingStoreAggregateTriggerViaUnkeyedStoreInvalidated`
        );
      storeAggregateTriggerFollowingStoreAggregateTriggerViaUnkeyedStore = {
        type: `storeAggregate`,
        stores: [unkeyedStoreWrittenToByStoreAggregateTrigger],
        invalidated:
          storeAggregateTriggerFollowingStoreAggregateTriggerViaUnkeyedStoreInvalidated,
        writesToStores: [],
      };
      storeAggregateTriggerFollowingStoreAggregateTriggerViaKeyedStoreInvalidated =
        jasmine.createSpy(
          `storeAggregateTriggerFollowingStoreAggregateTriggerViaKeyedStoreInvalidated`
        );
      storeAggregateTriggerFollowingStoreAggregateTriggerViaKeyedStore = {
        type: `storeAggregate`,
        stores: [keyedStoreWrittenToByStoreAggregateTrigger],
        invalidated:
          storeAggregateTriggerFollowingStoreAggregateTriggerViaKeyedStoreInvalidated,
        writesToStores: [],
      };
      storeAggregateTriggerFollowingKeyedStoreTriggerViaUnkeyedStoreInvalidated =
        jasmine.createSpy(
          `storeAggregateTriggerFollowingKeyedStoreTriggerViaUnkeyedStoreInvalidated`
        );
      storeAggregateTriggerFollowingKeyedStoreTriggerViaUnkeyedStore = {
        type: `storeAggregate`,
        stores: [unkeyedStoreWrittenToByKeyedStoreTrigger],
        invalidated:
          storeAggregateTriggerFollowingKeyedStoreTriggerViaUnkeyedStoreInvalidated,
        writesToStores: [],
      };
      storeAggregateTriggerFollowingKeyedStoreTriggerViaKeyedStoreInvalidated =
        jasmine.createSpy(
          `storeAggregateTriggerFollowingKeyedStoreTriggerViaKeyedStoreInvalidated`
        );
      storeAggregateTriggerFollowingKeyedStoreTriggerViaKeyedStore = {
        type: `storeAggregate`,
        stores: [keyedStoreWrittenToByKeyedStoreTrigger],
        invalidated:
          storeAggregateTriggerFollowingKeyedStoreTriggerViaKeyedStoreInvalidated,
        writesToStores: [],
      };
      keyedStoreTriggerDown = jasmine.createSpy(`keyedStoreTriggerDown`);
      keyedStoreTriggerUp = jasmine.createSpy(`keyedStoreTriggerUp`);
      keyedStoreTrigger = {
        type: `keyedStore`,
        keyedStore: unwrittenKeyedStore,
        refreshAllWhenStoresChange: [],
        down: keyedStoreTriggerDown,
        up: keyedStoreTriggerUp,
        writesToStores: [
          keyedStoreWrittenToByKeyedStoreTrigger,
          unkeyedStoreWrittenToByKeyedStoreTrigger,
        ],
      };
      keyedStoreTriggerFollowingStoreAggregateTriggerRefreshedViaUnkeyedStoreDown =
        jasmine.createSpy(
          `keyedStoreTriggerFollowingStoreAggregateTriggerRefreshedViaUnkeyedStoreDown`
        );
      keyedStoreTriggerFollowingStoreAggregateTriggerRefreshedViaUnkeyedStoreUp =
        jasmine.createSpy(
          `keyedStoreTriggerFollowingStoreAggregateTriggerRefreshedViaUnkeyedStoreUp`
        );
      keyedStoreTriggerFollowingStoreAggregateTriggerRefreshedViaUnkeyedStore =
        {
          type: `keyedStore`,
          keyedStore: unwrittenKeyedStore,
          refreshAllWhenStoresChange: [
            unkeyedStoreWrittenToByStoreAggregateTrigger,
          ],
          down: keyedStoreTriggerFollowingStoreAggregateTriggerRefreshedViaUnkeyedStoreDown,
          up: keyedStoreTriggerFollowingStoreAggregateTriggerRefreshedViaUnkeyedStoreUp,
          writesToStores: [],
        };
      keyedStoreTriggerFollowingStoreAggregateTriggerRefreshedViaKeyedStoreDown =
        jasmine.createSpy(
          `keyedStoreTriggerFollowingStoreAggregateTriggerRefreshedViaKeyedStoreDown`
        );
      keyedStoreTriggerFollowingStoreAggregateTriggerRefreshedViaKeyedStoreUp =
        jasmine.createSpy(
          `keyedStoreTriggerFollowingStoreAggregateTriggerRefreshedViaKeyedStoreUp`
        );
      keyedStoreTriggerFollowingStoreAggregateTriggerRefreshedViaKeyedStore = {
        type: `keyedStore`,
        keyedStore: unwrittenKeyedStore,
        refreshAllWhenStoresChange: [
          keyedStoreWrittenToByStoreAggregateTrigger,
        ],
        down: keyedStoreTriggerFollowingStoreAggregateTriggerRefreshedViaKeyedStoreDown,
        up: keyedStoreTriggerFollowingStoreAggregateTriggerRefreshedViaKeyedStoreUp,
        writesToStores: [],
      };
      keyedStoreTriggerFollowingKeyedStoreTriggerRefreshedViaUnkeyedStoreDown =
        jasmine.createSpy(
          `keyedStoreTriggerFollowingKeyedStoreTriggerRefreshedViaUnkeyedStoreDown`
        );
      keyedStoreTriggerFollowingKeyedStoreTriggerRefreshedViaUnkeyedStoreUp =
        jasmine.createSpy(
          `keyedStoreTriggerFollowingKeyedStoreTriggerRefreshedViaUnkeyedStoreUp`
        );
      keyedStoreTriggerFollowingKeyedStoreTriggerRefreshedViaUnkeyedStore = {
        type: `keyedStore`,
        keyedStore: unwrittenKeyedStore,
        refreshAllWhenStoresChange: [unkeyedStoreWrittenToByKeyedStoreTrigger],
        down: keyedStoreTriggerFollowingKeyedStoreTriggerRefreshedViaUnkeyedStoreDown,
        up: keyedStoreTriggerFollowingKeyedStoreTriggerRefreshedViaUnkeyedStoreUp,
        writesToStores: [],
      };
      keyedStoreTriggerFollowingKeyedStoreTriggerRefreshedViaKeyedStoreDown =
        jasmine.createSpy(
          `keyedStoreTriggerFollowingKeyedStoreTriggerRefreshedViaKeyedStoreDown`
        );
      keyedStoreTriggerFollowingKeyedStoreTriggerRefreshedViaKeyedStoreUp =
        jasmine.createSpy(
          `keyedStoreTriggerFollowingKeyedStoreTriggerRefreshedViaKeyedStoreUp`
        );
      keyedStoreTriggerFollowingKeyedStoreTriggerRefreshedViaKeyedStore = {
        type: `keyedStore`,
        keyedStore: unwrittenKeyedStore,
        refreshAllWhenStoresChange: [keyedStoreWrittenToByKeyedStoreTrigger],
        down: keyedStoreTriggerFollowingKeyedStoreTriggerRefreshedViaKeyedStoreDown,
        up: keyedStoreTriggerFollowingKeyedStoreTriggerRefreshedViaKeyedStoreUp,
        writesToStores: [],
      };
      keyedStoreTriggerFollowingStoreAggregateTriggerViaKeyedStoreDown =
        jasmine.createSpy(
          `keyedStoreTriggerFollowingStoreAggregateTriggerViaKeyedStoreDown`
        );
      keyedStoreTriggerFollowingStoreAggregateTriggerViaKeyedStoreUp =
        jasmine.createSpy(
          `keyedStoreTriggerFollowingStoreAggregateTriggerViaKeyedStoreUp`
        );
      keyedStoreTriggerFollowingStoreAggregateTriggerViaKeyedStore = {
        type: `keyedStore`,
        keyedStore: keyedStoreWrittenToByStoreAggregateTrigger,
        refreshAllWhenStoresChange: [],
        down: keyedStoreTriggerFollowingStoreAggregateTriggerViaKeyedStoreDown,
        up: keyedStoreTriggerFollowingStoreAggregateTriggerViaKeyedStoreUp,
        writesToStores: [],
      };
      keyedStoreTriggerFollowingKeyedStoreTriggerViaKeyedStoreDown =
        jasmine.createSpy(
          `keyedStoreTriggerFollowingKeyedStoreTriggerViaKeyedStoreDown`
        );
      keyedStoreTriggerFollowingKeyedStoreTriggerViaKeyedStoreUp =
        jasmine.createSpy(
          `keyedStoreTriggerFollowingKeyedStoreTriggerViaKeyedStoreUp`
        );
      keyedStoreTriggerFollowingKeyedStoreTriggerViaKeyedStore = {
        type: `keyedStore`,
        keyedStore: keyedStoreWrittenToByKeyedStoreTrigger,
        refreshAllWhenStoresChange: [],
        down: keyedStoreTriggerFollowingKeyedStoreTriggerViaKeyedStoreDown,
        up: keyedStoreTriggerFollowingKeyedStoreTriggerViaKeyedStoreUp,
        writesToStores: [keyedStoreWrittenToByMultiple],
      };
      keyedStoreTriggerFollowingMultipleDown = jasmine.createSpy(
        `keyedStoreTriggerFollowingMultipleDown`
      );
      keyedStoreTriggerFollowingMultipleUp = jasmine.createSpy(
        `keyedStoreTriggerFollowingMultipleUp`
      );
      keyedStoreTriggerFollowingMultiple = {
        type: `keyedStore`,
        keyedStore: keyedStoreWrittenToByMultiple,
        refreshAllWhenStoresChange: [],
        down: keyedStoreTriggerFollowingMultipleDown,
        up: keyedStoreTriggerFollowingMultipleUp,
        writesToStores: [keyedStoreWrittenToByKeyedStoreTrigger],
      };

      try {
        listTriggers({
          testPluginA: {
            triggers: {
              keyedStoreTriggerFollowingMultiple,
              keyedStoreTriggerFollowingKeyedStoreTriggerViaKeyedStore,
              storeAggregateTriggerFollowingKeyedStoreTriggerViaUnkeyedStore,
              storeAggregateTriggerFollowingKeyedStoreTriggerViaKeyedStore,
              keyedStoreTrigger,
              keyedStoreTriggerFollowingStoreAggregateTriggerRefreshedViaUnkeyedStore,
              fileTriggerC,
              storeAggregateTrigger,
              keyedStoreTriggerFollowingStoreAggregateTriggerViaKeyedStore,
            },
          },
          testPluginB: {
            triggers: {
              keyedStoreTriggerFollowingStoreAggregateTriggerRefreshedViaKeyedStore,
              oneTimeTrigger,
              fileTriggerA,
              fileTriggerB,
            },
          },
          testPluginC: {
            triggers: {
              storeAggregateTriggerFollowingStoreAggregateTriggerViaUnkeyedStore,
              storeAggregateTriggerFollowingStoreAggregateTriggerViaKeyedStore,
              keyedStoreTriggerFollowingKeyedStoreTriggerRefreshedViaUnkeyedStore,
              keyedStoreTriggerFollowingKeyedStoreTriggerRefreshedViaKeyedStore,
            },
          },
        });

        error = null;
      } catch (e) {
        error = e;
      }
    });

    it(`throws the expected error`, () => {
      expect(error).toEqual(
        new Error(
          `The triggers of the installed plugins form a cyclic dependency (a trigger is dependent upon one or more stores it directly or indirectly writes to).`
        )
      );
    });

    it(`does not interact with any stores`, () => {
      expect(
        unkeyedStoreWrittenToByStoreAggregateTriggerGet
      ).not.toHaveBeenCalled();
      expect(
        unkeyedStoreWrittenToByStoreAggregateTriggerSet
      ).not.toHaveBeenCalled();
      expect(
        keyedStoreWrittenToByStoreAggregateTriggerGet
      ).not.toHaveBeenCalled();
      expect(
        keyedStoreWrittenToByStoreAggregateTriggerSet
      ).not.toHaveBeenCalled();
      expect(
        keyedStoreWrittenToByStoreAggregateTriggerDelete
      ).not.toHaveBeenCalled();
      expect(
        keyedStoreWrittenToByStoreAggregateTriggerGetAll
      ).not.toHaveBeenCalled();
      expect(
        keyedStoreWrittenToByStoreAggregateTriggerGetKeys
      ).not.toHaveBeenCalled();
      expect(
        unkeyedStoreWrittenToByKeyedStoreTriggerGet
      ).not.toHaveBeenCalled();
      expect(
        unkeyedStoreWrittenToByKeyedStoreTriggerSet
      ).not.toHaveBeenCalled();
      expect(keyedStoreWrittenToByKeyedStoreTriggerGet).not.toHaveBeenCalled();
      expect(keyedStoreWrittenToByKeyedStoreTriggerSet).not.toHaveBeenCalled();
      expect(
        keyedStoreWrittenToByKeyedStoreTriggerDelete
      ).not.toHaveBeenCalled();
      expect(
        keyedStoreWrittenToByKeyedStoreTriggerGetAll
      ).not.toHaveBeenCalled();
      expect(
        keyedStoreWrittenToByKeyedStoreTriggerGetKeys
      ).not.toHaveBeenCalled();
      expect(unwrittenKeyedStoreGet).not.toHaveBeenCalled();
      expect(unwrittenKeyedStoreSet).not.toHaveBeenCalled();
      expect(unwrittenKeyedStoreDelete).not.toHaveBeenCalled();
      expect(unwrittenKeyedStoreGetAll).not.toHaveBeenCalled();
      expect(unwrittenKeyedStoreGetKeys).not.toHaveBeenCalled();
      expect(keyedStoreWrittenToByMultipleGet).not.toHaveBeenCalled();
      expect(keyedStoreWrittenToByMultipleSet).not.toHaveBeenCalled();
      expect(keyedStoreWrittenToByMultipleDelete).not.toHaveBeenCalled();
      expect(keyedStoreWrittenToByMultipleGetAll).not.toHaveBeenCalled();
      expect(keyedStoreWrittenToByMultipleGetKeys).not.toHaveBeenCalled();
    });

    it(`does not interact with any triggers`, () => {
      expect(oneTimeTriggerUp).not.toHaveBeenCalled();
      expect(fileTriggerADown).not.toHaveBeenCalled();
      expect(fileTriggerAUp).not.toHaveBeenCalled();
      expect(fileTriggerBDown).not.toHaveBeenCalled();
      expect(fileTriggerBUp).not.toHaveBeenCalled();
      expect(fileTriggerCDown).not.toHaveBeenCalled();
      expect(fileTriggerCUp).not.toHaveBeenCalled();
      expect(storeAggregateTriggerInvalidated).not.toHaveBeenCalled();
      expect(
        storeAggregateTriggerFollowingStoreAggregateTriggerViaUnkeyedStoreInvalidated
      ).not.toHaveBeenCalled();
      expect(
        storeAggregateTriggerFollowingStoreAggregateTriggerViaKeyedStoreInvalidated
      ).not.toHaveBeenCalled();
      expect(
        storeAggregateTriggerFollowingKeyedStoreTriggerViaUnkeyedStoreInvalidated
      ).not.toHaveBeenCalled();
      expect(
        storeAggregateTriggerFollowingKeyedStoreTriggerViaKeyedStoreInvalidated
      ).not.toHaveBeenCalled();
      expect(keyedStoreTriggerDown).not.toHaveBeenCalled();
      expect(keyedStoreTriggerUp).not.toHaveBeenCalled();
      expect(
        keyedStoreTriggerFollowingStoreAggregateTriggerRefreshedViaUnkeyedStoreDown
      ).not.toHaveBeenCalled();
      expect(
        keyedStoreTriggerFollowingStoreAggregateTriggerRefreshedViaUnkeyedStoreUp
      ).not.toHaveBeenCalled();
      expect(
        keyedStoreTriggerFollowingStoreAggregateTriggerRefreshedViaKeyedStoreDown
      ).not.toHaveBeenCalled();
      expect(
        keyedStoreTriggerFollowingStoreAggregateTriggerRefreshedViaKeyedStoreUp
      ).not.toHaveBeenCalled();
      expect(
        keyedStoreTriggerFollowingKeyedStoreTriggerRefreshedViaUnkeyedStoreDown
      ).not.toHaveBeenCalled();
      expect(
        keyedStoreTriggerFollowingKeyedStoreTriggerRefreshedViaUnkeyedStoreUp
      ).not.toHaveBeenCalled();
      expect(
        keyedStoreTriggerFollowingKeyedStoreTriggerRefreshedViaKeyedStoreDown
      ).not.toHaveBeenCalled();
      expect(
        keyedStoreTriggerFollowingKeyedStoreTriggerRefreshedViaKeyedStoreUp
      ).not.toHaveBeenCalled();
      expect(
        keyedStoreTriggerFollowingStoreAggregateTriggerViaKeyedStoreDown
      ).not.toHaveBeenCalled();
      expect(
        keyedStoreTriggerFollowingStoreAggregateTriggerViaKeyedStoreUp
      ).not.toHaveBeenCalled();
      expect(
        keyedStoreTriggerFollowingKeyedStoreTriggerViaKeyedStoreDown
      ).not.toHaveBeenCalled();
      expect(
        keyedStoreTriggerFollowingKeyedStoreTriggerViaKeyedStoreUp
      ).not.toHaveBeenCalled();
      expect(keyedStoreTriggerFollowingMultipleDown).not.toHaveBeenCalled();
      expect(keyedStoreTriggerFollowingMultipleUp).not.toHaveBeenCalled();
    });
  });
});

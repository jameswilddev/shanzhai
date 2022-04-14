import {
  OneTimeTrigger,
  FileTrigger,
  KeyedStoreTrigger,
  StoreAggregateTrigger,
  Trigger,
  KeyedStore,
  UnkeyedStore,
} from "@shanzhai/interfaces";
import { listTriggerOrderingConstraints } from ".";

describe(`listTriggerOrderingConstraints`, () => {
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
  let unkeyedStoreWrittenToByOneTimeTriggerGet: jasmine.Spy;
  let unkeyedStoreWrittenToByOneTimeTriggerSet: jasmine.Spy;
  let unkeyedStoreWrittenToByOneTimeTrigger: UnkeyedStore<unknown>;
  let keyedStoreWrittenToByOneTimeTriggerGet: jasmine.Spy;
  let keyedStoreWrittenToByOneTimeTriggerSet: jasmine.Spy;
  let keyedStoreWrittenToByOneTimeTriggerDelete: jasmine.Spy;
  let keyedStoreWrittenToByOneTimeTriggerGetAll: jasmine.Spy;
  let keyedStoreWrittenToByOneTimeTriggerGetKeys: jasmine.Spy;
  let keyedStoreWrittenToByOneTimeTrigger: KeyedStore<unknown>;
  let unkeyedStoreWrittenToByFileTriggerGet: jasmine.Spy;
  let unkeyedStoreWrittenToByFileTriggerSet: jasmine.Spy;
  let unkeyedStoreWrittenToByFileTrigger: UnkeyedStore<unknown>;
  let keyedStoreWrittenToByFileTriggerGet: jasmine.Spy;
  let keyedStoreWrittenToByFileTriggerSet: jasmine.Spy;
  let keyedStoreWrittenToByFileTriggerDelete: jasmine.Spy;
  let keyedStoreWrittenToByFileTriggerGetAll: jasmine.Spy;
  let keyedStoreWrittenToByFileTriggerGetKeys: jasmine.Spy;
  let keyedStoreWrittenToByFileTrigger: KeyedStore<unknown>;
  let unwrittenKeyedStoreGet: jasmine.Spy;
  let unwrittenKeyedStoreSet: jasmine.Spy;
  let unwrittenKeyedStoreDelete: jasmine.Spy;
  let unwrittenKeyedStoreGetAll: jasmine.Spy;
  let unwrittenKeyedStoreGetKeys: jasmine.Spy;
  let unwrittenKeyedStore: KeyedStore<unknown>;
  let oneTimeTriggerUp: jasmine.Spy;
  let oneTimeTrigger: OneTimeTrigger;
  let fileTriggerDown: jasmine.Spy;
  let fileTriggerUp: jasmine.Spy;
  let fileTrigger: FileTrigger;
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
  let storeAggregateTriggerFollowingOneTimeTriggerViaUnkeyedStoreInvalidated: jasmine.Spy;
  let storeAggregateTriggerFollowingOneTimeTriggerViaUnkeyedStore: StoreAggregateTrigger;
  let storeAggregateTriggerFollowingOneTimeTriggerViaKeyedStoreInvalidated: jasmine.Spy;
  let storeAggregateTriggerFollowingOneTimeTriggerViaKeyedStore: StoreAggregateTrigger;
  let storeAggregateTriggerFollowingFileTriggerViaUnkeyedStoreInvalidated: jasmine.Spy;
  let storeAggregateTriggerFollowingFileTriggerViaUnkeyedStore: StoreAggregateTrigger;
  let storeAggregateTriggerFollowingFileTriggerViaKeyedStoreInvalidated: jasmine.Spy;
  let storeAggregateTriggerFollowingFileTriggerViaKeyedStore: StoreAggregateTrigger;
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
  let keyedStoreTriggerFollowingOneTimeTriggerRefreshedViaUnkeyedStoreDown: jasmine.Spy;
  let keyedStoreTriggerFollowingOneTimeTriggerRefreshedViaUnkeyedStoreUp: jasmine.Spy;
  let keyedStoreTriggerFollowingOneTimeTriggerRefreshedViaUnkeyedStore: KeyedStoreTrigger;
  let keyedStoreTriggerFollowingOneTimeTriggerRefreshedViaKeyedStoreDown: jasmine.Spy;
  let keyedStoreTriggerFollowingOneTimeTriggerRefreshedViaKeyedStoreUp: jasmine.Spy;
  let keyedStoreTriggerFollowingOneTimeTriggerRefreshedViaKeyedStore: KeyedStoreTrigger;
  let keyedStoreTriggerFollowingFileTriggerRefreshedViaUnkeyedStoreDown: jasmine.Spy;
  let keyedStoreTriggerFollowingFileTriggerRefreshedViaUnkeyedStoreUp: jasmine.Spy;
  let keyedStoreTriggerFollowingFileTriggerRefreshedViaUnkeyedStore: KeyedStoreTrigger;
  let keyedStoreTriggerFollowingFileTriggerRefreshedViaKeyedStoreDown: jasmine.Spy;
  let keyedStoreTriggerFollowingFileTriggerRefreshedViaKeyedStoreUp: jasmine.Spy;
  let keyedStoreTriggerFollowingFileTriggerRefreshedViaKeyedStore: KeyedStoreTrigger;
  let keyedStoreTriggerFollowingStoreAggregateTriggerViaKeyedStoreDown: jasmine.Spy;
  let keyedStoreTriggerFollowingStoreAggregateTriggerViaKeyedStoreUp: jasmine.Spy;
  let keyedStoreTriggerFollowingStoreAggregateTriggerViaKeyedStore: KeyedStoreTrigger;
  let keyedStoreTriggerFollowingKeyedStoreTriggerViaKeyedStoreDown: jasmine.Spy;
  let keyedStoreTriggerFollowingKeyedStoreTriggerViaKeyedStoreUp: jasmine.Spy;
  let keyedStoreTriggerFollowingKeyedStoreTriggerViaKeyedStore: KeyedStoreTrigger;
  let keyedStoreTriggerFollowingOneTimeTriggerViaKeyedStoreDown: jasmine.Spy;
  let keyedStoreTriggerFollowingOneTimeTriggerViaKeyedStoreUp: jasmine.Spy;
  let keyedStoreTriggerFollowingOneTimeTriggerViaKeyedStore: KeyedStoreTrigger;
  let keyedStoreTriggerFollowingFileTriggerViaKeyedStoreDown: jasmine.Spy;
  let keyedStoreTriggerFollowingFileTriggerViaKeyedStoreUp: jasmine.Spy;
  let keyedStoreTriggerFollowingFileTriggerViaKeyedStore: KeyedStoreTrigger;
  let orderingConstraints: ReadonlyArray<readonly [Trigger, Trigger]>;

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
    unkeyedStoreWrittenToByOneTimeTriggerGet = jasmine.createSpy(
      `unkeyedStoreWrittenToByOneTimeTriggerGet`
    );
    unkeyedStoreWrittenToByOneTimeTriggerSet = jasmine.createSpy(
      `unkeyedStoreWrittenToByOneTimeTriggerSet`
    );
    unkeyedStoreWrittenToByOneTimeTrigger = {
      type: `unkeyedStore`,
      name: `unkeyedStoreWrittenToByOneTimeTrigger`,
      get: unkeyedStoreWrittenToByOneTimeTriggerGet,
      set: unkeyedStoreWrittenToByOneTimeTriggerSet,
    };
    keyedStoreWrittenToByOneTimeTriggerGet = jasmine.createSpy(
      `keyedStoreWrittenToByOneTimeTriggerGet`
    );
    keyedStoreWrittenToByOneTimeTriggerSet = jasmine.createSpy(
      `keyedStoreWrittenToByOneTimeTriggerSet`
    );
    keyedStoreWrittenToByOneTimeTriggerDelete = jasmine.createSpy(
      `keyedStoreWrittenToByOneTimeTriggerDelete`
    );
    keyedStoreWrittenToByOneTimeTriggerGetAll = jasmine.createSpy(
      `keyedStoreWrittenToByOneTimeTriggerGetAll`
    );
    keyedStoreWrittenToByOneTimeTriggerGetKeys = jasmine.createSpy(
      `keyedStoreWrittenToByOneTimeTriggerGetKeys`
    );
    keyedStoreWrittenToByOneTimeTrigger = {
      type: `keyedStore`,
      name: `keyedStoreWrittenToByOneTimeTrigger`,
      get: keyedStoreWrittenToByOneTimeTriggerGet,
      set: keyedStoreWrittenToByOneTimeTriggerSet,
      delete: keyedStoreWrittenToByOneTimeTriggerDelete,
      getAll: keyedStoreWrittenToByOneTimeTriggerGetAll,
      getKeys: keyedStoreWrittenToByOneTimeTriggerGetKeys,
    };
    unkeyedStoreWrittenToByFileTriggerGet = jasmine.createSpy(
      `unkeyedStoreWrittenToByFileTriggerGet`
    );
    unkeyedStoreWrittenToByFileTriggerSet = jasmine.createSpy(
      `unkeyedStoreWrittenToByFileTriggerSet`
    );
    unkeyedStoreWrittenToByFileTrigger = {
      type: `unkeyedStore`,
      name: `unkeyedStoreWrittenToByFileTrigger`,
      get: unkeyedStoreWrittenToByFileTriggerGet,
      set: unkeyedStoreWrittenToByFileTriggerSet,
    };
    keyedStoreWrittenToByFileTriggerGet = jasmine.createSpy(
      `keyedStoreWrittenToByFileTriggerGet`
    );
    keyedStoreWrittenToByFileTriggerSet = jasmine.createSpy(
      `keyedStoreWrittenToByFileTriggerSet`
    );
    keyedStoreWrittenToByFileTriggerDelete = jasmine.createSpy(
      `keyedStoreWrittenToByFileTriggerDelete`
    );
    keyedStoreWrittenToByFileTriggerGetAll = jasmine.createSpy(
      `keyedStoreWrittenToByFileTriggerGetAll`
    );
    keyedStoreWrittenToByFileTriggerGetKeys = jasmine.createSpy(
      `keyedStoreWrittenToByFileTriggerGetKeys`
    );
    keyedStoreWrittenToByFileTrigger = {
      type: `keyedStore`,
      name: `keyedStoreWrittenToByFileTrigger`,
      get: keyedStoreWrittenToByFileTriggerGet,
      set: keyedStoreWrittenToByFileTriggerSet,
      delete: keyedStoreWrittenToByFileTriggerDelete,
      getAll: keyedStoreWrittenToByFileTriggerGetAll,
      getKeys: keyedStoreWrittenToByFileTriggerGetKeys,
    };
    unwrittenKeyedStoreGet = jasmine.createSpy(`unwrittenKeyedStoreGet`);
    unwrittenKeyedStoreSet = jasmine.createSpy(`unwrittenKeyedStoreSet`);
    unwrittenKeyedStoreDelete = jasmine.createSpy(`unwrittenKeyedStoreDelete`);
    unwrittenKeyedStoreGetAll = jasmine.createSpy(`unwrittenKeyedStoreGetAll`);
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
      writesToStores: [
        unkeyedStoreWrittenToByOneTimeTrigger,
        keyedStoreWrittenToByOneTimeTrigger,
      ],
    };
    fileTriggerDown = jasmine.createSpy(`fileTriggerDown`);
    fileTriggerUp = jasmine.createSpy(`fileTriggerUp`);
    fileTrigger = {
      type: `file`,
      glob: `**/*.*`,
      down: fileTriggerDown,
      up: fileTriggerUp,
      writesToStores: [
        unkeyedStoreWrittenToByFileTrigger,
        keyedStoreWrittenToByFileTrigger,
      ],
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
    storeAggregateTriggerFollowingOneTimeTriggerViaUnkeyedStoreInvalidated =
      jasmine.createSpy(
        `storeAggregateTriggerFollowingOneTimeTriggerViaUnkeyedStoreInvalidated`
      );
    storeAggregateTriggerFollowingOneTimeTriggerViaUnkeyedStore = {
      type: `storeAggregate`,
      stores: [unkeyedStoreWrittenToByOneTimeTrigger],
      invalidated:
        storeAggregateTriggerFollowingOneTimeTriggerViaUnkeyedStoreInvalidated,
      writesToStores: [],
    };
    storeAggregateTriggerFollowingOneTimeTriggerViaKeyedStoreInvalidated =
      jasmine.createSpy(
        `storeAggregateTriggerFollowingOneTimeTriggerViaKeyedStoreInvalidated`
      );
    storeAggregateTriggerFollowingOneTimeTriggerViaKeyedStore = {
      type: `storeAggregate`,
      stores: [keyedStoreWrittenToByOneTimeTrigger],
      invalidated:
        storeAggregateTriggerFollowingOneTimeTriggerViaKeyedStoreInvalidated,
      writesToStores: [],
    };
    storeAggregateTriggerFollowingFileTriggerViaUnkeyedStoreInvalidated =
      jasmine.createSpy(
        `storeAggregateTriggerFollowingFileTriggerViaUnkeyedStoreInvalidated`
      );
    storeAggregateTriggerFollowingFileTriggerViaUnkeyedStore = {
      type: `storeAggregate`,
      stores: [unkeyedStoreWrittenToByFileTrigger],
      invalidated:
        storeAggregateTriggerFollowingFileTriggerViaUnkeyedStoreInvalidated,
      writesToStores: [],
    };
    storeAggregateTriggerFollowingFileTriggerViaKeyedStoreInvalidated =
      jasmine.createSpy(
        `storeAggregateTriggerFollowingFileTriggerViaKeyedStoreInvalidated`
      );
    storeAggregateTriggerFollowingFileTriggerViaKeyedStore = {
      type: `storeAggregate`,
      stores: [keyedStoreWrittenToByFileTrigger],
      invalidated:
        storeAggregateTriggerFollowingFileTriggerViaKeyedStoreInvalidated,
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
    keyedStoreTriggerFollowingStoreAggregateTriggerRefreshedViaUnkeyedStore = {
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
      refreshAllWhenStoresChange: [keyedStoreWrittenToByStoreAggregateTrigger],
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
    keyedStoreTriggerFollowingOneTimeTriggerRefreshedViaUnkeyedStoreDown =
      jasmine.createSpy(
        `keyedStoreTriggerFollowingOneTimeTriggerRefreshedViaUnkeyedStoreDown`
      );
    keyedStoreTriggerFollowingOneTimeTriggerRefreshedViaUnkeyedStoreUp =
      jasmine.createSpy(
        `keyedStoreTriggerFollowingOneTimeTriggerRefreshedViaUnkeyedStoreUp`
      );
    keyedStoreTriggerFollowingOneTimeTriggerRefreshedViaUnkeyedStore = {
      type: `keyedStore`,
      keyedStore: unwrittenKeyedStore,
      refreshAllWhenStoresChange: [unkeyedStoreWrittenToByOneTimeTrigger],
      down: keyedStoreTriggerFollowingOneTimeTriggerRefreshedViaUnkeyedStoreDown,
      up: keyedStoreTriggerFollowingOneTimeTriggerRefreshedViaUnkeyedStoreUp,
      writesToStores: [],
    };
    keyedStoreTriggerFollowingOneTimeTriggerRefreshedViaKeyedStoreDown =
      jasmine.createSpy(
        `keyedStoreTriggerFollowingOneTimeTriggerRefreshedViaKeyedStoreDown`
      );
    keyedStoreTriggerFollowingOneTimeTriggerRefreshedViaKeyedStoreUp =
      jasmine.createSpy(
        `keyedStoreTriggerFollowingOneTimeTriggerRefreshedViaKeyedStoreUp`
      );
    keyedStoreTriggerFollowingOneTimeTriggerRefreshedViaKeyedStore = {
      type: `keyedStore`,
      keyedStore: unwrittenKeyedStore,
      refreshAllWhenStoresChange: [keyedStoreWrittenToByOneTimeTrigger],
      down: keyedStoreTriggerFollowingOneTimeTriggerRefreshedViaKeyedStoreDown,
      up: keyedStoreTriggerFollowingOneTimeTriggerRefreshedViaKeyedStoreUp,
      writesToStores: [],
    };
    keyedStoreTriggerFollowingFileTriggerRefreshedViaUnkeyedStoreDown =
      jasmine.createSpy(
        `keyedStoreTriggerFollowingFileTriggerRefreshedViaUnkeyedStoreDown`
      );
    keyedStoreTriggerFollowingFileTriggerRefreshedViaUnkeyedStoreUp =
      jasmine.createSpy(
        `keyedStoreTriggerFollowingFileTriggerRefreshedViaUnkeyedStoreUp`
      );
    keyedStoreTriggerFollowingFileTriggerRefreshedViaUnkeyedStore = {
      type: `keyedStore`,
      keyedStore: unwrittenKeyedStore,
      refreshAllWhenStoresChange: [unkeyedStoreWrittenToByFileTrigger],
      down: keyedStoreTriggerFollowingFileTriggerRefreshedViaUnkeyedStoreDown,
      up: keyedStoreTriggerFollowingFileTriggerRefreshedViaUnkeyedStoreUp,
      writesToStores: [],
    };
    keyedStoreTriggerFollowingFileTriggerRefreshedViaKeyedStoreDown =
      jasmine.createSpy(
        `keyedStoreTriggerFollowingFileTriggerRefreshedViaKeyedStoreDown`
      );
    keyedStoreTriggerFollowingFileTriggerRefreshedViaKeyedStoreUp =
      jasmine.createSpy(
        `keyedStoreTriggerFollowingFileTriggerRefreshedViaKeyedStoreUp`
      );
    keyedStoreTriggerFollowingFileTriggerRefreshedViaKeyedStore = {
      type: `keyedStore`,
      keyedStore: unwrittenKeyedStore,
      refreshAllWhenStoresChange: [keyedStoreWrittenToByFileTrigger],
      down: keyedStoreTriggerFollowingFileTriggerRefreshedViaKeyedStoreDown,
      up: keyedStoreTriggerFollowingFileTriggerRefreshedViaKeyedStoreUp,
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
      writesToStores: [],
    };
    keyedStoreTriggerFollowingOneTimeTriggerViaKeyedStoreDown =
      jasmine.createSpy(
        `keyedStoreTriggerFollowingOneTimeTriggerViaKeyedStoreDown`
      );
    keyedStoreTriggerFollowingOneTimeTriggerViaKeyedStoreUp = jasmine.createSpy(
      `keyedStoreTriggerFollowingOneTimeTriggerViaKeyedStoreUp`
    );
    keyedStoreTriggerFollowingOneTimeTriggerViaKeyedStore = {
      type: `keyedStore`,
      keyedStore: keyedStoreWrittenToByOneTimeTrigger,
      refreshAllWhenStoresChange: [],
      down: keyedStoreTriggerFollowingOneTimeTriggerViaKeyedStoreDown,
      up: keyedStoreTriggerFollowingOneTimeTriggerViaKeyedStoreUp,
      writesToStores: [],
    };
    keyedStoreTriggerFollowingFileTriggerViaKeyedStoreDown = jasmine.createSpy(
      `keyedStoreTriggerFollowingFileTriggerViaKeyedStoreDown`
    );
    keyedStoreTriggerFollowingFileTriggerViaKeyedStoreUp = jasmine.createSpy(
      `keyedStoreTriggerFollowingFileTriggerViaKeyedStoreUp`
    );
    keyedStoreTriggerFollowingFileTriggerViaKeyedStore = {
      type: `keyedStore`,
      keyedStore: keyedStoreWrittenToByFileTrigger,
      refreshAllWhenStoresChange: [],
      down: keyedStoreTriggerFollowingFileTriggerViaKeyedStoreDown,
      up: keyedStoreTriggerFollowingFileTriggerViaKeyedStoreUp,
      writesToStores: [],
    };

    orderingConstraints = listTriggerOrderingConstraints([
      storeAggregateTriggerFollowingOneTimeTriggerViaUnkeyedStore,
      storeAggregateTriggerFollowingFileTriggerViaKeyedStore,
      storeAggregateTriggerFollowingFileTriggerViaUnkeyedStore,
      keyedStoreTriggerFollowingStoreAggregateTriggerRefreshedViaKeyedStore,
      keyedStoreTriggerFollowingStoreAggregateTriggerRefreshedViaUnkeyedStore,
      keyedStoreTriggerFollowingStoreAggregateTriggerViaKeyedStore,
      keyedStoreTriggerFollowingOneTimeTriggerRefreshedViaKeyedStore,
      fileTrigger,
      keyedStoreTrigger,
      keyedStoreTriggerFollowingKeyedStoreTriggerRefreshedViaKeyedStore,
      keyedStoreTriggerFollowingKeyedStoreTriggerRefreshedViaUnkeyedStore,
      keyedStoreTriggerFollowingKeyedStoreTriggerViaKeyedStore,
      keyedStoreTriggerFollowingFileTriggerRefreshedViaKeyedStore,
      keyedStoreTriggerFollowingFileTriggerRefreshedViaUnkeyedStore,
      keyedStoreTriggerFollowingFileTriggerViaKeyedStore,
      oneTimeTrigger,
      storeAggregateTrigger,
      storeAggregateTriggerFollowingKeyedStoreTriggerViaKeyedStore,
      storeAggregateTriggerFollowingKeyedStoreTriggerViaUnkeyedStore,
      storeAggregateTriggerFollowingStoreAggregateTriggerViaKeyedStore,
      storeAggregateTriggerFollowingStoreAggregateTriggerViaUnkeyedStore,
      storeAggregateTriggerFollowingOneTimeTriggerViaKeyedStore,
      keyedStoreTriggerFollowingOneTimeTriggerRefreshedViaUnkeyedStore,
      keyedStoreTriggerFollowingOneTimeTriggerViaKeyedStore,
    ]);
  });

  const checkOrder = (a: Trigger, b: Trigger): void => {
    expect(orderingConstraints).toContain([a, b]);
  };

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

  it(`lists keyed store triggers after one time triggers which write to their main store`, () => {
    checkOrder(
      oneTimeTrigger,
      keyedStoreTriggerFollowingOneTimeTriggerViaKeyedStore
    );
  });

  it(`lists keyed store triggers after one time triggers which write to a keyed store they aggregate`, () => {
    checkOrder(
      oneTimeTrigger,
      keyedStoreTriggerFollowingOneTimeTriggerRefreshedViaKeyedStore
    );
  });

  it(`lists keyed store triggers after one time triggers which write to an unkeyed store they aggregate`, () => {
    checkOrder(
      oneTimeTrigger,
      keyedStoreTriggerFollowingOneTimeTriggerRefreshedViaUnkeyedStore
    );
  });

  it(`lists keyed store triggers after file triggers which write to their main store`, () => {
    checkOrder(fileTrigger, keyedStoreTriggerFollowingFileTriggerViaKeyedStore);
  });

  it(`lists keyed store triggers after file triggers which write to a keyed store they aggregate`, () => {
    checkOrder(
      fileTrigger,
      keyedStoreTriggerFollowingFileTriggerRefreshedViaKeyedStore
    );
  });

  it(`lists keyed store triggers after file triggers which write to an unkeyed store they aggregate`, () => {
    checkOrder(
      fileTrigger,
      keyedStoreTriggerFollowingFileTriggerRefreshedViaUnkeyedStore
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

  it(`lists store aggregate triggers after one time triggers which write to an unkeyed store they aggregate`, () => {
    checkOrder(
      oneTimeTrigger,
      storeAggregateTriggerFollowingOneTimeTriggerViaUnkeyedStore
    );
  });

  it(`lists store aggregate triggers after one time triggers which write to a keyed store they aggregate`, () => {
    checkOrder(
      oneTimeTrigger,
      storeAggregateTriggerFollowingOneTimeTriggerViaKeyedStore
    );
  });

  it(`lists store aggregate triggers after file triggers which write to an unkeyed store they aggregate`, () => {
    checkOrder(
      fileTrigger,
      storeAggregateTriggerFollowingFileTriggerViaUnkeyedStore
    );
  });

  it(`lists store aggregate triggers after file triggers which write to a keyed store they aggregate`, () => {
    checkOrder(
      fileTrigger,
      storeAggregateTriggerFollowingFileTriggerViaKeyedStore
    );
  });

  it(`does not list any further orderings`, () => {
    expect(orderingConstraints.length).toEqual(20);
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
    expect(unkeyedStoreWrittenToByKeyedStoreTriggerGet).not.toHaveBeenCalled();
    expect(unkeyedStoreWrittenToByKeyedStoreTriggerSet).not.toHaveBeenCalled();
    expect(keyedStoreWrittenToByKeyedStoreTriggerGet).not.toHaveBeenCalled();
    expect(keyedStoreWrittenToByKeyedStoreTriggerSet).not.toHaveBeenCalled();
    expect(keyedStoreWrittenToByKeyedStoreTriggerDelete).not.toHaveBeenCalled();
    expect(keyedStoreWrittenToByKeyedStoreTriggerGetAll).not.toHaveBeenCalled();
    expect(
      keyedStoreWrittenToByKeyedStoreTriggerGetKeys
    ).not.toHaveBeenCalled();
    expect(unkeyedStoreWrittenToByOneTimeTriggerGet).not.toHaveBeenCalled();
    expect(unkeyedStoreWrittenToByOneTimeTriggerSet).not.toHaveBeenCalled();
    expect(keyedStoreWrittenToByOneTimeTriggerGet).not.toHaveBeenCalled();
    expect(keyedStoreWrittenToByOneTimeTriggerSet).not.toHaveBeenCalled();
    expect(keyedStoreWrittenToByOneTimeTriggerDelete).not.toHaveBeenCalled();
    expect(keyedStoreWrittenToByOneTimeTriggerGetAll).not.toHaveBeenCalled();
    expect(keyedStoreWrittenToByOneTimeTriggerGetKeys).not.toHaveBeenCalled();
    expect(unkeyedStoreWrittenToByFileTriggerGet).not.toHaveBeenCalled();
    expect(unkeyedStoreWrittenToByFileTriggerSet).not.toHaveBeenCalled();
    expect(keyedStoreWrittenToByFileTriggerGet).not.toHaveBeenCalled();
    expect(keyedStoreWrittenToByFileTriggerSet).not.toHaveBeenCalled();
    expect(keyedStoreWrittenToByFileTriggerDelete).not.toHaveBeenCalled();
    expect(keyedStoreWrittenToByFileTriggerGetAll).not.toHaveBeenCalled();
    expect(keyedStoreWrittenToByFileTriggerGetKeys).not.toHaveBeenCalled();
    expect(unwrittenKeyedStoreGet).not.toHaveBeenCalled();
    expect(unwrittenKeyedStoreSet).not.toHaveBeenCalled();
    expect(unwrittenKeyedStoreDelete).not.toHaveBeenCalled();
    expect(unwrittenKeyedStoreGetAll).not.toHaveBeenCalled();
    expect(unwrittenKeyedStoreGetKeys).not.toHaveBeenCalled();
  });

  it(`does not interact with any triggers`, () => {
    expect(oneTimeTriggerUp).not.toHaveBeenCalled();
    expect(fileTriggerDown).not.toHaveBeenCalled();
    expect(fileTriggerUp).not.toHaveBeenCalled();
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
    expect(
      storeAggregateTriggerFollowingOneTimeTriggerViaUnkeyedStoreInvalidated
    ).not.toHaveBeenCalled();
    expect(
      storeAggregateTriggerFollowingOneTimeTriggerViaKeyedStoreInvalidated
    ).not.toHaveBeenCalled();
    expect(
      storeAggregateTriggerFollowingFileTriggerViaUnkeyedStoreInvalidated
    ).not.toHaveBeenCalled();
    expect(
      storeAggregateTriggerFollowingFileTriggerViaKeyedStoreInvalidated
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
      keyedStoreTriggerFollowingStoreAggregateTriggerViaKeyedStoreDown
    ).not.toHaveBeenCalled();
    expect(
      keyedStoreTriggerFollowingStoreAggregateTriggerViaKeyedStoreUp
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
      keyedStoreTriggerFollowingKeyedStoreTriggerViaKeyedStoreDown
    ).not.toHaveBeenCalled();
    expect(
      keyedStoreTriggerFollowingKeyedStoreTriggerViaKeyedStoreUp
    ).not.toHaveBeenCalled();
    expect(
      keyedStoreTriggerFollowingOneTimeTriggerRefreshedViaUnkeyedStoreDown
    ).not.toHaveBeenCalled();
    expect(
      keyedStoreTriggerFollowingOneTimeTriggerRefreshedViaUnkeyedStoreUp
    ).not.toHaveBeenCalled();
    expect(
      keyedStoreTriggerFollowingOneTimeTriggerRefreshedViaKeyedStoreDown
    ).not.toHaveBeenCalled();
    expect(
      keyedStoreTriggerFollowingOneTimeTriggerRefreshedViaKeyedStoreUp
    ).not.toHaveBeenCalled();
    expect(
      keyedStoreTriggerFollowingOneTimeTriggerViaKeyedStoreDown
    ).not.toHaveBeenCalled();
    expect(
      keyedStoreTriggerFollowingOneTimeTriggerViaKeyedStoreUp
    ).not.toHaveBeenCalled();
    expect(
      keyedStoreTriggerFollowingFileTriggerRefreshedViaUnkeyedStoreDown
    ).not.toHaveBeenCalled();
    expect(
      keyedStoreTriggerFollowingFileTriggerRefreshedViaUnkeyedStoreUp
    ).not.toHaveBeenCalled();
    expect(
      keyedStoreTriggerFollowingFileTriggerRefreshedViaKeyedStoreDown
    ).not.toHaveBeenCalled();
    expect(
      keyedStoreTriggerFollowingFileTriggerRefreshedViaKeyedStoreUp
    ).not.toHaveBeenCalled();
    expect(
      keyedStoreTriggerFollowingFileTriggerViaKeyedStoreDown
    ).not.toHaveBeenCalled();
    expect(
      keyedStoreTriggerFollowingFileTriggerViaKeyedStoreUp
    ).not.toHaveBeenCalled();
  });
});

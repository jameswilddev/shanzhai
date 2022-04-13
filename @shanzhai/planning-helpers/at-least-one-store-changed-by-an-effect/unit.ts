import { KeyedStore, UnkeyedStore } from "@shanzhai/interfaces";
import { atLeastOneStoreChangedByAnEffect } from ".";

describe(`atLeastOneStoreChangedByAnEffect`, () => {
  describe(`when no stores are affected`, () => {
    let listedUnkeyedStoreGet: jasmine.Spy;
    let listedUnkeyedStoreSet: jasmine.Spy;
    let listedUnkeyedStore: UnkeyedStore<unknown>;
    let listedKeyedStoreGet: jasmine.Spy;
    let listedKeyedStoreSet: jasmine.Spy;
    let listedKeyedStoreDelete: jasmine.Spy;
    let listedKeyedStoreGetAll: jasmine.Spy;
    let listedKeyedStoreGetKeys: jasmine.Spy;
    let listedKeyedStore: KeyedStore<unknown>;
    let setUnkeyedStoreGet: jasmine.Spy;
    let setUnkeyedStoreSet: jasmine.Spy;
    let setUnkeyedStore: UnkeyedStore<unknown>;
    let setKeyedStoreGet: jasmine.Spy;
    let setKeyedStoreSet: jasmine.Spy;
    let setKeyedStoreDelete: jasmine.Spy;
    let setKeyedStoreGetAll: jasmine.Spy;
    let setKeyedStoreGetKeys: jasmine.Spy;
    let setKeyedStore: KeyedStore<unknown>;
    let deletedKeyedStoreGet: jasmine.Spy;
    let deletedKeyedStoreSet: jasmine.Spy;
    let deletedKeyedStoreDelete: jasmine.Spy;
    let deletedKeyedStoreGetAll: jasmine.Spy;
    let deletedKeyedStoreGetKeys: jasmine.Spy;
    let deletedKeyedStore: KeyedStore<unknown>;
    let result: boolean;

    beforeAll(() => {
      listedUnkeyedStoreGet = jasmine.createSpy(`listedUnkeyedStoreGet`);
      listedUnkeyedStoreSet = jasmine.createSpy(`listedUnkeyedStoreSet`);
      listedUnkeyedStore = {
        type: `unkeyedStore`,
        name: `listedUnkeyedStore`,
        get: listedUnkeyedStoreGet,
        set: listedUnkeyedStoreSet,
      };
      listedKeyedStoreGet = jasmine.createSpy(`listedKeyedStoreGet`);
      listedKeyedStoreSet = jasmine.createSpy(`listedKeyedStoreSet`);
      listedKeyedStoreDelete = jasmine.createSpy(`listedKeyedStoreDelete`);
      listedKeyedStoreGetAll = jasmine.createSpy(`listedKeyedStoreGetAll`);
      listedKeyedStoreGetKeys = jasmine.createSpy(`listedKeyedStoreGetKeys`);
      listedKeyedStore = {
        type: `keyedStore`,
        name: `listedKeyedStore`,
        get: listedKeyedStoreGet,
        set: listedKeyedStoreSet,
        delete: listedKeyedStoreDelete,
        getAll: listedKeyedStoreGetAll,
        getKeys: listedKeyedStoreGetKeys,
      };
      setUnkeyedStoreGet = jasmine.createSpy(`setUnkeyedStoreGet`);
      setUnkeyedStoreSet = jasmine.createSpy(`setUnkeyedStoreSet`);
      setUnkeyedStore = {
        type: `unkeyedStore`,
        name: `setUnkeyedStore`,
        get: setUnkeyedStoreGet,
        set: setUnkeyedStoreSet,
      };
      setKeyedStoreGet = jasmine.createSpy(`setKeyedStoreGet`);
      setKeyedStoreSet = jasmine.createSpy(`setKeyedStoreSet`);
      setKeyedStoreDelete = jasmine.createSpy(`setKeyedStoreDelete`);
      setKeyedStoreGetAll = jasmine.createSpy(`setKeyedStoreGetAll`);
      setKeyedStoreGetKeys = jasmine.createSpy(`setKeyedStoreGetKeys`);
      setKeyedStore = {
        type: `keyedStore`,
        name: `setKeyedStore`,
        get: setKeyedStoreGet,
        set: setKeyedStoreSet,
        delete: setKeyedStoreDelete,
        getAll: setKeyedStoreGetAll,
        getKeys: setKeyedStoreGetKeys,
      };
      deletedKeyedStoreGet = jasmine.createSpy(`deletedKeyedStoreGet`);
      deletedKeyedStoreSet = jasmine.createSpy(`deletedKeyedStoreSet`);
      deletedKeyedStoreDelete = jasmine.createSpy(`deletedKeyedStoreDelete`);
      deletedKeyedStoreGetAll = jasmine.createSpy(`deletedKeyedStoreGetAll`);
      deletedKeyedStoreGetKeys = jasmine.createSpy(`deletedKeyedStoreGetKeys`);
      deletedKeyedStore = {
        type: `keyedStore`,
        name: `deletedKeyedStore`,
        get: deletedKeyedStoreGet,
        set: deletedKeyedStoreSet,
        delete: deletedKeyedStoreDelete,
        getAll: deletedKeyedStoreGetAll,
        getKeys: deletedKeyedStoreGetKeys,
      };

      result = atLeastOneStoreChangedByAnEffect(
        [listedUnkeyedStore, listedKeyedStore],
        [
          {
            type: `unkeyedStoreSet`,
            unkeyedStore: setUnkeyedStore,
          },
          {
            type: `keyedStoreSet`,
            keyedStore: setKeyedStore,
            key: `Test Key A`,
          },
          {
            type: `keyedStoreDelete`,
            keyedStore: deletedKeyedStore,
            key: `Test Key B`,
          },
        ]
      );
    });

    it(`does not interact with any stores`, () => {
      expect(listedUnkeyedStoreGet).not.toHaveBeenCalled();
      expect(listedUnkeyedStoreSet).not.toHaveBeenCalled();
      expect(listedKeyedStoreGet).not.toHaveBeenCalled();
      expect(listedKeyedStoreSet).not.toHaveBeenCalled();
      expect(listedKeyedStoreDelete).not.toHaveBeenCalled();
      expect(listedKeyedStoreGetAll).not.toHaveBeenCalled();
      expect(listedKeyedStoreGetKeys).not.toHaveBeenCalled();
      expect(setUnkeyedStoreGet).not.toHaveBeenCalled();
      expect(setUnkeyedStoreSet).not.toHaveBeenCalled();
      expect(setKeyedStoreGet).not.toHaveBeenCalled();
      expect(setKeyedStoreSet).not.toHaveBeenCalled();
      expect(setKeyedStoreDelete).not.toHaveBeenCalled();
      expect(setKeyedStoreGetAll).not.toHaveBeenCalled();
      expect(setKeyedStoreGetKeys).not.toHaveBeenCalled();
      expect(deletedKeyedStoreGet).not.toHaveBeenCalled();
      expect(deletedKeyedStoreSet).not.toHaveBeenCalled();
      expect(deletedKeyedStoreDelete).not.toHaveBeenCalled();
      expect(deletedKeyedStoreGetAll).not.toHaveBeenCalled();
      expect(deletedKeyedStoreGetKeys).not.toHaveBeenCalled();
    });

    it(`returns false`, () => {
      expect(result).toBeFalse();
    });
  });

  describe(`when a listed unkeyed store is set`, () => {
    let listedUnkeyedStoreGet: jasmine.Spy;
    let listedUnkeyedStoreSet: jasmine.Spy;
    let listedUnkeyedStore: UnkeyedStore<unknown>;
    let listedKeyedStoreGet: jasmine.Spy;
    let listedKeyedStoreSet: jasmine.Spy;
    let listedKeyedStoreDelete: jasmine.Spy;
    let listedKeyedStoreGetAll: jasmine.Spy;
    let listedKeyedStoreGetKeys: jasmine.Spy;
    let listedKeyedStore: KeyedStore<unknown>;
    let setUnkeyedStoreGet: jasmine.Spy;
    let setUnkeyedStoreSet: jasmine.Spy;
    let setUnkeyedStore: UnkeyedStore<unknown>;
    let setKeyedStoreGet: jasmine.Spy;
    let setKeyedStoreSet: jasmine.Spy;
    let setKeyedStoreDelete: jasmine.Spy;
    let setKeyedStoreGetAll: jasmine.Spy;
    let setKeyedStoreGetKeys: jasmine.Spy;
    let setKeyedStore: KeyedStore<unknown>;
    let deletedKeyedStoreGet: jasmine.Spy;
    let deletedKeyedStoreSet: jasmine.Spy;
    let deletedKeyedStoreDelete: jasmine.Spy;
    let deletedKeyedStoreGetAll: jasmine.Spy;
    let deletedKeyedStoreGetKeys: jasmine.Spy;
    let deletedKeyedStore: KeyedStore<unknown>;
    let result: boolean;

    beforeAll(() => {
      listedUnkeyedStoreGet = jasmine.createSpy(`listedUnkeyedStoreGet`);
      listedUnkeyedStoreSet = jasmine.createSpy(`listedUnkeyedStoreSet`);
      listedUnkeyedStore = {
        type: `unkeyedStore`,
        name: `listedUnkeyedStore`,
        get: listedUnkeyedStoreGet,
        set: listedUnkeyedStoreSet,
      };
      listedKeyedStoreGet = jasmine.createSpy(`listedKeyedStoreGet`);
      listedKeyedStoreSet = jasmine.createSpy(`listedKeyedStoreSet`);
      listedKeyedStoreDelete = jasmine.createSpy(`listedKeyedStoreDelete`);
      listedKeyedStoreGetAll = jasmine.createSpy(`listedKeyedStoreGetAll`);
      listedKeyedStoreGetKeys = jasmine.createSpy(`listedKeyedStoreGetKeys`);
      listedKeyedStore = {
        type: `keyedStore`,
        name: `listedKeyedStore`,
        get: listedKeyedStoreGet,
        set: listedKeyedStoreSet,
        delete: listedKeyedStoreDelete,
        getAll: listedKeyedStoreGetAll,
        getKeys: listedKeyedStoreGetKeys,
      };
      setUnkeyedStoreGet = jasmine.createSpy(`setUnkeyedStoreGet`);
      setUnkeyedStoreSet = jasmine.createSpy(`setUnkeyedStoreSet`);
      setUnkeyedStore = {
        type: `unkeyedStore`,
        name: `setUnkeyedStore`,
        get: setUnkeyedStoreGet,
        set: setUnkeyedStoreSet,
      };
      setKeyedStoreGet = jasmine.createSpy(`setKeyedStoreGet`);
      setKeyedStoreSet = jasmine.createSpy(`setKeyedStoreSet`);
      setKeyedStoreDelete = jasmine.createSpy(`setKeyedStoreDelete`);
      setKeyedStoreGetAll = jasmine.createSpy(`setKeyedStoreGetAll`);
      setKeyedStoreGetKeys = jasmine.createSpy(`setKeyedStoreGetKeys`);
      setKeyedStore = {
        type: `keyedStore`,
        name: `setKeyedStore`,
        get: setKeyedStoreGet,
        set: setKeyedStoreSet,
        delete: setKeyedStoreDelete,
        getAll: setKeyedStoreGetAll,
        getKeys: setKeyedStoreGetKeys,
      };
      deletedKeyedStoreGet = jasmine.createSpy(`deletedKeyedStoreGet`);
      deletedKeyedStoreSet = jasmine.createSpy(`deletedKeyedStoreSet`);
      deletedKeyedStoreDelete = jasmine.createSpy(`deletedKeyedStoreDelete`);
      deletedKeyedStoreGetAll = jasmine.createSpy(`deletedKeyedStoreGetAll`);
      deletedKeyedStoreGetKeys = jasmine.createSpy(`deletedKeyedStoreGetKeys`);
      deletedKeyedStore = {
        type: `keyedStore`,
        name: `deletedKeyedStore`,
        get: deletedKeyedStoreGet,
        set: deletedKeyedStoreSet,
        delete: deletedKeyedStoreDelete,
        getAll: deletedKeyedStoreGetAll,
        getKeys: deletedKeyedStoreGetKeys,
      };

      result = atLeastOneStoreChangedByAnEffect(
        [listedUnkeyedStore, listedKeyedStore],
        [
          {
            type: `unkeyedStoreSet`,
            unkeyedStore: setUnkeyedStore,
          },
          {
            type: `keyedStoreSet`,
            keyedStore: setKeyedStore,
            key: `Test Key A`,
          },
          {
            type: `unkeyedStoreSet`,
            unkeyedStore: listedUnkeyedStore,
          },
          {
            type: `keyedStoreDelete`,
            keyedStore: deletedKeyedStore,
            key: `Test Key B`,
          },
        ]
      );
    });

    it(`does not interact with any stores`, () => {
      expect(listedUnkeyedStoreGet).not.toHaveBeenCalled();
      expect(listedUnkeyedStoreSet).not.toHaveBeenCalled();
      expect(listedKeyedStoreGet).not.toHaveBeenCalled();
      expect(listedKeyedStoreSet).not.toHaveBeenCalled();
      expect(listedKeyedStoreDelete).not.toHaveBeenCalled();
      expect(listedKeyedStoreGetAll).not.toHaveBeenCalled();
      expect(listedKeyedStoreGetKeys).not.toHaveBeenCalled();
      expect(setUnkeyedStoreGet).not.toHaveBeenCalled();
      expect(setUnkeyedStoreSet).not.toHaveBeenCalled();
      expect(setKeyedStoreGet).not.toHaveBeenCalled();
      expect(setKeyedStoreSet).not.toHaveBeenCalled();
      expect(setKeyedStoreDelete).not.toHaveBeenCalled();
      expect(setKeyedStoreGetAll).not.toHaveBeenCalled();
      expect(setKeyedStoreGetKeys).not.toHaveBeenCalled();
      expect(deletedKeyedStoreGet).not.toHaveBeenCalled();
      expect(deletedKeyedStoreSet).not.toHaveBeenCalled();
      expect(deletedKeyedStoreDelete).not.toHaveBeenCalled();
      expect(deletedKeyedStoreGetAll).not.toHaveBeenCalled();
      expect(deletedKeyedStoreGetKeys).not.toHaveBeenCalled();
    });

    it(`returns true`, () => {
      expect(result).toBeTrue();
    });
  });

  describe(`when a listed keyed store is set`, () => {
    let listedUnkeyedStoreGet: jasmine.Spy;
    let listedUnkeyedStoreSet: jasmine.Spy;
    let listedUnkeyedStore: UnkeyedStore<unknown>;
    let listedKeyedStoreGet: jasmine.Spy;
    let listedKeyedStoreSet: jasmine.Spy;
    let listedKeyedStoreDelete: jasmine.Spy;
    let listedKeyedStoreGetAll: jasmine.Spy;
    let listedKeyedStoreGetKeys: jasmine.Spy;
    let listedKeyedStore: KeyedStore<unknown>;
    let setUnkeyedStoreGet: jasmine.Spy;
    let setUnkeyedStoreSet: jasmine.Spy;
    let setUnkeyedStore: UnkeyedStore<unknown>;
    let setKeyedStoreGet: jasmine.Spy;
    let setKeyedStoreSet: jasmine.Spy;
    let setKeyedStoreDelete: jasmine.Spy;
    let setKeyedStoreGetAll: jasmine.Spy;
    let setKeyedStoreGetKeys: jasmine.Spy;
    let setKeyedStore: KeyedStore<unknown>;
    let deletedKeyedStoreGet: jasmine.Spy;
    let deletedKeyedStoreSet: jasmine.Spy;
    let deletedKeyedStoreDelete: jasmine.Spy;
    let deletedKeyedStoreGetAll: jasmine.Spy;
    let deletedKeyedStoreGetKeys: jasmine.Spy;
    let deletedKeyedStore: KeyedStore<unknown>;
    let result: boolean;

    beforeAll(() => {
      listedUnkeyedStoreGet = jasmine.createSpy(`listedUnkeyedStoreGet`);
      listedUnkeyedStoreSet = jasmine.createSpy(`listedUnkeyedStoreSet`);
      listedUnkeyedStore = {
        type: `unkeyedStore`,
        name: `listedUnkeyedStore`,
        get: listedUnkeyedStoreGet,
        set: listedUnkeyedStoreSet,
      };
      listedKeyedStoreGet = jasmine.createSpy(`listedKeyedStoreGet`);
      listedKeyedStoreSet = jasmine.createSpy(`listedKeyedStoreSet`);
      listedKeyedStoreDelete = jasmine.createSpy(`listedKeyedStoreDelete`);
      listedKeyedStoreGetAll = jasmine.createSpy(`listedKeyedStoreGetAll`);
      listedKeyedStoreGetKeys = jasmine.createSpy(`listedKeyedStoreGetKeys`);
      listedKeyedStore = {
        type: `keyedStore`,
        name: `listedKeyedStore`,
        get: listedKeyedStoreGet,
        set: listedKeyedStoreSet,
        delete: listedKeyedStoreDelete,
        getAll: listedKeyedStoreGetAll,
        getKeys: listedKeyedStoreGetKeys,
      };
      setUnkeyedStoreGet = jasmine.createSpy(`setUnkeyedStoreGet`);
      setUnkeyedStoreSet = jasmine.createSpy(`setUnkeyedStoreSet`);
      setUnkeyedStore = {
        type: `unkeyedStore`,
        name: `setUnkeyedStore`,
        get: setUnkeyedStoreGet,
        set: setUnkeyedStoreSet,
      };
      setKeyedStoreGet = jasmine.createSpy(`setKeyedStoreGet`);
      setKeyedStoreSet = jasmine.createSpy(`setKeyedStoreSet`);
      setKeyedStoreDelete = jasmine.createSpy(`setKeyedStoreDelete`);
      setKeyedStoreGetAll = jasmine.createSpy(`setKeyedStoreGetAll`);
      setKeyedStoreGetKeys = jasmine.createSpy(`setKeyedStoreGetKeys`);
      setKeyedStore = {
        type: `keyedStore`,
        name: `setKeyedStore`,
        get: setKeyedStoreGet,
        set: setKeyedStoreSet,
        delete: setKeyedStoreDelete,
        getAll: setKeyedStoreGetAll,
        getKeys: setKeyedStoreGetKeys,
      };
      deletedKeyedStoreGet = jasmine.createSpy(`deletedKeyedStoreGet`);
      deletedKeyedStoreSet = jasmine.createSpy(`deletedKeyedStoreSet`);
      deletedKeyedStoreDelete = jasmine.createSpy(`deletedKeyedStoreDelete`);
      deletedKeyedStoreGetAll = jasmine.createSpy(`deletedKeyedStoreGetAll`);
      deletedKeyedStoreGetKeys = jasmine.createSpy(`deletedKeyedStoreGetKeys`);
      deletedKeyedStore = {
        type: `keyedStore`,
        name: `deletedKeyedStore`,
        get: deletedKeyedStoreGet,
        set: deletedKeyedStoreSet,
        delete: deletedKeyedStoreDelete,
        getAll: deletedKeyedStoreGetAll,
        getKeys: deletedKeyedStoreGetKeys,
      };

      result = atLeastOneStoreChangedByAnEffect(
        [listedUnkeyedStore, listedKeyedStore],
        [
          {
            type: `unkeyedStoreSet`,
            unkeyedStore: setUnkeyedStore,
          },
          {
            type: `keyedStoreSet`,
            keyedStore: setKeyedStore,
            key: `Test Key A`,
          },
          {
            type: `keyedStoreSet`,
            keyedStore: listedKeyedStore,
            key: `Test Key C`,
          },
          {
            type: `keyedStoreDelete`,
            keyedStore: deletedKeyedStore,
            key: `Test Key B`,
          },
        ]
      );
    });

    it(`does not interact with any stores`, () => {
      expect(listedUnkeyedStoreGet).not.toHaveBeenCalled();
      expect(listedUnkeyedStoreSet).not.toHaveBeenCalled();
      expect(listedKeyedStoreGet).not.toHaveBeenCalled();
      expect(listedKeyedStoreSet).not.toHaveBeenCalled();
      expect(listedKeyedStoreDelete).not.toHaveBeenCalled();
      expect(listedKeyedStoreGetAll).not.toHaveBeenCalled();
      expect(listedKeyedStoreGetKeys).not.toHaveBeenCalled();
      expect(setUnkeyedStoreGet).not.toHaveBeenCalled();
      expect(setUnkeyedStoreSet).not.toHaveBeenCalled();
      expect(setKeyedStoreGet).not.toHaveBeenCalled();
      expect(setKeyedStoreSet).not.toHaveBeenCalled();
      expect(setKeyedStoreDelete).not.toHaveBeenCalled();
      expect(setKeyedStoreGetAll).not.toHaveBeenCalled();
      expect(setKeyedStoreGetKeys).not.toHaveBeenCalled();
      expect(deletedKeyedStoreGet).not.toHaveBeenCalled();
      expect(deletedKeyedStoreSet).not.toHaveBeenCalled();
      expect(deletedKeyedStoreDelete).not.toHaveBeenCalled();
      expect(deletedKeyedStoreGetAll).not.toHaveBeenCalled();
      expect(deletedKeyedStoreGetKeys).not.toHaveBeenCalled();
    });

    it(`returns true`, () => {
      expect(result).toBeTrue();
    });
  });

  describe(`when a listed keyed store is deleted`, () => {
    let listedUnkeyedStoreGet: jasmine.Spy;
    let listedUnkeyedStoreSet: jasmine.Spy;
    let listedUnkeyedStore: UnkeyedStore<unknown>;
    let listedKeyedStoreGet: jasmine.Spy;
    let listedKeyedStoreSet: jasmine.Spy;
    let listedKeyedStoreDelete: jasmine.Spy;
    let listedKeyedStoreGetAll: jasmine.Spy;
    let listedKeyedStoreGetKeys: jasmine.Spy;
    let listedKeyedStore: KeyedStore<unknown>;
    let setUnkeyedStoreGet: jasmine.Spy;
    let setUnkeyedStoreSet: jasmine.Spy;
    let setUnkeyedStore: UnkeyedStore<unknown>;
    let setKeyedStoreGet: jasmine.Spy;
    let setKeyedStoreSet: jasmine.Spy;
    let setKeyedStoreDelete: jasmine.Spy;
    let setKeyedStoreGetAll: jasmine.Spy;
    let setKeyedStoreGetKeys: jasmine.Spy;
    let setKeyedStore: KeyedStore<unknown>;
    let deletedKeyedStoreGet: jasmine.Spy;
    let deletedKeyedStoreSet: jasmine.Spy;
    let deletedKeyedStoreDelete: jasmine.Spy;
    let deletedKeyedStoreGetAll: jasmine.Spy;
    let deletedKeyedStoreGetKeys: jasmine.Spy;
    let deletedKeyedStore: KeyedStore<unknown>;
    let result: boolean;

    beforeAll(() => {
      listedUnkeyedStoreGet = jasmine.createSpy(`listedUnkeyedStoreGet`);
      listedUnkeyedStoreSet = jasmine.createSpy(`listedUnkeyedStoreSet`);
      listedUnkeyedStore = {
        type: `unkeyedStore`,
        name: `listedUnkeyedStore`,
        get: listedUnkeyedStoreGet,
        set: listedUnkeyedStoreSet,
      };
      listedKeyedStoreGet = jasmine.createSpy(`listedKeyedStoreGet`);
      listedKeyedStoreSet = jasmine.createSpy(`listedKeyedStoreSet`);
      listedKeyedStoreDelete = jasmine.createSpy(`listedKeyedStoreDelete`);
      listedKeyedStoreGetAll = jasmine.createSpy(`listedKeyedStoreGetAll`);
      listedKeyedStoreGetKeys = jasmine.createSpy(`listedKeyedStoreGetKeys`);
      listedKeyedStore = {
        type: `keyedStore`,
        name: `listedKeyedStore`,
        get: listedKeyedStoreGet,
        set: listedKeyedStoreSet,
        delete: listedKeyedStoreDelete,
        getAll: listedKeyedStoreGetAll,
        getKeys: listedKeyedStoreGetKeys,
      };
      setUnkeyedStoreGet = jasmine.createSpy(`setUnkeyedStoreGet`);
      setUnkeyedStoreSet = jasmine.createSpy(`setUnkeyedStoreSet`);
      setUnkeyedStore = {
        type: `unkeyedStore`,
        name: `setUnkeyedStore`,
        get: setUnkeyedStoreGet,
        set: setUnkeyedStoreSet,
      };
      setKeyedStoreGet = jasmine.createSpy(`setKeyedStoreGet`);
      setKeyedStoreSet = jasmine.createSpy(`setKeyedStoreSet`);
      setKeyedStoreDelete = jasmine.createSpy(`setKeyedStoreDelete`);
      setKeyedStoreGetAll = jasmine.createSpy(`setKeyedStoreGetAll`);
      setKeyedStoreGetKeys = jasmine.createSpy(`setKeyedStoreGetKeys`);
      setKeyedStore = {
        type: `keyedStore`,
        name: `setKeyedStore`,
        get: setKeyedStoreGet,
        set: setKeyedStoreSet,
        delete: setKeyedStoreDelete,
        getAll: setKeyedStoreGetAll,
        getKeys: setKeyedStoreGetKeys,
      };
      deletedKeyedStoreGet = jasmine.createSpy(`deletedKeyedStoreGet`);
      deletedKeyedStoreSet = jasmine.createSpy(`deletedKeyedStoreSet`);
      deletedKeyedStoreDelete = jasmine.createSpy(`deletedKeyedStoreDelete`);
      deletedKeyedStoreGetAll = jasmine.createSpy(`deletedKeyedStoreGetAll`);
      deletedKeyedStoreGetKeys = jasmine.createSpy(`deletedKeyedStoreGetKeys`);
      deletedKeyedStore = {
        type: `keyedStore`,
        name: `deletedKeyedStore`,
        get: deletedKeyedStoreGet,
        set: deletedKeyedStoreSet,
        delete: deletedKeyedStoreDelete,
        getAll: deletedKeyedStoreGetAll,
        getKeys: deletedKeyedStoreGetKeys,
      };

      result = atLeastOneStoreChangedByAnEffect(
        [listedUnkeyedStore, listedKeyedStore],
        [
          {
            type: `unkeyedStoreSet`,
            unkeyedStore: setUnkeyedStore,
          },
          {
            type: `keyedStoreSet`,
            keyedStore: setKeyedStore,
            key: `Test Key A`,
          },
          {
            type: `keyedStoreDelete`,
            keyedStore: listedKeyedStore,
            key: `Test Key C`,
          },
          {
            type: `keyedStoreDelete`,
            keyedStore: deletedKeyedStore,
            key: `Test Key B`,
          },
        ]
      );
    });

    it(`does not interact with any stores`, () => {
      expect(listedUnkeyedStoreGet).not.toHaveBeenCalled();
      expect(listedUnkeyedStoreSet).not.toHaveBeenCalled();
      expect(listedKeyedStoreGet).not.toHaveBeenCalled();
      expect(listedKeyedStoreSet).not.toHaveBeenCalled();
      expect(listedKeyedStoreDelete).not.toHaveBeenCalled();
      expect(listedKeyedStoreGetAll).not.toHaveBeenCalled();
      expect(listedKeyedStoreGetKeys).not.toHaveBeenCalled();
      expect(setUnkeyedStoreGet).not.toHaveBeenCalled();
      expect(setUnkeyedStoreSet).not.toHaveBeenCalled();
      expect(setKeyedStoreGet).not.toHaveBeenCalled();
      expect(setKeyedStoreSet).not.toHaveBeenCalled();
      expect(setKeyedStoreDelete).not.toHaveBeenCalled();
      expect(setKeyedStoreGetAll).not.toHaveBeenCalled();
      expect(setKeyedStoreGetKeys).not.toHaveBeenCalled();
      expect(deletedKeyedStoreGet).not.toHaveBeenCalled();
      expect(deletedKeyedStoreSet).not.toHaveBeenCalled();
      expect(deletedKeyedStoreDelete).not.toHaveBeenCalled();
      expect(deletedKeyedStoreGetAll).not.toHaveBeenCalled();
      expect(deletedKeyedStoreGetKeys).not.toHaveBeenCalled();
    });

    it(`returns true`, () => {
      expect(result).toBeTrue();
    });
  });
});

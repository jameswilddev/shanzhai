import { KeyValueStoreInterface, KeyValueStoreAllInput } from "..";

describe(`KeyValueStoreAllInput`, () => {
  type TestKey = `Test Key A` | `Test Key B` | `Test Key C`;
  type TestValue = `Test Value A` | `Test Value B` | `Test Value C`;

  describe(`on construction`, () => {
    let get: jasmine.Spy;
    let set: jasmine.Spy;
    let _delete: jasmine.Spy;
    let getAll: jasmine.Spy;
    let keyValueStore: KeyValueStoreInterface<TestKey, TestValue>;

    let keyValueStoreAllInput: KeyValueStoreAllInput<TestKey, TestValue>;

    beforeAll(() => {
      get = jasmine.createSpy(`get`);
      set = jasmine.createSpy(`set`);
      _delete = jasmine.createSpy(`delete`);
      getAll = jasmine.createSpy(`getAll`);
      keyValueStore = { name: `Test Name`, get, set, delete: _delete, getAll };

      keyValueStoreAllInput = new KeyValueStoreAllInput<TestKey, TestValue>(
        keyValueStore
      );
    });

    it(`exposes the key value store`, () => {
      expect(keyValueStoreAllInput.keyValueStore).toBe(keyValueStore);
    });

    it(`does not get a value from the store`, () => {
      expect(get).not.toHaveBeenCalled();
    });

    it(`does not set a value in the store`, () => {
      expect(set).not.toHaveBeenCalled();
    });

    it(`does not delete from the store`, () => {
      expect(_delete).not.toHaveBeenCalled();
    });

    it(`does not get all from the store`, () => {
      expect(getAll).not.toHaveBeenCalled();
    });
  });

  describe(`get`, () => {
    let get: jasmine.Spy;
    let set: jasmine.Spy;
    let _delete: jasmine.Spy;
    let getAll: jasmine.Spy;
    let keyValueStore: KeyValueStoreInterface<TestKey, TestValue>;

    let keyValueStoreAllInput: KeyValueStoreAllInput<TestKey, TestValue>;

    let result: ReadonlyArray<readonly [TestKey, TestValue]>;

    beforeAll(() => {
      get = jasmine.createSpy(`get`);
      set = jasmine.createSpy(`set`);
      _delete = jasmine.createSpy(`delete`);
      getAll = jasmine.createSpy(`getAll`).and.returnValue([
        [`Test Key A`, `Test Value A`],
        [`Test Key B`, `Test Value B`],
        [`Test Key C`, `Test Value C`],
      ]);
      keyValueStore = { name: `Test Name`, get, set, delete: _delete, getAll };

      keyValueStoreAllInput = new KeyValueStoreAllInput<TestKey, TestValue>(
        keyValueStore
      );

      result = keyValueStoreAllInput.get();
    });

    it(`continues to expose the value store`, () => {
      expect(keyValueStoreAllInput.keyValueStore).toBe(keyValueStore);
    });

    it(`does not get a value from the store`, () => {
      expect(get).not.toHaveBeenCalled();
    });

    it(`returns the value from the store`, () => {
      expect(result).toEqual([
        [`Test Key A`, `Test Value A`],
        [`Test Key B`, `Test Value B`],
        [`Test Key C`, `Test Value C`],
      ]);
    });

    it(`does not set a value in the store`, () => {
      expect(set).not.toHaveBeenCalled();
    });

    it(`does not delete from the store`, () => {
      expect(_delete).not.toHaveBeenCalled();
    });

    it(`gets all from the store once`, () => {
      expect(getAll).toHaveBeenCalledTimes(1);
    });
  });
});

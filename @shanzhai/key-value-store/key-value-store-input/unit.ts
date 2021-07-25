import { KeyValueStoreInterface, KeyValueStoreInput } from "..";

describe(`KeyValueStoreInput`, () => {
  type TestValue = `Test Value`;

  describe(`on construction`, () => {
    let get: jasmine.Spy;
    let set: jasmine.Spy;
    let _delete: jasmine.Spy;
    let getAll: jasmine.Spy;
    let keyValueStore: KeyValueStoreInterface<TestValue>;

    let keyValueStoreInput: KeyValueStoreInput<TestValue>;

    beforeAll(() => {
      get = jasmine.createSpy(`get`);
      set = jasmine.createSpy(`set`);
      _delete = jasmine.createSpy(`delete`);
      getAll = jasmine.createSpy(`getAll`);
      keyValueStore = {
        name: `Test Name`,
        get,
        set,
        delete: _delete,
        getAll,
      };

      keyValueStoreInput = new KeyValueStoreInput<TestValue>(
        keyValueStore,
        `Test Key`
      );
    });

    it(`exposes the key value store`, () => {
      expect(keyValueStoreInput.keyValueStore).toBe(keyValueStore);
    });

    it(`exposes the key`, () => {
      expect(keyValueStoreInput.key).toEqual(`Test Key`);
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
    let keyValueStore: KeyValueStoreInterface<TestValue>;

    let keyValueStoreInput: KeyValueStoreInput<TestValue>;

    let result: TestValue;

    beforeAll(async () => {
      get = jasmine.createSpy(`get`).and.resolveTo(`Test Value`);
      set = jasmine.createSpy(`set`);
      _delete = jasmine.createSpy(`delete`);
      getAll = jasmine.createSpy(`getAll`);
      keyValueStore = {
        name: `Test Name`,
        get,
        set,
        delete: _delete,
        getAll,
      };

      keyValueStoreInput = new KeyValueStoreInput<TestValue>(
        keyValueStore,
        `Test Key`
      );

      result = await keyValueStoreInput.get();
    });

    it(`continues to expose the value store`, () => {
      expect(keyValueStoreInput.keyValueStore).toBe(keyValueStore);
    });

    it(`continues to expose the key`, () => {
      expect(keyValueStoreInput.key).toEqual(`Test Key`);
    });

    it(`gets one value from the store`, () => {
      expect(get).toHaveBeenCalledTimes(1);
    });

    it(`gets the keyed value from the store`, () => {
      expect(get).toHaveBeenCalledWith(`Test Key`);
    });

    it(`returns the value from the store`, () => {
      expect(result).toEqual(`Test Value`);
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
});

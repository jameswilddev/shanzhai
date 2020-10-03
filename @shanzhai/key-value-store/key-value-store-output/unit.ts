import { KeyValueStoreInterface, KeyValueStoreOutput } from "..";

describe(`KeyValueStoreOutput`, () => {
  type TestKey = `Test Key`;
  type TestValue = `Test Value`;

  describe(`on construction`, () => {
    let get: jasmine.Spy;
    let set: jasmine.Spy;
    let _delete: jasmine.Spy;
    let getAll: jasmine.Spy;
    let keyValueStore: KeyValueStoreInterface<TestKey, TestValue>;

    let keyValueStoreOutput: KeyValueStoreOutput<TestKey, TestValue>;

    beforeAll(() => {
      get = jasmine.createSpy(`get`);
      set = jasmine.createSpy(`set`);
      _delete = jasmine.createSpy(`delete`);
      getAll = jasmine.createSpy(`getAll`);
      keyValueStore = { name: `Test Name`, get, set, delete: _delete, getAll };

      keyValueStoreOutput = new KeyValueStoreOutput<TestKey, TestValue>(
        keyValueStore,
        `Test Key`
      );
    });

    it(`exposes the key value store`, () => {
      expect(keyValueStoreOutput.keyValueStore).toBe(keyValueStore);
    });

    it(`exposes the key`, () => {
      expect(keyValueStoreOutput.key).toEqual(`Test Key`);
    });

    it(`exposes the expected effects`, () => {
      expect(keyValueStoreOutput.effects).toEqual([
        {
          type: `keyedStoreAdd`,
          store: keyValueStore,
          key: `Test Key`,
        },
      ]);
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

  describe(`set`, () => {
    let get: jasmine.Spy;
    let set: jasmine.Spy;
    let _delete: jasmine.Spy;
    let getAll: jasmine.Spy;
    let keyValueStore: KeyValueStoreInterface<TestKey, TestValue>;

    let keyValueStoreOutput: KeyValueStoreOutput<TestKey, TestValue>;

    beforeAll(async () => {
      get = jasmine.createSpy(`get`);
      set = jasmine.createSpy(`set`);
      _delete = jasmine.createSpy(`delete`);
      getAll = jasmine.createSpy(`getAll`);
      keyValueStore = { name: `Test Name`, get, set, delete: _delete, getAll };

      keyValueStoreOutput = new KeyValueStoreOutput<TestKey, TestValue>(
        keyValueStore,
        `Test Key`
      );

      await keyValueStoreOutput.set(`Test Value`);
    });

    it(`continues to expose the expected effects`, () => {
      expect(keyValueStoreOutput.effects).toEqual([
        {
          type: `keyedStoreAdd`,
          store: keyValueStore,
          key: `Test Key`,
        },
      ]);
    });

    it(`continues to expose the key value store`, () => {
      expect(keyValueStoreOutput.keyValueStore).toBe(keyValueStore);
    });

    it(`continues to expose the key`, () => {
      expect(keyValueStoreOutput.key).toEqual(`Test Key`);
    });

    it(`does not get a value from the store`, () => {
      expect(get).not.toHaveBeenCalled();
    });

    it(`sets one value in the store`, () => {
      expect(set).toHaveBeenCalledTimes(1);
    });

    it(`sets the key`, () => {
      expect(set).toHaveBeenCalledWith(`Test Key`, jasmine.anything());
    });

    it(`sets the value given`, () => {
      expect(set).toHaveBeenCalledWith(jasmine.anything(), `Test Value`);
    });

    it(`does not delete from the store`, () => {
      expect(_delete).not.toHaveBeenCalled();
    });

    it(`does not get all from the store`, () => {
      expect(getAll).not.toHaveBeenCalled();
    });
  });
});

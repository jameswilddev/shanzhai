import { KeyedStore } from "@shanzhai/interfaces";
import { KeyedStoreGetInput } from ".";

describe(`keyed-store-get-input`, () => {
  type TestValue = `Test Value`;

  describe(`on construction`, () => {
    let keyedStore: KeyedStore<TestValue>;

    let keyedStoreGetInput: KeyedStoreGetInput<TestValue>;

    beforeAll(() => {
      keyedStore = {
        type: `keyedStore`,
        name: `Test Name`,
        get: jasmine.createSpy(`keyedStore.get`),
        set: jasmine.createSpy(`keyedStore.set`),
        delete: jasmine.createSpy(`keyedStore.delete`),
        getAll: jasmine.createSpy(`keyedStore.getAll`),
        getKeys: jasmine.createSpy(`keyedStore.getKeys`),
      };

      keyedStoreGetInput = new KeyedStoreGetInput(keyedStore, `Test Key`);
    });

    it(`exposes the keyed store`, () => {
      expect(keyedStoreGetInput.keyedStore).toBe(keyedStore);
    });

    it(`exposes the key`, () => {
      expect(keyedStoreGetInput.key).toEqual(`Test Key`);
    });

    it(`does not get a value from the store`, () => {
      expect(keyedStore.get).not.toHaveBeenCalled();
    });

    it(`does not set a value in the store`, () => {
      expect(keyedStore.set).not.toHaveBeenCalled();
    });

    it(`does not delete from the store`, () => {
      expect(keyedStore.delete).not.toHaveBeenCalled();
    });

    it(`does not get all from the store`, () => {
      expect(keyedStore.getAll).not.toHaveBeenCalled();
    });

    it(`does not get keys from the store`, () => {
      expect(keyedStore.getKeys).not.toHaveBeenCalled();
    });
  });

  describe(`get`, () => {
    let keyedStore: KeyedStore<TestValue>;

    let keyedStoreGetInput: KeyedStoreGetInput<TestValue>;

    let result: TestValue;

    beforeAll(async () => {
      keyedStore = {
        type: `keyedStore`,
        name: `Test Name`,
        get: jasmine.createSpy(`keyedStore.get`).and.resolveTo(`Test Value`),
        set: jasmine.createSpy(`keyedStore.set`),
        delete: jasmine.createSpy(`keyedStore.delete`),
        getAll: jasmine.createSpy(`keyedStore.getAll`),
        getKeys: jasmine.createSpy(`keyedStore.getKeys`),
      };

      keyedStoreGetInput = new KeyedStoreGetInput(keyedStore, `Test Key`);

      result = await keyedStoreGetInput.get();
    });

    it(`continues to expose the unkeyed store`, () => {
      expect(keyedStoreGetInput.keyedStore).toBe(keyedStore);
    });

    it(`continues to expose the key`, () => {
      expect(keyedStoreGetInput.key).toEqual(`Test Key`);
    });

    it(`gets one value from the store`, () => {
      expect(keyedStore.get).toHaveBeenCalledTimes(1);
    });

    it(`gets the keyed value from the store`, () => {
      expect(keyedStore.get).toHaveBeenCalledWith(`Test Key`);
    });

    it(`returns the value from the store`, () => {
      expect(result).toEqual(`Test Value`);
    });

    it(`does not set a value in the store`, () => {
      expect(keyedStore.set).not.toHaveBeenCalled();
    });

    it(`does not delete from the store`, () => {
      expect(keyedStore.delete).not.toHaveBeenCalled();
    });

    it(`does not get all from the store`, () => {
      expect(keyedStore.getAll).not.toHaveBeenCalled();
    });

    it(`does not get keys from the store`, () => {
      expect(keyedStore.getKeys).not.toHaveBeenCalled();
    });
  });
});

import { KeyedStore } from "@shanzhai/interfaces";
import { KeyedStoreGetKeysInput } from ".";

describe(`keyed-store-get-keys-input`, () => {
  type TestValue = `Test Value A` | `Test Value B` | `Test Value C`;

  describe(`on construction`, () => {
    let keyedStore: KeyedStore<TestValue>;

    let keyedStoreGetKeysInput: KeyedStoreGetKeysInput;

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

      keyedStoreGetKeysInput = new KeyedStoreGetKeysInput(keyedStore);
    });

    it(`exposes the keyed store`, () => {
      expect(keyedStoreGetKeysInput.keyedStore).toBe(keyedStore);
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

    let keyedStoreGetKeysInput: KeyedStoreGetKeysInput;

    let result: ReadonlyArray<string>;

    beforeAll(async () => {
      keyedStore = {
        type: `keyedStore`,
        name: `Test Name`,
        get: jasmine.createSpy(`keyedStore.get`),
        set: jasmine.createSpy(`keyedStore.set`),
        delete: jasmine.createSpy(`keyedStore.delete`),
        getAll: jasmine.createSpy(`keyedStore.getAll`),
        getKeys: jasmine
          .createSpy(`keyedStore.getKeys`)
          .and.resolveTo([`Test Key A`, `Test Key B`, `Test Key C`]),
      };

      keyedStoreGetKeysInput = new KeyedStoreGetKeysInput(keyedStore);

      result = await keyedStoreGetKeysInput.get();
    });

    it(`continues to expose the unkeyed store`, () => {
      expect(keyedStoreGetKeysInput.keyedStore).toBe(keyedStore);
    });

    it(`does not get a value from the store`, () => {
      expect(keyedStore.get).not.toHaveBeenCalled();
    });

    it(`returns the keys from the store`, () => {
      expect(result).toEqual([`Test Key A`, `Test Key B`, `Test Key C`]);
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

    it(`gets keys from the store once`, () => {
      expect(keyedStore.getKeys).toHaveBeenCalledTimes(1);
    });
  });
});

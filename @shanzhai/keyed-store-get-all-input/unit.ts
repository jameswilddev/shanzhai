import { KeyedStore } from "@shanzhai/interfaces";
import { KeyedStoreGetAllInput } from ".";

describe(`keyed-store-get-all-input`, () => {
  type TestValue = `Test Value A` | `Test Value B` | `Test Value C`;

  describe(`on construction`, () => {
    let keyedStore: KeyedStore<TestValue>;

    let keyedStoreGetAllInput: KeyedStoreGetAllInput<TestValue>;

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

      keyedStoreGetAllInput = new KeyedStoreGetAllInput<TestValue>(keyedStore);
    });

    it(`exposes the keyed store`, () => {
      expect(keyedStoreGetAllInput.keyedStore).toBe(keyedStore);
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

    let keyedStoreGetAllInput: KeyedStoreGetAllInput<TestValue>;

    let result: { readonly [key: string]: TestValue };

    beforeAll(async () => {
      keyedStore = {
        type: `keyedStore`,
        name: `Test Name`,
        get: jasmine.createSpy(`keyedStore.get`),
        set: jasmine.createSpy(`keyedStore.set`),
        delete: jasmine.createSpy(`keyedStore.delete`),
        getAll: jasmine.createSpy(`keyedStore.getAll`).and.resolveTo({
          "Test Key A": `Test Value A`,
          "Test Key B": `Test Value B`,
          "Test Key C": `Test Value C`,
        }),
        getKeys: jasmine.createSpy(`keyedStore.getKeys`),
      };

      keyedStoreGetAllInput = new KeyedStoreGetAllInput<TestValue>(keyedStore);

      result = await keyedStoreGetAllInput.get();
    });

    it(`continues to expose the unkeyed store`, () => {
      expect(keyedStoreGetAllInput.keyedStore).toBe(keyedStore);
    });

    it(`does not get a value from the store`, () => {
      expect(keyedStore.get).not.toHaveBeenCalled();
    });

    it(`returns the value from the store`, () => {
      expect(result).toEqual({
        "Test Key A": `Test Value A`,
        "Test Key B": `Test Value B`,
        "Test Key C": `Test Value C`,
      });
    });

    it(`does not set a value in the store`, () => {
      expect(keyedStore.set).not.toHaveBeenCalled();
    });

    it(`does not delete from the store`, () => {
      expect(keyedStore.delete).not.toHaveBeenCalled();
    });

    it(`gets all from the store once`, () => {
      expect(keyedStore.getAll).toHaveBeenCalledTimes(1);
    });

    it(`does not get keys from the store`, () => {
      expect(keyedStore.getKeys).not.toHaveBeenCalled();
    });
  });
});

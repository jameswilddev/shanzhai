import { KeyedStore } from "@shanzhai/interfaces";
import { KeyedStoreSetOutput } from ".";

describe(`keyed-store-set-output`, () => {
  type TestValue = `Test Value`;

  describe(`on construction`, () => {
    let keyedStore: KeyedStore<TestValue>;

    let keyedStoreSetOutput: KeyedStoreSetOutput<TestValue>;

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

      keyedStoreSetOutput = new KeyedStoreSetOutput(keyedStore, `Test Key`);
    });

    it(`exposes the keyed store`, () => {
      expect(keyedStoreSetOutput.keyedStore).toBe(keyedStore);
    });

    it(`exposes the key`, () => {
      expect(keyedStoreSetOutput.key).toEqual(`Test Key`);
    });

    it(`exposes the expected effects`, () => {
      expect(keyedStoreSetOutput.effects).toEqual([
        {
          type: `keyedStoreSet`,
          keyedStore: keyedStore,
          key: `Test Key`,
        },
      ]);
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

  describe(`set`, () => {
    let keyedStore: KeyedStore<TestValue>;

    let keyedStoreSetOutput: KeyedStoreSetOutput<TestValue>;

    beforeAll(async () => {
      keyedStore = {
        type: `keyedStore`,
        name: `Test Name`,
        get: jasmine.createSpy(`keyedStore.get`),
        set: jasmine.createSpy(`keyedStore.set`),
        delete: jasmine.createSpy(`keyedStore.delete`),
        getAll: jasmine.createSpy(`keyedStore.getAll`),
        getKeys: jasmine.createSpy(`keyedStore.getKeys`),
      };

      keyedStoreSetOutput = new KeyedStoreSetOutput(keyedStore, `Test Key`);

      await keyedStoreSetOutput.set(`Test Value`);
    });

    it(`continues to expose the expected effects`, () => {
      expect(keyedStoreSetOutput.effects).toEqual([
        {
          type: `keyedStoreSet`,
          keyedStore,
          key: `Test Key`,
        },
      ]);
    });

    it(`continues to expose the keyed store`, () => {
      expect(keyedStoreSetOutput.keyedStore).toBe(keyedStore);
    });

    it(`continues to expose the key`, () => {
      expect(keyedStoreSetOutput.key).toEqual(`Test Key`);
    });

    it(`does not get a value from the store`, () => {
      expect(keyedStore.get).not.toHaveBeenCalled();
    });

    it(`sets one value in the store`, () => {
      expect(keyedStore.set).toHaveBeenCalledTimes(1);
    });

    it(`sets the key`, () => {
      expect(keyedStore.set).toHaveBeenCalledWith(
        `Test Key`,
        jasmine.anything()
      );
    });

    it(`sets the value given`, () => {
      expect(keyedStore.set).toHaveBeenCalledWith(
        jasmine.anything(),
        `Test Value`
      );
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

import { KeyedStore } from "@shanzhai/interfaces";
import { DeleteFromKeyedStoreStep } from ".";

describe(`DeleteFromKeyedStoreStep`, () => {
  describe(`on construction`, () => {
    let keyedStore: KeyedStore<unknown>;
    let deleteFromKeyedStoreStep: DeleteFromKeyedStoreStep;

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

      deleteFromKeyedStoreStep = new DeleteFromKeyedStoreStep(
        keyedStore,
        `Test Key`
      );
    });

    it(`exposes its name`, () => {
      expect(deleteFromKeyedStoreStep.name).toEqual(
        `Delete "Test Key" from "Test Name"`
      );
    });

    it(`exposes the expected effects`, () => {
      expect(deleteFromKeyedStoreStep.effects).toEqual([
        {
          type: `keyedStoreDelete`,
          keyedStore: keyedStore,
          key: `Test Key`,
        },
      ]);
    });

    it(`exposes the keyed store`, () => {
      expect(deleteFromKeyedStoreStep.keyedStore).toBe(keyedStore);
    });

    it(`exposes the key`, () => {
      expect(deleteFromKeyedStoreStep.key).toEqual(`Test Key`);
    });

    it(`does not get from the keyed store`, () => {
      expect(keyedStore.get).not.toHaveBeenCalled();
    });

    it(`does not set values in the keyed store`, () => {
      expect(keyedStore.set).not.toHaveBeenCalled();
    });

    it(`does not delete values from the keyed store`, () => {
      expect(keyedStore.delete).not.toHaveBeenCalled();
    });

    it(`does not get all from the keyed store`, () => {
      expect(keyedStore.getAll).not.toHaveBeenCalled();
    });

    it(`does not get keys from the keyed store`, () => {
      expect(keyedStore.getKeys).not.toHaveBeenCalled();
    });
  });

  describe(`on execution`, () => {
    let keyedStore: KeyedStore<unknown>;
    let deleteFromKeyedStoreStep: DeleteFromKeyedStoreStep;

    beforeAll(async () => {
      keyedStore = {
        type: `keyedStore`,
        name: `Test Name`,
        get: jasmine.createSpy(`keyedStore.get`),
        set: jasmine.createSpy(`keyedStore.set`),
        delete: jasmine.createSpy(`keyedStore.delete`).and.resolveTo(),
        getAll: jasmine.createSpy(`keyedStore.getAll`),
        getKeys: jasmine.createSpy(`keyedStore.getKeys`),
      };

      deleteFromKeyedStoreStep = new DeleteFromKeyedStoreStep(
        keyedStore,
        `Test Key`
      );

      await deleteFromKeyedStoreStep.execute();
    });

    it(`continues to expose the keyed store`, () => {
      expect(deleteFromKeyedStoreStep.keyedStore).toBe(keyedStore);
    });

    it(`continues to expose the key`, () => {
      expect(deleteFromKeyedStoreStep.key).toEqual(`Test Key`);
    });

    it(`does not get from the keyed store`, () => {
      expect(keyedStore.get).not.toHaveBeenCalled();
    });

    it(`does not set values in the keyed store`, () => {
      expect(keyedStore.set).not.toHaveBeenCalled();
    });

    it(`deletes one value from the keyed store`, () => {
      expect(keyedStore.delete).toHaveBeenCalledTimes(1);
    });

    it(`deletes the specified value from the keyed store`, () => {
      expect(keyedStore.delete).toHaveBeenCalledWith(`Test Key`);
    });

    it(`does not get all from the keyed store`, () => {
      expect(keyedStore.getAll).not.toHaveBeenCalled();
    });

    it(`does not get keys from the keyed store`, () => {
      expect(keyedStore.getKeys).not.toHaveBeenCalled();
    });
  });
});

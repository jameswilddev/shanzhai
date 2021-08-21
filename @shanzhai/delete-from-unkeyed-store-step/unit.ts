import { UnkeyedStore } from "@shanzhai/interfaces";
import { DeleteFromUnkeyedStoreStep } from ".";

describe(`delete-from-unkeyed-store-step`, () => {
  type TestValue = `Test Value`;

  describe(`on construction`, () => {
    let unkeyedStore: UnkeyedStore<TestValue>;
    let deleteFromUnkeyedStoreStep: DeleteFromUnkeyedStoreStep;

    beforeAll(() => {
      unkeyedStore = {
        type: `unkeyedStore`,
        name: `Test Name`,
        get: jasmine.createSpy(`unkeyedStore.get`),
        set: jasmine.createSpy(`unkeyedStore.set`),
        delete: jasmine.createSpy(`unkeyedStore.delete`),
      };

      deleteFromUnkeyedStoreStep = new DeleteFromUnkeyedStoreStep(unkeyedStore);
    });

    it(`exposes its name`, () => {
      expect(deleteFromUnkeyedStoreStep.name).toEqual(
        `Delete from "Test Name"`
      );
    });

    it(`exposes the expected effects`, () => {
      expect(deleteFromUnkeyedStoreStep.effects).toEqual([
        {
          type: `unkeyedStoreDelete`,
          unkeyedStore,
        },
      ]);
    });

    it(`exposes the unkeyed store`, () => {
      expect(deleteFromUnkeyedStoreStep.unkeyedStore).toBe(unkeyedStore);
    });

    it(`does not get from the unkeyed store`, () => {
      expect(unkeyedStore.get).not.toHaveBeenCalled();
    });

    it(`does not set values in the unkeyed store`, () => {
      expect(unkeyedStore.set).not.toHaveBeenCalled();
    });

    it(`does not delete values from the unkeyed store`, () => {
      expect(unkeyedStore.delete).not.toHaveBeenCalled();
    });
  });

  describe(`on execution`, () => {
    let unkeyedStore: UnkeyedStore<TestValue>;
    let deleteFromUnkeyedStoreStep: DeleteFromUnkeyedStoreStep;

    beforeAll(async () => {
      unkeyedStore = {
        type: `unkeyedStore`,
        name: `Test Name`,
        get: jasmine.createSpy(`unkeyedStore.get`),
        set: jasmine.createSpy(`unkeyedStore.set`),
        delete: jasmine.createSpy(`unkeyedStore.delete`).and.resolveTo(),
      };

      deleteFromUnkeyedStoreStep = new DeleteFromUnkeyedStoreStep(unkeyedStore);

      await deleteFromUnkeyedStoreStep.execute();
    });

    it(`continues to expose the unkeyed store`, () => {
      expect(deleteFromUnkeyedStoreStep.unkeyedStore).toBe(unkeyedStore);
    });

    it(`does not get from the unkeyed store`, () => {
      expect(unkeyedStore.get).not.toHaveBeenCalled();
    });

    it(`does not set values in the unkeyed store`, () => {
      expect(unkeyedStore.set).not.toHaveBeenCalled();
    });

    it(`deletes one value from the unkeyed store`, () => {
      expect(unkeyedStore.delete).toHaveBeenCalledTimes(1);
    });
  });
});

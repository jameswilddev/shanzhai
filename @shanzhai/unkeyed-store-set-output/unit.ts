import { UnkeyedStore } from "@shanzhai/interfaces";
import { UnkeyedStoreSetOutput } from ".";

describe(`unkeyed-store-set-output`, () => {
  type TestValue = `Test Value`;

  describe(`on construction`, () => {
    let unkeyedStore: UnkeyedStore<TestValue>;

    let unkeyedStoreSetOutput: UnkeyedStoreSetOutput<TestValue>;

    beforeAll(() => {
      unkeyedStore = {
        type: `unkeyedStore`,
        name: `Test Name`,
        get: jasmine.createSpy(`unkeyedStore.get`),
        set: jasmine.createSpy(`unkeyedStore.set`),
      };

      unkeyedStoreSetOutput = new UnkeyedStoreSetOutput<TestValue>(
        unkeyedStore
      );
    });

    it(`exposes the expected effects`, () => {
      expect(unkeyedStoreSetOutput.effects).toEqual([
        {
          type: `unkeyedStoreSet`,
          unkeyedStore: unkeyedStore,
        },
      ]);
    });

    it(`exposes the unkeyed store`, () => {
      expect(unkeyedStoreSetOutput.unkeyedStore).toBe(unkeyedStore);
    });

    it(`does not get a value from the store`, () => {
      expect(unkeyedStore.get).not.toHaveBeenCalled();
    });

    it(`does not set a value in the store`, () => {
      expect(unkeyedStore.set).not.toHaveBeenCalled();
    });
  });

  describe(`set`, () => {
    let unkeyedStore: UnkeyedStore<TestValue>;

    let unkeyedStoreSetOutput: UnkeyedStoreSetOutput<TestValue>;

    beforeAll(async () => {
      unkeyedStore = {
        type: `unkeyedStore`,
        name: `Test Name`,
        get: jasmine.createSpy(`unkeyedStore.get`),
        set: jasmine.createSpy(`unkeyedStore.set`).and.resolveTo(),
      };

      unkeyedStoreSetOutput = new UnkeyedStoreSetOutput<TestValue>(
        unkeyedStore
      );

      await unkeyedStoreSetOutput.set(`Test Value`);
    });

    it(`continues to expose the expected effects`, () => {
      expect(unkeyedStoreSetOutput.effects).toEqual([
        {
          type: `unkeyedStoreSet`,
          unkeyedStore: unkeyedStore,
        },
      ]);
    });

    it(`continues to expose the unkeyed store`, () => {
      expect(unkeyedStoreSetOutput.unkeyedStore).toBe(unkeyedStore);
    });

    it(`does not get a value from the store`, () => {
      expect(unkeyedStore.get).not.toHaveBeenCalled();
    });

    it(`sets one value in the store`, () => {
      expect(unkeyedStore.set).toHaveBeenCalledTimes(1);
    });

    it(`sets the value given`, () => {
      expect(unkeyedStore.set).toHaveBeenCalledWith(`Test Value`);
    });
  });
});

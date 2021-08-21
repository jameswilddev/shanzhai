import { UnkeyedStore } from "@shanzhai/interfaces";
import { UnkeyedStoreGetInput } from ".";

describe(`unkeyed-store-get-input`, () => {
  type TestValue = `Test Value`;

  describe(`on construction`, () => {
    let unkeyedStore: UnkeyedStore<TestValue>;

    let unkeyedStoreGetInput: UnkeyedStoreGetInput<TestValue>;

    beforeAll(() => {
      unkeyedStore = {
        type: `unkeyedStore`,
        name: `Test Name`,
        get: jasmine.createSpy(`get`),
        set: jasmine.createSpy(`set`),
        delete: jasmine.createSpy(`delete`),
      };

      unkeyedStoreGetInput = new UnkeyedStoreGetInput<TestValue>(unkeyedStore);
    });

    it(`exposes the unkeyed store`, () => {
      expect(unkeyedStoreGetInput.unkeyedStore).toBe(unkeyedStore);
    });

    it(`does not get a value from the store`, () => {
      expect(unkeyedStore.get).not.toHaveBeenCalled();
    });

    it(`does not set a value in the store`, () => {
      expect(unkeyedStore.set).not.toHaveBeenCalled();
    });

    it(`does not delete from the store`, () => {
      expect(unkeyedStore.delete).not.toHaveBeenCalled();
    });
  });

  describe(`get`, () => {
    let unkeyedStore: UnkeyedStore<TestValue>;

    let unkeyedStoreGetInput: UnkeyedStoreGetInput<TestValue>;

    let result: TestValue;

    beforeAll(async () => {
      unkeyedStore = {
        type: `unkeyedStore`,
        name: `Test Name`,
        get: jasmine.createSpy(`get`).and.resolveTo(`Test Value`),
        set: jasmine.createSpy(`set`),
        delete: jasmine.createSpy(`delete`),
      };

      unkeyedStoreGetInput = new UnkeyedStoreGetInput<TestValue>(unkeyedStore);

      result = await unkeyedStoreGetInput.get();
    });

    it(`continues to expose the unkeyed store`, () => {
      expect(unkeyedStoreGetInput.unkeyedStore).toBe(unkeyedStore);
    });

    it(`gets one value from the store`, () => {
      expect(unkeyedStore.get).toHaveBeenCalledTimes(1);
    });

    it(`returns the value from the store`, () => {
      expect(result).toEqual(`Test Value`);
    });

    it(`does not set a value in the store`, () => {
      expect(unkeyedStore.set).not.toHaveBeenCalled();
    });

    it(`does not delete from the store`, () => {
      expect(unkeyedStore.delete).not.toHaveBeenCalled();
    });
  });
});

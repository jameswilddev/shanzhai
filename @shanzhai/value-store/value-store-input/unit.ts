import { ValueStoreInterface, ValueStoreInput } from "..";

describe(`ValueStoreInput`, () => {
  type TestValue = `Test Value`;

  describe(`on construction`, () => {
    let get: jasmine.Spy;
    let set: jasmine.Spy;
    let _delete: jasmine.Spy;
    let valueStore: ValueStoreInterface<TestValue>;

    let valueStoreInput: ValueStoreInput<TestValue>;

    beforeAll(() => {
      get = jasmine.createSpy(`get`);
      set = jasmine.createSpy(`set`);
      _delete = jasmine.createSpy(`delete`);
      valueStore = {
        type: `unkeyedStore`,
        name: `Test Name`,
        get,
        set,
        delete: _delete,
      };

      valueStoreInput = new ValueStoreInput<TestValue>(valueStore);
    });

    it(`exposes the value store`, () => {
      expect(valueStoreInput.valueStore).toBe(valueStore);
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
  });

  describe(`get`, () => {
    let get: jasmine.Spy;
    let set: jasmine.Spy;
    let _delete: jasmine.Spy;
    let valueStore: ValueStoreInterface<TestValue>;

    let valueStoreInput: ValueStoreInput<TestValue>;

    let result: TestValue;

    beforeAll(async () => {
      get = jasmine.createSpy(`get`).and.resolveTo(`Test Value`);
      set = jasmine.createSpy(`set`);
      _delete = jasmine.createSpy(`delete`);
      valueStore = {
        type: `unkeyedStore`,
        name: `Test Name`,
        get,
        set,
        delete: _delete,
      };

      valueStoreInput = new ValueStoreInput<TestValue>(valueStore);

      result = await valueStoreInput.get();
    });

    it(`continues to expose the value store`, () => {
      expect(valueStoreInput.valueStore).toBe(valueStore);
    });

    it(`gets one value from the store`, () => {
      expect(get).toHaveBeenCalledTimes(1);
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
  });
});

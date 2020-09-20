import { ValueStoreInterface, ValueStoreOutput } from "..";

describe(`ValueStoreOutput`, () => {
  type TestValue = `Test Value`;

  describe(`on construction`, () => {
    let get: jasmine.Spy;
    let set: jasmine.Spy;
    let _delete: jasmine.Spy;
    let valueStore: ValueStoreInterface<TestValue>;

    let valueStoreOutput: ValueStoreOutput<TestValue>;

    beforeAll(() => {
      get = jasmine.createSpy(`get`);
      set = jasmine.createSpy(`set`);
      _delete = jasmine.createSpy(`delete`);
      valueStore = { name: `Test Name`, get, set, delete: _delete };

      valueStoreOutput = new ValueStoreOutput<TestValue>(valueStore);
    });

    it(`exposes the value store`, () => {
      expect(valueStoreOutput.valueStore).toBe(valueStore);
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

    let valueStoreOutput: ValueStoreOutput<TestValue>;

    beforeAll(() => {
      get = jasmine.createSpy(`get`);
      set = jasmine.createSpy(`set`);
      _delete = jasmine.createSpy(`delete`);
      valueStore = { name: `Test Name`, get, set, delete: _delete };

      valueStoreOutput = new ValueStoreOutput<TestValue>(valueStore);

      valueStoreOutput.set(`Test Value`);
    });

    it(`continues to expose the value store`, () => {
      expect(valueStoreOutput.valueStore).toBe(valueStore);
    });

    it(`does not get a value from the store`, () => {
      expect(get).not.toHaveBeenCalled();
    });

    it(`sets one value in the store`, () => {
      expect(set).toHaveBeenCalledTimes(1);
    });

    it(`sets the value given`, () => {
      expect(set).toHaveBeenCalledWith(`Test Value`);
    });

    it(`does not delete from the store`, () => {
      expect(_delete).not.toHaveBeenCalled();
    });
  });
});

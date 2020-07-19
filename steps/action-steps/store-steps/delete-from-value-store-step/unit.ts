import { ValueStoreInterface } from "../../../../stores/value-store";
import { DeleteFromValueStoreStep } from ".";

describe(`DeleteFromValueStoreStep`, () => {
  type TestValue = `Test Value`;

  describe(`on construction`, () => {
    let valueStoreGet: jasmine.Spy;
    let valueStoreSet: jasmine.Spy;
    let valueStoreDelete: jasmine.Spy;
    let valueStore: ValueStoreInterface<TestValue>;
    let deleteFromValueStoreStep: DeleteFromValueStoreStep<TestValue>;

    beforeAll(() => {
      valueStoreGet = jasmine.createSpy(`valueStoreGet`);
      valueStoreSet = jasmine.createSpy(`valueStoreSet`);
      valueStoreDelete = jasmine.createSpy(`valueStoreDelete`);
      valueStore = {
        name: `Test Name`,
        get: valueStoreGet,
        set: valueStoreSet,
        delete: valueStoreDelete,
      };

      deleteFromValueStoreStep = new DeleteFromValueStoreStep(valueStore);
    });

    it(`exposes its name`, () => {
      expect(deleteFromValueStoreStep.name).toEqual(`Delete from "Test Name"`);
    });

    it(`exposes the value store`, () => {
      expect(deleteFromValueStoreStep.valueStore).toBe(valueStore);
    });

    it(`does not get from the value store`, () => {
      expect(valueStoreGet).not.toHaveBeenCalled();
    });

    it(`does not set values in the value store`, () => {
      expect(valueStoreSet).not.toHaveBeenCalled();
    });

    it(`does not delete values from the value store`, () => {
      expect(valueStoreDelete).not.toHaveBeenCalled();
    });
  });

  describe(`on execution`, () => {
    let valueStoreGet: jasmine.Spy;
    let valueStoreSet: jasmine.Spy;
    let valueStoreDelete: jasmine.Spy;
    let valueStore: ValueStoreInterface<TestValue>;
    let deleteFromValueStoreStep: DeleteFromValueStoreStep<TestValue>;

    beforeAll(async () => {
      valueStoreGet = jasmine.createSpy(`valueStoreGet`);
      valueStoreSet = jasmine.createSpy(`alueStoreSet`);
      valueStoreDelete = jasmine.createSpy(`valueStoreDelete`);
      valueStore = {
        name: `Test Name`,
        get: valueStoreGet,
        set: valueStoreSet,
        delete: valueStoreDelete,
      };

      deleteFromValueStoreStep = new DeleteFromValueStoreStep(valueStore);

      await deleteFromValueStoreStep.execute();
    });

    it(`continues to expose the value store`, () => {
      expect(deleteFromValueStoreStep.valueStore).toBe(valueStore);
    });

    it(`does not get from the value store`, () => {
      expect(valueStoreGet).not.toHaveBeenCalled();
    });

    it(`does not set values in the value store`, () => {
      expect(valueStoreSet).not.toHaveBeenCalled();
    });

    it(`deletes one value from the value store`, () => {
      expect(valueStoreDelete).toHaveBeenCalledTimes(1);
    });
  });
});

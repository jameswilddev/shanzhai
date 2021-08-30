import { WrapInObjectOutput } from ".";
import { Output, UnkeyedStore } from "@shanzhai/interfaces";

describe(`wrap-in-object-output`, () => {
  type TestKey = `Test Key`;
  type TestValue = `Test Value`;

  const unkeyedStore: UnkeyedStore<unknown> = {
    type: `unkeyedStore`,
    name: `Test Unkeyed Store`,
    get: jasmine.createSpy(`unkeyedStore.get`).and.callFake(fail),
    set: jasmine.createSpy(`unkeyedStore.set`).and.callFake(fail),
  };

  describe(`on construction`, () => {
    let wrapInObjectOutput: WrapInObjectOutput<TestKey, TestValue>;
    let output: Output<{ readonly "Test Key": TestValue }>;

    beforeAll(() => {
      output = {
        set: jasmine.createSpy(`output.set`),
        effects: [
          {
            type: `unkeyedStoreSet`,
            unkeyedStore,
          },
          {
            type: `unkeyedStoreSet`,
            unkeyedStore,
          },
          {
            type: `unkeyedStoreSet`,
            unkeyedStore,
          },
        ],
      };

      wrapInObjectOutput = new WrapInObjectOutput<TestKey, TestValue>(
        `Test Key`,
        output
      );
    });

    it(`exposes its key`, () => {
      expect(wrapInObjectOutput.key).toEqual(`Test Key`);
    });

    it(`exposes its output`, () => {
      expect(wrapInObjectOutput.output).toEqual(output);
    });

    it(`does not set its output`, () => {
      expect(output.set).not.toHaveBeenCalled();
    });

    it(`relays the wrapped output's effects`, () => {
      expect(output.effects).toEqual([
        {
          type: `unkeyedStoreSet`,
          unkeyedStore,
        },
        {
          type: `unkeyedStoreSet`,
          unkeyedStore,
        },
        {
          type: `unkeyedStoreSet`,
          unkeyedStore,
        },
      ]);
    });
  });

  describe(`set`, () => {
    let wrapInObjectOutput: WrapInObjectOutput<TestKey, TestValue>;
    let output: Output<{ readonly "Test Key": TestValue }>;

    beforeAll(async () => {
      output = {
        set: jasmine.createSpy(`output.set`),
        effects: [
          {
            type: `unkeyedStoreSet`,
            unkeyedStore,
          },
          {
            type: `unkeyedStoreSet`,
            unkeyedStore,
          },
          {
            type: `unkeyedStoreSet`,
            unkeyedStore,
          },
        ],
      };

      wrapInObjectOutput = new WrapInObjectOutput<TestKey, TestValue>(
        `Test Key`,
        output
      );

      await wrapInObjectOutput.set(`Test Value`);
    });

    it(`continues to expose its key`, () => {
      expect(wrapInObjectOutput.key).toEqual(`Test Key`);
    });

    it(`continues to expose its output`, () => {
      expect(wrapInObjectOutput.output).toEqual(output);
    });

    it(`sets its output once`, () => {
      expect(output.set).toHaveBeenCalledTimes(1);
    });

    it(`sets the expected output`, () => {
      expect(output.set).toHaveBeenCalledWith({ "Test Key": `Test Value` });
    });
  });
});

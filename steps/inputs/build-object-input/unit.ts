import { BuildObjectInput } from ".";
import { Input } from "../input";

describe(`BuildObjectInput`, () => {
  type TestKey = `Test Key A` | `Test Key B` | `Test Key C`;
  type TestValue = `Test Value A` | `Test Value B` | `Test Value C`;

  describe(`on construction`, () => {
    let buildObjectInput: BuildObjectInput<TestKey, TestValue>;
    let inputAGet: jasmine.Spy;
    let inputA: Input<TestValue>;
    let inputBGet: jasmine.Spy;
    let inputB: Input<TestValue>;
    let inputCGet: jasmine.Spy;
    let inputC: Input<TestValue>;

    beforeAll(() => {
      inputAGet = jasmine.createSpy(`inputAGet`);
      inputA = { get: inputAGet };
      inputBGet = jasmine.createSpy(`inputBGet`);
      inputB = { get: inputBGet };
      inputCGet = jasmine.createSpy(`inputCGet`);
      inputC = { get: inputCGet };

      buildObjectInput = new BuildObjectInput({
        "Test Key A": inputA,
        "Test Key B": inputB,
        "Test Key C": inputC,
      });
    });

    it(`exposes its inputs`, () => {
      expect(buildObjectInput.sources).toEqual({
        "Test Key A": inputA,
        "Test Key B": inputB,
        "Test Key C": inputC,
      });
    });

    it(`does not get any of its inputs`, () => {
      expect(inputAGet).not.toHaveBeenCalled();
      expect(inputBGet).not.toHaveBeenCalled();
      expect(inputCGet).not.toHaveBeenCalled();
    });
  });

  describe(`get`, () => {
    let buildObjectInput: BuildObjectInput<TestKey, TestValue>;
    let inputAGet: jasmine.Spy;
    let inputA: Input<TestValue>;
    let inputBGet: jasmine.Spy;
    let inputB: Input<TestValue>;
    let inputCGet: jasmine.Spy;
    let inputC: Input<TestValue>;
    let result: {
      "Test Key A": TestValue;
      "Test Key B": TestValue;
      "Test Key C": TestValue;
    };

    beforeAll(() => {
      inputAGet = jasmine
        .createSpy(`inputAGet`)
        .and.returnValue("Test Value A");
      inputA = { get: inputAGet };
      inputBGet = jasmine
        .createSpy(`inputBGet`)
        .and.returnValue("Test Value B");
      inputB = { get: inputBGet };
      inputCGet = jasmine
        .createSpy(`inputCGet`)
        .and.returnValue("Test Value C");
      inputC = { get: inputCGet };

      buildObjectInput = new BuildObjectInput({
        "Test Key A": inputA,
        "Test Key B": inputB,
        "Test Key C": inputC,
      });

      result = buildObjectInput.get();
    });

    it(`continues to expose its inputs`, () => {
      expect(buildObjectInput.sources).toEqual({
        "Test Key A": inputA,
        "Test Key B": inputB,
        "Test Key C": inputC,
      });
    });

    it(`gets each of its inputs once`, () => {
      expect(inputAGet).toHaveBeenCalledTimes(1);
      expect(inputBGet).toHaveBeenCalledTimes(1);
      expect(inputCGet).toHaveBeenCalledTimes(1);
    });

    it(`returns an object containing everything gotten`, () => {
      expect(result).toEqual({
        "Test Key A": "Test Value A",
        "Test Key B": "Test Value B",
        "Test Key C": "Test Value C",
      });
    });
  });
});

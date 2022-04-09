import { ConcatenateObjectValuesInput } from ".";
import { Input } from "@shanzhai/interfaces";

describe(`MergeObjectInput`, () => {
  describe(`on construction`, () => {
    let mergeObjectInput: ConcatenateObjectValuesInput;
    let inputGet: jasmine.Spy;
    let input: Input<{
      readonly [key: string]: string;
    }>;

    beforeAll(() => {
      inputGet = jasmine.createSpy(`inputGet`);
      input = { get: inputGet };

      mergeObjectInput = new ConcatenateObjectValuesInput(input);
    });

    it(`exposes its input`, () => {
      expect(mergeObjectInput.input).toEqual(input);
    });

    it(`does not get its input`, () => {
      expect(inputGet).not.toHaveBeenCalled();
    });
  });

  describe(`get`, () => {
    let mergeObjectInput: ConcatenateObjectValuesInput;
    let inputGet: jasmine.Spy;
    let input: Input<{
      readonly [key: string]: string;
    }>;
    let result: string;

    beforeAll(async () => {
      inputGet = jasmine.createSpy(`inputGet`).and.resolveTo({
        "Test Key A": `Test Value A`,
        "Test Key B": `Test Value B`,
        "Test Key C": `Test Value C`,
        "Test Key D": `Test Value D`,
      });
      input = { get: inputGet };

      mergeObjectInput = new ConcatenateObjectValuesInput(input);

      result = await mergeObjectInput.get();
    });

    it(`continues to expose its input`, () => {
      expect(mergeObjectInput.input).toEqual(input);
    });

    it(`gets its input once`, () => {
      expect(inputGet).toHaveBeenCalledTimes(1);
    });

    it(`returns the concatenated values`, () => {
      expect(result).toEqual(
        `Test Value ATest Value BTest Value CTest Value D`
      );
    });
  });
});

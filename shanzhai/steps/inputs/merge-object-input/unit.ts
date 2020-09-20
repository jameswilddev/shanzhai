import { MergeObjectInput } from ".";
import { Input } from "../input";

describe(`MergeObjectInput`, () => {
  type TestValue =
    | `Test Value A A`
    | `Test Value A B`
    | `Test Value B A`
    | `Test Value B B`
    | `Test Value B C`
    | `Test Value B D`
    | `Test Value C A`
    | `Test Value C B`
    | `Test Value C C`;

  describe(`on construction`, () => {
    let mergeObjectInput: MergeObjectInput<TestValue>;
    let inputAGet: jasmine.Spy;
    let inputA: Input<{ readonly [key: string]: TestValue }>;
    let inputBGet: jasmine.Spy;
    let inputB: Input<{ readonly [key: string]: TestValue }>;
    let inputCGet: jasmine.Spy;
    let inputC: Input<{ readonly [key: string]: TestValue }>;

    beforeAll(() => {
      inputAGet = jasmine.createSpy(`inputAGet`);
      inputA = { get: inputAGet };
      inputBGet = jasmine.createSpy(`inputBGet`);
      inputB = { get: inputBGet };
      inputCGet = jasmine.createSpy(`inputCGet`);
      inputC = { get: inputCGet };

      mergeObjectInput = new MergeObjectInput([inputA, inputB, inputC]);
    });

    it(`exposes its inputs`, () => {
      expect(mergeObjectInput.sources).toEqual([inputA, inputB, inputC]);
    });

    it(`does not get any of its inputs`, () => {
      expect(inputAGet).not.toHaveBeenCalled();
      expect(inputBGet).not.toHaveBeenCalled();
      expect(inputCGet).not.toHaveBeenCalled();
    });
  });

  describe(`get`, () => {
    describe(`when no collisions occur`, () => {
      let mergeObjectInput: MergeObjectInput<TestValue>;
      let inputAGet: jasmine.Spy;
      let inputA: Input<{ readonly [key: string]: TestValue }>;
      let inputBGet: jasmine.Spy;
      let inputB: Input<{ readonly [key: string]: TestValue }>;
      let inputCGet: jasmine.Spy;
      let inputC: Input<{ readonly [key: string]: TestValue }>;
      let result: {
        readonly [key: string]: TestValue;
      };

      beforeAll(() => {
        inputAGet = jasmine.createSpy(`inputAGet`).and.returnValue({
          "Test Key A A": `Test Value A A`,
          "Test Key A B": `Test Value A B`,
        });
        inputA = { get: inputAGet };
        inputBGet = jasmine.createSpy(`inputBGet`).and.returnValue({
          "Test Key B A": `Test Value B A`,
          "Test Key B B": `Test Value B B`,
          "Test Key B C": `Test Value B C`,
          "Test Key B D": `Test Value B D`,
        });
        inputB = { get: inputBGet };
        inputCGet = jasmine.createSpy(`inputCGet`).and.returnValue({
          "Test Key C A": `Test Value C A`,
          "Test Key C B": `Test Value C B`,
          "Test Key C C": `Test Value C C`,
        });
        inputC = { get: inputCGet };

        mergeObjectInput = new MergeObjectInput([inputA, inputB, inputC]);

        result = mergeObjectInput.get();
      });

      it(`continues to expose its inputs`, () => {
        expect(mergeObjectInput.sources).toEqual([inputA, inputB, inputC]);
      });

      it(`gets each of its inputs once`, () => {
        expect(inputAGet).toHaveBeenCalledTimes(1);
        expect(inputBGet).toHaveBeenCalledTimes(1);
        expect(inputCGet).toHaveBeenCalledTimes(1);
      });

      it(`returns an object containing everything gotten`, () => {
        expect(result).toEqual({
          "Test Key A A": `Test Value A A`,
          "Test Key A B": `Test Value A B`,
          "Test Key B A": `Test Value B A`,
          "Test Key B B": `Test Value B B`,
          "Test Key B C": `Test Value B C`,
          "Test Key B D": `Test Value B D`,
          "Test Key C A": `Test Value C A`,
          "Test Key C B": `Test Value C B`,
          "Test Key C C": `Test Value C C`,
        });
      });
    });

    describe(`when a collision occurs`, () => {
      let mergeObjectInput: MergeObjectInput<TestValue>;
      let inputAGet: jasmine.Spy;
      let inputA: Input<{ readonly [key: string]: TestValue }>;
      let inputBGet: jasmine.Spy;
      let inputB: Input<{ readonly [key: string]: TestValue }>;
      let inputCGet: jasmine.Spy;
      let inputC: Input<{ readonly [key: string]: TestValue }>;
      let error: Error;

      beforeAll(() => {
        inputAGet = jasmine.createSpy(`inputAGet`).and.returnValue({
          "Test Key A A": `Test Value A A`,
          "Test Key C B": `Test Value A B`,
        });
        inputA = { get: inputAGet };
        inputBGet = jasmine.createSpy(`inputBGet`).and.returnValue({
          "Test Key B A": `Test Value B A`,
          "Test Key B B": `Test Value B B`,
          "Test Key B C": `Test Value B C`,
          "Test Key B D": `Test Value B D`,
        });
        inputB = { get: inputBGet };
        inputCGet = jasmine.createSpy(`inputCGet`).and.returnValue({
          "Test Key C A": `Test Value C A`,
          "Test Key C B": `Test Value C B`,
          "Test Key C C": `Test Value C C`,
        });
        inputC = { get: inputCGet };

        mergeObjectInput = new MergeObjectInput([inputA, inputB, inputC]);

        try {
          mergeObjectInput.get();
        } catch (e) {
          error = e;
        }
      });

      it(`continues to expose its inputs`, () => {
        expect(mergeObjectInput.sources).toEqual([inputA, inputB, inputC]);
      });

      it(`gets each of its inputs once`, () => {
        expect(inputAGet).toHaveBeenCalledTimes(1);
        expect(inputBGet).toHaveBeenCalledTimes(1);
        expect(inputCGet).toHaveBeenCalledTimes(1);
      });

      it(`throws the expected error`, () => {
        expect(error).toEqual(
          new Error(
            `Unable to merge objects as key "Test Key C B" exists in more than one source.`
          )
        );
      });
    });
  });
});

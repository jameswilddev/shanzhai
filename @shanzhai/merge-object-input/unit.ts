import { MergeObjectInput } from ".";
import { Input } from "@shanzhai/interfaces";

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
    let inputGet: jasmine.Spy;
    let input: Input<{
      readonly [keyA: string]: { readonly [keyB: string]: TestValue };
    }>;

    beforeAll(() => {
      inputGet = jasmine.createSpy(`inputGet`);
      input = { get: inputGet };

      mergeObjectInput = new MergeObjectInput(input);
    });

    it(`exposes its input`, () => {
      expect(mergeObjectInput.input).toEqual(input);
    });

    it(`does not get its input`, () => {
      expect(inputGet).not.toHaveBeenCalled();
    });
  });

  describe(`get`, () => {
    describe(`when no collisions occur`, () => {
      let mergeObjectInput: MergeObjectInput<TestValue>;
      let inputGet: jasmine.Spy;
      let input: Input<{
        readonly [keyA: string]: { readonly [keyB: string]: TestValue };
      }>;
      let result: {
        readonly [key: string]: TestValue;
      };

      beforeAll(async () => {
        inputGet = jasmine.createSpy(`inputGet`).and.resolveTo({
          "Test Key A": {
            "Test Key A A": `Test Value A A`,
            "Test Key A B": `Test Value A B`,
          },
          "Test Key B": {
            "Test Key B A": `Test Value B A`,
            "Test Key B B": `Test Value B B`,
            "Test Key B C": `Test Value B C`,
            "Test Key B D": `Test Value B D`,
          },
          "Test Key C": {
            "Test Key C A": `Test Value C A`,
            "Test Key C B": `Test Value C B`,
            "Test Key C C": `Test Value C C`,
          },
        });
        input = { get: inputGet };

        mergeObjectInput = new MergeObjectInput(input);

        result = await mergeObjectInput.get();
      });

      it(`continues to expose its input`, () => {
        expect(mergeObjectInput.input).toEqual(input);
      });

      it(`gets its input once`, () => {
        expect(inputGet).toHaveBeenCalledTimes(1);
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
      let inputGet: jasmine.Spy;
      let input: Input<{
        readonly [keyA: string]: { readonly [keyB: string]: TestValue };
      }>;
      let error: Error;

      beforeAll(async () => {
        inputGet = jasmine.createSpy(`inputGet`).and.resolveTo({
          "Test Key A": {
            "Test Key A A": `Test Value A A`,
            "Test Key C B": `Test Value A B`,
          },
          "Test Key B": {
            "Test Key B A": `Test Value B A`,
            "Test Key B B": `Test Value B B`,
            "Test Key B C": `Test Value B C`,
            "Test Key B D": `Test Value B D`,
          },
          "Test Key C": {
            "Test Key C A": `Test Value C A`,
            "Test Key C B": `Test Value C B`,
            "Test Key C C": `Test Value C C`,
          },
        });
        input = { get: inputGet };

        mergeObjectInput = new MergeObjectInput(input);

        try {
          await mergeObjectInput.get();
        } catch (e) {
          error = e;
        }
      });

      it(`continues to expose its input`, () => {
        expect(mergeObjectInput.input).toEqual(input);
      });

      it(`gets its input once`, () => {
        expect(inputGet).toHaveBeenCalledTimes(1);
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

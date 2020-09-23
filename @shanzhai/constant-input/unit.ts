import { ConstantInput } from ".";

describe(`ConstantInput`, () => {
  type TestValue = `Test Value`;

  describe(`on construction`, () => {
    let constantInput: ConstantInput<TestValue>;

    beforeAll(() => {
      constantInput = new ConstantInput(`Test Value`);
    });

    it(`exposes its value`, () => {
      expect(constantInput.value).toEqual(`Test Value`);
    });
  });

  describe(`get`, () => {
    let constantInput: ConstantInput<TestValue>;
    let result: TestValue;

    beforeAll(() => {
      constantInput = new ConstantInput(`Test Value`);

      result = constantInput.get();
    });

    it(`continues to expose its value`, () => {
      expect(constantInput.value).toEqual(`Test Value`);
    });

    it(`returns the value`, () => {
      expect(result).toEqual(`Test Value`);
    });
  });
});

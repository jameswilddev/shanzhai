import { NullOutput } from ".";

describe(`NullOutput`, () => {
  type TestValue = `Test Value`;

  describe(`on construction`, () => {
    let nullOutput: NullOutput<TestValue>;

    beforeAll(() => {
      nullOutput = new NullOutput<TestValue>();
    });

    it(`exposes no effects`, () => {
      expect(nullOutput.effects).toEqual([]);
    });
  });

  describe(`set`, () => {
    let nullOutput: NullOutput<TestValue>;

    beforeAll(() => {
      nullOutput = new NullOutput<TestValue>();

      nullOutput.set(`Test Value`);
    });

    it(`continues to expose no effects`, () => {
      expect(nullOutput.effects).toEqual([]);
    });
  });
});

import { NullOutput } from ".";

describe(`NullOutput`, () => {
  type TestValue = `Test Value`;

  describe(`on construction`, () => {
    it(`does nothing`, () => {
      new NullOutput<TestValue>();
    });
  });

  describe(`set`, () => {
    let nullOutput: NullOutput<TestValue>;

    beforeAll(() => {
      nullOutput = new NullOutput<TestValue>();
    });

    it(`does nothing`, () => {
      nullOutput.set(`Test Value`);
    });
  });
});

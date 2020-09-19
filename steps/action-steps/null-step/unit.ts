import { NullStep } from ".";

describe(`NullStep`, () => {
  describe(`on construction`, () => {
    let nullStep: NullStep;

    beforeAll(() => {
      nullStep = new NullStep(`Test Name`);
    });

    it(`exposes its name`, () => {
      expect(nullStep.name).toEqual(`Test Name`);
    });
  });

  describe(`on execution`, () => {
    let nullStep: NullStep;

    beforeAll(async () => {
      nullStep = new NullStep(`Test Name`);

      await nullStep.execute();
    });

    it(`does nothing`, () => {
      /* Nothing to assert. */
    });
  });
});

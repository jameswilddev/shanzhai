import { NopStep } from ".";

describe(`NopStep`, () => {
  describe(`on construction`, () => {
    let nopStep: NopStep;

    beforeAll(() => {
      nopStep = new NopStep(`Test Name`);
    });

    it(`exposes its name`, () => {
      expect(nopStep.name).toEqual(`Test Name`);
    });

    it(`exposes no effects`, () => {
      expect(nopStep.effects).toEqual([]);
    });
  });

  describe(`on execution`, () => {
    let nopStep: NopStep;

    beforeAll(async () => {
      nopStep = new NopStep(`Test Name`);

      await nopStep.execute();
    });

    it(`exposes its name`, () => {
      expect(nopStep.name).toEqual(`Test Name`);
    });

    it(`exposes no effects`, () => {
      expect(nopStep.effects).toEqual([]);
    });
  });
});

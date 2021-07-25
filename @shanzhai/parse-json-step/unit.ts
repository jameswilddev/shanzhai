import { Effect } from "@shanzhai/interfaces";
import { ParseJsonStep } from ".";

describe(`ParseJsonStep`, () => {
  const outputEffectA: Effect = {
    type: `unkeyedStoreSet`,
    unkeyedStore: { type: `unkeyedStore`, name: `Test Output Effect A` },
  };

  const outputEffectB: Effect = {
    type: `unkeyedStoreSet`,
    unkeyedStore: { type: `unkeyedStore`, name: `Test Output Effect B` },
  };

  const outputEffectC: Effect = {
    type: `unkeyedStoreSet`,
    unkeyedStore: { type: `unkeyedStore`, name: `Test Output Effect C` },
  };

  describe(`on construction`, () => {
    let inputGet: jasmine.Spy;
    let outputSet: jasmine.Spy;
    let parseJsonStep: ParseJsonStep;

    beforeAll(() => {
      inputGet = jasmine.createSpy(`inputGet`);
      outputSet = jasmine.createSpy(`outputSet`);

      parseJsonStep = new ParseJsonStep(
        `Test Name`,
        { get: inputGet },
        {
          set: outputSet,
          effects: [outputEffectA, outputEffectB, outputEffectC],
        }
      );
    });

    it(`exposes its name`, () => {
      expect(parseJsonStep.name).toEqual(`Test Name`);
    });

    it(`exposes the output's effects`, () => {
      expect(parseJsonStep.effects).toEqual([
        outputEffectA,
        outputEffectB,
        outputEffectC,
      ]);
    });

    it(`does not read from the input`, () => {
      expect(inputGet).not.toHaveBeenCalled();
    });

    it(`does not write to the output`, () => {
      expect(outputSet).not.toHaveBeenCalled();
    });
  });

  describe(`on execution`, () => {
    describe(`when parseable`, () => {
      let inputGet: jasmine.Spy;
      let outputSet: jasmine.Spy;

      beforeAll(async () => {
        inputGet = jasmine
          .createSpy(`inputGet`)
          .and.resolveTo(`{"test parseable": ["json", "value"]}`);
        outputSet = jasmine.createSpy(`outputSet`).and.resolveTo();

        const parseJsonStep = new ParseJsonStep(
          `Test Name`,
          { get: inputGet },
          {
            set: outputSet,
            effects: [outputEffectA, outputEffectB, outputEffectC],
          }
        );

        await parseJsonStep.execute();
      });

      it(`reads once from the input`, () => {
        expect(inputGet).toHaveBeenCalledTimes(1);
      });

      it(`writes once to the output`, () => {
        expect(outputSet).toHaveBeenCalledTimes(1);
      });

      it(`writes the parsed JSON`, () => {
        expect(outputSet).toHaveBeenCalledWith({
          "test parseable": ["json", "value"],
        });
      });
    });

    describe(`when not parseable`, () => {
      let inputGet: jasmine.Spy;
      let outputSet: jasmine.Spy;
      let error: null | Error = null;

      beforeAll(async () => {
        inputGet = jasmine
          .createSpy(`inputGet`)
          .and.resolveTo(`{"test unparseable"": ["json", "value"]}`);
        outputSet = jasmine.createSpy(`outputSet`);

        const parseJsonStep = new ParseJsonStep(
          `Test Name`,
          { get: inputGet },
          {
            set: outputSet,
            effects: [outputEffectA, outputEffectB, outputEffectC],
          }
        );

        try {
          await parseJsonStep.execute();
        } catch (e) {
          error = e;
        }
      });

      it(`reads once from the input`, () => {
        expect(inputGet).toHaveBeenCalledTimes(1);
      });

      it(`does not write to the output`, () => {
        expect(outputSet).not.toHaveBeenCalled();
      });

      it(`rejects the returned promise`, () => {
        expect(error).not.toBeNull();
      });
    });
  });
});

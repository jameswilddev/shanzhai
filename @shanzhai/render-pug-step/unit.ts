import * as pug from "pug";
import { Input, Output, Effect } from "@shanzhai/interfaces";
import { RenderPugStep } from ".";

describe(`RenderPugStep`, () => {
  const outputEffectA: Effect = {
    type: `storeSet`,
    store: { name: `Test Output Effect A` },
  };

  const outputEffectB: Effect = {
    type: `storeSet`,
    store: { name: `Test Output Effect B` },
  };

  const outputEffectC: Effect = {
    type: `storeSet`,
    store: { name: `Test Output Effect C` },
  };

  describe(`on construction`, () => {
    let templateGet: jasmine.Spy;
    let template: Input<pug.compileTemplate>;
    let localsGet: jasmine.Spy;
    let locals: Input<pug.LocalsObject>;
    let outputSet: jasmine.Spy;
    let output: Output<string>;
    let renderPugStep: RenderPugStep;

    beforeAll(() => {
      templateGet = jasmine.createSpy(`templateGet`);
      template = { get: templateGet };
      localsGet = jasmine.createSpy(`localsGet`);
      locals = { get: localsGet };
      outputSet = jasmine.createSpy(`outputSet`);
      output = {
        set: outputSet,
        effects: [outputEffectA, outputEffectB, outputEffectC],
      };

      renderPugStep = new RenderPugStep(`Test Name`, template, locals, output);
    });

    it(`exposes its name`, () => {
      expect(renderPugStep.name).toEqual(`Test Name`);
    });

    it(`exposes the output's effects`, () => {
      expect(renderPugStep.effects).toEqual([
        outputEffectA,
        outputEffectB,
        outputEffectC,
      ]);
    });

    it(`exposes its template input`, () => {
      expect(renderPugStep.template).toBe(template);
    });

    it(`does not read from its template input`, () => {
      expect(templateGet).not.toHaveBeenCalled();
    });

    it(`exposes its locals input`, () => {
      expect(renderPugStep.locals).toBe(locals);
    });

    it(`does not read from its locals input`, () => {
      expect(localsGet).not.toHaveBeenCalled();
    });

    it(`exposes its output`, () => {
      expect(renderPugStep.output).toBe(output);
    });

    it(`does not write to its output`, () => {
      expect(outputSet).not.toHaveBeenCalled();
    });
  });

  describe(`on execution`, () => {
    let templateGet: jasmine.Spy;
    let template: Input<pug.compileTemplate>;
    let localsGet: jasmine.Spy;
    let locals: Input<pug.LocalsObject>;
    let outputSet: jasmine.Spy;
    let output: Output<string>;
    let renderPugStep: RenderPugStep;

    beforeAll(async () => {
      templateGet = jasmine
        .createSpy(`templateGet`)
        .and.resolveTo(
          pug.compile(`test-element-name #{testLocalAKey} - #{testLocalBKey}`)
        );
      template = { get: templateGet };
      localsGet = jasmine.createSpy(`localsGet`).and.resolveTo({
        testLocalAKey: 1234,
        testLocalBKey: `Test Local B Value`,
      });
      locals = { get: localsGet };
      outputSet = jasmine.createSpy(`outputSet`).and.resolveTo();
      output = {
        set: outputSet,
        effects: [outputEffectA, outputEffectB, outputEffectC],
      };

      renderPugStep = new RenderPugStep(`Test Name`, template, locals, output);

      await renderPugStep.execute();
    });

    it(`continues to expose its template input`, () => {
      expect(renderPugStep.template).toBe(template);
    });

    it(`reads once from its template input`, () => {
      expect(templateGet).toHaveBeenCalledTimes(1);
    });

    it(`continues to expose its locals input`, () => {
      expect(renderPugStep.locals).toBe(locals);
    });

    it(`reads once from its locals input`, () => {
      expect(localsGet).toHaveBeenCalledTimes(1);
    });

    it(`continues to expose its output`, () => {
      expect(renderPugStep.output).toBe(output);
    });

    it(`writes once to its output`, () => {
      expect(outputSet).toHaveBeenCalledTimes(1);
    });

    it(`writes the generated HTML to its output`, () => {
      expect(outputSet).toHaveBeenCalledWith(
        `<test-element-name>1234 - Test Local B Value</test-element-name>`
      );
    });
  });
});

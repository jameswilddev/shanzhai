import * as jsdom from "jsdom";
import MinifyHtmlStep from ".";
import { Input } from "../../../inputs/input";
import { Output } from "../../../outputs/output";

describe(`MinifyHtmlStep`, () => {
  describe(`on construction`, () => {
    let inputGet: jasmine.Spy;
    let input: Input<string>;
    let outputSet: jasmine.Spy;
    let output: Output<string>;
    let minifyHtmlStep: MinifyHtmlStep;

    beforeAll(() => {
      inputGet = jasmine.createSpy(`inputGet`);
      input = { get: inputGet };
      outputSet = jasmine.createSpy(`outputSet`);
      output = { set: outputSet };

      minifyHtmlStep = new MinifyHtmlStep(`Test Name`, input, output);
    });

    it(`exposes its name`, () => {
      expect(minifyHtmlStep.name).toEqual(`Test Name`);
    });

    it(`exposes its input`, () => {
      expect(minifyHtmlStep.input).toBe(input);
    });

    it(`does not read from its input`, () => {
      expect(inputGet).not.toHaveBeenCalled();
    });

    it(`exposes its output`, () => {
      expect(minifyHtmlStep.output).toBe(output);
    });

    it(`does not write to its output`, () => {
      expect(outputSet).not.toHaveBeenCalled();
    });

    it(`sets a reasonable iteration cap`, () => {
      expect(minifyHtmlStep.maximumIterations).toEqual(10);
    });
  });

  describe(`on iterating`, () => {
    let inputGet: jasmine.Spy;
    let outputSet: jasmine.Spy;
    let minifyHtmlStep: MinifyHtmlStep;
    const original = `<html><head><title>Example title</title></head><body><ul><li>Example item A</li><li>Example item B</li><li>Example item C</li></ul></body></html>`;
    let minified: string;

    beforeAll(async () => {
      inputGet = jasmine.createSpy(`inputGet`);
      outputSet = jasmine.createSpy(`outputSet`);

      minifyHtmlStep = new MinifyHtmlStep(
        `Test Name`,
        { get: inputGet },
        { set: outputSet }
      );

      minified = await minifyHtmlStep.iterate(original);
    });

    it(`does not read from its input`, () => {
      expect(inputGet).not.toHaveBeenCalled();
    });

    it(`does not write to its output`, () => {
      expect(outputSet).not.toHaveBeenCalled();
    });

    it(`does not change its iteration cap`, () => {
      expect(minifyHtmlStep.maximumIterations).toEqual(10);
    });

    it(`returns smaller HTML`, () => {
      expect(minified.length).toBeLessThan(original.length);
    });

    it(`returns functionally identical HTML`, () => {
      expect(new jsdom.JSDOM(minified).serialize()).toEqual(
        new jsdom.JSDOM(original).serialize()
      );
    });
  });
});

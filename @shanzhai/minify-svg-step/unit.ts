import * as sharp from "sharp";
import pixelmatch = require("pixelmatch");
import { MinifySvgStep } from ".";
import { Input, Output } from "@shanzhai/interfaces";

describe(`MinifySvgStep`, () => {
  describe(`on construction`, () => {
    let inputGet: jasmine.Spy;
    let input: Input<string>;
    let outputSet: jasmine.Spy;
    let output: Output<string>;
    let minifySvgStep: MinifySvgStep;

    beforeAll(() => {
      inputGet = jasmine.createSpy(`inputGet`);
      input = { get: inputGet };
      outputSet = jasmine.createSpy(`outputSet`);
      output = { set: outputSet, effects: [] };

      minifySvgStep = new MinifySvgStep(`Test Name`, input, output);
    });

    it(`exposes its name`, () => {
      expect(minifySvgStep.name).toEqual(`Test Name`);
    });

    it(`exposes its input`, () => {
      expect(minifySvgStep.input).toBe(input);
    });

    it(`does not read from its input`, () => {
      expect(inputGet).not.toHaveBeenCalled();
    });

    it(`exposes its output`, () => {
      expect(minifySvgStep.output).toBe(output);
    });

    it(`does not write to its output`, () => {
      expect(outputSet).not.toHaveBeenCalled();
    });

    it(`sets a reasonable iteration cap`, () => {
      expect(minifySvgStep.maximumIterations).toEqual(10);
    });
  });

  describe(`on iterating`, () => {
    let inputGet: jasmine.Spy;
    let outputSet: jasmine.Spy;
    let minifySvgStep: MinifySvgStep;
    const original = `<svg xmlns="http://www.w3.org/2000/svg" height="256" width="256"><defs><linearGradient y2="256" x2="256" y1="0" x1="0" id="A" gradientUnits="userSpaceOnUse"><stop offset="0%" stop-color="red"/><stop offset="37.5%" stop-color="#ff0"/><stop offset="50%" stop-color="#0f0"/><stop offset="62.5%" stop-color="#0ff"/><stop offset="100%" stop-color="#00f"/></linearGradient></defs><rect x="0" y="0" width="256" height="256" fill="url(#A)"/><rect x="16" y="16" width="224" height="224" fill="#fff"/></svg>`;
    let minified: string;

    beforeAll(async () => {
      inputGet = jasmine.createSpy(`inputGet`);
      outputSet = jasmine.createSpy(`outputSet`);

      minifySvgStep = new MinifySvgStep(
        `Test Name`,
        { get: inputGet },
        { set: outputSet, effects: [] }
      );

      minified = await minifySvgStep.iterate(original);
    });

    it(`does not read from its input`, () => {
      expect(inputGet).not.toHaveBeenCalled();
    });

    it(`does not write to its output`, () => {
      expect(outputSet).not.toHaveBeenCalled();
    });

    it(`does not change its iteration cap`, () => {
      expect(minifySvgStep.maximumIterations).toEqual(10);
    });

    it(`returns smaller SVG`, () => {
      expect(minified.length).toBeLessThan(original.length);
    });

    it(`returns functionally identical SVG`, async () => {
      const originalPng = sharp(Buffer.from(original)).raw();
      const minifiedPng = sharp(Buffer.from(minified)).raw();

      const originalMetadata = await originalPng.metadata();
      const minifiedMetadata = await minifiedPng.metadata();

      expect(originalMetadata.width).not.toBeUndefined();
      expect(originalMetadata.height).not.toBeUndefined();

      expect(minifiedMetadata.width).toEqual(originalMetadata.width);
      expect(minifiedMetadata.height).toEqual(originalMetadata.height);

      const differentPixels = pixelmatch(
        await originalPng.toBuffer(),
        await minifiedPng.toBuffer(),
        null,
        originalMetadata.width as number,
        originalMetadata.height as number,
        { threshold: 0.05 }
      );

      expect(differentPixels).toEqual(0);
    });
  });
});

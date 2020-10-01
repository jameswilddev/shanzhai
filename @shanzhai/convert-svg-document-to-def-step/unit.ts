import { Input, Output } from "@shanzhai/interfaces";
import { ConvertSvgDocumentToDefStep } from ".";

describe(`ConvertSvgDocumentToDefStep`, () => {
  describe(`on construction`, () => {
    let svgDocument: Input<string>;
    let svgDef: Output<string>;
    let convertSvgDocumentToDefStep: ConvertSvgDocumentToDefStep;

    beforeAll(() => {
      svgDocument = { get: jasmine.createSpy(`svgDocument.get`) };
      svgDef = { set: jasmine.createSpy(`svgDef.set`) };

      convertSvgDocumentToDefStep = new ConvertSvgDocumentToDefStep(
        svgDocument,
        svgDef
      );
    });

    it(`exposes the expected name`, () => {
      expect(convertSvgDocumentToDefStep.name).toEqual(
        `Convert SVG document to def`
      );
    });

    it(`exposes the given input`, () => {
      expect(convertSvgDocumentToDefStep.svgDocument).toBe(svgDocument);
    });

    it(`does not read from the input`, () => {
      expect(svgDocument.get).not.toHaveBeenCalled();
    });

    it(`exposes the given output`, () => {
      expect(convertSvgDocumentToDefStep.svgDef).toBe(svgDef);
    });

    it(`does not write to the output`, () => {
      expect(svgDef.set).not.toHaveBeenCalled();
    });
  });

  describe(`on execution`, () => {
    describe(`self-closing`, () => {
      let svgDocument: Input<string>;
      let svgDef: Output<string>;
      let convertSvgDocumentToDefStep: ConvertSvgDocumentToDefStep;
      let error: undefined | Error;

      beforeAll(async () => {
        svgDocument = {
          get: jasmine.createSpy(`svgDocument.get`).and.resolveTo(`<svg/>`),
        };
        svgDef = { set: jasmine.createSpy(`svgDef.set`) };

        convertSvgDocumentToDefStep = new ConvertSvgDocumentToDefStep(
          svgDocument,
          svgDef
        );

        try {
          await convertSvgDocumentToDefStep.execute();
        } catch (e) {
          error = e;
        }
      });

      it(`continues to expose the expected name`, () => {
        expect(convertSvgDocumentToDefStep.name).toEqual(
          `Convert SVG document to def`
        );
      });

      it(`continues to expose the given input`, () => {
        expect(convertSvgDocumentToDefStep.svgDocument).toBe(svgDocument);
      });

      it(`reads from the input once`, () => {
        expect(svgDocument.get).toHaveBeenCalledTimes(1);
      });

      it(`continues to expose the given output`, () => {
        expect(convertSvgDocumentToDefStep.svgDef).toBe(svgDef);
      });

      it(`does not write to the output`, () => {
        expect(svgDef.set).not.toHaveBeenCalled();
      });

      it(`throws the expected error`, () => {
        expect(error).toEqual(
          new Error(`Empty SVG documents cannot be converted into defs.`)
        );
      });
    });

    describe(`without any child elements`, () => {
      let svgDocument: Input<string>;
      let svgDef: Output<string>;
      let convertSvgDocumentToDefStep: ConvertSvgDocumentToDefStep;
      let error: undefined | Error;

      beforeAll(async () => {
        svgDocument = {
          get: jasmine
            .createSpy(`svgDocument.get`)
            .and.resolveTo(`<svg></svg>`),
        };
        svgDef = { set: jasmine.createSpy(`svgDef.set`) };

        convertSvgDocumentToDefStep = new ConvertSvgDocumentToDefStep(
          svgDocument,
          svgDef
        );

        try {
          await convertSvgDocumentToDefStep.execute();
        } catch (e) {
          error = e;
        }
      });

      it(`continues to expose the expected name`, () => {
        expect(convertSvgDocumentToDefStep.name).toEqual(
          `Convert SVG document to def`
        );
      });

      it(`continues to expose the given input`, () => {
        expect(convertSvgDocumentToDefStep.svgDocument).toBe(svgDocument);
      });

      it(`reads from the input once`, () => {
        expect(svgDocument.get).toHaveBeenCalledTimes(1);
      });

      it(`continues to expose the given output`, () => {
        expect(convertSvgDocumentToDefStep.svgDef).toBe(svgDef);
      });

      it(`does not write to the output`, () => {
        expect(svgDef.set).not.toHaveBeenCalled();
      });

      it(`throws the expected error`, () => {
        expect(error).toEqual(
          new Error(`Empty SVG documents cannot be converted into defs.`)
        );
      });
    });

    describe(`with one child element`, () => {
      let svgDocument: Input<string>;
      let svgDef: Output<string>;
      let convertSvgDocumentToDefStep: ConvertSvgDocumentToDefStep;

      beforeAll(async () => {
        svgDocument = {
          get: jasmine.createSpy(`svgDocument.get`).and.resolveTo(`
            <svg>
              <child-element-a attribute-a-a-key="attribute-a-a-value" attribute-a-b-key="attribute-a-b-value" attribute-a-c-key="attribute-a-c-value">
                text-a
              </child-element-a>
            </svg>
          `),
        };
        svgDef = { set: jasmine.createSpy(`svgDef.set`).and.resolveTo() };

        convertSvgDocumentToDefStep = new ConvertSvgDocumentToDefStep(
          svgDocument,
          svgDef
        );

        await convertSvgDocumentToDefStep.execute();
      });

      it(`continues to expose the expected name`, () => {
        expect(convertSvgDocumentToDefStep.name).toEqual(
          `Convert SVG document to def`
        );
      });

      it(`continues to expose the given input`, () => {
        expect(convertSvgDocumentToDefStep.svgDocument).toBe(svgDocument);
      });

      it(`reads from the input once`, () => {
        expect(svgDocument.get).toHaveBeenCalledTimes(1);
      });

      it(`continues to expose the given output`, () => {
        expect(convertSvgDocumentToDefStep.svgDef).toBe(svgDef);
      });

      it(`writes to the output once`, () => {
        expect(svgDef.set).toHaveBeenCalledTimes(1);
      });

      it(`writes the expected svg to the output`, () => {
        expect(svgDef.set).toHaveBeenCalledWith(
          `<child-element-a attribute-a-a-key="attribute-a-a-value" attribute-a-b-key="attribute-a-b-value" attribute-a-c-key="attribute-a-c-value" id="">text-a</child-element-a>`
        );
      });
    });

    describe(`with two child elements`, () => {
      let svgDocument: Input<string>;
      let svgDef: Output<string>;
      let convertSvgDocumentToDefStep: ConvertSvgDocumentToDefStep;

      beforeAll(async () => {
        svgDocument = {
          get: jasmine.createSpy(`svgDocument.get`).and.resolveTo(`
            <svg>
              <child-element-a attribute-a-a-key="attribute-a-a-value" attribute-a-b-key="attribute-a-b-value" attribute-a-c-key="attribute-a-c-value">
                text-a
              </child-element-a>
              <child-element-b attribute-b-a-key="attribute-b-a-value" attribute-b-b-key="attribute-b-b-value">
                text-b
              </child-element-b>
            </svg>
          `),
        };
        svgDef = { set: jasmine.createSpy(`svgDef.set`).and.resolveTo() };

        convertSvgDocumentToDefStep = new ConvertSvgDocumentToDefStep(
          svgDocument,
          svgDef
        );

        await convertSvgDocumentToDefStep.execute();
      });

      it(`continues to expose the expected name`, () => {
        expect(convertSvgDocumentToDefStep.name).toEqual(
          `Convert SVG document to def`
        );
      });

      it(`continues to expose the given input`, () => {
        expect(convertSvgDocumentToDefStep.svgDocument).toBe(svgDocument);
      });

      it(`reads from the input once`, () => {
        expect(svgDocument.get).toHaveBeenCalledTimes(1);
      });

      it(`continues to expose the given output`, () => {
        expect(convertSvgDocumentToDefStep.svgDef).toBe(svgDef);
      });

      it(`writes to the output once`, () => {
        expect(svgDef.set).toHaveBeenCalledTimes(1);
      });

      it(`writes the expected svg to the output`, () => {
        expect(svgDef.set).toHaveBeenCalledWith(
          `<g id=""><child-element-a attribute-a-a-key="attribute-a-a-value" attribute-a-b-key="attribute-a-b-value" attribute-a-c-key="attribute-a-c-value">text-a</child-element-a><child-element-b attribute-b-a-key="attribute-b-a-value" attribute-b-b-key="attribute-b-b-value">text-b</child-element-b></g>`
        );
      });
    });

    describe(`with three child elements`, () => {
      let svgDocument: Input<string>;
      let svgDef: Output<string>;
      let convertSvgDocumentToDefStep: ConvertSvgDocumentToDefStep;

      beforeAll(async () => {
        svgDocument = {
          get: jasmine.createSpy(`svgDocument.get`).and.resolveTo(`
            <svg>
              <child-element-a attribute-a-a-key="attribute-a-a-value" attribute-a-b-key="attribute-a-b-value" attribute-a-c-key="attribute-a-c-value">
                text-a
              </child-element-a>
              <child-element-b attribute-b-a-key="attribute-b-a-value" attribute-b-b-key="attribute-b-b-value">
                text-b
              </child-element-b>
              <child-element-c attribute-c-a-key="attribute-c-a-value" attribute-c-b-key="attribute-c-b-value" attribute-c-c-key="attribute-c-c-value">
                text-c
              </child-element-c>
            </svg>
          `),
        };
        svgDef = { set: jasmine.createSpy(`svgDef.set`).and.resolveTo() };

        convertSvgDocumentToDefStep = new ConvertSvgDocumentToDefStep(
          svgDocument,
          svgDef
        );

        await convertSvgDocumentToDefStep.execute();
      });

      it(`continues to expose the expected name`, () => {
        expect(convertSvgDocumentToDefStep.name).toEqual(
          `Convert SVG document to def`
        );
      });

      it(`continues to expose the given input`, () => {
        expect(convertSvgDocumentToDefStep.svgDocument).toBe(svgDocument);
      });

      it(`reads from the input once`, () => {
        expect(svgDocument.get).toHaveBeenCalledTimes(1);
      });

      it(`continues to expose the given output`, () => {
        expect(convertSvgDocumentToDefStep.svgDef).toBe(svgDef);
      });

      it(`writes to the output once`, () => {
        expect(svgDef.set).toHaveBeenCalledTimes(1);
      });

      it(`writes the expected svg to the output`, () => {
        expect(svgDef.set).toHaveBeenCalledWith(
          `<g id=""><child-element-a attribute-a-a-key="attribute-a-a-value" attribute-a-b-key="attribute-a-b-value" attribute-a-c-key="attribute-a-c-value">text-a</child-element-a><child-element-b attribute-b-a-key="attribute-b-a-value" attribute-b-b-key="attribute-b-b-value">text-b</child-element-b><child-element-c attribute-c-a-key="attribute-c-a-value" attribute-c-b-key="attribute-c-b-value" attribute-c-c-key="attribute-c-c-value">text-c</child-element-c></g>`
        );
      });
    });
  });
});

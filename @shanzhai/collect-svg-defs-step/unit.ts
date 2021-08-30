import {
  Input,
  Json,
  Output,
  Effect,
  UnkeyedStore,
} from "@shanzhai/interfaces";
import { CollectSvgDefsStep } from ".";

describe(`CollectSvgDefsStep`, () => {
  const unkeyedStore: UnkeyedStore<unknown> = {
    type: `unkeyedStore`,
    name: `Test Unkeyed Store`,
    get: jasmine.createSpy(`unkeyedStore.get`).and.callFake(fail),
    set: jasmine.createSpy(`unkeyedStore.set`).and.callFake(fail),
  };

  const typeScriptEffectA: Effect = {
    type: `unkeyedStoreSet`,
    unkeyedStore,
  };

  const typeScriptEffectB: Effect = {
    type: `unkeyedStoreSet`,
    unkeyedStore,
  };

  const typeScriptEffectC: Effect = {
    type: `unkeyedStoreSet`,
    unkeyedStore,
  };

  const typeScriptEffectD: Effect = {
    type: `unkeyedStoreSet`,
    unkeyedStore,
  };

  const constantsEffectA: Effect = {
    type: `unkeyedStoreSet`,
    unkeyedStore,
  };

  const constantsEffectB: Effect = {
    type: `unkeyedStoreSet`,
    unkeyedStore,
  };

  const svgEffectA: Effect = {
    type: `unkeyedStoreSet`,
    unkeyedStore,
  };

  const svgEffectB: Effect = {
    type: `unkeyedStoreSet`,
    unkeyedStore,
  };

  const svgEffectC: Effect = {
    type: `unkeyedStoreSet`,
    unkeyedStore,
  };

  describe(`on construction`, () => {
    let defs: Input<{ readonly [key: string]: string }>;
    let typeScript: Output<string>;
    let constants: Output<{ readonly [key: string]: Json }>;
    let svg: Output<string>;
    let collectSvgDefsStep: CollectSvgDefsStep;

    beforeAll(() => {
      defs = {
        get: jasmine.createSpy(`defs.get`),
      };
      typeScript = {
        set: jasmine.createSpy(`typeScript.set`),
        effects: [
          typeScriptEffectA,
          typeScriptEffectB,
          typeScriptEffectC,
          typeScriptEffectD,
        ],
      };
      constants = {
        set: jasmine.createSpy(`constants.set`),
        effects: [constantsEffectA, constantsEffectB],
      };
      svg = {
        set: jasmine.createSpy(`svg.set`),
        effects: [svgEffectA, svgEffectB, svgEffectC],
      };

      collectSvgDefsStep = new CollectSvgDefsStep(
        defs,
        typeScript,
        constants,
        svg
      );
    });

    it(`exposes the expected name`, () => {
      expect(collectSvgDefsStep.name).toEqual(`Collect SVG defs`);
    });

    it(`exposes the output's effects`, () => {
      expect(collectSvgDefsStep.effects).toEqual([
        typeScriptEffectA,
        typeScriptEffectB,
        typeScriptEffectC,
        typeScriptEffectD,
        constantsEffectA,
        constantsEffectB,
        svgEffectA,
        svgEffectB,
        svgEffectC,
      ]);
    });

    it(`exposes the defs`, () => {
      expect(collectSvgDefsStep.defs).toBe(defs);
    });

    it(`does not get its defs`, () => {
      expect(collectSvgDefsStep.defs.get).not.toHaveBeenCalled();
    });

    it(`exposes its typeScript output`, () => {
      expect(collectSvgDefsStep.typeScript).toBe(typeScript);
    });

    it(`does not write to its typeScript output`, () => {
      expect(typeScript.set).not.toHaveBeenCalled();
    });

    it(`exposes its constants output`, () => {
      expect(collectSvgDefsStep.constants).toBe(constants);
    });

    it(`does not write to its constants output`, () => {
      expect(constants.set).not.toHaveBeenCalled();
    });

    it(`exposes its svg output`, () => {
      expect(collectSvgDefsStep.svg).toBe(svg);
    });

    it(`does not write to its svg output`, () => {
      expect(svg.set).not.toHaveBeenCalled();
    });
  });

  describe(`on execution`, () => {
    describe(`without defs`, () => {
      let defs: Input<{ readonly [key: string]: string }>;
      let typeScript: Output<string>;
      let constants: Output<{ readonly [key: string]: Json }>;
      let svg: Output<string>;
      let collectSvgDefsStep: CollectSvgDefsStep;

      beforeAll(async () => {
        defs = {
          get: jasmine.createSpy(`defs.get`).and.resolveTo({}),
        };
        typeScript = {
          set: jasmine.createSpy(`typeScript.set`).and.resolveTo(),
          effects: [
            typeScriptEffectA,
            typeScriptEffectB,
            typeScriptEffectC,
            typeScriptEffectD,
          ],
        };
        constants = {
          set: jasmine.createSpy(`constants.set`).and.resolveTo(),
          effects: [constantsEffectA, constantsEffectB],
        };
        svg = {
          set: jasmine.createSpy(`svg.set`).and.resolveTo(),
          effects: [svgEffectA, svgEffectB, svgEffectC],
        };

        collectSvgDefsStep = new CollectSvgDefsStep(
          defs,
          typeScript,
          constants,
          svg
        );

        await collectSvgDefsStep.execute();
      });

      it(`continues to expose the expected name`, () => {
        expect(collectSvgDefsStep.name).toEqual(`Collect SVG defs`);
      });

      it(`continues to expose the defs input`, () => {
        expect(collectSvgDefsStep.defs).toBe(defs);
      });

      it(`gets the defs once`, () => {
        expect(collectSvgDefsStep.defs.get).toHaveBeenCalledTimes(1);
      });

      it(`continues to expose its typeScript output`, () => {
        expect(collectSvgDefsStep.typeScript).toBe(typeScript);
      });

      it(`writes to its TypeScript output once`, () => {
        expect(typeScript.set).toHaveBeenCalledTimes(1);
      });

      it(`writes the expected TypeScript`, () => {
        expect(typeScript.set).toHaveBeenCalledWith(`type AnySvg = never;`);
      });

      it(`continues to expose its constants output`, () => {
        expect(collectSvgDefsStep.constants).toBe(constants);
      });

      it(`writes to its constants output once`, () => {
        expect(constants.set).toHaveBeenCalledTimes(1);
      });

      it(`writes the expected constants`, () => {
        expect(constants.set).toHaveBeenCalledWith({} as Record<string, never>);
      });

      it(`continues to expose its svg output`, () => {
        expect(collectSvgDefsStep.svg).toBe(svg);
      });

      it(`it writes once to its svg output`, () => {
        expect(svg.set).toHaveBeenCalledTimes(1);
      });

      it(`writes the expected svg`, () => {
        expect(svg.set).toHaveBeenCalledWith(``);
      });
    });

    describe(`with one def`, () => {
      let defs: Input<{ readonly [key: string]: string }>;
      let typeScript: Output<string>;
      let constants: Output<{ readonly [key: string]: Json }>;
      let svg: Output<string>;
      let collectSvgDefsStep: CollectSvgDefsStep;

      beforeAll(async () => {
        defs = {
          get: jasmine.createSpy(`defs.get`).and.resolveTo({
            testTypeScriptNameA: `<element-a attribute-a-a-key="attribute-a-a-value" easily-confused-with-id="" id="" also-easily-confused-with-id="" attribute-a-b-key="attribute-a-b-value" attribute-a-c-key="attribute-a-c-value">text-a</element-a>`,
          }),
        };
        typeScript = {
          set: jasmine.createSpy(`typeScript.set`).and.resolveTo(),
          effects: [
            typeScriptEffectA,
            typeScriptEffectB,
            typeScriptEffectC,
            typeScriptEffectD,
          ],
        };
        constants = {
          set: jasmine.createSpy(`constants.set`).and.resolveTo(),
          effects: [constantsEffectA, constantsEffectB],
        };
        svg = {
          set: jasmine.createSpy(`svg.set`).and.resolveTo(),
          effects: [svgEffectA, svgEffectB, svgEffectC],
        };

        collectSvgDefsStep = new CollectSvgDefsStep(
          defs,
          typeScript,
          constants,
          svg
        );

        await collectSvgDefsStep.execute();
      });

      it(`continues to expose the expected name`, () => {
        expect(collectSvgDefsStep.name).toEqual(`Collect SVG defs`);
      });

      it(`continues to expose the defs input`, () => {
        expect(collectSvgDefsStep.defs).toBe(defs);
      });

      it(`gets the defs once`, () => {
        expect(collectSvgDefsStep.defs.get).toHaveBeenCalledTimes(1);
      });

      it(`continues to expose its typeScript output`, () => {
        expect(collectSvgDefsStep.typeScript).toBe(typeScript);
      });

      it(`writes to its TypeScript output once`, () => {
        expect(typeScript.set).toHaveBeenCalledTimes(1);
      });

      it(`writes the expected TypeScript`, () => {
        expect(typeScript.set).toHaveBeenCalledWith(`type AnySvg = 0;`);
      });

      it(`continues to expose its constants output`, () => {
        expect(collectSvgDefsStep.constants).toBe(constants);
      });

      it(`writes to its constants output once`, () => {
        expect(constants.set).toHaveBeenCalledTimes(1);
      });

      it(`writes the expected constants`, () => {
        expect(constants.set).toHaveBeenCalledWith({
          testTypeScriptNameA: 0,
        } as Record<string, number>);
      });

      it(`continues to expose its svg output`, () => {
        expect(collectSvgDefsStep.svg).toBe(svg);
      });

      it(`it writes once to its svg output`, () => {
        expect(svg.set).toHaveBeenCalledTimes(1);
      });

      it(`writes the expected svg`, () => {
        expect(svg.set).toHaveBeenCalledWith(
          `<element-a attribute-a-a-key="attribute-a-a-value" easily-confused-with-id="" id="0" also-easily-confused-with-id="" attribute-a-b-key="attribute-a-b-value" attribute-a-c-key="attribute-a-c-value">text-a</element-a>`
        );
      });
    });

    describe(`with two defs`, () => {
      let defs: Input<{ readonly [key: string]: string }>;
      let typeScript: Output<string>;
      let constants: Output<{ readonly [key: string]: Json }>;
      let svg: Output<string>;
      let collectSvgDefsStep: CollectSvgDefsStep;

      beforeAll(async () => {
        defs = {
          get: jasmine.createSpy(`defs.get`).and.resolveTo({
            testTypeScriptNameB: `<element-a attribute-a-a-key="attribute-a-a-value" easily-confused-with-id="" id="" also-easily-confused-with-id="" attribute-a-b-key="attribute-a-b-value" attribute-a-c-key="attribute-a-c-value">text-a</element-a>`,
            testTypeScriptNameA: `<element-b attribute-b-a-key="attribute-b-a-value" attribute-b-b-key="attribute-b-b-value" easily-confused-with-id="" id="" also-easily-confused-with-id="" attribute-b-c-key="attribute-b-c-value" attribute-b-d-key="attribute-b-d-value">text-b</element-b>`,
          }),
        };
        typeScript = {
          set: jasmine.createSpy(`typeScript.set`).and.resolveTo(),
          effects: [
            typeScriptEffectA,
            typeScriptEffectB,
            typeScriptEffectC,
            typeScriptEffectD,
          ],
        };
        constants = {
          set: jasmine.createSpy(`constants.set`).and.resolveTo(),
          effects: [constantsEffectA, constantsEffectB],
        };
        svg = {
          set: jasmine.createSpy(`svg.set`).and.resolveTo(),
          effects: [svgEffectA, svgEffectB, svgEffectC],
        };

        collectSvgDefsStep = new CollectSvgDefsStep(
          defs,
          typeScript,
          constants,
          svg
        );

        await collectSvgDefsStep.execute();
      });

      it(`continues to expose the expected name`, () => {
        expect(collectSvgDefsStep.name).toEqual(`Collect SVG defs`);
      });

      it(`continues to expose the defs input`, () => {
        expect(collectSvgDefsStep.defs).toBe(defs);
      });

      it(`gets the defs once`, () => {
        expect(collectSvgDefsStep.defs.get).toHaveBeenCalledTimes(1);
      });

      it(`continues to expose its typeScript output`, () => {
        expect(collectSvgDefsStep.typeScript).toBe(typeScript);
      });

      it(`writes to its TypeScript output once`, () => {
        expect(typeScript.set).toHaveBeenCalledTimes(1);
      });

      it(`writes the expected TypeScript`, () => {
        expect(typeScript.set).toHaveBeenCalledWith(`type AnySvg = 0 | 1;`);
      });

      it(`continues to expose its constants output`, () => {
        expect(collectSvgDefsStep.constants).toBe(constants);
      });

      it(`writes to its constants output once`, () => {
        expect(constants.set).toHaveBeenCalledTimes(1);
      });

      it(`writes the expected constants`, () => {
        expect(constants.set).toHaveBeenCalledWith({
          testTypeScriptNameA: 0,
          testTypeScriptNameB: 1,
        } as Record<string, number>);
      });

      it(`continues to expose its svg output`, () => {
        expect(collectSvgDefsStep.svg).toBe(svg);
      });

      it(`it writes once to its svg output`, () => {
        expect(svg.set).toHaveBeenCalledTimes(1);
      });

      it(`writes the expected svg`, () => {
        expect(svg.set).toHaveBeenCalledWith(
          `<element-b attribute-b-a-key="attribute-b-a-value" attribute-b-b-key="attribute-b-b-value" easily-confused-with-id="" id="0" also-easily-confused-with-id="" attribute-b-c-key="attribute-b-c-value" attribute-b-d-key="attribute-b-d-value">text-b</element-b><element-a attribute-a-a-key="attribute-a-a-value" easily-confused-with-id="" id="1" also-easily-confused-with-id="" attribute-a-b-key="attribute-a-b-value" attribute-a-c-key="attribute-a-c-value">text-a</element-a>`
        );
      });
    });

    describe(`with three defs`, () => {
      describe(`all valid`, () => {
        let defs: Input<{ readonly [key: string]: string }>;
        let typeScript: Output<string>;
        let constants: Output<{ readonly [key: string]: Json }>;
        let svg: Output<string>;
        let collectSvgDefsStep: CollectSvgDefsStep;

        beforeAll(async () => {
          defs = {
            get: jasmine.createSpy(`defs.get`).and.resolveTo({
              testTypeScriptNameB: `<element-a attribute-a-a-key="attribute-a-a-value" easily-confused-with-id="" id="" also-easily-confused-with-id="" attribute-a-b-key="attribute-a-b-value" attribute-a-c-key="attribute-a-c-value">text-a</element-a>`,
              testTypeScriptNameA: `<element-b attribute-b-a-key="attribute-b-a-value" attribute-b-b-key="attribute-b-b-value" easily-confused-with-id="" id="" also-easily-confused-with-id="" attribute-b-c-key="attribute-b-c-value" attribute-b-d-key="attribute-b-d-value">text-b</element-b>`,
              testTypeScriptNameC: `<element-c attribute-c-a-key="attribute-c-a-value" easily-confused-with-id="" id="" also-easily-confused-with-id="" attribute-c-b-key="attribute-c-b-value">text-c</element-c>`,
            }),
          };
          typeScript = {
            set: jasmine.createSpy(`typeScript.set`).and.resolveTo(),
            effects: [
              typeScriptEffectA,
              typeScriptEffectB,
              typeScriptEffectC,
              typeScriptEffectD,
            ],
          };
          constants = {
            set: jasmine.createSpy(`constants.set`).and.resolveTo(),
            effects: [constantsEffectA, constantsEffectB],
          };
          svg = {
            set: jasmine.createSpy(`svg.set`).and.resolveTo(),
            effects: [svgEffectA, svgEffectB, svgEffectC],
          };

          collectSvgDefsStep = new CollectSvgDefsStep(
            defs,
            typeScript,
            constants,
            svg
          );

          await collectSvgDefsStep.execute();
        });

        it(`continues to expose the expected name`, () => {
          expect(collectSvgDefsStep.name).toEqual(`Collect SVG defs`);
        });

        it(`continues to expose the defs input`, () => {
          expect(collectSvgDefsStep.defs).toBe(defs);
        });

        it(`gets the defs once`, () => {
          expect(collectSvgDefsStep.defs.get).toHaveBeenCalledTimes(1);
        });

        it(`continues to expose its typeScript output`, () => {
          expect(collectSvgDefsStep.typeScript).toBe(typeScript);
        });

        it(`writes to its TypeScript output once`, () => {
          expect(typeScript.set).toHaveBeenCalledTimes(1);
        });

        it(`writes the expected TypeScript`, () => {
          expect(typeScript.set).toHaveBeenCalledWith(
            `type AnySvg = 0 | 1 | 2;`
          );
        });

        it(`continues to expose its constants output`, () => {
          expect(collectSvgDefsStep.constants).toBe(constants);
        });

        it(`writes to its constants output once`, () => {
          expect(constants.set).toHaveBeenCalledTimes(1);
        });

        it(`writes the expected constants`, () => {
          expect(constants.set).toHaveBeenCalledWith({
            testTypeScriptNameA: 0,
            testTypeScriptNameB: 1,
            testTypeScriptNameC: 2,
          } as Record<string, number>);
        });

        it(`continues to expose its svg output`, () => {
          expect(collectSvgDefsStep.svg).toBe(svg);
        });

        it(`it writes once to its svg output`, () => {
          expect(svg.set).toHaveBeenCalledTimes(1);
        });

        it(`writes the expected svg`, () => {
          expect(svg.set).toHaveBeenCalledWith(
            `<element-b attribute-b-a-key="attribute-b-a-value" attribute-b-b-key="attribute-b-b-value" easily-confused-with-id="" id="0" also-easily-confused-with-id="" attribute-b-c-key="attribute-b-c-value" attribute-b-d-key="attribute-b-d-value">text-b</element-b><element-a attribute-a-a-key="attribute-a-a-value" easily-confused-with-id="" id="1" also-easily-confused-with-id="" attribute-a-b-key="attribute-a-b-value" attribute-a-c-key="attribute-a-c-value">text-a</element-a><element-c attribute-c-a-key="attribute-c-a-value" easily-confused-with-id="" id="2" also-easily-confused-with-id="" attribute-c-b-key="attribute-c-b-value">text-c</element-c>`
          );
        });
      });

      describe(`where a def is missing an id`, () => {
        let defs: Input<{ readonly [key: string]: string }>;
        let typeScript: Output<string>;
        let constants: Output<{ readonly [key: string]: Json }>;
        let svg: Output<string>;
        let collectSvgDefsStep: CollectSvgDefsStep;
        let error: undefined | Error;

        beforeAll(async () => {
          defs = {
            get: jasmine.createSpy(`defs.get`).and.resolveTo({
              testTypeScriptNameB: `<element-a attribute-a-a-key="attribute-a-a-value" easily-confused-with-id="" id="" also-easily-confused-with-id="" attribute-a-b-key="attribute-a-b-value" attribute-a-c-key="attribute-a-c-value">text-a</element-a>`,
              testTypeScriptNameA: `<element-b attribute-b-a-key="attribute-b-a-value" attribute-b-b-key="attribute-b-b-value" easily-confused-with-id="" also-easily-confused-with-id="" attribute-b-c-key="attribute-b-c-value" attribute-b-d-key="attribute-b-d-value">text-b</element-b>`,
              testTypeScriptNameC: `<element-c attribute-c-a-key="attribute-c-a-value" easily-confused-with-id="" id="" also-easily-confused-with-id="" attribute-c-b-key="attribute-c-b-value">text-c</element-c>`,
            }),
          };
          typeScript = {
            set: jasmine.createSpy(`typeScript.set`),
            effects: [
              typeScriptEffectA,
              typeScriptEffectB,
              typeScriptEffectC,
              typeScriptEffectD,
            ],
          };
          constants = {
            set: jasmine.createSpy(`constants.set`),
            effects: [constantsEffectA, constantsEffectB],
          };
          svg = {
            set: jasmine.createSpy(`svg.set`),
            effects: [svgEffectA, svgEffectB, svgEffectC],
          };

          collectSvgDefsStep = new CollectSvgDefsStep(
            defs,
            typeScript,
            constants,
            svg
          );

          try {
            await collectSvgDefsStep.execute();
          } catch (e) {
            error = e as Error;
          }
        });

        it(`continues to expose the expected name`, () => {
          expect(collectSvgDefsStep.name).toEqual(`Collect SVG defs`);
        });

        it(`continues to expose the defs input`, () => {
          expect(collectSvgDefsStep.defs).toBe(defs);
        });

        it(`gets the defs once`, () => {
          expect(collectSvgDefsStep.defs.get).toHaveBeenCalledTimes(1);
        });

        it(`exposes its typeScript output`, () => {
          expect(collectSvgDefsStep.typeScript).toBe(typeScript);
        });

        it(`does not write to its typeScript output`, () => {
          expect(typeScript.set).not.toHaveBeenCalled();
        });

        it(`exposes its constants output`, () => {
          expect(collectSvgDefsStep.constants).toBe(constants);
        });

        it(`does not write to its constants output`, () => {
          expect(constants.set).not.toHaveBeenCalled();
        });

        it(`exposes its svg output`, () => {
          expect(collectSvgDefsStep.svg).toBe(svg);
        });

        it(`does not write to its svg output`, () => {
          expect(svg.set).not.toHaveBeenCalled();
        });

        it(`throws the expected error`, () => {
          expect(error).toEqual(new Error(`Failed to inject ID into SVG def.`));
        });
      });

      describe(`where a def has two ids`, () => {
        let defs: Input<{ readonly [key: string]: string }>;
        let typeScript: Output<string>;
        let constants: Output<{ readonly [key: string]: Json }>;
        let svg: Output<string>;
        let collectSvgDefsStep: CollectSvgDefsStep;
        let error: undefined | Error;

        beforeAll(async () => {
          defs = {
            get: jasmine.createSpy(`defs.get`).and.resolveTo({
              testTypeScriptNameB: `<element-a attribute-a-a-key="attribute-a-a-value" easily-confused-with-id="" id="" also-easily-confused-with-id="" attribute-a-b-key="attribute-a-b-value" attribute-a-c-key="attribute-a-c-value">text-a</element-a>`,
              testTypeScriptNameA: `<element-b attribute-b-a-key="attribute-b-a-value" attribute-b-b-key="attribute-b-b-value" easily-confused-with-id="" id="" also-easily-confused-with-id="" id="" attribute-b-c-key="attribute-b-c-value" attribute-b-d-key="attribute-b-d-value">text-b</element-b>`,
              testTypeScriptNameC: `<element-c attribute-c-a-key="attribute-c-a-value" easily-confused-with-id="" id="" also-easily-confused-with-id="" attribute-c-b-key="attribute-c-b-value">text-c</element-c>`,
            }),
          };
          typeScript = {
            set: jasmine.createSpy(`typeScript.set`),
            effects: [
              typeScriptEffectA,
              typeScriptEffectB,
              typeScriptEffectC,
              typeScriptEffectD,
            ],
          };
          constants = {
            set: jasmine.createSpy(`constants.set`),
            effects: [constantsEffectA, constantsEffectB],
          };
          svg = {
            set: jasmine.createSpy(`svg.set`),
            effects: [svgEffectA, svgEffectB, svgEffectC],
          };

          collectSvgDefsStep = new CollectSvgDefsStep(
            defs,
            typeScript,
            constants,
            svg
          );

          try {
            await collectSvgDefsStep.execute();
          } catch (e) {
            error = e as Error;
          }
        });

        it(`continues to expose the expected name`, () => {
          expect(collectSvgDefsStep.name).toEqual(`Collect SVG defs`);
        });

        it(`continues to expose the defs input`, () => {
          expect(collectSvgDefsStep.defs).toBe(defs);
        });

        it(`gets the defs once`, () => {
          expect(collectSvgDefsStep.defs.get).toHaveBeenCalledTimes(1);
        });

        it(`exposes its typeScript output`, () => {
          expect(collectSvgDefsStep.typeScript).toBe(typeScript);
        });

        it(`does not write to its typeScript output`, () => {
          expect(typeScript.set).not.toHaveBeenCalled();
        });

        it(`exposes its constants output`, () => {
          expect(collectSvgDefsStep.constants).toBe(constants);
        });

        it(`does not write to its constants output`, () => {
          expect(constants.set).not.toHaveBeenCalled();
        });

        it(`exposes its svg output`, () => {
          expect(collectSvgDefsStep.svg).toBe(svg);
        });

        it(`does not write to its svg output`, () => {
          expect(svg.set).not.toHaveBeenCalled();
        });

        it(`throws the expected error`, () => {
          expect(error).toEqual(new Error(`Failed to inject ID into SVG def.`));
        });
      });

      describe(`where a def has three ids`, () => {
        let defs: Input<{ readonly [key: string]: string }>;
        let typeScript: Output<string>;
        let constants: Output<{ readonly [key: string]: Json }>;
        let svg: Output<string>;
        let collectSvgDefsStep: CollectSvgDefsStep;
        let error: undefined | Error;

        beforeAll(async () => {
          defs = {
            get: jasmine.createSpy(`defs.get`).and.resolveTo({
              testTypeScriptNameB: `<element-a attribute-a-a-key="attribute-a-a-value" easily-confused-with-id="" id="" also-easily-confused-with-id="" attribute-a-b-key="attribute-a-b-value" attribute-a-c-key="attribute-a-c-value">text-a</element-a>`,
              testTypeScriptNameA: `<element-b attribute-b-a-key="attribute-b-a-value" id="" attribute-b-b-key="attribute-b-b-value" id="" easily-confused-with-id="" also-easily-confused-with-id="" id="" attribute-b-c-key="attribute-b-c-value" attribute-b-d-key="attribute-b-d-value">text-b</element-b>`,
              testTypeScriptNameC: `<element-c attribute-c-a-key="attribute-c-a-value" easily-confused-with-id="" id="" also-easily-confused-with-id="" attribute-c-b-key="attribute-c-b-value">text-c</element-c>`,
            }),
          };
          typeScript = {
            set: jasmine.createSpy(`typeScript.set`),
            effects: [
              typeScriptEffectA,
              typeScriptEffectB,
              typeScriptEffectC,
              typeScriptEffectD,
            ],
          };
          constants = {
            set: jasmine.createSpy(`constants.set`),
            effects: [constantsEffectA, constantsEffectB],
          };
          svg = {
            set: jasmine.createSpy(`svg.set`),
            effects: [svgEffectA, svgEffectB, svgEffectC],
          };

          collectSvgDefsStep = new CollectSvgDefsStep(
            defs,
            typeScript,
            constants,
            svg
          );

          try {
            await collectSvgDefsStep.execute();
          } catch (e) {
            error = e as Error;
          }
        });

        it(`continues to expose the expected name`, () => {
          expect(collectSvgDefsStep.name).toEqual(`Collect SVG defs`);
        });

        it(`continues to expose the defs input`, () => {
          expect(collectSvgDefsStep.defs).toBe(defs);
        });

        it(`gets the defs once`, () => {
          expect(collectSvgDefsStep.defs.get).toHaveBeenCalledTimes(1);
        });

        it(`exposes its typeScript output`, () => {
          expect(collectSvgDefsStep.typeScript).toBe(typeScript);
        });

        it(`does not write to its typeScript output`, () => {
          expect(typeScript.set).not.toHaveBeenCalled();
        });

        it(`exposes its constants output`, () => {
          expect(collectSvgDefsStep.constants).toBe(constants);
        });

        it(`does not write to its constants output`, () => {
          expect(constants.set).not.toHaveBeenCalled();
        });

        it(`exposes its svg output`, () => {
          expect(collectSvgDefsStep.svg).toBe(svg);
        });

        it(`does not write to its svg output`, () => {
          expect(svg.set).not.toHaveBeenCalled();
        });

        it(`throws the expected error`, () => {
          expect(error).toEqual(new Error(`Failed to inject ID into SVG def.`));
        });
      });
    });
  });
});

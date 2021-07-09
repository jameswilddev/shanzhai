import { Input, Json, Output, Effect } from "@shanzhai/interfaces";
import { CollectSvgDefsStep } from ".";

describe(`CollectSvgDefsStep`, () => {
  const typeScriptEffectA: Effect = {
    type: `unkeyedStoreSet`,
    store: { name: `Test TypeScript Effect A` },
  };

  const typeScriptEffectB: Effect = {
    type: `unkeyedStoreSet`,
    store: { name: `Test TypeScript Effect B` },
  };

  const typeScriptEffectC: Effect = {
    type: `unkeyedStoreSet`,
    store: { name: `Test TypeScript Effect C` },
  };

  const typeScriptEffectD: Effect = {
    type: `unkeyedStoreSet`,
    store: { name: `Test TypeScript Effect D` },
  };

  const constantsEffectA: Effect = {
    type: `unkeyedStoreSet`,
    store: { name: `Test Constants Effect A` },
  };

  const constantsEffectB: Effect = {
    type: `unkeyedStoreSet`,
    store: { name: `Test Constants Effect B` },
  };

  const svgEffectA: Effect = {
    type: `unkeyedStoreSet`,
    store: { name: `Test Svg Effect A` },
  };

  const svgEffectB: Effect = {
    type: `unkeyedStoreSet`,
    store: { name: `Test Svg Effect B` },
  };

  const svgEffectC: Effect = {
    type: `unkeyedStoreSet`,
    store: { name: `Test Svg Effect C` },
  };

  describe(`without defs`, () => {
    describe(`on construction`, () => {
      let typeScript: Output<string>;
      let constants: Output<{ readonly [key: string]: Json }>;
      let svg: Output<string>;
      let collectSvgDefsStep: CollectSvgDefsStep;

      beforeAll(() => {
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
          [],
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

      it(`exposes the expected array of defs`, () => {
        expect(collectSvgDefsStep.defs).toEqual([]);
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
      let typeScript: Output<string>;
      let constants: Output<{ readonly [key: string]: Json }>;
      let svg: Output<string>;
      let collectSvgDefsStep: CollectSvgDefsStep;

      beforeAll(async () => {
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
          [],
          typeScript,
          constants,
          svg
        );

        await collectSvgDefsStep.execute();
      });

      it(`continues to expose the expected name`, () => {
        expect(collectSvgDefsStep.name).toEqual(`Collect SVG defs`);
      });

      it(`continues to expose the expected array of defs`, () => {
        expect(collectSvgDefsStep.defs).toEqual([]);
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
  });

  describe(`with one def`, () => {
    describe(`on construction`, () => {
      let defAContent: Input<string>;
      let typeScript: Output<string>;
      let constants: Output<{ readonly [key: string]: Json }>;
      let svg: Output<string>;
      let collectSvgDefsStep: CollectSvgDefsStep;

      beforeAll(() => {
        defAContent = { get: jasmine.createSpy(`defA.get`) };
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
          [
            {
              typeScriptName: `testTypeScriptNameA`,
              content: defAContent,
            },
          ],
          typeScript,
          constants,
          svg
        );
      });

      it(`exposes the expected name`, () => {
        expect(collectSvgDefsStep.name).toEqual(`Collect SVG defs`);
      });

      it(`exposes the expected array of defs`, () => {
        expect(collectSvgDefsStep.defs).toEqual([
          {
            typeScriptName: `testTypeScriptNameA`,
            content: defAContent,
          },
        ]);
      });

      it(`does not read from the def's content`, () => {
        expect(defAContent.get).not.toHaveBeenCalled();
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
      let defAContent: Input<string>;
      let typeScript: Output<string>;
      let constants: Output<{ readonly [key: string]: Json }>;
      let svg: Output<string>;
      let collectSvgDefsStep: CollectSvgDefsStep;

      beforeAll(async () => {
        defAContent = {
          get: jasmine
            .createSpy(`defA.get`)
            .and.resolveTo(
              `<element-a attribute-a-a-key="attribute-a-a-value" easily-confused-with-id="" id="" also-easily-confused-with-id="" attribute-a-b-key="attribute-a-b-value" attribute-a-c-key="attribute-a-c-value">text-a</element-a>`
            ),
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
          [
            {
              typeScriptName: `testTypeScriptNameA`,
              content: defAContent,
            },
          ],
          typeScript,
          constants,
          svg
        );

        await collectSvgDefsStep.execute();
      });

      it(`continues to expose the expected name`, () => {
        expect(collectSvgDefsStep.name).toEqual(`Collect SVG defs`);
      });

      it(`continues to expose the expected array of defs`, () => {
        expect(collectSvgDefsStep.defs).toEqual([
          {
            typeScriptName: `testTypeScriptNameA`,
            content: defAContent,
          },
        ]);
      });

      it(`reads from the defs' content once`, () => {
        expect(defAContent.get).toHaveBeenCalledTimes(1);
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
  });

  describe(`with two defs`, () => {
    describe(`on construction`, () => {
      let defAContent: Input<string>;
      let defBContent: Input<string>;
      let typeScript: Output<string>;
      let constants: Output<{ readonly [key: string]: Json }>;
      let svg: Output<string>;
      let collectSvgDefsStep: CollectSvgDefsStep;

      beforeAll(() => {
        defAContent = { get: jasmine.createSpy(`defA.get`) };
        defBContent = { get: jasmine.createSpy(`defB.get`) };
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
          [
            {
              typeScriptName: `testTypeScriptNameB`,
              content: defAContent,
            },
            {
              typeScriptName: `testTypeScriptNameA`,
              content: defBContent,
            },
          ],
          typeScript,
          constants,
          svg
        );
      });

      it(`exposes the expected name`, () => {
        expect(collectSvgDefsStep.name).toEqual(`Collect SVG defs`);
      });

      it(`exposes the expected array of defs`, () => {
        expect(collectSvgDefsStep.defs).toEqual([
          {
            typeScriptName: `testTypeScriptNameB`,
            content: defAContent,
          },
          {
            typeScriptName: `testTypeScriptNameA`,
            content: defBContent,
          },
        ]);
      });

      it(`does not read from the defs' content`, () => {
        expect(defAContent.get).not.toHaveBeenCalled();
        expect(defBContent.get).not.toHaveBeenCalled();
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
      let defAContent: Input<string>;
      let defBContent: Input<string>;
      let typeScript: Output<string>;
      let constants: Output<{ readonly [key: string]: Json }>;
      let svg: Output<string>;
      let collectSvgDefsStep: CollectSvgDefsStep;

      beforeAll(async () => {
        defAContent = {
          get: jasmine
            .createSpy(`defA.get`)
            .and.resolveTo(
              `<element-a attribute-a-a-key="attribute-a-a-value" easily-confused-with-id="" id="" also-easily-confused-with-id="" attribute-a-b-key="attribute-a-b-value" attribute-a-c-key="attribute-a-c-value">text-a</element-a>`
            ),
        };
        defBContent = {
          get: jasmine
            .createSpy(`defB.get`)
            .and.resolveTo(
              `<element-b attribute-b-a-key="attribute-b-a-value" attribute-b-b-key="attribute-b-b-value" easily-confused-with-id="" id="" also-easily-confused-with-id="" attribute-b-c-key="attribute-b-c-value" attribute-b-d-key="attribute-b-d-value">text-b</element-b>`
            ),
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
          [
            {
              typeScriptName: `testTypeScriptNameB`,
              content: defAContent,
            },
            {
              typeScriptName: `testTypeScriptNameA`,
              content: defBContent,
            },
          ],
          typeScript,
          constants,
          svg
        );

        await collectSvgDefsStep.execute();
      });

      it(`continues to expose the expected name`, () => {
        expect(collectSvgDefsStep.name).toEqual(`Collect SVG defs`);
      });

      it(`continues to expose the expected array of defs`, () => {
        expect(collectSvgDefsStep.defs).toEqual([
          {
            typeScriptName: `testTypeScriptNameB`,
            content: defAContent,
          },
          {
            typeScriptName: `testTypeScriptNameA`,
            content: defBContent,
          },
        ]);
      });

      it(`reads from the defs' content once`, () => {
        expect(defAContent.get).toHaveBeenCalledTimes(1);
        expect(defBContent.get).toHaveBeenCalledTimes(1);
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
  });

  describe(`with three defs`, () => {
    describe(`on construction`, () => {
      let defAContent: Input<string>;
      let defBContent: Input<string>;
      let defCContent: Input<string>;
      let typeScript: Output<string>;
      let constants: Output<{ readonly [key: string]: Json }>;
      let svg: Output<string>;
      let collectSvgDefsStep: CollectSvgDefsStep;

      beforeAll(() => {
        defAContent = { get: jasmine.createSpy(`defA.get`) };
        defBContent = { get: jasmine.createSpy(`defB.get`) };
        defCContent = { get: jasmine.createSpy(`defC.get`) };
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
          [
            {
              typeScriptName: `testTypeScriptNameB`,
              content: defAContent,
            },
            {
              typeScriptName: `testTypeScriptNameA`,
              content: defBContent,
            },
            {
              typeScriptName: `testTypeScriptNameC`,
              content: defCContent,
            },
          ],
          typeScript,
          constants,
          svg
        );
      });

      it(`exposes the expected name`, () => {
        expect(collectSvgDefsStep.name).toEqual(`Collect SVG defs`);
      });

      it(`exposes the expected array of defs`, () => {
        expect(collectSvgDefsStep.defs).toEqual([
          {
            typeScriptName: `testTypeScriptNameB`,
            content: defAContent,
          },
          {
            typeScriptName: `testTypeScriptNameA`,
            content: defBContent,
          },
          {
            typeScriptName: `testTypeScriptNameC`,
            content: defCContent,
          },
        ]);
      });

      it(`does not read from the defs' content`, () => {
        expect(defAContent.get).not.toHaveBeenCalled();
        expect(defBContent.get).not.toHaveBeenCalled();
        expect(defCContent.get).not.toHaveBeenCalled();
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
      describe(`all valid`, () => {
        let defAContent: Input<string>;
        let defBContent: Input<string>;
        let defCContent: Input<string>;
        let typeScript: Output<string>;
        let constants: Output<{ readonly [key: string]: Json }>;
        let svg: Output<string>;
        let collectSvgDefsStep: CollectSvgDefsStep;

        beforeAll(async () => {
          defAContent = {
            get: jasmine
              .createSpy(`defA.get`)
              .and.resolveTo(
                `<element-a attribute-a-a-key="attribute-a-a-value" easily-confused-with-id="" id="" also-easily-confused-with-id="" attribute-a-b-key="attribute-a-b-value" attribute-a-c-key="attribute-a-c-value">text-a</element-a>`
              ),
          };
          defBContent = {
            get: jasmine
              .createSpy(`defB.get`)
              .and.resolveTo(
                `<element-b attribute-b-a-key="attribute-b-a-value" attribute-b-b-key="attribute-b-b-value" easily-confused-with-id="" id="" also-easily-confused-with-id="" attribute-b-c-key="attribute-b-c-value" attribute-b-d-key="attribute-b-d-value">text-b</element-b>`
              ),
          };
          defCContent = {
            get: jasmine
              .createSpy(`defC.get`)
              .and.resolveTo(
                `<element-c attribute-c-a-key="attribute-c-a-value" easily-confused-with-id="" id="" also-easily-confused-with-id="" attribute-c-b-key="attribute-c-b-value">text-c</element-c>`
              ),
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
            [
              {
                typeScriptName: `testTypeScriptNameB`,
                content: defAContent,
              },
              {
                typeScriptName: `testTypeScriptNameA`,
                content: defBContent,
              },
              {
                typeScriptName: `testTypeScriptNameC`,
                content: defCContent,
              },
            ],
            typeScript,
            constants,
            svg
          );

          await collectSvgDefsStep.execute();
        });

        it(`continues to expose the expected name`, () => {
          expect(collectSvgDefsStep.name).toEqual(`Collect SVG defs`);
        });

        it(`continues to expose the expected array of defs`, () => {
          expect(collectSvgDefsStep.defs).toEqual([
            {
              typeScriptName: `testTypeScriptNameB`,
              content: defAContent,
            },
            {
              typeScriptName: `testTypeScriptNameA`,
              content: defBContent,
            },
            {
              typeScriptName: `testTypeScriptNameC`,
              content: defCContent,
            },
          ]);
        });

        it(`reads from the defs' content once`, () => {
          expect(defAContent.get).toHaveBeenCalledTimes(1);
          expect(defBContent.get).toHaveBeenCalledTimes(1);
          expect(defCContent.get).toHaveBeenCalledTimes(1);
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
        let defAContent: Input<string>;
        let defBContent: Input<string>;
        let defCContent: Input<string>;
        let typeScript: Output<string>;
        let constants: Output<{ readonly [key: string]: Json }>;
        let svg: Output<string>;
        let collectSvgDefsStep: CollectSvgDefsStep;
        let error: undefined | Error;

        beforeAll(async () => {
          defAContent = {
            get: jasmine
              .createSpy(`defA.get`)
              .and.resolveTo(
                `<element-a attribute-a-a-key="attribute-a-a-value" easily-confused-with-id="" id="" also-easily-confused-with-id="" attribute-a-b-key="attribute-a-b-value" attribute-a-c-key="attribute-a-c-value">text-a</element-a>`
              ),
          };
          defBContent = {
            get: jasmine
              .createSpy(`defB.get`)
              .and.resolveTo(
                `<element-b attribute-b-a-key="attribute-b-a-value" attribute-b-b-key="attribute-b-b-value" easily-confused-with-id="" also-easily-confused-with-id="" attribute-b-c-key="attribute-b-c-value" attribute-b-d-key="attribute-b-d-value">text-b</element-b>`
              ),
          };
          defCContent = {
            get: jasmine
              .createSpy(`defC.get`)
              .and.resolveTo(
                `<element-c attribute-c-a-key="attribute-c-a-value" easily-confused-with-id="" id="" also-easily-confused-with-id="" attribute-c-b-key="attribute-c-b-value">text-c</element-c>`
              ),
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
            [
              {
                typeScriptName: `testTypeScriptNameB`,
                content: defAContent,
              },
              {
                typeScriptName: `testTypeScriptNameA`,
                content: defBContent,
              },
              {
                typeScriptName: `testTypeScriptNameC`,
                content: defCContent,
              },
            ],
            typeScript,
            constants,
            svg
          );

          try {
            await collectSvgDefsStep.execute();
          } catch (e) {
            error = e;
          }
        });

        it(`continues to expose the expected name`, () => {
          expect(collectSvgDefsStep.name).toEqual(`Collect SVG defs`);
        });

        it(`continues to expose the expected array of defs`, () => {
          expect(collectSvgDefsStep.defs).toEqual([
            {
              typeScriptName: `testTypeScriptNameB`,
              content: defAContent,
            },
            {
              typeScriptName: `testTypeScriptNameA`,
              content: defBContent,
            },
            {
              typeScriptName: `testTypeScriptNameC`,
              content: defCContent,
            },
          ]);
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
        let defAContent: Input<string>;
        let defBContent: Input<string>;
        let defCContent: Input<string>;
        let typeScript: Output<string>;
        let constants: Output<{ readonly [key: string]: Json }>;
        let svg: Output<string>;
        let collectSvgDefsStep: CollectSvgDefsStep;
        let error: undefined | Error;

        beforeAll(async () => {
          defAContent = {
            get: jasmine
              .createSpy(`defA.get`)
              .and.resolveTo(
                `<element-a attribute-a-a-key="attribute-a-a-value" easily-confused-with-id="" id="" also-easily-confused-with-id="" attribute-a-b-key="attribute-a-b-value" attribute-a-c-key="attribute-a-c-value">text-a</element-a>`
              ),
          };
          defBContent = {
            get: jasmine
              .createSpy(`defB.get`)
              .and.resolveTo(
                `<element-b attribute-b-a-key="attribute-b-a-value" attribute-b-b-key="attribute-b-b-value" easily-confused-with-id="" id="" also-easily-confused-with-id="" id="" attribute-b-c-key="attribute-b-c-value" attribute-b-d-key="attribute-b-d-value">text-b</element-b>`
              ),
          };
          defCContent = {
            get: jasmine
              .createSpy(`defC.get`)
              .and.resolveTo(
                `<element-c attribute-c-a-key="attribute-c-a-value" easily-confused-with-id="" id="" also-easily-confused-with-id="" attribute-c-b-key="attribute-c-b-value">text-c</element-c>`
              ),
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
            [
              {
                typeScriptName: `testTypeScriptNameB`,
                content: defAContent,
              },
              {
                typeScriptName: `testTypeScriptNameA`,
                content: defBContent,
              },
              {
                typeScriptName: `testTypeScriptNameC`,
                content: defCContent,
              },
            ],
            typeScript,
            constants,
            svg
          );

          try {
            await collectSvgDefsStep.execute();
          } catch (e) {
            error = e;
          }
        });

        it(`continues to expose the expected name`, () => {
          expect(collectSvgDefsStep.name).toEqual(`Collect SVG defs`);
        });

        it(`continues to expose the expected array of defs`, () => {
          expect(collectSvgDefsStep.defs).toEqual([
            {
              typeScriptName: `testTypeScriptNameB`,
              content: defAContent,
            },
            {
              typeScriptName: `testTypeScriptNameA`,
              content: defBContent,
            },
            {
              typeScriptName: `testTypeScriptNameC`,
              content: defCContent,
            },
          ]);
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
        let defAContent: Input<string>;
        let defBContent: Input<string>;
        let defCContent: Input<string>;
        let typeScript: Output<string>;
        let constants: Output<{ readonly [key: string]: Json }>;
        let svg: Output<string>;
        let collectSvgDefsStep: CollectSvgDefsStep;
        let error: undefined | Error;

        beforeAll(async () => {
          defAContent = {
            get: jasmine
              .createSpy(`defA.get`)
              .and.resolveTo(
                `<element-a attribute-a-a-key="attribute-a-a-value" easily-confused-with-id="" id="" also-easily-confused-with-id="" attribute-a-b-key="attribute-a-b-value" attribute-a-c-key="attribute-a-c-value">text-a</element-a>`
              ),
          };
          defBContent = {
            get: jasmine
              .createSpy(`defB.get`)
              .and.resolveTo(
                `<element-b attribute-b-a-key="attribute-b-a-value" id="" attribute-b-b-key="attribute-b-b-value" id="" easily-confused-with-id="" also-easily-confused-with-id="" id="" attribute-b-c-key="attribute-b-c-value" attribute-b-d-key="attribute-b-d-value">text-b</element-b>`
              ),
          };
          defCContent = {
            get: jasmine
              .createSpy(`defC.get`)
              .and.resolveTo(
                `<element-c attribute-c-a-key="attribute-c-a-value" easily-confused-with-id="" id="" also-easily-confused-with-id="" attribute-c-b-key="attribute-c-b-value">text-c</element-c>`
              ),
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
            [
              {
                typeScriptName: `testTypeScriptNameB`,
                content: defAContent,
              },
              {
                typeScriptName: `testTypeScriptNameA`,
                content: defBContent,
              },
              {
                typeScriptName: `testTypeScriptNameC`,
                content: defCContent,
              },
            ],
            typeScript,
            constants,
            svg
          );

          try {
            await collectSvgDefsStep.execute();
          } catch (e) {
            error = e;
          }
        });

        it(`continues to expose the expected name`, () => {
          expect(collectSvgDefsStep.name).toEqual(`Collect SVG defs`);
        });

        it(`continues to expose the expected array of defs`, () => {
          expect(collectSvgDefsStep.defs).toEqual([
            {
              typeScriptName: `testTypeScriptNameB`,
              content: defAContent,
            },
            {
              typeScriptName: `testTypeScriptNameA`,
              content: defBContent,
            },
            {
              typeScriptName: `testTypeScriptNameC`,
              content: defCContent,
            },
          ]);
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

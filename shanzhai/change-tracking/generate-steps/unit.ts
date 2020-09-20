import { Step } from "@shanzhai/interfaces";
import { SerialStep } from "@shanzhai/serial-step";
import { ParallelStep } from "@shanzhai/parallel-step";
import { Diff } from "../diff";
import { generateSteps } from ".";

describe(`generateSteps`, () => {
  type TestItem =
    | `Test Added Item A`
    | `Test Added Item B`
    | `Test Added Item C`
    | `Test Added Item D`
    | `Test Changed Item A`
    | `Test Changed Item B`
    | `Test Unchanged Item A`
    | `Test Unchanged Item B`
    | `Test Unchanged Item C`
    | `Test Deleted Item A`
    | `Test Deleted Item B`
    | `Test Deleted Item C`
    | `Test Deleted Item D`
    | `Test Deleted Item E`;

  describe(`when not regenerating all`, () => {
    describe(`when all types of changes are present`, () => {
      let testAddedAUpA: Step;
      let testAddedAUpB: Step;
      let testAddedBUpA: Step;
      let testAddedBUpB: Step;
      let testAddedBUpC: Step;
      let testAddedBUpD: Step;
      let testAddedCUpA: Step;
      let testAddedCUpB: Step;
      let testAddedCUpC: Step;
      let testAddedCUpD: Step;
      let testAddedDUpA: Step;
      let testAddedDUpB: Step;
      let testAddedDUpC: Step;
      let testChangedADownA: Step;
      let testChangedADownB: Step;
      let testChangedAUpA: Step;
      let testChangedAUpB: Step;
      let testChangedAUpC: Step;
      let testChangedBDownA: Step;
      let testChangedBDownB: Step;
      let testChangedBDownC: Step;
      let testChangedBDownD: Step;
      let testChangedBUpA: Step;
      let testChangedBUpB: Step;
      let testDeletedADownA: Step;
      let testDeletedADownB: Step;
      let testDeletedBDownA: Step;
      let testDeletedBDownB: Step;
      let testDeletedBDownC: Step;
      let testDeletedCDownA: Step;
      let testDeletedCDownB: Step;
      let testDeletedDDownA: Step;
      let testDeletedDDownB: Step;
      let testDeletedDDownC: Step;
      let testDeletedEDownA: Step;
      let testDeletedEDownB: Step;
      let testDeletedEDownC: Step;
      let extractName: jasmine.Spy;
      let down: jasmine.Spy;
      let up: jasmine.Spy;
      let result: ReadonlyArray<ParallelStep>;

      beforeAll(() => {
        testAddedAUpA = {
          name: `Test Added A Up A`,
          executePerActionStep: jasmine.createSpy(
            `testAddedAUpA.executePerActionStep`
          ),
        };
        testAddedAUpB = {
          name: `Test Added A Up B Step`,
          executePerActionStep: jasmine.createSpy(
            `testAddedAUpB.executePerActionStep`
          ),
        };
        testAddedBUpA = {
          name: `Test Added B Up A Step`,
          executePerActionStep: jasmine.createSpy(
            `testAddedBUpA.executePerActionStep`
          ),
        };
        testAddedBUpB = {
          name: `Test Added B Up B Step`,
          executePerActionStep: jasmine.createSpy(
            `testAddedBUpB.executePerActionStep`
          ),
        };
        testAddedBUpC = {
          name: `Test Added B Up C Step`,
          executePerActionStep: jasmine.createSpy(
            `testAddedBUpC.executePerActionStep`
          ),
        };
        testAddedBUpD = {
          name: `Test Added B Up D Step`,
          executePerActionStep: jasmine.createSpy(
            `testAddedBUpD.executePerActionStep`
          ),
        };
        testAddedCUpA = {
          name: `Test Added C Up A Step`,
          executePerActionStep: jasmine.createSpy(
            `testAddedCUpA.executePerActionStep`
          ),
        };
        testAddedCUpB = {
          name: `Test Added C Up B Step`,
          executePerActionStep: jasmine.createSpy(
            `testAddedCUpB.executePerActionStep`
          ),
        };
        testAddedCUpC = {
          name: `Test Added C Up C Step`,
          executePerActionStep: jasmine.createSpy(
            `testAddedCUpC.executePerActionStep`
          ),
        };
        testAddedCUpD = {
          name: `Test Added C Up D Step`,
          executePerActionStep: jasmine.createSpy(
            `testAddedCUpD.executePerActionStep`
          ),
        };
        testAddedDUpA = {
          name: `Test Added D Up A Step`,
          executePerActionStep: jasmine.createSpy(
            `testAddedDUpA.executePerActionStep`
          ),
        };
        testAddedDUpB = {
          name: `Test Added D Up B Step`,
          executePerActionStep: jasmine.createSpy(
            `testAddedDUpB.executePerActionStep`
          ),
        };
        testAddedDUpC = {
          name: `Test Added D Up C Step`,
          executePerActionStep: jasmine.createSpy(
            `testAddedDUpC.executePerActionStep`
          ),
        };
        testChangedADownA = {
          name: `Test Changed A Down A Step`,
          executePerActionStep: jasmine.createSpy(
            `testChangedADownA.executePerActionStep`
          ),
        };
        testChangedADownB = {
          name: `Test Changed A Down B Step`,
          executePerActionStep: jasmine.createSpy(
            `testChangedADownB.executePerActionStep`
          ),
        };
        testChangedAUpA = {
          name: `Test Changed A Up A Step`,
          executePerActionStep: jasmine.createSpy(
            `testChangedAUpA.executePerActionStep`
          ),
        };
        testChangedAUpB = {
          name: `Test Changed A Up B Step`,
          executePerActionStep: jasmine.createSpy(
            `testChangedAUpB.executePerActionStep`
          ),
        };
        testChangedAUpC = {
          name: `Test Changed A Up C Step`,
          executePerActionStep: jasmine.createSpy(
            `testChangedAUpC.executePerActionStep`
          ),
        };
        testChangedBDownA = {
          name: `Test Changed B Down A Step`,
          executePerActionStep: jasmine.createSpy(
            `testChangedBDownA.executePerActionStep`
          ),
        };
        testChangedBDownB = {
          name: `Test Changed B Down B Step`,
          executePerActionStep: jasmine.createSpy(
            `testChangedBDownB.executePerActionStep`
          ),
        };
        testChangedBDownC = {
          name: `Test Changed B Down C Step`,
          executePerActionStep: jasmine.createSpy(
            `testChangedBDownC.executePerActionStep`
          ),
        };
        testChangedBDownD = {
          name: `Test Changed B Down D Step`,
          executePerActionStep: jasmine.createSpy(
            `testChangedBDownD.executePerActionStep`
          ),
        };
        testChangedBUpA = {
          name: `Test Changed B Up A Step`,
          executePerActionStep: jasmine.createSpy(
            `testChangedBUpA.executePerActionStep`
          ),
        };
        testChangedBUpB = {
          name: `Test Changed B Up B Step`,
          executePerActionStep: jasmine.createSpy(
            `testChangedBUpB.executePerActionStep`
          ),
        };
        testDeletedADownA = {
          name: `Test Deleted A Down A Step`,
          executePerActionStep: jasmine.createSpy(
            `testDeletedADownA.executePerActionStep`
          ),
        };
        testDeletedADownB = {
          name: `Test Deleted A Down B Step`,
          executePerActionStep: jasmine.createSpy(
            `testDeletedADownB.executePerActionStep`
          ),
        };
        testDeletedBDownA = {
          name: `Test Deleted B Down A Step`,
          executePerActionStep: jasmine.createSpy(
            `testDeletedBDownA.executePerActionStep`
          ),
        };
        testDeletedBDownB = {
          name: `Test Deleted B Down B Step`,
          executePerActionStep: jasmine.createSpy(
            `testDeletedBDownB.executePerActionStep`
          ),
        };
        testDeletedBDownC = {
          name: `Test Deleted B Down C Step`,
          executePerActionStep: jasmine.createSpy(
            `testDeletedBDownC.executePerActionStep`
          ),
        };
        testDeletedCDownA = {
          name: `Test Deleted C Down A Step`,
          executePerActionStep: jasmine.createSpy(
            `testDeletedCDownA.executePerActionStep`
          ),
        };
        testDeletedCDownB = {
          name: `Test Deleted C Down B Step`,
          executePerActionStep: jasmine.createSpy(
            `testDeletedCDownB.executePerActionStep`
          ),
        };
        testDeletedDDownA = {
          name: `Test Deleted D Down A Step`,
          executePerActionStep: jasmine.createSpy(
            `testDeletedDDownA.executePerActionStep`
          ),
        };
        testDeletedDDownB = {
          name: `Test Deleted D Down B Step`,
          executePerActionStep: jasmine.createSpy(
            `testDeletedDDownB.executePerActionStep`
          ),
        };
        testDeletedDDownC = {
          name: `Test Deleted D Down C Step`,
          executePerActionStep: jasmine.createSpy(
            `testDeletedDDownC.executePerActionStep`
          ),
        };
        testDeletedEDownA = {
          name: `Test Deleted E Down A Step`,
          executePerActionStep: jasmine.createSpy(
            `testDeletedEDownA.executePerActionStep`
          ),
        };
        testDeletedEDownB = {
          name: `Test Deleted E Down B Step`,
          executePerActionStep: jasmine.createSpy(
            `testDeletedDDownB.executePerActionStep`
          ),
        };
        testDeletedEDownC = {
          name: `Test Deleted E Down C Step`,
          executePerActionStep: jasmine.createSpy(
            `testDeletedEDownC.executePerActionStep`
          ),
        };

        extractName = jasmine.createSpy(`extractName`).and.callFake((item) => {
          switch (item) {
            case `Test Added Item A`:
              return `Test Added Item A Name`;

            case `Test Added Item B`:
              return `Test Added Item B Name`;

            case `Test Added Item C`:
              return `Test Added Item C Name`;

            case `Test Added Item D`:
              return `Test Added Item D Name`;

            case `Test Changed Item A`:
              return `Test Changed Item A Name`;

            case `Test Changed Item B`:
              return `Test Changed Item B Name`;

            case `Test Deleted Item A`:
              return `Test Deleted Item A Name`;

            case `Test Deleted Item B`:
              return `Test Deleted Item B Name`;

            case `Test Deleted Item C`:
              return `Test Deleted Item C Name`;

            case `Test Deleted Item D`:
              return `Test Deleted Item D Name`;

            case `Test Deleted Item E`:
              return `Test Deleted Item E Name`;

            default:
              throw new Error(`Unexpected item ${item}.`);
          }
        });

        down = jasmine.createSpy(`down`).and.callFake((item) => {
          switch (item) {
            case `Test Changed Item A`:
              return [testChangedADownA, testChangedADownB];

            case `Test Changed Item B`:
              return [
                testChangedBDownA,
                testChangedBDownB,
                testChangedBDownC,
                testChangedBDownD,
              ];

            case `Test Deleted Item A`:
              return [testDeletedADownA, testDeletedADownB];

            case `Test Deleted Item B`:
              return [testDeletedBDownA, testDeletedBDownB, testDeletedBDownC];

            case `Test Deleted Item C`:
              return [testDeletedCDownA, testDeletedCDownB];

            case `Test Deleted Item D`:
              return [testDeletedDDownA, testDeletedDDownB, testDeletedDDownC];

            case `Test Deleted Item E`:
              return [testDeletedEDownA, testDeletedEDownB, testDeletedEDownC];

            default:
              throw new Error(`Unexpected item ${item}.`);
          }
        });

        up = jasmine.createSpy(`up`).and.callFake((item) => {
          switch (item) {
            case `Test Added Item A`:
              return [testAddedAUpA, testAddedAUpB];

            case `Test Added Item B`:
              return [
                testAddedBUpA,
                testAddedBUpB,
                testAddedBUpC,
                testAddedBUpD,
              ];

            case `Test Added Item C`:
              return [
                testAddedCUpA,
                testAddedCUpB,
                testAddedCUpC,
                testAddedCUpD,
              ];

            case `Test Added Item D`:
              return [testAddedDUpA, testAddedDUpB, testAddedDUpC];

            case `Test Changed Item A`:
              return [testChangedAUpA, testChangedAUpB, testChangedAUpC];

            case `Test Changed Item B`:
              return [testChangedBUpA, testChangedBUpB];

            default:
              throw new Error(`Unexpected item ${item}.`);
          }
        });

        const diff: Diff<TestItem> = {
          added: [
            `Test Added Item A`,
            `Test Added Item B`,
            `Test Added Item C`,
            `Test Added Item D`,
          ],
          changed: [`Test Changed Item A`, `Test Changed Item B`],
          unchanged: [
            `Test Unchanged Item A`,
            `Test Unchanged Item B`,
            `Test Unchanged Item C`,
          ],
          deleted: [
            `Test Deleted Item A`,
            `Test Deleted Item B`,
            `Test Deleted Item C`,
            `Test Deleted Item D`,
            `Test Deleted Item E`,
          ],
        };

        result = generateSteps(`Test Name`, false, diff, extractName, down, up);
      });

      it(`extracts the names of the added items`, () => {
        expect(extractName).toHaveBeenCalledWith(`Test Added Item A`);
        expect(extractName).toHaveBeenCalledWith(`Test Added Item B`);
        expect(extractName).toHaveBeenCalledWith(`Test Added Item C`);
        expect(extractName).toHaveBeenCalledWith(`Test Added Item D`);
      });

      it(`extracts the names of the changed items`, () => {
        expect(extractName).toHaveBeenCalledWith(`Test Changed Item A`);
        expect(extractName).toHaveBeenCalledWith(`Test Changed Item B`);
      });

      it(`extracts the names of the deleted items`, () => {
        expect(extractName).toHaveBeenCalledWith(`Test Deleted Item A`);
        expect(extractName).toHaveBeenCalledWith(`Test Deleted Item B`);
        expect(extractName).toHaveBeenCalledWith(`Test Deleted Item C`);
        expect(extractName).toHaveBeenCalledWith(`Test Deleted Item D`);
        expect(extractName).toHaveBeenCalledWith(`Test Deleted Item E`);
      });

      it(`does not extract the names of any further items`, () => {
        expect(extractName).toHaveBeenCalledTimes(11);
      });

      it(`generates down steps for changed items`, () => {
        expect(down).toHaveBeenCalledWith(`Test Changed Item A`);
        expect(down).toHaveBeenCalledWith(`Test Changed Item B`);
      });

      it(`generates down steps for deleted items`, () => {
        expect(down).toHaveBeenCalledWith(`Test Deleted Item A`);
        expect(down).toHaveBeenCalledWith(`Test Deleted Item B`);
        expect(down).toHaveBeenCalledWith(`Test Deleted Item C`);
        expect(down).toHaveBeenCalledWith(`Test Deleted Item D`);
        expect(down).toHaveBeenCalledWith(`Test Deleted Item E`);
      });

      it(`does not generate down steps for any further items`, () => {
        expect(down).toHaveBeenCalledTimes(7);
      });

      it(`generates up steps for added items`, () => {
        expect(up).toHaveBeenCalledWith(`Test Added Item A`);
        expect(up).toHaveBeenCalledWith(`Test Added Item B`);
        expect(up).toHaveBeenCalledWith(`Test Added Item C`);
        expect(up).toHaveBeenCalledWith(`Test Added Item D`);
      });

      it(`generates up steps for changed items`, () => {
        expect(up).toHaveBeenCalledWith(`Test Changed Item A`);
        expect(up).toHaveBeenCalledWith(`Test Changed Item B`);
      });

      it(`does not generate up steps for any further items`, () => {
        expect(up).toHaveBeenCalledTimes(6);
      });

      it(`returns the expected tree of generated steps`, () => {
        expect(result).toEqual([
          new ParallelStep(`Test Name`, [
            new SerialStep(`Test Added Item A Name`, [
              testAddedAUpA,
              testAddedAUpB,
            ]),
            new SerialStep(`Test Added Item B Name`, [
              testAddedBUpA,
              testAddedBUpB,
              testAddedBUpC,
              testAddedBUpD,
            ]),
            new SerialStep(`Test Added Item C Name`, [
              testAddedCUpA,
              testAddedCUpB,
              testAddedCUpC,
              testAddedCUpD,
            ]),
            new SerialStep(`Test Added Item D Name`, [
              testAddedDUpA,
              testAddedDUpB,
              testAddedDUpC,
            ]),
            new SerialStep(`Test Changed Item A Name`, [
              testChangedADownA,
              testChangedADownB,
              testChangedAUpA,
              testChangedAUpB,
              testChangedAUpC,
            ]),
            new SerialStep(`Test Changed Item B Name`, [
              testChangedBDownA,
              testChangedBDownB,
              testChangedBDownC,
              testChangedBDownD,
              testChangedBUpA,
              testChangedBUpB,
            ]),
            new SerialStep(`Test Deleted Item A Name`, [
              testDeletedADownA,
              testDeletedADownB,
            ]),
            new SerialStep(`Test Deleted Item B Name`, [
              testDeletedBDownA,
              testDeletedBDownB,
              testDeletedBDownC,
            ]),
            new SerialStep(`Test Deleted Item C Name`, [
              testDeletedCDownA,
              testDeletedCDownB,
            ]),
            new SerialStep(`Test Deleted Item D Name`, [
              testDeletedDDownA,
              testDeletedDDownB,
              testDeletedDDownC,
            ]),
            new SerialStep(`Test Deleted Item E Name`, [
              testDeletedEDownA,
              testDeletedEDownB,
              testDeletedEDownC,
            ]),
          ]),
        ]);
      });

      it(`does not execute any of the generated steps`, () => {
        expect(testAddedAUpA.executePerActionStep).not.toHaveBeenCalled();
        expect(testAddedAUpB.executePerActionStep).not.toHaveBeenCalled();
        expect(testAddedBUpA.executePerActionStep).not.toHaveBeenCalled();
        expect(testAddedBUpB.executePerActionStep).not.toHaveBeenCalled();
        expect(testAddedBUpC.executePerActionStep).not.toHaveBeenCalled();
        expect(testAddedBUpD.executePerActionStep).not.toHaveBeenCalled();
        expect(testAddedCUpA.executePerActionStep).not.toHaveBeenCalled();
        expect(testAddedCUpB.executePerActionStep).not.toHaveBeenCalled();
        expect(testAddedCUpC.executePerActionStep).not.toHaveBeenCalled();
        expect(testAddedCUpD.executePerActionStep).not.toHaveBeenCalled();
        expect(testAddedDUpA.executePerActionStep).not.toHaveBeenCalled();
        expect(testAddedDUpB.executePerActionStep).not.toHaveBeenCalled();
        expect(testAddedDUpC.executePerActionStep).not.toHaveBeenCalled();
        expect(testChangedADownA.executePerActionStep).not.toHaveBeenCalled();
        expect(testChangedADownB.executePerActionStep).not.toHaveBeenCalled();
        expect(testChangedAUpA.executePerActionStep).not.toHaveBeenCalled();
        expect(testChangedAUpB.executePerActionStep).not.toHaveBeenCalled();
        expect(testChangedAUpC.executePerActionStep).not.toHaveBeenCalled();
        expect(testChangedBDownA.executePerActionStep).not.toHaveBeenCalled();
        expect(testChangedBDownB.executePerActionStep).not.toHaveBeenCalled();
        expect(testChangedBDownC.executePerActionStep).not.toHaveBeenCalled();
        expect(testChangedBDownD.executePerActionStep).not.toHaveBeenCalled();
        expect(testChangedBUpA.executePerActionStep).not.toHaveBeenCalled();
        expect(testChangedBUpB.executePerActionStep).not.toHaveBeenCalled();
        expect(testDeletedADownA.executePerActionStep).not.toHaveBeenCalled();
        expect(testDeletedADownB.executePerActionStep).not.toHaveBeenCalled();
        expect(testDeletedBDownA.executePerActionStep).not.toHaveBeenCalled();
        expect(testDeletedBDownB.executePerActionStep).not.toHaveBeenCalled();
        expect(testDeletedBDownC.executePerActionStep).not.toHaveBeenCalled();
        expect(testDeletedCDownA.executePerActionStep).not.toHaveBeenCalled();
        expect(testDeletedCDownB.executePerActionStep).not.toHaveBeenCalled();
        expect(testDeletedDDownA.executePerActionStep).not.toHaveBeenCalled();
        expect(testDeletedDDownB.executePerActionStep).not.toHaveBeenCalled();
        expect(testDeletedDDownC.executePerActionStep).not.toHaveBeenCalled();
        expect(testDeletedEDownA.executePerActionStep).not.toHaveBeenCalled();
        expect(testDeletedEDownB.executePerActionStep).not.toHaveBeenCalled();
        expect(testDeletedEDownC.executePerActionStep).not.toHaveBeenCalled();
      });
    });

    describe(`when only unchanged files and additions are present`, () => {
      let testAddedAUpA: Step;
      let testAddedAUpB: Step;
      let testAddedBUpA: Step;
      let testAddedBUpB: Step;
      let testAddedBUpC: Step;
      let testAddedBUpD: Step;
      let testAddedCUpA: Step;
      let testAddedCUpB: Step;
      let testAddedCUpC: Step;
      let testAddedCUpD: Step;
      let testAddedDUpA: Step;
      let testAddedDUpB: Step;
      let testAddedDUpC: Step;
      let extractName: jasmine.Spy;
      let down: jasmine.Spy;
      let up: jasmine.Spy;
      let result: ReadonlyArray<ParallelStep>;

      beforeAll(() => {
        testAddedAUpA = {
          name: `Test Added A Up A`,
          executePerActionStep: jasmine.createSpy(
            `testAddedAUpA.executePerActionStep`
          ),
        };
        testAddedAUpB = {
          name: `Test Added A Up B Step`,
          executePerActionStep: jasmine.createSpy(
            `testAddedAUpB.executePerActionStep`
          ),
        };
        testAddedBUpA = {
          name: `Test Added B Up A Step`,
          executePerActionStep: jasmine.createSpy(
            `testAddedBUpA.executePerActionStep`
          ),
        };
        testAddedBUpB = {
          name: `Test Added B Up B Step`,
          executePerActionStep: jasmine.createSpy(
            `testAddedBUpB.executePerActionStep`
          ),
        };
        testAddedBUpC = {
          name: `Test Added B Up C Step`,
          executePerActionStep: jasmine.createSpy(
            `testAddedBUpC.executePerActionStep`
          ),
        };
        testAddedBUpD = {
          name: `Test Added B Up D Step`,
          executePerActionStep: jasmine.createSpy(
            `testAddedBUpD.executePerActionStep`
          ),
        };
        testAddedCUpA = {
          name: `Test Added C Up A Step`,
          executePerActionStep: jasmine.createSpy(
            `testAddedCUpA.executePerActionStep`
          ),
        };
        testAddedCUpB = {
          name: `Test Added C Up B Step`,
          executePerActionStep: jasmine.createSpy(
            `testAddedCUpB.executePerActionStep`
          ),
        };
        testAddedCUpC = {
          name: `Test Added C Up C Step`,
          executePerActionStep: jasmine.createSpy(
            `testAddedCUpC.executePerActionStep`
          ),
        };
        testAddedCUpD = {
          name: `Test Added C Up D Step`,
          executePerActionStep: jasmine.createSpy(
            `testAddedCUpD.executePerActionStep`
          ),
        };
        testAddedDUpA = {
          name: `Test Added D Up A Step`,
          executePerActionStep: jasmine.createSpy(
            `testAddedDUpA.executePerActionStep`
          ),
        };
        testAddedDUpB = {
          name: `Test Added D Up B Step`,
          executePerActionStep: jasmine.createSpy(
            `testAddedDUpB.executePerActionStep`
          ),
        };
        testAddedDUpC = {
          name: `Test Added D Up C Step`,
          executePerActionStep: jasmine.createSpy(
            `testAddedDUpC.executePerActionStep`
          ),
        };

        extractName = jasmine.createSpy(`extractName`).and.callFake((item) => {
          switch (item) {
            case `Test Added Item A`:
              return `Test Added Item A Name`;

            case `Test Added Item B`:
              return `Test Added Item B Name`;

            case `Test Added Item C`:
              return `Test Added Item C Name`;

            case `Test Added Item D`:
              return `Test Added Item D Name`;

            default:
              throw new Error(`Unexpected item ${item}.`);
          }
        });

        down = jasmine.createSpy(`down`);

        up = jasmine.createSpy(`up`).and.callFake((item) => {
          switch (item) {
            case `Test Added Item A`:
              return [testAddedAUpA, testAddedAUpB];

            case `Test Added Item B`:
              return [
                testAddedBUpA,
                testAddedBUpB,
                testAddedBUpC,
                testAddedBUpD,
              ];

            case `Test Added Item C`:
              return [
                testAddedCUpA,
                testAddedCUpB,
                testAddedCUpC,
                testAddedCUpD,
              ];

            case `Test Added Item D`:
              return [testAddedDUpA, testAddedDUpB, testAddedDUpC];

            default:
              throw new Error(`Unexpected item ${item}.`);
          }
        });

        const diff: Diff<TestItem> = {
          added: [
            `Test Added Item A`,
            `Test Added Item B`,
            `Test Added Item C`,
            `Test Added Item D`,
          ],
          changed: [],
          unchanged: [
            `Test Unchanged Item A`,
            `Test Unchanged Item B`,
            `Test Unchanged Item C`,
          ],
          deleted: [],
        };

        result = generateSteps(`Test Name`, false, diff, extractName, down, up);
      });

      it(`extracts the names of the added items`, () => {
        expect(extractName).toHaveBeenCalledWith(`Test Added Item A`);
        expect(extractName).toHaveBeenCalledWith(`Test Added Item B`);
        expect(extractName).toHaveBeenCalledWith(`Test Added Item C`);
        expect(extractName).toHaveBeenCalledWith(`Test Added Item D`);
      });

      it(`does not extract the names of any further items`, () => {
        expect(extractName).toHaveBeenCalledTimes(4);
      });

      it(`does not generate down steps`, () => {
        expect(down).not.toHaveBeenCalled();
      });

      it(`generates up steps for added items`, () => {
        expect(up).toHaveBeenCalledWith(`Test Added Item A`);
        expect(up).toHaveBeenCalledWith(`Test Added Item B`);
        expect(up).toHaveBeenCalledWith(`Test Added Item C`);
        expect(up).toHaveBeenCalledWith(`Test Added Item D`);
      });

      it(`does not generate up steps for any further items`, () => {
        expect(up).toHaveBeenCalledTimes(4);
      });

      it(`returns the expected tree of generated steps`, () => {
        expect(result).toEqual([
          new ParallelStep(`Test Name`, [
            new SerialStep(`Test Added Item A Name`, [
              testAddedAUpA,
              testAddedAUpB,
            ]),
            new SerialStep(`Test Added Item B Name`, [
              testAddedBUpA,
              testAddedBUpB,
              testAddedBUpC,
              testAddedBUpD,
            ]),
            new SerialStep(`Test Added Item C Name`, [
              testAddedCUpA,
              testAddedCUpB,
              testAddedCUpC,
              testAddedCUpD,
            ]),
            new SerialStep(`Test Added Item D Name`, [
              testAddedDUpA,
              testAddedDUpB,
              testAddedDUpC,
            ]),
          ]),
        ]);
      });

      it(`does not execute any of the generated steps`, () => {
        expect(testAddedAUpA.executePerActionStep).not.toHaveBeenCalled();
        expect(testAddedAUpB.executePerActionStep).not.toHaveBeenCalled();
        expect(testAddedBUpA.executePerActionStep).not.toHaveBeenCalled();
        expect(testAddedBUpB.executePerActionStep).not.toHaveBeenCalled();
        expect(testAddedBUpC.executePerActionStep).not.toHaveBeenCalled();
        expect(testAddedBUpD.executePerActionStep).not.toHaveBeenCalled();
        expect(testAddedCUpA.executePerActionStep).not.toHaveBeenCalled();
        expect(testAddedCUpB.executePerActionStep).not.toHaveBeenCalled();
        expect(testAddedCUpC.executePerActionStep).not.toHaveBeenCalled();
        expect(testAddedCUpD.executePerActionStep).not.toHaveBeenCalled();
        expect(testAddedDUpA.executePerActionStep).not.toHaveBeenCalled();
        expect(testAddedDUpB.executePerActionStep).not.toHaveBeenCalled();
        expect(testAddedDUpC.executePerActionStep).not.toHaveBeenCalled();
      });
    });

    describe(`when only unchanged files and changes are present`, () => {
      let testChangedADownA: Step;
      let testChangedADownB: Step;
      let testChangedAUpA: Step;
      let testChangedAUpB: Step;
      let testChangedAUpC: Step;
      let testChangedBDownA: Step;
      let testChangedBDownB: Step;
      let testChangedBDownC: Step;
      let testChangedBDownD: Step;
      let testChangedBUpA: Step;
      let testChangedBUpB: Step;
      let extractName: jasmine.Spy;
      let down: jasmine.Spy;
      let up: jasmine.Spy;
      let result: ReadonlyArray<ParallelStep>;

      beforeAll(() => {
        testChangedADownA = {
          name: `Test Changed A Down A Step`,
          executePerActionStep: jasmine.createSpy(
            `testChangedADownA.executePerActionStep`
          ),
        };
        testChangedADownB = {
          name: `Test Changed A Down B Step`,
          executePerActionStep: jasmine.createSpy(
            `testChangedADownB.executePerActionStep`
          ),
        };
        testChangedAUpA = {
          name: `Test Changed A Up A Step`,
          executePerActionStep: jasmine.createSpy(
            `testChangedAUpA.executePerActionStep`
          ),
        };
        testChangedAUpB = {
          name: `Test Changed A Up B Step`,
          executePerActionStep: jasmine.createSpy(
            `testChangedAUpB.executePerActionStep`
          ),
        };
        testChangedAUpC = {
          name: `Test Changed A Up C Step`,
          executePerActionStep: jasmine.createSpy(
            `testChangedAUpC.executePerActionStep`
          ),
        };
        testChangedBDownA = {
          name: `Test Changed B Down A Step`,
          executePerActionStep: jasmine.createSpy(
            `testChangedBDownA.executePerActionStep`
          ),
        };
        testChangedBDownB = {
          name: `Test Changed B Down B Step`,
          executePerActionStep: jasmine.createSpy(
            `testChangedBDownB.executePerActionStep`
          ),
        };
        testChangedBDownC = {
          name: `Test Changed B Down C Step`,
          executePerActionStep: jasmine.createSpy(
            `testChangedBDownC.executePerActionStep`
          ),
        };
        testChangedBDownD = {
          name: `Test Changed B Down D Step`,
          executePerActionStep: jasmine.createSpy(
            `testChangedBDownD.executePerActionStep`
          ),
        };
        testChangedBUpA = {
          name: `Test Changed B Up A Step`,
          executePerActionStep: jasmine.createSpy(
            `testChangedBUpA.executePerActionStep`
          ),
        };
        testChangedBUpB = {
          name: `Test Changed B Up B Step`,
          executePerActionStep: jasmine.createSpy(
            `testChangedBUpB.executePerActionStep`
          ),
        };

        extractName = jasmine.createSpy(`extractName`).and.callFake((item) => {
          switch (item) {
            case `Test Added Item A`:
              return `Test Added Item A Name`;

            case `Test Added Item B`:
              return `Test Added Item B Name`;

            case `Test Added Item C`:
              return `Test Added Item C Name`;

            case `Test Added Item D`:
              return `Test Added Item D Name`;

            case `Test Changed Item A`:
              return `Test Changed Item A Name`;

            case `Test Changed Item B`:
              return `Test Changed Item B Name`;

            case `Test Deleted Item A`:
              return `Test Deleted Item A Name`;

            case `Test Deleted Item B`:
              return `Test Deleted Item B Name`;

            case `Test Deleted Item C`:
              return `Test Deleted Item C Name`;

            case `Test Deleted Item D`:
              return `Test Deleted Item D Name`;

            case `Test Deleted Item E`:
              return `Test Deleted Item E Name`;

            default:
              throw new Error(`Unexpected item ${item}.`);
          }
        });

        down = jasmine.createSpy(`down`).and.callFake((item) => {
          switch (item) {
            case `Test Changed Item A`:
              return [testChangedADownA, testChangedADownB];

            case `Test Changed Item B`:
              return [
                testChangedBDownA,
                testChangedBDownB,
                testChangedBDownC,
                testChangedBDownD,
              ];

            default:
              throw new Error(`Unexpected item ${item}.`);
          }
        });

        up = jasmine.createSpy(`up`).and.callFake((item) => {
          switch (item) {
            case `Test Changed Item A`:
              return [testChangedAUpA, testChangedAUpB, testChangedAUpC];

            case `Test Changed Item B`:
              return [testChangedBUpA, testChangedBUpB];

            default:
              throw new Error(`Unexpected item ${item}.`);
          }
        });

        const diff: Diff<TestItem> = {
          added: [],
          changed: [`Test Changed Item A`, `Test Changed Item B`],
          unchanged: [
            `Test Unchanged Item A`,
            `Test Unchanged Item B`,
            `Test Unchanged Item C`,
          ],
          deleted: [],
        };

        result = generateSteps(`Test Name`, false, diff, extractName, down, up);
      });

      it(`extracts the names of the changed items`, () => {
        expect(extractName).toHaveBeenCalledWith(`Test Changed Item A`);
        expect(extractName).toHaveBeenCalledWith(`Test Changed Item B`);
      });

      it(`does not extract the names of any further items`, () => {
        expect(extractName).toHaveBeenCalledTimes(2);
      });

      it(`generates down steps for changed items`, () => {
        expect(down).toHaveBeenCalledWith(`Test Changed Item A`);
        expect(down).toHaveBeenCalledWith(`Test Changed Item B`);
      });

      it(`does not generate down steps for any further items`, () => {
        expect(down).toHaveBeenCalledTimes(2);
      });

      it(`generates up steps for changed items`, () => {
        expect(up).toHaveBeenCalledWith(`Test Changed Item A`);
        expect(up).toHaveBeenCalledWith(`Test Changed Item B`);
      });

      it(`does not generate up steps for any further items`, () => {
        expect(up).toHaveBeenCalledTimes(2);
      });

      it(`returns the expected tree of generated steps`, () => {
        expect(result).toEqual([
          new ParallelStep(`Test Name`, [
            new SerialStep(`Test Changed Item A Name`, [
              testChangedADownA,
              testChangedADownB,
              testChangedAUpA,
              testChangedAUpB,
              testChangedAUpC,
            ]),
            new SerialStep(`Test Changed Item B Name`, [
              testChangedBDownA,
              testChangedBDownB,
              testChangedBDownC,
              testChangedBDownD,
              testChangedBUpA,
              testChangedBUpB,
            ]),
          ]),
        ]);
      });

      it(`does not execute any of the generated steps`, () => {
        expect(testChangedADownA.executePerActionStep).not.toHaveBeenCalled();
        expect(testChangedADownB.executePerActionStep).not.toHaveBeenCalled();
        expect(testChangedAUpA.executePerActionStep).not.toHaveBeenCalled();
        expect(testChangedAUpB.executePerActionStep).not.toHaveBeenCalled();
        expect(testChangedAUpC.executePerActionStep).not.toHaveBeenCalled();
        expect(testChangedBDownA.executePerActionStep).not.toHaveBeenCalled();
        expect(testChangedBDownB.executePerActionStep).not.toHaveBeenCalled();
        expect(testChangedBDownC.executePerActionStep).not.toHaveBeenCalled();
        expect(testChangedBDownD.executePerActionStep).not.toHaveBeenCalled();
        expect(testChangedBUpA.executePerActionStep).not.toHaveBeenCalled();
        expect(testChangedBUpB.executePerActionStep).not.toHaveBeenCalled();
      });
    });

    describe(`when only unchanged files and deletions are present`, () => {
      let testDeletedADownA: Step;
      let testDeletedADownB: Step;
      let testDeletedBDownA: Step;
      let testDeletedBDownB: Step;
      let testDeletedBDownC: Step;
      let testDeletedCDownA: Step;
      let testDeletedCDownB: Step;
      let testDeletedDDownA: Step;
      let testDeletedDDownB: Step;
      let testDeletedDDownC: Step;
      let testDeletedEDownA: Step;
      let testDeletedEDownB: Step;
      let testDeletedEDownC: Step;
      let extractName: jasmine.Spy;
      let down: jasmine.Spy;
      let up: jasmine.Spy;
      let result: ReadonlyArray<ParallelStep>;

      beforeAll(() => {
        testDeletedADownA = {
          name: `Test Deleted A Down A Step`,
          executePerActionStep: jasmine.createSpy(
            `testDeletedADownA.executePerActionStep`
          ),
        };
        testDeletedADownB = {
          name: `Test Deleted A Down B Step`,
          executePerActionStep: jasmine.createSpy(
            `testDeletedADownB.executePerActionStep`
          ),
        };
        testDeletedBDownA = {
          name: `Test Deleted B Down A Step`,
          executePerActionStep: jasmine.createSpy(
            `testDeletedBDownA.executePerActionStep`
          ),
        };
        testDeletedBDownB = {
          name: `Test Deleted B Down B Step`,
          executePerActionStep: jasmine.createSpy(
            `testDeletedBDownB.executePerActionStep`
          ),
        };
        testDeletedBDownC = {
          name: `Test Deleted B Down C Step`,
          executePerActionStep: jasmine.createSpy(
            `testDeletedBDownC.executePerActionStep`
          ),
        };
        testDeletedCDownA = {
          name: `Test Deleted C Down A Step`,
          executePerActionStep: jasmine.createSpy(
            `testDeletedCDownA.executePerActionStep`
          ),
        };
        testDeletedCDownB = {
          name: `Test Deleted C Down B Step`,
          executePerActionStep: jasmine.createSpy(
            `testDeletedCDownB.executePerActionStep`
          ),
        };
        testDeletedDDownA = {
          name: `Test Deleted D Down A Step`,
          executePerActionStep: jasmine.createSpy(
            `testDeletedDDownA.executePerActionStep`
          ),
        };
        testDeletedDDownB = {
          name: `Test Deleted D Down B Step`,
          executePerActionStep: jasmine.createSpy(
            `testDeletedDDownB.executePerActionStep`
          ),
        };
        testDeletedDDownC = {
          name: `Test Deleted D Down C Step`,
          executePerActionStep: jasmine.createSpy(
            `testDeletedDDownC.executePerActionStep`
          ),
        };
        testDeletedEDownA = {
          name: `Test Deleted E Down A Step`,
          executePerActionStep: jasmine.createSpy(
            `testDeletedEDownA.executePerActionStep`
          ),
        };
        testDeletedEDownB = {
          name: `Test Deleted E Down B Step`,
          executePerActionStep: jasmine.createSpy(
            `testDeletedDDownB.executePerActionStep`
          ),
        };
        testDeletedEDownC = {
          name: `Test Deleted E Down C Step`,
          executePerActionStep: jasmine.createSpy(
            `testDeletedEDownC.executePerActionStep`
          ),
        };

        extractName = jasmine.createSpy(`extractName`).and.callFake((item) => {
          switch (item) {
            case `Test Deleted Item A`:
              return `Test Deleted Item A Name`;

            case `Test Deleted Item B`:
              return `Test Deleted Item B Name`;

            case `Test Deleted Item C`:
              return `Test Deleted Item C Name`;

            case `Test Deleted Item D`:
              return `Test Deleted Item D Name`;

            case `Test Deleted Item E`:
              return `Test Deleted Item E Name`;

            default:
              throw new Error(`Unexpected item ${item}.`);
          }
        });

        down = jasmine.createSpy(`down`).and.callFake((item) => {
          switch (item) {
            case `Test Deleted Item A`:
              return [testDeletedADownA, testDeletedADownB];

            case `Test Deleted Item B`:
              return [testDeletedBDownA, testDeletedBDownB, testDeletedBDownC];

            case `Test Deleted Item C`:
              return [testDeletedCDownA, testDeletedCDownB];

            case `Test Deleted Item D`:
              return [testDeletedDDownA, testDeletedDDownB, testDeletedDDownC];

            case `Test Deleted Item E`:
              return [testDeletedEDownA, testDeletedEDownB, testDeletedEDownC];

            default:
              throw new Error(`Unexpected item ${item}.`);
          }
        });

        up = jasmine.createSpy(`up`);

        const diff: Diff<TestItem> = {
          added: [],
          changed: [],
          unchanged: [
            `Test Unchanged Item A`,
            `Test Unchanged Item B`,
            `Test Unchanged Item C`,
          ],
          deleted: [
            `Test Deleted Item A`,
            `Test Deleted Item B`,
            `Test Deleted Item C`,
            `Test Deleted Item D`,
            `Test Deleted Item E`,
          ],
        };

        result = generateSteps(`Test Name`, false, diff, extractName, down, up);
      });

      it(`extracts the names of the deleted items`, () => {
        expect(extractName).toHaveBeenCalledWith(`Test Deleted Item A`);
        expect(extractName).toHaveBeenCalledWith(`Test Deleted Item B`);
        expect(extractName).toHaveBeenCalledWith(`Test Deleted Item C`);
        expect(extractName).toHaveBeenCalledWith(`Test Deleted Item D`);
        expect(extractName).toHaveBeenCalledWith(`Test Deleted Item E`);
      });

      it(`does not extract the names of any further items`, () => {
        expect(extractName).toHaveBeenCalledTimes(5);
      });

      it(`generates down steps for deleted items`, () => {
        expect(down).toHaveBeenCalledWith(`Test Deleted Item A`);
        expect(down).toHaveBeenCalledWith(`Test Deleted Item B`);
        expect(down).toHaveBeenCalledWith(`Test Deleted Item C`);
        expect(down).toHaveBeenCalledWith(`Test Deleted Item D`);
        expect(down).toHaveBeenCalledWith(`Test Deleted Item E`);
      });

      it(`does not generate down steps for any further items`, () => {
        expect(down).toHaveBeenCalledTimes(5);
      });

      it(`does not generate up steps`, () => {
        expect(up).not.toHaveBeenCalled();
      });

      it(`returns the expected tree of generated steps`, () => {
        expect(result).toEqual([
          new ParallelStep(`Test Name`, [
            new SerialStep(`Test Deleted Item A Name`, [
              testDeletedADownA,
              testDeletedADownB,
            ]),
            new SerialStep(`Test Deleted Item B Name`, [
              testDeletedBDownA,
              testDeletedBDownB,
              testDeletedBDownC,
            ]),
            new SerialStep(`Test Deleted Item C Name`, [
              testDeletedCDownA,
              testDeletedCDownB,
            ]),
            new SerialStep(`Test Deleted Item D Name`, [
              testDeletedDDownA,
              testDeletedDDownB,
              testDeletedDDownC,
            ]),
            new SerialStep(`Test Deleted Item E Name`, [
              testDeletedEDownA,
              testDeletedEDownB,
              testDeletedEDownC,
            ]),
          ]),
        ]);
      });

      it(`does not execute any of the generated steps`, () => {
        expect(testDeletedADownA.executePerActionStep).not.toHaveBeenCalled();
        expect(testDeletedADownB.executePerActionStep).not.toHaveBeenCalled();
        expect(testDeletedBDownA.executePerActionStep).not.toHaveBeenCalled();
        expect(testDeletedBDownB.executePerActionStep).not.toHaveBeenCalled();
        expect(testDeletedBDownC.executePerActionStep).not.toHaveBeenCalled();
        expect(testDeletedCDownA.executePerActionStep).not.toHaveBeenCalled();
        expect(testDeletedCDownB.executePerActionStep).not.toHaveBeenCalled();
        expect(testDeletedDDownA.executePerActionStep).not.toHaveBeenCalled();
        expect(testDeletedDDownB.executePerActionStep).not.toHaveBeenCalled();
        expect(testDeletedDDownC.executePerActionStep).not.toHaveBeenCalled();
        expect(testDeletedEDownA.executePerActionStep).not.toHaveBeenCalled();
        expect(testDeletedEDownB.executePerActionStep).not.toHaveBeenCalled();
        expect(testDeletedEDownC.executePerActionStep).not.toHaveBeenCalled();
      });
    });

    describe(`when only unchanged files are present`, () => {
      let extractName: jasmine.Spy;
      let down: jasmine.Spy;
      let up: jasmine.Spy;
      let result: ReadonlyArray<ParallelStep>;

      beforeAll(() => {
        extractName = jasmine.createSpy(`extractName`);
        down = jasmine.createSpy(`down`);
        up = jasmine.createSpy(`up`);

        const diff: Diff<TestItem> = {
          added: [],
          changed: [],
          unchanged: [
            `Test Unchanged Item A`,
            `Test Unchanged Item B`,
            `Test Unchanged Item C`,
          ],
          deleted: [],
        };

        result = generateSteps(`Test Name`, false, diff, extractName, down, up);
      });

      it(`does not extract any names`, () => {
        expect(extractName).not.toHaveBeenCalled();
      });

      it(`does not generate down steps`, () => {
        expect(down).not.toHaveBeenCalled();
      });

      it(`does not generate up steps`, () => {
        expect(up).not.toHaveBeenCalled();
      });

      it(`returns the expected tree of generated steps`, () => {
        expect(result).toEqual([]);
      });
    });

    describe(`when only additions are present`, () => {
      let testAddedAUpA: Step;
      let testAddedAUpB: Step;
      let testAddedBUpA: Step;
      let testAddedBUpB: Step;
      let testAddedBUpC: Step;
      let testAddedBUpD: Step;
      let testAddedCUpA: Step;
      let testAddedCUpB: Step;
      let testAddedCUpC: Step;
      let testAddedCUpD: Step;
      let testAddedDUpA: Step;
      let testAddedDUpB: Step;
      let testAddedDUpC: Step;
      let extractName: jasmine.Spy;
      let down: jasmine.Spy;
      let up: jasmine.Spy;
      let result: ReadonlyArray<ParallelStep>;

      beforeAll(() => {
        testAddedAUpA = {
          name: `Test Added A Up A`,
          executePerActionStep: jasmine.createSpy(
            `testAddedAUpA.executePerActionStep`
          ),
        };
        testAddedAUpB = {
          name: `Test Added A Up B Step`,
          executePerActionStep: jasmine.createSpy(
            `testAddedAUpB.executePerActionStep`
          ),
        };
        testAddedBUpA = {
          name: `Test Added B Up A Step`,
          executePerActionStep: jasmine.createSpy(
            `testAddedBUpA.executePerActionStep`
          ),
        };
        testAddedBUpB = {
          name: `Test Added B Up B Step`,
          executePerActionStep: jasmine.createSpy(
            `testAddedBUpB.executePerActionStep`
          ),
        };
        testAddedBUpC = {
          name: `Test Added B Up C Step`,
          executePerActionStep: jasmine.createSpy(
            `testAddedBUpC.executePerActionStep`
          ),
        };
        testAddedBUpD = {
          name: `Test Added B Up D Step`,
          executePerActionStep: jasmine.createSpy(
            `testAddedBUpD.executePerActionStep`
          ),
        };
        testAddedCUpA = {
          name: `Test Added C Up A Step`,
          executePerActionStep: jasmine.createSpy(
            `testAddedCUpA.executePerActionStep`
          ),
        };
        testAddedCUpB = {
          name: `Test Added C Up B Step`,
          executePerActionStep: jasmine.createSpy(
            `testAddedCUpB.executePerActionStep`
          ),
        };
        testAddedCUpC = {
          name: `Test Added C Up C Step`,
          executePerActionStep: jasmine.createSpy(
            `testAddedCUpC.executePerActionStep`
          ),
        };
        testAddedCUpD = {
          name: `Test Added C Up D Step`,
          executePerActionStep: jasmine.createSpy(
            `testAddedCUpD.executePerActionStep`
          ),
        };
        testAddedDUpA = {
          name: `Test Added D Up A Step`,
          executePerActionStep: jasmine.createSpy(
            `testAddedDUpA.executePerActionStep`
          ),
        };
        testAddedDUpB = {
          name: `Test Added D Up B Step`,
          executePerActionStep: jasmine.createSpy(
            `testAddedDUpB.executePerActionStep`
          ),
        };
        testAddedDUpC = {
          name: `Test Added D Up C Step`,
          executePerActionStep: jasmine.createSpy(
            `testAddedDUpC.executePerActionStep`
          ),
        };

        extractName = jasmine.createSpy(`extractName`).and.callFake((item) => {
          switch (item) {
            case `Test Added Item A`:
              return `Test Added Item A Name`;

            case `Test Added Item B`:
              return `Test Added Item B Name`;

            case `Test Added Item C`:
              return `Test Added Item C Name`;

            case `Test Added Item D`:
              return `Test Added Item D Name`;

            default:
              throw new Error(`Unexpected item ${item}.`);
          }
        });

        down = jasmine.createSpy(`down`);

        up = jasmine.createSpy(`up`).and.callFake((item) => {
          switch (item) {
            case `Test Added Item A`:
              return [testAddedAUpA, testAddedAUpB];

            case `Test Added Item B`:
              return [
                testAddedBUpA,
                testAddedBUpB,
                testAddedBUpC,
                testAddedBUpD,
              ];

            case `Test Added Item C`:
              return [
                testAddedCUpA,
                testAddedCUpB,
                testAddedCUpC,
                testAddedCUpD,
              ];

            case `Test Added Item D`:
              return [testAddedDUpA, testAddedDUpB, testAddedDUpC];

            default:
              throw new Error(`Unexpected item ${item}.`);
          }
        });

        const diff: Diff<TestItem> = {
          added: [
            `Test Added Item A`,
            `Test Added Item B`,
            `Test Added Item C`,
            `Test Added Item D`,
          ],
          changed: [],
          unchanged: [],
          deleted: [],
        };

        result = generateSteps(`Test Name`, false, diff, extractName, down, up);
      });

      it(`extracts the names of the added items`, () => {
        expect(extractName).toHaveBeenCalledWith(`Test Added Item A`);
        expect(extractName).toHaveBeenCalledWith(`Test Added Item B`);
        expect(extractName).toHaveBeenCalledWith(`Test Added Item C`);
        expect(extractName).toHaveBeenCalledWith(`Test Added Item D`);
      });

      it(`does not extract the names of any further items`, () => {
        expect(extractName).toHaveBeenCalledTimes(4);
      });

      it(`does not generate down steps`, () => {
        expect(down).not.toHaveBeenCalled();
      });

      it(`generates up steps for added items`, () => {
        expect(up).toHaveBeenCalledWith(`Test Added Item A`);
        expect(up).toHaveBeenCalledWith(`Test Added Item B`);
        expect(up).toHaveBeenCalledWith(`Test Added Item C`);
        expect(up).toHaveBeenCalledWith(`Test Added Item D`);
      });

      it(`does not generate up steps for any further items`, () => {
        expect(up).toHaveBeenCalledTimes(4);
      });

      it(`returns the expected tree of generated steps`, () => {
        expect(result).toEqual([
          new ParallelStep(`Test Name`, [
            new SerialStep(`Test Added Item A Name`, [
              testAddedAUpA,
              testAddedAUpB,
            ]),
            new SerialStep(`Test Added Item B Name`, [
              testAddedBUpA,
              testAddedBUpB,
              testAddedBUpC,
              testAddedBUpD,
            ]),
            new SerialStep(`Test Added Item C Name`, [
              testAddedCUpA,
              testAddedCUpB,
              testAddedCUpC,
              testAddedCUpD,
            ]),
            new SerialStep(`Test Added Item D Name`, [
              testAddedDUpA,
              testAddedDUpB,
              testAddedDUpC,
            ]),
          ]),
        ]);
      });

      it(`does not execute any of the generated steps`, () => {
        expect(testAddedAUpA.executePerActionStep).not.toHaveBeenCalled();
        expect(testAddedAUpB.executePerActionStep).not.toHaveBeenCalled();
        expect(testAddedBUpA.executePerActionStep).not.toHaveBeenCalled();
        expect(testAddedBUpB.executePerActionStep).not.toHaveBeenCalled();
        expect(testAddedBUpC.executePerActionStep).not.toHaveBeenCalled();
        expect(testAddedBUpD.executePerActionStep).not.toHaveBeenCalled();
        expect(testAddedCUpA.executePerActionStep).not.toHaveBeenCalled();
        expect(testAddedCUpB.executePerActionStep).not.toHaveBeenCalled();
        expect(testAddedCUpC.executePerActionStep).not.toHaveBeenCalled();
        expect(testAddedCUpD.executePerActionStep).not.toHaveBeenCalled();
        expect(testAddedDUpA.executePerActionStep).not.toHaveBeenCalled();
        expect(testAddedDUpB.executePerActionStep).not.toHaveBeenCalled();
        expect(testAddedDUpC.executePerActionStep).not.toHaveBeenCalled();
      });
    });

    describe(`when only changes are present`, () => {
      let testChangedADownA: Step;
      let testChangedADownB: Step;
      let testChangedAUpA: Step;
      let testChangedAUpB: Step;
      let testChangedAUpC: Step;
      let testChangedBDownA: Step;
      let testChangedBDownB: Step;
      let testChangedBDownC: Step;
      let testChangedBDownD: Step;
      let testChangedBUpA: Step;
      let testChangedBUpB: Step;
      let extractName: jasmine.Spy;
      let down: jasmine.Spy;
      let up: jasmine.Spy;
      let result: ReadonlyArray<ParallelStep>;

      beforeAll(() => {
        testChangedADownA = {
          name: `Test Changed A Down A Step`,
          executePerActionStep: jasmine.createSpy(
            `testChangedADownA.executePerActionStep`
          ),
        };
        testChangedADownB = {
          name: `Test Changed A Down B Step`,
          executePerActionStep: jasmine.createSpy(
            `testChangedADownB.executePerActionStep`
          ),
        };
        testChangedAUpA = {
          name: `Test Changed A Up A Step`,
          executePerActionStep: jasmine.createSpy(
            `testChangedAUpA.executePerActionStep`
          ),
        };
        testChangedAUpB = {
          name: `Test Changed A Up B Step`,
          executePerActionStep: jasmine.createSpy(
            `testChangedAUpB.executePerActionStep`
          ),
        };
        testChangedAUpC = {
          name: `Test Changed A Up C Step`,
          executePerActionStep: jasmine.createSpy(
            `testChangedAUpC.executePerActionStep`
          ),
        };
        testChangedBDownA = {
          name: `Test Changed B Down A Step`,
          executePerActionStep: jasmine.createSpy(
            `testChangedBDownA.executePerActionStep`
          ),
        };
        testChangedBDownB = {
          name: `Test Changed B Down B Step`,
          executePerActionStep: jasmine.createSpy(
            `testChangedBDownB.executePerActionStep`
          ),
        };
        testChangedBDownC = {
          name: `Test Changed B Down C Step`,
          executePerActionStep: jasmine.createSpy(
            `testChangedBDownC.executePerActionStep`
          ),
        };
        testChangedBDownD = {
          name: `Test Changed B Down D Step`,
          executePerActionStep: jasmine.createSpy(
            `testChangedBDownD.executePerActionStep`
          ),
        };
        testChangedBUpA = {
          name: `Test Changed B Up A Step`,
          executePerActionStep: jasmine.createSpy(
            `testChangedBUpA.executePerActionStep`
          ),
        };
        testChangedBUpB = {
          name: `Test Changed B Up B Step`,
          executePerActionStep: jasmine.createSpy(
            `testChangedBUpB.executePerActionStep`
          ),
        };

        extractName = jasmine.createSpy(`extractName`).and.callFake((item) => {
          switch (item) {
            case `Test Added Item A`:
              return `Test Added Item A Name`;

            case `Test Added Item B`:
              return `Test Added Item B Name`;

            case `Test Added Item C`:
              return `Test Added Item C Name`;

            case `Test Added Item D`:
              return `Test Added Item D Name`;

            case `Test Changed Item A`:
              return `Test Changed Item A Name`;

            case `Test Changed Item B`:
              return `Test Changed Item B Name`;

            case `Test Deleted Item A`:
              return `Test Deleted Item A Name`;

            case `Test Deleted Item B`:
              return `Test Deleted Item B Name`;

            case `Test Deleted Item C`:
              return `Test Deleted Item C Name`;

            case `Test Deleted Item D`:
              return `Test Deleted Item D Name`;

            case `Test Deleted Item E`:
              return `Test Deleted Item E Name`;

            default:
              throw new Error(`Unexpected item ${item}.`);
          }
        });

        down = jasmine.createSpy(`down`).and.callFake((item) => {
          switch (item) {
            case `Test Changed Item A`:
              return [testChangedADownA, testChangedADownB];

            case `Test Changed Item B`:
              return [
                testChangedBDownA,
                testChangedBDownB,
                testChangedBDownC,
                testChangedBDownD,
              ];

            default:
              throw new Error(`Unexpected item ${item}.`);
          }
        });

        up = jasmine.createSpy(`up`).and.callFake((item) => {
          switch (item) {
            case `Test Changed Item A`:
              return [testChangedAUpA, testChangedAUpB, testChangedAUpC];

            case `Test Changed Item B`:
              return [testChangedBUpA, testChangedBUpB];

            default:
              throw new Error(`Unexpected item ${item}.`);
          }
        });

        const diff: Diff<TestItem> = {
          added: [],
          changed: [`Test Changed Item A`, `Test Changed Item B`],
          unchanged: [],
          deleted: [],
        };

        result = generateSteps(`Test Name`, false, diff, extractName, down, up);
      });

      it(`extracts the names of the changed items`, () => {
        expect(extractName).toHaveBeenCalledWith(`Test Changed Item A`);
        expect(extractName).toHaveBeenCalledWith(`Test Changed Item B`);
      });

      it(`does not extract the names of any further items`, () => {
        expect(extractName).toHaveBeenCalledTimes(2);
      });

      it(`generates down steps for changed items`, () => {
        expect(down).toHaveBeenCalledWith(`Test Changed Item A`);
        expect(down).toHaveBeenCalledWith(`Test Changed Item B`);
      });

      it(`does not generate down steps for any further items`, () => {
        expect(down).toHaveBeenCalledTimes(2);
      });

      it(`generates up steps for changed items`, () => {
        expect(up).toHaveBeenCalledWith(`Test Changed Item A`);
        expect(up).toHaveBeenCalledWith(`Test Changed Item B`);
      });

      it(`does not generate up steps for any further items`, () => {
        expect(up).toHaveBeenCalledTimes(2);
      });

      it(`returns the expected tree of generated steps`, () => {
        expect(result).toEqual([
          new ParallelStep(`Test Name`, [
            new SerialStep(`Test Changed Item A Name`, [
              testChangedADownA,
              testChangedADownB,
              testChangedAUpA,
              testChangedAUpB,
              testChangedAUpC,
            ]),
            new SerialStep(`Test Changed Item B Name`, [
              testChangedBDownA,
              testChangedBDownB,
              testChangedBDownC,
              testChangedBDownD,
              testChangedBUpA,
              testChangedBUpB,
            ]),
          ]),
        ]);
      });

      it(`does not execute any of the generated steps`, () => {
        expect(testChangedADownA.executePerActionStep).not.toHaveBeenCalled();
        expect(testChangedADownB.executePerActionStep).not.toHaveBeenCalled();
        expect(testChangedAUpA.executePerActionStep).not.toHaveBeenCalled();
        expect(testChangedAUpB.executePerActionStep).not.toHaveBeenCalled();
        expect(testChangedAUpC.executePerActionStep).not.toHaveBeenCalled();
        expect(testChangedBDownA.executePerActionStep).not.toHaveBeenCalled();
        expect(testChangedBDownB.executePerActionStep).not.toHaveBeenCalled();
        expect(testChangedBDownC.executePerActionStep).not.toHaveBeenCalled();
        expect(testChangedBDownD.executePerActionStep).not.toHaveBeenCalled();
        expect(testChangedBUpA.executePerActionStep).not.toHaveBeenCalled();
        expect(testChangedBUpB.executePerActionStep).not.toHaveBeenCalled();
      });
    });

    describe(`when only deletions are present`, () => {
      let testDeletedADownA: Step;
      let testDeletedADownB: Step;
      let testDeletedBDownA: Step;
      let testDeletedBDownB: Step;
      let testDeletedBDownC: Step;
      let testDeletedCDownA: Step;
      let testDeletedCDownB: Step;
      let testDeletedDDownA: Step;
      let testDeletedDDownB: Step;
      let testDeletedDDownC: Step;
      let testDeletedEDownA: Step;
      let testDeletedEDownB: Step;
      let testDeletedEDownC: Step;
      let extractName: jasmine.Spy;
      let down: jasmine.Spy;
      let up: jasmine.Spy;
      let result: ReadonlyArray<ParallelStep>;

      beforeAll(() => {
        testDeletedADownA = {
          name: `Test Deleted A Down A Step`,
          executePerActionStep: jasmine.createSpy(
            `testDeletedADownA.executePerActionStep`
          ),
        };
        testDeletedADownB = {
          name: `Test Deleted A Down B Step`,
          executePerActionStep: jasmine.createSpy(
            `testDeletedADownB.executePerActionStep`
          ),
        };
        testDeletedBDownA = {
          name: `Test Deleted B Down A Step`,
          executePerActionStep: jasmine.createSpy(
            `testDeletedBDownA.executePerActionStep`
          ),
        };
        testDeletedBDownB = {
          name: `Test Deleted B Down B Step`,
          executePerActionStep: jasmine.createSpy(
            `testDeletedBDownB.executePerActionStep`
          ),
        };
        testDeletedBDownC = {
          name: `Test Deleted B Down C Step`,
          executePerActionStep: jasmine.createSpy(
            `testDeletedBDownC.executePerActionStep`
          ),
        };
        testDeletedCDownA = {
          name: `Test Deleted C Down A Step`,
          executePerActionStep: jasmine.createSpy(
            `testDeletedCDownA.executePerActionStep`
          ),
        };
        testDeletedCDownB = {
          name: `Test Deleted C Down B Step`,
          executePerActionStep: jasmine.createSpy(
            `testDeletedCDownB.executePerActionStep`
          ),
        };
        testDeletedDDownA = {
          name: `Test Deleted D Down A Step`,
          executePerActionStep: jasmine.createSpy(
            `testDeletedDDownA.executePerActionStep`
          ),
        };
        testDeletedDDownB = {
          name: `Test Deleted D Down B Step`,
          executePerActionStep: jasmine.createSpy(
            `testDeletedDDownB.executePerActionStep`
          ),
        };
        testDeletedDDownC = {
          name: `Test Deleted D Down C Step`,
          executePerActionStep: jasmine.createSpy(
            `testDeletedDDownC.executePerActionStep`
          ),
        };
        testDeletedEDownA = {
          name: `Test Deleted E Down A Step`,
          executePerActionStep: jasmine.createSpy(
            `testDeletedEDownA.executePerActionStep`
          ),
        };
        testDeletedEDownB = {
          name: `Test Deleted E Down B Step`,
          executePerActionStep: jasmine.createSpy(
            `testDeletedDDownB.executePerActionStep`
          ),
        };
        testDeletedEDownC = {
          name: `Test Deleted E Down C Step`,
          executePerActionStep: jasmine.createSpy(
            `testDeletedEDownC.executePerActionStep`
          ),
        };

        extractName = jasmine.createSpy(`extractName`).and.callFake((item) => {
          switch (item) {
            case `Test Deleted Item A`:
              return `Test Deleted Item A Name`;

            case `Test Deleted Item B`:
              return `Test Deleted Item B Name`;

            case `Test Deleted Item C`:
              return `Test Deleted Item C Name`;

            case `Test Deleted Item D`:
              return `Test Deleted Item D Name`;

            case `Test Deleted Item E`:
              return `Test Deleted Item E Name`;

            default:
              throw new Error(`Unexpected item ${item}.`);
          }
        });

        down = jasmine.createSpy(`down`).and.callFake((item) => {
          switch (item) {
            case `Test Deleted Item A`:
              return [testDeletedADownA, testDeletedADownB];

            case `Test Deleted Item B`:
              return [testDeletedBDownA, testDeletedBDownB, testDeletedBDownC];

            case `Test Deleted Item C`:
              return [testDeletedCDownA, testDeletedCDownB];

            case `Test Deleted Item D`:
              return [testDeletedDDownA, testDeletedDDownB, testDeletedDDownC];

            case `Test Deleted Item E`:
              return [testDeletedEDownA, testDeletedEDownB, testDeletedEDownC];

            default:
              throw new Error(`Unexpected item ${item}.`);
          }
        });

        up = jasmine.createSpy(`up`);

        const diff: Diff<TestItem> = {
          added: [],
          changed: [],
          unchanged: [],
          deleted: [
            `Test Deleted Item A`,
            `Test Deleted Item B`,
            `Test Deleted Item C`,
            `Test Deleted Item D`,
            `Test Deleted Item E`,
          ],
        };

        result = generateSteps(`Test Name`, false, diff, extractName, down, up);
      });

      it(`extracts the names of the deleted items`, () => {
        expect(extractName).toHaveBeenCalledWith(`Test Deleted Item A`);
        expect(extractName).toHaveBeenCalledWith(`Test Deleted Item B`);
        expect(extractName).toHaveBeenCalledWith(`Test Deleted Item C`);
        expect(extractName).toHaveBeenCalledWith(`Test Deleted Item D`);
        expect(extractName).toHaveBeenCalledWith(`Test Deleted Item E`);
      });

      it(`does not extract the names of any further items`, () => {
        expect(extractName).toHaveBeenCalledTimes(5);
      });

      it(`generates down steps for deleted items`, () => {
        expect(down).toHaveBeenCalledWith(`Test Deleted Item A`);
        expect(down).toHaveBeenCalledWith(`Test Deleted Item B`);
        expect(down).toHaveBeenCalledWith(`Test Deleted Item C`);
        expect(down).toHaveBeenCalledWith(`Test Deleted Item D`);
        expect(down).toHaveBeenCalledWith(`Test Deleted Item E`);
      });

      it(`does not generate down steps for any further items`, () => {
        expect(down).toHaveBeenCalledTimes(5);
      });

      it(`does not generate up steps`, () => {
        expect(up).not.toHaveBeenCalled();
      });

      it(`returns the expected tree of generated steps`, () => {
        expect(result).toEqual([
          new ParallelStep(`Test Name`, [
            new SerialStep(`Test Deleted Item A Name`, [
              testDeletedADownA,
              testDeletedADownB,
            ]),
            new SerialStep(`Test Deleted Item B Name`, [
              testDeletedBDownA,
              testDeletedBDownB,
              testDeletedBDownC,
            ]),
            new SerialStep(`Test Deleted Item C Name`, [
              testDeletedCDownA,
              testDeletedCDownB,
            ]),
            new SerialStep(`Test Deleted Item D Name`, [
              testDeletedDDownA,
              testDeletedDDownB,
              testDeletedDDownC,
            ]),
            new SerialStep(`Test Deleted Item E Name`, [
              testDeletedEDownA,
              testDeletedEDownB,
              testDeletedEDownC,
            ]),
          ]),
        ]);
      });

      it(`does not execute any of the generated steps`, () => {
        expect(testDeletedADownA.executePerActionStep).not.toHaveBeenCalled();
        expect(testDeletedADownB.executePerActionStep).not.toHaveBeenCalled();
        expect(testDeletedBDownA.executePerActionStep).not.toHaveBeenCalled();
        expect(testDeletedBDownB.executePerActionStep).not.toHaveBeenCalled();
        expect(testDeletedBDownC.executePerActionStep).not.toHaveBeenCalled();
        expect(testDeletedCDownA.executePerActionStep).not.toHaveBeenCalled();
        expect(testDeletedCDownB.executePerActionStep).not.toHaveBeenCalled();
        expect(testDeletedDDownA.executePerActionStep).not.toHaveBeenCalled();
        expect(testDeletedDDownB.executePerActionStep).not.toHaveBeenCalled();
        expect(testDeletedDDownC.executePerActionStep).not.toHaveBeenCalled();
        expect(testDeletedEDownA.executePerActionStep).not.toHaveBeenCalled();
        expect(testDeletedEDownB.executePerActionStep).not.toHaveBeenCalled();
        expect(testDeletedEDownC.executePerActionStep).not.toHaveBeenCalled();
      });
    });

    describe(`when no files are present`, () => {
      let extractName: jasmine.Spy;
      let down: jasmine.Spy;
      let up: jasmine.Spy;
      let result: ReadonlyArray<ParallelStep>;

      beforeAll(() => {
        extractName = jasmine.createSpy(`extractName`);
        down = jasmine.createSpy(`down`);
        up = jasmine.createSpy(`up`);

        const diff: Diff<TestItem> = {
          added: [],
          changed: [],
          unchanged: [],
          deleted: [],
        };

        result = generateSteps(`Test Name`, false, diff, extractName, down, up);
      });

      it(`does not extract any names`, () => {
        expect(extractName).not.toHaveBeenCalled();
      });

      it(`does not generate down steps`, () => {
        expect(down).not.toHaveBeenCalled();
      });

      it(`does not generate up steps`, () => {
        expect(up).not.toHaveBeenCalled();
      });

      it(`returns the expected tree of generated steps`, () => {
        expect(result).toEqual([]);
      });
    });
  });

  describe(`when regenerating all`, () => {
    describe(`when all types of changes are present`, () => {
      let testAddedAUpA: Step;
      let testAddedAUpB: Step;
      let testAddedBUpA: Step;
      let testAddedBUpB: Step;
      let testAddedBUpC: Step;
      let testAddedBUpD: Step;
      let testAddedCUpA: Step;
      let testAddedCUpB: Step;
      let testAddedCUpC: Step;
      let testAddedCUpD: Step;
      let testAddedDUpA: Step;
      let testAddedDUpB: Step;
      let testAddedDUpC: Step;
      let testUnchangedADownA: Step;
      let testUnchangedADownB: Step;
      let testUnchangedADownC: Step;
      let testUnchangedAUpA: Step;
      let testUnchangedAUpB: Step;
      let testUnchangedBDownA: Step;
      let testUnchangedBDownB: Step;
      let testUnchangedBUpA: Step;
      let testUnchangedBUpB: Step;
      let testUnchangedBUpC: Step;
      let testUnchangedBUpD: Step;
      let testUnchangedCDownA: Step;
      let testUnchangedCDownB: Step;
      let testUnchangedCDownC: Step;
      let testUnchangedCUpA: Step;
      let testUnchangedCUpB: Step;
      let testUnchangedCUpC: Step;
      let testChangedADownA: Step;
      let testChangedADownB: Step;
      let testChangedAUpA: Step;
      let testChangedAUpB: Step;
      let testChangedAUpC: Step;
      let testChangedBDownA: Step;
      let testChangedBDownB: Step;
      let testChangedBDownC: Step;
      let testChangedBDownD: Step;
      let testChangedBUpA: Step;
      let testChangedBUpB: Step;
      let testDeletedADownA: Step;
      let testDeletedADownB: Step;
      let testDeletedBDownA: Step;
      let testDeletedBDownB: Step;
      let testDeletedBDownC: Step;
      let testDeletedCDownA: Step;
      let testDeletedCDownB: Step;
      let testDeletedDDownA: Step;
      let testDeletedDDownB: Step;
      let testDeletedDDownC: Step;
      let testDeletedEDownA: Step;
      let testDeletedEDownB: Step;
      let testDeletedEDownC: Step;
      let extractName: jasmine.Spy;
      let down: jasmine.Spy;
      let up: jasmine.Spy;
      let result: ReadonlyArray<ParallelStep>;

      beforeAll(() => {
        testAddedAUpA = {
          name: `Test Added A Up A`,
          executePerActionStep: jasmine.createSpy(
            `testAddedAUpA.executePerActionStep`
          ),
        };
        testAddedAUpB = {
          name: `Test Added A Up B Step`,
          executePerActionStep: jasmine.createSpy(
            `testAddedAUpB.executePerActionStep`
          ),
        };
        testAddedBUpA = {
          name: `Test Added B Up A Step`,
          executePerActionStep: jasmine.createSpy(
            `testAddedBUpA.executePerActionStep`
          ),
        };
        testAddedBUpB = {
          name: `Test Added B Up B Step`,
          executePerActionStep: jasmine.createSpy(
            `testAddedBUpB.executePerActionStep`
          ),
        };
        testAddedBUpC = {
          name: `Test Added B Up C Step`,
          executePerActionStep: jasmine.createSpy(
            `testAddedBUpC.executePerActionStep`
          ),
        };
        testAddedBUpD = {
          name: `Test Added B Up D Step`,
          executePerActionStep: jasmine.createSpy(
            `testAddedBUpD.executePerActionStep`
          ),
        };
        testAddedCUpA = {
          name: `Test Added C Up A Step`,
          executePerActionStep: jasmine.createSpy(
            `testAddedCUpA.executePerActionStep`
          ),
        };
        testAddedCUpB = {
          name: `Test Added C Up B Step`,
          executePerActionStep: jasmine.createSpy(
            `testAddedCUpB.executePerActionStep`
          ),
        };
        testAddedCUpC = {
          name: `Test Added C Up C Step`,
          executePerActionStep: jasmine.createSpy(
            `testAddedCUpC.executePerActionStep`
          ),
        };
        testAddedCUpD = {
          name: `Test Added C Up D Step`,
          executePerActionStep: jasmine.createSpy(
            `testAddedCUpD.executePerActionStep`
          ),
        };
        testAddedDUpA = {
          name: `Test Added D Up A Step`,
          executePerActionStep: jasmine.createSpy(
            `testAddedDUpA.executePerActionStep`
          ),
        };
        testAddedDUpB = {
          name: `Test Added D Up B Step`,
          executePerActionStep: jasmine.createSpy(
            `testAddedDUpB.executePerActionStep`
          ),
        };
        testAddedDUpC = {
          name: `Test Added D Up C Step`,
          executePerActionStep: jasmine.createSpy(
            `testAddedDUpC.executePerActionStep`
          ),
        };
        testUnchangedADownA = {
          name: `Test Unchanged A Down A Step`,
          executePerActionStep: jasmine.createSpy(
            `testUnchangedADownA.executePerActionStep`
          ),
        };
        testUnchangedADownB = {
          name: `Test Unchanged A Down B Step`,
          executePerActionStep: jasmine.createSpy(
            `testUnchangedADownB.executePerActionStep`
          ),
        };
        testUnchangedADownC = {
          name: `Test Unchanged A Down C Step`,
          executePerActionStep: jasmine.createSpy(
            `testUnchangedADownC.executePerActionStep`
          ),
        };
        testUnchangedAUpA = {
          name: `Test Unchanged A Up A Step`,
          executePerActionStep: jasmine.createSpy(
            `testUnchangedAUpA.executePerActionStep`
          ),
        };
        testUnchangedAUpB = {
          name: `Test Unchanged A Up B Step`,
          executePerActionStep: jasmine.createSpy(
            `testUnchangedAUpB.executePerActionStep`
          ),
        };
        testUnchangedBDownA = {
          name: `Test Unchanged B Down A Step`,
          executePerActionStep: jasmine.createSpy(
            `testUnchangedBDownA.executePerActionStep`
          ),
        };
        testUnchangedBDownB = {
          name: `Test Unchanged B Down B Step`,
          executePerActionStep: jasmine.createSpy(
            `testUnchangedBDownB.executePerActionStep`
          ),
        };
        testUnchangedBUpA = {
          name: `Test Unchanged B Up A Step`,
          executePerActionStep: jasmine.createSpy(
            `testUnchangedBUpA.executePerActionStep`
          ),
        };
        testUnchangedBUpB = {
          name: `Test Unchanged B Up B Step`,
          executePerActionStep: jasmine.createSpy(
            `testUnchangedBUpB.executePerActionStep`
          ),
        };
        testUnchangedBUpC = {
          name: `Test Unchanged B Up C Step`,
          executePerActionStep: jasmine.createSpy(
            `testUnchangedBUpC.executePerActionStep`
          ),
        };
        testUnchangedBUpD = {
          name: `Test Unchanged B Up D Step`,
          executePerActionStep: jasmine.createSpy(
            `testUnchangedBUpD.executePerActionStep`
          ),
        };
        testUnchangedCDownA = {
          name: `Test Unchanged C Down A Step`,
          executePerActionStep: jasmine.createSpy(
            `testUnchangedCDownA.executePerActionStep`
          ),
        };
        testUnchangedCDownB = {
          name: `Test Unchanged C Down B Step`,
          executePerActionStep: jasmine.createSpy(
            `testUnchangedCDownB.executePerActionStep`
          ),
        };
        testUnchangedCDownC = {
          name: `Test Unchanged C Down C Step`,
          executePerActionStep: jasmine.createSpy(
            `testUnchangedCDownC.executePerActionStep`
          ),
        };
        testUnchangedCUpA = {
          name: `Test Unchanged C Up A Step`,
          executePerActionStep: jasmine.createSpy(
            `testUnchangedCUpA.executePerActionStep`
          ),
        };
        testUnchangedCUpB = {
          name: `Test Unchanged C Up B Step`,
          executePerActionStep: jasmine.createSpy(
            `testUnchangedCUpB.executePerActionStep`
          ),
        };
        testUnchangedCUpC = {
          name: `Test Unchanged C Up C Step`,
          executePerActionStep: jasmine.createSpy(
            `testUnchangedCUpC.executePerActionStep`
          ),
        };
        testChangedADownA = {
          name: `Test Changed A Down A Step`,
          executePerActionStep: jasmine.createSpy(
            `testChangedADownA.executePerActionStep`
          ),
        };
        testChangedADownB = {
          name: `Test Changed A Down B Step`,
          executePerActionStep: jasmine.createSpy(
            `testChangedADownB.executePerActionStep`
          ),
        };
        testChangedAUpA = {
          name: `Test Changed A Up A Step`,
          executePerActionStep: jasmine.createSpy(
            `testChangedAUpA.executePerActionStep`
          ),
        };
        testChangedAUpB = {
          name: `Test Changed A Up B Step`,
          executePerActionStep: jasmine.createSpy(
            `testChangedAUpB.executePerActionStep`
          ),
        };
        testChangedAUpC = {
          name: `Test Changed A Up C Step`,
          executePerActionStep: jasmine.createSpy(
            `testChangedAUpC.executePerActionStep`
          ),
        };
        testChangedBDownA = {
          name: `Test Changed B Down A Step`,
          executePerActionStep: jasmine.createSpy(
            `testChangedBDownA.executePerActionStep`
          ),
        };
        testChangedBDownB = {
          name: `Test Changed B Down B Step`,
          executePerActionStep: jasmine.createSpy(
            `testChangedBDownB.executePerActionStep`
          ),
        };
        testChangedBDownC = {
          name: `Test Changed B Down C Step`,
          executePerActionStep: jasmine.createSpy(
            `testChangedBDownC.executePerActionStep`
          ),
        };
        testChangedBDownD = {
          name: `Test Changed B Down D Step`,
          executePerActionStep: jasmine.createSpy(
            `testChangedBDownD.executePerActionStep`
          ),
        };
        testChangedBUpA = {
          name: `Test Changed B Up A Step`,
          executePerActionStep: jasmine.createSpy(
            `testChangedBUpA.executePerActionStep`
          ),
        };
        testChangedBUpB = {
          name: `Test Changed B Up B Step`,
          executePerActionStep: jasmine.createSpy(
            `testChangedBUpB.executePerActionStep`
          ),
        };
        testDeletedADownA = {
          name: `Test Deleted A Down A Step`,
          executePerActionStep: jasmine.createSpy(
            `testDeletedADownA.executePerActionStep`
          ),
        };
        testDeletedADownB = {
          name: `Test Deleted A Down B Step`,
          executePerActionStep: jasmine.createSpy(
            `testDeletedADownB.executePerActionStep`
          ),
        };
        testDeletedBDownA = {
          name: `Test Deleted B Down A Step`,
          executePerActionStep: jasmine.createSpy(
            `testDeletedBDownA.executePerActionStep`
          ),
        };
        testDeletedBDownB = {
          name: `Test Deleted B Down B Step`,
          executePerActionStep: jasmine.createSpy(
            `testDeletedBDownB.executePerActionStep`
          ),
        };
        testDeletedBDownC = {
          name: `Test Deleted B Down C Step`,
          executePerActionStep: jasmine.createSpy(
            `testDeletedBDownC.executePerActionStep`
          ),
        };
        testDeletedCDownA = {
          name: `Test Deleted C Down A Step`,
          executePerActionStep: jasmine.createSpy(
            `testDeletedCDownA.executePerActionStep`
          ),
        };
        testDeletedCDownB = {
          name: `Test Deleted C Down B Step`,
          executePerActionStep: jasmine.createSpy(
            `testDeletedCDownB.executePerActionStep`
          ),
        };
        testDeletedDDownA = {
          name: `Test Deleted D Down A Step`,
          executePerActionStep: jasmine.createSpy(
            `testDeletedDDownA.executePerActionStep`
          ),
        };
        testDeletedDDownB = {
          name: `Test Deleted D Down B Step`,
          executePerActionStep: jasmine.createSpy(
            `testDeletedDDownB.executePerActionStep`
          ),
        };
        testDeletedDDownC = {
          name: `Test Deleted D Down C Step`,
          executePerActionStep: jasmine.createSpy(
            `testDeletedDDownC.executePerActionStep`
          ),
        };
        testDeletedEDownA = {
          name: `Test Deleted E Down A Step`,
          executePerActionStep: jasmine.createSpy(
            `testDeletedEDownA.executePerActionStep`
          ),
        };
        testDeletedEDownB = {
          name: `Test Deleted E Down B Step`,
          executePerActionStep: jasmine.createSpy(
            `testDeletedDDownB.executePerActionStep`
          ),
        };
        testDeletedEDownC = {
          name: `Test Deleted E Down C Step`,
          executePerActionStep: jasmine.createSpy(
            `testDeletedEDownC.executePerActionStep`
          ),
        };

        extractName = jasmine.createSpy(`extractName`).and.callFake((item) => {
          switch (item) {
            case `Test Added Item A`:
              return `Test Added Item A Name`;

            case `Test Added Item B`:
              return `Test Added Item B Name`;

            case `Test Added Item C`:
              return `Test Added Item C Name`;

            case `Test Added Item D`:
              return `Test Added Item D Name`;

            case `Test Unchanged Item A`:
              return `Test Unchanged Item A Name`;

            case `Test Unchanged Item B`:
              return `Test Unchanged Item B Name`;

            case `Test Unchanged Item C`:
              return `Test Unchanged Item C Name`;

            case `Test Changed Item A`:
              return `Test Changed Item A Name`;

            case `Test Changed Item B`:
              return `Test Changed Item B Name`;

            case `Test Deleted Item A`:
              return `Test Deleted Item A Name`;

            case `Test Deleted Item B`:
              return `Test Deleted Item B Name`;

            case `Test Deleted Item C`:
              return `Test Deleted Item C Name`;

            case `Test Deleted Item D`:
              return `Test Deleted Item D Name`;

            case `Test Deleted Item E`:
              return `Test Deleted Item E Name`;

            default:
              throw new Error(`Unexpected item ${item}.`);
          }
        });

        down = jasmine.createSpy(`down`).and.callFake((item) => {
          switch (item) {
            case `Test Unchanged Item A`:
              return [
                testUnchangedADownA,
                testUnchangedADownB,
                testUnchangedADownC,
              ];

            case `Test Unchanged Item B`:
              return [testUnchangedBDownA, testUnchangedBDownB];

            case `Test Unchanged Item C`:
              return [
                testUnchangedCDownA,
                testUnchangedCDownB,
                testUnchangedCDownC,
              ];

            case `Test Changed Item A`:
              return [testChangedADownA, testChangedADownB];

            case `Test Changed Item B`:
              return [
                testChangedBDownA,
                testChangedBDownB,
                testChangedBDownC,
                testChangedBDownD,
              ];

            case `Test Deleted Item A`:
              return [testDeletedADownA, testDeletedADownB];

            case `Test Deleted Item B`:
              return [testDeletedBDownA, testDeletedBDownB, testDeletedBDownC];

            case `Test Deleted Item C`:
              return [testDeletedCDownA, testDeletedCDownB];

            case `Test Deleted Item D`:
              return [testDeletedDDownA, testDeletedDDownB, testDeletedDDownC];

            case `Test Deleted Item E`:
              return [testDeletedEDownA, testDeletedEDownB, testDeletedEDownC];

            default:
              throw new Error(`Unexpected item ${item}.`);
          }
        });

        up = jasmine.createSpy(`up`).and.callFake((item) => {
          switch (item) {
            case `Test Added Item A`:
              return [testAddedAUpA, testAddedAUpB];

            case `Test Added Item B`:
              return [
                testAddedBUpA,
                testAddedBUpB,
                testAddedBUpC,
                testAddedBUpD,
              ];

            case `Test Added Item C`:
              return [
                testAddedCUpA,
                testAddedCUpB,
                testAddedCUpC,
                testAddedCUpD,
              ];

            case `Test Added Item D`:
              return [testAddedDUpA, testAddedDUpB, testAddedDUpC];

            case `Test Unchanged Item A`:
              return [testUnchangedAUpA, testUnchangedAUpB];

            case `Test Unchanged Item B`:
              return [
                testUnchangedBUpA,
                testUnchangedBUpB,
                testUnchangedBUpC,
                testUnchangedBUpD,
              ];

            case `Test Unchanged Item C`:
              return [testUnchangedCUpA, testUnchangedCUpB, testUnchangedCUpC];

            case `Test Changed Item A`:
              return [testChangedAUpA, testChangedAUpB, testChangedAUpC];

            case `Test Changed Item B`:
              return [testChangedBUpA, testChangedBUpB];

            default:
              throw new Error(`Unexpected item ${item}.`);
          }
        });

        const diff: Diff<TestItem> = {
          added: [
            `Test Added Item A`,
            `Test Added Item B`,
            `Test Added Item C`,
            `Test Added Item D`,
          ],
          changed: [`Test Changed Item A`, `Test Changed Item B`],
          unchanged: [
            `Test Unchanged Item A`,
            `Test Unchanged Item B`,
            `Test Unchanged Item C`,
          ],
          deleted: [
            `Test Deleted Item A`,
            `Test Deleted Item B`,
            `Test Deleted Item C`,
            `Test Deleted Item D`,
            `Test Deleted Item E`,
          ],
        };

        result = generateSteps(`Test Name`, true, diff, extractName, down, up);
      });

      it(`extracts the names of the added items`, () => {
        expect(extractName).toHaveBeenCalledWith(`Test Added Item A`);
        expect(extractName).toHaveBeenCalledWith(`Test Added Item B`);
        expect(extractName).toHaveBeenCalledWith(`Test Added Item C`);
        expect(extractName).toHaveBeenCalledWith(`Test Added Item D`);
      });

      it(`extracts the names of the unchanged items`, () => {
        expect(extractName).toHaveBeenCalledWith(`Test Unchanged Item A`);
        expect(extractName).toHaveBeenCalledWith(`Test Unchanged Item B`);
        expect(extractName).toHaveBeenCalledWith(`Test Unchanged Item C`);
      });

      it(`extracts the names of the changed items`, () => {
        expect(extractName).toHaveBeenCalledWith(`Test Changed Item A`);
        expect(extractName).toHaveBeenCalledWith(`Test Changed Item B`);
      });

      it(`extracts the names of the deleted items`, () => {
        expect(extractName).toHaveBeenCalledWith(`Test Deleted Item A`);
        expect(extractName).toHaveBeenCalledWith(`Test Deleted Item B`);
        expect(extractName).toHaveBeenCalledWith(`Test Deleted Item C`);
        expect(extractName).toHaveBeenCalledWith(`Test Deleted Item D`);
        expect(extractName).toHaveBeenCalledWith(`Test Deleted Item E`);
      });

      it(`does not extract the names of any further items`, () => {
        expect(extractName).toHaveBeenCalledTimes(14);
      });

      it(`generates down steps for unchanged items`, () => {
        expect(down).toHaveBeenCalledWith(`Test Unchanged Item A`);
        expect(down).toHaveBeenCalledWith(`Test Unchanged Item B`);
        expect(down).toHaveBeenCalledWith(`Test Unchanged Item C`);
      });

      it(`generates down steps for changed items`, () => {
        expect(down).toHaveBeenCalledWith(`Test Changed Item A`);
        expect(down).toHaveBeenCalledWith(`Test Changed Item B`);
      });

      it(`generates down steps for deleted items`, () => {
        expect(down).toHaveBeenCalledWith(`Test Deleted Item A`);
        expect(down).toHaveBeenCalledWith(`Test Deleted Item B`);
        expect(down).toHaveBeenCalledWith(`Test Deleted Item C`);
        expect(down).toHaveBeenCalledWith(`Test Deleted Item D`);
        expect(down).toHaveBeenCalledWith(`Test Deleted Item E`);
      });

      it(`does not generate down steps for any further items`, () => {
        expect(down).toHaveBeenCalledTimes(10);
      });

      it(`generates up steps for added items`, () => {
        expect(up).toHaveBeenCalledWith(`Test Added Item A`);
        expect(up).toHaveBeenCalledWith(`Test Added Item B`);
        expect(up).toHaveBeenCalledWith(`Test Added Item C`);
        expect(up).toHaveBeenCalledWith(`Test Added Item D`);
      });

      it(`generates up steps for unchanged items`, () => {
        expect(up).toHaveBeenCalledWith(`Test Unchanged Item A`);
        expect(up).toHaveBeenCalledWith(`Test Unchanged Item B`);
        expect(up).toHaveBeenCalledWith(`Test Unchanged Item C`);
      });

      it(`generates up steps for changed items`, () => {
        expect(up).toHaveBeenCalledWith(`Test Changed Item A`);
        expect(up).toHaveBeenCalledWith(`Test Changed Item B`);
      });

      it(`does not generate up steps for any further items`, () => {
        expect(up).toHaveBeenCalledTimes(9);
      });

      it(`returns the expected tree of generated steps`, () => {
        expect(result).toEqual([
          new ParallelStep(`Test Name`, [
            new SerialStep(`Test Added Item A Name`, [
              testAddedAUpA,
              testAddedAUpB,
            ]),
            new SerialStep(`Test Added Item B Name`, [
              testAddedBUpA,
              testAddedBUpB,
              testAddedBUpC,
              testAddedBUpD,
            ]),
            new SerialStep(`Test Added Item C Name`, [
              testAddedCUpA,
              testAddedCUpB,
              testAddedCUpC,
              testAddedCUpD,
            ]),
            new SerialStep(`Test Added Item D Name`, [
              testAddedDUpA,
              testAddedDUpB,
              testAddedDUpC,
            ]),
            new SerialStep(`Test Unchanged Item A Name`, [
              testUnchangedADownA,
              testUnchangedADownB,
              testUnchangedADownC,
              testUnchangedAUpA,
              testUnchangedAUpB,
            ]),
            new SerialStep(`Test Unchanged Item B Name`, [
              testUnchangedBDownA,
              testUnchangedBDownB,
              testUnchangedBUpA,
              testUnchangedBUpB,
              testUnchangedBUpC,
              testUnchangedBUpD,
            ]),
            new SerialStep(`Test Unchanged Item C Name`, [
              testUnchangedCDownA,
              testUnchangedCDownB,
              testUnchangedCDownC,
              testUnchangedCUpA,
              testUnchangedCUpB,
              testUnchangedCUpC,
            ]),
            new SerialStep(`Test Changed Item A Name`, [
              testChangedADownA,
              testChangedADownB,
              testChangedAUpA,
              testChangedAUpB,
              testChangedAUpC,
            ]),
            new SerialStep(`Test Changed Item B Name`, [
              testChangedBDownA,
              testChangedBDownB,
              testChangedBDownC,
              testChangedBDownD,
              testChangedBUpA,
              testChangedBUpB,
            ]),
            new SerialStep(`Test Deleted Item A Name`, [
              testDeletedADownA,
              testDeletedADownB,
            ]),
            new SerialStep(`Test Deleted Item B Name`, [
              testDeletedBDownA,
              testDeletedBDownB,
              testDeletedBDownC,
            ]),
            new SerialStep(`Test Deleted Item C Name`, [
              testDeletedCDownA,
              testDeletedCDownB,
            ]),
            new SerialStep(`Test Deleted Item D Name`, [
              testDeletedDDownA,
              testDeletedDDownB,
              testDeletedDDownC,
            ]),
            new SerialStep(`Test Deleted Item E Name`, [
              testDeletedEDownA,
              testDeletedEDownB,
              testDeletedEDownC,
            ]),
          ]),
        ]);
      });

      it(`does not execute any of the generated steps`, () => {
        expect(testAddedAUpA.executePerActionStep).not.toHaveBeenCalled();
        expect(testAddedAUpB.executePerActionStep).not.toHaveBeenCalled();
        expect(testAddedBUpA.executePerActionStep).not.toHaveBeenCalled();
        expect(testAddedBUpB.executePerActionStep).not.toHaveBeenCalled();
        expect(testAddedBUpC.executePerActionStep).not.toHaveBeenCalled();
        expect(testAddedBUpD.executePerActionStep).not.toHaveBeenCalled();
        expect(testAddedCUpA.executePerActionStep).not.toHaveBeenCalled();
        expect(testAddedCUpB.executePerActionStep).not.toHaveBeenCalled();
        expect(testAddedCUpC.executePerActionStep).not.toHaveBeenCalled();
        expect(testAddedCUpD.executePerActionStep).not.toHaveBeenCalled();
        expect(testAddedDUpA.executePerActionStep).not.toHaveBeenCalled();
        expect(testAddedDUpB.executePerActionStep).not.toHaveBeenCalled();
        expect(testAddedDUpC.executePerActionStep).not.toHaveBeenCalled();
        expect(testUnchangedADownA.executePerActionStep).not.toHaveBeenCalled();
        expect(testUnchangedADownB.executePerActionStep).not.toHaveBeenCalled();
        expect(testUnchangedADownC.executePerActionStep).not.toHaveBeenCalled();
        expect(testUnchangedAUpA.executePerActionStep).not.toHaveBeenCalled();
        expect(testUnchangedAUpB.executePerActionStep).not.toHaveBeenCalled();
        expect(testUnchangedBDownA.executePerActionStep).not.toHaveBeenCalled();
        expect(testUnchangedBDownB.executePerActionStep).not.toHaveBeenCalled();
        expect(testUnchangedBUpA.executePerActionStep).not.toHaveBeenCalled();
        expect(testUnchangedBUpB.executePerActionStep).not.toHaveBeenCalled();
        expect(testUnchangedBUpC.executePerActionStep).not.toHaveBeenCalled();
        expect(testUnchangedBUpD.executePerActionStep).not.toHaveBeenCalled();
        expect(testUnchangedCDownA.executePerActionStep).not.toHaveBeenCalled();
        expect(testUnchangedCDownB.executePerActionStep).not.toHaveBeenCalled();
        expect(testUnchangedCDownC.executePerActionStep).not.toHaveBeenCalled();
        expect(testUnchangedCUpA.executePerActionStep).not.toHaveBeenCalled();
        expect(testUnchangedCUpB.executePerActionStep).not.toHaveBeenCalled();
        expect(testUnchangedCUpC.executePerActionStep).not.toHaveBeenCalled();
        expect(testChangedADownA.executePerActionStep).not.toHaveBeenCalled();
        expect(testChangedADownB.executePerActionStep).not.toHaveBeenCalled();
        expect(testChangedAUpA.executePerActionStep).not.toHaveBeenCalled();
        expect(testChangedAUpB.executePerActionStep).not.toHaveBeenCalled();
        expect(testChangedAUpC.executePerActionStep).not.toHaveBeenCalled();
        expect(testChangedBDownA.executePerActionStep).not.toHaveBeenCalled();
        expect(testChangedBDownB.executePerActionStep).not.toHaveBeenCalled();
        expect(testChangedBDownC.executePerActionStep).not.toHaveBeenCalled();
        expect(testChangedBDownD.executePerActionStep).not.toHaveBeenCalled();
        expect(testChangedBUpA.executePerActionStep).not.toHaveBeenCalled();
        expect(testChangedBUpB.executePerActionStep).not.toHaveBeenCalled();
        expect(testDeletedADownA.executePerActionStep).not.toHaveBeenCalled();
        expect(testDeletedADownB.executePerActionStep).not.toHaveBeenCalled();
        expect(testDeletedBDownA.executePerActionStep).not.toHaveBeenCalled();
        expect(testDeletedBDownB.executePerActionStep).not.toHaveBeenCalled();
        expect(testDeletedBDownC.executePerActionStep).not.toHaveBeenCalled();
        expect(testDeletedCDownA.executePerActionStep).not.toHaveBeenCalled();
        expect(testDeletedCDownB.executePerActionStep).not.toHaveBeenCalled();
        expect(testDeletedDDownA.executePerActionStep).not.toHaveBeenCalled();
        expect(testDeletedDDownB.executePerActionStep).not.toHaveBeenCalled();
        expect(testDeletedDDownC.executePerActionStep).not.toHaveBeenCalled();
        expect(testDeletedEDownA.executePerActionStep).not.toHaveBeenCalled();
        expect(testDeletedEDownB.executePerActionStep).not.toHaveBeenCalled();
        expect(testDeletedEDownC.executePerActionStep).not.toHaveBeenCalled();
      });
    });

    describe(`when only unchanged files and additions are present`, () => {
      let testAddedAUpA: Step;
      let testAddedAUpB: Step;
      let testAddedBUpA: Step;
      let testAddedBUpB: Step;
      let testAddedBUpC: Step;
      let testAddedBUpD: Step;
      let testAddedCUpA: Step;
      let testAddedCUpB: Step;
      let testAddedCUpC: Step;
      let testAddedCUpD: Step;
      let testAddedDUpA: Step;
      let testAddedDUpB: Step;
      let testAddedDUpC: Step;
      let testUnchangedADownA: Step;
      let testUnchangedADownB: Step;
      let testUnchangedADownC: Step;
      let testUnchangedAUpA: Step;
      let testUnchangedAUpB: Step;
      let testUnchangedBDownA: Step;
      let testUnchangedBDownB: Step;
      let testUnchangedBUpA: Step;
      let testUnchangedBUpB: Step;
      let testUnchangedBUpC: Step;
      let testUnchangedBUpD: Step;
      let testUnchangedCDownA: Step;
      let testUnchangedCDownB: Step;
      let testUnchangedCDownC: Step;
      let testUnchangedCUpA: Step;
      let testUnchangedCUpB: Step;
      let testUnchangedCUpC: Step;
      let extractName: jasmine.Spy;
      let down: jasmine.Spy;
      let up: jasmine.Spy;
      let result: ReadonlyArray<ParallelStep>;

      beforeAll(() => {
        testAddedAUpA = {
          name: `Test Added A Up A`,
          executePerActionStep: jasmine.createSpy(
            `testAddedAUpA.executePerActionStep`
          ),
        };
        testAddedAUpB = {
          name: `Test Added A Up B Step`,
          executePerActionStep: jasmine.createSpy(
            `testAddedAUpB.executePerActionStep`
          ),
        };
        testAddedBUpA = {
          name: `Test Added B Up A Step`,
          executePerActionStep: jasmine.createSpy(
            `testAddedBUpA.executePerActionStep`
          ),
        };
        testAddedBUpB = {
          name: `Test Added B Up B Step`,
          executePerActionStep: jasmine.createSpy(
            `testAddedBUpB.executePerActionStep`
          ),
        };
        testAddedBUpC = {
          name: `Test Added B Up C Step`,
          executePerActionStep: jasmine.createSpy(
            `testAddedBUpC.executePerActionStep`
          ),
        };
        testAddedBUpD = {
          name: `Test Added B Up D Step`,
          executePerActionStep: jasmine.createSpy(
            `testAddedBUpD.executePerActionStep`
          ),
        };
        testAddedCUpA = {
          name: `Test Added C Up A Step`,
          executePerActionStep: jasmine.createSpy(
            `testAddedCUpA.executePerActionStep`
          ),
        };
        testAddedCUpB = {
          name: `Test Added C Up B Step`,
          executePerActionStep: jasmine.createSpy(
            `testAddedCUpB.executePerActionStep`
          ),
        };
        testAddedCUpC = {
          name: `Test Added C Up C Step`,
          executePerActionStep: jasmine.createSpy(
            `testAddedCUpC.executePerActionStep`
          ),
        };
        testAddedCUpD = {
          name: `Test Added C Up D Step`,
          executePerActionStep: jasmine.createSpy(
            `testAddedCUpD.executePerActionStep`
          ),
        };
        testAddedDUpA = {
          name: `Test Added D Up A Step`,
          executePerActionStep: jasmine.createSpy(
            `testAddedDUpA.executePerActionStep`
          ),
        };
        testAddedDUpB = {
          name: `Test Added D Up B Step`,
          executePerActionStep: jasmine.createSpy(
            `testAddedDUpB.executePerActionStep`
          ),
        };
        testAddedDUpC = {
          name: `Test Added D Up C Step`,
          executePerActionStep: jasmine.createSpy(
            `testAddedDUpC.executePerActionStep`
          ),
        };
        testUnchangedADownA = {
          name: `Test Unchanged A Down A Step`,
          executePerActionStep: jasmine.createSpy(
            `testUnchangedADownA.executePerActionStep`
          ),
        };
        testUnchangedADownB = {
          name: `Test Unchanged A Down B Step`,
          executePerActionStep: jasmine.createSpy(
            `testUnchangedADownB.executePerActionStep`
          ),
        };
        testUnchangedADownC = {
          name: `Test Unchanged A Down C Step`,
          executePerActionStep: jasmine.createSpy(
            `testUnchangedADownC.executePerActionStep`
          ),
        };
        testUnchangedAUpA = {
          name: `Test Unchanged A Up A Step`,
          executePerActionStep: jasmine.createSpy(
            `testUnchangedAUpA.executePerActionStep`
          ),
        };
        testUnchangedAUpB = {
          name: `Test Unchanged A Up B Step`,
          executePerActionStep: jasmine.createSpy(
            `testUnchangedAUpB.executePerActionStep`
          ),
        };
        testUnchangedBDownA = {
          name: `Test Unchanged B Down A Step`,
          executePerActionStep: jasmine.createSpy(
            `testUnchangedBDownA.executePerActionStep`
          ),
        };
        testUnchangedBDownB = {
          name: `Test Unchanged B Down B Step`,
          executePerActionStep: jasmine.createSpy(
            `testUnchangedBDownB.executePerActionStep`
          ),
        };
        testUnchangedBUpA = {
          name: `Test Unchanged B Up A Step`,
          executePerActionStep: jasmine.createSpy(
            `testUnchangedBUpA.executePerActionStep`
          ),
        };
        testUnchangedBUpB = {
          name: `Test Unchanged B Up B Step`,
          executePerActionStep: jasmine.createSpy(
            `testUnchangedBUpB.executePerActionStep`
          ),
        };
        testUnchangedBUpC = {
          name: `Test Unchanged B Up C Step`,
          executePerActionStep: jasmine.createSpy(
            `testUnchangedBUpC.executePerActionStep`
          ),
        };
        testUnchangedBUpD = {
          name: `Test Unchanged B Up D Step`,
          executePerActionStep: jasmine.createSpy(
            `testUnchangedBUpD.executePerActionStep`
          ),
        };
        testUnchangedCDownA = {
          name: `Test Unchanged C Down A Step`,
          executePerActionStep: jasmine.createSpy(
            `testUnchangedCDownA.executePerActionStep`
          ),
        };
        testUnchangedCDownB = {
          name: `Test Unchanged C Down B Step`,
          executePerActionStep: jasmine.createSpy(
            `testUnchangedCDownB.executePerActionStep`
          ),
        };
        testUnchangedCDownC = {
          name: `Test Unchanged C Down C Step`,
          executePerActionStep: jasmine.createSpy(
            `testUnchangedCDownC.executePerActionStep`
          ),
        };
        testUnchangedCUpA = {
          name: `Test Unchanged C Up A Step`,
          executePerActionStep: jasmine.createSpy(
            `testUnchangedCUpA.executePerActionStep`
          ),
        };
        testUnchangedCUpB = {
          name: `Test Unchanged C Up B Step`,
          executePerActionStep: jasmine.createSpy(
            `testUnchangedCUpB.executePerActionStep`
          ),
        };
        testUnchangedCUpC = {
          name: `Test Unchanged C Up C Step`,
          executePerActionStep: jasmine.createSpy(
            `testUnchangedCUpC.executePerActionStep`
          ),
        };

        extractName = jasmine.createSpy(`extractName`).and.callFake((item) => {
          switch (item) {
            case `Test Added Item A`:
              return `Test Added Item A Name`;

            case `Test Added Item B`:
              return `Test Added Item B Name`;

            case `Test Added Item C`:
              return `Test Added Item C Name`;

            case `Test Added Item D`:
              return `Test Added Item D Name`;

            case `Test Unchanged Item A`:
              return `Test Unchanged Item A Name`;

            case `Test Unchanged Item B`:
              return `Test Unchanged Item B Name`;

            case `Test Unchanged Item C`:
              return `Test Unchanged Item C Name`;

            default:
              throw new Error(`Unexpected item ${item}.`);
          }
        });

        down = jasmine.createSpy(`down`).and.callFake((item) => {
          switch (item) {
            case `Test Unchanged Item A`:
              return [
                testUnchangedADownA,
                testUnchangedADownB,
                testUnchangedADownC,
              ];

            case `Test Unchanged Item B`:
              return [testUnchangedBDownA, testUnchangedBDownB];

            case `Test Unchanged Item C`:
              return [
                testUnchangedCDownA,
                testUnchangedCDownB,
                testUnchangedCDownC,
              ];

            default:
              throw new Error(`Unexpected item ${item}.`);
          }
        });

        up = jasmine.createSpy(`up`).and.callFake((item) => {
          switch (item) {
            case `Test Added Item A`:
              return [testAddedAUpA, testAddedAUpB];

            case `Test Added Item B`:
              return [
                testAddedBUpA,
                testAddedBUpB,
                testAddedBUpC,
                testAddedBUpD,
              ];

            case `Test Added Item C`:
              return [
                testAddedCUpA,
                testAddedCUpB,
                testAddedCUpC,
                testAddedCUpD,
              ];

            case `Test Added Item D`:
              return [testAddedDUpA, testAddedDUpB, testAddedDUpC];

            case `Test Unchanged Item A`:
              return [testUnchangedAUpA, testUnchangedAUpB];

            case `Test Unchanged Item B`:
              return [
                testUnchangedBUpA,
                testUnchangedBUpB,
                testUnchangedBUpC,
                testUnchangedBUpD,
              ];

            case `Test Unchanged Item C`:
              return [testUnchangedCUpA, testUnchangedCUpB, testUnchangedCUpC];

            default:
              throw new Error(`Unexpected item ${item}.`);
          }
        });

        const diff: Diff<TestItem> = {
          added: [
            `Test Added Item A`,
            `Test Added Item B`,
            `Test Added Item C`,
            `Test Added Item D`,
          ],
          changed: [],
          unchanged: [
            `Test Unchanged Item A`,
            `Test Unchanged Item B`,
            `Test Unchanged Item C`,
          ],
          deleted: [],
        };

        result = generateSteps(`Test Name`, true, diff, extractName, down, up);
      });

      it(`extracts the names of the added items`, () => {
        expect(extractName).toHaveBeenCalledWith(`Test Added Item A`);
        expect(extractName).toHaveBeenCalledWith(`Test Added Item B`);
        expect(extractName).toHaveBeenCalledWith(`Test Added Item C`);
        expect(extractName).toHaveBeenCalledWith(`Test Added Item D`);
      });

      it(`extracts the names of the unchanged items`, () => {
        expect(extractName).toHaveBeenCalledWith(`Test Unchanged Item A`);
        expect(extractName).toHaveBeenCalledWith(`Test Unchanged Item B`);
        expect(extractName).toHaveBeenCalledWith(`Test Unchanged Item C`);
      });

      it(`does not extract the names of any further items`, () => {
        expect(extractName).toHaveBeenCalledTimes(7);
      });

      it(`generates down steps for unchanged items`, () => {
        expect(down).toHaveBeenCalledWith(`Test Unchanged Item A`);
        expect(down).toHaveBeenCalledWith(`Test Unchanged Item B`);
        expect(down).toHaveBeenCalledWith(`Test Unchanged Item C`);
      });

      it(`does not generate down steps for any further items`, () => {
        expect(down).toHaveBeenCalledTimes(3);
      });

      it(`generates up steps for added items`, () => {
        expect(up).toHaveBeenCalledWith(`Test Added Item A`);
        expect(up).toHaveBeenCalledWith(`Test Added Item B`);
        expect(up).toHaveBeenCalledWith(`Test Added Item C`);
        expect(up).toHaveBeenCalledWith(`Test Added Item D`);
      });

      it(`generates up steps for unchanged items`, () => {
        expect(up).toHaveBeenCalledWith(`Test Unchanged Item A`);
        expect(up).toHaveBeenCalledWith(`Test Unchanged Item B`);
        expect(up).toHaveBeenCalledWith(`Test Unchanged Item C`);
      });

      it(`does not generate up steps for any further items`, () => {
        expect(up).toHaveBeenCalledTimes(7);
      });

      it(`returns the expected tree of generated steps`, () => {
        expect(result).toEqual([
          new ParallelStep(`Test Name`, [
            new SerialStep(`Test Added Item A Name`, [
              testAddedAUpA,
              testAddedAUpB,
            ]),
            new SerialStep(`Test Added Item B Name`, [
              testAddedBUpA,
              testAddedBUpB,
              testAddedBUpC,
              testAddedBUpD,
            ]),
            new SerialStep(`Test Added Item C Name`, [
              testAddedCUpA,
              testAddedCUpB,
              testAddedCUpC,
              testAddedCUpD,
            ]),
            new SerialStep(`Test Added Item D Name`, [
              testAddedDUpA,
              testAddedDUpB,
              testAddedDUpC,
            ]),
            new SerialStep(`Test Unchanged Item A Name`, [
              testUnchangedADownA,
              testUnchangedADownB,
              testUnchangedADownC,
              testUnchangedAUpA,
              testUnchangedAUpB,
            ]),
            new SerialStep(`Test Unchanged Item B Name`, [
              testUnchangedBDownA,
              testUnchangedBDownB,
              testUnchangedBUpA,
              testUnchangedBUpB,
              testUnchangedBUpC,
              testUnchangedBUpD,
            ]),
            new SerialStep(`Test Unchanged Item C Name`, [
              testUnchangedCDownA,
              testUnchangedCDownB,
              testUnchangedCDownC,
              testUnchangedCUpA,
              testUnchangedCUpB,
              testUnchangedCUpC,
            ]),
          ]),
        ]);
      });

      it(`does not execute any of the generated steps`, () => {
        expect(testAddedAUpA.executePerActionStep).not.toHaveBeenCalled();
        expect(testAddedAUpB.executePerActionStep).not.toHaveBeenCalled();
        expect(testAddedBUpA.executePerActionStep).not.toHaveBeenCalled();
        expect(testAddedBUpB.executePerActionStep).not.toHaveBeenCalled();
        expect(testAddedBUpC.executePerActionStep).not.toHaveBeenCalled();
        expect(testAddedBUpD.executePerActionStep).not.toHaveBeenCalled();
        expect(testAddedCUpA.executePerActionStep).not.toHaveBeenCalled();
        expect(testAddedCUpB.executePerActionStep).not.toHaveBeenCalled();
        expect(testAddedCUpC.executePerActionStep).not.toHaveBeenCalled();
        expect(testAddedCUpD.executePerActionStep).not.toHaveBeenCalled();
        expect(testAddedDUpA.executePerActionStep).not.toHaveBeenCalled();
        expect(testAddedDUpB.executePerActionStep).not.toHaveBeenCalled();
        expect(testAddedDUpC.executePerActionStep).not.toHaveBeenCalled();
        expect(testUnchangedADownA.executePerActionStep).not.toHaveBeenCalled();
        expect(testUnchangedADownB.executePerActionStep).not.toHaveBeenCalled();
        expect(testUnchangedADownC.executePerActionStep).not.toHaveBeenCalled();
        expect(testUnchangedAUpA.executePerActionStep).not.toHaveBeenCalled();
        expect(testUnchangedAUpB.executePerActionStep).not.toHaveBeenCalled();
        expect(testUnchangedBDownA.executePerActionStep).not.toHaveBeenCalled();
        expect(testUnchangedBDownB.executePerActionStep).not.toHaveBeenCalled();
        expect(testUnchangedBUpA.executePerActionStep).not.toHaveBeenCalled();
        expect(testUnchangedBUpB.executePerActionStep).not.toHaveBeenCalled();
        expect(testUnchangedBUpC.executePerActionStep).not.toHaveBeenCalled();
        expect(testUnchangedBUpD.executePerActionStep).not.toHaveBeenCalled();
        expect(testUnchangedCDownA.executePerActionStep).not.toHaveBeenCalled();
        expect(testUnchangedCDownB.executePerActionStep).not.toHaveBeenCalled();
        expect(testUnchangedCDownC.executePerActionStep).not.toHaveBeenCalled();
        expect(testUnchangedCUpA.executePerActionStep).not.toHaveBeenCalled();
        expect(testUnchangedCUpB.executePerActionStep).not.toHaveBeenCalled();
        expect(testUnchangedCUpC.executePerActionStep).not.toHaveBeenCalled();
      });
    });

    describe(`when only unchanged files and changes are present`, () => {
      let testUnchangedADownA: Step;
      let testUnchangedADownB: Step;
      let testUnchangedADownC: Step;
      let testUnchangedAUpA: Step;
      let testUnchangedAUpB: Step;
      let testUnchangedBDownA: Step;
      let testUnchangedBDownB: Step;
      let testUnchangedBUpA: Step;
      let testUnchangedBUpB: Step;
      let testUnchangedBUpC: Step;
      let testUnchangedBUpD: Step;
      let testUnchangedCDownA: Step;
      let testUnchangedCDownB: Step;
      let testUnchangedCDownC: Step;
      let testUnchangedCUpA: Step;
      let testUnchangedCUpB: Step;
      let testUnchangedCUpC: Step;
      let testChangedADownA: Step;
      let testChangedADownB: Step;
      let testChangedAUpA: Step;
      let testChangedAUpB: Step;
      let testChangedAUpC: Step;
      let testChangedBDownA: Step;
      let testChangedBDownB: Step;
      let testChangedBDownC: Step;
      let testChangedBDownD: Step;
      let testChangedBUpA: Step;
      let testChangedBUpB: Step;
      let extractName: jasmine.Spy;
      let down: jasmine.Spy;
      let up: jasmine.Spy;
      let result: ReadonlyArray<ParallelStep>;

      beforeAll(() => {
        testUnchangedADownA = {
          name: `Test Unchanged A Down A Step`,
          executePerActionStep: jasmine.createSpy(
            `testUnchangedADownA.executePerActionStep`
          ),
        };
        testUnchangedADownB = {
          name: `Test Unchanged A Down B Step`,
          executePerActionStep: jasmine.createSpy(
            `testUnchangedADownB.executePerActionStep`
          ),
        };
        testUnchangedADownC = {
          name: `Test Unchanged A Down C Step`,
          executePerActionStep: jasmine.createSpy(
            `testUnchangedADownC.executePerActionStep`
          ),
        };
        testUnchangedAUpA = {
          name: `Test Unchanged A Up A Step`,
          executePerActionStep: jasmine.createSpy(
            `testUnchangedAUpA.executePerActionStep`
          ),
        };
        testUnchangedAUpB = {
          name: `Test Unchanged A Up B Step`,
          executePerActionStep: jasmine.createSpy(
            `testUnchangedAUpB.executePerActionStep`
          ),
        };
        testUnchangedBDownA = {
          name: `Test Unchanged B Down A Step`,
          executePerActionStep: jasmine.createSpy(
            `testUnchangedBDownA.executePerActionStep`
          ),
        };
        testUnchangedBDownB = {
          name: `Test Unchanged B Down B Step`,
          executePerActionStep: jasmine.createSpy(
            `testUnchangedBDownB.executePerActionStep`
          ),
        };
        testUnchangedBUpA = {
          name: `Test Unchanged B Up A Step`,
          executePerActionStep: jasmine.createSpy(
            `testUnchangedBUpA.executePerActionStep`
          ),
        };
        testUnchangedBUpB = {
          name: `Test Unchanged B Up B Step`,
          executePerActionStep: jasmine.createSpy(
            `testUnchangedBUpB.executePerActionStep`
          ),
        };
        testUnchangedBUpC = {
          name: `Test Unchanged B Up C Step`,
          executePerActionStep: jasmine.createSpy(
            `testUnchangedBUpC.executePerActionStep`
          ),
        };
        testUnchangedBUpD = {
          name: `Test Unchanged B Up D Step`,
          executePerActionStep: jasmine.createSpy(
            `testUnchangedBUpD.executePerActionStep`
          ),
        };
        testUnchangedCDownA = {
          name: `Test Unchanged C Down A Step`,
          executePerActionStep: jasmine.createSpy(
            `testUnchangedCDownA.executePerActionStep`
          ),
        };
        testUnchangedCDownB = {
          name: `Test Unchanged C Down B Step`,
          executePerActionStep: jasmine.createSpy(
            `testUnchangedCDownB.executePerActionStep`
          ),
        };
        testUnchangedCDownC = {
          name: `Test Unchanged C Down C Step`,
          executePerActionStep: jasmine.createSpy(
            `testUnchangedCDownC.executePerActionStep`
          ),
        };
        testUnchangedCUpA = {
          name: `Test Unchanged C Up A Step`,
          executePerActionStep: jasmine.createSpy(
            `testUnchangedCUpA.executePerActionStep`
          ),
        };
        testUnchangedCUpB = {
          name: `Test Unchanged C Up B Step`,
          executePerActionStep: jasmine.createSpy(
            `testUnchangedCUpB.executePerActionStep`
          ),
        };
        testUnchangedCUpC = {
          name: `Test Unchanged C Up C Step`,
          executePerActionStep: jasmine.createSpy(
            `testUnchangedCUpC.executePerActionStep`
          ),
        };
        testChangedADownA = {
          name: `Test Changed A Down A Step`,
          executePerActionStep: jasmine.createSpy(
            `testChangedADownA.executePerActionStep`
          ),
        };
        testChangedADownB = {
          name: `Test Changed A Down B Step`,
          executePerActionStep: jasmine.createSpy(
            `testChangedADownB.executePerActionStep`
          ),
        };
        testChangedAUpA = {
          name: `Test Changed A Up A Step`,
          executePerActionStep: jasmine.createSpy(
            `testChangedAUpA.executePerActionStep`
          ),
        };
        testChangedAUpB = {
          name: `Test Changed A Up B Step`,
          executePerActionStep: jasmine.createSpy(
            `testChangedAUpB.executePerActionStep`
          ),
        };
        testChangedAUpC = {
          name: `Test Changed A Up C Step`,
          executePerActionStep: jasmine.createSpy(
            `testChangedAUpC.executePerActionStep`
          ),
        };
        testChangedBDownA = {
          name: `Test Changed B Down A Step`,
          executePerActionStep: jasmine.createSpy(
            `testChangedBDownA.executePerActionStep`
          ),
        };
        testChangedBDownB = {
          name: `Test Changed B Down B Step`,
          executePerActionStep: jasmine.createSpy(
            `testChangedBDownB.executePerActionStep`
          ),
        };
        testChangedBDownC = {
          name: `Test Changed B Down C Step`,
          executePerActionStep: jasmine.createSpy(
            `testChangedBDownC.executePerActionStep`
          ),
        };
        testChangedBDownD = {
          name: `Test Changed B Down D Step`,
          executePerActionStep: jasmine.createSpy(
            `testChangedBDownD.executePerActionStep`
          ),
        };
        testChangedBUpA = {
          name: `Test Changed B Up A Step`,
          executePerActionStep: jasmine.createSpy(
            `testChangedBUpA.executePerActionStep`
          ),
        };
        testChangedBUpB = {
          name: `Test Changed B Up B Step`,
          executePerActionStep: jasmine.createSpy(
            `testChangedBUpB.executePerActionStep`
          ),
        };

        extractName = jasmine.createSpy(`extractName`).and.callFake((item) => {
          switch (item) {
            case `Test Unchanged Item A`:
              return `Test Unchanged Item A Name`;

            case `Test Unchanged Item B`:
              return `Test Unchanged Item B Name`;

            case `Test Unchanged Item C`:
              return `Test Unchanged Item C Name`;

            case `Test Changed Item A`:
              return `Test Changed Item A Name`;

            case `Test Changed Item B`:
              return `Test Changed Item B Name`;

            default:
              throw new Error(`Unexpected item ${item}.`);
          }
        });

        down = jasmine.createSpy(`down`).and.callFake((item) => {
          switch (item) {
            case `Test Unchanged Item A`:
              return [
                testUnchangedADownA,
                testUnchangedADownB,
                testUnchangedADownC,
              ];

            case `Test Unchanged Item B`:
              return [testUnchangedBDownA, testUnchangedBDownB];

            case `Test Unchanged Item C`:
              return [
                testUnchangedCDownA,
                testUnchangedCDownB,
                testUnchangedCDownC,
              ];

            case `Test Changed Item A`:
              return [testChangedADownA, testChangedADownB];

            case `Test Changed Item B`:
              return [
                testChangedBDownA,
                testChangedBDownB,
                testChangedBDownC,
                testChangedBDownD,
              ];

            default:
              throw new Error(`Unexpected item ${item}.`);
          }
        });

        up = jasmine.createSpy(`up`).and.callFake((item) => {
          switch (item) {
            case `Test Unchanged Item A`:
              return [testUnchangedAUpA, testUnchangedAUpB];

            case `Test Unchanged Item B`:
              return [
                testUnchangedBUpA,
                testUnchangedBUpB,
                testUnchangedBUpC,
                testUnchangedBUpD,
              ];

            case `Test Unchanged Item C`:
              return [testUnchangedCUpA, testUnchangedCUpB, testUnchangedCUpC];

            case `Test Changed Item A`:
              return [testChangedAUpA, testChangedAUpB, testChangedAUpC];

            case `Test Changed Item B`:
              return [testChangedBUpA, testChangedBUpB];

            default:
              throw new Error(`Unexpected item ${item}.`);
          }
        });

        const diff: Diff<TestItem> = {
          added: [],
          changed: [`Test Changed Item A`, `Test Changed Item B`],
          unchanged: [
            `Test Unchanged Item A`,
            `Test Unchanged Item B`,
            `Test Unchanged Item C`,
          ],
          deleted: [],
        };

        result = generateSteps(`Test Name`, true, diff, extractName, down, up);
      });

      it(`extracts the names of the unchanged items`, () => {
        expect(extractName).toHaveBeenCalledWith(`Test Unchanged Item A`);
        expect(extractName).toHaveBeenCalledWith(`Test Unchanged Item B`);
        expect(extractName).toHaveBeenCalledWith(`Test Unchanged Item C`);
      });

      it(`extracts the names of the changed items`, () => {
        expect(extractName).toHaveBeenCalledWith(`Test Changed Item A`);
        expect(extractName).toHaveBeenCalledWith(`Test Changed Item B`);
      });

      it(`does not extract the names of any further items`, () => {
        expect(extractName).toHaveBeenCalledTimes(5);
      });

      it(`generates down steps for unchanged items`, () => {
        expect(down).toHaveBeenCalledWith(`Test Unchanged Item A`);
        expect(down).toHaveBeenCalledWith(`Test Unchanged Item B`);
        expect(down).toHaveBeenCalledWith(`Test Unchanged Item C`);
      });

      it(`generates down steps for changed items`, () => {
        expect(down).toHaveBeenCalledWith(`Test Changed Item A`);
        expect(down).toHaveBeenCalledWith(`Test Changed Item B`);
      });

      it(`does not generate down steps for any further items`, () => {
        expect(down).toHaveBeenCalledTimes(5);
      });

      it(`generates up steps for unchanged items`, () => {
        expect(up).toHaveBeenCalledWith(`Test Unchanged Item A`);
        expect(up).toHaveBeenCalledWith(`Test Unchanged Item B`);
        expect(up).toHaveBeenCalledWith(`Test Unchanged Item C`);
      });

      it(`generates up steps for changed items`, () => {
        expect(up).toHaveBeenCalledWith(`Test Changed Item A`);
        expect(up).toHaveBeenCalledWith(`Test Changed Item B`);
      });

      it(`does not generate up steps for any further items`, () => {
        expect(up).toHaveBeenCalledTimes(5);
      });

      it(`returns the expected tree of generated steps`, () => {
        expect(result).toEqual([
          new ParallelStep(`Test Name`, [
            new SerialStep(`Test Unchanged Item A Name`, [
              testUnchangedADownA,
              testUnchangedADownB,
              testUnchangedADownC,
              testUnchangedAUpA,
              testUnchangedAUpB,
            ]),
            new SerialStep(`Test Unchanged Item B Name`, [
              testUnchangedBDownA,
              testUnchangedBDownB,
              testUnchangedBUpA,
              testUnchangedBUpB,
              testUnchangedBUpC,
              testUnchangedBUpD,
            ]),
            new SerialStep(`Test Unchanged Item C Name`, [
              testUnchangedCDownA,
              testUnchangedCDownB,
              testUnchangedCDownC,
              testUnchangedCUpA,
              testUnchangedCUpB,
              testUnchangedCUpC,
            ]),
            new SerialStep(`Test Changed Item A Name`, [
              testChangedADownA,
              testChangedADownB,
              testChangedAUpA,
              testChangedAUpB,
              testChangedAUpC,
            ]),
            new SerialStep(`Test Changed Item B Name`, [
              testChangedBDownA,
              testChangedBDownB,
              testChangedBDownC,
              testChangedBDownD,
              testChangedBUpA,
              testChangedBUpB,
            ]),
          ]),
        ]);
      });

      it(`does not execute any of the generated steps`, () => {
        expect(testUnchangedADownA.executePerActionStep).not.toHaveBeenCalled();
        expect(testUnchangedADownB.executePerActionStep).not.toHaveBeenCalled();
        expect(testUnchangedADownC.executePerActionStep).not.toHaveBeenCalled();
        expect(testUnchangedAUpA.executePerActionStep).not.toHaveBeenCalled();
        expect(testUnchangedAUpB.executePerActionStep).not.toHaveBeenCalled();
        expect(testUnchangedBDownA.executePerActionStep).not.toHaveBeenCalled();
        expect(testUnchangedBDownB.executePerActionStep).not.toHaveBeenCalled();
        expect(testUnchangedBUpA.executePerActionStep).not.toHaveBeenCalled();
        expect(testUnchangedBUpB.executePerActionStep).not.toHaveBeenCalled();
        expect(testUnchangedBUpC.executePerActionStep).not.toHaveBeenCalled();
        expect(testUnchangedBUpD.executePerActionStep).not.toHaveBeenCalled();
        expect(testUnchangedCDownA.executePerActionStep).not.toHaveBeenCalled();
        expect(testUnchangedCDownB.executePerActionStep).not.toHaveBeenCalled();
        expect(testUnchangedCDownC.executePerActionStep).not.toHaveBeenCalled();
        expect(testUnchangedCUpA.executePerActionStep).not.toHaveBeenCalled();
        expect(testUnchangedCUpB.executePerActionStep).not.toHaveBeenCalled();
        expect(testUnchangedCUpC.executePerActionStep).not.toHaveBeenCalled();
        expect(testChangedADownA.executePerActionStep).not.toHaveBeenCalled();
        expect(testChangedADownB.executePerActionStep).not.toHaveBeenCalled();
        expect(testChangedAUpA.executePerActionStep).not.toHaveBeenCalled();
        expect(testChangedAUpB.executePerActionStep).not.toHaveBeenCalled();
        expect(testChangedAUpC.executePerActionStep).not.toHaveBeenCalled();
        expect(testChangedBDownA.executePerActionStep).not.toHaveBeenCalled();
        expect(testChangedBDownB.executePerActionStep).not.toHaveBeenCalled();
        expect(testChangedBDownC.executePerActionStep).not.toHaveBeenCalled();
        expect(testChangedBDownD.executePerActionStep).not.toHaveBeenCalled();
        expect(testChangedBUpA.executePerActionStep).not.toHaveBeenCalled();
        expect(testChangedBUpB.executePerActionStep).not.toHaveBeenCalled();
      });
    });

    describe(`when only unchanged files and deletions are present`, () => {
      let testUnchangedADownA: Step;
      let testUnchangedADownB: Step;
      let testUnchangedADownC: Step;
      let testUnchangedAUpA: Step;
      let testUnchangedAUpB: Step;
      let testUnchangedBDownA: Step;
      let testUnchangedBDownB: Step;
      let testUnchangedBUpA: Step;
      let testUnchangedBUpB: Step;
      let testUnchangedBUpC: Step;
      let testUnchangedBUpD: Step;
      let testUnchangedCDownA: Step;
      let testUnchangedCDownB: Step;
      let testUnchangedCDownC: Step;
      let testUnchangedCUpA: Step;
      let testUnchangedCUpB: Step;
      let testUnchangedCUpC: Step;
      let testDeletedADownA: Step;
      let testDeletedADownB: Step;
      let testDeletedBDownA: Step;
      let testDeletedBDownB: Step;
      let testDeletedBDownC: Step;
      let testDeletedCDownA: Step;
      let testDeletedCDownB: Step;
      let testDeletedDDownA: Step;
      let testDeletedDDownB: Step;
      let testDeletedDDownC: Step;
      let testDeletedEDownA: Step;
      let testDeletedEDownB: Step;
      let testDeletedEDownC: Step;
      let extractName: jasmine.Spy;
      let down: jasmine.Spy;
      let up: jasmine.Spy;
      let result: ReadonlyArray<ParallelStep>;

      beforeAll(() => {
        testUnchangedADownA = {
          name: `Test Unchanged A Down A Step`,
          executePerActionStep: jasmine.createSpy(
            `testUnchangedADownA.executePerActionStep`
          ),
        };
        testUnchangedADownB = {
          name: `Test Unchanged A Down B Step`,
          executePerActionStep: jasmine.createSpy(
            `testUnchangedADownB.executePerActionStep`
          ),
        };
        testUnchangedADownC = {
          name: `Test Unchanged A Down C Step`,
          executePerActionStep: jasmine.createSpy(
            `testUnchangedADownC.executePerActionStep`
          ),
        };
        testUnchangedAUpA = {
          name: `Test Unchanged A Up A Step`,
          executePerActionStep: jasmine.createSpy(
            `testUnchangedAUpA.executePerActionStep`
          ),
        };
        testUnchangedAUpB = {
          name: `Test Unchanged A Up B Step`,
          executePerActionStep: jasmine.createSpy(
            `testUnchangedAUpB.executePerActionStep`
          ),
        };
        testUnchangedBDownA = {
          name: `Test Unchanged B Down A Step`,
          executePerActionStep: jasmine.createSpy(
            `testUnchangedBDownA.executePerActionStep`
          ),
        };
        testUnchangedBDownB = {
          name: `Test Unchanged B Down B Step`,
          executePerActionStep: jasmine.createSpy(
            `testUnchangedBDownB.executePerActionStep`
          ),
        };
        testUnchangedBUpA = {
          name: `Test Unchanged B Up A Step`,
          executePerActionStep: jasmine.createSpy(
            `testUnchangedBUpA.executePerActionStep`
          ),
        };
        testUnchangedBUpB = {
          name: `Test Unchanged B Up B Step`,
          executePerActionStep: jasmine.createSpy(
            `testUnchangedBUpB.executePerActionStep`
          ),
        };
        testUnchangedBUpC = {
          name: `Test Unchanged B Up C Step`,
          executePerActionStep: jasmine.createSpy(
            `testUnchangedBUpC.executePerActionStep`
          ),
        };
        testUnchangedBUpD = {
          name: `Test Unchanged B Up D Step`,
          executePerActionStep: jasmine.createSpy(
            `testUnchangedBUpD.executePerActionStep`
          ),
        };
        testUnchangedCDownA = {
          name: `Test Unchanged C Down A Step`,
          executePerActionStep: jasmine.createSpy(
            `testUnchangedCDownA.executePerActionStep`
          ),
        };
        testUnchangedCDownB = {
          name: `Test Unchanged C Down B Step`,
          executePerActionStep: jasmine.createSpy(
            `testUnchangedCDownB.executePerActionStep`
          ),
        };
        testUnchangedCDownC = {
          name: `Test Unchanged C Down C Step`,
          executePerActionStep: jasmine.createSpy(
            `testUnchangedCDownC.executePerActionStep`
          ),
        };
        testUnchangedCUpA = {
          name: `Test Unchanged C Up A Step`,
          executePerActionStep: jasmine.createSpy(
            `testUnchangedCUpA.executePerActionStep`
          ),
        };
        testUnchangedCUpB = {
          name: `Test Unchanged C Up B Step`,
          executePerActionStep: jasmine.createSpy(
            `testUnchangedCUpB.executePerActionStep`
          ),
        };
        testUnchangedCUpC = {
          name: `Test Unchanged C Up C Step`,
          executePerActionStep: jasmine.createSpy(
            `testUnchangedCUpC.executePerActionStep`
          ),
        };
        testDeletedADownA = {
          name: `Test Deleted A Down A Step`,
          executePerActionStep: jasmine.createSpy(
            `testDeletedADownA.executePerActionStep`
          ),
        };
        testDeletedADownB = {
          name: `Test Deleted A Down B Step`,
          executePerActionStep: jasmine.createSpy(
            `testDeletedADownB.executePerActionStep`
          ),
        };
        testDeletedBDownA = {
          name: `Test Deleted B Down A Step`,
          executePerActionStep: jasmine.createSpy(
            `testDeletedBDownA.executePerActionStep`
          ),
        };
        testDeletedBDownB = {
          name: `Test Deleted B Down B Step`,
          executePerActionStep: jasmine.createSpy(
            `testDeletedBDownB.executePerActionStep`
          ),
        };
        testDeletedBDownC = {
          name: `Test Deleted B Down C Step`,
          executePerActionStep: jasmine.createSpy(
            `testDeletedBDownC.executePerActionStep`
          ),
        };
        testDeletedCDownA = {
          name: `Test Deleted C Down A Step`,
          executePerActionStep: jasmine.createSpy(
            `testDeletedCDownA.executePerActionStep`
          ),
        };
        testDeletedCDownB = {
          name: `Test Deleted C Down B Step`,
          executePerActionStep: jasmine.createSpy(
            `testDeletedCDownB.executePerActionStep`
          ),
        };
        testDeletedDDownA = {
          name: `Test Deleted D Down A Step`,
          executePerActionStep: jasmine.createSpy(
            `testDeletedDDownA.executePerActionStep`
          ),
        };
        testDeletedDDownB = {
          name: `Test Deleted D Down B Step`,
          executePerActionStep: jasmine.createSpy(
            `testDeletedDDownB.executePerActionStep`
          ),
        };
        testDeletedDDownC = {
          name: `Test Deleted D Down C Step`,
          executePerActionStep: jasmine.createSpy(
            `testDeletedDDownC.executePerActionStep`
          ),
        };
        testDeletedEDownA = {
          name: `Test Deleted E Down A Step`,
          executePerActionStep: jasmine.createSpy(
            `testDeletedEDownA.executePerActionStep`
          ),
        };
        testDeletedEDownB = {
          name: `Test Deleted E Down B Step`,
          executePerActionStep: jasmine.createSpy(
            `testDeletedDDownB.executePerActionStep`
          ),
        };
        testDeletedEDownC = {
          name: `Test Deleted E Down C Step`,
          executePerActionStep: jasmine.createSpy(
            `testDeletedEDownC.executePerActionStep`
          ),
        };

        extractName = jasmine.createSpy(`extractName`).and.callFake((item) => {
          switch (item) {
            case `Test Unchanged Item A`:
              return `Test Unchanged Item A Name`;

            case `Test Unchanged Item B`:
              return `Test Unchanged Item B Name`;

            case `Test Unchanged Item C`:
              return `Test Unchanged Item C Name`;

            case `Test Deleted Item A`:
              return `Test Deleted Item A Name`;

            case `Test Deleted Item B`:
              return `Test Deleted Item B Name`;

            case `Test Deleted Item C`:
              return `Test Deleted Item C Name`;

            case `Test Deleted Item D`:
              return `Test Deleted Item D Name`;

            case `Test Deleted Item E`:
              return `Test Deleted Item E Name`;

            default:
              throw new Error(`Unexpected item ${item}.`);
          }
        });

        down = jasmine.createSpy(`down`).and.callFake((item) => {
          switch (item) {
            case `Test Unchanged Item A`:
              return [
                testUnchangedADownA,
                testUnchangedADownB,
                testUnchangedADownC,
              ];

            case `Test Unchanged Item B`:
              return [testUnchangedBDownA, testUnchangedBDownB];

            case `Test Unchanged Item C`:
              return [
                testUnchangedCDownA,
                testUnchangedCDownB,
                testUnchangedCDownC,
              ];

            case `Test Deleted Item A`:
              return [testDeletedADownA, testDeletedADownB];

            case `Test Deleted Item B`:
              return [testDeletedBDownA, testDeletedBDownB, testDeletedBDownC];

            case `Test Deleted Item C`:
              return [testDeletedCDownA, testDeletedCDownB];

            case `Test Deleted Item D`:
              return [testDeletedDDownA, testDeletedDDownB, testDeletedDDownC];

            case `Test Deleted Item E`:
              return [testDeletedEDownA, testDeletedEDownB, testDeletedEDownC];

            default:
              throw new Error(`Unexpected item ${item}.`);
          }
        });

        up = jasmine.createSpy(`up`).and.callFake((item) => {
          switch (item) {
            case `Test Unchanged Item A`:
              return [testUnchangedAUpA, testUnchangedAUpB];

            case `Test Unchanged Item B`:
              return [
                testUnchangedBUpA,
                testUnchangedBUpB,
                testUnchangedBUpC,
                testUnchangedBUpD,
              ];

            case `Test Unchanged Item C`:
              return [testUnchangedCUpA, testUnchangedCUpB, testUnchangedCUpC];

            default:
              throw new Error(`Unexpected item ${item}.`);
          }
        });

        const diff: Diff<TestItem> = {
          added: [],
          changed: [],
          unchanged: [
            `Test Unchanged Item A`,
            `Test Unchanged Item B`,
            `Test Unchanged Item C`,
          ],
          deleted: [
            `Test Deleted Item A`,
            `Test Deleted Item B`,
            `Test Deleted Item C`,
            `Test Deleted Item D`,
            `Test Deleted Item E`,
          ],
        };

        result = generateSteps(`Test Name`, true, diff, extractName, down, up);
      });

      it(`extracts the names of the unchanged items`, () => {
        expect(extractName).toHaveBeenCalledWith(`Test Unchanged Item A`);
        expect(extractName).toHaveBeenCalledWith(`Test Unchanged Item B`);
        expect(extractName).toHaveBeenCalledWith(`Test Unchanged Item C`);
      });

      it(`extracts the names of the deleted items`, () => {
        expect(extractName).toHaveBeenCalledWith(`Test Deleted Item A`);
        expect(extractName).toHaveBeenCalledWith(`Test Deleted Item B`);
        expect(extractName).toHaveBeenCalledWith(`Test Deleted Item C`);
        expect(extractName).toHaveBeenCalledWith(`Test Deleted Item D`);
        expect(extractName).toHaveBeenCalledWith(`Test Deleted Item E`);
      });

      it(`does not extract the names of any further items`, () => {
        expect(extractName).toHaveBeenCalledTimes(8);
      });

      it(`generates down steps for unchanged items`, () => {
        expect(down).toHaveBeenCalledWith(`Test Unchanged Item A`);
        expect(down).toHaveBeenCalledWith(`Test Unchanged Item B`);
        expect(down).toHaveBeenCalledWith(`Test Unchanged Item C`);
      });

      it(`generates down steps for deleted items`, () => {
        expect(down).toHaveBeenCalledWith(`Test Deleted Item A`);
        expect(down).toHaveBeenCalledWith(`Test Deleted Item B`);
        expect(down).toHaveBeenCalledWith(`Test Deleted Item C`);
        expect(down).toHaveBeenCalledWith(`Test Deleted Item D`);
        expect(down).toHaveBeenCalledWith(`Test Deleted Item E`);
      });

      it(`does not generate down steps for any further items`, () => {
        expect(down).toHaveBeenCalledTimes(8);
      });

      it(`generates up steps for unchanged items`, () => {
        expect(up).toHaveBeenCalledWith(`Test Unchanged Item A`);
        expect(up).toHaveBeenCalledWith(`Test Unchanged Item B`);
        expect(up).toHaveBeenCalledWith(`Test Unchanged Item C`);
      });

      it(`does not generate up steps for any further items`, () => {
        expect(up).toHaveBeenCalledTimes(3);
      });

      it(`returns the expected tree of generated steps`, () => {
        expect(result).toEqual([
          new ParallelStep(`Test Name`, [
            new SerialStep(`Test Unchanged Item A Name`, [
              testUnchangedADownA,
              testUnchangedADownB,
              testUnchangedADownC,
              testUnchangedAUpA,
              testUnchangedAUpB,
            ]),
            new SerialStep(`Test Unchanged Item B Name`, [
              testUnchangedBDownA,
              testUnchangedBDownB,
              testUnchangedBUpA,
              testUnchangedBUpB,
              testUnchangedBUpC,
              testUnchangedBUpD,
            ]),
            new SerialStep(`Test Unchanged Item C Name`, [
              testUnchangedCDownA,
              testUnchangedCDownB,
              testUnchangedCDownC,
              testUnchangedCUpA,
              testUnchangedCUpB,
              testUnchangedCUpC,
            ]),
            new SerialStep(`Test Deleted Item A Name`, [
              testDeletedADownA,
              testDeletedADownB,
            ]),
            new SerialStep(`Test Deleted Item B Name`, [
              testDeletedBDownA,
              testDeletedBDownB,
              testDeletedBDownC,
            ]),
            new SerialStep(`Test Deleted Item C Name`, [
              testDeletedCDownA,
              testDeletedCDownB,
            ]),
            new SerialStep(`Test Deleted Item D Name`, [
              testDeletedDDownA,
              testDeletedDDownB,
              testDeletedDDownC,
            ]),
            new SerialStep(`Test Deleted Item E Name`, [
              testDeletedEDownA,
              testDeletedEDownB,
              testDeletedEDownC,
            ]),
          ]),
        ]);
      });

      it(`does not execute any of the generated steps`, () => {
        expect(testUnchangedADownA.executePerActionStep).not.toHaveBeenCalled();
        expect(testUnchangedADownB.executePerActionStep).not.toHaveBeenCalled();
        expect(testUnchangedADownC.executePerActionStep).not.toHaveBeenCalled();
        expect(testUnchangedAUpA.executePerActionStep).not.toHaveBeenCalled();
        expect(testUnchangedAUpB.executePerActionStep).not.toHaveBeenCalled();
        expect(testUnchangedBDownA.executePerActionStep).not.toHaveBeenCalled();
        expect(testUnchangedBDownB.executePerActionStep).not.toHaveBeenCalled();
        expect(testUnchangedBUpA.executePerActionStep).not.toHaveBeenCalled();
        expect(testUnchangedBUpB.executePerActionStep).not.toHaveBeenCalled();
        expect(testUnchangedBUpC.executePerActionStep).not.toHaveBeenCalled();
        expect(testUnchangedBUpD.executePerActionStep).not.toHaveBeenCalled();
        expect(testUnchangedCDownA.executePerActionStep).not.toHaveBeenCalled();
        expect(testUnchangedCDownB.executePerActionStep).not.toHaveBeenCalled();
        expect(testUnchangedCDownC.executePerActionStep).not.toHaveBeenCalled();
        expect(testUnchangedCUpA.executePerActionStep).not.toHaveBeenCalled();
        expect(testUnchangedCUpB.executePerActionStep).not.toHaveBeenCalled();
        expect(testUnchangedCUpC.executePerActionStep).not.toHaveBeenCalled();
        expect(testDeletedADownA.executePerActionStep).not.toHaveBeenCalled();
        expect(testDeletedADownB.executePerActionStep).not.toHaveBeenCalled();
        expect(testDeletedBDownA.executePerActionStep).not.toHaveBeenCalled();
        expect(testDeletedBDownB.executePerActionStep).not.toHaveBeenCalled();
        expect(testDeletedBDownC.executePerActionStep).not.toHaveBeenCalled();
        expect(testDeletedCDownA.executePerActionStep).not.toHaveBeenCalled();
        expect(testDeletedCDownB.executePerActionStep).not.toHaveBeenCalled();
        expect(testDeletedDDownA.executePerActionStep).not.toHaveBeenCalled();
        expect(testDeletedDDownB.executePerActionStep).not.toHaveBeenCalled();
        expect(testDeletedDDownC.executePerActionStep).not.toHaveBeenCalled();
        expect(testDeletedEDownA.executePerActionStep).not.toHaveBeenCalled();
        expect(testDeletedEDownB.executePerActionStep).not.toHaveBeenCalled();
        expect(testDeletedEDownC.executePerActionStep).not.toHaveBeenCalled();
      });
    });

    describe(`when only unchanged files are present`, () => {
      let testUnchangedADownA: Step;
      let testUnchangedADownB: Step;
      let testUnchangedADownC: Step;
      let testUnchangedAUpA: Step;
      let testUnchangedAUpB: Step;
      let testUnchangedBDownA: Step;
      let testUnchangedBDownB: Step;
      let testUnchangedBUpA: Step;
      let testUnchangedBUpB: Step;
      let testUnchangedBUpC: Step;
      let testUnchangedBUpD: Step;
      let testUnchangedCDownA: Step;
      let testUnchangedCDownB: Step;
      let testUnchangedCDownC: Step;
      let testUnchangedCUpA: Step;
      let testUnchangedCUpB: Step;
      let testUnchangedCUpC: Step;
      let extractName: jasmine.Spy;
      let down: jasmine.Spy;
      let up: jasmine.Spy;
      let result: ReadonlyArray<ParallelStep>;

      beforeAll(() => {
        testUnchangedADownA = {
          name: `Test Unchanged A Down A Step`,
          executePerActionStep: jasmine.createSpy(
            `testUnchangedADownA.executePerActionStep`
          ),
        };
        testUnchangedADownB = {
          name: `Test Unchanged A Down B Step`,
          executePerActionStep: jasmine.createSpy(
            `testUnchangedADownB.executePerActionStep`
          ),
        };
        testUnchangedADownC = {
          name: `Test Unchanged A Down C Step`,
          executePerActionStep: jasmine.createSpy(
            `testUnchangedADownC.executePerActionStep`
          ),
        };
        testUnchangedAUpA = {
          name: `Test Unchanged A Up A Step`,
          executePerActionStep: jasmine.createSpy(
            `testUnchangedAUpA.executePerActionStep`
          ),
        };
        testUnchangedAUpB = {
          name: `Test Unchanged A Up B Step`,
          executePerActionStep: jasmine.createSpy(
            `testUnchangedAUpB.executePerActionStep`
          ),
        };
        testUnchangedBDownA = {
          name: `Test Unchanged B Down A Step`,
          executePerActionStep: jasmine.createSpy(
            `testUnchangedBDownA.executePerActionStep`
          ),
        };
        testUnchangedBDownB = {
          name: `Test Unchanged B Down B Step`,
          executePerActionStep: jasmine.createSpy(
            `testUnchangedBDownB.executePerActionStep`
          ),
        };
        testUnchangedBUpA = {
          name: `Test Unchanged B Up A Step`,
          executePerActionStep: jasmine.createSpy(
            `testUnchangedBUpA.executePerActionStep`
          ),
        };
        testUnchangedBUpB = {
          name: `Test Unchanged B Up B Step`,
          executePerActionStep: jasmine.createSpy(
            `testUnchangedBUpB.executePerActionStep`
          ),
        };
        testUnchangedBUpC = {
          name: `Test Unchanged B Up C Step`,
          executePerActionStep: jasmine.createSpy(
            `testUnchangedBUpC.executePerActionStep`
          ),
        };
        testUnchangedBUpD = {
          name: `Test Unchanged B Up D Step`,
          executePerActionStep: jasmine.createSpy(
            `testUnchangedBUpD.executePerActionStep`
          ),
        };
        testUnchangedCDownA = {
          name: `Test Unchanged C Down A Step`,
          executePerActionStep: jasmine.createSpy(
            `testUnchangedCDownA.executePerActionStep`
          ),
        };
        testUnchangedCDownB = {
          name: `Test Unchanged C Down B Step`,
          executePerActionStep: jasmine.createSpy(
            `testUnchangedCDownB.executePerActionStep`
          ),
        };
        testUnchangedCDownC = {
          name: `Test Unchanged C Down C Step`,
          executePerActionStep: jasmine.createSpy(
            `testUnchangedCDownC.executePerActionStep`
          ),
        };
        testUnchangedCUpA = {
          name: `Test Unchanged C Up A Step`,
          executePerActionStep: jasmine.createSpy(
            `testUnchangedCUpA.executePerActionStep`
          ),
        };
        testUnchangedCUpB = {
          name: `Test Unchanged C Up B Step`,
          executePerActionStep: jasmine.createSpy(
            `testUnchangedCUpB.executePerActionStep`
          ),
        };
        testUnchangedCUpC = {
          name: `Test Unchanged C Up C Step`,
          executePerActionStep: jasmine.createSpy(
            `testUnchangedCUpC.executePerActionStep`
          ),
        };

        extractName = jasmine.createSpy(`extractName`).and.callFake((item) => {
          switch (item) {
            case `Test Unchanged Item A`:
              return `Test Unchanged Item A Name`;

            case `Test Unchanged Item B`:
              return `Test Unchanged Item B Name`;

            case `Test Unchanged Item C`:
              return `Test Unchanged Item C Name`;

            default:
              throw new Error(`Unexpected item ${item}.`);
          }
        });

        down = jasmine.createSpy(`down`).and.callFake((item) => {
          switch (item) {
            case `Test Unchanged Item A`:
              return [
                testUnchangedADownA,
                testUnchangedADownB,
                testUnchangedADownC,
              ];

            case `Test Unchanged Item B`:
              return [testUnchangedBDownA, testUnchangedBDownB];

            case `Test Unchanged Item C`:
              return [
                testUnchangedCDownA,
                testUnchangedCDownB,
                testUnchangedCDownC,
              ];

            default:
              throw new Error(`Unexpected item ${item}.`);
          }
        });

        up = jasmine.createSpy(`up`).and.callFake((item) => {
          switch (item) {
            case `Test Unchanged Item A`:
              return [testUnchangedAUpA, testUnchangedAUpB];

            case `Test Unchanged Item B`:
              return [
                testUnchangedBUpA,
                testUnchangedBUpB,
                testUnchangedBUpC,
                testUnchangedBUpD,
              ];

            case `Test Unchanged Item C`:
              return [testUnchangedCUpA, testUnchangedCUpB, testUnchangedCUpC];

            default:
              throw new Error(`Unexpected item ${item}.`);
          }
        });

        const diff: Diff<TestItem> = {
          added: [],
          changed: [],
          unchanged: [
            `Test Unchanged Item A`,
            `Test Unchanged Item B`,
            `Test Unchanged Item C`,
          ],
          deleted: [],
        };

        result = generateSteps(`Test Name`, true, diff, extractName, down, up);
      });

      it(`extracts the names of the unchanged items`, () => {
        expect(extractName).toHaveBeenCalledWith(`Test Unchanged Item A`);
        expect(extractName).toHaveBeenCalledWith(`Test Unchanged Item B`);
        expect(extractName).toHaveBeenCalledWith(`Test Unchanged Item C`);
      });

      it(`does not extract the names of any further items`, () => {
        expect(extractName).toHaveBeenCalledTimes(3);
      });

      it(`generates down steps for unchanged items`, () => {
        expect(down).toHaveBeenCalledWith(`Test Unchanged Item A`);
        expect(down).toHaveBeenCalledWith(`Test Unchanged Item B`);
        expect(down).toHaveBeenCalledWith(`Test Unchanged Item C`);
      });

      it(`does not generate down steps for any further items`, () => {
        expect(down).toHaveBeenCalledTimes(3);
      });

      it(`generates up steps for unchanged items`, () => {
        expect(up).toHaveBeenCalledWith(`Test Unchanged Item A`);
        expect(up).toHaveBeenCalledWith(`Test Unchanged Item B`);
        expect(up).toHaveBeenCalledWith(`Test Unchanged Item C`);
      });

      it(`does not generate up steps for any further items`, () => {
        expect(up).toHaveBeenCalledTimes(3);
      });

      it(`returns the expected tree of generated steps`, () => {
        expect(result).toEqual([
          new ParallelStep(`Test Name`, [
            new SerialStep(`Test Unchanged Item A Name`, [
              testUnchangedADownA,
              testUnchangedADownB,
              testUnchangedADownC,
              testUnchangedAUpA,
              testUnchangedAUpB,
            ]),
            new SerialStep(`Test Unchanged Item B Name`, [
              testUnchangedBDownA,
              testUnchangedBDownB,
              testUnchangedBUpA,
              testUnchangedBUpB,
              testUnchangedBUpC,
              testUnchangedBUpD,
            ]),
            new SerialStep(`Test Unchanged Item C Name`, [
              testUnchangedCDownA,
              testUnchangedCDownB,
              testUnchangedCDownC,
              testUnchangedCUpA,
              testUnchangedCUpB,
              testUnchangedCUpC,
            ]),
          ]),
        ]);
      });

      it(`does not execute any of the generated steps`, () => {
        expect(testUnchangedADownA.executePerActionStep).not.toHaveBeenCalled();
        expect(testUnchangedADownB.executePerActionStep).not.toHaveBeenCalled();
        expect(testUnchangedADownC.executePerActionStep).not.toHaveBeenCalled();
        expect(testUnchangedAUpA.executePerActionStep).not.toHaveBeenCalled();
        expect(testUnchangedAUpB.executePerActionStep).not.toHaveBeenCalled();
        expect(testUnchangedBDownA.executePerActionStep).not.toHaveBeenCalled();
        expect(testUnchangedBDownB.executePerActionStep).not.toHaveBeenCalled();
        expect(testUnchangedBUpA.executePerActionStep).not.toHaveBeenCalled();
        expect(testUnchangedBUpB.executePerActionStep).not.toHaveBeenCalled();
        expect(testUnchangedBUpC.executePerActionStep).not.toHaveBeenCalled();
        expect(testUnchangedBUpD.executePerActionStep).not.toHaveBeenCalled();
        expect(testUnchangedCDownA.executePerActionStep).not.toHaveBeenCalled();
        expect(testUnchangedCDownB.executePerActionStep).not.toHaveBeenCalled();
        expect(testUnchangedCDownC.executePerActionStep).not.toHaveBeenCalled();
        expect(testUnchangedCUpA.executePerActionStep).not.toHaveBeenCalled();
        expect(testUnchangedCUpB.executePerActionStep).not.toHaveBeenCalled();
        expect(testUnchangedCUpC.executePerActionStep).not.toHaveBeenCalled();
      });
    });

    describe(`when only additions are present`, () => {
      let testAddedAUpA: Step;
      let testAddedAUpB: Step;
      let testAddedBUpA: Step;
      let testAddedBUpB: Step;
      let testAddedBUpC: Step;
      let testAddedBUpD: Step;
      let testAddedCUpA: Step;
      let testAddedCUpB: Step;
      let testAddedCUpC: Step;
      let testAddedCUpD: Step;
      let testAddedDUpA: Step;
      let testAddedDUpB: Step;
      let testAddedDUpC: Step;
      let extractName: jasmine.Spy;
      let down: jasmine.Spy;
      let up: jasmine.Spy;
      let result: ReadonlyArray<ParallelStep>;

      beforeAll(() => {
        testAddedAUpA = {
          name: `Test Added A Up A`,
          executePerActionStep: jasmine.createSpy(
            `testAddedAUpA.executePerActionStep`
          ),
        };
        testAddedAUpB = {
          name: `Test Added A Up B Step`,
          executePerActionStep: jasmine.createSpy(
            `testAddedAUpB.executePerActionStep`
          ),
        };
        testAddedBUpA = {
          name: `Test Added B Up A Step`,
          executePerActionStep: jasmine.createSpy(
            `testAddedBUpA.executePerActionStep`
          ),
        };
        testAddedBUpB = {
          name: `Test Added B Up B Step`,
          executePerActionStep: jasmine.createSpy(
            `testAddedBUpB.executePerActionStep`
          ),
        };
        testAddedBUpC = {
          name: `Test Added B Up C Step`,
          executePerActionStep: jasmine.createSpy(
            `testAddedBUpC.executePerActionStep`
          ),
        };
        testAddedBUpD = {
          name: `Test Added B Up D Step`,
          executePerActionStep: jasmine.createSpy(
            `testAddedBUpD.executePerActionStep`
          ),
        };
        testAddedCUpA = {
          name: `Test Added C Up A Step`,
          executePerActionStep: jasmine.createSpy(
            `testAddedCUpA.executePerActionStep`
          ),
        };
        testAddedCUpB = {
          name: `Test Added C Up B Step`,
          executePerActionStep: jasmine.createSpy(
            `testAddedCUpB.executePerActionStep`
          ),
        };
        testAddedCUpC = {
          name: `Test Added C Up C Step`,
          executePerActionStep: jasmine.createSpy(
            `testAddedCUpC.executePerActionStep`
          ),
        };
        testAddedCUpD = {
          name: `Test Added C Up D Step`,
          executePerActionStep: jasmine.createSpy(
            `testAddedCUpD.executePerActionStep`
          ),
        };
        testAddedDUpA = {
          name: `Test Added D Up A Step`,
          executePerActionStep: jasmine.createSpy(
            `testAddedDUpA.executePerActionStep`
          ),
        };
        testAddedDUpB = {
          name: `Test Added D Up B Step`,
          executePerActionStep: jasmine.createSpy(
            `testAddedDUpB.executePerActionStep`
          ),
        };
        testAddedDUpC = {
          name: `Test Added D Up C Step`,
          executePerActionStep: jasmine.createSpy(
            `testAddedDUpC.executePerActionStep`
          ),
        };

        extractName = jasmine.createSpy(`extractName`).and.callFake((item) => {
          switch (item) {
            case `Test Added Item A`:
              return `Test Added Item A Name`;

            case `Test Added Item B`:
              return `Test Added Item B Name`;

            case `Test Added Item C`:
              return `Test Added Item C Name`;

            case `Test Added Item D`:
              return `Test Added Item D Name`;

            default:
              throw new Error(`Unexpected item ${item}.`);
          }
        });

        down = jasmine.createSpy(`down`);

        up = jasmine.createSpy(`up`).and.callFake((item) => {
          switch (item) {
            case `Test Added Item A`:
              return [testAddedAUpA, testAddedAUpB];

            case `Test Added Item B`:
              return [
                testAddedBUpA,
                testAddedBUpB,
                testAddedBUpC,
                testAddedBUpD,
              ];

            case `Test Added Item C`:
              return [
                testAddedCUpA,
                testAddedCUpB,
                testAddedCUpC,
                testAddedCUpD,
              ];

            case `Test Added Item D`:
              return [testAddedDUpA, testAddedDUpB, testAddedDUpC];

            default:
              throw new Error(`Unexpected item ${item}.`);
          }
        });

        const diff: Diff<TestItem> = {
          added: [
            `Test Added Item A`,
            `Test Added Item B`,
            `Test Added Item C`,
            `Test Added Item D`,
          ],
          changed: [],
          unchanged: [],
          deleted: [],
        };

        result = generateSteps(`Test Name`, true, diff, extractName, down, up);
      });

      it(`extracts the names of the added items`, () => {
        expect(extractName).toHaveBeenCalledWith(`Test Added Item A`);
        expect(extractName).toHaveBeenCalledWith(`Test Added Item B`);
        expect(extractName).toHaveBeenCalledWith(`Test Added Item C`);
        expect(extractName).toHaveBeenCalledWith(`Test Added Item D`);
      });

      it(`does not extract the names of any further items`, () => {
        expect(extractName).toHaveBeenCalledTimes(4);
      });

      it(`does not generate down steps`, () => {
        expect(down).not.toHaveBeenCalled();
      });

      it(`generates up steps for added items`, () => {
        expect(up).toHaveBeenCalledWith(`Test Added Item A`);
        expect(up).toHaveBeenCalledWith(`Test Added Item B`);
        expect(up).toHaveBeenCalledWith(`Test Added Item C`);
        expect(up).toHaveBeenCalledWith(`Test Added Item D`);
      });

      it(`does not generate up steps for any further items`, () => {
        expect(up).toHaveBeenCalledTimes(4);
      });

      it(`returns the expected tree of generated steps`, () => {
        expect(result).toEqual([
          new ParallelStep(`Test Name`, [
            new SerialStep(`Test Added Item A Name`, [
              testAddedAUpA,
              testAddedAUpB,
            ]),
            new SerialStep(`Test Added Item B Name`, [
              testAddedBUpA,
              testAddedBUpB,
              testAddedBUpC,
              testAddedBUpD,
            ]),
            new SerialStep(`Test Added Item C Name`, [
              testAddedCUpA,
              testAddedCUpB,
              testAddedCUpC,
              testAddedCUpD,
            ]),
            new SerialStep(`Test Added Item D Name`, [
              testAddedDUpA,
              testAddedDUpB,
              testAddedDUpC,
            ]),
          ]),
        ]);
      });

      it(`does not execute any of the generated steps`, () => {
        expect(testAddedAUpA.executePerActionStep).not.toHaveBeenCalled();
        expect(testAddedAUpB.executePerActionStep).not.toHaveBeenCalled();
        expect(testAddedBUpA.executePerActionStep).not.toHaveBeenCalled();
        expect(testAddedBUpB.executePerActionStep).not.toHaveBeenCalled();
        expect(testAddedBUpC.executePerActionStep).not.toHaveBeenCalled();
        expect(testAddedBUpD.executePerActionStep).not.toHaveBeenCalled();
        expect(testAddedCUpA.executePerActionStep).not.toHaveBeenCalled();
        expect(testAddedCUpB.executePerActionStep).not.toHaveBeenCalled();
        expect(testAddedCUpC.executePerActionStep).not.toHaveBeenCalled();
        expect(testAddedCUpD.executePerActionStep).not.toHaveBeenCalled();
        expect(testAddedDUpA.executePerActionStep).not.toHaveBeenCalled();
        expect(testAddedDUpB.executePerActionStep).not.toHaveBeenCalled();
        expect(testAddedDUpC.executePerActionStep).not.toHaveBeenCalled();
      });
    });

    describe(`when only changes are present`, () => {
      let testChangedADownA: Step;
      let testChangedADownB: Step;
      let testChangedAUpA: Step;
      let testChangedAUpB: Step;
      let testChangedAUpC: Step;
      let testChangedBDownA: Step;
      let testChangedBDownB: Step;
      let testChangedBDownC: Step;
      let testChangedBDownD: Step;
      let testChangedBUpA: Step;
      let testChangedBUpB: Step;
      let extractName: jasmine.Spy;
      let down: jasmine.Spy;
      let up: jasmine.Spy;
      let result: ReadonlyArray<ParallelStep>;

      beforeAll(() => {
        testChangedADownA = {
          name: `Test Changed A Down A Step`,
          executePerActionStep: jasmine.createSpy(
            `testChangedADownA.executePerActionStep`
          ),
        };
        testChangedADownB = {
          name: `Test Changed A Down B Step`,
          executePerActionStep: jasmine.createSpy(
            `testChangedADownB.executePerActionStep`
          ),
        };
        testChangedAUpA = {
          name: `Test Changed A Up A Step`,
          executePerActionStep: jasmine.createSpy(
            `testChangedAUpA.executePerActionStep`
          ),
        };
        testChangedAUpB = {
          name: `Test Changed A Up B Step`,
          executePerActionStep: jasmine.createSpy(
            `testChangedAUpB.executePerActionStep`
          ),
        };
        testChangedAUpC = {
          name: `Test Changed A Up C Step`,
          executePerActionStep: jasmine.createSpy(
            `testChangedAUpC.executePerActionStep`
          ),
        };
        testChangedBDownA = {
          name: `Test Changed B Down A Step`,
          executePerActionStep: jasmine.createSpy(
            `testChangedBDownA.executePerActionStep`
          ),
        };
        testChangedBDownB = {
          name: `Test Changed B Down B Step`,
          executePerActionStep: jasmine.createSpy(
            `testChangedBDownB.executePerActionStep`
          ),
        };
        testChangedBDownC = {
          name: `Test Changed B Down C Step`,
          executePerActionStep: jasmine.createSpy(
            `testChangedBDownC.executePerActionStep`
          ),
        };
        testChangedBDownD = {
          name: `Test Changed B Down D Step`,
          executePerActionStep: jasmine.createSpy(
            `testChangedBDownD.executePerActionStep`
          ),
        };
        testChangedBUpA = {
          name: `Test Changed B Up A Step`,
          executePerActionStep: jasmine.createSpy(
            `testChangedBUpA.executePerActionStep`
          ),
        };
        testChangedBUpB = {
          name: `Test Changed B Up B Step`,
          executePerActionStep: jasmine.createSpy(
            `testChangedBUpB.executePerActionStep`
          ),
        };

        extractName = jasmine.createSpy(`extractName`).and.callFake((item) => {
          switch (item) {
            case `Test Added Item A`:
              return `Test Added Item A Name`;

            case `Test Added Item B`:
              return `Test Added Item B Name`;

            case `Test Added Item C`:
              return `Test Added Item C Name`;

            case `Test Added Item D`:
              return `Test Added Item D Name`;

            case `Test Changed Item A`:
              return `Test Changed Item A Name`;

            case `Test Changed Item B`:
              return `Test Changed Item B Name`;

            case `Test Deleted Item A`:
              return `Test Deleted Item A Name`;

            case `Test Deleted Item B`:
              return `Test Deleted Item B Name`;

            case `Test Deleted Item C`:
              return `Test Deleted Item C Name`;

            case `Test Deleted Item D`:
              return `Test Deleted Item D Name`;

            case `Test Deleted Item E`:
              return `Test Deleted Item E Name`;

            default:
              throw new Error(`Unexpected item ${item}.`);
          }
        });

        down = jasmine.createSpy(`down`).and.callFake((item) => {
          switch (item) {
            case `Test Changed Item A`:
              return [testChangedADownA, testChangedADownB];

            case `Test Changed Item B`:
              return [
                testChangedBDownA,
                testChangedBDownB,
                testChangedBDownC,
                testChangedBDownD,
              ];

            default:
              throw new Error(`Unexpected item ${item}.`);
          }
        });

        up = jasmine.createSpy(`up`).and.callFake((item) => {
          switch (item) {
            case `Test Changed Item A`:
              return [testChangedAUpA, testChangedAUpB, testChangedAUpC];

            case `Test Changed Item B`:
              return [testChangedBUpA, testChangedBUpB];

            default:
              throw new Error(`Unexpected item ${item}.`);
          }
        });

        const diff: Diff<TestItem> = {
          added: [],
          changed: [`Test Changed Item A`, `Test Changed Item B`],
          unchanged: [],
          deleted: [],
        };

        result = generateSteps(`Test Name`, true, diff, extractName, down, up);
      });

      it(`extracts the names of the changed items`, () => {
        expect(extractName).toHaveBeenCalledWith(`Test Changed Item A`);
        expect(extractName).toHaveBeenCalledWith(`Test Changed Item B`);
      });

      it(`does not extract the names of any further items`, () => {
        expect(extractName).toHaveBeenCalledTimes(2);
      });

      it(`generates down steps for changed items`, () => {
        expect(down).toHaveBeenCalledWith(`Test Changed Item A`);
        expect(down).toHaveBeenCalledWith(`Test Changed Item B`);
      });

      it(`does not generate down steps for any further items`, () => {
        expect(down).toHaveBeenCalledTimes(2);
      });

      it(`generates up steps for changed items`, () => {
        expect(up).toHaveBeenCalledWith(`Test Changed Item A`);
        expect(up).toHaveBeenCalledWith(`Test Changed Item B`);
      });

      it(`does not generate up steps for any further items`, () => {
        expect(up).toHaveBeenCalledTimes(2);
      });

      it(`returns the expected tree of generated steps`, () => {
        expect(result).toEqual([
          new ParallelStep(`Test Name`, [
            new SerialStep(`Test Changed Item A Name`, [
              testChangedADownA,
              testChangedADownB,
              testChangedAUpA,
              testChangedAUpB,
              testChangedAUpC,
            ]),
            new SerialStep(`Test Changed Item B Name`, [
              testChangedBDownA,
              testChangedBDownB,
              testChangedBDownC,
              testChangedBDownD,
              testChangedBUpA,
              testChangedBUpB,
            ]),
          ]),
        ]);
      });

      it(`does not execute any of the generated steps`, () => {
        expect(testChangedADownA.executePerActionStep).not.toHaveBeenCalled();
        expect(testChangedADownB.executePerActionStep).not.toHaveBeenCalled();
        expect(testChangedAUpA.executePerActionStep).not.toHaveBeenCalled();
        expect(testChangedAUpB.executePerActionStep).not.toHaveBeenCalled();
        expect(testChangedAUpC.executePerActionStep).not.toHaveBeenCalled();
        expect(testChangedBDownA.executePerActionStep).not.toHaveBeenCalled();
        expect(testChangedBDownB.executePerActionStep).not.toHaveBeenCalled();
        expect(testChangedBDownC.executePerActionStep).not.toHaveBeenCalled();
        expect(testChangedBDownD.executePerActionStep).not.toHaveBeenCalled();
        expect(testChangedBUpA.executePerActionStep).not.toHaveBeenCalled();
        expect(testChangedBUpB.executePerActionStep).not.toHaveBeenCalled();
      });
    });

    describe(`when only deletions are present`, () => {
      let testDeletedADownA: Step;
      let testDeletedADownB: Step;
      let testDeletedBDownA: Step;
      let testDeletedBDownB: Step;
      let testDeletedBDownC: Step;
      let testDeletedCDownA: Step;
      let testDeletedCDownB: Step;
      let testDeletedDDownA: Step;
      let testDeletedDDownB: Step;
      let testDeletedDDownC: Step;
      let testDeletedEDownA: Step;
      let testDeletedEDownB: Step;
      let testDeletedEDownC: Step;
      let extractName: jasmine.Spy;
      let down: jasmine.Spy;
      let up: jasmine.Spy;
      let result: ReadonlyArray<ParallelStep>;

      beforeAll(() => {
        testDeletedADownA = {
          name: `Test Deleted A Down A Step`,
          executePerActionStep: jasmine.createSpy(
            `testDeletedADownA.executePerActionStep`
          ),
        };
        testDeletedADownB = {
          name: `Test Deleted A Down B Step`,
          executePerActionStep: jasmine.createSpy(
            `testDeletedADownB.executePerActionStep`
          ),
        };
        testDeletedBDownA = {
          name: `Test Deleted B Down A Step`,
          executePerActionStep: jasmine.createSpy(
            `testDeletedBDownA.executePerActionStep`
          ),
        };
        testDeletedBDownB = {
          name: `Test Deleted B Down B Step`,
          executePerActionStep: jasmine.createSpy(
            `testDeletedBDownB.executePerActionStep`
          ),
        };
        testDeletedBDownC = {
          name: `Test Deleted B Down C Step`,
          executePerActionStep: jasmine.createSpy(
            `testDeletedBDownC.executePerActionStep`
          ),
        };
        testDeletedCDownA = {
          name: `Test Deleted C Down A Step`,
          executePerActionStep: jasmine.createSpy(
            `testDeletedCDownA.executePerActionStep`
          ),
        };
        testDeletedCDownB = {
          name: `Test Deleted C Down B Step`,
          executePerActionStep: jasmine.createSpy(
            `testDeletedCDownB.executePerActionStep`
          ),
        };
        testDeletedDDownA = {
          name: `Test Deleted D Down A Step`,
          executePerActionStep: jasmine.createSpy(
            `testDeletedDDownA.executePerActionStep`
          ),
        };
        testDeletedDDownB = {
          name: `Test Deleted D Down B Step`,
          executePerActionStep: jasmine.createSpy(
            `testDeletedDDownB.executePerActionStep`
          ),
        };
        testDeletedDDownC = {
          name: `Test Deleted D Down C Step`,
          executePerActionStep: jasmine.createSpy(
            `testDeletedDDownC.executePerActionStep`
          ),
        };
        testDeletedEDownA = {
          name: `Test Deleted E Down A Step`,
          executePerActionStep: jasmine.createSpy(
            `testDeletedEDownA.executePerActionStep`
          ),
        };
        testDeletedEDownB = {
          name: `Test Deleted E Down B Step`,
          executePerActionStep: jasmine.createSpy(
            `testDeletedDDownB.executePerActionStep`
          ),
        };
        testDeletedEDownC = {
          name: `Test Deleted E Down C Step`,
          executePerActionStep: jasmine.createSpy(
            `testDeletedEDownC.executePerActionStep`
          ),
        };

        extractName = jasmine.createSpy(`extractName`).and.callFake((item) => {
          switch (item) {
            case `Test Deleted Item A`:
              return `Test Deleted Item A Name`;

            case `Test Deleted Item B`:
              return `Test Deleted Item B Name`;

            case `Test Deleted Item C`:
              return `Test Deleted Item C Name`;

            case `Test Deleted Item D`:
              return `Test Deleted Item D Name`;

            case `Test Deleted Item E`:
              return `Test Deleted Item E Name`;

            default:
              throw new Error(`Unexpected item ${item}.`);
          }
        });

        down = jasmine.createSpy(`down`).and.callFake((item) => {
          switch (item) {
            case `Test Deleted Item A`:
              return [testDeletedADownA, testDeletedADownB];

            case `Test Deleted Item B`:
              return [testDeletedBDownA, testDeletedBDownB, testDeletedBDownC];

            case `Test Deleted Item C`:
              return [testDeletedCDownA, testDeletedCDownB];

            case `Test Deleted Item D`:
              return [testDeletedDDownA, testDeletedDDownB, testDeletedDDownC];

            case `Test Deleted Item E`:
              return [testDeletedEDownA, testDeletedEDownB, testDeletedEDownC];

            default:
              throw new Error(`Unexpected item ${item}.`);
          }
        });

        up = jasmine.createSpy(`up`);

        const diff: Diff<TestItem> = {
          added: [],
          changed: [],
          unchanged: [],
          deleted: [
            `Test Deleted Item A`,
            `Test Deleted Item B`,
            `Test Deleted Item C`,
            `Test Deleted Item D`,
            `Test Deleted Item E`,
          ],
        };

        result = generateSteps(`Test Name`, true, diff, extractName, down, up);
      });

      it(`extracts the names of the deleted items`, () => {
        expect(extractName).toHaveBeenCalledWith(`Test Deleted Item A`);
        expect(extractName).toHaveBeenCalledWith(`Test Deleted Item B`);
        expect(extractName).toHaveBeenCalledWith(`Test Deleted Item C`);
        expect(extractName).toHaveBeenCalledWith(`Test Deleted Item D`);
        expect(extractName).toHaveBeenCalledWith(`Test Deleted Item E`);
      });

      it(`does not extract the names of any further items`, () => {
        expect(extractName).toHaveBeenCalledTimes(5);
      });

      it(`generates down steps for deleted items`, () => {
        expect(down).toHaveBeenCalledWith(`Test Deleted Item A`);
        expect(down).toHaveBeenCalledWith(`Test Deleted Item B`);
        expect(down).toHaveBeenCalledWith(`Test Deleted Item C`);
        expect(down).toHaveBeenCalledWith(`Test Deleted Item D`);
        expect(down).toHaveBeenCalledWith(`Test Deleted Item E`);
      });

      it(`does not generate down steps for any further items`, () => {
        expect(down).toHaveBeenCalledTimes(5);
      });

      it(`does not generate up steps`, () => {
        expect(up).not.toHaveBeenCalled();
      });

      it(`returns the expected tree of generated steps`, () => {
        expect(result).toEqual([
          new ParallelStep(`Test Name`, [
            new SerialStep(`Test Deleted Item A Name`, [
              testDeletedADownA,
              testDeletedADownB,
            ]),
            new SerialStep(`Test Deleted Item B Name`, [
              testDeletedBDownA,
              testDeletedBDownB,
              testDeletedBDownC,
            ]),
            new SerialStep(`Test Deleted Item C Name`, [
              testDeletedCDownA,
              testDeletedCDownB,
            ]),
            new SerialStep(`Test Deleted Item D Name`, [
              testDeletedDDownA,
              testDeletedDDownB,
              testDeletedDDownC,
            ]),
            new SerialStep(`Test Deleted Item E Name`, [
              testDeletedEDownA,
              testDeletedEDownB,
              testDeletedEDownC,
            ]),
          ]),
        ]);
      });

      it(`does not execute any of the generated steps`, () => {
        expect(testDeletedADownA.executePerActionStep).not.toHaveBeenCalled();
        expect(testDeletedADownB.executePerActionStep).not.toHaveBeenCalled();
        expect(testDeletedBDownA.executePerActionStep).not.toHaveBeenCalled();
        expect(testDeletedBDownB.executePerActionStep).not.toHaveBeenCalled();
        expect(testDeletedBDownC.executePerActionStep).not.toHaveBeenCalled();
        expect(testDeletedCDownA.executePerActionStep).not.toHaveBeenCalled();
        expect(testDeletedCDownB.executePerActionStep).not.toHaveBeenCalled();
        expect(testDeletedDDownA.executePerActionStep).not.toHaveBeenCalled();
        expect(testDeletedDDownB.executePerActionStep).not.toHaveBeenCalled();
        expect(testDeletedDDownC.executePerActionStep).not.toHaveBeenCalled();
        expect(testDeletedEDownA.executePerActionStep).not.toHaveBeenCalled();
        expect(testDeletedEDownB.executePerActionStep).not.toHaveBeenCalled();
        expect(testDeletedEDownC.executePerActionStep).not.toHaveBeenCalled();
      });
    });

    describe(`when no files are present`, () => {
      let extractName: jasmine.Spy;
      let down: jasmine.Spy;
      let up: jasmine.Spy;
      let result: ReadonlyArray<ParallelStep>;

      beforeAll(() => {
        extractName = jasmine.createSpy(`extractName`);
        down = jasmine.createSpy(`down`);
        up = jasmine.createSpy(`up`);

        const diff: Diff<TestItem> = {
          added: [],
          changed: [],
          unchanged: [],
          deleted: [],
        };

        result = generateSteps(`Test Name`, true, diff, extractName, down, up);
      });

      it(`does not extract the names of any items`, () => {
        expect(extractName).not.toHaveBeenCalled();
      });

      it(`does not generate down steps`, () => {
        expect(down).not.toHaveBeenCalled();
      });

      it(`does not generate up steps`, () => {
        expect(up).not.toHaveBeenCalled();
      });

      it(`returns the expected tree of generated steps`, () => {
        expect(result).toEqual([]);
      });
    });
  });
});

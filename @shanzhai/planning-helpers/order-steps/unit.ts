import { Step } from "@shanzhai/interfaces";
import { ParallelStep } from "@shanzhai/parallel-step";
import { SerialStep } from "@shanzhai/serial-step";
import { orderSteps } from ".";

class DummyStep implements Step {
  constructor(readonly name: string) {}

  readonly executePerActionStep = jasmine.createSpy(`executePerActionStep`);

  readonly effects = [];
}

// Based upon https://stackoverflow.com/a/6274381/8816561.
function shuffled<T>(...items: ReadonlyArray<T>): ReadonlyArray<T> {
  const array = [...items];

  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
}

describe(`orderSteps`, () => {
  describe(`when the graph is acyclic`, () => {
    let standaloneStep: DummyStep;
    let standaloneChainA: DummyStep;
    let standaloneChainB: DummyStep;
    let standaloneChainC: DummyStep;
    let branchingSourceA: DummyStep;
    let branchingSourceB: DummyStep;
    let branchingLeftA: DummyStep;
    let branchingLeftB: DummyStep;
    let branchingLeftC: DummyStep;
    let branchingRightA: DummyStep;
    let branchingRightB: DummyStep;
    let branchingRightC: DummyStep;
    let mergingDestinationA: DummyStep;
    let mergingDestinationB: DummyStep;
    let mergingDestinationC: DummyStep;
    let mergingLeftA: DummyStep;
    let mergingLeftB: DummyStep;
    let mergingRightA: DummyStep;
    let mergingRightB: DummyStep;
    let mergingRightC: DummyStep;
    let complexMeshInputA: DummyStep;
    let complexMeshInputB: DummyStep;
    let complexMeshInputC: DummyStep;
    let complexMeshOutputAB: DummyStep;
    let complexMeshOutputBC: DummyStep;
    let complexMeshOutputAC: DummyStep;
    let levelSkipperA: DummyStep;
    let levelSkipperB: DummyStep;
    let levelSkipperC: DummyStep;
    let steps: ReadonlyArray<Step>;
    let orderingConstraints: ReadonlyArray<readonly [Step, Step]>;
    let output: Step;
    let outputSteps: ReadonlyArray<Step>;

    beforeAll(() => {
      standaloneStep = new DummyStep(`standaloneStep`);
      standaloneChainA = new DummyStep(`standaloneChainA`);
      standaloneChainB = new DummyStep(`standaloneChainB`);
      standaloneChainC = new DummyStep(`standaloneChainC`);
      branchingSourceA = new DummyStep(`branchingSourceA`);
      branchingSourceB = new DummyStep(`branchingSourceB`);
      branchingLeftA = new DummyStep(`branchingLeftA`);
      branchingLeftB = new DummyStep(`branchingLeftB`);
      branchingLeftC = new DummyStep(`branchingLeftC`);
      branchingRightA = new DummyStep(`branchingRightA`);
      branchingRightB = new DummyStep(`branchingRightB`);
      branchingRightC = new DummyStep(`branchingRightC`);
      mergingLeftA = new DummyStep(`mergingLeftA`);
      mergingLeftB = new DummyStep(`mergingLeftB`);
      mergingRightA = new DummyStep(`mergingRightA`);
      mergingRightB = new DummyStep(`mergingRightB`);
      mergingRightC = new DummyStep(`mergingRightC`);
      mergingDestinationA = new DummyStep(`mergingDestinationA`);
      mergingDestinationB = new DummyStep(`mergingDestinationB`);
      mergingDestinationC = new DummyStep(`mergingDestinationC`);
      complexMeshInputA = new DummyStep(`complexMeshInputA`);
      complexMeshInputB = new DummyStep(`complexMeshInputB`);
      complexMeshInputC = new DummyStep(`complexMeshInputC`);
      complexMeshOutputAB = new DummyStep(`complexMeshOutputAB`);
      complexMeshOutputBC = new DummyStep(`complexMeshOutputBC`);
      complexMeshOutputAC = new DummyStep(`complexMeshOutputAC`);
      levelSkipperA = new DummyStep(`levelSkipperA`);
      levelSkipperB = new DummyStep(`levelSkipperB`);
      levelSkipperC = new DummyStep(`levelSkipperC`);

      steps = shuffled(
        standaloneStep,
        standaloneChainA,
        standaloneChainB,
        standaloneChainC,
        branchingSourceA,
        branchingSourceB,
        branchingLeftA,
        branchingLeftB,
        branchingLeftC,
        branchingRightA,
        branchingRightB,
        branchingRightC,
        mergingLeftA,
        mergingLeftB,
        mergingRightA,
        mergingRightB,
        mergingRightC,
        mergingDestinationA,
        mergingDestinationB,
        mergingDestinationC,
        complexMeshInputA,
        complexMeshInputB,
        complexMeshInputC,
        complexMeshOutputAB,
        complexMeshOutputBC,
        complexMeshOutputAC,
        levelSkipperA,
        levelSkipperB,
        levelSkipperC
      );

      orderingConstraints = shuffled(
        [standaloneChainA, standaloneChainB],
        [standaloneChainB, standaloneChainC],
        [branchingSourceA, branchingSourceB],
        [branchingSourceB, branchingLeftA],
        [branchingLeftA, branchingLeftB],
        [branchingLeftB, branchingLeftC],
        [branchingSourceB, branchingRightA],
        [branchingRightA, branchingRightB],
        [branchingRightB, branchingRightC],
        [mergingLeftA, mergingLeftB],
        [mergingLeftB, mergingDestinationA],
        [mergingRightA, mergingRightB],
        [mergingRightB, mergingRightC],
        [mergingRightC, mergingDestinationA],
        [mergingDestinationA, mergingDestinationB],
        [mergingDestinationB, mergingDestinationC],
        [complexMeshInputA, complexMeshOutputAB],
        [complexMeshInputB, complexMeshOutputAB],
        [complexMeshInputB, complexMeshOutputBC],
        [complexMeshInputC, complexMeshOutputBC],
        [complexMeshInputA, complexMeshOutputAC],
        [complexMeshInputC, complexMeshOutputAC],
        [levelSkipperA, levelSkipperB],
        [levelSkipperA, levelSkipperC],
        [levelSkipperB, levelSkipperC]
      );

      output = orderSteps(steps, orderingConstraints);

      const outputStepsValue: Step[] = [];

      function recurse(step: Step): void {
        outputStepsValue.push(step);

        if (step instanceof ParallelStep || step instanceof SerialStep) {
          for (const child of step.children) {
            recurse(child);
          }
        }
      }

      recurse(output);

      outputSteps = outputStepsValue;
    });

    it(`includes every step in the tree`, () => {
      expect(outputSteps).toContain(standaloneStep);
      expect(outputSteps).toContain(standaloneChainA);
      expect(outputSteps).toContain(standaloneChainB);
      expect(outputSteps).toContain(standaloneChainC);
      expect(outputSteps).toContain(branchingSourceA);
      expect(outputSteps).toContain(branchingSourceB);
      expect(outputSteps).toContain(branchingLeftA);
      expect(outputSteps).toContain(branchingLeftB);
      expect(outputSteps).toContain(branchingLeftC);
      expect(outputSteps).toContain(branchingRightA);
      expect(outputSteps).toContain(branchingRightB);
      expect(outputSteps).toContain(branchingRightC);
      expect(outputSteps).toContain(mergingDestinationA);
      expect(outputSteps).toContain(mergingDestinationB);
      expect(outputSteps).toContain(mergingDestinationC);
      expect(outputSteps).toContain(mergingLeftA);
      expect(outputSteps).toContain(mergingLeftB);
      expect(outputSteps).toContain(mergingRightA);
      expect(outputSteps).toContain(mergingRightB);
      expect(outputSteps).toContain(mergingRightC);
      expect(outputSteps).toContain(complexMeshInputA);
      expect(outputSteps).toContain(complexMeshInputB);
      expect(outputSteps).toContain(complexMeshInputC);
      expect(outputSteps).toContain(complexMeshOutputAB);
      expect(outputSteps).toContain(complexMeshOutputBC);
      expect(outputSteps).toContain(complexMeshOutputAC);
      expect(outputSteps).toContain(levelSkipperA);
      expect(outputSteps).toContain(levelSkipperB);
      expect(outputSteps).toContain(levelSkipperC);
    });

    it(`does not include any steps more than once`, () => {
      for (const step of outputSteps) {
        expect(outputSteps.indexOf(step)).toEqual(
          outputSteps.lastIndexOf(step)
        );
      }
    });

    it(`only includes the given steps and parallel and serial steps`, () => {
      for (const step of outputSteps) {
        if (!(step instanceof ParallelStep || step instanceof SerialStep)) {
          expect(steps).toContain(step);
        }
      }
    });

    it(`preserves the ordering constraints`, () => {
      function recurse(
        previouslyExecuted: ReadonlyArray<Step>,
        next: Step
      ): ReadonlyArray<Step> {
        if (next instanceof ParallelStep) {
          const output: Step[] = [];

          for (const child of next.children) {
            output.push(...recurse(previouslyExecuted, child));
          }

          return output;
        }
        if (next instanceof SerialStep) {
          const output: Step[] = [];

          for (const child of next.children) {
            output.push(...recurse([...previouslyExecuted, ...output], child));
          }

          return output;
        } else {
          for (const orderingConstraint of orderingConstraints) {
            if (orderingConstraint[1] === next) {
              expect(previouslyExecuted).toContain(orderingConstraint[0]);
            }
          }

          return [next];
        }
      }

      recurse([], output);
    });

    it(`does not execute any of the given steps`, () => {
      expect(standaloneStep.executePerActionStep).not.toHaveBeenCalled();
      expect(standaloneChainA.executePerActionStep).not.toHaveBeenCalled();
      expect(standaloneChainB.executePerActionStep).not.toHaveBeenCalled();
      expect(standaloneChainC.executePerActionStep).not.toHaveBeenCalled();
      expect(branchingSourceA.executePerActionStep).not.toHaveBeenCalled();
      expect(branchingSourceB.executePerActionStep).not.toHaveBeenCalled();
      expect(branchingLeftA.executePerActionStep).not.toHaveBeenCalled();
      expect(branchingLeftB.executePerActionStep).not.toHaveBeenCalled();
      expect(branchingLeftC.executePerActionStep).not.toHaveBeenCalled();
      expect(branchingRightA.executePerActionStep).not.toHaveBeenCalled();
      expect(branchingRightB.executePerActionStep).not.toHaveBeenCalled();
      expect(branchingRightC.executePerActionStep).not.toHaveBeenCalled();
      expect(mergingDestinationA.executePerActionStep).not.toHaveBeenCalled();
      expect(mergingDestinationB.executePerActionStep).not.toHaveBeenCalled();
      expect(mergingDestinationC.executePerActionStep).not.toHaveBeenCalled();
      expect(mergingLeftA.executePerActionStep).not.toHaveBeenCalled();
      expect(mergingLeftB.executePerActionStep).not.toHaveBeenCalled();
      expect(mergingRightA.executePerActionStep).not.toHaveBeenCalled();
      expect(mergingRightB.executePerActionStep).not.toHaveBeenCalled();
      expect(mergingRightC.executePerActionStep).not.toHaveBeenCalled();
      expect(complexMeshInputA.executePerActionStep).not.toHaveBeenCalled();
      expect(complexMeshInputB.executePerActionStep).not.toHaveBeenCalled();
      expect(complexMeshInputC.executePerActionStep).not.toHaveBeenCalled();
      expect(complexMeshOutputAB.executePerActionStep).not.toHaveBeenCalled();
      expect(complexMeshOutputBC.executePerActionStep).not.toHaveBeenCalled();
      expect(complexMeshOutputAC.executePerActionStep).not.toHaveBeenCalled();
      expect(levelSkipperA.executePerActionStep).not.toHaveBeenCalled();
      expect(levelSkipperB.executePerActionStep).not.toHaveBeenCalled();
      expect(levelSkipperC.executePerActionStep).not.toHaveBeenCalled();
    });
  });

  function cyclicScenario(
    description: string,
    additionalOrderingConstraintFactory: (steps: {
      standaloneStep: DummyStep;
      standaloneChainA: DummyStep;
      standaloneChainB: DummyStep;
      standaloneChainC: DummyStep;
      branchingSourceA: DummyStep;
      branchingSourceB: DummyStep;
      branchingLeftA: DummyStep;
      branchingLeftB: DummyStep;
      branchingLeftC: DummyStep;
      branchingRightA: DummyStep;
      branchingRightB: DummyStep;
      branchingRightC: DummyStep;
      mergingLeftA: DummyStep;
      mergingLeftB: DummyStep;
      mergingRightA: DummyStep;
      mergingRightB: DummyStep;
      mergingRightC: DummyStep;
      mergingDestinationA: DummyStep;
      mergingDestinationB: DummyStep;
      mergingDestinationC: DummyStep;
      complexMeshInputA: DummyStep;
      complexMeshInputB: DummyStep;
      complexMeshInputC: DummyStep;
      complexMeshOutputAB: DummyStep;
      complexMeshOutputBC: DummyStep;
      complexMeshOutputAC: DummyStep;
      levelSkipperA: DummyStep;
      levelSkipperB: DummyStep;
      levelSkipperC: DummyStep;
    }) => ReadonlyArray<readonly [DummyStep, DummyStep]>
  ): void {
    describe(description, () => {
      let standaloneStep: DummyStep;
      let standaloneChainA: DummyStep;
      let standaloneChainB: DummyStep;
      let standaloneChainC: DummyStep;
      let branchingSourceA: DummyStep;
      let branchingSourceB: DummyStep;
      let branchingLeftA: DummyStep;
      let branchingLeftB: DummyStep;
      let branchingLeftC: DummyStep;
      let branchingRightA: DummyStep;
      let branchingRightB: DummyStep;
      let branchingRightC: DummyStep;
      let mergingDestinationA: DummyStep;
      let mergingDestinationB: DummyStep;
      let mergingDestinationC: DummyStep;
      let mergingLeftA: DummyStep;
      let mergingLeftB: DummyStep;
      let mergingRightA: DummyStep;
      let mergingRightB: DummyStep;
      let mergingRightC: DummyStep;
      let complexMeshInputA: DummyStep;
      let complexMeshInputB: DummyStep;
      let complexMeshInputC: DummyStep;
      let complexMeshOutputAB: DummyStep;
      let complexMeshOutputBC: DummyStep;
      let complexMeshOutputAC: DummyStep;
      let levelSkipperA: DummyStep;
      let levelSkipperB: DummyStep;
      let levelSkipperC: DummyStep;
      let steps: ReadonlyArray<Step>;
      let orderingConstraints: ReadonlyArray<readonly [Step, Step]>;
      let error: null | Error;

      beforeAll(() => {
        standaloneStep = new DummyStep(`standaloneStep`);
        standaloneChainA = new DummyStep(`standaloneChainA`);
        standaloneChainB = new DummyStep(`standaloneChainB`);
        standaloneChainC = new DummyStep(`standaloneChainC`);
        branchingSourceA = new DummyStep(`branchingSourceA`);
        branchingSourceB = new DummyStep(`branchingSourceB`);
        branchingLeftA = new DummyStep(`branchingLeftA`);
        branchingLeftB = new DummyStep(`branchingLeftB`);
        branchingLeftC = new DummyStep(`branchingLeftC`);
        branchingRightA = new DummyStep(`branchingRightA`);
        branchingRightB = new DummyStep(`branchingRightB`);
        branchingRightC = new DummyStep(`branchingRightC`);
        mergingLeftA = new DummyStep(`mergingLeftA`);
        mergingLeftB = new DummyStep(`mergingLeftB`);
        mergingRightA = new DummyStep(`mergingRightA`);
        mergingRightB = new DummyStep(`mergingRightB`);
        mergingRightC = new DummyStep(`mergingRightC`);
        mergingDestinationA = new DummyStep(`mergingDestinationA`);
        mergingDestinationB = new DummyStep(`mergingDestinationB`);
        mergingDestinationC = new DummyStep(`mergingDestinationC`);
        complexMeshInputA = new DummyStep(`complexMeshInputA`);
        complexMeshInputB = new DummyStep(`complexMeshInputB`);
        complexMeshInputC = new DummyStep(`complexMeshInputC`);
        complexMeshOutputAB = new DummyStep(`complexMeshOutputAB`);
        complexMeshOutputBC = new DummyStep(`complexMeshOutputBC`);
        complexMeshOutputAC = new DummyStep(`complexMeshOutputAC`);
        levelSkipperA = new DummyStep(`levelSkipperA`);
        levelSkipperB = new DummyStep(`levelSkipperB`);
        levelSkipperC = new DummyStep(`levelSkipperC`);

        steps = shuffled(
          standaloneStep,
          standaloneChainA,
          standaloneChainB,
          standaloneChainC,
          branchingSourceA,
          branchingSourceB,
          branchingLeftA,
          branchingLeftB,
          branchingLeftC,
          branchingRightA,
          branchingRightB,
          branchingRightC,
          mergingLeftA,
          mergingLeftB,
          mergingRightA,
          mergingRightB,
          mergingRightC,
          mergingDestinationA,
          mergingDestinationB,
          mergingDestinationC,
          complexMeshInputA,
          complexMeshInputB,
          complexMeshInputC,
          complexMeshOutputAB,
          complexMeshOutputBC,
          complexMeshOutputAC,
          levelSkipperA,
          levelSkipperB,
          levelSkipperC
        );

        orderingConstraints = shuffled(
          [standaloneChainA, standaloneChainB],
          [standaloneChainB, standaloneChainC],
          [branchingSourceA, branchingSourceB],
          [branchingSourceB, branchingLeftA],
          [branchingLeftA, branchingLeftB],
          [branchingLeftB, branchingLeftC],
          [branchingSourceB, branchingRightA],
          [branchingRightA, branchingRightB],
          [branchingRightB, branchingRightC],
          [mergingLeftA, mergingLeftB],
          [mergingLeftB, mergingDestinationA],
          [mergingRightA, mergingRightB],
          [mergingRightB, mergingRightC],
          [mergingRightC, mergingDestinationA],
          [mergingDestinationA, mergingDestinationB],
          [mergingDestinationB, mergingDestinationC],
          [complexMeshInputA, complexMeshOutputAB],
          [complexMeshInputB, complexMeshOutputAB],
          [complexMeshInputB, complexMeshOutputBC],
          [complexMeshInputC, complexMeshOutputBC],
          [complexMeshInputA, complexMeshOutputAC],
          [complexMeshInputC, complexMeshOutputAC],
          [levelSkipperA, levelSkipperB],
          [levelSkipperA, levelSkipperC],
          [levelSkipperB, levelSkipperC],
          ...additionalOrderingConstraintFactory({
            standaloneStep,
            standaloneChainA,
            standaloneChainB,
            standaloneChainC,
            branchingSourceA,
            branchingSourceB,
            branchingLeftA,
            branchingLeftB,
            branchingLeftC,
            branchingRightA,
            branchingRightB,
            branchingRightC,
            mergingLeftA,
            mergingLeftB,
            mergingRightA,
            mergingRightB,
            mergingRightC,
            mergingDestinationA,
            mergingDestinationB,
            mergingDestinationC,
            complexMeshInputA,
            complexMeshInputB,
            complexMeshInputC,
            complexMeshOutputAB,
            complexMeshOutputBC,
            complexMeshOutputAC,
            levelSkipperA,
            levelSkipperB,
            levelSkipperC,
          })
        );

        try {
          orderSteps(steps, orderingConstraints);
          error = null;
        } catch (e) {
          error = e as Error;
        }
      });

      it(`throws the expected error`, () => {
        expect(error).toEqual(
          new Error(
            `Unable to produce a plan for a set of steps with cyclic dependencies.`
          )
        );
      });

      it(`does not execute any of the given steps`, () => {
        expect(standaloneStep.executePerActionStep).not.toHaveBeenCalled();
        expect(standaloneChainA.executePerActionStep).not.toHaveBeenCalled();
        expect(standaloneChainB.executePerActionStep).not.toHaveBeenCalled();
        expect(standaloneChainC.executePerActionStep).not.toHaveBeenCalled();
        expect(branchingSourceA.executePerActionStep).not.toHaveBeenCalled();
        expect(branchingSourceB.executePerActionStep).not.toHaveBeenCalled();
        expect(branchingLeftA.executePerActionStep).not.toHaveBeenCalled();
        expect(branchingLeftB.executePerActionStep).not.toHaveBeenCalled();
        expect(branchingLeftC.executePerActionStep).not.toHaveBeenCalled();
        expect(branchingRightA.executePerActionStep).not.toHaveBeenCalled();
        expect(branchingRightB.executePerActionStep).not.toHaveBeenCalled();
        expect(branchingRightC.executePerActionStep).not.toHaveBeenCalled();
        expect(mergingDestinationA.executePerActionStep).not.toHaveBeenCalled();
        expect(mergingDestinationB.executePerActionStep).not.toHaveBeenCalled();
        expect(mergingDestinationC.executePerActionStep).not.toHaveBeenCalled();
        expect(mergingLeftA.executePerActionStep).not.toHaveBeenCalled();
        expect(mergingLeftB.executePerActionStep).not.toHaveBeenCalled();
        expect(mergingRightA.executePerActionStep).not.toHaveBeenCalled();
        expect(mergingRightB.executePerActionStep).not.toHaveBeenCalled();
        expect(mergingRightC.executePerActionStep).not.toHaveBeenCalled();
        expect(complexMeshInputA.executePerActionStep).not.toHaveBeenCalled();
        expect(complexMeshInputB.executePerActionStep).not.toHaveBeenCalled();
        expect(complexMeshInputC.executePerActionStep).not.toHaveBeenCalled();
        expect(complexMeshOutputAB.executePerActionStep).not.toHaveBeenCalled();
        expect(complexMeshOutputBC.executePerActionStep).not.toHaveBeenCalled();
        expect(complexMeshOutputAC.executePerActionStep).not.toHaveBeenCalled();
        expect(levelSkipperA.executePerActionStep).not.toHaveBeenCalled();
        expect(levelSkipperB.executePerActionStep).not.toHaveBeenCalled();
        expect(levelSkipperC.executePerActionStep).not.toHaveBeenCalled();
      });
    });
  }

  cyclicScenario(
    `when a standalone step is self-cyclic`,
    ({ standaloneStep }) => [[standaloneStep, standaloneStep]]
  );

  cyclicScenario(
    `when the start of a chain is self-cyclic`,
    ({ standaloneChainA }) => [[standaloneChainA, standaloneChainA]]
  );

  cyclicScenario(
    `when the middle of a chain is self-cyclic`,
    ({ standaloneChainB }) => [[standaloneChainB, standaloneChainB]]
  );

  cyclicScenario(
    `when the end of a chain is self-cyclic`,
    ({ standaloneChainC }) => [[standaloneChainC, standaloneChainC]]
  );
});

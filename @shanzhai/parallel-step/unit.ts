import { Step, Effect, UnkeyedStore } from "@shanzhai/interfaces";
import { ParallelStep } from ".";

describe(`ParallelStep`, () => {
  const unkeyedStore: UnkeyedStore<unknown> = {
    type: `unkeyedStore`,
    name: `Test Unkeyed Store`,
    get: jasmine.createSpy(`unkeyedStore.get`).and.callFake(fail),
    set: jasmine.createSpy(`unkeyedStore.set`).and.callFake(fail),
  };

  const effectAA: Effect = {
    type: `unkeyedStoreSet`,
    unkeyedStore,
  };

  const effectAB: Effect = {
    type: `unkeyedStoreSet`,
    unkeyedStore,
  };

  const effectBA: Effect = {
    type: `unkeyedStoreSet`,
    unkeyedStore,
  };

  const effectBB: Effect = {
    type: `unkeyedStoreSet`,
    unkeyedStore,
  };

  const effectBC: Effect = {
    type: `unkeyedStoreSet`,
    unkeyedStore,
  };

  const effectBD: Effect = {
    type: `unkeyedStoreSet`,
    unkeyedStore,
  };

  const effectCA: Effect = {
    type: `unkeyedStoreSet`,
    unkeyedStore,
  };

  const effectCB: Effect = {
    type: `unkeyedStoreSet`,
    unkeyedStore,
  };

  const effectDA: Effect = {
    type: `unkeyedStoreSet`,
    unkeyedStore,
  };

  const effectDB: Effect = {
    type: `unkeyedStoreSet`,
    unkeyedStore,
  };

  const effectDC: Effect = {
    type: `unkeyedStoreSet`,
    unkeyedStore,
  };

  describe(`on construction`, () => {
    let childA: Step;
    let executePerActionStepA: jasmine.Spy;
    let childB: Step;
    let executePerActionStepB: jasmine.Spy;
    let childC: Step;
    let executePerActionStepC: jasmine.Spy;
    let childD: Step;
    let executePerActionStepD: jasmine.Spy;
    let parallelStep: ParallelStep;

    beforeAll(() => {
      executePerActionStepA = jasmine.createSpy(`executePerActionStepA`);
      childA = {
        name: `Test Child Name A`,
        executePerActionStep: executePerActionStepA,
        effects: [effectAA, effectAB],
      };

      executePerActionStepB = jasmine.createSpy(`executePerActionStepB`);
      childB = {
        name: `Test Child Name B`,
        executePerActionStep: executePerActionStepB,
        effects: [effectBA, effectBB, effectBC, effectBD],
      };

      executePerActionStepC = jasmine.createSpy(`executePerActionStepC`);
      childC = {
        name: `Test Child Name C`,
        executePerActionStep: executePerActionStepC,
        effects: [effectCA, effectCB],
      };

      executePerActionStepD = jasmine.createSpy(`executePerActionStepD`);
      childD = {
        name: `Test Child Name D`,
        executePerActionStep: executePerActionStepD,
        effects: [effectDA, effectDB, effectDC],
      };

      parallelStep = new ParallelStep(`Test Name`, [
        childA,
        childB,
        childC,
        childD,
      ]);
    });

    it(`exposes its name`, () => {
      expect(parallelStep.name).toEqual(`Test Name`);
    });

    it(`exposes its children`, () => {
      expect(parallelStep.children).toEqual([childA, childB, childC, childD]);
    });

    it(`does not interact with its children`, () => {
      expect(executePerActionStepA).not.toHaveBeenCalled();
      expect(executePerActionStepB).not.toHaveBeenCalled();
      expect(executePerActionStepC).not.toHaveBeenCalled();
      expect(executePerActionStepD).not.toHaveBeenCalled();
    });

    it(`exposes the effects of its children`, () => {
      expect(parallelStep.effects).toEqual([
        effectAA,
        effectAB,
        effectBA,
        effectBB,
        effectBC,
        effectBD,
        effectCA,
        effectCB,
        effectDA,
        effectDB,
        effectDC,
      ]);
    });
  });

  describe(`on calling executePerActionStep`, () => {
    describe(`without any children`, () => {
      let parallelStep: ParallelStep;
      let callback: jasmine.Spy;
      let promise: Promise<void>;

      beforeAll(() => {
        parallelStep = new ParallelStep(`Test Name`, []);
        callback = jasmine.createSpy(`callback`);
        promise = parallelStep.executePerActionStep(callback);
      });

      it(`does not change its name`, () => {
        expect(parallelStep.name).toEqual(`Test Name`);
      });

      it(`does not change its exposed children`, () => {
        expect(parallelStep.children).toEqual([]);
      });

      it(`does not execute the callback`, () => {
        expect(callback).not.toHaveBeenCalled();
      });

      it(`resolves the returned promise`, async () => {
        await expectAsync(promise).toBeResolved();
      });

      it(`continues to expose no effects`, () => {
        expect(parallelStep.effects).toEqual([]);
      });
    });

    describe(`without any completing`, () => {
      let childA: Step;
      let executePerActionStepA: jasmine.Spy;
      let childB: Step;
      let executePerActionStepB: jasmine.Spy;
      let childC: Step;
      let executePerActionStepC: jasmine.Spy;
      let childD: Step;
      let executePerActionStepD: jasmine.Spy;
      let parallelStep: ParallelStep;
      let callback: jasmine.Spy;
      let resolvedOrRejected = false;

      beforeAll(async () => {
        executePerActionStepA = jasmine
          .createSpy(`executePerActionStepA`)
          .and.returnValue(
            new Promise(() => {
              /* Never resolved. */
            })
          );
        childA = {
          name: `Test Child Name A`,
          executePerActionStep: executePerActionStepA,
          effects: [effectAA, effectAB],
        };

        executePerActionStepB = jasmine
          .createSpy(`executePerActionStepB`)
          .and.returnValue(
            new Promise(() => {
              /* Never resolved. */
            })
          );
        childB = {
          name: `Test Child Name B`,
          executePerActionStep: executePerActionStepB,
          effects: [effectBA, effectBB, effectBC, effectBD],
        };

        executePerActionStepC = jasmine
          .createSpy(`executePerActionStepC`)
          .and.returnValue(
            new Promise(() => {
              /* Never resolved. */
            })
          );
        childC = {
          name: `Test Child Name C`,
          executePerActionStep: executePerActionStepC,
          effects: [effectCA, effectCB],
        };

        executePerActionStepD = jasmine
          .createSpy(`executePerActionStepD`)
          .and.returnValue(
            new Promise(() => {
              /* Never resolved. */
            })
          );
        childD = {
          name: `Test Child Name D`,
          executePerActionStep: executePerActionStepD,
          effects: [effectDA, effectDB, effectDC],
        };

        parallelStep = new ParallelStep(`Test Name`, [
          childA,
          childB,
          childC,
          childD,
        ]);

        callback = jasmine.createSpy(`callback`);

        parallelStep.executePerActionStep(callback).then(
          () => {
            resolvedOrRejected = true;
          },
          () => {
            resolvedOrRejected = true;
          }
        );

        await new Promise((resolve) => setTimeout(resolve, 250));
      });

      it(`calls executePerActionStep on each of its children once`, () => {
        expect(executePerActionStepA).toHaveBeenCalledTimes(1);
        expect(executePerActionStepB).toHaveBeenCalledTimes(1);
        expect(executePerActionStepC).toHaveBeenCalledTimes(1);
        expect(executePerActionStepD).toHaveBeenCalledTimes(1);
      });

      it(`passes down the callback to each child`, () => {
        expect(executePerActionStepA).toHaveBeenCalledWith(callback);
        expect(executePerActionStepB).toHaveBeenCalledWith(callback);
        expect(executePerActionStepC).toHaveBeenCalledWith(callback);
        expect(executePerActionStepD).toHaveBeenCalledWith(callback);
      });

      it(`does not change its name`, () => {
        expect(parallelStep.name).toEqual(`Test Name`);
      });

      it(`does not change its exposed children`, () => {
        expect(parallelStep.children).toEqual([childA, childB, childC, childD]);
      });

      it(`does not execute the callback`, () => {
        expect(callback).not.toHaveBeenCalled();
      });

      it(`does not resolve or reject the returned promise`, () => {
        expect(resolvedOrRejected).toBeFalse();
      });

      it(`continues to expose the effects of its children`, () => {
        expect(parallelStep.effects).toEqual([
          effectAA,
          effectAB,
          effectBA,
          effectBB,
          effectBC,
          effectBD,
          effectCA,
          effectCB,
          effectDA,
          effectDB,
          effectDC,
        ]);
      });
    });

    describe(`with some completing successfully`, () => {
      let childA: Step;
      let executePerActionStepA: jasmine.Spy;
      let childB: Step;
      let executePerActionStepB: jasmine.Spy;
      let childC: Step;
      let executePerActionStepC: jasmine.Spy;
      let childD: Step;
      let executePerActionStepD: jasmine.Spy;
      let parallelStep: ParallelStep;
      let callback: jasmine.Spy;
      let resolvedOrRejected = false;

      beforeAll(async () => {
        executePerActionStepA = jasmine
          .createSpy(`executePerActionStepA`)
          .and.resolveTo();
        childA = {
          name: `Test Child Name A`,
          executePerActionStep: executePerActionStepA,
          effects: [effectAA, effectAB],
        };

        executePerActionStepB = jasmine
          .createSpy(`executePerActionStepB`)
          .and.returnValue(
            new Promise(() => {
              /* Never resolved. */
            })
          );
        childB = {
          name: `Test Child Name B`,
          executePerActionStep: executePerActionStepB,
          effects: [effectBA, effectBB, effectBC, effectBD],
        };

        executePerActionStepC = jasmine
          .createSpy(`executePerActionStepC`)
          .and.resolveTo();
        childC = {
          name: `Test Child Name C`,
          executePerActionStep: executePerActionStepC,
          effects: [effectCA, effectCB],
        };

        executePerActionStepD = jasmine
          .createSpy(`executePerActionStepD`)
          .and.resolveTo();
        childD = {
          name: `Test Child Name D`,
          executePerActionStep: executePerActionStepD,
          effects: [effectDA, effectDB, effectDC],
        };

        parallelStep = new ParallelStep(`Test Name`, [
          childA,
          childB,
          childC,
          childD,
        ]);

        callback = jasmine.createSpy(`callback`);

        parallelStep.executePerActionStep(callback).then(
          () => {
            resolvedOrRejected = true;
          },
          () => {
            resolvedOrRejected = true;
          }
        );

        await new Promise((resolve) => setTimeout(resolve, 250));
      });

      it(`does not call executePerActionStep on its children again`, () => {
        expect(executePerActionStepA).toHaveBeenCalledTimes(1);
        expect(executePerActionStepB).toHaveBeenCalledTimes(1);
        expect(executePerActionStepC).toHaveBeenCalledTimes(1);
        expect(executePerActionStepD).toHaveBeenCalledTimes(1);
      });

      it(`does not change its name`, () => {
        expect(parallelStep.name).toEqual(`Test Name`);
      });

      it(`does not change its exposed children`, () => {
        expect(parallelStep.children).toEqual([childA, childB, childC, childD]);
      });

      it(`does not execute the callback`, () => {
        expect(callback).not.toHaveBeenCalled();
      });

      it(`does not resolve or reject the returned promise`, () => {
        expect(resolvedOrRejected).toBeFalse();
      });

      it(`continues to expose the effects of its children`, () => {
        expect(parallelStep.effects).toEqual([
          effectAA,
          effectAB,
          effectBA,
          effectBB,
          effectBC,
          effectBD,
          effectCA,
          effectCB,
          effectDA,
          effectDB,
          effectDC,
        ]);
      });
    });

    describe(`with all completing successfully`, () => {
      let childA: Step;
      let executePerActionStepA: jasmine.Spy;
      let childB: Step;
      let executePerActionStepB: jasmine.Spy;
      let childC: Step;
      let executePerActionStepC: jasmine.Spy;
      let childD: Step;
      let executePerActionStepD: jasmine.Spy;
      let parallelStep: ParallelStep;
      let callback: jasmine.Spy;
      let promise: Promise<void>;

      beforeAll(() => {
        executePerActionStepA = jasmine
          .createSpy(`executePerActionStepA`)
          .and.resolveTo();
        childA = {
          name: `Test Child Name A`,
          executePerActionStep: executePerActionStepA,
          effects: [effectAA, effectAB],
        };

        executePerActionStepB = jasmine
          .createSpy(`executePerActionStepB`)
          .and.resolveTo();
        childB = {
          name: `Test Child Name B`,
          executePerActionStep: executePerActionStepB,
          effects: [effectBA, effectBB, effectBC, effectBD],
        };

        executePerActionStepC = jasmine
          .createSpy(`executePerActionStepC`)
          .and.resolveTo();
        childC = {
          name: `Test Child Name C`,
          executePerActionStep: executePerActionStepC,
          effects: [effectCA, effectCB],
        };

        executePerActionStepD = jasmine
          .createSpy(`executePerActionStepD`)
          .and.resolveTo();
        childD = {
          name: `Test Child Name D`,
          executePerActionStep: executePerActionStepD,
          effects: [effectDA, effectDB, effectDC],
        };

        parallelStep = new ParallelStep(`Test Name`, [
          childA,
          childB,
          childC,
          childD,
        ]);

        callback = jasmine.createSpy(`callback`);

        promise = parallelStep.executePerActionStep(callback);
      });

      it(`does not call executePerActionStep on its children again`, () => {
        expect(executePerActionStepA).toHaveBeenCalledTimes(1);
        expect(executePerActionStepB).toHaveBeenCalledTimes(1);
        expect(executePerActionStepC).toHaveBeenCalledTimes(1);
        expect(executePerActionStepD).toHaveBeenCalledTimes(1);
      });

      it(`does not change its name`, () => {
        expect(parallelStep.name).toEqual(`Test Name`);
      });

      it(`does not change its exposed children`, () => {
        expect(parallelStep.children).toEqual([childA, childB, childC, childD]);
      });

      it(`does not execute the callback`, () => {
        expect(callback).not.toHaveBeenCalled();
      });

      it(`resolves the returned promise`, async () => {
        await expectAsync(promise).toBeResolved();
      });

      it(`continues to expose the effects of its children`, () => {
        expect(parallelStep.effects).toEqual([
          effectAA,
          effectAB,
          effectBA,
          effectBB,
          effectBC,
          effectBD,
          effectCA,
          effectCB,
          effectDA,
          effectDB,
          effectDC,
        ]);
      });
    });

    describe(`with some completing successfully, but one failing`, () => {
      let childA: Step;
      let executePerActionStepA: jasmine.Spy;
      let childB: Step;
      let executePerActionStepB: jasmine.Spy;
      let childC: Step;
      let executePerActionStepC: jasmine.Spy;
      let childD: Step;
      let executePerActionStepD: jasmine.Spy;
      let parallelStep: ParallelStep;
      let callback: jasmine.Spy;
      let promise: Promise<void>;

      beforeAll(() => {
        executePerActionStepA = jasmine
          .createSpy(`executePerActionStepA`)
          .and.resolveTo();
        childA = {
          name: `Test Child Name A`,
          executePerActionStep: executePerActionStepA,
          effects: [effectAA, effectAB],
        };

        executePerActionStepB = jasmine
          .createSpy(`executePerActionStepB`)
          .and.rejectWith(new Error(`Test Error`));
        childB = {
          name: `Test Child Name B`,
          executePerActionStep: executePerActionStepB,
          effects: [effectBA, effectBB, effectBC, effectBD],
        };

        executePerActionStepC = jasmine
          .createSpy(`executePerActionStepC`)
          .and.resolveTo();
        childC = {
          name: `Test Child Name C`,
          executePerActionStep: executePerActionStepC,
          effects: [effectCA, effectCB],
        };

        executePerActionStepD = jasmine
          .createSpy(`executePerActionStepD`)
          .and.resolveTo();
        childD = {
          name: `Test Child Name D`,
          executePerActionStep: executePerActionStepD,
          effects: [effectDA, effectDB, effectDC],
        };

        parallelStep = new ParallelStep(`Test Name`, [
          childA,
          childB,
          childC,
          childD,
        ]);

        callback = jasmine.createSpy(`callback`);

        promise = parallelStep.executePerActionStep(callback);
        promise.then(
          () => {
            /* Needed to avoid rejection error. */
          },
          () => {
            /* Needed to avoid rejection error. */
          }
        );
      });

      it(`does not call executePerActionStep on its children again`, () => {
        expect(executePerActionStepA).toHaveBeenCalledTimes(1);
        expect(executePerActionStepB).toHaveBeenCalledTimes(1);
        expect(executePerActionStepC).toHaveBeenCalledTimes(1);
        expect(executePerActionStepD).toHaveBeenCalledTimes(1);
      });

      it(`does not change its name`, () => {
        expect(parallelStep.name).toEqual(`Test Name`);
      });

      it(`does not change its exposed children`, () => {
        expect(parallelStep.children).toEqual([childA, childB, childC, childD]);
      });

      it(`does not execute the callback`, () => {
        expect(callback).not.toHaveBeenCalled();
      });

      it(`passes on the rejection reason`, async () => {
        await expectAsync(promise).toBeRejectedWithError(`Test Error`);
      });

      it(`continues to expose the effects of its children`, () => {
        expect(parallelStep.effects).toEqual([
          effectAA,
          effectAB,
          effectBA,
          effectBB,
          effectBC,
          effectBD,
          effectCA,
          effectCB,
          effectDA,
          effectDB,
          effectDC,
        ]);
      });
    });
  });
});

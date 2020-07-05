import { Step } from "../../step";
import { SerialStep } from ".";

describe(`SerialStep`, () => {
  describe(`on construction`, () => {
    let childA: Step;
    let executePerActionStepA: jasmine.Spy;
    let childB: Step;
    let executePerActionStepB: jasmine.Spy;
    let childC: Step;
    let executePerActionStepC: jasmine.Spy;
    let childD: Step;
    let executePerActionStepD: jasmine.Spy;
    let serialStep: SerialStep;

    beforeAll(() => {
      executePerActionStepA = jasmine.createSpy(`executePerActionStepA`);
      childA = {
        name: `Test Child Name A`,
        executePerActionStep: executePerActionStepA,
      };

      executePerActionStepB = jasmine.createSpy(`executePerActionStepB`);
      childB = {
        name: `Test Child Name B`,
        executePerActionStep: executePerActionStepB,
      };

      executePerActionStepC = jasmine.createSpy(`executePerActionStepC`);
      childC = {
        name: `Test Child Name C`,
        executePerActionStep: executePerActionStepC,
      };

      executePerActionStepD = jasmine.createSpy(`executePerActionStepD`);
      childD = {
        name: `Test Child Name D`,
        executePerActionStep: executePerActionStepD,
      };

      serialStep = new SerialStep(`Test Name`, [
        childA,
        childB,
        childC,
        childD,
      ]);
    });

    it(`exposes its name`, () => {
      expect(serialStep.name).toEqual(`Test Name`);
    });

    it(`exposes its children`, () => {
      expect(serialStep.children).toEqual([childA, childB, childC, childD]);
    });

    it(`does not interact with its children`, () => {
      expect(executePerActionStepA).not.toHaveBeenCalled();
      expect(executePerActionStepB).not.toHaveBeenCalled();
      expect(executePerActionStepC).not.toHaveBeenCalled();
      expect(executePerActionStepD).not.toHaveBeenCalled();
    });
  });

  describe(`on calling executePerActionStep`, () => {
    describe(`without any children`, () => {
      let serialStep: SerialStep;
      let callback: jasmine.Spy;
      let promise: Promise<void>;

      beforeAll(() => {
        serialStep = new SerialStep(`Test Name`, []);
        callback = jasmine.createSpy(`callback`);
        promise = serialStep.executePerActionStep(callback);
      });

      it(`does not change its name`, () => {
        expect(serialStep.name).toEqual(`Test Name`);
      });

      it(`does not change its exposed children`, () => {
        expect(serialStep.children).toEqual([]);
      });

      it(`does not execute the callback`, () => {
        expect(callback).not.toHaveBeenCalled();
      });

      it(`resolves the returned promise`, () => {
        expectAsync(promise).toBeResolved();
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
      let serialStep: SerialStep;
      let callback: jasmine.Spy;
      let promise: Promise<void>;

      beforeAll(() => {
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
        };

        executePerActionStepB = jasmine.createSpy(`executePerActionStepB`);
        childB = {
          name: `Test Child Name B`,
          executePerActionStep: executePerActionStepB,
        };

        executePerActionStepC = jasmine.createSpy(`executePerActionStepC`);
        childC = {
          name: `Test Child Name C`,
          executePerActionStep: executePerActionStepC,
        };

        executePerActionStepD = jasmine.createSpy(`executePerActionStepD`);
        childD = {
          name: `Test Child Name D`,
          executePerActionStep: executePerActionStepD,
        };

        serialStep = new SerialStep(`Test Name`, [
          childA,
          childB,
          childC,
          childD,
        ]);

        callback = jasmine.createSpy(`callback`);

        promise = serialStep.executePerActionStep(callback);
      });

      it(`calls executePerActionStep on its first child`, () => {
        expect(executePerActionStepA).toHaveBeenCalledTimes(1);
      });

      it(`passes down the callback to the first child`, () => {
        expect(executePerActionStepA).toHaveBeenCalledWith(callback);
      });

      it(`does not call executePerActionStep on other children`, () => {
        expect(executePerActionStepB).not.toHaveBeenCalled();
        expect(executePerActionStepC).not.toHaveBeenCalled();
        expect(executePerActionStepD).not.toHaveBeenCalled();
      });

      it(`does not change its name`, () => {
        expect(serialStep.name).toEqual(`Test Name`);
      });

      it(`does not change its exposed children`, () => {
        expect(serialStep.children).toEqual([childA, childB, childC, childD]);
      });

      it(`does not execute the callback`, () => {
        expect(callback).not.toHaveBeenCalled();
      });

      it(`does not resolve the returned promise`, () => {
        expectAsync(promise).not.toBeResolved();
      });

      it(`does not reject the returned promise`, () => {
        expectAsync(promise).not.toBeRejected();
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
      let serialStep: SerialStep;
      let callback: jasmine.Spy;
      let promise: Promise<void>;

      beforeAll(() => {
        executePerActionStepA = jasmine
          .createSpy(`executePerActionStepA`)
          .and.returnValue(Promise.resolve());
        childA = {
          name: `Test Child Name A`,
          executePerActionStep: executePerActionStepA,
        };

        executePerActionStepB = jasmine
          .createSpy(`executePerActionStepB`)
          .and.returnValue(Promise.resolve());
        childB = {
          name: `Test Child Name B`,
          executePerActionStep: executePerActionStepB,
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
        };

        executePerActionStepD = jasmine.createSpy(`executePerActionStepD`);
        childD = {
          name: `Test Child Name D`,
          executePerActionStep: executePerActionStepD,
        };

        serialStep = new SerialStep(`Test Name`, [
          childA,
          childB,
          childC,
          childD,
        ]);

        callback = jasmine.createSpy(`callback`);

        promise = serialStep.executePerActionStep(callback);
      });

      it(`does not call executePerActionStep on its children again`, () => {
        expect(executePerActionStepA).toHaveBeenCalledTimes(1);
        expect(executePerActionStepB).toHaveBeenCalledTimes(1);
      });

      it(`calls executePerActionStep on the next child`, () => {
        expect(executePerActionStepC).toHaveBeenCalledTimes(1);
      });

      it(`passes down the callback to its children`, () => {
        expect(executePerActionStepA).toHaveBeenCalledWith(callback);
        expect(executePerActionStepB).toHaveBeenCalledWith(callback);
        expect(executePerActionStepC).toHaveBeenCalledWith(callback);
      });

      it(`does not call executePerActionStep on other children`, () => {
        expect(executePerActionStepD).not.toHaveBeenCalled();
      });

      it(`does not change its name`, () => {
        expect(serialStep.name).toEqual(`Test Name`);
      });

      it(`does not change its exposed children`, () => {
        expect(serialStep.children).toEqual([childA, childB, childC, childD]);
      });

      it(`does not execute the callback`, () => {
        expect(callback).not.toHaveBeenCalled();
      });

      it(`does not resolve the returned promise`, () => {
        expectAsync(promise).not.toBeResolved();
      });

      it(`does not reject the returned promise`, () => {
        expectAsync(promise).not.toBeRejected();
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
      let serialStep: SerialStep;
      let callback: jasmine.Spy;
      let promise: Promise<void>;

      beforeAll(() => {
        executePerActionStepA = jasmine
          .createSpy(`executePerActionStepA`)
          .and.returnValue(Promise.resolve());
        childA = {
          name: `Test Child Name A`,
          executePerActionStep: executePerActionStepA,
        };

        executePerActionStepB = jasmine
          .createSpy(`executePerActionStepB`)
          .and.returnValue(Promise.resolve());
        childB = {
          name: `Test Child Name B`,
          executePerActionStep: executePerActionStepB,
        };

        executePerActionStepC = jasmine
          .createSpy(`executePerActionStepC`)
          .and.returnValue(Promise.resolve());
        childC = {
          name: `Test Child Name C`,
          executePerActionStep: executePerActionStepC,
        };

        executePerActionStepD = jasmine
          .createSpy(`executePerActionStepD`)
          .and.returnValue(Promise.resolve());
        childD = {
          name: `Test Child Name D`,
          executePerActionStep: executePerActionStepD,
        };

        serialStep = new SerialStep(`Test Name`, [
          childA,
          childB,
          childC,
          childD,
        ]);

        callback = jasmine.createSpy(`callback`);

        promise = serialStep.executePerActionStep(callback);
      });

      it(`does not call executePerActionStep on its children again`, () => {
        expect(executePerActionStepA).toHaveBeenCalledTimes(1);
        expect(executePerActionStepB).toHaveBeenCalledTimes(1);
        expect(executePerActionStepC).toHaveBeenCalledTimes(1);
        expect(executePerActionStepD).toHaveBeenCalledTimes(1);
      });

      it(`passes down the callback to its children`, () => {
        expect(executePerActionStepA).toHaveBeenCalledWith(callback);
        expect(executePerActionStepB).toHaveBeenCalledWith(callback);
        expect(executePerActionStepC).toHaveBeenCalledWith(callback);
        expect(executePerActionStepD).toHaveBeenCalledWith(callback);
      });

      it(`does not change its name`, () => {
        expect(serialStep.name).toEqual(`Test Name`);
      });

      it(`does not change its exposed children`, () => {
        expect(serialStep.children).toEqual([childA, childB, childC, childD]);
      });

      it(`does not execute the callback`, () => {
        expect(callback).not.toHaveBeenCalled();
      });

      it(`resolves the returned promise`, () => {
        expectAsync(promise).toBeResolved();
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
      let serialStep: SerialStep;
      let callback: jasmine.Spy;
      let promise: Promise<void>;

      beforeAll(() => {
        executePerActionStepA = jasmine
          .createSpy(`executePerActionStepA`)
          .and.returnValue(Promise.resolve());
        childA = {
          name: `Test Child Name A`,
          executePerActionStep: executePerActionStepA,
        };

        executePerActionStepB = jasmine
          .createSpy(`executePerActionStepB`)
          .and.returnValue(Promise.resolve());
        childB = {
          name: `Test Child Name B`,
          executePerActionStep: executePerActionStepB,
        };

        executePerActionStepC = jasmine
          .createSpy(`executePerActionStepC`)
          .and.returnValue(Promise.reject(new Error(`Test Error`)));
        childC = {
          name: `Test Child Name C`,
          executePerActionStep: executePerActionStepC,
        };

        executePerActionStepD = jasmine.createSpy(`executePerActionStepD`);
        childD = {
          name: `Test Child Name D`,
          executePerActionStep: executePerActionStepD,
        };

        serialStep = new SerialStep(`Test Name`, [
          childA,
          childB,
          childC,
          childD,
        ]);

        callback = jasmine.createSpy(`callback`);

        promise = serialStep.executePerActionStep(callback);
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
      });

      it(`does not call executePerActionStep on other children`, () => {
        expect(executePerActionStepD).not.toHaveBeenCalled();
      });

      it(`passes down the callback to its children`, () => {
        expect(executePerActionStepA).toHaveBeenCalledWith(callback);
        expect(executePerActionStepB).toHaveBeenCalledWith(callback);
        expect(executePerActionStepC).toHaveBeenCalledWith(callback);
      });

      it(`does not change its name`, () => {
        expect(serialStep.name).toEqual(`Test Name`);
      });

      it(`does not change its exposed children`, () => {
        expect(serialStep.children).toEqual([childA, childB, childC, childD]);
      });

      it(`does not execute the callback`, () => {
        expect(callback).not.toHaveBeenCalled();
      });

      it(`passes on the rejection reason`, () => {
        expectAsync(promise).toBeRejectedWithError(`Test Error`);
      });
    });
  });
});

import {
  Step,
  OneTimeTrigger,
  FileTrigger,
  Effect,
} from "@shanzhai/interfaces";
import { ParallelStep } from "@shanzhai/parallel-step";
import { SerialStep } from "@shanzhai/serial-step";
import { plan } from ".";

class DummyStep implements Step {
  constructor(readonly name: string, readonly effects: ReadonlyArray<Effect>) {}

  readonly executePerActionStep = jasmine.createSpy(`executePerActionStep`);
}

describe(`plan`, () => {
  describe(`first run`, () => {
    let oneTimeStep: DummyStep;
    let addedFileStep: DummyStep;
    let oneTimeTrigger: OneTimeTrigger;
    let fileTrigger: FileTrigger;
    let output: {
      readonly unmatchedAddedFiles: ReadonlyArray<string>;
      readonly step: Step;
    };
    let outputSteps: ReadonlyArray<Step>;

    beforeAll(() => {
      oneTimeStep = new DummyStep(`oneTimeStep`, []);
      addedFileStep = new DummyStep(`addedFileStep`, []);
      oneTimeTrigger = {
        type: `oneTime`,
        up: jasmine.createSpy(`oneTimeTrigger.up`).and.returnValue(oneTimeStep),
      };
      fileTrigger = {
        type: `file`,
        extension: `with-matching-file-extension`,
        down: jasmine.createSpy(`fileTrigger.down`),
        up: jasmine.createSpy(`fileTrigger.up`).and.returnValue(addedFileStep),
      };

      output = plan(
        {
          testPluginA: { triggers: { oneTimeTrigger } },
          testPluginB: { triggers: { fileTrigger } },
        },
        true,
        {
          added: [
            `test/parsed/path.with-matching-file-extension`,
            `test/parsed/path.which-does-not-match-a`,
            `test-d1rec$ory-name/test-valid-fi$le-na\tme.test-file-extension`,
            `test/parsed/path.which-does-not-match-c`,
          ],
          deleted: [],
          changed: [],
          unchanged: [],
        }
      );

      const outputStepsValue: Step[] = [];

      function recurse(step: Step): void {
        outputStepsValue.push(step);

        if (step instanceof ParallelStep || step instanceof SerialStep) {
          for (const child of step.children) {
            recurse(child);
          }
        }
      }

      recurse(output.step);

      outputSteps = outputStepsValue;
    });

    it(`returns the expected steps`, () => {
      expect(outputSteps).toContain(oneTimeStep);
      expect(outputSteps).toContain(addedFileStep);
    });

    it(`returns the unmatched added files`, () => {
      expect(output.unmatchedAddedFiles).toEqual(
        jasmine.arrayWithExactContents([
          `test/parsed/path.which-does-not-match-a`,
          `test-d1rec$ory-name/test-valid-fi$le-na\tme.test-file-extension`,
          `test/parsed/path.which-does-not-match-c`,
        ])
      );
    });

    it(`does not execute any steps`, () => {
      expect(oneTimeStep.executePerActionStep).not.toHaveBeenCalled();
      expect(addedFileStep.executePerActionStep).not.toHaveBeenCalled();
    });

    it(`interacts with triggers as expected`, () => {
      expect(oneTimeTrigger.up).toHaveBeenCalledTimes(1);

      expect(fileTrigger.down).not.toHaveBeenCalled();
      expect(fileTrigger.up).toHaveBeenCalledWith({
        typeScriptName: `test_parsed_path`,
        fullPath: `test/parsed/path.with-matching-file-extension`,
        fileExtension: `with-matching-file-extension`,
        fullPathWithoutExtension: `test/parsed/path`,
      });
      expect(fileTrigger.up).toHaveBeenCalledTimes(1);
    });
  });

  describe(`subsequent run`, () => {
    let addedFileStep: DummyStep;
    let changedDownFileStep: DummyStep;
    let changedUpFileStep: DummyStep;
    let deletedFileStep: DummyStep;
    let oneTimeTrigger: OneTimeTrigger;
    let fileTrigger: FileTrigger;
    let output: {
      readonly unmatchedAddedFiles: ReadonlyArray<string>;
      readonly step: Step;
    };
    let outputSteps: ReadonlyArray<Step>;

    beforeAll(() => {
      addedFileStep = new DummyStep(`addedFileStep`, []);
      changedDownFileStep = new DummyStep(`changedDownFileStep`, []);
      changedUpFileStep = new DummyStep(`changedUpFileStep`, []);
      deletedFileStep = new DummyStep(`deletedFileStep`, []);
      oneTimeTrigger = {
        type: `oneTime`,
        up: jasmine.createSpy(`oneTimeTrigger.up`),
      };
      fileTrigger = {
        type: `file`,
        extension: `with-matching-file-extension`,
        down: jasmine
          .createSpy(`fileTrigger.down`)
          .and.callFake((parsedPath) => {
            switch (parsedPath.fullPath) {
              case `test/changed/path.with-matching-file-extension`:
                return changedDownFileStep;

              case `test/deleted/path.with-matching-file-extension`:
                return deletedFileStep;

              default:
                fail(
                  `Unexpected parsedPath with fullPath ${JSON.stringify(
                    parsedPath
                  )}.`
                );
                return null;
            }
          }),
        up: jasmine.createSpy(`fileTrigger.up`).and.callFake((parsedPath) => {
          switch (parsedPath.fullPath) {
            case `test/changed/path.with-matching-file-extension`:
              return changedUpFileStep;

            case `test/added/path.with-matching-file-extension`:
              return addedFileStep;

            default:
              fail(
                `Unexpected parsedPath with fullPath ${JSON.stringify(
                  parsedPath
                )}.`
              );
              return null;
          }
        }),
      };

      output = plan(
        {
          testPluginA: { triggers: { oneTimeTrigger } },
          testPluginB: { triggers: { fileTrigger } },
        },
        false,
        {
          added: [
            `test/added/path.with-matching-file-extension`,
            `test/added/path.which-does-not-match-a`,
            `test-d1rec$ory-name/test-added-valid-fi$le-na\tme.test-file-extension`,
            `test/parsed/path.which-does-not-match-c`,
          ],
          deleted: [
            `test/deleted/path.with-matching-file-extension`,
            `test/deleted/path.which-does-not-match-a`,
            `test-d1rec$ory-name/test-deleted-valid-fi$le-na\tme.test-file-extension`,
          ],
          changed: [
            `test/changed/path.with-matching-file-extension`,
            `test/changed/path.which-does-not-match-a`,
            `test-d1rec$ory-name/test-changed-valid-fi$le-na\tme.test-file-extension`,
          ],
          unchanged: [
            `test/unchanged/path.with-matching-file-extension`,
            `test/unchanged/path.which-does-not-match-a`,
            `test-d1rec$ory-name/test-unchanged-valid-fi$le-na\tme.test-file-extension`,
          ],
        }
      );

      const outputStepsValue: Step[] = [];

      function recurse(step: Step): void {
        outputStepsValue.push(step);

        if (step instanceof ParallelStep || step instanceof SerialStep) {
          for (const child of step.children) {
            recurse(child);
          }
        }
      }

      recurse(output.step);

      outputSteps = outputStepsValue;
    });

    it(`returns the expected steps`, () => {
      expect(outputSteps).toContain(addedFileStep);
      expect(outputSteps).toContain(changedDownFileStep);
      expect(outputSteps).toContain(changedUpFileStep);
      expect(outputSteps).toContain(deletedFileStep);
    });

    it(`applies ordering constraints`, () => {
      function recurse(step: Step, foundDown: boolean): boolean {
        if (step instanceof ParallelStep) {
          let output = foundDown;

          for (const child of step.children) {
            output = output || recurse(child, foundDown);
          }

          return output;
        } else if (step instanceof SerialStep) {
          for (const child of step.children) {
            foundDown = foundDown || recurse(child, foundDown);
          }

          return foundDown;
        } else if (step === changedUpFileStep && !foundDown) {
          fail(`Found the up step before the down step.`);
          return false;
        } else if (step === changedDownFileStep) {
          return true;
        } else {
          return foundDown;
        }
      }

      recurse(output.step, false);
    });

    it(`returns the unmatched added files`, () => {
      expect(output.unmatchedAddedFiles).toEqual(
        jasmine.arrayWithExactContents([
          `test/added/path.which-does-not-match-a`,
          `test-d1rec$ory-name/test-added-valid-fi$le-na\tme.test-file-extension`,
          `test/parsed/path.which-does-not-match-c`,
        ])
      );
    });

    it(`does not execute any steps`, () => {
      expect(addedFileStep.executePerActionStep).not.toHaveBeenCalled();
      expect(changedDownFileStep.executePerActionStep).not.toHaveBeenCalled();
      expect(changedUpFileStep.executePerActionStep).not.toHaveBeenCalled();
      expect(deletedFileStep.executePerActionStep).not.toHaveBeenCalled();
    });

    it(`interacts with triggers as expected`, () => {
      expect(oneTimeTrigger.up).not.toHaveBeenCalled();

      expect(fileTrigger.down).toHaveBeenCalledWith({
        typeScriptName: `test_changed_path`,
        fullPath: `test/changed/path.with-matching-file-extension`,
        fileExtension: `with-matching-file-extension`,
        fullPathWithoutExtension: `test/changed/path`,
      });
      expect(fileTrigger.down).toHaveBeenCalledWith({
        typeScriptName: `test_deleted_path`,
        fullPath: `test/deleted/path.with-matching-file-extension`,
        fileExtension: `with-matching-file-extension`,
        fullPathWithoutExtension: `test/deleted/path`,
      });
      expect(fileTrigger.down).toHaveBeenCalledTimes(2);
      expect(fileTrigger.up).toHaveBeenCalledWith({
        typeScriptName: `test_added_path`,
        fullPath: `test/added/path.with-matching-file-extension`,
        fileExtension: `with-matching-file-extension`,
        fullPathWithoutExtension: `test/added/path`,
      });
      expect(fileTrigger.up).toHaveBeenCalledWith({
        typeScriptName: `test_changed_path`,
        fullPath: `test/changed/path.with-matching-file-extension`,
        fileExtension: `with-matching-file-extension`,
        fullPathWithoutExtension: `test/changed/path`,
      });
      expect(fileTrigger.up).toHaveBeenCalledTimes(2);
    });
  });
});

import {
  Step,
  ParsedPath,
  OneTimeTrigger,
  FileExtensionTrigger,
  UnkeyedStoreTrigger,
  KeyedStoreTrigger,
  KeyedStore,
  UnkeyedStore,
  Effect,
} from "@shanzhai/interfaces";
import { generateSteps } from ".";

class DummyStep implements Step {
  constructor(readonly name: string, readonly effects: ReadonlyArray<Effect>) {}

  readonly executePerActionStep = jasmine.createSpy(`executePerActionStep`);
}

describe(`generateSteps`, function () {
  describe(`first run`, () => {
    let addedParsedPathForFileExtensionTriggerTriggeredOnce: ParsedPath;
    let addedParsedPathForFileExtensionTriggerTriggeredMultipleTimesA: ParsedPath;
    let addedParsedPathForFileExtensionTriggerTriggeredMultipleTimesB: ParsedPath;
    let addedParsedPathForFileExtensionTriggerTriggeredMultipleTimesC: ParsedPath;
    let addedParsedPathWhichDoesNotMatchA: ParsedPath;
    let addedParsedPathWhichDoesNotMatchB: ParsedPath;
    let addedParsedPathWhichDoesNotMatchC: ParsedPath;
    let keyedStoreUntriggered: KeyedStore;
    let keyedStoreTriggeredOnce: KeyedStore;
    let keyedStoreTriggeredMultipleTimes: KeyedStore;
    let unkeyedStoreUntriggered: UnkeyedStore;
    let unkeyedStoreTriggered: UnkeyedStore;
    let oneTimeStep: DummyStep;
    let fileExtensionTriggeredOnceStep: DummyStep;
    let fileExtensionTriggeredMultipleTimesStepA: DummyStep;
    let fileExtensionTriggeredMultipleTimesStepB: DummyStep;
    let fileExtensionTriggeredMultipleTimesStepC: DummyStep;
    let keyedStoreTriggeredOnceStep: DummyStep;
    let keyedStoreTriggeredMultipleTimesStepA: DummyStep;
    let keyedStoreTriggeredMultipleTimesStepB: DummyStep;
    let keyedStoreTriggeredMultipleTimesStepC: DummyStep;
    let unkeyedStoreStep: DummyStep;
    let oneTimeTrigger: OneTimeTrigger;
    let untriggeredFileExtensionTrigger: FileExtensionTrigger;
    let fileExtensionTriggerTriggeredOnce: FileExtensionTrigger;
    let fileExtensionTriggerTriggeredMultipleTimes: FileExtensionTrigger;
    let keyedStoreUntriggeredTrigger: KeyedStoreTrigger;
    let keyedStoreTriggerTriggeredOnce: KeyedStoreTrigger;
    let keyedStoreTriggerTriggeredMultipleTimes: KeyedStoreTrigger;
    let unkeyedStoreUntriggeredTrigger: UnkeyedStoreTrigger;
    let unkeyedStoreTriggeredTrigger: UnkeyedStoreTrigger;
    let output: {
      readonly steps: ReadonlyArray<Step>;
      readonly orderingConstraints: ReadonlyArray<readonly [Step, Step]>;
      readonly unmatchedAddedFiles: ReadonlyArray<ParsedPath>;
    };

    beforeAll(async () => {
      addedParsedPathForFileExtensionTriggerTriggeredOnce = {
        typeScriptName: `Test Added Parsed Path For File Extension Trigger Triggered Once TypeScript Name`,
        fullPath: `Test Added Parsed Path For File Extension Trigger Triggered Once Full Path`,
        fileExtension: `Test Added Parsed Path For File Extension Trigger Triggered Once File Extension`,
        fullPathWithoutExtension: `Test Added Parsed Path For File Extension Trigger Triggered Once Full Path Without Extension`,
      };
      addedParsedPathForFileExtensionTriggerTriggeredMultipleTimesA = {
        typeScriptName: `Test Added Parsed Path For File Extension Trigger Triggered Multiple Times A TypeScript Name`,
        fullPath: `Test Added Parsed Path For File Extension Trigger Triggered Multiple Times A Full Path`,
        fileExtension: `Test Added Parsed Path For File Extension Trigger Triggered Multiple Times File Extension`,
        fullPathWithoutExtension: `Test Added Parsed Path For File Extension Trigger Triggered Multiple Times A Full Path Without Extension`,
      };
      addedParsedPathForFileExtensionTriggerTriggeredMultipleTimesB = {
        typeScriptName: `Test Added Parsed Path For File Extension Trigger Triggered Multiple Times B TypeScript Name`,
        fullPath: `Test Added Parsed Path For File Extension Trigger Triggered Multiple Times B Full Path`,
        fileExtension: `Test Added Parsed Path For File Extension Trigger Triggered Multiple Times File Extension`,
        fullPathWithoutExtension: `Test Added Parsed Path For File Extension Trigger Triggered Multiple Times B Full Path Without Extension`,
      };
      addedParsedPathForFileExtensionTriggerTriggeredMultipleTimesC = {
        typeScriptName: `Test Added Parsed Path For File Extension Trigger Triggered Multiple Times C TypeScript Name`,
        fullPath: `Test Added Parsed Path For File Extension Trigger Triggered Multiple Times C Full Path`,
        fileExtension: `Test Added Parsed Path For File Extension Trigger Triggered Multiple Times File Extension`,
        fullPathWithoutExtension: `Test Added Parsed Path For File Extension Trigger Triggered Multiple Times C Full Path Without Extension`,
      };
      addedParsedPathWhichDoesNotMatchA = {
        typeScriptName: `Test Added Parsed Path Which Does Not Match A TypeScript Name`,
        fullPath: `Test Added Parsed Path Which Does Not Match A Full Path`,
        fileExtension: `Test Added Parsed Path Which Does Not Match A File Extension`,
        fullPathWithoutExtension: `Test Added Parsed Path Which Does Not Match A Full Path Without Extension`,
      };
      addedParsedPathWhichDoesNotMatchB = {
        typeScriptName: `Test Added Parsed Path Which Does Not Match B TypeScript Name`,
        fullPath: `Test Added Parsed Path Which Does Not Match B Full Path`,
        fileExtension: `Test Added Parsed Path Which Does Not Match B File Extension`,
        fullPathWithoutExtension: `Test Added Parsed Path Which Does Not Match B Full Path Without Extension`,
      };
      addedParsedPathWhichDoesNotMatchC = {
        typeScriptName: `Test Added Parsed Path Which Does Not Match C TypeScript Name`,
        fullPath: `Test Added Parsed Path Which Does Not Match C Full Path`,
        fileExtension: `Test Added Parsed Path Which Does Not Match C File Extension`,
        fullPathWithoutExtension: `Test Added Parsed Path Which Does Not Match C Full Path Without Extension`,
      };
      keyedStoreUntriggered = {
        type: `keyedStore`,
        name: `keyedStoreUntriggered`,
      };
      keyedStoreTriggeredOnce = {
        type: `keyedStore`,
        name: `keyedStoreTriggeredOnce`,
      };
      keyedStoreTriggeredMultipleTimes = {
        type: `keyedStore`,
        name: `keyedStoreTriggeredMultipleTimes`,
      };
      unkeyedStoreUntriggered = {
        type: `unkeyedStore`,
        name: `unkeyedStoreUntriggered`,
      };
      unkeyedStoreTriggered = {
        type: `unkeyedStore`,
        name: `unkeyedStoreTriggered`,
      };
      oneTimeStep = new DummyStep(`oneTimeStep`, [
        {
          type: `keyedStoreSet`,
          keyedStore: keyedStoreTriggeredMultipleTimes,
          key: `Test Store Key C B`,
        },
      ]);
      fileExtensionTriggeredOnceStep = new DummyStep(
        `fileExtensionTriggeredOnceStep`,
        []
      );
      fileExtensionTriggeredMultipleTimesStepA = new DummyStep(
        `fileExtensionTriggeredMultipleTimesStepA`,
        []
      );
      fileExtensionTriggeredMultipleTimesStepB = new DummyStep(
        `fileExtensionTriggeredMultipleTimesStepB`,
        [
          {
            type: `unkeyedStoreSet`,
            unkeyedStore: unkeyedStoreTriggered,
          },
          {
            type: `keyedStoreSet`,
            keyedStore: keyedStoreTriggeredMultipleTimes,
            key: `Test Store Key C A`,
          },
        ]
      );
      fileExtensionTriggeredMultipleTimesStepC = new DummyStep(
        `fileExtensionTriggeredMultipleTimesStepC`,
        []
      );
      keyedStoreTriggeredOnceStep = new DummyStep(
        `keyedStoreTriggeredOnceStep`,
        []
      );
      keyedStoreTriggeredMultipleTimesStepA = new DummyStep(
        `keyedStoreTriggeredMultipleTimesStepA`,
        [
          {
            type: `keyedStoreSet`,
            keyedStore: keyedStoreTriggeredMultipleTimes,
            key: `Test Store Key C C`,
          },
        ]
      );
      keyedStoreTriggeredMultipleTimesStepB = new DummyStep(
        `keyedStoreTriggeredMultipleTimesStepB`,
        []
      );
      keyedStoreTriggeredMultipleTimesStepC = new DummyStep(
        `keyedStoreTriggeredMultipleTimesStepC`,
        []
      );
      unkeyedStoreStep = new DummyStep(`unkeyedStoreStep`, [
        {
          type: `keyedStoreSet`,
          keyedStore: keyedStoreTriggeredOnce,
          key: `Test Store Key B A`,
        },
      ]);
      oneTimeTrigger = {
        type: `oneTime`,
        up: jasmine.createSpy(`oneTimeTrigger.up`).and.returnValue(oneTimeStep),
      };
      untriggeredFileExtensionTrigger = {
        type: `fileExtension`,
        extension: `Test Untriggered File Extension Trigger File Extension`,
        down: jasmine.createSpy(`untriggeredFileTrigger.down`),
        up: jasmine.createSpy(`untriggeredFileTrigger.up`),
      };
      fileExtensionTriggerTriggeredOnce = {
        type: `fileExtension`,
        extension: `Test Added Parsed Path For File Extension Trigger Triggered Once File Extension`,
        down: jasmine.createSpy(`fileTriggerTriggeredOnce.down`),
        up: jasmine
          .createSpy(`fileTriggerTriggeredOnce.up`)
          .and.returnValue(fileExtensionTriggeredOnceStep),
      };
      fileExtensionTriggerTriggeredMultipleTimes = {
        type: `fileExtension`,
        extension: `Test Added Parsed Path For File Extension Trigger Triggered Multiple Times File Extension`,
        down: jasmine.createSpy(`fileTriggerTriggeredMultipleTimes.down`),
        up: jasmine
          .createSpy(`fileTriggerTriggeredMultipleTimes.up`)
          .and.callFake((file) => {
            switch (file) {
              case addedParsedPathForFileExtensionTriggerTriggeredMultipleTimesA:
                return fileExtensionTriggeredMultipleTimesStepA;

              case addedParsedPathForFileExtensionTriggerTriggeredMultipleTimesB:
                return fileExtensionTriggeredMultipleTimesStepB;

              case addedParsedPathForFileExtensionTriggerTriggeredMultipleTimesC:
                return fileExtensionTriggeredMultipleTimesStepC;

              default:
                fail(`Unexpected file ${JSON.stringify(file)}.`);
                return null;
            }
          }),
      };
      keyedStoreUntriggeredTrigger = {
        type: `keyedStore`,
        keyedStore: keyedStoreUntriggered,
        down: jasmine.createSpy(`keyedStoreUntriggeredTrigger.down`),
        up: jasmine.createSpy(`keyedStoreUntriggeredTrigger.up`),
      };
      keyedStoreTriggerTriggeredOnce = {
        type: `keyedStore`,
        keyedStore: keyedStoreTriggeredOnce,
        down: jasmine.createSpy(`keyedStoreTriggerTriggeredOnce.down`),
        up: jasmine
          .createSpy(`keyedStoreTriggerTriggeredOnce.up`)
          .and.returnValue(keyedStoreTriggeredOnceStep),
      };
      keyedStoreTriggerTriggeredMultipleTimes = {
        type: `keyedStore`,
        keyedStore: keyedStoreTriggeredMultipleTimes,
        down: jasmine.createSpy(`keyedStoreTriggerTriggeredMultipleTimes.down`),
        up: jasmine
          .createSpy(`keyedStoreTriggerTriggeredMultipleTimes.up`)
          .and.callFake((key) => {
            switch (key) {
              case `Test Store Key C A`:
                return keyedStoreTriggeredMultipleTimesStepA;
              case `Test Store Key C B`:
                return keyedStoreTriggeredMultipleTimesStepB;
              case `Test Store Key C C`:
                return keyedStoreTriggeredMultipleTimesStepC;
              default:
                fail(`Unexpected key ${JSON.stringify(key)}.`);
                return null;
            }
          }),
      };
      unkeyedStoreUntriggeredTrigger = {
        type: `unkeyedStore`,
        unkeyedStore: unkeyedStoreUntriggered,
        down: jasmine.createSpy(`unkeyedStoreUntriggeredTrigger.down`),
        up: jasmine.createSpy(`unkeyedStoreUntriggeredTrigger.up`),
      };
      unkeyedStoreTriggeredTrigger = {
        type: `unkeyedStore`,
        unkeyedStore: unkeyedStoreTriggered,
        down: jasmine.createSpy(`unkeyedStoreTriggeredTrigger.down`),
        up: jasmine
          .createSpy(`unkeyedStoreTriggeredTrigger.up`)
          .and.returnValue(unkeyedStoreStep),
      };
      output = generateSteps(
        [
          oneTimeTrigger,
          untriggeredFileExtensionTrigger,
          fileExtensionTriggerTriggeredOnce,
          fileExtensionTriggerTriggeredMultipleTimes,
          keyedStoreUntriggeredTrigger,
          keyedStoreTriggerTriggeredOnce,
          keyedStoreTriggerTriggeredMultipleTimes,
          unkeyedStoreUntriggeredTrigger,
          unkeyedStoreTriggeredTrigger,
        ],
        true,
        {
          added: [
            addedParsedPathForFileExtensionTriggerTriggeredOnce,
            addedParsedPathForFileExtensionTriggerTriggeredMultipleTimesA,
            addedParsedPathForFileExtensionTriggerTriggeredMultipleTimesB,
            addedParsedPathForFileExtensionTriggerTriggeredMultipleTimesC,
            addedParsedPathWhichDoesNotMatchA,
            addedParsedPathWhichDoesNotMatchB,
            addedParsedPathWhichDoesNotMatchC,
          ],
          changed: [],
          deleted: [],
          unchanged: [],
        }
      );
    });

    it(`queries all applicable triggers for steps exactly the expected times`, () => {
      expect(oneTimeTrigger.up).toHaveBeenCalledTimes(1);
      expect(untriggeredFileExtensionTrigger.down).not.toHaveBeenCalled();
      expect(untriggeredFileExtensionTrigger.up).not.toHaveBeenCalled();
      expect(fileExtensionTriggerTriggeredOnce.down).not.toHaveBeenCalled();
      expect(fileExtensionTriggerTriggeredOnce.up).toHaveBeenCalledWith(
        addedParsedPathForFileExtensionTriggerTriggeredOnce
      );
      expect(fileExtensionTriggerTriggeredOnce.up).toHaveBeenCalledTimes(1);
      expect(
        fileExtensionTriggerTriggeredMultipleTimes.down
      ).not.toHaveBeenCalled();
      expect(
        fileExtensionTriggerTriggeredMultipleTimes.up
      ).toHaveBeenCalledWith(
        addedParsedPathForFileExtensionTriggerTriggeredMultipleTimesA
      );
      expect(
        fileExtensionTriggerTriggeredMultipleTimes.up
      ).toHaveBeenCalledWith(
        addedParsedPathForFileExtensionTriggerTriggeredMultipleTimesB
      );
      expect(
        fileExtensionTriggerTriggeredMultipleTimes.up
      ).toHaveBeenCalledWith(
        addedParsedPathForFileExtensionTriggerTriggeredMultipleTimesC
      );
      expect(
        fileExtensionTriggerTriggeredMultipleTimes.up
      ).toHaveBeenCalledTimes(3);
      expect(keyedStoreUntriggeredTrigger.down).not.toHaveBeenCalled();
      expect(keyedStoreUntriggeredTrigger.up).not.toHaveBeenCalled();
      expect(keyedStoreTriggerTriggeredOnce.down).not.toHaveBeenCalled();
      expect(keyedStoreTriggerTriggeredOnce.up).toHaveBeenCalledWith(
        `Test Store Key B A`
      );
      expect(keyedStoreTriggerTriggeredOnce.up).toHaveBeenCalledTimes(1);
      expect(
        keyedStoreTriggerTriggeredMultipleTimes.down
      ).not.toHaveBeenCalled();
      expect(keyedStoreTriggerTriggeredMultipleTimes.up).toHaveBeenCalledWith(
        `Test Store Key C A`
      );
      expect(keyedStoreTriggerTriggeredMultipleTimes.up).toHaveBeenCalledWith(
        `Test Store Key C B`
      );
      expect(keyedStoreTriggerTriggeredMultipleTimes.up).toHaveBeenCalledWith(
        `Test Store Key C C`
      );
      expect(keyedStoreTriggerTriggeredMultipleTimes.up).toHaveBeenCalledTimes(
        3
      );
      expect(unkeyedStoreUntriggeredTrigger.down).not.toHaveBeenCalled();
      expect(unkeyedStoreUntriggeredTrigger.up).not.toHaveBeenCalled();
      expect(unkeyedStoreTriggeredTrigger.down).not.toHaveBeenCalled();
      expect(unkeyedStoreTriggeredTrigger.up).toHaveBeenCalledTimes(1);
      expect(unkeyedStoreTriggeredTrigger.down).not.toHaveBeenCalled();
    });

    it(`returns the expected list of steps`, () => {
      expect(output.steps).toEqual(
        jasmine.arrayWithExactContents([
          oneTimeStep,
          fileExtensionTriggeredOnceStep,
          fileExtensionTriggeredMultipleTimesStepA,
          fileExtensionTriggeredMultipleTimesStepB,
          fileExtensionTriggeredMultipleTimesStepC,
          keyedStoreTriggeredOnceStep,
          keyedStoreTriggeredMultipleTimesStepA,
          keyedStoreTriggeredMultipleTimesStepB,
          keyedStoreTriggeredMultipleTimesStepC,
          unkeyedStoreStep,
        ])
      );
    });

    it(`returns the expected list of ordering constraints`, () => {
      expect(output.orderingConstraints).toEqual(
        jasmine.arrayWithExactContents([
          [fileExtensionTriggeredMultipleTimesStepB, unkeyedStoreStep],
          [unkeyedStoreStep, keyedStoreTriggeredOnceStep],
          [
            fileExtensionTriggeredMultipleTimesStepB,
            keyedStoreTriggeredMultipleTimesStepA,
          ],
          [oneTimeStep, keyedStoreTriggeredMultipleTimesStepB],
          [
            keyedStoreTriggeredMultipleTimesStepA,
            keyedStoreTriggeredMultipleTimesStepC,
          ],
          [
            keyedStoreTriggeredMultipleTimesStepB,
            fileExtensionTriggeredOnceStep,
          ],
          [
            keyedStoreTriggeredMultipleTimesStepB,
            fileExtensionTriggeredMultipleTimesStepA,
          ],
          [
            keyedStoreTriggeredMultipleTimesStepB,
            fileExtensionTriggeredMultipleTimesStepB,
          ],
          [
            keyedStoreTriggeredMultipleTimesStepB,
            fileExtensionTriggeredMultipleTimesStepC,
          ],
        ])
      );
    });

    it(`returns the expected list of added files which did not trigger anything`, () => {
      expect(output.unmatchedAddedFiles).toEqual(
        jasmine.arrayWithExactContents([
          addedParsedPathWhichDoesNotMatchA,
          addedParsedPathWhichDoesNotMatchB,
          addedParsedPathWhichDoesNotMatchC,
        ])
      );
    });

    it(`does not execute any steps`, () => {
      expect(oneTimeStep.executePerActionStep).not.toHaveBeenCalled();
      expect(
        fileExtensionTriggeredOnceStep.executePerActionStep
      ).not.toHaveBeenCalled();
      expect(
        fileExtensionTriggeredMultipleTimesStepA.executePerActionStep
      ).not.toHaveBeenCalled();
      expect(
        fileExtensionTriggeredMultipleTimesStepB.executePerActionStep
      ).not.toHaveBeenCalled();
      expect(
        fileExtensionTriggeredMultipleTimesStepC.executePerActionStep
      ).not.toHaveBeenCalled();
      expect(
        keyedStoreTriggeredOnceStep.executePerActionStep
      ).not.toHaveBeenCalled();
      expect(
        keyedStoreTriggeredMultipleTimesStepA.executePerActionStep
      ).not.toHaveBeenCalled();
      expect(
        keyedStoreTriggeredMultipleTimesStepB.executePerActionStep
      ).not.toHaveBeenCalled();
      expect(
        keyedStoreTriggeredMultipleTimesStepC.executePerActionStep
      ).not.toHaveBeenCalled();
      expect(unkeyedStoreStep.executePerActionStep).not.toHaveBeenCalled();
    });
  });

  describe(`subsequent run`, () => {
    /*
      [<reference> parsedPathMatchingMultipleTimesA] down -> [fileExtensionTriggeredMultipleTimesStepA]
      [<reference> parsedPathMatchingMultipleTimesA] up -> [fileExtensionTriggeredMultipleTimesStepB]
      [<reference> parsedPathMatchingMultipleTimesB] up -> [fileExtensionTriggeredMultipleTimesStepC]
      [<reference> parsedPathMatchingMultipleTimesC] down -> [fileExtensionTriggeredMultipleTimesStepD]
      [<reference> parsedPathMatchingOnceA] up -> [fileExtensionTriggeredOnceStepA]
      [<reference> parsedPathMatchingOnceB] up -> [fileExtensionTriggeredOnceStepB]
      [<reference> parsedPathMatchingOnceB] up -> [fileExtensionTriggeredOnceStepE]
      [<reference> parsedPathMatchingOnceC] down -> [fileExtensionTriggeredOnceStepC]
      [<reference> parsedPathMatchingOnceD] up -> [fileExtensionTriggeredOnceStepD]
      [fileExtensionTriggeredMultipleTimesStepA] -> [unkeyedStoreDownStep]
      [fileExtensionTriggeredMultipleTimesStepA] Test Store Key B A up -> [keyedStoreTriggeredOnceStepA]
      [fileExtensionTriggeredMultipleTimesStepB] Test Store Key E A down -> [keyedStoreTriggeredOnceStepD]
      [fileExtensionTriggeredMultipleTimesStepB] Test Store Key F C down -> [keyedStoreTriggeredMultipleTimesStepA]
      [fileExtensionTriggeredMultipleTimesStepC] Test Store Key F B up -> [keyedStoreTriggeredMultipleTimesStepC]
      [fileExtensionTriggeredMultipleTimesStepD] Test Store Key D A down -> [keyedStoreTriggeredOnceStepC]
      [fileExtensionTriggeredMultipleTimesStepD] -> [unkeyedStoreUpStep]
      [keyedStoreTriggeredOnceStepA] Test Store Key F A up -> [keyedStoreTriggeredMultipleTimesStepB]
      [keyedStoreTriggeredOnceStepD] Test Store Key C B down -> [keyedStoreTriggeredOnceStepB]
    */

    let parsedPathMatchingMultipleTimesA: ParsedPath;
    let parsedPathMatchingMultipleTimesB: ParsedPath;
    let parsedPathMatchingMultipleTimesC: ParsedPath;
    let parsedPathMatchingMultipleTimesD: ParsedPath;
    let parsedPathMatchingOnceA: ParsedPath;
    let parsedPathMatchingOnceB: ParsedPath;
    let parsedPathMatchingOnceC: ParsedPath;
    let parsedPathMatchingOnceD: ParsedPath;
    let parsedPathUnmatchingA: ParsedPath;
    let parsedPathUnmatchingB: ParsedPath;
    let parsedPathUnmatchingC: ParsedPath;
    let parsedPathUnmatchingD: ParsedPath;
    let parsedPathUnmatchingE: ParsedPath;
    let parsedPathUnmatchingF: ParsedPath;
    let keyedStoreUntriggered: KeyedStore;
    let keyedStoreTriggeredOnceA: KeyedStore;
    let keyedStoreTriggeredOnceB: KeyedStore;
    let keyedStoreTriggeredOnceC: KeyedStore;
    let keyedStoreTriggeredOnceD: KeyedStore;
    let keyedStoreTriggeredMultipleTimes: KeyedStore;
    let unkeyedStoreUntriggered: UnkeyedStore;
    let unkeyedStoreTriggered: UnkeyedStore;
    let fileExtensionTriggeredMultipleTimesStepA: DummyStep;
    let fileExtensionTriggeredMultipleTimesStepB: DummyStep;
    let fileExtensionTriggeredMultipleTimesStepC: DummyStep;
    let fileExtensionTriggeredMultipleTimesStepD: DummyStep;
    let fileExtensionTriggeredOnceStepA: DummyStep;
    let fileExtensionTriggeredOnceStepB: DummyStep;
    let fileExtensionTriggeredOnceStepC: DummyStep;
    let fileExtensionTriggeredOnceStepD: DummyStep;
    let fileExtensionTriggeredOnceStepE: DummyStep;
    let keyedStoreTriggeredMultipleTimesStepA: DummyStep;
    let keyedStoreTriggeredMultipleTimesStepB: DummyStep;
    let keyedStoreTriggeredMultipleTimesStepC: DummyStep;
    let keyedStoreTriggeredOnceStepA: DummyStep;
    let keyedStoreTriggeredOnceStepB: DummyStep;
    let keyedStoreTriggeredOnceStepC: DummyStep;
    let keyedStoreTriggeredOnceStepD: DummyStep;
    let unkeyedStoreDownStep: DummyStep;
    let unkeyedStoreUpStep: DummyStep;
    let keyedStoreTriggerTriggeredOnceA: KeyedStoreTrigger;
    let keyedStoreTriggerTriggeredOnceB: KeyedStoreTrigger;
    let keyedStoreTriggerTriggeredOnceC: KeyedStoreTrigger;
    let keyedStoreTriggerTriggeredOnceD: KeyedStoreTrigger;
    let keyedStoreTriggerTriggeredMultipleTimes: KeyedStoreTrigger;
    let keyedStoreTriggerUntriggered: KeyedStoreTrigger;
    let unkeyedStoreTriggerUntriggered: UnkeyedStoreTrigger;
    let unkeyedStoreTriggerTriggered: UnkeyedStoreTrigger;
    let oneTimeTrigger: OneTimeTrigger;
    let fileExtensionTriggerUntriggered: FileExtensionTrigger;
    let fileExtensionTriggerTriggeredMultipleTimes: FileExtensionTrigger;
    let fileExtensionTriggerTriggeredOnceA: FileExtensionTrigger;
    let fileExtensionTriggerTriggeredOnceB: FileExtensionTrigger;
    let fileExtensionTriggerTriggeredOnceC: FileExtensionTrigger;
    let fileExtensionTriggerTriggeredOnceD: FileExtensionTrigger;
    let fileExtensionTriggerTriggeredOnceE: FileExtensionTrigger;
    let output: {
      readonly steps: ReadonlyArray<Step>;
      readonly orderingConstraints: ReadonlyArray<readonly [Step, Step]>;
      readonly unmatchedAddedFiles: ReadonlyArray<ParsedPath>;
    };

    beforeAll(async () => {
      parsedPathMatchingMultipleTimesA = {
        typeScriptName: `Test ParsedPath A TypeScript Name`,
        fullPath: `Test ParsedPath A Full Path`,
        fileExtension: `Test File Extension Triggered Multiple Times`,
        fullPathWithoutExtension: `Test ParsedPath A Full Path Without Extension`,
      };
      parsedPathMatchingMultipleTimesB = {
        typeScriptName: `Test ParsedPath B TypeScript Name`,
        fullPath: `Test ParsedPath B Full Path`,
        fileExtension: `Test File Extension Triggered Multiple Times`,
        fullPathWithoutExtension: `Test ParsedPath B Full Path Without Extension`,
      };
      parsedPathMatchingMultipleTimesC = {
        typeScriptName: `Test ParsedPath C TypeScript Name`,
        fullPath: `Test ParsedPath C Full Path`,
        fileExtension: `Test File Extension Triggered Multiple Times`,
        fullPathWithoutExtension: `Test ParsedPath C Full Path Without Extension`,
      };
      parsedPathMatchingMultipleTimesD = {
        typeScriptName: `Test ParsedPath H TypeScript Name`,
        fullPath: `Test ParsedPath H Full Path`,
        fileExtension: `Test File Extension Triggered Multiple Times`,
        fullPathWithoutExtension: `Test ParsedPath H Full Path Without Extension`,
      };
      parsedPathMatchingOnceA = {
        typeScriptName: `Test ParsedPath D TypeScript Name`,
        fullPath: `Test ParsedPath D Full Path`,
        fileExtension: `Test File Extension Triggered Once A`,
        fullPathWithoutExtension: `Test ParsedPath D Full Path Without Extension`,
      };
      parsedPathMatchingOnceB = {
        typeScriptName: `Test ParsedPath E TypeScript Name`,
        fullPath: `Test ParsedPath E Full Path`,
        fileExtension: `Test File Extension Triggered Once B`,
        fullPathWithoutExtension: `Test ParsedPath E Full Path Without Extension`,
      };
      parsedPathMatchingOnceC = {
        typeScriptName: `Test ParsedPath F TypeScript Name`,
        fullPath: `Test ParsedPath F Full Path`,
        fileExtension: `Test File Extension Triggered Once C`,
        fullPathWithoutExtension: `Test ParsedPath F Full Path Without Extension`,
      };
      parsedPathMatchingOnceD = {
        typeScriptName: `Test ParsedPath G TypeScript Name`,
        fullPath: `Test ParsedPath G Full Path`,
        fileExtension: `Test File Extension Triggered Once D`,
        fullPathWithoutExtension: `Test ParsedPath G Full Path Without Extension`,
      };
      parsedPathUnmatchingA = {
        typeScriptName: `Test ParsedPath I TypeScript Name`,
        fullPath: `Test ParsedPath I Full Path`,
        fileExtension: `Test File Extension Untriggered A`,
        fullPathWithoutExtension: `Test ParsedPath I Full Path Without Extension`,
      };
      parsedPathUnmatchingB = {
        typeScriptName: `Test ParsedPath J TypeScript Name`,
        fullPath: `Test ParsedPath J Full Path`,
        fileExtension: `Test File Extension Untriggered A`,
        fullPathWithoutExtension: `Test ParsedPath J Full Path Without Extension`,
      };
      parsedPathUnmatchingC = {
        typeScriptName: `Test ParsedPath K TypeScript Name`,
        fullPath: `Test ParsedPath K Full Path`,
        fileExtension: `Test File Extension Untriggered A`,
        fullPathWithoutExtension: `Test ParsedPath K Full Path Without Extension`,
      };
      parsedPathUnmatchingD = {
        typeScriptName: `Test ParsedPath L TypeScript Name`,
        fullPath: `Test ParsedPath L Full Path`,
        fileExtension: `Test File Extension Untriggered A`,
        fullPathWithoutExtension: `Test ParsedPath L Full Path Without Extension`,
      };
      parsedPathUnmatchingE = {
        typeScriptName: `Test ParsedPath M TypeScript Name`,
        fullPath: `Test ParsedPath M Full Path`,
        fileExtension: `Test File Extension Untriggered A`,
        fullPathWithoutExtension: `Test ParsedPath M Full Path Without Extension`,
      };
      parsedPathUnmatchingF = {
        typeScriptName: `Test ParsedPath N TypeScript Name`,
        fullPath: `Test ParsedPath N Full Path`,
        fileExtension: `Test File Extension Untriggered A`,
        fullPathWithoutExtension: `Test ParsedPath N Full Path Without Extension`,
      };
      keyedStoreUntriggered = {
        type: `keyedStore`,
        name: `keyedStoreUntriggered`,
      };
      keyedStoreTriggeredOnceA = {
        type: `keyedStore`,
        name: `keyedStoreTriggeredOnceA`,
      };
      keyedStoreTriggeredOnceB = {
        type: `keyedStore`,
        name: `keyedStoreTriggeredOnceB`,
      };
      keyedStoreTriggeredOnceC = {
        type: `keyedStore`,
        name: `keyedStoreTriggeredOnceC`,
      };
      keyedStoreTriggeredOnceD = {
        type: `keyedStore`,
        name: `keyedStoreTriggeredOnceD`,
      };
      keyedStoreTriggeredMultipleTimes = {
        type: `keyedStore`,
        name: `keyedStoreTriggeredMultipleTimes`,
      };
      unkeyedStoreUntriggered = {
        type: `unkeyedStore`,
        name: `unkeyedStoreUntriggered`,
      };
      unkeyedStoreTriggered = {
        type: `unkeyedStore`,
        name: `unkeyedStoreTriggered`,
      };
      fileExtensionTriggeredMultipleTimesStepA = new DummyStep(
        `fileExtensionTriggeredMultipleTimesStepA`,
        [
          {
            type: `unkeyedStoreDelete`,
            unkeyedStore: unkeyedStoreTriggered,
          },
          {
            type: `keyedStoreSet`,
            keyedStore: keyedStoreTriggeredOnceA,
            key: `Test Store Key B A`,
          },
        ]
      );
      fileExtensionTriggeredMultipleTimesStepB = new DummyStep(
        `fileExtensionTriggeredMultipleTimesStepB`,
        [
          {
            type: `keyedStoreDelete`,
            keyedStore: keyedStoreTriggeredOnceD,
            key: `Test Store Key E A`,
          },
          {
            type: `keyedStoreDelete`,
            keyedStore: keyedStoreTriggeredMultipleTimes,
            key: `Test Store Key F C`,
          },
        ]
      );
      fileExtensionTriggeredMultipleTimesStepC = new DummyStep(
        `fileExtensionTriggeredMultipleTimesStepC`,
        [
          {
            type: `keyedStoreSet`,
            keyedStore: keyedStoreTriggeredMultipleTimes,
            key: `Test Store Key F B`,
          },
        ]
      );
      fileExtensionTriggeredMultipleTimesStepD = new DummyStep(
        `fileExtensionTriggeredMultipleTimesStepD`,
        [
          {
            type: `keyedStoreDelete`,
            keyedStore: keyedStoreTriggeredOnceC,
            key: `Test Store Key D A`,
          },
          {
            type: `unkeyedStoreSet`,
            unkeyedStore: unkeyedStoreTriggered,
          },
        ]
      );
      fileExtensionTriggeredOnceStepA = new DummyStep(
        `fileExtensionTriggeredOnceStepA`,
        []
      );
      fileExtensionTriggeredOnceStepB = new DummyStep(
        `fileExtensionTriggeredOnceStepB`,
        []
      );
      fileExtensionTriggeredOnceStepC = new DummyStep(
        `fileExtensionTriggeredOnceStepC`,
        []
      );
      fileExtensionTriggeredOnceStepD = new DummyStep(
        `fileExtensionTriggeredOnceStepD`,
        []
      );
      fileExtensionTriggeredOnceStepE = new DummyStep(
        `fileExtensionTriggeredOnceStepE`,
        []
      );
      keyedStoreTriggeredMultipleTimesStepA = new DummyStep(
        `keyedStoreTriggeredMultipleTimesStepA`,
        []
      );
      keyedStoreTriggeredMultipleTimesStepB = new DummyStep(
        `keyedStoreTriggeredMultipleTimesStepB`,
        []
      );
      keyedStoreTriggeredMultipleTimesStepC = new DummyStep(
        `keyedStoreTriggeredMultipleTimesStepC`,
        []
      );
      keyedStoreTriggeredOnceStepA = new DummyStep(
        `keyedStoreTriggeredOnceStepA`,
        [
          {
            type: `keyedStoreSet`,
            keyedStore: keyedStoreTriggeredMultipleTimes,
            key: `Test Store Key F A`,
          },
        ]
      );
      keyedStoreTriggeredOnceStepB = new DummyStep(
        `keyedStoreTriggeredOnceStepB`,
        []
      );
      keyedStoreTriggeredOnceStepC = new DummyStep(
        `keyedStoreTriggeredOnceStepC`,
        []
      );
      keyedStoreTriggeredOnceStepD = new DummyStep(
        `keyedStoreTriggeredOnceStepD`,
        [
          {
            type: `keyedStoreDelete`,
            keyedStore: keyedStoreTriggeredOnceB,
            key: `Test Store Key C B`,
          },
        ]
      );
      unkeyedStoreDownStep = new DummyStep(`unkeyedStoreDownStep`, []);
      unkeyedStoreUpStep = new DummyStep(`unkeyedStoreUpStep`, []);
      oneTimeTrigger = {
        type: `oneTime`,
        up: jasmine.createSpy(`oneTimeTrigger.up`),
      };
      keyedStoreTriggerTriggeredOnceA = {
        type: `keyedStore`,
        keyedStore: keyedStoreTriggeredOnceA,
        down: jasmine.createSpy(`keyedStoreTriggerTriggeredOnceA.down`),
        up: jasmine
          .createSpy(`keyedStoreTriggerTriggeredOnceA.up`)
          .and.returnValue(keyedStoreTriggeredOnceStepA),
      };
      keyedStoreTriggerTriggeredOnceB = {
        type: `keyedStore`,
        keyedStore: keyedStoreTriggeredOnceB,
        down: jasmine
          .createSpy(`keyedStoreTriggerTriggeredOnceB.down`)
          .and.returnValue(keyedStoreTriggeredOnceStepB),
        up: jasmine.createSpy(`keyedStoreTriggerTriggeredOnceB.up`),
      };
      keyedStoreTriggerTriggeredOnceC = {
        type: `keyedStore`,
        keyedStore: keyedStoreTriggeredOnceC,
        down: jasmine
          .createSpy(`keyedStoreTriggerTriggeredOnceC.down`)
          .and.returnValue(keyedStoreTriggeredOnceStepC),
        up: jasmine.createSpy(`keyedStoreTriggerTriggeredOnceC.up`),
      };
      keyedStoreTriggerTriggeredOnceD = {
        type: `keyedStore`,
        keyedStore: keyedStoreTriggeredOnceD,
        down: jasmine
          .createSpy(`keyedStoreTriggerTriggeredOnceD.down`)
          .and.returnValue(keyedStoreTriggeredOnceStepD),
        up: jasmine.createSpy(`keyedStoreTriggerTriggeredOnceD.up`),
      };
      keyedStoreTriggerTriggeredMultipleTimes = {
        type: `keyedStore`,
        keyedStore: keyedStoreTriggeredMultipleTimes,
        down: jasmine
          .createSpy(`keyedStoreTriggerTriggeredMultipleTimes.down`)
          .and.callFake((key) => {
            switch (key) {
              case `Test Store Key F C`:
                return keyedStoreTriggeredMultipleTimesStepA;

              default:
                fail(`Unexpected key ${JSON.stringify(key)}`);
                return null;
            }
          }),
        up: jasmine
          .createSpy(`keyedStoreTriggerTriggeredMultipleTimes.up`)
          .and.callFake((key) => {
            switch (key) {
              case `Test Store Key F A`:
                return keyedStoreTriggeredMultipleTimesStepB;

              case `Test Store Key F B`:
                return keyedStoreTriggeredMultipleTimesStepC;

              default:
                fail(`Unexpected key ${JSON.stringify(key)}`);
                return null;
            }
          }),
      };
      keyedStoreTriggerUntriggered = {
        type: `keyedStore`,
        keyedStore: keyedStoreUntriggered,
        down: jasmine.createSpy(`keyedStoreTriggerUntriggered.down`),
        up: jasmine.createSpy(`keyedStoreTriggerUntriggered.up`),
      };
      unkeyedStoreTriggerUntriggered = {
        type: `unkeyedStore`,
        unkeyedStore: unkeyedStoreUntriggered,
        down: jasmine.createSpy(`unkeyedStoreTriggerUntriggered.down`),
        up: jasmine.createSpy(`unkeyedStoreTriggerUntriggered.up`),
      };
      unkeyedStoreTriggerTriggered = {
        type: `unkeyedStore`,
        unkeyedStore: unkeyedStoreTriggered,
        down: jasmine
          .createSpy(`unkeyedStoreTriggerTriggered.down`)
          .and.returnValue(unkeyedStoreDownStep),
        up: jasmine
          .createSpy(`unkeyedStoreTriggerTriggered.up`)
          .and.returnValue(unkeyedStoreUpStep),
      };
      fileExtensionTriggerUntriggered = {
        type: `fileExtension`,
        extension: `Test File Extension Untriggered B`,
        down: jasmine.createSpy(`fileTriggerUntriggered.down`),
        up: jasmine.createSpy(`fileTriggerUntriggered.down`),
      };
      fileExtensionTriggerTriggeredMultipleTimes = {
        type: `fileExtension`,
        extension: `Test File Extension Triggered Multiple Times`,
        down: jasmine
          .createSpy(`fileTriggerTriggeredMultipleTimes.down`)
          .and.callFake((parsedPath) => {
            switch (parsedPath) {
              case parsedPathMatchingMultipleTimesA:
                return fileExtensionTriggeredMultipleTimesStepA;

              case parsedPathMatchingMultipleTimesC:
                return fileExtensionTriggeredMultipleTimesStepD;

              default:
                fail(`Unexpected parsed path ${JSON.stringify(parsedPath)}`);
                return null;
            }
          }),
        up: jasmine
          .createSpy(`fileTriggerTriggeredMultipleTimes.up`)
          .and.callFake((parsedPath) => {
            switch (parsedPath) {
              case parsedPathMatchingMultipleTimesA:
                return fileExtensionTriggeredMultipleTimesStepB;

              case parsedPathMatchingMultipleTimesB:
                return fileExtensionTriggeredMultipleTimesStepC;

              default:
                fail(`Unexpected parsed path ${JSON.stringify(parsedPath)}`);
                return null;
            }
          }),
      };
      fileExtensionTriggerTriggeredOnceA = {
        type: `fileExtension`,
        extension: `Test File Extension Triggered Once A`,
        down: jasmine.createSpy(`fileTriggerTriggeredOnceA.down`),
        up: jasmine
          .createSpy(`fileTriggerTriggeredOnceA.up`)
          .and.returnValue(fileExtensionTriggeredOnceStepA),
      };
      fileExtensionTriggerTriggeredOnceB = {
        type: `fileExtension`,
        extension: `Test File Extension Triggered Once B`,
        down: jasmine.createSpy(`fileTriggerTriggeredOnceB.down`),
        up: jasmine
          .createSpy(`fileTriggerTriggeredOnceB.up`)
          .and.returnValue(fileExtensionTriggeredOnceStepB),
      };
      fileExtensionTriggerTriggeredOnceC = {
        type: `fileExtension`,
        extension: `Test File Extension Triggered Once C`,
        down: jasmine
          .createSpy(`fileTriggerTriggeredOnceC.down`)
          .and.returnValue(fileExtensionTriggeredOnceStepC),
        up: jasmine.createSpy(`fileTriggerTriggeredOnceC.up`),
      };
      fileExtensionTriggerTriggeredOnceD = {
        type: `fileExtension`,
        extension: `Test File Extension Triggered Once D`,
        down: jasmine.createSpy(`fileTriggerTriggeredOnceD.down`),
        up: jasmine
          .createSpy(`fileTriggerTriggeredOnceD.up`)
          .and.returnValue(fileExtensionTriggeredOnceStepD),
      };
      fileExtensionTriggerTriggeredOnceE = {
        type: `fileExtension`,
        extension: `Test File Extension Triggered Once B`,
        down: jasmine.createSpy(`fileTriggerTriggeredOnceE.down`),
        up: jasmine
          .createSpy(`fileTriggerTriggeredOnceE.up`)
          .and.returnValue(fileExtensionTriggeredOnceStepE),
      };

      output = generateSteps(
        [
          oneTimeTrigger,
          keyedStoreTriggerTriggeredMultipleTimes,
          keyedStoreTriggerTriggeredOnceA,
          keyedStoreTriggerTriggeredOnceB,
          keyedStoreTriggerTriggeredOnceC,
          keyedStoreTriggerTriggeredOnceD,
          keyedStoreTriggerUntriggered,
          unkeyedStoreTriggerUntriggered,
          unkeyedStoreTriggerTriggered,
          fileExtensionTriggerUntriggered,
          fileExtensionTriggerTriggeredMultipleTimes,
          fileExtensionTriggerTriggeredOnceA,
          fileExtensionTriggerTriggeredOnceB,
          fileExtensionTriggerTriggeredOnceC,
          fileExtensionTriggerTriggeredOnceD,
          fileExtensionTriggerTriggeredOnceE,
        ],
        false,
        {
          added: [
            parsedPathMatchingOnceD,
            parsedPathMatchingOnceB,
            parsedPathUnmatchingD,
            parsedPathMatchingOnceA,
            parsedPathUnmatchingE,
            parsedPathUnmatchingF,
            parsedPathMatchingMultipleTimesB,
          ],
          changed: [parsedPathMatchingMultipleTimesA, parsedPathUnmatchingC],
          deleted: [
            parsedPathMatchingOnceC,
            parsedPathMatchingMultipleTimesC,
            parsedPathUnmatchingB,
          ],
          unchanged: [parsedPathMatchingMultipleTimesD, parsedPathUnmatchingA],
        }
      );
    });

    it(`queries all applicable triggers for steps exactly the expected times`, () => {
      expect(oneTimeTrigger.up).not.toHaveBeenCalled();
      expect(keyedStoreTriggerTriggeredMultipleTimes.down).toHaveBeenCalledWith(
        `Test Store Key F C`
      );
      expect(
        keyedStoreTriggerTriggeredMultipleTimes.down
      ).toHaveBeenCalledTimes(1);
      expect(keyedStoreTriggerTriggeredMultipleTimes.up).toHaveBeenCalledWith(
        `Test Store Key F A`
      );
      expect(keyedStoreTriggerTriggeredMultipleTimes.up).toHaveBeenCalledWith(
        `Test Store Key F B`
      );
      expect(keyedStoreTriggerTriggeredMultipleTimes.up).toHaveBeenCalledTimes(
        2
      );
      expect(keyedStoreTriggerTriggeredOnceA.down).not.toHaveBeenCalled();
      expect(keyedStoreTriggerTriggeredOnceA.up).toHaveBeenCalledWith(
        `Test Store Key B A`
      );
      expect(keyedStoreTriggerTriggeredOnceA.up).toHaveBeenCalledTimes(1);
      expect(keyedStoreTriggerTriggeredOnceB.down).toHaveBeenCalledWith(
        `Test Store Key C B`
      );
      expect(keyedStoreTriggerTriggeredOnceB.down).toHaveBeenCalledTimes(1);
      expect(keyedStoreTriggerTriggeredOnceB.up).not.toHaveBeenCalled();
      expect(keyedStoreTriggerTriggeredOnceC.down).toHaveBeenCalledWith(
        `Test Store Key D A`
      );
      expect(keyedStoreTriggerTriggeredOnceC.down).toHaveBeenCalledTimes(1);
      expect(keyedStoreTriggerTriggeredOnceC.up).not.toHaveBeenCalled();
      expect(keyedStoreTriggerTriggeredOnceD.down).toHaveBeenCalledWith(
        `Test Store Key E A`
      );
      expect(keyedStoreTriggerTriggeredOnceD.down).toHaveBeenCalledTimes(1);
      expect(keyedStoreTriggerTriggeredOnceD.up).not.toHaveBeenCalled();
      expect(keyedStoreTriggerUntriggered.down).not.toHaveBeenCalled();
      expect(keyedStoreTriggerUntriggered.up).not.toHaveBeenCalled();
      unkeyedStoreTriggerUntriggered;
      unkeyedStoreTriggerTriggered;
      expect(fileExtensionTriggerUntriggered.down).not.toHaveBeenCalled();
      expect(fileExtensionTriggerUntriggered.up).not.toHaveBeenCalled();
      expect(
        fileExtensionTriggerTriggeredMultipleTimes.down
      ).toHaveBeenCalledWith(parsedPathMatchingMultipleTimesA);
      expect(
        fileExtensionTriggerTriggeredMultipleTimes.down
      ).toHaveBeenCalledWith(parsedPathMatchingMultipleTimesC);
      expect(
        fileExtensionTriggerTriggeredMultipleTimes.down
      ).toHaveBeenCalledTimes(2);
      expect(
        fileExtensionTriggerTriggeredMultipleTimes.up
      ).toHaveBeenCalledWith(parsedPathMatchingMultipleTimesA);
      expect(
        fileExtensionTriggerTriggeredMultipleTimes.up
      ).toHaveBeenCalledWith(parsedPathMatchingMultipleTimesB);
      expect(
        fileExtensionTriggerTriggeredMultipleTimes.up
      ).toHaveBeenCalledTimes(2);
      expect(fileExtensionTriggerTriggeredOnceA.down).not.toHaveBeenCalled();
      expect(fileExtensionTriggerTriggeredOnceA.up).toHaveBeenCalledWith(
        parsedPathMatchingOnceA
      );
      expect(fileExtensionTriggerTriggeredOnceA.up).toHaveBeenCalledTimes(1);
      expect(fileExtensionTriggerTriggeredOnceB.down).not.toHaveBeenCalled();
      expect(fileExtensionTriggerTriggeredOnceB.up).toHaveBeenCalledWith(
        parsedPathMatchingOnceB
      );
      expect(fileExtensionTriggerTriggeredOnceC.down).toHaveBeenCalledWith(
        parsedPathMatchingOnceC
      );
      expect(fileExtensionTriggerTriggeredOnceC.down).toHaveBeenCalledTimes(1);
      expect(fileExtensionTriggerTriggeredOnceC.up).not.toHaveBeenCalled();
      expect(fileExtensionTriggerTriggeredOnceD.down).not.toHaveBeenCalled();
      expect(fileExtensionTriggerTriggeredOnceD.up).toHaveBeenCalledWith(
        parsedPathMatchingOnceD
      );
      expect(fileExtensionTriggerTriggeredOnceD.up).toHaveBeenCalledTimes(1);
      expect(fileExtensionTriggerTriggeredOnceE.down).not.toHaveBeenCalled();
      expect(fileExtensionTriggerTriggeredOnceE.up).toHaveBeenCalledWith(
        parsedPathMatchingOnceB
      );
      expect(fileExtensionTriggerTriggeredOnceE.up).toHaveBeenCalledTimes(1);
    });

    it(`returns the expected list of steps`, () => {
      expect(output.steps).toEqual(
        jasmine.arrayWithExactContents([
          fileExtensionTriggeredMultipleTimesStepA,
          fileExtensionTriggeredMultipleTimesStepB,
          fileExtensionTriggeredMultipleTimesStepC,
          fileExtensionTriggeredMultipleTimesStepD,
          fileExtensionTriggeredOnceStepA,
          fileExtensionTriggeredOnceStepB,
          fileExtensionTriggeredOnceStepC,
          fileExtensionTriggeredOnceStepD,
          fileExtensionTriggeredOnceStepE,
          keyedStoreTriggeredMultipleTimesStepA,
          keyedStoreTriggeredMultipleTimesStepB,
          keyedStoreTriggeredMultipleTimesStepC,
          keyedStoreTriggeredOnceStepA,
          keyedStoreTriggeredOnceStepB,
          keyedStoreTriggeredOnceStepC,
          keyedStoreTriggeredOnceStepD,
          unkeyedStoreDownStep,
          unkeyedStoreUpStep,
        ])
      );
    });

    it(`returns the expected list of ordering constraints`, () => {
      expect(output.orderingConstraints).toEqual(
        jasmine.arrayWithExactContents([
          [fileExtensionTriggeredMultipleTimesStepA, unkeyedStoreDownStep],
          [
            fileExtensionTriggeredMultipleTimesStepA,
            keyedStoreTriggeredOnceStepA,
          ],
          [
            fileExtensionTriggeredMultipleTimesStepB,
            keyedStoreTriggeredOnceStepD,
          ],
          [
            fileExtensionTriggeredMultipleTimesStepB,
            keyedStoreTriggeredMultipleTimesStepA,
          ],
          [
            fileExtensionTriggeredMultipleTimesStepC,
            keyedStoreTriggeredMultipleTimesStepC,
          ],
          [
            fileExtensionTriggeredMultipleTimesStepD,
            keyedStoreTriggeredOnceStepC,
          ],
          [fileExtensionTriggeredMultipleTimesStepD, unkeyedStoreUpStep],
          [keyedStoreTriggeredOnceStepA, keyedStoreTriggeredMultipleTimesStepB],
          [keyedStoreTriggeredOnceStepD, keyedStoreTriggeredOnceStepB],

          [unkeyedStoreDownStep, fileExtensionTriggeredMultipleTimesStepB],
          [
            keyedStoreTriggeredMultipleTimesStepB,
            fileExtensionTriggeredMultipleTimesStepB,
          ],
        ])
      );
    });

    it(`returns the expected list of added files which did not trigger anything`, () => {
      expect(output.unmatchedAddedFiles).toEqual(
        jasmine.arrayWithExactContents([
          parsedPathUnmatchingD,
          parsedPathUnmatchingE,
          parsedPathUnmatchingF,
        ])
      );
    });

    it(`does not execute any steps`, () => {
      expect(
        fileExtensionTriggeredMultipleTimesStepA.executePerActionStep
      ).not.toHaveBeenCalled();
      expect(
        fileExtensionTriggeredMultipleTimesStepB.executePerActionStep
      ).not.toHaveBeenCalled();
      expect(
        fileExtensionTriggeredMultipleTimesStepC.executePerActionStep
      ).not.toHaveBeenCalled();
      expect(
        fileExtensionTriggeredMultipleTimesStepD.executePerActionStep
      ).not.toHaveBeenCalled();
      expect(
        fileExtensionTriggeredOnceStepA.executePerActionStep
      ).not.toHaveBeenCalled();
      expect(
        fileExtensionTriggeredOnceStepB.executePerActionStep
      ).not.toHaveBeenCalled();
      expect(
        fileExtensionTriggeredOnceStepC.executePerActionStep
      ).not.toHaveBeenCalled();
      expect(
        fileExtensionTriggeredOnceStepD.executePerActionStep
      ).not.toHaveBeenCalled();
      expect(
        fileExtensionTriggeredOnceStepE.executePerActionStep
      ).not.toHaveBeenCalled();
      expect(
        keyedStoreTriggeredMultipleTimesStepA.executePerActionStep
      ).not.toHaveBeenCalled();
      expect(
        keyedStoreTriggeredMultipleTimesStepB.executePerActionStep
      ).not.toHaveBeenCalled();
      expect(
        keyedStoreTriggeredMultipleTimesStepC.executePerActionStep
      ).not.toHaveBeenCalled();
      expect(
        keyedStoreTriggeredOnceStepA.executePerActionStep
      ).not.toHaveBeenCalled();
      expect(
        keyedStoreTriggeredOnceStepB.executePerActionStep
      ).not.toHaveBeenCalled();
      expect(
        keyedStoreTriggeredOnceStepC.executePerActionStep
      ).not.toHaveBeenCalled();
      expect(
        keyedStoreTriggeredOnceStepD.executePerActionStep
      ).not.toHaveBeenCalled();
      expect(unkeyedStoreDownStep.executePerActionStep).not.toHaveBeenCalled();
      expect(unkeyedStoreUpStep.executePerActionStep).not.toHaveBeenCalled();
    });
  });
});

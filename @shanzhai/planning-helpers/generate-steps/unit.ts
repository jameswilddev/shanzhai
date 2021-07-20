import {
  Step,
  ParsedPath,
  OneTimeTrigger,
  FileTrigger,
  UnkeyedStoreTrigger,
  KeyedStoreTrigger,
  KeyedStore,
  Store,
  Effect,
} from "@shanzhai/interfaces";
import { generateSteps } from ".";

class DummyStep implements Step {
  constructor(readonly name: string, readonly effects: ReadonlyArray<Effect>) {}

  readonly executePerActionStep = jasmine.createSpy(`executePerActionStep`);
}

type TestStoreKeyA = never;
type TestStoreKeyB = `Test Store Key B A`;
type TestStoreKeyC =
  | `Test Store Key C A`
  | `Test Store Key C B`
  | `Test Store Key C C`;
type TestStoreKeyD = `Test Store Key D A`;
type TestStoreKeyE = `Test Store Key E A`;
type TestStoreKeyF =
  | `Test Store Key F A`
  | `Test Store Key F B`
  | `Test Store Key F C`;
type TestStoreKeyG = never;

describe(`generateSteps`, function () {
  describe(`first run`, () => {
    let addedParsedPathForFileTriggerTriggeredOnce: ParsedPath;
    let addedParsedPathForFileTriggerTriggeredMultipleTimesA: ParsedPath;
    let addedParsedPathForFileTriggerTriggeredMultipleTimesB: ParsedPath;
    let addedParsedPathForFileTriggerTriggeredMultipleTimesC: ParsedPath;
    let addedParsedPathWhichDoesNotMatchA: ParsedPath;
    let addedParsedPathWhichDoesNotMatchB: ParsedPath;
    let addedParsedPathWhichDoesNotMatchC: ParsedPath;
    let keyedStoreUntriggered: KeyedStore<TestStoreKeyA>;
    let keyedStoreTriggeredOnce: KeyedStore<TestStoreKeyB>;
    let keyedStoreTriggeredMultipleTimes: KeyedStore<TestStoreKeyC>;
    let unkeyedStoreUntriggered: Store;
    let unkeyedStoreTriggered: Store;
    let oneTimeStep: DummyStep;
    let fileTriggeredOnceStep: DummyStep;
    let fileTriggeredMultipleTimesStepA: DummyStep;
    let fileTriggeredMultipleTimesStepB: DummyStep;
    let fileTriggeredMultipleTimesStepC: DummyStep;
    let keyedStoreTriggeredOnceStep: DummyStep;
    let keyedStoreTriggeredMultipleTimesStepA: DummyStep;
    let keyedStoreTriggeredMultipleTimesStepB: DummyStep;
    let keyedStoreTriggeredMultipleTimesStepC: DummyStep;
    let unkeyedStoreStep: DummyStep;
    let oneTimeTrigger: OneTimeTrigger;
    let untriggeredFileTrigger: FileTrigger;
    let fileTriggerTriggeredOnce: FileTrigger;
    let fileTriggerTriggeredMultipleTimes: FileTrigger;
    let keyedStoreUntriggeredTrigger: KeyedStoreTrigger<TestStoreKeyA>;
    let keyedStoreTriggerTriggeredOnce: KeyedStoreTrigger<TestStoreKeyB>;
    let keyedStoreTriggerTriggeredMultipleTimes: KeyedStoreTrigger<TestStoreKeyC>;
    let unkeyedStoreUntriggeredTrigger: UnkeyedStoreTrigger;
    let unkeyedStoreTriggeredTrigger: UnkeyedStoreTrigger;
    let output: {
      readonly steps: ReadonlyArray<Step>;
      readonly orderingConstraints: ReadonlyArray<readonly [Step, Step]>;
      readonly unmatchedAddedFiles: ReadonlyArray<ParsedPath>;
    };

    beforeAll(async () => {
      addedParsedPathForFileTriggerTriggeredOnce = {
        typeScriptName: `Test Added Parsed Path For File Trigger Triggered Once TypeScript Name`,
        fullPath: `Test Added Parsed Path For File Trigger Triggered Once Full Path`,
        fileExtension: `Test Added Parsed Path For File Trigger Triggered Once File Extension`,
        fullPathWithoutExtension: `Test Added Parsed Path For File Trigger Triggered Once Full Path Without Extension`,
      };
      addedParsedPathForFileTriggerTriggeredMultipleTimesA = {
        typeScriptName: `Test Added Parsed Path For File Trigger Triggered Multiple Times A TypeScript Name`,
        fullPath: `Test Added Parsed Path For File Trigger Triggered Multiple Times A Full Path`,
        fileExtension: `Test Added Parsed Path For File Trigger Triggered Multiple Times File Extension`,
        fullPathWithoutExtension: `Test Added Parsed Path For File Trigger Triggered Multiple Times A Full Path Without Extension`,
      };
      addedParsedPathForFileTriggerTriggeredMultipleTimesB = {
        typeScriptName: `Test Added Parsed Path For File Trigger Triggered Multiple Times B TypeScript Name`,
        fullPath: `Test Added Parsed Path For File Trigger Triggered Multiple Times B Full Path`,
        fileExtension: `Test Added Parsed Path For File Trigger Triggered Multiple Times File Extension`,
        fullPathWithoutExtension: `Test Added Parsed Path For File Trigger Triggered Multiple Times B Full Path Without Extension`,
      };
      addedParsedPathForFileTriggerTriggeredMultipleTimesC = {
        typeScriptName: `Test Added Parsed Path For File Trigger Triggered Multiple Times C TypeScript Name`,
        fullPath: `Test Added Parsed Path For File Trigger Triggered Multiple Times C Full Path`,
        fileExtension: `Test Added Parsed Path For File Trigger Triggered Multiple Times File Extension`,
        fullPathWithoutExtension: `Test Added Parsed Path For File Trigger Triggered Multiple Times C Full Path Without Extension`,
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
        name: `keyedStoreUntriggered`,
        getKeys: jasmine.createSpy(`keyedStoreUntriggered.getKeys`),
      };
      keyedStoreTriggeredOnce = {
        name: `keyedStoreTriggeredOnce`,
        getKeys: jasmine.createSpy(`keyedStoreTriggeredOnce.getKeys`),
      };
      keyedStoreTriggeredMultipleTimes = {
        name: `keyedStoreTriggeredMultipleTimes`,
        getKeys: jasmine.createSpy(`keyedStoreTriggeredMultipleTimes.getKeys`),
      };
      unkeyedStoreUntriggered = {
        name: `unkeyedStoreUntriggered`,
      };
      unkeyedStoreTriggered = {
        name: `unkeyedStoreTriggered`,
      };
      oneTimeStep = new DummyStep(`oneTimeStep`, [
        {
          type: `keyedStoreSet`,
          store: keyedStoreTriggeredMultipleTimes,
          key: `Test Store Key C B`,
        },
      ]);
      fileTriggeredOnceStep = new DummyStep(`fileTriggeredOnceStep`, []);
      fileTriggeredMultipleTimesStepA = new DummyStep(
        `fileTriggeredMultipleTimesStepA`,
        []
      );
      fileTriggeredMultipleTimesStepB = new DummyStep(
        `fileTriggeredMultipleTimesStepB`,
        [
          {
            type: `unkeyedStoreSet`,
            store: unkeyedStoreTriggered,
          },
          {
            type: `keyedStoreSet`,
            store: keyedStoreTriggeredMultipleTimes,
            key: `Test Store Key C A`,
          },
        ]
      );
      fileTriggeredMultipleTimesStepC = new DummyStep(
        `fileTriggeredMultipleTimesStepC`,
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
            store: keyedStoreTriggeredMultipleTimes,
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
          store: keyedStoreTriggeredOnce,
          key: `Test Store Key B A`,
        },
      ]);
      oneTimeTrigger = {
        type: `oneTime`,
        up: jasmine.createSpy(`oneTimeTrigger.up`).and.returnValue(oneTimeStep),
      };
      untriggeredFileTrigger = {
        type: `file`,
        extension: `Test Untriggered File Trigger File Extension`,
        down: jasmine.createSpy(`untriggeredFileTrigger.down`),
        up: jasmine.createSpy(`untriggeredFileTrigger.up`),
      };
      fileTriggerTriggeredOnce = {
        type: `file`,
        extension: `Test Added Parsed Path For File Trigger Triggered Once File Extension`,
        down: jasmine.createSpy(`fileTriggerTriggeredOnce.down`),
        up: jasmine
          .createSpy(`fileTriggerTriggeredOnce.up`)
          .and.returnValue(fileTriggeredOnceStep),
      };
      fileTriggerTriggeredMultipleTimes = {
        type: `file`,
        extension: `Test Added Parsed Path For File Trigger Triggered Multiple Times File Extension`,
        down: jasmine.createSpy(`fileTriggerTriggeredMultipleTimes.down`),
        up: jasmine
          .createSpy(`fileTriggerTriggeredMultipleTimes.up`)
          .and.callFake((file) => {
            switch (file) {
              case addedParsedPathForFileTriggerTriggeredMultipleTimesA:
                return fileTriggeredMultipleTimesStepA;

              case addedParsedPathForFileTriggerTriggeredMultipleTimesB:
                return fileTriggeredMultipleTimesStepB;

              case addedParsedPathForFileTriggerTriggeredMultipleTimesC:
                return fileTriggeredMultipleTimesStepC;

              default:
                fail(`Unexpected file ${JSON.stringify(file)}.`);
                return null;
            }
          }),
      };
      keyedStoreUntriggeredTrigger = {
        type: `keyedStore`,
        store: keyedStoreUntriggered,
        down: jasmine.createSpy(`keyedStoreUntriggeredTrigger.down`),
        up: jasmine.createSpy(`keyedStoreUntriggeredTrigger.up`),
      };
      keyedStoreTriggerTriggeredOnce = {
        type: `keyedStore`,
        store: keyedStoreTriggeredOnce,
        down: jasmine.createSpy(`keyedStoreTriggerTriggeredOnce.down`),
        up: jasmine
          .createSpy(`keyedStoreTriggerTriggeredOnce.up`)
          .and.returnValue(keyedStoreTriggeredOnceStep),
      };
      keyedStoreTriggerTriggeredMultipleTimes = {
        type: `keyedStore`,
        store: keyedStoreTriggeredMultipleTimes,
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
        store: unkeyedStoreUntriggered,
        down: jasmine.createSpy(`unkeyedStoreUntriggeredTrigger.down`),
        up: jasmine.createSpy(`unkeyedStoreUntriggeredTrigger.up`),
      };
      unkeyedStoreTriggeredTrigger = {
        type: `unkeyedStore`,
        store: unkeyedStoreTriggered,
        down: jasmine.createSpy(`unkeyedStoreTriggeredTrigger.down`),
        up: jasmine
          .createSpy(`unkeyedStoreTriggeredTrigger.up`)
          .and.returnValue(unkeyedStoreStep),
      };
      output = generateSteps(
        [
          oneTimeTrigger,
          untriggeredFileTrigger,
          fileTriggerTriggeredOnce,
          fileTriggerTriggeredMultipleTimes,
          keyedStoreUntriggeredTrigger,
          keyedStoreTriggerTriggeredOnce,
          keyedStoreTriggerTriggeredMultipleTimes,
          unkeyedStoreUntriggeredTrigger,
          unkeyedStoreTriggeredTrigger,
        ],
        true,
        {
          added: [
            addedParsedPathForFileTriggerTriggeredOnce,
            addedParsedPathForFileTriggerTriggeredMultipleTimesA,
            addedParsedPathForFileTriggerTriggeredMultipleTimesB,
            addedParsedPathForFileTriggerTriggeredMultipleTimesC,
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
      expect(untriggeredFileTrigger.down).not.toHaveBeenCalled();
      expect(untriggeredFileTrigger.up).not.toHaveBeenCalled();
      expect(fileTriggerTriggeredOnce.down).not.toHaveBeenCalled();
      expect(fileTriggerTriggeredOnce.up).toHaveBeenCalledWith(
        addedParsedPathForFileTriggerTriggeredOnce
      );
      expect(fileTriggerTriggeredOnce.up).toHaveBeenCalledTimes(1);
      expect(fileTriggerTriggeredMultipleTimes.down).not.toHaveBeenCalled();
      expect(fileTriggerTriggeredMultipleTimes.up).toHaveBeenCalledWith(
        addedParsedPathForFileTriggerTriggeredMultipleTimesA
      );
      expect(fileTriggerTriggeredMultipleTimes.up).toHaveBeenCalledWith(
        addedParsedPathForFileTriggerTriggeredMultipleTimesB
      );
      expect(fileTriggerTriggeredMultipleTimes.up).toHaveBeenCalledWith(
        addedParsedPathForFileTriggerTriggeredMultipleTimesC
      );
      expect(fileTriggerTriggeredMultipleTimes.up).toHaveBeenCalledTimes(3);
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
          fileTriggeredOnceStep,
          fileTriggeredMultipleTimesStepA,
          fileTriggeredMultipleTimesStepB,
          fileTriggeredMultipleTimesStepC,
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
          [fileTriggeredMultipleTimesStepB, unkeyedStoreStep],
          [unkeyedStoreStep, keyedStoreTriggeredOnceStep],
          [
            fileTriggeredMultipleTimesStepB,
            keyedStoreTriggeredMultipleTimesStepA,
          ],
          [oneTimeStep, keyedStoreTriggeredMultipleTimesStepB],
          [
            keyedStoreTriggeredMultipleTimesStepA,
            keyedStoreTriggeredMultipleTimesStepC,
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
      expect(fileTriggeredOnceStep.executePerActionStep).not.toHaveBeenCalled();
      expect(
        fileTriggeredMultipleTimesStepA.executePerActionStep
      ).not.toHaveBeenCalled();
      expect(
        fileTriggeredMultipleTimesStepB.executePerActionStep
      ).not.toHaveBeenCalled();
      expect(
        fileTriggeredMultipleTimesStepC.executePerActionStep
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

    it(`does not interact with any stores`, () => {
      expect(keyedStoreUntriggered.getKeys).not.toHaveBeenCalled();
      expect(keyedStoreTriggeredOnce.getKeys).not.toHaveBeenCalled();
      expect(keyedStoreTriggeredMultipleTimes.getKeys).not.toHaveBeenCalled();
    });
  });

  describe(`subsequent run`, () => {
    /*
      [<reference> parsedPathMatchingMultipleTimesA] down -> [fileTriggeredMultipleTimesStepA]
      [<reference> parsedPathMatchingMultipleTimesA] up -> [fileTriggeredMultipleTimesStepB]
      [<reference> parsedPathMatchingMultipleTimesB] up -> [fileTriggeredMultipleTimesStepC]
      [<reference> parsedPathMatchingMultipleTimesC] down -> [fileTriggeredMultipleTimesStepD]
      [<reference> parsedPathMatchingOnceA] up -> [fileTriggeredOnceStepA]
      [<reference> parsedPathMatchingOnceB] up -> [fileTriggeredOnceStepB]
      [<reference> parsedPathMatchingOnceB] up -> [fileTriggeredOnceStepE]
      [<reference> parsedPathMatchingOnceC] down -> [fileTriggeredOnceStepC]
      [<reference> parsedPathMatchingOnceD] up -> [fileTriggeredOnceStepD]
      [fileTriggeredMultipleTimesStepA] -> [unkeyedStoreDownStep]
      [fileTriggeredMultipleTimesStepA] Test Store Key B A up -> [keyedStoreTriggeredOnceStepA]
      [fileTriggeredMultipleTimesStepB] Test Store Key E A down -> [keyedStoreTriggeredOnceStepD]
      [fileTriggeredMultipleTimesStepB] Test Store Key F C down -> [keyedStoreTriggeredMultipleTimesStepA]
      [fileTriggeredMultipleTimesStepC] Test Store Key F B up -> [keyedStoreTriggeredMultipleTimesStepC]
      [fileTriggeredMultipleTimesStepD] Test Store Key D A down -> [keyedStoreTriggeredOnceStepC]
      [fileTriggeredMultipleTimesStepD] -> [unkeyedStoreUpStep]
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
    let keyedStoreUntriggered: KeyedStore<TestStoreKeyA>;
    let keyedStoreTriggeredOnceA: KeyedStore<TestStoreKeyB>;
    let keyedStoreTriggeredOnceB: KeyedStore<TestStoreKeyC>;
    let keyedStoreTriggeredOnceC: KeyedStore<TestStoreKeyD>;
    let keyedStoreTriggeredOnceD: KeyedStore<TestStoreKeyE>;
    let keyedStoreTriggeredMultipleTimes: KeyedStore<TestStoreKeyF>;
    let unkeyedStoreUntriggered: Store;
    let unkeyedStoreTriggered: Store;
    let fileTriggeredMultipleTimesStepA: DummyStep;
    let fileTriggeredMultipleTimesStepB: DummyStep;
    let fileTriggeredMultipleTimesStepC: DummyStep;
    let fileTriggeredMultipleTimesStepD: DummyStep;
    let fileTriggeredOnceStepA: DummyStep;
    let fileTriggeredOnceStepB: DummyStep;
    let fileTriggeredOnceStepC: DummyStep;
    let fileTriggeredOnceStepD: DummyStep;
    let fileTriggeredOnceStepE: DummyStep;
    let keyedStoreTriggeredMultipleTimesStepA: DummyStep;
    let keyedStoreTriggeredMultipleTimesStepB: DummyStep;
    let keyedStoreTriggeredMultipleTimesStepC: DummyStep;
    let keyedStoreTriggeredOnceStepA: DummyStep;
    let keyedStoreTriggeredOnceStepB: DummyStep;
    let keyedStoreTriggeredOnceStepC: DummyStep;
    let keyedStoreTriggeredOnceStepD: DummyStep;
    let unkeyedStoreDownStep: DummyStep;
    let unkeyedStoreUpStep: DummyStep;
    let keyedStoreTriggerTriggeredOnceA: KeyedStoreTrigger<TestStoreKeyB>;
    let keyedStoreTriggerTriggeredOnceB: KeyedStoreTrigger<TestStoreKeyC>;
    let keyedStoreTriggerTriggeredOnceC: KeyedStoreTrigger<TestStoreKeyD>;
    let keyedStoreTriggerTriggeredOnceD: KeyedStoreTrigger<TestStoreKeyE>;
    let keyedStoreTriggerTriggeredMultipleTimes: KeyedStoreTrigger<TestStoreKeyF>;
    let keyedStoreTriggerUntriggered: KeyedStoreTrigger<TestStoreKeyG>;
    let unkeyedStoreTriggerUntriggered: UnkeyedStoreTrigger;
    let unkeyedStoreTriggerTriggered: UnkeyedStoreTrigger;
    let oneTimeTrigger: OneTimeTrigger;
    let fileTriggerUntriggered: FileTrigger;
    let fileTriggerTriggeredMultipleTimes: FileTrigger;
    let fileTriggerTriggeredOnceA: FileTrigger;
    let fileTriggerTriggeredOnceB: FileTrigger;
    let fileTriggerTriggeredOnceC: FileTrigger;
    let fileTriggerTriggeredOnceD: FileTrigger;
    let fileTriggerTriggeredOnceE: FileTrigger;
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
        name: `keyedStoreUntriggered`,
        getKeys: jasmine.createSpy(`keyedStoreUntriggered.getKeys`),
      };
      keyedStoreTriggeredOnceA = {
        name: `keyedStoreTriggeredOnceA`,
        getKeys: jasmine.createSpy(`keyedStoreTriggeredOnceA.getKeys`),
      };
      keyedStoreTriggeredOnceB = {
        name: `keyedStoreTriggeredOnceB`,
        getKeys: jasmine.createSpy(`keyedStoreTriggeredOnceB.getKeys`),
      };
      keyedStoreTriggeredOnceC = {
        name: `keyedStoreTriggeredOnceC`,
        getKeys: jasmine.createSpy(`keyedStoreTriggeredOnceC.getKeys`),
      };
      keyedStoreTriggeredOnceD = {
        name: `keyedStoreTriggeredOnceD`,
        getKeys: jasmine.createSpy(`keyedStoreTriggeredOnceD.getKeys`),
      };
      keyedStoreTriggeredMultipleTimes = {
        name: `keyedStoreTriggeredMultipleTimes`,
        getKeys: jasmine.createSpy(`keyedStoreTriggeredMultipleTimes.getKeys`),
      };
      unkeyedStoreUntriggered = {
        name: `unkeyedStoreUntriggered`,
      };
      unkeyedStoreTriggered = {
        name: `unkeyedStoreTriggered`,
      };
      fileTriggeredMultipleTimesStepA = new DummyStep(
        `fileTriggeredMultipleTimesStepA`,
        [
          {
            type: `unkeyedStoreDelete`,
            store: unkeyedStoreTriggered,
          },
          {
            type: `keyedStoreSet`,
            store: keyedStoreTriggeredOnceA,
            key: `Test Store Key B A`,
          },
        ]
      );
      fileTriggeredMultipleTimesStepB = new DummyStep(
        `fileTriggeredMultipleTimesStepB`,
        [
          {
            type: `keyedStoreDelete`,
            store: keyedStoreTriggeredOnceD,
            key: `Test Store Key E A`,
          },
          {
            type: `keyedStoreDelete`,
            store: keyedStoreTriggeredMultipleTimes,
            key: `Test Store Key F C`,
          },
        ]
      );
      fileTriggeredMultipleTimesStepC = new DummyStep(
        `fileTriggeredMultipleTimesStepC`,
        [
          {
            type: `keyedStoreSet`,
            store: keyedStoreTriggeredMultipleTimes,
            key: `Test Store Key F B`,
          },
        ]
      );
      fileTriggeredMultipleTimesStepD = new DummyStep(
        `fileTriggeredMultipleTimesStepD`,
        [
          {
            type: `keyedStoreDelete`,
            store: keyedStoreTriggeredOnceC,
            key: `Test Store Key D A`,
          },
          {
            type: `unkeyedStoreSet`,
            store: unkeyedStoreTriggered,
          },
        ]
      );
      fileTriggeredOnceStepA = new DummyStep(`fileTriggeredOnceStepA`, []);
      fileTriggeredOnceStepB = new DummyStep(`fileTriggeredOnceStepB`, []);
      fileTriggeredOnceStepC = new DummyStep(`fileTriggeredOnceStepC`, []);
      fileTriggeredOnceStepD = new DummyStep(`fileTriggeredOnceStepD`, []);
      fileTriggeredOnceStepE = new DummyStep(`fileTriggeredOnceStepE`, []);
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
            store: keyedStoreTriggeredMultipleTimes,
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
            store: keyedStoreTriggeredOnceB,
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
        store: keyedStoreTriggeredOnceA,
        down: jasmine.createSpy(`keyedStoreTriggerTriggeredOnceA.down`),
        up: jasmine
          .createSpy(`keyedStoreTriggerTriggeredOnceA.up`)
          .and.returnValue(keyedStoreTriggeredOnceStepA),
      };
      keyedStoreTriggerTriggeredOnceB = {
        type: `keyedStore`,
        store: keyedStoreTriggeredOnceB,
        down: jasmine
          .createSpy(`keyedStoreTriggerTriggeredOnceB.down`)
          .and.returnValue(keyedStoreTriggeredOnceStepB),
        up: jasmine.createSpy(`keyedStoreTriggerTriggeredOnceB.up`),
      };
      keyedStoreTriggerTriggeredOnceC = {
        type: `keyedStore`,
        store: keyedStoreTriggeredOnceC,
        down: jasmine
          .createSpy(`keyedStoreTriggerTriggeredOnceC.down`)
          .and.returnValue(keyedStoreTriggeredOnceStepC),
        up: jasmine.createSpy(`keyedStoreTriggerTriggeredOnceC.up`),
      };
      keyedStoreTriggerTriggeredOnceD = {
        type: `keyedStore`,
        store: keyedStoreTriggeredOnceD,
        down: jasmine
          .createSpy(`keyedStoreTriggerTriggeredOnceD.down`)
          .and.returnValue(keyedStoreTriggeredOnceStepD),
        up: jasmine.createSpy(`keyedStoreTriggerTriggeredOnceD.up`),
      };
      keyedStoreTriggerTriggeredMultipleTimes = {
        type: `keyedStore`,
        store: keyedStoreTriggeredMultipleTimes,
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
        store: keyedStoreUntriggered,
        down: jasmine.createSpy(`keyedStoreTriggerUntriggered.down`),
        up: jasmine.createSpy(`keyedStoreTriggerUntriggered.up`),
      };
      unkeyedStoreTriggerUntriggered = {
        type: `unkeyedStore`,
        store: unkeyedStoreUntriggered,
        down: jasmine.createSpy(`unkeyedStoreTriggerUntriggered.down`),
        up: jasmine.createSpy(`unkeyedStoreTriggerUntriggered.up`),
      };
      unkeyedStoreTriggerTriggered = {
        type: `unkeyedStore`,
        store: unkeyedStoreTriggered,
        down: jasmine
          .createSpy(`unkeyedStoreTriggerTriggered.down`)
          .and.returnValue(unkeyedStoreDownStep),
        up: jasmine
          .createSpy(`unkeyedStoreTriggerTriggered.up`)
          .and.returnValue(unkeyedStoreUpStep),
      };
      fileTriggerUntriggered = {
        type: `file`,
        extension: `Test File Extension Untriggered B`,
        down: jasmine.createSpy(`fileTriggerUntriggered.down`),
        up: jasmine.createSpy(`fileTriggerUntriggered.down`),
      };
      fileTriggerTriggeredMultipleTimes = {
        type: `file`,
        extension: `Test File Extension Triggered Multiple Times`,
        down: jasmine
          .createSpy(`fileTriggerTriggeredMultipleTimes.down`)
          .and.callFake((parsedPath) => {
            switch (parsedPath) {
              case parsedPathMatchingMultipleTimesA:
                return fileTriggeredMultipleTimesStepA;

              case parsedPathMatchingMultipleTimesC:
                return fileTriggeredMultipleTimesStepD;

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
                return fileTriggeredMultipleTimesStepB;

              case parsedPathMatchingMultipleTimesB:
                return fileTriggeredMultipleTimesStepC;

              default:
                fail(`Unexpected parsed path ${JSON.stringify(parsedPath)}`);
                return null;
            }
          }),
      };
      fileTriggerTriggeredOnceA = {
        type: `file`,
        extension: `Test File Extension Triggered Once A`,
        down: jasmine.createSpy(`fileTriggerTriggeredOnceA.down`),
        up: jasmine
          .createSpy(`fileTriggerTriggeredOnceA.up`)
          .and.returnValue(fileTriggeredOnceStepA),
      };
      fileTriggerTriggeredOnceB = {
        type: `file`,
        extension: `Test File Extension Triggered Once B`,
        down: jasmine.createSpy(`fileTriggerTriggeredOnceB.down`),
        up: jasmine
          .createSpy(`fileTriggerTriggeredOnceB.up`)
          .and.returnValue(fileTriggeredOnceStepB),
      };
      fileTriggerTriggeredOnceC = {
        type: `file`,
        extension: `Test File Extension Triggered Once C`,
        down: jasmine
          .createSpy(`fileTriggerTriggeredOnceC.down`)
          .and.returnValue(fileTriggeredOnceStepC),
        up: jasmine.createSpy(`fileTriggerTriggeredOnceC.up`),
      };
      fileTriggerTriggeredOnceD = {
        type: `file`,
        extension: `Test File Extension Triggered Once D`,
        down: jasmine.createSpy(`fileTriggerTriggeredOnceD.down`),
        up: jasmine
          .createSpy(`fileTriggerTriggeredOnceD.up`)
          .and.returnValue(fileTriggeredOnceStepD),
      };
      fileTriggerTriggeredOnceE = {
        type: `file`,
        extension: `Test File Extension Triggered Once B`,
        down: jasmine.createSpy(`fileTriggerTriggeredOnceE.down`),
        up: jasmine
          .createSpy(`fileTriggerTriggeredOnceE.up`)
          .and.returnValue(fileTriggeredOnceStepE),
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
          fileTriggerUntriggered,
          fileTriggerTriggeredMultipleTimes,
          fileTriggerTriggeredOnceA,
          fileTriggerTriggeredOnceB,
          fileTriggerTriggeredOnceC,
          fileTriggerTriggeredOnceD,
          fileTriggerTriggeredOnceE,
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
      expect(fileTriggerUntriggered.down).not.toHaveBeenCalled();
      expect(fileTriggerUntriggered.up).not.toHaveBeenCalled();
      expect(fileTriggerTriggeredMultipleTimes.down).toHaveBeenCalledWith(
        parsedPathMatchingMultipleTimesA
      );
      expect(fileTriggerTriggeredMultipleTimes.down).toHaveBeenCalledWith(
        parsedPathMatchingMultipleTimesC
      );
      expect(fileTriggerTriggeredMultipleTimes.down).toHaveBeenCalledTimes(2);
      expect(fileTriggerTriggeredMultipleTimes.up).toHaveBeenCalledWith(
        parsedPathMatchingMultipleTimesA
      );
      expect(fileTriggerTriggeredMultipleTimes.up).toHaveBeenCalledWith(
        parsedPathMatchingMultipleTimesB
      );
      expect(fileTriggerTriggeredMultipleTimes.up).toHaveBeenCalledTimes(2);
      expect(fileTriggerTriggeredOnceA.down).not.toHaveBeenCalled();
      expect(fileTriggerTriggeredOnceA.up).toHaveBeenCalledWith(
        parsedPathMatchingOnceA
      );
      expect(fileTriggerTriggeredOnceA.up).toHaveBeenCalledTimes(1);
      expect(fileTriggerTriggeredOnceB.down).not.toHaveBeenCalled();
      expect(fileTriggerTriggeredOnceB.up).toHaveBeenCalledWith(
        parsedPathMatchingOnceB
      );
      expect(fileTriggerTriggeredOnceC.down).toHaveBeenCalledWith(
        parsedPathMatchingOnceC
      );
      expect(fileTriggerTriggeredOnceC.down).toHaveBeenCalledTimes(1);
      expect(fileTriggerTriggeredOnceC.up).not.toHaveBeenCalled();
      expect(fileTriggerTriggeredOnceD.down).not.toHaveBeenCalled();
      expect(fileTriggerTriggeredOnceD.up).toHaveBeenCalledWith(
        parsedPathMatchingOnceD
      );
      expect(fileTriggerTriggeredOnceD.up).toHaveBeenCalledTimes(1);
      expect(fileTriggerTriggeredOnceE.down).not.toHaveBeenCalled();
      expect(fileTriggerTriggeredOnceE.up).toHaveBeenCalledWith(
        parsedPathMatchingOnceB
      );
      expect(fileTriggerTriggeredOnceE.up).toHaveBeenCalledTimes(1);
    });

    it(`returns the expected list of steps`, () => {
      expect(output.steps).toEqual(
        jasmine.arrayWithExactContents([
          fileTriggeredMultipleTimesStepA,
          fileTriggeredMultipleTimesStepB,
          fileTriggeredMultipleTimesStepC,
          fileTriggeredMultipleTimesStepD,
          fileTriggeredOnceStepA,
          fileTriggeredOnceStepB,
          fileTriggeredOnceStepC,
          fileTriggeredOnceStepD,
          fileTriggeredOnceStepE,
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
          [fileTriggeredMultipleTimesStepA, unkeyedStoreDownStep],
          [fileTriggeredMultipleTimesStepA, keyedStoreTriggeredOnceStepA],
          [fileTriggeredMultipleTimesStepB, keyedStoreTriggeredOnceStepD],
          [
            fileTriggeredMultipleTimesStepB,
            keyedStoreTriggeredMultipleTimesStepA,
          ],
          [
            fileTriggeredMultipleTimesStepC,
            keyedStoreTriggeredMultipleTimesStepC,
          ],
          [fileTriggeredMultipleTimesStepD, keyedStoreTriggeredOnceStepC],
          [fileTriggeredMultipleTimesStepD, unkeyedStoreUpStep],
          [keyedStoreTriggeredOnceStepA, keyedStoreTriggeredMultipleTimesStepB],
          [keyedStoreTriggeredOnceStepD, keyedStoreTriggeredOnceStepB],

          [unkeyedStoreDownStep, fileTriggeredMultipleTimesStepB],
          [
            keyedStoreTriggeredMultipleTimesStepB,
            fileTriggeredMultipleTimesStepB,
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
        fileTriggeredMultipleTimesStepA.executePerActionStep
      ).not.toHaveBeenCalled();
      expect(
        fileTriggeredMultipleTimesStepB.executePerActionStep
      ).not.toHaveBeenCalled();
      expect(
        fileTriggeredMultipleTimesStepC.executePerActionStep
      ).not.toHaveBeenCalled();
      expect(
        fileTriggeredMultipleTimesStepD.executePerActionStep
      ).not.toHaveBeenCalled();
      expect(
        fileTriggeredOnceStepA.executePerActionStep
      ).not.toHaveBeenCalled();
      expect(
        fileTriggeredOnceStepB.executePerActionStep
      ).not.toHaveBeenCalled();
      expect(
        fileTriggeredOnceStepC.executePerActionStep
      ).not.toHaveBeenCalled();
      expect(
        fileTriggeredOnceStepD.executePerActionStep
      ).not.toHaveBeenCalled();
      expect(
        fileTriggeredOnceStepE.executePerActionStep
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

    it(`does not interact with any stores`, () => {
      expect(keyedStoreUntriggered.getKeys).not.toHaveBeenCalled();
      expect(keyedStoreTriggeredOnceA.getKeys).not.toHaveBeenCalled();
      expect(keyedStoreTriggeredOnceB.getKeys).not.toHaveBeenCalled();
      expect(keyedStoreTriggeredOnceC.getKeys).not.toHaveBeenCalled();
      expect(keyedStoreTriggeredOnceD.getKeys).not.toHaveBeenCalled();
      expect(keyedStoreTriggeredMultipleTimes.getKeys).not.toHaveBeenCalled();
    });
  });
});

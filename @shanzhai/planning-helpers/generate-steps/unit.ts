import {
  StoreAggregateTrigger,
  Effect,
  FileTrigger,
  OneTimeTrigger,
  Step,
  Trigger,
  KeyedStore,
  UnkeyedStore,
  KeyedStoreTrigger,
} from "@shanzhai/interfaces";
import { generateSteps } from ".";

class DummyStep implements Step {
  constructor(readonly name: string, readonly effects: ReadonlyArray<Effect>) {}

  readonly executePerActionStep = jasmine.createSpy(`executePerActionStep`);
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

describe(`generateSteps`, function () {
  for (const firstRun of [false, true]) {
    describe(firstRun ? `first run` : `subsequent run`, () => {
      let unusedKeyedStore: KeyedStore<never>;
      let unusedUnkeyedStore: UnkeyedStore<never>;
      let untriggeredKeyedStore: KeyedStore<never>;
      let untriggeredUnkeyedStore: UnkeyedStore<never>;
      let setKeyedStore: KeyedStore<never>;
      let deletedKeyedStore: KeyedStore<never>;
      let setUnkeyedStore: UnkeyedStore<never>;
      let setAndDeletedKeyedStore: KeyedStore<never>;
      let storeAggregateTriggerUntriggered: StoreAggregateTrigger;
      let storeAggregateTriggerTriggeredByUnkeyedSetStep: DummyStep;
      let storeAggregateTriggerTriggeredByUnkeyedSet: StoreAggregateTrigger;
      let storeAggregateTriggerTriggeredByKeyedSetStep: DummyStep;
      let storeAggregateTriggerTriggeredByKeyedSet: StoreAggregateTrigger;
      let storeAggregateTriggerTriggeredByKeyedDeleteStep: DummyStep;
      let storeAggregateTriggerTriggeredByKeyedDelete: StoreAggregateTrigger;
      let storeAggregateTriggerTriggeredByAllInOneStoreStep: DummyStep;
      let storeAggregateTriggerTriggeredByAllInOneStore: StoreAggregateTrigger;
      let storeAggregateTriggerTriggeredByAllAcrossMultipleStoresStep: DummyStep;
      let storeAggregateTriggerTriggeredByAllAcrossMultipleStores: StoreAggregateTrigger;
      let keyedStoreTriggerUntriggered: KeyedStoreTrigger;
      let keyedStoreTriggerTriggeredByKeyedSetStep: DummyStep;
      let keyedStoreTriggerTriggeredByKeyedSet: KeyedStoreTrigger;
      let keyedStoreTriggerTriggeredByKeyedDeleteStep: DummyStep;
      let keyedStoreTriggerTriggeredByKeyedDelete: KeyedStoreTrigger;
      let keyedStoreTriggerTriggeredByAllSetStep: DummyStep;
      let keyedStoreTriggerTriggeredByAllDeleteStep: DummyStep;
      let keyedStoreTriggerTriggeredByAll: KeyedStoreTrigger;
      let oneTimeTriggerStep: DummyStep;
      let oneTimeTrigger: OneTimeTrigger;
      let fileTriggerUntriggered: FileTrigger;
      let fileTriggerTriggeredByMoreSpecificAddStep: DummyStep;
      let fileTriggerTriggeredByMoreSpecificAdd: FileTrigger;
      let fileTriggerTriggeredByMoreSpecificDeleteStep: DummyStep;
      let fileTriggerTriggeredByMoreSpecificDelete: FileTrigger;
      let fileTriggerTriggeredByMoreSpecificChangeDownStep: DummyStep;
      let fileTriggerTriggeredByMoreSpecificChangeUpStep: DummyStep;
      let fileTriggerTriggeredByMoreSpecificChange: FileTrigger;
      let fileTriggerTriggeredByLessSpecificAddStep: DummyStep;
      let fileTriggerTriggeredByLessSpecificAdd: FileTrigger;
      let fileTriggerTriggeredByLessSpecificDeleteStep: DummyStep;
      let fileTriggerTriggeredByLessSpecificDelete: FileTrigger;
      let fileTriggerTriggeredByLessSpecificChangeDownStep: DummyStep;
      let fileTriggerTriggeredByLessSpecificChangeUpStep: DummyStep;
      let fileTriggerTriggeredByLessSpecificChange: FileTrigger;
      let fileTriggerTriggeredByAllAddStep: DummyStep;
      let fileTriggerTriggeredByAllDeleteStep: DummyStep;
      let fileTriggerTriggeredByAllChangeDownStep: DummyStep;
      let fileTriggerTriggeredByAllChangeUpStep: DummyStep;
      let fileTriggerTriggeredByAll: FileTrigger;
      let output: {
        readonly steps: ReadonlyArray<Step>;
        readonly orderingConstraints: ReadonlyArray<readonly [Step, Step]>;
        readonly unmatchedAddedFiles: ReadonlyArray<string>;
      };

      beforeAll(() => {
        unusedKeyedStore = {
          type: `keyedStore`,
          name: `unusedKeyedStore`,
          get: jasmine.createSpy(`unusedKeyedStore.get`),
          set: jasmine.createSpy(`unusedKeyedStore.set`),
          delete: jasmine.createSpy(`unusedKeyedStore.delete`),
          getAll: jasmine.createSpy(`unusedKeyedStore.getAll`),
          getKeys: jasmine.createSpy(`unusedKeyedStore.getKeys`),
        };
        unusedUnkeyedStore = {
          type: `unkeyedStore`,
          name: `unusedUnkeyedStore`,
          get: jasmine.createSpy(`unusedUnkeyedStore.get`),
          set: jasmine.createSpy(`unusedUnkeyedStore.set`),
        };
        untriggeredKeyedStore = {
          type: `keyedStore`,
          name: `untriggeredKeyedStore`,
          get: jasmine.createSpy(`untriggeredKeyedStore.get`),
          set: jasmine.createSpy(`untriggeredKeyedStore.set`),
          delete: jasmine.createSpy(`untriggeredKeyedStore.delete`),
          getAll: jasmine.createSpy(`untriggeredKeyedStore.getAll`),
          getKeys: jasmine.createSpy(`untriggeredKeyedStore.getKeys`),
        };
        untriggeredUnkeyedStore = {
          type: `unkeyedStore`,
          name: `untriggeredUnkeyedStore`,
          get: jasmine.createSpy(`untriggeredUnkeyedStore.get`),
          set: jasmine.createSpy(`untriggeredUnkeyedStore.set`),
        };
        setKeyedStore = {
          type: `keyedStore`,
          name: `setKeyedStore`,
          get: jasmine.createSpy(`setKeyedStore.get`),
          set: jasmine.createSpy(`setKeyedStore.set`),
          delete: jasmine.createSpy(`setKeyedStore.delete`),
          getAll: jasmine.createSpy(`setKeyedStore.getAll`),
          getKeys: jasmine.createSpy(`setKeyedStore.getKeys`),
        };
        deletedKeyedStore = {
          type: `keyedStore`,
          name: `deletedKeyedStore`,
          get: jasmine.createSpy(`deletedKeyedStore.get`),
          set: jasmine.createSpy(`deletedKeyedStore.set`),
          delete: jasmine.createSpy(`deletedKeyedStore.delete`),
          getAll: jasmine.createSpy(`deletedKeyedStore.getAll`),
          getKeys: jasmine.createSpy(`deletedKeyedStore.getKeys`),
        };
        setUnkeyedStore = {
          type: `unkeyedStore`,
          name: `setUnkeyedStore`,
          get: jasmine.createSpy(`setUnkeyedStore.get`),
          set: jasmine.createSpy(`setUnkeyedStore.set`),
        };
        setAndDeletedKeyedStore = {
          type: `keyedStore`,
          name: `setAndDeletedKeyedStore`,
          get: jasmine.createSpy(`setAndDeletedKeyedStore.get`),
          set: jasmine.createSpy(`setAndDeletedKeyedStore.set`),
          delete: jasmine.createSpy(`setAndDeletedKeyedStore.delete`),
          getAll: jasmine.createSpy(`setAndDeletedKeyedStore.getAll`),
          getKeys: jasmine.createSpy(`setAndDeletedKeyedStore.getKeys`),
        };
        storeAggregateTriggerUntriggered = {
          type: `storeAggregate`,
          stores: [untriggeredKeyedStore, untriggeredUnkeyedStore],
          invalidated: jasmine.createSpy(
            `storeAggregateTriggerUntriggered.invalidated`
          ),
          writesToStores: [],
        };
        storeAggregateTriggerTriggeredByUnkeyedSetStep = new DummyStep(
          `storeAggregateTriggerTriggeredByUnkeyedSetStep`,
          []
        );
        storeAggregateTriggerTriggeredByUnkeyedSet = {
          type: `storeAggregate`,
          stores: [
            untriggeredKeyedStore,
            setUnkeyedStore,
            untriggeredUnkeyedStore,
          ],
          invalidated: jasmine
            .createSpy(`storeAggregateTriggerTriggeredByUnkeyedSet.invalidated`)
            .and.returnValue(storeAggregateTriggerTriggeredByUnkeyedSetStep),
          writesToStores: [],
        };
        storeAggregateTriggerTriggeredByKeyedSetStep = new DummyStep(
          `storeAggregateTriggerTriggeredByKeyedSetStep`,
          []
        );
        storeAggregateTriggerTriggeredByKeyedSet = {
          type: `storeAggregate`,
          stores: [
            untriggeredKeyedStore,
            setKeyedStore,
            untriggeredUnkeyedStore,
          ],
          invalidated: jasmine
            .createSpy(`storeAggregateTriggerTriggeredByKeyedSet.invalidated`)
            .and.returnValue(storeAggregateTriggerTriggeredByKeyedSetStep),
          writesToStores: [],
        };
        storeAggregateTriggerTriggeredByKeyedDeleteStep = new DummyStep(
          `storeAggregateTriggerTriggeredByKeyedDeleteStep`,
          [
            {
              type: `unkeyedStoreSet`,
              unkeyedStore: setUnkeyedStore,
            },
          ]
        );
        storeAggregateTriggerTriggeredByKeyedDelete = {
          type: `storeAggregate`,
          stores: [
            untriggeredKeyedStore,
            deletedKeyedStore,
            untriggeredUnkeyedStore,
          ],
          invalidated: jasmine
            .createSpy(
              `storeAggregateTriggerTriggeredByKeyedDelete.invalidated`
            )
            .and.returnValue(storeAggregateTriggerTriggeredByKeyedDeleteStep),
          writesToStores: [setUnkeyedStore],
        };
        storeAggregateTriggerTriggeredByAllInOneStoreStep = new DummyStep(
          `storeAggregateTriggerTriggeredByAllInOneStoreStep`,
          []
        );
        storeAggregateTriggerTriggeredByAllInOneStore = {
          type: `storeAggregate`,
          stores: [
            untriggeredKeyedStore,
            setAndDeletedKeyedStore,
            untriggeredUnkeyedStore,
          ],
          invalidated: jasmine
            .createSpy(
              `storeAggregateTriggerTriggeredByAllInOneStore.invalidated`
            )
            .and.returnValue(storeAggregateTriggerTriggeredByAllInOneStoreStep),
          writesToStores: [],
        };
        storeAggregateTriggerTriggeredByAllAcrossMultipleStoresStep =
          new DummyStep(
            `storeAggregateTriggerTriggeredByAllAcrossMultipleStoresStep`,
            []
          );
        storeAggregateTriggerTriggeredByAllAcrossMultipleStores = {
          type: `storeAggregate`,
          stores: [
            untriggeredKeyedStore,
            setKeyedStore,
            deletedKeyedStore,
            untriggeredUnkeyedStore,
          ],
          invalidated: jasmine
            .createSpy(
              `storeAggregateTriggerTriggeredByAllAcrossMultipleStores.invalidated`
            )
            .and.returnValue(
              storeAggregateTriggerTriggeredByAllAcrossMultipleStoresStep
            ),
          writesToStores: [],
        };
        keyedStoreTriggerUntriggered = {
          type: `keyedStore`,
          keyedStore: untriggeredKeyedStore,
          refreshAllWhenStoresChange: [
            untriggeredUnkeyedStore,
            untriggeredKeyedStore,
          ],
          down: jasmine.createSpy(`keyedStoreTriggerTriggerUntriggered.down`),
          up: jasmine.createSpy(`keyedStoreTriggerTriggerUntriggered.up`),
          writesToStores: [],
        };
        keyedStoreTriggerTriggeredByKeyedSetStep = new DummyStep(
          `keyedStoreTriggerTriggeredByKeyedSetStep`,
          []
        );
        keyedStoreTriggerTriggeredByKeyedSet = {
          type: `keyedStore`,
          keyedStore: setKeyedStore,
          refreshAllWhenStoresChange: [
            untriggeredUnkeyedStore,
            untriggeredKeyedStore,
          ],
          down: jasmine.createSpy(`keyedStoreTriggerTriggeredByKeyedSet.down`),
          up: jasmine
            .createSpy(`keyedStoreTriggerTriggeredByKeyedSet.up`)
            .and.returnValue(keyedStoreTriggerTriggeredByKeyedSetStep),
          writesToStores: [],
        };
        keyedStoreTriggerTriggeredByKeyedDeleteStep = new DummyStep(
          `keyedStoreTriggerTriggeredByKeyedDeleteStep`,
          []
        );
        keyedStoreTriggerTriggeredByKeyedDelete = {
          type: `keyedStore`,
          keyedStore: deletedKeyedStore,
          refreshAllWhenStoresChange: [
            untriggeredUnkeyedStore,
            untriggeredKeyedStore,
          ],
          down: jasmine
            .createSpy(`keyedStoreTriggerTriggeredByKeyedDelete.down`)
            .and.returnValue(keyedStoreTriggerTriggeredByKeyedDeleteStep),
          up: jasmine.createSpy(`keyedStoreTriggerTriggeredByKeyedDelete.up`),
          writesToStores: [],
        };
        keyedStoreTriggerTriggeredByAllSetStep = new DummyStep(
          `keyedStoreTriggerTriggeredByAllSetStep`,
          []
        );
        keyedStoreTriggerTriggeredByAllDeleteStep = new DummyStep(
          `keyedStoreTriggerTriggeredByAllDeleteStep`,
          []
        );
        keyedStoreTriggerTriggeredByAll = {
          type: `keyedStore`,
          keyedStore: setAndDeletedKeyedStore,
          refreshAllWhenStoresChange: [
            untriggeredUnkeyedStore,
            untriggeredKeyedStore,
          ],
          down: jasmine
            .createSpy(`keyedStoreTriggerTriggeredByKeyedDelete.down`)
            .and.returnValue(keyedStoreTriggerTriggeredByAllDeleteStep),
          up: jasmine
            .createSpy(`keyedStoreTriggerTriggeredByKeyedDelete.up`)
            .and.returnValue(keyedStoreTriggerTriggeredByAllSetStep),
          writesToStores: [],
        };
        oneTimeTriggerStep = new DummyStep(`oneTimeTriggerStep`, []);
        oneTimeTrigger = {
          type: `oneTime`,
          up: jasmine
            .createSpy(`oneTimeTrigger.up`)
            .and.returnValue(oneTimeTriggerStep),
          writesToStores: [],
        };
        fileTriggerUntriggered = {
          type: `file`,
          glob: `no/files/match/this`,
          down: jasmine.createSpy(`fileTriggerUntriggered.down`),
          up: jasmine.createSpy(`fileTriggerUntriggered.up`),
          writesToStores: [],
        };
        fileTriggerTriggeredByMoreSpecificAddStep = new DummyStep(
          `fileTriggerTriggeredByMoreSpecificAddStep`,
          []
        );
        fileTriggerTriggeredByMoreSpecificAdd = {
          type: `file`,
          glob: `matched/**/more-specific/added/*`,
          down: jasmine.createSpy(`fileTriggerTriggeredByMoreSpecificAdd.down`),
          up: jasmine
            .createSpy(`fileTriggerTriggeredByMoreSpecificAdd.up`)
            .and.returnValue(fileTriggerTriggeredByMoreSpecificAddStep),
          writesToStores: [],
        };
        fileTriggerTriggeredByMoreSpecificDeleteStep = new DummyStep(
          `fileTriggerTriggeredByMoreSpecificDeleteStep`,
          []
        );
        fileTriggerTriggeredByMoreSpecificDelete = {
          type: `file`,
          glob: `matched/**/more-specific/deleted/*`,
          down: jasmine
            .createSpy(`fileTriggerTriggeredByMoreSpecificDelete.down`)
            .and.returnValue(fileTriggerTriggeredByMoreSpecificDeleteStep),
          up: jasmine.createSpy(`fileTriggerTriggeredByMoreSpecificDelete.up`),
          writesToStores: [],
        };
        fileTriggerTriggeredByMoreSpecificChangeDownStep = new DummyStep(
          `fileTriggerTriggeredByMoreSpecificChangeDownStep`,
          []
        );
        fileTriggerTriggeredByMoreSpecificChangeUpStep = new DummyStep(
          `fileTriggerTriggeredByMoreSpecificChangeUpStep`,
          []
        );
        fileTriggerTriggeredByMoreSpecificChange = {
          type: `file`,
          glob: `matched/**/more-specific/changed/*`,
          down: jasmine
            .createSpy(`fileTriggerTriggeredByMoreSpecificChange.down`)
            .and.returnValue(fileTriggerTriggeredByMoreSpecificChangeDownStep),
          up: jasmine
            .createSpy(`fileTriggerTriggeredByMoreSpecificChange.up`)
            .and.returnValue(fileTriggerTriggeredByMoreSpecificChangeUpStep),
          writesToStores: [],
        };
        fileTriggerTriggeredByLessSpecificAddStep = new DummyStep(
          `fileTriggerTriggeredByLessSpecificAddStep`,
          []
        );
        fileTriggerTriggeredByLessSpecificAdd = {
          type: `file`,
          glob: `matched/**/added/*`,
          down: jasmine.createSpy(`fileTriggerTriggeredByLessSpecificAdd.down`),
          up: jasmine
            .createSpy(`fileTriggerTriggeredByLessSpecificAdd.up`)
            .and.returnValue(fileTriggerTriggeredByLessSpecificAddStep),
          writesToStores: [],
        };
        fileTriggerTriggeredByLessSpecificDeleteStep = new DummyStep(
          `fileTriggerTriggeredByLessSpecificDeleteStep`,
          [
            {
              type: `keyedStoreDelete`,
              keyedStore: deletedKeyedStore,
              key: `Test Deleted Key`,
            },
            {
              type: `keyedStoreSet`,
              keyedStore: setKeyedStore,
              key: `Test Set Key`,
            },
          ]
        );
        fileTriggerTriggeredByLessSpecificDelete = {
          type: `file`,
          glob: `matched/**/deleted/*`,
          down: jasmine
            .createSpy(`fileTriggerTriggeredByLessSpecificDelete.down`)
            .and.returnValue(fileTriggerTriggeredByLessSpecificDeleteStep),
          up: jasmine.createSpy(`fileTriggerTriggeredByLessSpecificDelete.up`),
          writesToStores: [deletedKeyedStore, setKeyedStore],
        };
        fileTriggerTriggeredByLessSpecificChangeDownStep = new DummyStep(
          `fileTriggerTriggeredByLessSpecificChangeDownStep`,
          [
            {
              type: `keyedStoreDelete`,
              keyedStore: setAndDeletedKeyedStore,
              key: `Test Set And Deleted Key`,
            },
          ]
        );
        fileTriggerTriggeredByLessSpecificChangeUpStep = new DummyStep(
          `fileTriggerTriggeredByLessSpecificChangeUpStep`,
          [
            {
              type: `keyedStoreSet`,
              keyedStore: setAndDeletedKeyedStore,
              key: `Test Set And Deleted Key`,
            },
          ]
        );
        fileTriggerTriggeredByLessSpecificChange = {
          type: `file`,
          glob: `matched/**/changed/*`,
          down: jasmine
            .createSpy(`fileTriggerTriggeredByLessSpecificChange.down`)
            .and.returnValue(fileTriggerTriggeredByLessSpecificChangeDownStep),
          up: jasmine
            .createSpy(`fileTriggerTriggeredByLessSpecificChange.up`)
            .and.returnValue(fileTriggerTriggeredByLessSpecificChangeUpStep),
          writesToStores: [setAndDeletedKeyedStore],
        };
        fileTriggerTriggeredByAllAddStep = new DummyStep(
          `fileTriggerTriggeredByAllAddStep`,
          [
            {
              type: `keyedStoreDelete`,
              keyedStore: unusedKeyedStore,
              key: `irrelevant`,
            },
          ]
        );
        fileTriggerTriggeredByAllDeleteStep = new DummyStep(
          `fileTriggerTriggeredByAllDeleteStep`,
          []
        );
        fileTriggerTriggeredByAllChangeDownStep = new DummyStep(
          `fileTriggerTriggeredByAllChangeDownStep`,
          [
            {
              type: `keyedStoreSet`,
              keyedStore: unusedKeyedStore,
              key: `irrelevant`,
            },
          ]
        );
        fileTriggerTriggeredByAllChangeUpStep = new DummyStep(
          `fileTriggerTriggeredByAllChangeUpStep`,
          [
            {
              type: `unkeyedStoreSet`,
              unkeyedStore: unusedUnkeyedStore,
            },
          ]
        );
        fileTriggerTriggeredByAll = {
          type: `file`,
          glob: `matched/**/all/*/*`,
          down: jasmine
            .createSpy(`fileTriggerTriggeredByAll.down`)
            .and.callFake((path) => {
              switch (path) {
                case `matched/example/all/changed/file`:
                  return fileTriggerTriggeredByAllChangeDownStep;

                case `matched/example/all/deleted/file`:
                  return fileTriggerTriggeredByAllDeleteStep;

                default:
                  fail(`Unexpected path "${path}".`);
                  return null;
              }
            }),
          up: jasmine
            .createSpy(`fileTriggerTriggeredByAll.up`)
            .and.callFake((path) => {
              switch (path) {
                case `matched/example/all/added/file`:
                  return fileTriggerTriggeredByAllAddStep;

                case `matched/example/all/changed/file`:
                  return fileTriggerTriggeredByAllChangeUpStep;

                default:
                  fail(`Unexpected path "${path}".`);
                  return null;
              }
            }),
          writesToStores: [unusedUnkeyedStore, unusedKeyedStore],
        };

        output = generateSteps(
          shuffled<Trigger>(
            storeAggregateTriggerUntriggered,
            storeAggregateTriggerTriggeredByUnkeyedSet,
            storeAggregateTriggerTriggeredByKeyedSet,
            storeAggregateTriggerTriggeredByKeyedDelete,
            storeAggregateTriggerTriggeredByAllInOneStore,
            storeAggregateTriggerTriggeredByAllAcrossMultipleStores,
            keyedStoreTriggerUntriggered,
            keyedStoreTriggerTriggeredByKeyedSet,
            keyedStoreTriggerTriggeredByKeyedDelete,
            keyedStoreTriggerTriggeredByAll,
            oneTimeTrigger,
            fileTriggerUntriggered,
            fileTriggerTriggeredByMoreSpecificAdd,
            fileTriggerTriggeredByMoreSpecificDelete,
            fileTriggerTriggeredByMoreSpecificChange,
            fileTriggerTriggeredByLessSpecificAdd,
            fileTriggerTriggeredByLessSpecificDelete,
            fileTriggerTriggeredByLessSpecificChange,
            fileTriggerTriggeredByAll
          ),
          firstRun,
          {
            added: [
              `matched/example/more-specific/added/file`,
              `matched/example/less-specific/added/file`,
              `matched/example/all/added/file`,
              `unmatched/example/added/file/a`,
              `unmatched/example/added/file/b`,
              `unmatched/example/added/file/c`,
            ],
            changed: [
              `matched/example/more-specific/changed/file`,
              `matched/example/less-specific/changed/file`,
              `matched/example/all/changed/file`,
              `unmatched/example/changed/file`,
            ],
            deleted: [
              `matched/example/more-specific/deleted/file`,
              `matched/example/less-specific/deleted/file`,
              `matched/example/all/deleted/file`,
              `unmatched/example/deleted/file`,
            ],
            unchanged: [
              `matched/example/more-specific/unchanged/file`,
              `matched/example/less-specific/unchanged/file`,
              `matched/example/all/unchanged/file`,
              `unmatched/example/unchanged/file`,
            ],
          }
        );
      });

      it(`does not interact with any stores`, () => {
        expect(unusedKeyedStore.delete).not.toHaveBeenCalled();
        expect(unusedKeyedStore.get).not.toHaveBeenCalled();
        expect(unusedKeyedStore.getAll).not.toHaveBeenCalled();
        expect(unusedKeyedStore.getKeys).not.toHaveBeenCalled();
        expect(unusedKeyedStore.set).not.toHaveBeenCalled();
        expect(unusedUnkeyedStore.get).not.toHaveBeenCalled();
        expect(unusedUnkeyedStore.set).not.toHaveBeenCalled();
        expect(untriggeredKeyedStore.delete).not.toHaveBeenCalled();
        expect(untriggeredKeyedStore.get).not.toHaveBeenCalled();
        expect(untriggeredKeyedStore.getAll).not.toHaveBeenCalled();
        expect(untriggeredKeyedStore.getKeys).not.toHaveBeenCalled();
        expect(untriggeredKeyedStore.set).not.toHaveBeenCalled();
        expect(untriggeredUnkeyedStore.get).not.toHaveBeenCalled();
        expect(untriggeredUnkeyedStore.set).not.toHaveBeenCalled();
        expect(setUnkeyedStore.get).not.toHaveBeenCalled();
        expect(setUnkeyedStore.set).not.toHaveBeenCalled();
        expect(setKeyedStore.delete).not.toHaveBeenCalled();
        expect(setKeyedStore.get).not.toHaveBeenCalled();
        expect(setKeyedStore.getAll).not.toHaveBeenCalled();
        expect(setKeyedStore.getKeys).not.toHaveBeenCalled();
        expect(setKeyedStore.set).not.toHaveBeenCalled();
        expect(deletedKeyedStore.delete).not.toHaveBeenCalled();
        expect(deletedKeyedStore.get).not.toHaveBeenCalled();
        expect(deletedKeyedStore.getAll).not.toHaveBeenCalled();
        expect(deletedKeyedStore.getKeys).not.toHaveBeenCalled();
        expect(deletedKeyedStore.set).not.toHaveBeenCalled();
        expect(setAndDeletedKeyedStore.delete).not.toHaveBeenCalled();
        expect(setAndDeletedKeyedStore.get).not.toHaveBeenCalled();
        expect(setAndDeletedKeyedStore.getAll).not.toHaveBeenCalled();
        expect(setAndDeletedKeyedStore.getKeys).not.toHaveBeenCalled();
        expect(setAndDeletedKeyedStore.set).not.toHaveBeenCalled();
      });

      it(`queries all applicable triggers for steps exactly the expected times`, () => {
        expect(
          storeAggregateTriggerUntriggered.invalidated
        ).not.toHaveBeenCalled();
        expect(
          storeAggregateTriggerTriggeredByUnkeyedSet.invalidated
        ).toHaveBeenCalledTimes(1);
        expect(
          storeAggregateTriggerTriggeredByKeyedSet.invalidated
        ).toHaveBeenCalledTimes(1);
        expect(
          storeAggregateTriggerTriggeredByKeyedDelete.invalidated
        ).toHaveBeenCalledTimes(1);
        expect(
          storeAggregateTriggerTriggeredByAllInOneStore.invalidated
        ).toHaveBeenCalledTimes(1);
        expect(
          storeAggregateTriggerTriggeredByAllAcrossMultipleStores.invalidated
        ).toHaveBeenCalledTimes(1);
        expect(keyedStoreTriggerUntriggered.down).not.toHaveBeenCalled();
        expect(keyedStoreTriggerUntriggered.up).not.toHaveBeenCalled();
        expect(
          keyedStoreTriggerTriggeredByKeyedSet.down
        ).not.toHaveBeenCalled();
        expect(keyedStoreTriggerTriggeredByKeyedSet.up).toHaveBeenCalledTimes(
          1
        );
        expect(keyedStoreTriggerTriggeredByKeyedSet.up).toHaveBeenCalledWith(
          `Test Set Key`
        );
        expect(
          keyedStoreTriggerTriggeredByKeyedDelete.down
        ).toHaveBeenCalledTimes(1);
        expect(
          keyedStoreTriggerTriggeredByKeyedDelete.down
        ).toHaveBeenCalledWith(`Test Deleted Key`);
        expect(
          keyedStoreTriggerTriggeredByKeyedDelete.up
        ).not.toHaveBeenCalled();
        expect(keyedStoreTriggerTriggeredByAll.down).toHaveBeenCalledTimes(1);
        expect(keyedStoreTriggerTriggeredByAll.down).toHaveBeenCalledWith(
          `Test Set And Deleted Key`
        );
        expect(keyedStoreTriggerTriggeredByAll.up).toHaveBeenCalledTimes(1);
        expect(keyedStoreTriggerTriggeredByAll.up).toHaveBeenCalledWith(
          `Test Set And Deleted Key`
        );
        if (firstRun) {
          expect(oneTimeTrigger.up).toHaveBeenCalledTimes(1);
        } else {
          expect(oneTimeTrigger.up).not.toHaveBeenCalled();
        }
        expect(fileTriggerUntriggered.down).not.toHaveBeenCalled();
        expect(fileTriggerUntriggered.up).not.toHaveBeenCalled();
        expect(
          fileTriggerTriggeredByMoreSpecificAdd.down
        ).not.toHaveBeenCalled();
        expect(fileTriggerTriggeredByMoreSpecificAdd.up).toHaveBeenCalledWith(
          `matched/example/more-specific/added/file`
        );
        expect(fileTriggerTriggeredByMoreSpecificAdd.up).toHaveBeenCalledTimes(
          1
        );
        expect(
          fileTriggerTriggeredByMoreSpecificDelete.down
        ).toHaveBeenCalledTimes(1);
        expect(
          fileTriggerTriggeredByMoreSpecificDelete.down
        ).toHaveBeenCalledWith(`matched/example/more-specific/deleted/file`);
        expect(
          fileTriggerTriggeredByMoreSpecificDelete.up
        ).not.toHaveBeenCalled();
        expect(
          fileTriggerTriggeredByMoreSpecificChange.down
        ).toHaveBeenCalledWith(`matched/example/more-specific/changed/file`);
        expect(
          fileTriggerTriggeredByMoreSpecificChange.down
        ).toHaveBeenCalledTimes(1);
        expect(
          fileTriggerTriggeredByMoreSpecificChange.up
        ).toHaveBeenCalledWith(`matched/example/more-specific/changed/file`);
        expect(
          fileTriggerTriggeredByMoreSpecificChange.up
        ).toHaveBeenCalledTimes(1);
        expect(
          fileTriggerTriggeredByLessSpecificAdd.down
        ).not.toHaveBeenCalled();
        expect(fileTriggerTriggeredByLessSpecificAdd.up).toHaveBeenCalledWith(
          `matched/example/less-specific/added/file`
        );
        expect(fileTriggerTriggeredByLessSpecificAdd.up).toHaveBeenCalledTimes(
          1
        );
        expect(
          fileTriggerTriggeredByLessSpecificDelete.down
        ).toHaveBeenCalledWith(`matched/example/less-specific/deleted/file`);
        expect(
          fileTriggerTriggeredByLessSpecificDelete.down
        ).toHaveBeenCalledTimes(1);
        expect(
          fileTriggerTriggeredByLessSpecificDelete.up
        ).not.toHaveBeenCalled();
        expect(
          fileTriggerTriggeredByLessSpecificChange.down
        ).toHaveBeenCalledWith(`matched/example/less-specific/changed/file`);
        expect(
          fileTriggerTriggeredByLessSpecificChange.down
        ).toHaveBeenCalledTimes(1);
        expect(
          fileTriggerTriggeredByLessSpecificChange.up
        ).toHaveBeenCalledWith(`matched/example/less-specific/changed/file`);
        expect(
          fileTriggerTriggeredByLessSpecificChange.up
        ).toHaveBeenCalledTimes(1);
        expect(fileTriggerTriggeredByAll.down).toHaveBeenCalledWith(
          `matched/example/all/deleted/file`
        );
        expect(fileTriggerTriggeredByAll.down).toHaveBeenCalledWith(
          `matched/example/all/changed/file`
        );
        expect(fileTriggerTriggeredByAll.down).toHaveBeenCalledTimes(2);
        expect(fileTriggerTriggeredByAll.up).toHaveBeenCalledWith(
          `matched/example/all/added/file`
        );
        expect(fileTriggerTriggeredByAll.up).toHaveBeenCalledWith(
          `matched/example/all/changed/file`
        );
        expect(fileTriggerTriggeredByAll.up).toHaveBeenCalledTimes(2);
      });

      it(`returns the expected list of steps`, () => {
        const expected: Step[] = [
          storeAggregateTriggerTriggeredByUnkeyedSetStep,
          storeAggregateTriggerTriggeredByKeyedSetStep,
          storeAggregateTriggerTriggeredByKeyedDeleteStep,
          storeAggregateTriggerTriggeredByAllInOneStoreStep,
          storeAggregateTriggerTriggeredByAllAcrossMultipleStoresStep,
          keyedStoreTriggerTriggeredByKeyedSetStep,
          keyedStoreTriggerTriggeredByKeyedDeleteStep,
          keyedStoreTriggerTriggeredByAllSetStep,
          keyedStoreTriggerTriggeredByAllDeleteStep,
          fileTriggerTriggeredByMoreSpecificAddStep,
          fileTriggerTriggeredByMoreSpecificDeleteStep,
          fileTriggerTriggeredByMoreSpecificChangeDownStep,
          fileTriggerTriggeredByMoreSpecificChangeUpStep,
          fileTriggerTriggeredByLessSpecificAddStep,
          fileTriggerTriggeredByLessSpecificDeleteStep,
          fileTriggerTriggeredByLessSpecificChangeDownStep,
          fileTriggerTriggeredByLessSpecificChangeUpStep,
          fileTriggerTriggeredByAllAddStep,
          fileTriggerTriggeredByAllDeleteStep,
          fileTriggerTriggeredByAllChangeDownStep,
          fileTriggerTriggeredByAllChangeUpStep,
        ];

        if (firstRun) {
          expected.push(oneTimeTriggerStep);
        }

        for (const expectedItem of expected) {
          const matches = output.steps.filter(
            (actualItem) => actualItem === expectedItem
          ).length;

          expect(matches)
            .withContext(
              `step ${expectedItem.name} was expected but not returned`
            )
            .toBeGreaterThan(0);

          expect(matches)
            .withContext(
              `step ${expectedItem.name} was returned multiple times`
            )
            .toBeLessThan(2);
        }

        for (const actualItem of output.steps) {
          const matches = expected.filter(
            (expectedItem) => expectedItem === actualItem
          ).length;

          expect(matches)
            .withContext(
              `step ${actualItem.name} was returned but not expected`
            )
            .toBeGreaterThan(0);
        }
      });

      it(`returns the expected list of ordering constraints`, () => {
        const expected: (readonly [Step, Step])[] = [
          [
            fileTriggerTriggeredByMoreSpecificChangeDownStep,
            fileTriggerTriggeredByMoreSpecificChangeUpStep,
          ],
          [
            fileTriggerTriggeredByLessSpecificChangeDownStep,
            storeAggregateTriggerTriggeredByAllInOneStoreStep,
          ],
          [
            fileTriggerTriggeredByLessSpecificChangeDownStep,
            keyedStoreTriggerTriggeredByAllDeleteStep,
          ],
          [
            fileTriggerTriggeredByLessSpecificChangeUpStep,
            storeAggregateTriggerTriggeredByAllInOneStoreStep,
          ],
        ];

        if (firstRun) {
          expected.push(
            [oneTimeTriggerStep, fileTriggerTriggeredByMoreSpecificAddStep],
            [oneTimeTriggerStep, fileTriggerTriggeredByMoreSpecificDeleteStep],
            [
              oneTimeTriggerStep,
              fileTriggerTriggeredByMoreSpecificChangeDownStep,
            ],
            [oneTimeTriggerStep, fileTriggerTriggeredByLessSpecificAddStep],
            [oneTimeTriggerStep, fileTriggerTriggeredByLessSpecificDeleteStep],
            [
              oneTimeTriggerStep,
              fileTriggerTriggeredByLessSpecificChangeDownStep,
            ],
            [oneTimeTriggerStep, fileTriggerTriggeredByAllAddStep],
            [oneTimeTriggerStep, fileTriggerTriggeredByAllDeleteStep],
            [oneTimeTriggerStep, fileTriggerTriggeredByAllChangeDownStep]
          );
        }

        for (const expectedItem of expected) {
          const matches = output.orderingConstraints.filter(
            (actualItem) =>
              actualItem[0] === expectedItem[0] &&
              actualItem[1] === expectedItem[1]
          ).length;

          expect(matches)
            .withContext(
              `missing expected ordering constraint ${expectedItem[0].name} -> ${expectedItem[1].name}`
            )
            .toBeGreaterThan(0);
          expect(matches)
            .withContext(
              `too many matches for expected ordering constraint ${expectedItem[0].name} -> ${expectedItem[1].name}`
            )
            .toBeLessThan(2);
        }

        for (const actualItem of output.orderingConstraints) {
          const matches = expected.filter(
            (expectedItem) =>
              expectedItem[0] === expectedItem[0] &&
              expectedItem[1] === expectedItem[1]
          ).length;

          expect(matches)
            .withContext(
              `unexpected ordering constraint ${actualItem[0].name} -> ${actualItem[1].name}`
            )
            .toBeGreaterThan(0);
        }
      });

      it(`returns the expected list of added files which did not trigger anything`, () => {
        expect(output.unmatchedAddedFiles).toEqual(
          jasmine.arrayContaining([
            `unmatched/example/added/file/a`,
            `unmatched/example/added/file/b`,
            `unmatched/example/added/file/c`,
          ])
        );
      });

      it(`does not execute any steps`, () => {
        expect(
          storeAggregateTriggerTriggeredByUnkeyedSetStep.executePerActionStep
        ).not.toHaveBeenCalled();
        expect(
          storeAggregateTriggerTriggeredByKeyedSetStep.executePerActionStep
        ).not.toHaveBeenCalled();
        expect(
          storeAggregateTriggerTriggeredByKeyedDeleteStep.executePerActionStep
        ).not.toHaveBeenCalled();
        expect(
          storeAggregateTriggerTriggeredByAllInOneStoreStep.executePerActionStep
        ).not.toHaveBeenCalled();
        expect(
          storeAggregateTriggerTriggeredByAllAcrossMultipleStoresStep.executePerActionStep
        ).not.toHaveBeenCalled();
        expect(
          keyedStoreTriggerTriggeredByKeyedSetStep.executePerActionStep
        ).not.toHaveBeenCalled();
        expect(
          keyedStoreTriggerTriggeredByKeyedDeleteStep.executePerActionStep
        ).not.toHaveBeenCalled();
        expect(
          keyedStoreTriggerTriggeredByAllDeleteStep.executePerActionStep
        ).not.toHaveBeenCalled();
        expect(
          keyedStoreTriggerTriggeredByAllSetStep.executePerActionStep
        ).not.toHaveBeenCalled();
        expect(oneTimeTriggerStep.executePerActionStep).not.toHaveBeenCalled();
        expect(
          fileTriggerTriggeredByMoreSpecificAddStep.executePerActionStep
        ).not.toHaveBeenCalled();
        expect(
          fileTriggerTriggeredByMoreSpecificDeleteStep.executePerActionStep
        ).not.toHaveBeenCalled();
        expect(
          fileTriggerTriggeredByMoreSpecificChangeDownStep.executePerActionStep
        ).not.toHaveBeenCalled();
        expect(
          fileTriggerTriggeredByMoreSpecificChangeUpStep.executePerActionStep
        ).not.toHaveBeenCalled();
        expect(
          fileTriggerTriggeredByLessSpecificAddStep.executePerActionStep
        ).not.toHaveBeenCalled();
        expect(
          fileTriggerTriggeredByLessSpecificDeleteStep.executePerActionStep
        ).not.toHaveBeenCalled();
        expect(
          fileTriggerTriggeredByLessSpecificChangeDownStep.executePerActionStep
        ).not.toHaveBeenCalled();
        expect(
          fileTriggerTriggeredByLessSpecificChangeUpStep.executePerActionStep
        ).not.toHaveBeenCalled();
        expect(
          fileTriggerTriggeredByAllAddStep.executePerActionStep
        ).not.toHaveBeenCalled();
        expect(
          fileTriggerTriggeredByAllDeleteStep.executePerActionStep
        ).not.toHaveBeenCalled();
        expect(
          fileTriggerTriggeredByAllChangeDownStep.executePerActionStep
        ).not.toHaveBeenCalled();
        expect(
          fileTriggerTriggeredByAllChangeUpStep.executePerActionStep
        ).not.toHaveBeenCalled();
      });
    });
  }
});

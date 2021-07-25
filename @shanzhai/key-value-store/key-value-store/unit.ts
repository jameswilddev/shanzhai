import { KeyValueStore } from "..";

describe(`KeyValueStore`, () => {
  type TestValue = `Test Value A` | `Test Value B` | `Test Value C`;

  function recurse(
    description: string,
    events: ReadonlyArray<(keyValueStore: KeyValueStore<TestValue>) => void>,
    remainingValues: ReadonlyArray<TestValue>,
    keyValueA: null | TestValue,
    keyValueB: null | TestValue
  ): void {
    describe(description, () => {
      let keyValueStore: KeyValueStore<TestValue>;

      beforeEach(() => {
        keyValueStore = new KeyValueStore(`Test Key Value Store`);

        for (const event of events) {
          event(keyValueStore);
        }
      });

      if (keyValueA === null) {
        it(`does not allow retrieval of value A`, () => {
          expect(() => keyValueStore.get(`Test Key A`)).toThrowError(
            `Cannot get value "Test Key A" of unset value store "Test Key Value Store".`
          );
        });
      } else {
        it(`allows retrieval of value A`, () => {
          expect(keyValueStore.get(`Test Key A`)).toEqual(keyValueA);
        });
      }

      if (keyValueB === null) {
        it(`does not allow retrieval of value B`, () => {
          expect(() => keyValueStore.get(`Test Key B`)).toThrowError(
            `Cannot get value "Test Key B" of unset value store "Test Key Value Store".`
          );
        });
      } else {
        it(`allows retrieval of value B`, () => {
          expect(keyValueStore.get(`Test Key B`)).toEqual(keyValueB);
        });
      }

      it(`allows retrieval of all values`, () => {
        const expected: (readonly [string, TestValue])[] = [];

        if (keyValueA !== null) {
          expected.push([`Test Key A`, keyValueA]);
        }

        if (keyValueB !== null) {
          expected.push([`Test Key B`, keyValueB]);
        }

        expect(keyValueStore.getAll()).toEqual(expected);
      });
    });

    if (events.length < 4) {
      recurse(
        `get A`,
        [
          ...events,
          (KeyValueStore) => {
            try {
              KeyValueStore.get(`Test Key A`);
            } catch (e) {
              // no-op
            }
          },
        ],
        remainingValues,
        keyValueA,
        keyValueB
      );

      recurse(
        `get B`,
        [
          ...events,
          (KeyValueStore) => {
            try {
              KeyValueStore.get(`Test Key B`);
            } catch (e) {
              // no-op
            }
          },
        ],
        remainingValues,
        keyValueA,
        keyValueB
      );

      recurse(
        `getAll`,
        [
          ...events,
          (KeyValueStore) => {
            KeyValueStore.getAll();
          },
        ],
        remainingValues,
        keyValueA,
        keyValueB
      );

      recurse(
        `delete A`,
        [
          ...events,
          (KeyValueStore) => {
            KeyValueStore.delete(`Test Key A`);
          },
        ],
        remainingValues,
        null,
        keyValueB
      );

      recurse(
        `delete B`,
        [
          ...events,
          (KeyValueStore) => {
            KeyValueStore.delete(`Test Key B`);
          },
        ],
        remainingValues,
        keyValueA,
        null
      );

      if (remainingValues.length > 0) {
        recurse(
          `set A = ${JSON.stringify(remainingValues[0])}`,
          [
            ...events,
            (KeyValueStore) => {
              KeyValueStore.set(`Test Key A`, remainingValues[0]);
            },
          ],
          remainingValues.slice(1),
          remainingValues[0],
          keyValueB
        );

        recurse(
          `set B = ${JSON.stringify(remainingValues[0])}`,
          [
            ...events,
            (KeyValueStore) => {
              KeyValueStore.set(`Test Key B`, remainingValues[0]);
            },
          ],
          remainingValues.slice(1),
          keyValueA,
          remainingValues[0]
        );
      }
    }
  }

  recurse(``, [], [`Test Value A`, `Test Value B`, `Test Value C`], null, null);
});

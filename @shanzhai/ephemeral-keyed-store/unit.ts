import { EphemeralKeyedStore } from ".";

describe(`ephemeral-keyed-store`, () => {
  type TestValue = `Test Value A` | `Test Value B` | `Test Value C`;

  function recurse(
    description: string,
    events: ReadonlyArray<
      (keyedStore: EphemeralKeyedStore<TestValue>) => Promise<void>
    >,
    remainingValues: ReadonlyArray<TestValue>,
    keyValueA: null | TestValue,
    keyValueB: null | TestValue
  ): void {
    describe(description, () => {
      let keyedStore: EphemeralKeyedStore<TestValue>;

      beforeEach(() => {
        keyedStore = new EphemeralKeyedStore(`Test Keyed Store`);

        for (const event of events) {
          event(keyedStore);
        }
      });

      if (keyValueA === null) {
        it(`does not allow retrieval of value A`, async () => {
          await expectAsync(keyedStore.get(`Test Key A`)).toBeRejectedWithError(
            `Cannot get unset value "Test Key A" of keyed store "Test Keyed Store".`
          );
        });
      } else {
        it(`allows retrieval of value A`, async () => {
          await expectAsync(keyedStore.get(`Test Key A`)).toBeResolvedTo(
            keyValueA
          );
        });
      }

      if (keyValueB === null) {
        it(`does not allow retrieval of value B`, async () => {
          await expectAsync(keyedStore.get(`Test Key B`)).toBeRejectedWithError(
            `Cannot get unset value "Test Key B" of keyed store "Test Keyed Store".`
          );
        });
      } else {
        it(`allows retrieval of value B`, async () => {
          await expectAsync(keyedStore.get(`Test Key B`)).toBeResolvedTo(
            keyValueB
          );
        });
      }

      it(`allows retrieval of all values`, async () => {
        const expected: { [key: string]: TestValue } = {};

        if (keyValueA !== null) {
          expected[`Test Key A`] = keyValueA;
        }

        if (keyValueB !== null) {
          expected[`Test Key B`] = keyValueB;
        }

        await expectAsync(keyedStore.getAll()).toBeResolvedTo(expected);
      });

      it(`allows retrieval of all keys`, async () => {
        const expected: string[] = [];

        if (keyValueA !== null) {
          expected.push(`Test Key A`);
        }

        if (keyValueB !== null) {
          expected.push(`Test Key B`);
        }

        await expectAsync(keyedStore.getKeys()).toBeResolvedTo(expected);
      });
    });

    if (events.length < 4) {
      recurse(
        `get A`,
        [
          ...events,
          async (keyedStore) => {
            try {
              await keyedStore.get(`Test Key A`);
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
          async (keyedStore) => {
            try {
              await keyedStore.get(`Test Key B`);
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
          async (keyedStore) => {
            await keyedStore.getAll();
          },
        ],
        remainingValues,
        keyValueA,
        keyValueB
      );

      recurse(
        `getKeys`,
        [
          ...events,
          async (keyedStore) => {
            await keyedStore.getKeys();
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
          async (keyedStore) => {
            await keyedStore.delete(`Test Key A`);
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
          async (keyedStore) => {
            await keyedStore.delete(`Test Key B`);
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
            async (keyedStore) => {
              await keyedStore.set(`Test Key A`, remainingValues[0]);
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
            async (keyedStore) => {
              await keyedStore.set(`Test Key B`, remainingValues[0]);
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

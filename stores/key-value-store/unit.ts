import { KeyValueStore } from ".";

describe(`KeyValueStore`, () => {
  type TestKey = `Test Key A` | `Test Key B`;
  type TestValue = `Test Value A` | `Test Value B` | `Test Value C`;

  type Event =
    | { readonly type: `set`; readonly key: TestKey; readonly value: TestValue }
    | { readonly type: `delete`; readonly key: TestKey }
    | { readonly type: `get`; readonly key: TestKey };

  const afterRunning = (
    events: ReadonlyArray<Event>
  ): KeyValueStore<TestKey, TestValue> => {
    const keyValueStore = new KeyValueStore<TestKey, TestValue>(`Test Name`);

    for (const event of events) {
      switch (event.type) {
        case `set`:
          keyValueStore.set(event.key, event.value);
          break;

        case `delete`:
          keyValueStore.delete(event.key);
          break;

        case `get`:
          keyValueStore.get(event.key);
          break;
      }
    }

    return keyValueStore;
  };

  function getThrowsError(events: ReadonlyArray<Event>, key: TestKey): void {
    describe(`after ${events
      .map((event) => `${event.type} ${event.key}`)
      .join(`, `)} get ${key}`, () => {
      let error: null | Error = null;

      beforeAll(() => {
        try {
          afterRunning(events).get(key);
        } catch (ex) {
          error = ex;
        }
      });

      it(`throws the expected error`, () => {
        expect(error).toEqual(
          new Error(
            `Cannot get value "${key}" of unset value store "Test Name".`
          )
        );
      });
    });
  }

  function getReturnsValue(
    events: ReadonlyArray<Event>,
    key: TestKey,
    value: TestValue
  ): void {
    describe(`after ${events
      .map((event) => `${event.type} ${event.key}`)
      .join(`, `)} get ${key}`, () => {
      let result: TestValue;

      beforeAll(() => {
        result = afterRunning(events).get(key);
      });

      it(`returns the expected value`, () => {
        expect(result).toEqual(value);
      });
    });
  }

  getThrowsError([], `Test Key A`);
  getThrowsError([], `Test Key B`);
  getReturnsValue(
    [{ type: `set`, key: `Test Key A`, value: `Test Value A` }],
    `Test Key A`,
    `Test Value A`
  );
  getThrowsError(
    [{ type: `set`, key: `Test Key A`, value: `Test Value A` }],
    `Test Key B`
  );
  getReturnsValue(
    [
      { type: `set`, key: `Test Key A`, value: `Test Value A` },
      { type: `get`, key: `Test Key A` },
    ],
    `Test Key A`,
    `Test Value A`
  );
  getThrowsError(
    [
      { type: `set`, key: `Test Key A`, value: `Test Value A` },
      { type: `get`, key: `Test Key A` },
    ],
    `Test Key B`
  );
  getReturnsValue(
    [
      { type: `set`, key: `Test Key A`, value: `Test Value A` },
      { type: `get`, key: `Test Key A` },
      { type: `get`, key: `Test Key A` },
    ],
    `Test Key A`,
    `Test Value A`
  );
  getThrowsError(
    [
      { type: `set`, key: `Test Key A`, value: `Test Value A` },
      { type: `get`, key: `Test Key A` },
      { type: `get`, key: `Test Key A` },
    ],
    `Test Key B`
  );
  getReturnsValue(
    [
      { type: `set`, key: `Test Key A`, value: `Test Value A` },
      { type: `get`, key: `Test Key A` },
      { type: `set`, key: `Test Key A`, value: `Test Value B` },
    ],
    `Test Key A`,
    `Test Value B`
  );
  getThrowsError(
    [
      { type: `set`, key: `Test Key A`, value: `Test Value A` },
      { type: `get`, key: `Test Key A` },
      { type: `set`, key: `Test Key A`, value: `Test Value B` },
    ],
    `Test Key B`
  );
  getReturnsValue(
    [
      { type: `set`, key: `Test Key A`, value: `Test Value A` },
      { type: `get`, key: `Test Key A` },
      { type: `set`, key: `Test Key B`, value: `Test Value B` },
    ],
    `Test Key A`,
    `Test Value A`
  );
  getReturnsValue(
    [
      { type: `set`, key: `Test Key A`, value: `Test Value A` },
      { type: `get`, key: `Test Key A` },
      { type: `set`, key: `Test Key B`, value: `Test Value B` },
    ],
    `Test Key B`,
    `Test Value B`
  );
  getThrowsError(
    [
      { type: `set`, key: `Test Key A`, value: `Test Value A` },
      { type: `get`, key: `Test Key A` },
      { type: `delete`, key: `Test Key A` },
    ],
    `Test Key A`
  );
  getThrowsError(
    [
      { type: `set`, key: `Test Key A`, value: `Test Value A` },
      { type: `get`, key: `Test Key A` },
      { type: `delete`, key: `Test Key A` },
    ],
    `Test Key B`
  );
  getReturnsValue(
    [
      { type: `set`, key: `Test Key A`, value: `Test Value A` },
      { type: `get`, key: `Test Key A` },
      { type: `delete`, key: `Test Key B` },
    ],
    `Test Key A`,
    `Test Value A`
  );
  getThrowsError(
    [
      { type: `set`, key: `Test Key A`, value: `Test Value A` },
      { type: `get`, key: `Test Key A` },
      { type: `delete`, key: `Test Key B` },
    ],
    `Test Key B`
  );
  getReturnsValue(
    [
      { type: `set`, key: `Test Key A`, value: `Test Value A` },
      { type: `set`, key: `Test Key A`, value: `Test Value B` },
    ],
    `Test Key A`,
    `Test Value B`
  );
  getThrowsError(
    [
      { type: `set`, key: `Test Key A`, value: `Test Value A` },
      { type: `set`, key: `Test Key A`, value: `Test Value B` },
    ],
    `Test Key B`
  );
  getReturnsValue(
    [
      { type: `set`, key: `Test Key A`, value: `Test Value A` },
      { type: `set`, key: `Test Key A`, value: `Test Value B` },
      { type: `get`, key: `Test Key A` },
    ],
    `Test Key A`,
    `Test Value B`
  );
  getThrowsError(
    [
      { type: `set`, key: `Test Key A`, value: `Test Value A` },
      { type: `set`, key: `Test Key A`, value: `Test Value B` },
      { type: `get`, key: `Test Key A` },
    ],
    `Test Key B`
  );
  getReturnsValue(
    [
      { type: `set`, key: `Test Key A`, value: `Test Value A` },
      { type: `set`, key: `Test Key A`, value: `Test Value B` },
      { type: `set`, key: `Test Key A`, value: `Test Value C` },
    ],
    `Test Key A`,
    `Test Value C`
  );
  getThrowsError(
    [
      { type: `set`, key: `Test Key A`, value: `Test Value A` },
      { type: `set`, key: `Test Key A`, value: `Test Value B` },
      { type: `set`, key: `Test Key A`, value: `Test Value C` },
    ],
    `Test Key B`
  );
  getReturnsValue(
    [
      { type: `set`, key: `Test Key A`, value: `Test Value A` },
      { type: `set`, key: `Test Key A`, value: `Test Value B` },
      { type: `set`, key: `Test Key B`, value: `Test Value C` },
    ],
    `Test Key A`,
    `Test Value B`
  );
  getReturnsValue(
    [
      { type: `set`, key: `Test Key A`, value: `Test Value A` },
      { type: `set`, key: `Test Key A`, value: `Test Value B` },
      { type: `set`, key: `Test Key B`, value: `Test Value C` },
    ],
    `Test Key B`,
    `Test Value C`
  );
  getThrowsError(
    [
      { type: `set`, key: `Test Key A`, value: `Test Value A` },
      { type: `set`, key: `Test Key A`, value: `Test Value B` },
      { type: `delete`, key: `Test Key A` },
    ],
    `Test Key A`
  );
  getThrowsError(
    [
      { type: `set`, key: `Test Key A`, value: `Test Value A` },
      { type: `set`, key: `Test Key A`, value: `Test Value B` },
      { type: `delete`, key: `Test Key A` },
    ],
    `Test Key B`
  );
  getReturnsValue(
    [
      { type: `set`, key: `Test Key A`, value: `Test Value A` },
      { type: `set`, key: `Test Key A`, value: `Test Value B` },
      { type: `delete`, key: `Test Key B` },
    ],
    `Test Key A`,
    `Test Value B`
  );
  getThrowsError(
    [
      { type: `set`, key: `Test Key A`, value: `Test Value A` },
      { type: `set`, key: `Test Key A`, value: `Test Value B` },
      { type: `delete`, key: `Test Key B` },
    ],
    `Test Key B`
  );
  getReturnsValue(
    [
      { type: `set`, key: `Test Key A`, value: `Test Value A` },
      { type: `set`, key: `Test Key B`, value: `Test Value B` },
    ],
    `Test Key A`,
    `Test Value A`
  );
  getReturnsValue(
    [
      { type: `set`, key: `Test Key A`, value: `Test Value A` },
      { type: `set`, key: `Test Key B`, value: `Test Value B` },
    ],
    `Test Key B`,
    `Test Value B`
  );
  getReturnsValue(
    [
      { type: `set`, key: `Test Key A`, value: `Test Value A` },
      { type: `set`, key: `Test Key B`, value: `Test Value B` },
      { type: `get`, key: `Test Key A` },
    ],
    `Test Key A`,
    `Test Value A`
  );
  getReturnsValue(
    [
      { type: `set`, key: `Test Key A`, value: `Test Value A` },
      { type: `set`, key: `Test Key B`, value: `Test Value B` },
      { type: `get`, key: `Test Key A` },
    ],
    `Test Key B`,
    `Test Value B`
  );
  getReturnsValue(
    [
      { type: `set`, key: `Test Key A`, value: `Test Value A` },
      { type: `set`, key: `Test Key B`, value: `Test Value B` },
      { type: `get`, key: `Test Key B` },
    ],
    `Test Key A`,
    `Test Value A`
  );
  getReturnsValue(
    [
      { type: `set`, key: `Test Key A`, value: `Test Value A` },
      { type: `set`, key: `Test Key B`, value: `Test Value B` },
      { type: `get`, key: `Test Key B` },
    ],
    `Test Key B`,
    `Test Value B`
  );
  getReturnsValue(
    [
      { type: `set`, key: `Test Key A`, value: `Test Value A` },
      { type: `set`, key: `Test Key B`, value: `Test Value B` },
      { type: `set`, key: `Test Key A`, value: `Test Value C` },
    ],
    `Test Key A`,
    `Test Value C`
  );
  getReturnsValue(
    [
      { type: `set`, key: `Test Key A`, value: `Test Value A` },
      { type: `set`, key: `Test Key B`, value: `Test Value B` },
      { type: `set`, key: `Test Key A`, value: `Test Value C` },
    ],
    `Test Key B`,
    `Test Value B`
  );
  getReturnsValue(
    [
      { type: `set`, key: `Test Key A`, value: `Test Value A` },
      { type: `set`, key: `Test Key B`, value: `Test Value B` },
      { type: `set`, key: `Test Key B`, value: `Test Value C` },
    ],
    `Test Key A`,
    `Test Value A`
  );
  getReturnsValue(
    [
      { type: `set`, key: `Test Key A`, value: `Test Value A` },
      { type: `set`, key: `Test Key B`, value: `Test Value B` },
      { type: `set`, key: `Test Key B`, value: `Test Value C` },
    ],
    `Test Key B`,
    `Test Value C`
  );
  getThrowsError(
    [
      { type: `set`, key: `Test Key A`, value: `Test Value A` },
      { type: `set`, key: `Test Key B`, value: `Test Value B` },
      { type: `delete`, key: `Test Key A` },
    ],
    `Test Key A`
  );
  getReturnsValue(
    [
      { type: `set`, key: `Test Key A`, value: `Test Value A` },
      { type: `set`, key: `Test Key B`, value: `Test Value B` },
      { type: `delete`, key: `Test Key A` },
    ],
    `Test Key B`,
    `Test Value B`
  );
  getReturnsValue(
    [
      { type: `set`, key: `Test Key A`, value: `Test Value A` },
      { type: `set`, key: `Test Key B`, value: `Test Value B` },
      { type: `delete`, key: `Test Key B` },
    ],
    `Test Key A`,
    `Test Value A`
  );
  getThrowsError(
    [
      { type: `set`, key: `Test Key A`, value: `Test Value A` },
      { type: `set`, key: `Test Key B`, value: `Test Value B` },
      { type: `delete`, key: `Test Key B` },
    ],
    `Test Key B`
  );
  getThrowsError(
    [
      { type: `set`, key: `Test Key A`, value: `Test Value A` },
      { type: `delete`, key: `Test Key A` },
    ],
    `Test Key A`
  );
  getThrowsError(
    [
      { type: `set`, key: `Test Key A`, value: `Test Value A` },
      { type: `delete`, key: `Test Key A` },
    ],
    `Test Key B`
  );
  getReturnsValue(
    [
      { type: `set`, key: `Test Key A`, value: `Test Value A` },
      { type: `delete`, key: `Test Key A` },
      { type: `set`, key: `Test Key A`, value: `Test Value B` },
    ],
    `Test Key A`,
    `Test Value B`
  );
  getThrowsError(
    [
      { type: `set`, key: `Test Key A`, value: `Test Value A` },
      { type: `delete`, key: `Test Key A` },
      { type: `set`, key: `Test Key A`, value: `Test Value B` },
    ],
    `Test Key B`
  );
  getThrowsError(
    [
      { type: `set`, key: `Test Key A`, value: `Test Value A` },
      { type: `delete`, key: `Test Key A` },
      { type: `set`, key: `Test Key B`, value: `Test Value B` },
    ],
    `Test Key A`
  );
  getReturnsValue(
    [
      { type: `set`, key: `Test Key A`, value: `Test Value A` },
      { type: `delete`, key: `Test Key A` },
      { type: `set`, key: `Test Key B`, value: `Test Value B` },
    ],
    `Test Key B`,
    `Test Value B`
  );
  getThrowsError(
    [
      { type: `set`, key: `Test Key A`, value: `Test Value A` },
      { type: `delete`, key: `Test Key A` },
      { type: `delete`, key: `Test Key A` },
    ],
    `Test Key A`
  );
  getThrowsError(
    [
      { type: `set`, key: `Test Key A`, value: `Test Value A` },
      { type: `delete`, key: `Test Key A` },
      { type: `delete`, key: `Test Key A` },
    ],
    `Test Key B`
  );
  getThrowsError(
    [
      { type: `set`, key: `Test Key A`, value: `Test Value A` },
      { type: `delete`, key: `Test Key A` },
      { type: `delete`, key: `Test Key B` },
    ],
    `Test Key A`
  );
  getThrowsError(
    [
      { type: `set`, key: `Test Key A`, value: `Test Value A` },
      { type: `delete`, key: `Test Key A` },
      { type: `delete`, key: `Test Key B` },
    ],
    `Test Key B`
  );
  getReturnsValue(
    [
      { type: `set`, key: `Test Key A`, value: `Test Value A` },
      { type: `delete`, key: `Test Key B` },
    ],
    `Test Key A`,
    `Test Value A`
  );
  getThrowsError(
    [
      { type: `set`, key: `Test Key A`, value: `Test Value A` },
      { type: `delete`, key: `Test Key B` },
    ],
    `Test Key B`
  );
  getReturnsValue(
    [
      { type: `set`, key: `Test Key A`, value: `Test Value A` },
      { type: `delete`, key: `Test Key B` },
      { type: `get`, key: `Test Key A` },
    ],
    `Test Key A`,
    `Test Value A`
  );
  getThrowsError(
    [
      { type: `set`, key: `Test Key A`, value: `Test Value A` },
      { type: `delete`, key: `Test Key B` },
      { type: `get`, key: `Test Key A` },
    ],
    `Test Key B`
  );
  getReturnsValue(
    [
      { type: `set`, key: `Test Key A`, value: `Test Value A` },
      { type: `delete`, key: `Test Key B` },
      { type: `set`, key: `Test Key A`, value: `Test Value B` },
    ],
    `Test Key A`,
    `Test Value B`
  );
  getThrowsError(
    [
      { type: `set`, key: `Test Key A`, value: `Test Value A` },
      { type: `delete`, key: `Test Key B` },
      { type: `set`, key: `Test Key A`, value: `Test Value B` },
    ],
    `Test Key B`
  );
  getReturnsValue(
    [
      { type: `set`, key: `Test Key A`, value: `Test Value A` },
      { type: `delete`, key: `Test Key B` },
      { type: `set`, key: `Test Key B`, value: `Test Value B` },
    ],
    `Test Key A`,
    `Test Value A`
  );
  getReturnsValue(
    [
      { type: `set`, key: `Test Key A`, value: `Test Value A` },
      { type: `delete`, key: `Test Key B` },
      { type: `set`, key: `Test Key B`, value: `Test Value B` },
    ],
    `Test Key B`,
    `Test Value B`
  );
  getThrowsError(
    [
      { type: `set`, key: `Test Key A`, value: `Test Value A` },
      { type: `delete`, key: `Test Key B` },
      { type: `delete`, key: `Test Key A` },
    ],
    `Test Key A`
  );
  getThrowsError(
    [
      { type: `set`, key: `Test Key A`, value: `Test Value A` },
      { type: `delete`, key: `Test Key B` },
      { type: `delete`, key: `Test Key A` },
    ],
    `Test Key B`
  );
  getReturnsValue(
    [
      { type: `set`, key: `Test Key A`, value: `Test Value A` },
      { type: `delete`, key: `Test Key B` },
      { type: `delete`, key: `Test Key B` },
    ],
    `Test Key A`,
    `Test Value A`
  );
  getThrowsError(
    [
      { type: `set`, key: `Test Key A`, value: `Test Value A` },
      { type: `delete`, key: `Test Key B` },
      { type: `delete`, key: `Test Key B` },
    ],
    `Test Key B`
  );
  getThrowsError(
    [{ type: `set`, key: `Test Key B`, value: `Test Value A` }],
    `Test Key A`
  );
  getReturnsValue(
    [{ type: `set`, key: `Test Key B`, value: `Test Value A` }],
    `Test Key B`,
    `Test Value A`
  );
  getThrowsError(
    [
      { type: `set`, key: `Test Key B`, value: `Test Value A` },
      { type: `get`, key: `Test Key B` },
    ],
    `Test Key A`
  );
  getReturnsValue(
    [
      { type: `set`, key: `Test Key B`, value: `Test Value A` },
      { type: `get`, key: `Test Key B` },
    ],
    `Test Key B`,
    `Test Value A`
  );
  getThrowsError(
    [
      { type: `set`, key: `Test Key B`, value: `Test Value A` },
      { type: `get`, key: `Test Key B` },
      { type: `get`, key: `Test Key B` },
    ],
    `Test Key A`
  );
  getReturnsValue(
    [
      { type: `set`, key: `Test Key B`, value: `Test Value A` },
      { type: `get`, key: `Test Key B` },
      { type: `get`, key: `Test Key B` },
    ],
    `Test Key B`,
    `Test Value A`
  );
  getReturnsValue(
    [
      { type: `set`, key: `Test Key B`, value: `Test Value A` },
      { type: `get`, key: `Test Key B` },
      { type: `set`, key: `Test Key A`, value: `Test Value B` },
    ],
    `Test Key A`,
    `Test Value B`
  );
  getReturnsValue(
    [
      { type: `set`, key: `Test Key B`, value: `Test Value A` },
      { type: `get`, key: `Test Key B` },
      { type: `set`, key: `Test Key A`, value: `Test Value B` },
    ],
    `Test Key B`,
    `Test Value A`
  );
  getThrowsError(
    [
      { type: `set`, key: `Test Key B`, value: `Test Value A` },
      { type: `get`, key: `Test Key B` },
      { type: `set`, key: `Test Key B`, value: `Test Value B` },
    ],
    `Test Key A`
  );
  getReturnsValue(
    [
      { type: `set`, key: `Test Key B`, value: `Test Value A` },
      { type: `get`, key: `Test Key B` },
      { type: `set`, key: `Test Key B`, value: `Test Value B` },
    ],
    `Test Key B`,
    `Test Value B`
  );
  getThrowsError(
    [
      { type: `set`, key: `Test Key B`, value: `Test Value A` },
      { type: `get`, key: `Test Key B` },
      { type: `delete`, key: `Test Key A` },
    ],
    `Test Key A`
  );
  getReturnsValue(
    [
      { type: `set`, key: `Test Key B`, value: `Test Value A` },
      { type: `get`, key: `Test Key B` },
      { type: `delete`, key: `Test Key A` },
    ],
    `Test Key B`,
    `Test Value A`
  );
  getThrowsError(
    [
      { type: `set`, key: `Test Key B`, value: `Test Value A` },
      { type: `get`, key: `Test Key B` },
      { type: `delete`, key: `Test Key B` },
    ],
    `Test Key A`
  );
  getThrowsError(
    [
      { type: `set`, key: `Test Key B`, value: `Test Value A` },
      { type: `get`, key: `Test Key B` },
      { type: `delete`, key: `Test Key B` },
    ],
    `Test Key B`
  );
  getReturnsValue(
    [
      { type: `set`, key: `Test Key B`, value: `Test Value A` },
      { type: `set`, key: `Test Key A`, value: `Test Value B` },
    ],
    `Test Key A`,
    `Test Value B`
  );
  getReturnsValue(
    [
      { type: `set`, key: `Test Key B`, value: `Test Value A` },
      { type: `set`, key: `Test Key A`, value: `Test Value B` },
    ],
    `Test Key B`,
    `Test Value A`
  );
  getReturnsValue(
    [
      { type: `set`, key: `Test Key B`, value: `Test Value A` },
      { type: `set`, key: `Test Key A`, value: `Test Value B` },
      { type: `get`, key: `Test Key A` },
    ],
    `Test Key A`,
    `Test Value B`
  );
  getReturnsValue(
    [
      { type: `set`, key: `Test Key B`, value: `Test Value A` },
      { type: `set`, key: `Test Key A`, value: `Test Value B` },
      { type: `get`, key: `Test Key A` },
    ],
    `Test Key B`,
    `Test Value A`
  );
  getReturnsValue(
    [
      { type: `set`, key: `Test Key B`, value: `Test Value A` },
      { type: `set`, key: `Test Key A`, value: `Test Value B` },
      { type: `get`, key: `Test Key B` },
    ],
    `Test Key A`,
    `Test Value B`
  );
  getReturnsValue(
    [
      { type: `set`, key: `Test Key B`, value: `Test Value A` },
      { type: `set`, key: `Test Key A`, value: `Test Value B` },
      { type: `get`, key: `Test Key B` },
    ],
    `Test Key B`,
    `Test Value A`
  );
  getReturnsValue(
    [
      { type: `set`, key: `Test Key B`, value: `Test Value A` },
      { type: `set`, key: `Test Key A`, value: `Test Value B` },
      { type: `set`, key: `Test Key A`, value: `Test Value C` },
    ],
    `Test Key A`,
    `Test Value C`
  );
  getReturnsValue(
    [
      { type: `set`, key: `Test Key B`, value: `Test Value A` },
      { type: `set`, key: `Test Key A`, value: `Test Value B` },
      { type: `set`, key: `Test Key A`, value: `Test Value C` },
    ],
    `Test Key B`,
    `Test Value A`
  );
  getReturnsValue(
    [
      { type: `set`, key: `Test Key B`, value: `Test Value A` },
      { type: `set`, key: `Test Key A`, value: `Test Value B` },
      { type: `set`, key: `Test Key B`, value: `Test Value C` },
    ],
    `Test Key A`,
    `Test Value B`
  );
  getReturnsValue(
    [
      { type: `set`, key: `Test Key B`, value: `Test Value A` },
      { type: `set`, key: `Test Key A`, value: `Test Value B` },
      { type: `set`, key: `Test Key B`, value: `Test Value C` },
    ],
    `Test Key B`,
    `Test Value C`
  );
  getThrowsError(
    [
      { type: `set`, key: `Test Key B`, value: `Test Value A` },
      { type: `set`, key: `Test Key A`, value: `Test Value B` },
      { type: `delete`, key: `Test Key A` },
    ],
    `Test Key A`
  );
  getReturnsValue(
    [
      { type: `set`, key: `Test Key B`, value: `Test Value A` },
      { type: `set`, key: `Test Key A`, value: `Test Value B` },
      { type: `delete`, key: `Test Key A` },
    ],
    `Test Key B`,
    `Test Value A`
  );
  getReturnsValue(
    [
      { type: `set`, key: `Test Key B`, value: `Test Value A` },
      { type: `set`, key: `Test Key A`, value: `Test Value B` },
      { type: `delete`, key: `Test Key B` },
    ],
    `Test Key A`,
    `Test Value B`
  );
  getThrowsError(
    [
      { type: `set`, key: `Test Key B`, value: `Test Value A` },
      { type: `set`, key: `Test Key A`, value: `Test Value B` },
      { type: `delete`, key: `Test Key B` },
    ],
    `Test Key B`
  );
  getThrowsError(
    [
      { type: `set`, key: `Test Key B`, value: `Test Value A` },
      { type: `set`, key: `Test Key B`, value: `Test Value B` },
    ],
    `Test Key A`
  );
  getReturnsValue(
    [
      { type: `set`, key: `Test Key B`, value: `Test Value A` },
      { type: `set`, key: `Test Key B`, value: `Test Value B` },
    ],
    `Test Key B`,
    `Test Value B`
  );
  getThrowsError(
    [
      { type: `set`, key: `Test Key B`, value: `Test Value A` },
      { type: `set`, key: `Test Key B`, value: `Test Value B` },
      { type: `get`, key: `Test Key B` },
    ],
    `Test Key A`
  );
  getReturnsValue(
    [
      { type: `set`, key: `Test Key B`, value: `Test Value A` },
      { type: `set`, key: `Test Key B`, value: `Test Value B` },
      { type: `get`, key: `Test Key B` },
    ],
    `Test Key B`,
    `Test Value B`
  );
  getReturnsValue(
    [
      { type: `set`, key: `Test Key B`, value: `Test Value A` },
      { type: `set`, key: `Test Key B`, value: `Test Value B` },
      { type: `set`, key: `Test Key A`, value: `Test Value C` },
    ],
    `Test Key A`,
    `Test Value C`
  );
  getReturnsValue(
    [
      { type: `set`, key: `Test Key B`, value: `Test Value A` },
      { type: `set`, key: `Test Key B`, value: `Test Value B` },
      { type: `set`, key: `Test Key A`, value: `Test Value C` },
    ],
    `Test Key B`,
    `Test Value B`
  );
  getThrowsError(
    [
      { type: `set`, key: `Test Key B`, value: `Test Value A` },
      { type: `set`, key: `Test Key B`, value: `Test Value B` },
      { type: `set`, key: `Test Key B`, value: `Test Value C` },
    ],
    `Test Key A`
  );
  getReturnsValue(
    [
      { type: `set`, key: `Test Key B`, value: `Test Value A` },
      { type: `set`, key: `Test Key B`, value: `Test Value B` },
      { type: `set`, key: `Test Key B`, value: `Test Value C` },
    ],
    `Test Key B`,
    `Test Value C`
  );
  getThrowsError(
    [
      { type: `set`, key: `Test Key B`, value: `Test Value A` },
      { type: `set`, key: `Test Key B`, value: `Test Value B` },
      { type: `delete`, key: `Test Key A` },
    ],
    `Test Key A`
  );
  getReturnsValue(
    [
      { type: `set`, key: `Test Key B`, value: `Test Value A` },
      { type: `set`, key: `Test Key B`, value: `Test Value B` },
      { type: `delete`, key: `Test Key A` },
    ],
    `Test Key B`,
    `Test Value B`
  );
  getThrowsError(
    [
      { type: `set`, key: `Test Key B`, value: `Test Value A` },
      { type: `set`, key: `Test Key B`, value: `Test Value B` },
      { type: `delete`, key: `Test Key B` },
    ],
    `Test Key A`
  );
  getThrowsError(
    [
      { type: `set`, key: `Test Key B`, value: `Test Value A` },
      { type: `set`, key: `Test Key B`, value: `Test Value B` },
      { type: `delete`, key: `Test Key B` },
    ],
    `Test Key B`
  );
  getThrowsError(
    [
      { type: `set`, key: `Test Key B`, value: `Test Value A` },
      { type: `delete`, key: `Test Key A` },
    ],
    `Test Key A`
  );
  getReturnsValue(
    [
      { type: `set`, key: `Test Key B`, value: `Test Value A` },
      { type: `delete`, key: `Test Key A` },
    ],
    `Test Key B`,
    `Test Value A`
  );
  getThrowsError(
    [
      { type: `set`, key: `Test Key B`, value: `Test Value A` },
      { type: `delete`, key: `Test Key A` },
      { type: `get`, key: `Test Key B` },
    ],
    `Test Key A`
  );
  getReturnsValue(
    [
      { type: `set`, key: `Test Key B`, value: `Test Value A` },
      { type: `delete`, key: `Test Key A` },
      { type: `get`, key: `Test Key B` },
    ],
    `Test Key B`,
    `Test Value A`
  );
  getReturnsValue(
    [
      { type: `set`, key: `Test Key B`, value: `Test Value A` },
      { type: `delete`, key: `Test Key A` },
      { type: `set`, key: `Test Key A`, value: `Test Value B` },
    ],
    `Test Key A`,
    `Test Value B`
  );
  getReturnsValue(
    [
      { type: `set`, key: `Test Key B`, value: `Test Value A` },
      { type: `delete`, key: `Test Key A` },
      { type: `set`, key: `Test Key A`, value: `Test Value B` },
    ],
    `Test Key B`,
    `Test Value A`
  );
  getThrowsError(
    [
      { type: `set`, key: `Test Key B`, value: `Test Value A` },
      { type: `delete`, key: `Test Key A` },
      { type: `set`, key: `Test Key B`, value: `Test Value B` },
    ],
    `Test Key A`
  );
  getReturnsValue(
    [
      { type: `set`, key: `Test Key B`, value: `Test Value A` },
      { type: `delete`, key: `Test Key A` },
      { type: `set`, key: `Test Key B`, value: `Test Value B` },
    ],
    `Test Key B`,
    `Test Value B`
  );
  getThrowsError(
    [
      { type: `set`, key: `Test Key B`, value: `Test Value A` },
      { type: `delete`, key: `Test Key A` },
      { type: `delete`, key: `Test Key A` },
    ],
    `Test Key A`
  );
  getReturnsValue(
    [
      { type: `set`, key: `Test Key B`, value: `Test Value A` },
      { type: `delete`, key: `Test Key A` },
      { type: `delete`, key: `Test Key A` },
    ],
    `Test Key B`,
    `Test Value A`
  );
  getThrowsError(
    [
      { type: `set`, key: `Test Key B`, value: `Test Value A` },
      { type: `delete`, key: `Test Key A` },
      { type: `delete`, key: `Test Key B` },
    ],
    `Test Key A`
  );
  getThrowsError(
    [
      { type: `set`, key: `Test Key B`, value: `Test Value A` },
      { type: `delete`, key: `Test Key A` },
      { type: `delete`, key: `Test Key B` },
    ],
    `Test Key B`
  );
  getThrowsError(
    [
      { type: `set`, key: `Test Key B`, value: `Test Value A` },
      { type: `delete`, key: `Test Key B` },
    ],
    `Test Key A`
  );
  getThrowsError(
    [
      { type: `set`, key: `Test Key B`, value: `Test Value A` },
      { type: `delete`, key: `Test Key B` },
    ],
    `Test Key B`
  );
  getReturnsValue(
    [
      { type: `set`, key: `Test Key B`, value: `Test Value A` },
      { type: `delete`, key: `Test Key B` },
      { type: `set`, key: `Test Key A`, value: `Test Value B` },
    ],
    `Test Key A`,
    `Test Value B`
  );
  getThrowsError(
    [
      { type: `set`, key: `Test Key B`, value: `Test Value A` },
      { type: `delete`, key: `Test Key B` },
      { type: `set`, key: `Test Key A`, value: `Test Value B` },
    ],
    `Test Key B`
  );
  getThrowsError(
    [
      { type: `set`, key: `Test Key B`, value: `Test Value A` },
      { type: `delete`, key: `Test Key B` },
      { type: `set`, key: `Test Key B`, value: `Test Value B` },
    ],
    `Test Key A`
  );
  getReturnsValue(
    [
      { type: `set`, key: `Test Key B`, value: `Test Value A` },
      { type: `delete`, key: `Test Key B` },
      { type: `set`, key: `Test Key B`, value: `Test Value B` },
    ],
    `Test Key B`,
    `Test Value B`
  );
  getThrowsError(
    [
      { type: `set`, key: `Test Key B`, value: `Test Value A` },
      { type: `delete`, key: `Test Key B` },
      { type: `delete`, key: `Test Key A` },
    ],
    `Test Key A`
  );
  getThrowsError(
    [
      { type: `set`, key: `Test Key B`, value: `Test Value A` },
      { type: `delete`, key: `Test Key B` },
      { type: `delete`, key: `Test Key A` },
    ],
    `Test Key B`
  );
  getThrowsError(
    [
      { type: `set`, key: `Test Key B`, value: `Test Value A` },
      { type: `delete`, key: `Test Key B` },
      { type: `delete`, key: `Test Key B` },
    ],
    `Test Key A`
  );
  getThrowsError(
    [
      { type: `set`, key: `Test Key B`, value: `Test Value A` },
      { type: `delete`, key: `Test Key B` },
      { type: `delete`, key: `Test Key B` },
    ],
    `Test Key B`
  );
  getThrowsError([{ type: `delete`, key: `Test Key A` }], `Test Key A`);
  getThrowsError([{ type: `delete`, key: `Test Key A` }], `Test Key B`);
  getReturnsValue(
    [
      { type: `delete`, key: `Test Key A` },
      { type: `set`, key: `Test Key A`, value: `Test Value A` },
    ],
    `Test Key A`,
    `Test Value A`
  );
  getThrowsError(
    [
      { type: `delete`, key: `Test Key A` },
      { type: `set`, key: `Test Key A`, value: `Test Value A` },
    ],
    `Test Key B`
  );
  getReturnsValue(
    [
      { type: `delete`, key: `Test Key A` },
      { type: `set`, key: `Test Key A`, value: `Test Value A` },
      { type: `get`, key: `Test Key A` },
    ],
    `Test Key A`,
    `Test Value A`
  );
  getThrowsError(
    [
      { type: `delete`, key: `Test Key A` },
      { type: `set`, key: `Test Key A`, value: `Test Value A` },
      { type: `get`, key: `Test Key A` },
    ],
    `Test Key B`
  );
  getReturnsValue(
    [
      { type: `delete`, key: `Test Key A` },
      { type: `set`, key: `Test Key A`, value: `Test Value A` },
      { type: `set`, key: `Test Key A`, value: `Test Value B` },
    ],
    `Test Key A`,
    `Test Value B`
  );
  getThrowsError(
    [
      { type: `delete`, key: `Test Key A` },
      { type: `set`, key: `Test Key A`, value: `Test Value A` },
      { type: `set`, key: `Test Key A`, value: `Test Value B` },
    ],
    `Test Key B`
  );
  getReturnsValue(
    [
      { type: `delete`, key: `Test Key A` },
      { type: `set`, key: `Test Key A`, value: `Test Value A` },
      { type: `set`, key: `Test Key B`, value: `Test Value B` },
    ],
    `Test Key A`,
    `Test Value A`
  );
  getReturnsValue(
    [
      { type: `delete`, key: `Test Key A` },
      { type: `set`, key: `Test Key A`, value: `Test Value A` },
      { type: `set`, key: `Test Key B`, value: `Test Value B` },
    ],
    `Test Key B`,
    `Test Value B`
  );
  getThrowsError(
    [
      { type: `delete`, key: `Test Key A` },
      { type: `set`, key: `Test Key A`, value: `Test Value A` },
      { type: `delete`, key: `Test Key A` },
    ],
    `Test Key A`
  );
  getThrowsError(
    [
      { type: `delete`, key: `Test Key A` },
      { type: `set`, key: `Test Key A`, value: `Test Value A` },
      { type: `delete`, key: `Test Key A` },
    ],
    `Test Key B`
  );
  getReturnsValue(
    [
      { type: `delete`, key: `Test Key A` },
      { type: `set`, key: `Test Key A`, value: `Test Value A` },
      { type: `delete`, key: `Test Key B` },
    ],
    `Test Key A`,
    `Test Value A`
  );
  getThrowsError(
    [
      { type: `delete`, key: `Test Key A` },
      { type: `set`, key: `Test Key A`, value: `Test Value A` },
      { type: `delete`, key: `Test Key B` },
    ],
    `Test Key B`
  );
  getThrowsError(
    [
      { type: `delete`, key: `Test Key A` },
      { type: `set`, key: `Test Key B`, value: `Test Value A` },
    ],
    `Test Key A`
  );
  getReturnsValue(
    [
      { type: `delete`, key: `Test Key A` },
      { type: `set`, key: `Test Key B`, value: `Test Value A` },
    ],
    `Test Key B`,
    `Test Value A`
  );
  getThrowsError(
    [
      { type: `delete`, key: `Test Key A` },
      { type: `set`, key: `Test Key B`, value: `Test Value A` },
      { type: `get`, key: `Test Key B` },
    ],
    `Test Key A`
  );
  getReturnsValue(
    [
      { type: `delete`, key: `Test Key A` },
      { type: `set`, key: `Test Key B`, value: `Test Value A` },
      { type: `get`, key: `Test Key B` },
    ],
    `Test Key B`,
    `Test Value A`
  );
  getReturnsValue(
    [
      { type: `delete`, key: `Test Key A` },
      { type: `set`, key: `Test Key B`, value: `Test Value A` },
      { type: `set`, key: `Test Key A`, value: `Test Value B` },
    ],
    `Test Key A`,
    `Test Value B`
  );
  getReturnsValue(
    [
      { type: `delete`, key: `Test Key A` },
      { type: `set`, key: `Test Key B`, value: `Test Value A` },
      { type: `set`, key: `Test Key A`, value: `Test Value B` },
    ],
    `Test Key B`,
    `Test Value A`
  );
  getThrowsError(
    [
      { type: `delete`, key: `Test Key A` },
      { type: `set`, key: `Test Key B`, value: `Test Value A` },
      { type: `set`, key: `Test Key B`, value: `Test Value B` },
    ],
    `Test Key A`
  );
  getReturnsValue(
    [
      { type: `delete`, key: `Test Key A` },
      { type: `set`, key: `Test Key B`, value: `Test Value A` },
      { type: `set`, key: `Test Key B`, value: `Test Value B` },
    ],
    `Test Key B`,
    `Test Value B`
  );
  getThrowsError(
    [
      { type: `delete`, key: `Test Key A` },
      { type: `set`, key: `Test Key B`, value: `Test Value A` },
      { type: `delete`, key: `Test Key A` },
    ],
    `Test Key A`
  );
  getReturnsValue(
    [
      { type: `delete`, key: `Test Key A` },
      { type: `set`, key: `Test Key B`, value: `Test Value A` },
      { type: `delete`, key: `Test Key A` },
    ],
    `Test Key B`,
    `Test Value A`
  );
  getThrowsError(
    [
      { type: `delete`, key: `Test Key A` },
      { type: `set`, key: `Test Key B`, value: `Test Value A` },
      { type: `delete`, key: `Test Key B` },
    ],
    `Test Key A`
  );
  getThrowsError(
    [
      { type: `delete`, key: `Test Key A` },
      { type: `set`, key: `Test Key B`, value: `Test Value A` },
      { type: `delete`, key: `Test Key B` },
    ],
    `Test Key B`
  );
  getThrowsError(
    [
      { type: `delete`, key: `Test Key A` },
      { type: `delete`, key: `Test Key A` },
    ],
    `Test Key A`
  );
  getThrowsError(
    [
      { type: `delete`, key: `Test Key A` },
      { type: `delete`, key: `Test Key A` },
    ],
    `Test Key B`
  );
  getReturnsValue(
    [
      { type: `delete`, key: `Test Key A` },
      { type: `delete`, key: `Test Key A` },
      { type: `set`, key: `Test Key A`, value: `Test Value A` },
    ],
    `Test Key A`,
    `Test Value A`
  );
  getThrowsError(
    [
      { type: `delete`, key: `Test Key A` },
      { type: `delete`, key: `Test Key A` },
      { type: `set`, key: `Test Key A`, value: `Test Value A` },
    ],
    `Test Key B`
  );
  getThrowsError(
    [
      { type: `delete`, key: `Test Key A` },
      { type: `delete`, key: `Test Key A` },
      { type: `set`, key: `Test Key B`, value: `Test Value A` },
    ],
    `Test Key A`
  );
  getReturnsValue(
    [
      { type: `delete`, key: `Test Key A` },
      { type: `delete`, key: `Test Key A` },
      { type: `set`, key: `Test Key B`, value: `Test Value A` },
    ],
    `Test Key B`,
    `Test Value A`
  );
  getThrowsError(
    [
      { type: `delete`, key: `Test Key A` },
      { type: `delete`, key: `Test Key A` },
      { type: `delete`, key: `Test Key A` },
    ],
    `Test Key A`
  );
  getThrowsError(
    [
      { type: `delete`, key: `Test Key A` },
      { type: `delete`, key: `Test Key A` },
      { type: `delete`, key: `Test Key A` },
    ],
    `Test Key B`
  );
  getThrowsError(
    [
      { type: `delete`, key: `Test Key A` },
      { type: `delete`, key: `Test Key A` },
      { type: `delete`, key: `Test Key B` },
    ],
    `Test Key A`
  );
  getThrowsError(
    [
      { type: `delete`, key: `Test Key A` },
      { type: `delete`, key: `Test Key A` },
      { type: `delete`, key: `Test Key B` },
    ],
    `Test Key B`
  );
  getThrowsError(
    [
      { type: `delete`, key: `Test Key A` },
      { type: `delete`, key: `Test Key B` },
    ],
    `Test Key A`
  );
  getThrowsError(
    [
      { type: `delete`, key: `Test Key A` },
      { type: `delete`, key: `Test Key B` },
    ],
    `Test Key B`
  );
  getReturnsValue(
    [
      { type: `delete`, key: `Test Key A` },
      { type: `delete`, key: `Test Key B` },
      { type: `set`, key: `Test Key A`, value: `Test Value A` },
    ],
    `Test Key A`,
    `Test Value A`
  );
  getThrowsError(
    [
      { type: `delete`, key: `Test Key A` },
      { type: `delete`, key: `Test Key B` },
      { type: `set`, key: `Test Key A`, value: `Test Value A` },
    ],
    `Test Key B`
  );
  getThrowsError(
    [
      { type: `delete`, key: `Test Key A` },
      { type: `delete`, key: `Test Key B` },
      { type: `set`, key: `Test Key B`, value: `Test Value A` },
    ],
    `Test Key A`
  );
  getReturnsValue(
    [
      { type: `delete`, key: `Test Key A` },
      { type: `delete`, key: `Test Key B` },
      { type: `set`, key: `Test Key B`, value: `Test Value A` },
    ],
    `Test Key B`,
    `Test Value A`
  );
  getThrowsError(
    [
      { type: `delete`, key: `Test Key A` },
      { type: `delete`, key: `Test Key B` },
      { type: `delete`, key: `Test Key A` },
    ],
    `Test Key A`
  );
  getThrowsError(
    [
      { type: `delete`, key: `Test Key A` },
      { type: `delete`, key: `Test Key B` },
      { type: `delete`, key: `Test Key A` },
    ],
    `Test Key B`
  );
  getThrowsError(
    [
      { type: `delete`, key: `Test Key A` },
      { type: `delete`, key: `Test Key B` },
      { type: `delete`, key: `Test Key B` },
    ],
    `Test Key A`
  );
  getThrowsError(
    [
      { type: `delete`, key: `Test Key A` },
      { type: `delete`, key: `Test Key B` },
      { type: `delete`, key: `Test Key B` },
    ],
    `Test Key B`
  );
  getThrowsError([{ type: `delete`, key: `Test Key B` }], `Test Key A`);
  getThrowsError([{ type: `delete`, key: `Test Key B` }], `Test Key B`);
  getReturnsValue(
    [
      { type: `delete`, key: `Test Key B` },
      { type: `set`, key: `Test Key A`, value: `Test Value A` },
    ],
    `Test Key A`,
    `Test Value A`
  );
  getThrowsError(
    [
      { type: `delete`, key: `Test Key B` },
      { type: `set`, key: `Test Key A`, value: `Test Value A` },
    ],
    `Test Key B`
  );
  getReturnsValue(
    [
      { type: `delete`, key: `Test Key B` },
      { type: `set`, key: `Test Key A`, value: `Test Value A` },
      { type: `get`, key: `Test Key A` },
    ],
    `Test Key A`,
    `Test Value A`
  );
  getThrowsError(
    [
      { type: `delete`, key: `Test Key B` },
      { type: `set`, key: `Test Key A`, value: `Test Value A` },
      { type: `get`, key: `Test Key A` },
    ],
    `Test Key B`
  );
  getReturnsValue(
    [
      { type: `delete`, key: `Test Key B` },
      { type: `set`, key: `Test Key A`, value: `Test Value A` },
      { type: `set`, key: `Test Key A`, value: `Test Value B` },
    ],
    `Test Key A`,
    `Test Value B`
  );
  getThrowsError(
    [
      { type: `delete`, key: `Test Key B` },
      { type: `set`, key: `Test Key A`, value: `Test Value A` },
      { type: `set`, key: `Test Key A`, value: `Test Value B` },
    ],
    `Test Key B`
  );
  getReturnsValue(
    [
      { type: `delete`, key: `Test Key B` },
      { type: `set`, key: `Test Key A`, value: `Test Value A` },
      { type: `set`, key: `Test Key B`, value: `Test Value B` },
    ],
    `Test Key A`,
    `Test Value A`
  );
  getReturnsValue(
    [
      { type: `delete`, key: `Test Key B` },
      { type: `set`, key: `Test Key A`, value: `Test Value A` },
      { type: `set`, key: `Test Key B`, value: `Test Value B` },
    ],
    `Test Key B`,
    `Test Value B`
  );
  getThrowsError(
    [
      { type: `delete`, key: `Test Key B` },
      { type: `set`, key: `Test Key A`, value: `Test Value A` },
      { type: `delete`, key: `Test Key A` },
    ],
    `Test Key A`
  );
  getThrowsError(
    [
      { type: `delete`, key: `Test Key B` },
      { type: `set`, key: `Test Key A`, value: `Test Value A` },
      { type: `delete`, key: `Test Key A` },
    ],
    `Test Key B`
  );
  getReturnsValue(
    [
      { type: `delete`, key: `Test Key B` },
      { type: `set`, key: `Test Key A`, value: `Test Value A` },
      { type: `delete`, key: `Test Key B` },
    ],
    `Test Key A`,
    `Test Value A`
  );
  getThrowsError(
    [
      { type: `delete`, key: `Test Key B` },
      { type: `set`, key: `Test Key A`, value: `Test Value A` },
      { type: `delete`, key: `Test Key B` },
    ],
    `Test Key B`
  );
  getThrowsError(
    [
      { type: `delete`, key: `Test Key B` },
      { type: `set`, key: `Test Key B`, value: `Test Value A` },
    ],
    `Test Key A`
  );
  getReturnsValue(
    [
      { type: `delete`, key: `Test Key B` },
      { type: `set`, key: `Test Key B`, value: `Test Value A` },
    ],
    `Test Key B`,
    `Test Value A`
  );
  getThrowsError(
    [
      { type: `delete`, key: `Test Key B` },
      { type: `set`, key: `Test Key B`, value: `Test Value A` },
      { type: `get`, key: `Test Key B` },
    ],
    `Test Key A`
  );
  getReturnsValue(
    [
      { type: `delete`, key: `Test Key B` },
      { type: `set`, key: `Test Key B`, value: `Test Value A` },
      { type: `get`, key: `Test Key B` },
    ],
    `Test Key B`,
    `Test Value A`
  );
  getReturnsValue(
    [
      { type: `delete`, key: `Test Key B` },
      { type: `set`, key: `Test Key B`, value: `Test Value A` },
      { type: `set`, key: `Test Key A`, value: `Test Value B` },
    ],
    `Test Key A`,
    `Test Value B`
  );
  getReturnsValue(
    [
      { type: `delete`, key: `Test Key B` },
      { type: `set`, key: `Test Key B`, value: `Test Value A` },
      { type: `set`, key: `Test Key A`, value: `Test Value B` },
    ],
    `Test Key B`,
    `Test Value A`
  );
  getThrowsError(
    [
      { type: `delete`, key: `Test Key B` },
      { type: `set`, key: `Test Key B`, value: `Test Value A` },
      { type: `set`, key: `Test Key B`, value: `Test Value B` },
    ],
    `Test Key A`
  );
  getReturnsValue(
    [
      { type: `delete`, key: `Test Key B` },
      { type: `set`, key: `Test Key B`, value: `Test Value A` },
      { type: `set`, key: `Test Key B`, value: `Test Value B` },
    ],
    `Test Key B`,
    `Test Value B`
  );
  getThrowsError(
    [
      { type: `delete`, key: `Test Key B` },
      { type: `set`, key: `Test Key B`, value: `Test Value A` },
      { type: `delete`, key: `Test Key A` },
    ],
    `Test Key A`
  );
  getReturnsValue(
    [
      { type: `delete`, key: `Test Key B` },
      { type: `set`, key: `Test Key B`, value: `Test Value A` },
      { type: `delete`, key: `Test Key A` },
    ],
    `Test Key B`,
    `Test Value A`
  );
  getThrowsError(
    [
      { type: `delete`, key: `Test Key B` },
      { type: `set`, key: `Test Key B`, value: `Test Value A` },
      { type: `delete`, key: `Test Key B` },
    ],
    `Test Key A`
  );
  getThrowsError(
    [
      { type: `delete`, key: `Test Key B` },
      { type: `set`, key: `Test Key B`, value: `Test Value A` },
      { type: `delete`, key: `Test Key B` },
    ],
    `Test Key B`
  );
  getThrowsError(
    [
      { type: `delete`, key: `Test Key B` },
      { type: `delete`, key: `Test Key A` },
    ],
    `Test Key A`
  );
  getThrowsError(
    [
      { type: `delete`, key: `Test Key B` },
      { type: `delete`, key: `Test Key A` },
    ],
    `Test Key B`
  );
  getReturnsValue(
    [
      { type: `delete`, key: `Test Key B` },
      { type: `delete`, key: `Test Key A` },
      { type: `set`, key: `Test Key A`, value: `Test Value A` },
    ],
    `Test Key A`,
    `Test Value A`
  );
  getThrowsError(
    [
      { type: `delete`, key: `Test Key B` },
      { type: `delete`, key: `Test Key A` },
      { type: `set`, key: `Test Key A`, value: `Test Value A` },
    ],
    `Test Key B`
  );
  getThrowsError(
    [
      { type: `delete`, key: `Test Key B` },
      { type: `delete`, key: `Test Key A` },
      { type: `set`, key: `Test Key B`, value: `Test Value A` },
    ],
    `Test Key A`
  );
  getReturnsValue(
    [
      { type: `delete`, key: `Test Key B` },
      { type: `delete`, key: `Test Key A` },
      { type: `set`, key: `Test Key B`, value: `Test Value A` },
    ],
    `Test Key B`,
    `Test Value A`
  );
  getThrowsError(
    [
      { type: `delete`, key: `Test Key B` },
      { type: `delete`, key: `Test Key A` },
      { type: `delete`, key: `Test Key A` },
    ],
    `Test Key A`
  );
  getThrowsError(
    [
      { type: `delete`, key: `Test Key B` },
      { type: `delete`, key: `Test Key A` },
      { type: `delete`, key: `Test Key A` },
    ],
    `Test Key B`
  );
  getThrowsError(
    [
      { type: `delete`, key: `Test Key B` },
      { type: `delete`, key: `Test Key A` },
      { type: `delete`, key: `Test Key B` },
    ],
    `Test Key A`
  );
  getThrowsError(
    [
      { type: `delete`, key: `Test Key B` },
      { type: `delete`, key: `Test Key A` },
      { type: `delete`, key: `Test Key B` },
    ],
    `Test Key B`
  );
  getThrowsError(
    [
      { type: `delete`, key: `Test Key B` },
      { type: `delete`, key: `Test Key B` },
    ],
    `Test Key A`
  );
  getThrowsError(
    [
      { type: `delete`, key: `Test Key B` },
      { type: `delete`, key: `Test Key B` },
    ],
    `Test Key B`
  );
  getReturnsValue(
    [
      { type: `delete`, key: `Test Key B` },
      { type: `delete`, key: `Test Key B` },
      { type: `set`, key: `Test Key A`, value: `Test Value A` },
    ],
    `Test Key A`,
    `Test Value A`
  );
  getThrowsError(
    [
      { type: `delete`, key: `Test Key B` },
      { type: `delete`, key: `Test Key B` },
      { type: `set`, key: `Test Key A`, value: `Test Value A` },
    ],
    `Test Key B`
  );
  getThrowsError(
    [
      { type: `delete`, key: `Test Key B` },
      { type: `delete`, key: `Test Key B` },
      { type: `set`, key: `Test Key B`, value: `Test Value A` },
    ],
    `Test Key A`
  );
  getReturnsValue(
    [
      { type: `delete`, key: `Test Key B` },
      { type: `delete`, key: `Test Key B` },
      { type: `set`, key: `Test Key B`, value: `Test Value A` },
    ],
    `Test Key B`,
    `Test Value A`
  );
  getThrowsError(
    [
      { type: `delete`, key: `Test Key B` },
      { type: `delete`, key: `Test Key B` },
      { type: `delete`, key: `Test Key A` },
    ],
    `Test Key A`
  );
  getThrowsError(
    [
      { type: `delete`, key: `Test Key B` },
      { type: `delete`, key: `Test Key B` },
      { type: `delete`, key: `Test Key A` },
    ],
    `Test Key B`
  );
  getThrowsError(
    [
      { type: `delete`, key: `Test Key B` },
      { type: `delete`, key: `Test Key B` },
      { type: `delete`, key: `Test Key B` },
    ],
    `Test Key A`
  );
  getThrowsError(
    [
      { type: `delete`, key: `Test Key B` },
      { type: `delete`, key: `Test Key B` },
      { type: `delete`, key: `Test Key B` },
    ],
    `Test Key B`
  );
});

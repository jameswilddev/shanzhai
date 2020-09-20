import { ValueStore } from ".";

describe(`ValueStore`, () => {
  type TestValue = `Test Value A` | `Test Value B` | `Test Value C`;

  type Event =
    | { readonly type: `set`; readonly value: TestValue }
    | { readonly type: `delete` }
    | { readonly type: `get` };

  const afterRunning = (
    events: ReadonlyArray<Event>
  ): ValueStore<TestValue> => {
    const valueStore = new ValueStore<TestValue>(`Test Name`);

    for (const event of events) {
      switch (event.type) {
        case `set`:
          valueStore.set(event.value);
          break;

        case `delete`:
          valueStore.delete();
          break;

        case `get`:
          valueStore.get();
          break;
      }
    }

    return valueStore;
  };

  function getThrowsError(events: ReadonlyArray<Event>): void {
    describe(`after ${events
      .map((event) => event.type)
      .join(`, `)} get`, () => {
      let error: null | Error = null;

      beforeAll(() => {
        try {
          afterRunning(events).get();
        } catch (ex) {
          error = ex;
        }
      });

      it(`throws the expected error`, () => {
        expect(error).toEqual(
          new Error(`Cannot get value of unset value store "Test Name".`)
        );
      });
    });
  }

  function getReturnsValue(
    events: ReadonlyArray<Event>,
    value: TestValue
  ): void {
    describe(`after ${events
      .map((event) => event.type)
      .join(`, `)}, get`, () => {
      let result: TestValue;

      beforeAll(() => {
        result = afterRunning(events).get();
      });

      it(`returns the expected value`, () => {
        expect(result).toEqual(value);
      });
    });
  }

  getThrowsError([]);
  getReturnsValue(
    [{ type: `set`, value: `Test Value A` }, { type: `get` }],
    `Test Value A`
  );
  getReturnsValue(
    [{ type: `set`, value: `Test Value A` }, { type: `get` }, { type: `get` }],
    `Test Value A`
  );
  getReturnsValue(
    [
      { type: `set`, value: `Test Value A` },
      { type: `get` },
      { type: `set`, value: `Test Value B` },
    ],
    `Test Value B`
  );
  getThrowsError([
    { type: `set`, value: `Test Value A` },
    { type: `get` },
    { type: `delete` },
  ]);
  getReturnsValue(
    [
      { type: `set`, value: `Test Value A` },
      { type: `set`, value: `Test Value B` },
    ],
    `Test Value B`
  );
  getReturnsValue(
    [
      { type: `set`, value: `Test Value A` },
      { type: `set`, value: `Test Value B` },
      { type: `get` },
    ],
    `Test Value B`
  );
  getReturnsValue(
    [
      { type: `set`, value: `Test Value A` },
      { type: `set`, value: `Test Value B` },
      { type: `set`, value: `Test Value C` },
    ],
    `Test Value C`
  );
  getThrowsError([
    { type: `set`, value: `Test Value A` },
    { type: `set`, value: `Test Value B` },
    { type: `delete` },
  ]);
  getThrowsError([{ type: `set`, value: `Test Value A` }, { type: `delete` }]);
  getReturnsValue(
    [
      { type: `set`, value: `Test Value A` },
      { type: `delete` },
      { type: `set`, value: `Test Value B` },
    ],
    `Test Value B`
  );
  getThrowsError([
    { type: `set`, value: `Test Value A` },
    { type: `delete` },
    { type: `delete` },
  ]);
  getReturnsValue(
    [{ type: `delete` }, { type: `set`, value: `Test Value A` }],
    `Test Value A`
  );
  getReturnsValue(
    [
      { type: `delete` },
      { type: `set`, value: `Test Value A` },
      { type: `get` },
    ],
    `Test Value A`
  );
  getReturnsValue(
    [
      { type: `delete` },
      { type: `set`, value: `Test Value A` },
      { type: `set`, value: `Test Value B` },
    ],
    `Test Value B`
  );
  getThrowsError([
    { type: `delete` },
    { type: `set`, value: `Test Value A` },
    { type: `delete` },
  ]);
  getThrowsError([{ type: `delete` }, { type: `delete` }]);
  getReturnsValue(
    [
      { type: `delete` },
      { type: `delete` },
      { type: `set`, value: `Test Value A` },
    ],
    `Test Value A`
  );
  getThrowsError([{ type: `delete` }, { type: `delete` }, { type: `delete` }]);
});
